import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Question } from 'src/app/_models/question';
import { QuestionService } from './../../../services/question.service';
import { PaginatedResult } from './../../../_models/pagination';

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
      this.questions = data['questions'].result;
      this.pagination = data['questions'].pagination;
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
