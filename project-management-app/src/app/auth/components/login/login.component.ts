/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-param-reassign */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IGetUser } from 'src/app/shared/user-models';
import { UserAuthServiceService } from '../../services/auth-service/user-auth-service.service';
import { GetUsersService } from '../../services/userList/get-users.service';
import { SuccessRegistrComponent } from '../modals/success-registr/success-registr.component';
import { UserNotFoundComponent } from '../modals/user-not-found/user-not-found.component';

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

  public errorMessage: string = '';

  public token: string = '';

  public formLogIn: FormGroup;

  public login: string = '';

  public hide: boolean = false;

  constructor(
    private router: Router,
    private authService: UserAuthServiceService,
    private getService: GetUsersService,
    private localStorSErvice: LocalStorageService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.formLogIn = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  adminPage() {
    this.router.navigate(['/admin']);
  }

  openPopupError() {
    this.dialog.open(UserNotFoundComponent);
  }

  openPopupSuccess() {
    this.dialog.open(SuccessRegistrComponent);
  }

  logInUser() {
    this.localStorSErvice.getLocalStorage('id', 'token')
      ? this.formLogIn.disable()
      : this.authService.signInUser(this.formLogIn.value).subscribe(
          (data) => {
            this.token = data.token;
            this.getService.getUserList().subscribe((list) => {
              this.login = this.formLogIn.value.login;
              // eslint-disable-next-line no-return-assign
              const userCurrent = list.filter(
                (item: IGetUser) => item.login === this.login,
              );
              localStorage.setItem('id', userCurrent[0].id);
              this.router.navigate(['/main']);
              this.openPopupSuccess();
            });
          },
          (err) => {
            console.log('User was not founded!');
            this.openPopupError();
            this.errorMessage = err.message;
          },
        );
  }

  signup() {
    this.router.navigate(['/sugnup']);
  }
}
