import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Question } from '../_models/question';
import { PaginatedResult } from './../_models/pagination';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionUrl: string = environment.api + '/api/questions';

  constructor(private http: HttpClient) {}

  checkAuth(creditentials: string): Observable<any> {
    return this.http.post(this.questionUrl, creditentials, httpOptions);
  }

  getQuestions(page?, itemsPerPage?): Observable<PaginatedResult<Question[]>> {
    const paginatedResult: PaginatedResult<Question[]> = new PaginatedResult<Question[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Question[]>(this.questionUrl, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getQuestion(id): Observable<Question> {
    return this.http.get<Question>(this.questionUrl + id);
  }
}
