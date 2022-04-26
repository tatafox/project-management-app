import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public titles = {
    describe: 'You have to login, if you have got an account',
    headTitle: 'Login ',
    login: 'Login',
    password: 'Password',
    submit: 'Login',
  };

  private isLogIn: boolean = true;

  public formLogIn: FormGroup;

  public hide: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.formLogIn = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  logInUser() {
    console.log(this.formLogIn);
  }
}
