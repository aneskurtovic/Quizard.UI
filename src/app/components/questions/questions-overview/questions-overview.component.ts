import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Question } from 'src/app/models/question';
import { PagedResult } from './../../../models/pagination';
import { QuizResponse } from './../../../models/quiz-response';
import { QuestionService } from './../../../services/question.service';
import { QuizService } from './../../../services/quiz.service';

@Component({
  selector: 'app-questions-overview',
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit, OnDestroy {
  page = 1;
  itemsPerPage = 10;
  pageResult: PagedResult<Question>;
  rows: Question[];
  temp = [];
  selected = [];
  isSelected = false;
  form: FormGroup;
  quiz: QuizResponse;
  emptyQuiz = false;
  submited = false;
  api = location.origin + '/quiz/';

  pageNumber: number;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  modalRef: BsModalRef;

  private searchTermObservable$: BehaviorSubject<string> = new BehaviorSubject(null);
  componentDestroyed$: Subject<void> = new Subject();

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
      name: ['', [Validators.required, Validators.maxLength(25)]],
      questionIds: []
    });
    this.form.controls.name.valueChanges.subscribe(value => {
      if (value === null || value.trim() === '') {
        this.emptyQuiz = true;
        return;
      }
      this.emptyQuiz = false;
    });

    this.searchTermObservable$
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.componentDestroyed$))
      .subscribe(term => this.handleTermChanged(term));
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

  loadQuestions(offset?: number, name?: string) {
    const pageNumber = offset || 0;

    this.questionService
      .getQuestions({ offset: pageNumber, pageSize: this.itemsPerPage, name })
      .subscribe(res => {
        this.rows = res.data;
        this.pageResult = res;
        this.temp = [...res.data];
        this.pageNumber = res.metadata.offset;
      });
  }

  addQuizz() {
    this.submited = true;
    if (this.emptyQuiz || this.form.controls.name.errors) {
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

  updateFilter(event, datatable: DatatableComponent) {
    this.searchTermObservable$.next(event.target.value.toLowerCase());
  }

  handleTermChanged(term: string) {
    this.loadQuestions(0, term);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }
}
