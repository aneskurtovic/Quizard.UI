import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Question } from '../_models/question';
import { QuestionService } from './../services/question.service';

@Injectable()
export class QuestionOverviewResolver implements Resolve<Question[]> {
  pageNumber = 1;
  pageSize = 7;

  constructor(private questionService: QuestionService, private toastr: ToastrService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Question[]> {
    return this.questionService.getQuestions(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.toastr.error('Problem retieveing data', 'Error');
        return of(null);
      })
    );
  }
}
