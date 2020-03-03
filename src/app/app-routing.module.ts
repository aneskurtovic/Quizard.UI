import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionsComponent } from './components/questions/add-questions/questions.component';
import { QuestionsOverviewComponent } from './components/questions/questions-overview/questions-overview.component';
import { QuizOverviewComponent } from './components/quiz/quiz-overview/quiz-overview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { SessionComponent } from './components/session/session.component';
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
    path: 'start-quiz',
    component: QuizComponent,
    data: {
      title: 'Quiz'
    }
  },
  {
    path: 'quizzes',
    component: QuizOverviewComponent,
    data: {
      title: 'Quiz-Overview'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'start-quiz/:id',
    component: QuizComponent,
    data: {
      title: 'Start Quiz'
    }
  },
  {
    path: 'start-quiz/:quizId/session/:id',
    component: SessionComponent,
    data: {
      title: 'Quiz Session'
    }
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    data: {
      title: 'Leaderboard'
    }
  },
  {
    path: 'leaderboard/:id',
    component: LeaderboardComponent,
    data: {
      title: 'Leaderboard'
    }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
