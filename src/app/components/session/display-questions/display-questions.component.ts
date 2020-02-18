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
  @Output() selectedAnswers = new EventEmitter<Map<number, number[]>>();
  @Output() submitButton = new EventEmitter<boolean>();
  answers: Map<number, number[]> = new Map<number, number[]>();
  answerIDs: number[] = [];
  constructor() {}

  submited() {
    this.submitButton.emit();
  }
  selectAnswer(questionId: number, answerId: number) {
    if (this.answers.has(questionId)) {
      if (this.answers.get(questionId).includes(answerId)) {
        const index = this.answers.get(questionId).indexOf(answerId);
        this.answers.get(questionId).splice(index, 1);
        if (this.answers.get(questionId).length === 0) {
          this.answers.delete(questionId);
        }
        return;
      }
      this.answerIDs = this.answers.get(questionId);
      this.answerIDs.push(answerId);
    } else {
      this.answerIDs = [];
      this.answerIDs.push(answerId);
    }
    this.answers.set(questionId, this.answerIDs);
    this.selectedAnswers.emit(this.answers);
  }
  ngOnInit() {}

  hasAnswer(questionId: number): boolean {
    return this.answers.has(questionId);
  }

  isSelectedAnswer(questionId: number, answerId: number) {
    return this.hasAnswer(questionId) && this.answers.get(questionId).includes(answerId);
  }
}
