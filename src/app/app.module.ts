import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadModule } from 'ngx-type-ahead';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuestionsComponent } from './components/questions/add-questions/questions.component';
import { QuestionsOverviewComponent } from './components/questions/questions-overview/questions-overview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { DisplayQuestionsComponent } from './components/session/display-questions/display-questions.component';
import { DisplayResultComponent } from './components/session/display-result/display-result.component';
import { NavigateQuizComponent } from './components/session/navigate-quiz/navigate-quiz.component';
import { SessionComponent } from './components/session/session.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuestionsComponent,
    NavbarComponent,
    QuestionsOverviewComponent,
    CategoryComponent,
    QuizComponent,
    SessionComponent,
    DisplayQuestionsComponent,
    NavigateQuizComponent,
    DisplayResultComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TypeaheadModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:58365'],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
