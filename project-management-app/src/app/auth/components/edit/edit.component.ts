/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/auth/services/userInfo/user-info.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IGetUser, IUser } from 'src/app/shared/user-models';
import { GetUsersService } from '../../services/userList/get-users.service';
import { UserNotFoundComponent } from '../modals/user-not-found/user-not-found.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public titles = {
    describe: 'You can make changes to the profile here',
    headTitle: 'Edit profile ',
    name: 'Name',
    login: 'Login',
    password: 'Password',
    submit: 'submit',
  };

  public hide: boolean = true;

  public formEdit: FormGroup;

  public user: IUser;

  public nameCurrent: string;

  public loginCurrent: string;

  constructor(
    private router: Router,
    private localStorSErvice: LocalStorageService,
    private getServ: GetUsersService,
    private userInfoServ: UserInfoService,
    private dialog: MatDialog,
  ) {
    if (this.localStorSErvice.getLocalStorage('id', 'token')) {
      this.router.navigate(['/edit']);
    }
  }

  openPopup() {
    this.dialog.open(UserNotFoundComponent);
  }

  ngOnInit(): void {
    this.formEdit = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.localStorSErvice.getLocalStorage('id', 'token')) {
      this.getServ.onUser().subscribe((data: IUser) => {
        this.user = data;
        this.nameCurrent = this.user.name;
        this.loginCurrent = this.user.login;
      });
    } else if (!this.localStorSErvice.getLocalStorage('id', 'token')) {
      console.log('You have to login/signup');
      this.openPopup();
      this.localStorSErvice.removeLocalStorage('id', 'token');
      this.router.navigate(['/admin']);
    }
  }

  adminPage() {
    this.router.navigate(['/admin']);
  }

  editUser() {
    console.log(this.formEdit.value);
  }
}
