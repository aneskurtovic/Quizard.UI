import { TestComponent } from './test/test.component';
import { AuthGuard } from './guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';  
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


export function tokenGetter() {
   return localStorage.getItem("jwt");
 }
 
@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      TestComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      RouterModule,
       JwtModule.forRoot({
         config: {
           tokenGetter: tokenGetter,
           whitelistedDomains: ["localhost:58365"],
           blacklistedRoutes: []
         }
       })
   ],
   providers: [AuthGuard],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
