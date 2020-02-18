import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';
import { environment } from './../../../../environments/environment';
import { PagedResult } from './../../../models/pagination';
import { QuizResponse } from './../../../models/quiz-response';
import { QuestionService } from './../../../services/question.service';
import { QuizService } from './../../../services/quiz.service';

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {
  page = 1;
  itemsPerPage = 10;
  pageResult: PagedResult<Question>;
  rows: Question[];
  selected = [];
  isSelected = false;
  form: FormGroup;
  quiz: QuizResponse;
  emptyQuiz = false;
  submited = false;
  api = environment.api + '/quiz/';

  pageNumber: number;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  modalRef: BsModalRef;

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private quizService: QuizService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadQuestions();
    this.form = this.fb.group({
      name: ['', Validators.required],
      questionIds: []
    });
    this.form.controls.name.valueChanges.subscribe(value => {
      if (value === null || value.trim() === '') {
        this.emptyQuiz = true;
        return;
      }
      this.emptyQuiz = false;
    });
  }

  pageChanged(event: any): void {
    this.loadQuestions(event.offset);
  }

  getId(row: any) {
    return row.id;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);

    this.selected.push(...selected);
    this.isSelected = true;

    if (this.selected.length === 0) {
      this.isSelected = false;
    }
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

  addQuizz() {
    this.submited = true;
    if (this.emptyQuiz) {
      return;
    }

    const quiz = {
      ...this.form.value,
      questionIds: this.selected.map(x => x.id)
    };

    this.quizService.addQuiz(quiz).subscribe(response => {
      this.toastr.success('Quiz successfully created');
      this.submited = false;
      this.form.reset();
      this.quiz = response;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
