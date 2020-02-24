import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService) {}

  isUserAuthenticated() {
    const token: string = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  get username() {
    return localStorage.getItem('email');
  }

  public logOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
  };

  ngOnInit() {}
}
