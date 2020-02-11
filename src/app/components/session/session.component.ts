import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizResponse } from './../../models/quiz-response';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  quiz: QuizResponse;
  id: number;

  constructor(private quizService: QuizService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.getQuiz(this.id);
  }
  getQuiz(id: number) {
    this.quizService.getQuiz(id).subscribe(res => {
      this.quiz = res;
    });
  }
}
