import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {}

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.loginService.checkAuth(credentials).subscribe(
      response => {
        const token = (response as any).token;
        const email = (response as any).email;
        localStorage.setItem('jwt', token);
        localStorage.setItem('email', email);
        this.invalidLogin = false;
        this.router.navigate(['/']);
      },
      err => {
        this.invalidLogin = true;
      }
    );
  }
}
