import { TestComponent } from './test/test.component';
import { NgModule } from '@angular/core';  
import { Routes, RouterModule } from '@angular/router';  
import { HomeComponent } from './home/home.component';  
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';  

const routes: Routes = [  
  {  
    path: '',  
    component: HomeComponent,
    data: {  
      title: 'Home'   
    }  
  },  
  {  
    path: 'login',  
    component: LoginComponent,  
    data: {  
      title: 'Login'  
    }  
  },  
  {  
    path: 'test',  
    component: TestComponent,  
    data: {  
      title: 'Test'  
    },
    canActivate: [AuthGuard] 
  }  
];  
@NgModule({  
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]  
})  
export class AppRoutingModule { } 