import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from './../../../models/question';

@Component({
  selector: 'app-navigate-quiz',
  templateUrl: './navigate-quiz.component.html',
  styleUrls: ['./navigate-quiz.component.css']
})
export class NavigateQuizComponent {
  private _currentIndex: number;

  @Input() questions: Question[];
  @Input() selectedAnswers: Map<number, number>;
  @Input()
  set currentIndex(val: number) {
    this.currentIndexChange.emit(val);
    this._currentIndex = val;
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  @Output()
  currentIndexChange: EventEmitter<number> = new EventEmitter();

  next() {
    this.currentIndex++;
  }

  previous() {
    this.currentIndex--;
  }

  isQuestionAnswered(question: Question): boolean {
    if (this.selectedAnswers.has(question.id)) {
      return true;
    }
    return false;
  }
}
