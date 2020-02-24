import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { QuizLeaderboard } from '../models/quiz-leaderboard';
import { SessionLeaderboard } from '../models/session-leaderboard'


@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

 getQuizzesUrl = environment.api + '/api/Quizzes';
 getLeaderboardUrl = environment.api + '/api/Sessions/'

constructor(private http: HttpClient) { }

getQuizzes() : Observable<QuizLeaderboard[]> {
  return this.http.get<QuizLeaderboard[]>(this.getQuizzesUrl);
}

getLeaderboard(id: number) : Observable<SessionLeaderboard[]> {
  return this.http.get<SessionLeaderboard[]>(this.getLeaderboardUrl+id);
}

}
