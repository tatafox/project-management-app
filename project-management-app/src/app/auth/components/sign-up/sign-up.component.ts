/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderNameService } from 'src/app/core/services/header-name.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IUser } from 'src/app/shared/user-models';
import { UserAuthServiceService } from '../../services/auth-service/user-auth-service.service';
import { PopupComponent } from '../modals/popup/popup.component';
import { SuccessRegistrComponent } from '../modals/success-registr/success-registr.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [UserAuthServiceService],
})
export class SignUpComponent implements OnInit {
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

  public hide: boolean = true;

  public formSignUp: FormGroup;

  public user: IUser;

  public statusError: string;

  subscription: Subscription;

  constructor(
    private authService: UserAuthServiceService,
    private router: Router,
    private dialog: MatDialog,
    private header: HeaderNameService,
    private localSt: LocalStorageService,
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
  }

  login() {
    this.router.navigate(['/login']);
  }

  adminPage() {
    this.router.navigate(['/admin']);
  }

  openPopup() {
    this.dialog.open(PopupComponent);
  }

  openSuccessPopup() {
    this.dialog.open(SuccessRegistrComponent);
  }

  submitNewUser() {
    this.localSt.getLocalStorage('id', 'token')
      ? this.formSignUp.disable()
      : this.authService
          .fetchRegistration(this.formSignUp.value)
          .subscribe((user) => {
            this.user = user;
            this.formSignUp.disable();
            this.header.sendName(this.user);
            this.openSuccessPopup();
            this.router.navigate(['/main']);
          });
    this.authService.statusError$.subscribe(() => {
      console.log('User login already exists!');
      this.openPopup();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }
}
