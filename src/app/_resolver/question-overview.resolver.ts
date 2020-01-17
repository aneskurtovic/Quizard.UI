import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { QuestionService } from './../services/question.service';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Question } from '../_models/question';
import { catchError } from 'rxjs/operators';

@Injectable() 
export class QuestionOverviewResolver implements Resolve<Question[]>{
    pageNumber = 1;
    pageSize = 5;

    constructor(private questionService: QuestionService, private router: Router, private toastr: ToastrService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Question[]> {
        return this.questionService.getQuestions(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toastr.error('Problem retieveing data', 'Error');
                this.router.navigate(['/questions-overview']);
                return of(null);
            })
        )
    }

}
