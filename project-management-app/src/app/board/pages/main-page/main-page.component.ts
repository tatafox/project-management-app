import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HaveToAuthComponent } from 'src/app/auth/components/modals/have-to-auth/have-to-auth.component';
import { UserEditService } from 'src/app/auth/services/user-edit/user-edit.service';
import { GetUsersService } from 'src/app/auth/services/userList/get-users.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IUser } from 'src/app/shared/user-models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  private user: IUser;

  public error: any;

  private isToken: boolean;

  constructor(
    private serviceGet: GetUsersService,
    private router: Router,
    private dialog: MatDialog,
    private local: LocalStorageService,
    private editService: UserEditService,
  ) {}

  goToAdmin() {
    this.openPopup();
    this.removeLS();
    this.router.navigate(['/admin']);
  }
  openPopup() {
    this.dialog.open(HaveToAuthComponent);
  }

  removeLS() {
    this.local.removeLocalStorage('id', 'token');
  }

  ngOnInit(): void {
    this.isToken = this.local.getLocalStorage('id', 'token');

    this.serviceGet.statusError$.subscribe((err) => {
      this.goToAdmin();
    });
    // this.editService.statusError$.subscribe((err) => {
    //   this.goToAdmin();
    // });
    if (this.isToken) {
      this.serviceGet.getUser().subscribe((data) => {
        this.user = data;
      });
    } else {
      this.openPopup();
      this.removeLS();
      this.router.navigate(['/admin']);
    }
  }
}
