import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizResponse } from './../../models/quiz-response';
import { QuizResult } from './../../models/quiz-result';

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
    private toastr: ToastrService,
    private router: Router
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
  getSelectedAnswers(answers: Map<number, number>): void {
    this.selectedAnswers = answers;
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
    const QuizResult = {};
    this.selectedAnswers.forEach((val: number, key: number) => {
      QuizResult[key] = val;
    });
    const result: QuizResult = {
      quizResult: QuizResult
    };
    this.quizService.addSession(result).subscribe(response => {
      this.toastr.success('Quiz successfully finished');
      this.router.navigate(['/quiz/' + this.quiz.id + '/session/' + 'finish']);
    });
  }
}
