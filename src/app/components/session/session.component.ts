import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';
import { FinishQuiz } from './../../models/FinishQuiz';
import { QuizResponse } from './../../models/quiz-response';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  quiz: QuizResponse;
  quizId: number;
  sessionId: any;
  currentIndex = 0;
  selectedAnswers: Map<number, number> = new Map<number, number>();
  quizResults: any;
  interval: NodeJS.Timer;
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
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.finishSession();
        this.toastr.error('You ran out of time !');
      }
    }, 1000);
  }

  getQuiz(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.quizService.getQuiz(this.quizId).subscribe(res => {
        this.quiz = res;
        resolve(res);
        this.shuffleQuestions();
      });
    });
  }

  shuffleQuestions() {
    let m = this.quiz.questions.length;
    let t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.quiz.questions[m];
      this.quiz.questions[m] = this.quiz.questions[i];
      this.quiz.questions[i] = t;
    }
    this.shuffleAnswers();
  }

  shuffleAnswers() {
    for (let index = 0; index < this.quiz.questions.length; index++) {
      let m = this.quiz.questions[index].answers.length;
      let t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = this.quiz.questions[index].answers[m];
        this.quiz.questions[index].answers[m] = this.quiz.questions[index].answers[i];
        this.quiz.questions[index].answers[i] = t;
      }
    }
  }

  getSelectedAnswers = (answers: Map<number, number>) => (this.selectedAnswers = answers);

  get currentQuestion() {
    return this.quiz.questions[this.currentIndex];
  }

  lastQuestion = () => (this.quiz.questions.length - 1 === this.currentIndex ? false : true);

  finishSession() {
    clearInterval(this.interval);
    const QuizResult = {};
    this.selectedAnswers.forEach((val: number, key: number) => {
      QuizResult[key] = val;
    });
    const result: FinishQuiz = {
      quizResult: QuizResult,
      quizId: this.quizId,
      sessionId: this.sessionId
    };
    this.quizService.addSession(result).subscribe(response => {
      this.quizResults = response;
      this.router.navigate(['/quiz/' + this.quiz.id + '/session/finish']);
    });
  }
}
