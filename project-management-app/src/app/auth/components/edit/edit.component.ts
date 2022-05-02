import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeaderNameService } from 'src/app/core/services/header-name.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IGetUser } from 'src/app/shared/user-models';
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

  public user: IGetUser;

  public nameCurrent: string = '';

  public loginCurrent: string = '';

  constructor(
    private router: Router,
    private localStorSErvice: LocalStorageService,
    private getServ: GetUsersService,
    private headerServ: HeaderNameService,
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
        Validators.minLength(4),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.localStorSErvice.getLocalStorage('id', 'token')) {
      this.getServ.getUser().subscribe((data: IGetUser) => {
        this.user = data;
        this.nameCurrent = this.user.name;
        this.loginCurrent = this.user.login;
        this.headerServ.sendName(this.user);
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
