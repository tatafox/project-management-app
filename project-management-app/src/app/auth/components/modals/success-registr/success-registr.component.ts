import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-registr',
  templateUrl: './success-registr.component.html',
  styleUrls: ['./success-registr.component.scss'],
})
export class SuccessRegistrComponent implements OnInit {
  public messageTitle: string = '';

  public messageDescribe: string = '';

  constructor() {}

  ngOnInit(): void {}
}
