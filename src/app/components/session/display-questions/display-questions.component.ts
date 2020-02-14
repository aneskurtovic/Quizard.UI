import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from './../../../models/question';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.css']
})
export class DisplayQuestionsComponent implements OnInit {
  @Input() question: Question;
  @Input() numberOfQuestions: number;
  @Output() selectedAnswers = new EventEmitter<Map<number, number>>();
  @Output() submitButton = new EventEmitter<boolean>();
  answers: Map<number, number> = new Map<number, number>();

  constructor() {}

  submited() {
    this.submitButton.emit();
  }
  selectAnswer(questionId: number, answerId: number) {
    this.answers.set(questionId, answerId);
    this.selectedAnswers.emit(this.answers);
  }
  ngOnInit() {}

  hasAnswer(questionId: number): boolean {
    return this.answers.has(questionId);
  }

  isSelectedAnswer(questionId: number, answerId: number) {
    return this.hasAnswer(questionId) && this.answers.get(questionId) === answerId;
  }
}
