import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  styles: [
    `
      input.ng-invalid.ng-touched {
        background-color: #de1d1d4f;
      }
    `,
  ],
})
export class AdminPageComponent implements OnInit {
  constructor(private router: Router) {}

  signUp() {
    this.router.navigate(['/signup']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
