import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private questionService: QuestionService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadQuestions();
  }

  pageChanged(event: any): void {
    this.loadQuestions(event.page);
  }

  loadQuestions(page?: number) {
    const pageNumber = page || 1;
    this.questionService
      .getQuestions({ pageNumber, pageSize: this.itemsPerPage })
      .subscribe(res => {
        this.pageResult = res;
      });
  }
}
