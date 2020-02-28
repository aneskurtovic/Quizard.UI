import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  isNavHidden(): boolean {
    const url = this.router.url;
    return url.includes('session') || url.includes('login') || url.includes('start-quiz')
      ? true
      : false;
  }
}
