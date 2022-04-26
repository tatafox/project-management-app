import { Component, OnInit } from '@angular/core';

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
  ngOnInit(): void {}
}
