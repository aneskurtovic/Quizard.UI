import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl: string = environment.api + '/api/account/login';

  constructor(private http: HttpClient) {}

  checkAuth(creditentials: string): Observable<any> {
    return this.http.post(this.loginUrl, creditentials, httpOptions);
  }
}
