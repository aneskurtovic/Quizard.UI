import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from './../../../models/question';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.css']
})
export class DisplayQuestionsComponent {
  @Input() question: Question;
  @Input() questions: Question[];
  @Input() numberOfQuestions: number;
  @Output() selectedAnswers = new EventEmitter<Map<number, number[]>>();
  @Output() submitButton = new EventEmitter<boolean>();
  @Output() currentIndexChange: EventEmitter<number> = new EventEmitter();
  @Input()
  set currentIndex(val: number) {
    this.currentIndexChange.emit(val);
    this._currentIndex = val;
  }
  get currentIndex(): number {
    return this._currentIndex;
  }

  constructor() {}

  answers: Map<number, number[]> = new Map<number, number[]>();
  answerIDs: number[] = [];
  private _currentIndex: number;

  next() {
    this.currentIndex++;
  }

  previous() {
    this.currentIndex--;
  }

  submited() {
    this.submitButton.emit();
  }
  selectAnswer(questionId: number, answerId: number) {
    let answers = this.answers.has(questionId) ? this.answers.get(questionId) : [];

    answers = !answers.includes(answerId)
      ? [...answers, answerId]
      : answers.filter(x => x !== answerId);

    this.answers.set(questionId, answers);

    if (answers.length === 0) {
      this.answers.delete(questionId);
    }
    this.selectedAnswers.emit(this.answers);
  }

  hasAnswer(questionId: number): boolean {
    return this.answers.has(questionId);
  }

  isSelectedAnswer(questionId: number, answerId: number) {
    return this.hasAnswer(questionId) && this.answers.get(questionId).includes(answerId);
  }
}
