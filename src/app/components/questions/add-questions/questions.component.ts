import { DifficultyLevel } from './../../../_models/difficultyLevel';
import { QuestionService } from './../../../services/question.service';
import { CustomValidators } from '../../../validators/custom-validators';
import { Router } from '@angular/router';
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
  submited: boolean = false;
  duplicated: boolean = false;
  difficultyLevels: DifficultyLevel[] = [];
  Level: number = 0;
  constructor(private fb: FormBuilder, private questionService: QuestionService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      Text: ['', [Validators.required]],
      DifficultyLevelId: ['0'],
      answers: this.fb.array(
        [this.answerGroup(), this.answerGroup()],
        [ CustomValidators.minLengthOfValidAnswers(1), Validators.required]
      )
    });
    
    this.loadDifficultyLevels();
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
  addQuestion() {
   // debugger;
    this.submited = true;
    console.log(this.form.value);
    if(this.form.invalid || this.duplicated || this.Level == 0) {
      return;
    } else {
      let credentials = JSON.stringify(this.form.value);
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
 
   get formStatus() {
    return {
      valid: this.form.valid,
      dirty: this.form.dirty,
      touched: this.form.touched,
      value: this.form.value
    };
  }  
  selectChangeHandler(event) {
    this.Level = event.target.value;
   }
   get getDifficultyLevel() {
     return this.form.get('DifficultyLevelId');
   }

   loadDifficultyLevels() {
     return this.questionService.getDifficultyLevel().subscribe((difficultyLevels: DifficultyLevel[]) => {
       this.difficultyLevels = difficultyLevels;
     }, error => {
      this.toastr.error('Couldn\'t insert to database', 'Error', {
        timeOut: 3000
      });
     });
   }
}
