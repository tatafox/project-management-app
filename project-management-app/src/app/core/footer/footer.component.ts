import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  private date = new Date();

  public year: number;

  constructor() {}

  ngOnInit(): void {
    this.year = this.date.getFullYear();
  }
}
