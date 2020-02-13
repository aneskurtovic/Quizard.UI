import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../models/question';
@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {
  @Input() quizResults: any;
  @Input() questions: Question[];
  @Input() selectedAnswers: Map<number, number>;

  constructor() {}

  ngOnInit() {
    console.log(this.selectedAnswers);
  }
}
