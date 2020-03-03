import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { QuizLeaderboard } from '../../models/quiz-leaderboard';
import { SessionLeaderboard } from '../../models/session-leaderboard';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  constructor(
    private leaderboardService: LeaderboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  quizzes: QuizLeaderboard[];
  selectedQuiz: number;
  leaderboardSessions: SessionLeaderboard[];

  ngOnInit() {
    this.route.params
      .pipe(switchMap(params => this.leaderboardService.fetchLeaderboardData(+params.id)))
      .subscribe(responses => {
        this.leaderboardSessions = responses.leaderboard.leaderboards;
        this.quizzes = responses.quizzes;
        this.selectedQuiz = responses.leaderboard.id;
      });
  }

  selectedOption(quiz: number) {
    this.router.navigate(['leaderboard/' + quiz]);
  }
}
