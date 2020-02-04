import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuestionsComponent } from './components/questions/add-questions/questions.component';
import { QuestionsOverviewComponent } from './components/questions/questions-overview/questions-overview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AuthGuard } from './services/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: QuestionsOverviewComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'add-question',
    component: QuestionsComponent,
    data: {
      title: 'Questions'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz',
    component: QuizComponent,
    data: {
      title: 'Quiz'
    }
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
    data: {
      title: 'Start Quiz'
    }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
