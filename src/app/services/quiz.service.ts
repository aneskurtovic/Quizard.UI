import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'protractor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinishQuiz } from '../models/FinishQuiz';
import { PagedResult, PaginationParams } from '../models/pagination';
import { Quiz } from '../models/quiz';
import { ResultQuiz } from '../models/ResultQuiz';
import { SessionResponse } from '../models/session-response';
import { QuizResponse } from './../models/quiz-response';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl: string = environment.api + '/api/quizzes/';
  private sessionUrl: string = environment.api + '/api/sessions/';

  constructor(private http: HttpClient) {}

  addQuiz(quiz: any): Observable<QuizResponse> {
    return this.http.post<QuizResponse>(this.quizUrl, quiz);
  }
  addSession(session: FinishQuiz): Observable<ResultQuiz> {
    return this.http.post<ResultQuiz>(this.sessionUrl + 'finish', session);
  }
  getQuiz(id: number): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(this.quizUrl + id);
  }
  getSession(id: string): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(this.sessionUrl + 'GetSession/' + id);
  }
  startQuiz(session: Session): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(this.sessionUrl, session);
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
