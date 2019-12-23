import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    this.http.post("http://localhost:58365/api/account/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      let token = (<any>response).token;
      let username = (<any>response).username;
      localStorage.setItem("jwt", token);
      localStorage.setItem("username", username);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

}
