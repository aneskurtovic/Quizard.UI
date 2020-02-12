import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from './../../../models/question';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.css']
})
export class DisplayQuestionsComponent implements OnInit {
  @Input() question: Question;
  @Output() selectedAnswers = new EventEmitter<Map<number, number>>();
  answers: Map<number, number> = new Map<number, number>();

  constructor() {}

  selectAnswer(questionId: number, answerId: number) {
    this.answers.set(questionId, answerId);
    this.selectedAnswers.emit(this.answers);
  }
  ngOnInit() {}
}
