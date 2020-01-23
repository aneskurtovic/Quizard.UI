import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/models/pagination';
import { Question } from 'src/app/models/question';
import { PaginatedResult } from './../../../models/pagination';
import { QuestionService } from './../../../services/question.service';

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {
  questions: Question[];
  pagination: Pagination;

  constructor(
    private questionService: QuestionService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.questions = data['questions'.toString()].result;
      this.pagination = data['questions'.toString()].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService
      .getQuestions(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<Question[]>) => {
          this.questions = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.toastr.error('Could not get questions', 'Error');
        }
      );
  }
}
