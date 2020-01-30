import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Question } from 'src/app/models/question';
import { PagedResult } from './../../../models/pagination';
import { QuestionService } from './../../../services/question.service';

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {
  page = 1;
  itemsPerPage = 7;
  pageResult: PagedResult<Question>;
  rows: Question[];
  selected = [];

  columns = [
    { prop: 'text', sortable: false, name: 'Question' },
    { prop: 'categories', sortable: false, name: 'Categories' }
  ];
  pageNumber: number;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.loadQuestions();
  }

  pageChanged(event: any): void {
    this.loadQuestions(event.offset);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  loadQuestions(offset?: number) {
    const pageNumber = offset || 0;
    this.questionService
      .getQuestions({ offset: pageNumber, pageSize: this.itemsPerPage })
      .subscribe(res => {
        this.rows = res.data;
        this.pageResult = res;
      });
  }
}
