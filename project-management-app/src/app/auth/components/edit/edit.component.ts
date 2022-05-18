/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IUser, IUserSignUp } from 'src/app/shared/models/user-models';
import { UserEditService } from '../../services/user-edit/user-edit.service';
import { GetUsersService } from '../../services/userList/get-users.service';
import { SuccessRegistrComponent } from '../modals/success-registr/success-registr.component';
import { UserIsExistComponent } from '../modals/user-is-exist/user-is-exist.component';
import { UserNotFoundComponent } from '../modals/user-not-found/user-not-found.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  dialogRef: MatDialogRef<SuccessRegistrComponent>;

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

  public userEdit: IUserSignUp;

  public nameCurrent: string;

  public loginCurrent: string;

  constructor(
    private router: Router,
    private localStorSErvice: LocalStorageService,
    private getService: GetUsersService,
    private editService: UserEditService,
    private dialog: MatDialog,
  ) {
    if (this.localStorSErvice.getLocalStorage('id', 'token')) {
      this.router.navigate(['/edit']);
    }
  }

  adminPage() {
    this.router.navigate(['/admin']);
  }

  openPopup() {
    this.dialog.open(UserNotFoundComponent);
  }

  openError() {
    this.dialog.open(UserIsExistComponent);
  }

  ngOnInit(): void {
    this.getService.getUser().subscribe((data) => {
      this.user = data;
    });
    this.formEdit = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.localStorSErvice.getLocalStorage('id', 'token')) {
      this.getService.onUser().subscribe((data: IUser) => {
        this.user = data;
        this.nameCurrent = this.user.name;
        this.loginCurrent = this.user.login;
      });
    } else {
      this.openPopup();
      this.localStorSErvice.removeLocalStorage('id', 'token');
      this.router.navigate(['/admin']);
    }
  }

  public editUser() {
    this.userEdit = this.formEdit.value;
    const token = localStorage.getItem('token') || '{}';
    this.editService
      .editUser(this.user.id, token, this.userEdit)
      .subscribe((data) => {
        if (data) this.user = data;
        this.dialogRef = this.dialog.open(SuccessRegistrComponent);
        this.dialogRef.componentInstance.messageTitle = 'Success!';
        // eslint-disable-next-line operator-linebreak
        this.dialogRef.componentInstance.messageDescribe =
          'Everything went well';

        this.router.navigate(['/admin']);
      });

    this.editService.statusError$.subscribe((err) => {
      if (err) {
        this.openError();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        this.router.navigate(['/main']);
      }
    });
  }
}
