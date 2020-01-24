import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.api + '/api/Categories';

  constructor(private http: HttpClient) {}

  public getAll(term: string): Observable<any> {
    if (term === '') {
      return;
    }
    return this.http.get(this.url, {
      params: {
        searchTerm: term
      }
    });
  }
  public postCategory(name: string): Observable<Category> {
    return this.http.post<Category>(this.url, { name }, httpOptions);
  }
}
