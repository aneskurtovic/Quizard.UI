import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PagedResult } from 'src/app/models/pagination';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from './../../../models/quiz';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html'
})
export class QuizOverviewComponent implements OnInit {
  page = 1;
  itemsPerPage = 6;
  pageResult: PagedResult<Quiz>;
  rows: Quiz[];
  ColumnMode = ColumnMode;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.loadQuizzes();
  }

  loadQuizzes(offset?: number) {
    const pageNumber = offset || 0;
    this.quizService
      .getQuizzes({ offset: pageNumber, pageSize: this.itemsPerPage })
      .subscribe(res => {
        this.rows = res.data;
        this.pageResult = res;
      });
  }
  pageChanged(event: any): void {
    this.loadQuizzes(event.offset);
  }
  getId(row: any) {
    return row.id;
  }
}
