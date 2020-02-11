import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizResponse } from './../../models/quiz-response';
import { QuizService } from './../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  quiz: QuizResponse;
  id: number;
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.getQuiz(this.id);

    this.form = this.fb.group({
      contestantName: ['', Validators.required]
    });
  }

  getQuiz(id: number) {
    this.quizService.getQuiz(id).subscribe(res => {
      this.quiz = res;
    });
  }

  startQuiz() {
    const session = {
      ...this.form.value,
      quizId: this.id
    };
    console.log(session);
    this.quizService.startQuiz(session).subscribe(response => {
      this.toastr.success('Quiz successfully Started');
      this.router.navigate(['/quiz/' + this.id + '/session/' + response.id]);
    });
  }
}
