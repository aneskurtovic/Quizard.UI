import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Question } from 'src/app/models/question';
import { Quiz } from 'src/app/models/quiz';
import { PagedResult } from './../../../models/pagination';
import { QuestionService } from './../../../services/question.service';
import { QuizService } from './../../../services/quiz.service';

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
  isSelected = false;
  form: FormGroup;
  quizId: Quiz;

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
      questions: []
    });
  }

  pageChanged(event: any): void {
    this.loadQuestions(event.offset);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
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
    const temp = [];
    for (let i = 0; i < this.selected.length; i++) {
      temp[i] = this.selected[i].id;
    }
    this.form.value.questions = temp;
    console.log(this.form.value);

    const quiz = JSON.stringify(this.form.value);
    this.quizService.addQuiz(quiz).subscribe(response => {
      this.toastr.success('Quiz successfully created');
      this.form.reset();
      this.quizId = response;
      console.log(response);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
