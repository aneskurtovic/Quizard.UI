import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  public getAll(term: string) {
    if (term === '') {
      return;
    }
    return this.http.get(this.url, {
      params: {
        searchTerm: term
      }
    });
  }
  public postCategory(name: string) {
    return this.http.post(this.url, name, httpOptions);
  }
}
