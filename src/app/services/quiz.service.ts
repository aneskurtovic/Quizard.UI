import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  startQuiz(session: any): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(this.sessionUrl, session, httpOptions);
  }
}
