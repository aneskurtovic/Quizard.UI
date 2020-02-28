import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizLeaderboard } from '../../models/quiz-leaderboard';
import { SessionLeaderboard } from '../../models/session-leaderboard';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  constructor(private leaderboardService: LeaderboardService, private router: Router) {}

  quizzes: QuizLeaderboard[];
  selectedQuiz: QuizLeaderboard;
  leaderboardSessions: SessionLeaderboard[];

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes() {
    return this.leaderboardService.getQuizzes().subscribe(response => (this.quizzes = response));
  }

  selectedOption(quiz) {
    this.leaderboardService
      .getLeaderboard(quiz)
      .subscribe(response => (this.leaderboardSessions = response));
    this.router.navigate(['leaderboard/' + quiz]);
  }
}
