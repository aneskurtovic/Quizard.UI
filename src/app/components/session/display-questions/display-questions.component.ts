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

  constructor() {}

  ngOnInit() {}
}
