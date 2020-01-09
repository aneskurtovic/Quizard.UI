import { QuestionService } from './../../services/questionService/question.service';
import { CustomValidators } from './../../validators/custom-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private fb: FormBuilder, private questionService: QuestionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      questionText: this.fb.control('', Validators.required),
      answers: this.fb.array(
        [this.answerGroup(), this.answerGroup()],
        [ CustomValidators.minLengthOfValidAnswers(1), Validators.required]
      )
    });
  }
  answerGroup() : FormGroup {
    return this.fb.group({
      answerText: this.fb.control('', Validators.required),
      correct: false
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
    let credentials = JSON.stringify(form.value);
    this.questionService.checkAuth(credentials).subscribe(response => {
      this.toastr.success('Inserted to database!', 'Success');

    }, err => {
      this.toastr.error('Couldn\'t insert to database', 'Error', {
        timeOut: 3000
      });
    });
  }

  get addQuestionButtonDisable(): boolean {
    return !this.form.valid;
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
