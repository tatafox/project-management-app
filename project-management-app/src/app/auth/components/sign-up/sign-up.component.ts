/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserSignUp } from 'src/app/shared/user-models';
import { UserAuthServiceService } from '../../services/auth-service/user-auth-service.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserAuthServiceService],
})
export class SignUpComponent implements OnInit, OnDestroy {
  public titles = {
    describe: "You have to sign up, if you haven't got an account",
    headTitle: 'Sign Up',
    name: 'Name',
    login: 'Login',
    password: 'Password',
    repeat: 'Repeat the password',
    submit: 'Sign up',
  };

  subscribe: Subscription;

  public hidePassword: boolean = false;

  public isSignup: boolean = true;

  public formSignUp: FormGroup;

  private users: IUserSignUp[];

  public statusError: number;

  constructor(
    private authService: UserAuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.formSignUp = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    // this.route.queryParams.subscribe((params: Params) => {
    //   if (params['signup']) {
    //     /* ok */
    //   } else if (params['errorSignup']) {
    //     // error signup
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }

  openPopup() {
    this.dialog.open(PopupComponent);
  }

  submitNewUser() {
    this.isSignup = true;
    this.authService.fetchRegistration(this.formSignUp.value);
    this.authService.user$.subscribe((user) => {
      // тут мы получили юзера, с токеном и т.д.
      // возможно надо добавить проверку что токен есть
      console.log(user);
      // this.router.navigate(['/main']);
    });
    this.authService.statusError$.subscribe((error) => {
      if (!error) {
        this.formSignUp.disable();
      }
      this.statusError = error;
      this.statusError === 409
        ? this.openPopup()
        : console.log(this.statusError);
    });
  }

  getListUsers() {
    this.authService.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
      console.log(this.users);
    });
  }
}
