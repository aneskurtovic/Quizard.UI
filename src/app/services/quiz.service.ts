import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'protractor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedResult, PaginationParams } from '../models/pagination';
import { Quiz } from '../models/quiz';
import { SessionResponse } from '../models/session-response';
import { QuizResponse } from './../models/quiz-response';
import { QuizResult } from './../models/quiz-result';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl: string = environment.api + '/api/quizzes/';
  private sessionUrl: string = environment.api + '/api/sessions/';

  constructor(private http: HttpClient) {}

  addQuiz(quiz: any): Observable<QuizResponse> {
    return this.http.post<QuizResponse>(this.quizUrl, quiz, httpOptions);
  }
  addSession(session: any): Observable<QuizResult> {
    return this.http.post<QuizResult>(this.sessionUrl + 'finish', session);
  }
  getQuiz(id: number): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(this.quizUrl + id);
  }
  getSession(id: number): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(this.sessionUrl + id);
  }
  startQuiz(session: Session): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(this.sessionUrl, session, httpOptions);
  }
  getQuizzes(params: PaginationParams) {
    let queryParams = new HttpParams();
    const keys = Object.keys(params);
    keys.forEach(p => {
      queryParams = queryParams.append(p, params[p]);
    });

    return this.http.get<PagedResult<Quiz>>(this.quizUrl, { params: queryParams });
  }
}
