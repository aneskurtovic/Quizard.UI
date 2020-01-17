import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/categoryService/category.service';
import { QuestionService } from './../../services/questionService/question.service';
import { CustomValidators } from './../../validators/custom-validators';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: [
    './questions.component.css'
]
})
export class QuestionsComponent implements OnInit {
  form: FormGroup;
  formattedMessage: string;
  submited = false;
  duplicated = true;

  
  @ViewChild(CategoryComponent, {static:false})
  private categoryComponent: CategoryComponent;
  constructor(private fb: FormBuilder, private questionService: QuestionService,
    private toastr: ToastrService, private categoryService: CategoryService, private router: Router) { }
  ngOnInit() {
    this.form = this.fb.group({
      Text: this.fb.control('', [Validators.required]),
      Categories: [],
      answers: this.fb.array(
        [this.answerGroup(), this.answerGroup()],
        [ CustomValidators.minLengthOfValidAnswers(1), Validators.required]
      )
    });
  }
  get Text() {
    return this.form.get('Text');
  }
  answerGroup() : FormGroup {
    return this.fb.group({
      Text: this.fb.control('', Validators.required),
      IsCorrect: false
    })
  }
  get answersArray(): FormArray {
    return this.form.get('answers') as FormArray;
  }
  addAnotherAnswer() {
    this.answersArray.push(this.answerGroup());
  }
  get removeButtonDisabled(): boolean {
    return this.answersArray.length === 2;
  }
  
  removeAnswer(i: number) {
    this.answersArray.removeAt(i);
  }
  addQuestion(form) {
    this.submited = true;
    this.form.value.Categories = this.categoryComponent.categoryIds;
    if (this.form.invalid || this.duplicated || this.categoryComponent.categoryIds.length === 0 ) {
      return;
    } else {
      let credentials = JSON.stringify(form.value);
      this.questionService.checkAuth(credentials).subscribe(response => {
        this.toastr.success('Inserted to database!', 'Success');
        this.submited = false;
        this.duplicated = true;
        this.router.navigate(["/questions-overview"]);
      }, err => {
        this.toastr.error('Couldn\'t insert to database', 'Error', {
          timeOut: 3000
        });
      });
    } 
  }
  findDuplicate(Text: string) {
    let myArray = this.answersArray.controls
      .filter(data => data.value.Text === Text && Text !== "")
    if (myArray.length > 1) {
      this.duplicated = true;
      return true;
    } else {
      this.duplicated = false;
      return false;
    }
  }
   get formStatus() {
    return {
      valid: this.form.valid,
      dirty: this.form.dirty,
      touched: this.form.touched,
      value: this.form.value
    };
  }  
}
