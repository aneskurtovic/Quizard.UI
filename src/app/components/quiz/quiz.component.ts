import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private fb: FormBuilder
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
  }

  getQuiz(id: number) {
    this.quizService.getQuiz(id).subscribe(res => {
      this.quiz = res;
    });
  }
}
