import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizResponse } from './../../../models/quiz-response';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.css']
})
export class DisplayQuestionsComponent implements OnInit {
  @Input() quiz: QuizResponse;
  @Output() selectedAnswers = new EventEmitter<Map<number, number>>();

  constructor() {}

  ngOnInit() {}
}
