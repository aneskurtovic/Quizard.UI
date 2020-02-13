import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  currentIndex = 0;
  selectedAnswers: Map<number, number> = new Map<number, number>();

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.quizId;
    });
    this.getQuiz(this.id);
  }
  getQuiz(id: number): void {
    id = this.id;
    this.quizService.getQuiz(id).subscribe(res => {
      this.quiz = res;
    });
  }
  getSelectedAnswers(Answers: Map<number, number>): void {
    this.selectedAnswers = Answers;
  }
  get currentQuestion() {
    return this.quiz.questions[this.currentIndex];
  }
  lastQuestion(): boolean {
    if (this.quiz.questions.length - 1 === this.currentIndex) {
      return false;
    }
    return true;
  }
  finishSession() {
    console.log(this.selectedAnswers);
    this.quizService.addSession(this.selectedAnswers).subscribe(response => {
      this.toastr.success('Quiz successfully finished');
    });
  }
}
