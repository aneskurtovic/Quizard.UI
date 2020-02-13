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
  currentIndexChange: EventEmitter<number> = new EventEmitter();
  status = false;
  private _currentIndex: number;

  constructor() {}

  set currentIndex(val: number) {
    this.currentIndexChange.emit(val);
    this._currentIndex = val;
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  selectAnswer(questionId: number, answerId: number) {
    this.status = true;
    this.answers.set(questionId, answerId);
    this.selectedAnswers.emit(this.answers);
  }
  ngOnInit() {}
}
