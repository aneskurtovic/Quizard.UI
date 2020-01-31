import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quiz } from './../models/quiz';

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

  constructor(private http: HttpClient) {}

  addQuiz(quiz: string): Observable<Quiz> {
    return this.http.post<Quiz>(this.quizUrl, quiz, httpOptions);
  }
}
