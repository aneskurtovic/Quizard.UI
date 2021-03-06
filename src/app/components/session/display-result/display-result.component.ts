import { Component, Input } from '@angular/core';
import { Question } from '../../../models/question';
import { ResultQuiz } from '../../../models/ResultQuiz';
@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent {
  @Input() quizResults: ResultQuiz;
  @Input() questions: Question[];
  @Input() selectedAnswers: Map<number, number[]>;

  constructor() {}

  isCorrectAnswered(id: number): boolean {
    const answers = this.selectedAnswers.get(id);
    const correctAnswers = this.quizResults.correctQuestions[id];

    if (!answers) {
      return false;
    }

    if (answers && answers.length !== correctAnswers.length) {
      return false;
    }

    if (answers) {
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
    }
    return true;
  }

  isSelected = (aId: number, qId: number) =>
    this.selectedAnswers.get(qId) && this.selectedAnswers.get(qId).includes(aId) ? true : false;

  isCorrectAnswer = (aId: number, qId: number) =>
    this.quizResults.correctQuestions[qId] && this.quizResults.correctQuestions[qId].includes(aId)
      ? true
      : false;
}
