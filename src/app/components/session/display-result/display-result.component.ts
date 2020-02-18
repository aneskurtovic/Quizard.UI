import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question';
@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent {
  @Input() quizResults: any;
  @Input() questions: Question[];
  @Input() selectedAnswers: Map<number, number[]>;

  constructor() {}

  isCorrectAnswered(id: number): boolean {
    const answers = this.selectedAnswers.get(id);
    const correctAnswers = this.quizResults.correctQuestions[id];

    if (answers.length !== correctAnswers.length) {
      return false;
    }

    for (const selectedAnswer of answers) {
      let incorrect = true;
      correctAnswers.forEach(correctAnswer => {
        if (selectedAnswer === correctAnswer) {
          incorrect = false;
        }
      });
      if (incorrect) {
        return false;
      }
    }
    return true;
  }

  isSelected(aId: number, qId: number): boolean {
    if (this.selectedAnswers.get(qId).includes(aId)) {
      return true;
    }
    return false;
  }

  isCorrectAnswer(aId: number, qId: number): boolean {
    if (this.quizResults.correctQuestions[qId].includes(aId)) {
      return true;
    }
    return false;
  }
}
