import { Component, OnInit } from '@angular/core';
import { QuizLeaderboard } from '../../models/quiz-leaderboard';
import { SessionLeaderboard } from '../../models/session-leaderboard';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  constructor(private leaderboardService: LeaderboardService) {}

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
    return this.leaderboardService
      .getLeaderboard(quiz)
      .subscribe(response => (this.leaderboardSessions = response));
  }
}
