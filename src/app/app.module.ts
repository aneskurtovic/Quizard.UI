import { QuestionsComponent } from './components/questions/add-questions/questions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap';




import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { QuestionsOverviewComponent } from './components/questions/questions-overview/questions-overview.component';
import { QuestionOverviewResolver } from './_resolver/question-overview.resolver';
 
export function tokenGetter() {
   return localStorage.getItem("jwt");
 }
 
@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      QuestionsComponent,
      NavbarComponent,
      QuestionsOverviewComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      PaginationModule.forRoot(),
      ToastrModule.forRoot(),
       JwtModule.forRoot({
         config: {
           tokenGetter: tokenGetter,
           whitelistedDomains: ["localhost:58365"],
           blacklistedRoutes: []
         }
       })
   ],
   providers: [AuthGuard, QuestionOverviewResolver],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
