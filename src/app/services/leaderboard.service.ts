import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuizLeaderboard } from '../models/quiz-leaderboard';
import { SessionLeaderboard, SessionLeaderboardResponse } from '../models/session-leaderboard';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  getQuizzesUrl = environment.api + '/api/Quizzes';
  getLeaderboardUrl = environment.api + '/api/Sessions/';

  constructor(private http: HttpClient) {}

  private getQuizzes(): Observable<QuizLeaderboard[]> {
    return this.http.get<QuizLeaderboard[]>(this.getQuizzesUrl + '/leaderboard');
  }

  private getLeaderboard(id: number): Observable<SessionLeaderboardResponse> {
    if (isNaN(id)) {
      return of({
        id: 0,
        leaderboards: []
      });
    }
    return this.http.get<SessionLeaderboard[]>(this.getLeaderboardUrl + 'GetTop10/' + id).pipe(
      map(leaderboards => {
        return {
          id,
          leaderboards
        };
      })
    );
  }

  fetchLeaderboardData(id: number) {
    return forkJoin({
      leaderboard: this.getLeaderboard(id),
      quizzes: this.getQuizzes()
    });
  }
}
