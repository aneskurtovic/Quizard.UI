import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DifficultyLevel } from '../../../models/difficultyLevel';
import { QuestionService } from '../../../services/question.service';
import { CustomValidators } from '../../../validators/custom-validators';
import { CategoryComponent } from '../../category/category.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  form: FormGroup;
  formattedMessage: string;
  submited = false;
  duplicated = false;
  difficultyLevels: DifficultyLevel[] = [];
  Level = 0;
  emptyQuestion = false;
  categoryIDes: number[] = [];
  selected = -1;

  private categoryComponent: CategoryComponent;
  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      Text: ['', Validators.required],
      DifficultyLevelId: ['0'],
      Categories: [],
      answers: this.fb.array(
        [this.answerGroup(), this.answerGroup()],
        [CustomValidators.minLengthOfValidAnswers(), Validators.required]
      )
    });

    this.form.get('answers').valueChanges.subscribe(console.log);
    this.loadDifficultyLevels();
    this.form.controls.Text.valueChanges.subscribe(value => {
      if (value.trim() === '') {
        this.emptyQuestion = true;
        return;
      }
      this.emptyQuestion = false;
    });
  }
  get Text() {
    return this.form.get('Text');
  }
  answerGroup(): FormGroup {
    const result = this.fb.group({
      Text: this.fb.control('', Validators.required),
      IsCorrect: [false, Validators.required]
    });
    return result;
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
    const myArray = this.answersArray.controls.filter(
      data => data.value.Text === Text && Text !== ''
    );
    if (myArray.length > 1) {
      this.duplicated = true;
      return true;
    } else {
      this.duplicated = false;
      return false;
    }
  }

  onCategoriesChange(categoryIds: number[]) {
    this.categoryIDes = categoryIds;
  }
  addQuestion() {
    this.submited = true;
    this.form.value.Categories = this.categoryIDes;

    if (
      this.form.invalid ||
      this.duplicated ||
      this.Level === 0 ||
      this.categoryIDes.length < 1 ||
      this.emptyQuestion
    ) {
      return;
    } else {
      const credentials = JSON.stringify(this.form.value);
      this.questionService.checkAuth(credentials).subscribe(
        response => {
          this.toastr.success('Inserted to database!', 'Success');
          this.submited = false;
          this.router.navigate(['']);
        },
        err => {
          console.log(err);
          this.toastr.error('Could not insert to database', 'Error', {
            timeOut: 3000
          });
        }
      );
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
    return this.questionService.getDifficultyLevel().subscribe(
      (difficultyLevels: DifficultyLevel[]) => {
        this.difficultyLevels = difficultyLevels;
      },
      error => {
        this.toastr.error('Could not retrive data from database', 'Error', {
          timeOut: 3000
        });
      }
    );
  }
}
