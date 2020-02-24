import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';
import { QuizResponse } from './../../models/quiz-response';
import { FinishQuiz } from './../../models/FinishQuiz';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  quiz: QuizResponse;
  quizId: number;
  sessionId;
  currentIndex = 0;
  selectedAnswers: Map<number, number> = new Map<number, number>();
  quizResults: any;
  interval;
  timeLeft: number;
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizId = +params.quizId;
      this.sessionId = params.id;

    });
    this.getQuiz(this.quizId).then(success => this.startTimer());
  }

  startTimer() {
    this.timeLeft = this.quiz.timer * 60;
    console.log(this.quiz.timer);
    console.log(this.timeLeft);
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {

        this.finishSession();
        this.toastr.error('You ran out of time !');
        clearInterval(this.interval);
      }
    },1000)
  }

  getQuiz(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.quizService.getQuiz(this.quizId).subscribe(res => {
        this.quiz = res;
        resolve(res);
      })
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
    console.log(this.sessionId);
    const QuizResult = {};
    this.selectedAnswers.forEach((val: number, key: number) => {
      QuizResult[key] = val;
    });
    const result: FinishQuiz = {
      quizResult: QuizResult,
      quizId: this.quizId,
      sessionId: this.sessionId
    };
    console.log(result);
    this.quizService.addSession(JSON.stringify(result)).subscribe(response => {
      this.quizResults = response;
      this.router.navigate(['/quiz/' + this.quiz.id + '/session/finish'], )
    });
  }
}
