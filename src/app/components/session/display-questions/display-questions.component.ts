import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from './../../../models/question';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrls: ['./display-questions.component.css']
})
export class DisplayQuestionsComponent {
  @Input() question: Question;
  @Input() numberOfQuestions: number;
  @Output() selectedAnswers = new EventEmitter<Map<number, number[]>>();
  @Output() submitButton = new EventEmitter<boolean>();
  answers: Map<number, number[]> = new Map<number, number[]>();
  answerIDs: number[] = [];
  constructor() {}

  submited() {
    this.submitButton.emit();
  }
  selectAnswer(questionId: number, answerId: number) {
    let answers = this.answers.has(questionId) ? this.answers.get(questionId) : [];

    answers = !answers.includes(answerId)
      ? [...answers, answerId]
      : answers.filter(x => x !== answerId);

    this.answers.set(questionId, answers);
    this.selectedAnswers.emit(this.answers);
  }

  hasAnswer(questionId: number): boolean {
    return this.answers.has(questionId);
  }

  isSelectedAnswer(questionId: number, answerId: number) {
    return this.hasAnswer(questionId) && this.answers.get(questionId).includes(answerId);
  }
}
