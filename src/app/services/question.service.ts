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

  checkAuth(creditentials: string): Observable<any> {
    return this.http.post(this.questionUrl, creditentials, httpOptions);
  }

  /*getDifficultyLevel(): Observable<DifficultyLevel[]> {
    return this.http.get<DifficultyLevel[]>(this.difficultyLevelUrl);
  }*/
  getQuestions(params: PaginationParams) {
    let queryParams = new HttpParams();
    const keys = Object.keys(params);
    keys.forEach(p => {
      queryParams = queryParams.append(p, params[p]);
    });

    return this.http.get<PagedResult<Question>>(this.questionUrl, { params: queryParams });
  }
}
