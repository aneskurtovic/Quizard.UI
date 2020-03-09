import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, concat, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Question } from 'src/app/models/question';
import { PagedResult } from './../../../models/pagination';
import { QuizResponse } from './../../../models/quiz-response';
import { CategoryService } from './../../../services/category.service';
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
  private searchByCategoryObservable$: BehaviorSubject<number[]> = new BehaviorSubject(null);
  componentDestroyed$: Subject<void> = new Subject();

  category$: Observable<Category[]>;
  categoryLoading = false;
  categoryInput$ = new Subject<string>();
  _selectedCategory: Category[] = [];
  selectedOperand: number;
  btnText = 'OR';

  set selectedCategory(selectedCategories: Category[]) {
    this._selectedCategory = selectedCategories;
    this.handleCategoryChanged(selectedCategories.map(x => x.id));
  }
  get selectedCategory() {
    return this._selectedCategory;
  }

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    private quizService: QuizService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadQuestions();
    this.loadCategories();
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      questionIds: [],
      timer: [1, [Validators.required, Validators.min(1)]]
    });
    this.form.controls.name.valueChanges.subscribe(value => {
      if (value === null || value.trim() === '') {
        this.emptyQuiz = true;
        return;
      }
      this.emptyQuiz = false;
    });

    this.searchTermObservable$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.componentDestroyed$))
      .subscribe(term => this.handleTermChanged(term));

    this.searchByCategoryObservable$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.componentDestroyed$))
      .subscribe(term => this.handleCategoryChanged(term));
  }

  emitOr(): number {
    return (this.selectedOperand = 1);
  }

  emitAnd(): number {
    return (this.selectedOperand = 2);
  }

  pageChanged = (event: any) => this.loadQuestions(event.offset);

  getId = (row: any) => row.id;

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);

    this.selected.push(...selected);
    this.isSelected = true;

    if (this.selected.length === 0) {
      this.isSelected = false;
    }
  }

  loadQuestions(offset?: number, name?: string, category?: number[], operand?: number) {
    const pageNumber = offset || 0;
    operand = this.selectedOperand || 1;
    this.questionService
      .getQuestions({
        offset: pageNumber,
        pageSize: this.itemsPerPage,
        name,
        category,
        operand
      })
      .subscribe(res => {
        this.rows = res.data;
        this.pageResult = res;
        this.pageNumber = res.metadata.offset;
      });
  }

  loadCategories() {
    this.category$ = concat(
      of([]),
      this.categoryInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.categoryLoading = true)),
        switchMap(term =>
          this.categoryService.getAll(term).pipe(
            catchError(() => of([])),
            tap(() => (this.categoryLoading = false))
          )
        )
      )
    );
  }

  trackByFn(item: Category) {
    return item.id;
  }

  addQuizz() {
    this.submited = true;
    if (
      this.emptyQuiz ||
      this.form.controls.name.errors ||
      this.selected.length === 0 ||
      this.form.controls.timer.errors
    ) {
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

  updateFilter(event) {
    this.searchTermObservable$.next(event.target.value.toLowerCase());
  }

  updateCategory(event) {
    this.searchTermObservable$.next(event.target.value.toLowerCase());
  }

  handleTermChanged(term: string) {
    this.loadQuestions(0, term);
  }

  handleCategoryChanged(category: number[]) {
    this.loadQuestions(0, null, category);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }

  openModal = (template: TemplateRef<any>) => (this.modalRef = this.modalService.show(template));
}
