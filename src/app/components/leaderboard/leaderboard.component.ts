import { Component, OnInit } from '@angular/core';
import { QuizLeaderboard } from '../../models/quiz-leaderboard';
import { LeaderboardService } from '../../services/leaderboard.service';
import { SessionLeaderboard } from '../../models/session-leaderboard';
import { HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})



export class LeaderboardComponent implements OnInit {

  constructor(private leaderboardService : LeaderboardService) { }

  quizzes : QuizLeaderboard[];
  selectedQuiz: QuizLeaderboard;
  leaderboardSessions: SessionLeaderboard[];

  ngOnInit() {
    this.loadQuizzes();
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.selectedQuiz.id++;
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.selectedQuiz.id--;
    }
  }

  loadQuizzes() {
    return this.leaderboardService.getQuizzes().subscribe(response => this.quizzes = response);
   }

   selectedOption(quiz){
    return this.leaderboardService.getLeaderboard(quiz).subscribe(response => this.leaderboardSessions = response);
   }

}
