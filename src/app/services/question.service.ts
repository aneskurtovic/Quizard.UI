import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Question } from '../models/question';
import { PagedResult, PaginationParams } from './../models/pagination';

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
  //private difficultyLevelUrl: string = environment.api + '/api/difficultylevels';

  constructor(private http: HttpClient) {}

  addQuestion(creditentials: string): Observable<any> {
    return this.http.post(this.questionUrl, creditentials, httpOptions);
  }

  getQuestions(params: PaginationParams) {
    let queryParams = new HttpParams();

    if (params.category) {
      params.category.forEach(x => {
        queryParams = queryParams.append('category', x.toString());
      });
    }

    const keys = Object.keys(params);
    keys.forEach(p => {
      if (!!params[p] && !!String(params[p]).trim() && p !== 'category') {
        queryParams = queryParams.append(p, params[p]);
      }
    });

    return this.http.get<PagedResult<Question>>(this.questionUrl, { params: queryParams });
  }
}
