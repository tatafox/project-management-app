import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  public authLabel = {
    title: 'Login',
    login: 'login',
    password: 'password',
  };

  public logStatus: boolean = false;

  private subscription: Subscription;

  public hide: boolean = true;

  constructor(private router: Router) {}

  private login: string = '';

  public password: string = '';

  public loginForm: FormGroup;

  ngOnInit(): void {
    /* -----form-----*/
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    /* -----login-----*/
    this.loginForm.controls['login'].valueChanges.subscribe((value) => {
      this.login = value;
    });
    this.loginForm.controls['password'].valueChanges.subscribe((value) => {
      this.password = value;
    });

    /* -----status-----*/
  }
}
