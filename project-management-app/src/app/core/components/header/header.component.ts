import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserEditService } from 'src/app/auth/services/user-edit.service';
import { GetUsersService } from 'src/app/auth/services/userList/get-users.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IGetUser, IUser } from 'src/app/shared/user-models';
import { PopupLogoutComponent } from '../../modals/popup-logout/popup-logout.component';
import { UserInfoService } from '../../../auth/services/userInfo/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userName: string;

  public user: IUser;

  public token!: string | null;

  public id: string = '';

  public href: string = '';

  constructor(
    private localSt: LocalStorageService,
    private router: Router,
    private dialog: MatDialog,
    private editService: UserEditService,
    private serviceGet: GetUsersService,
  ) {}

  openPopup() {
    this.dialog.open(PopupLogoutComponent);
  }

  ngOnInit(): void {
    this.serviceGet.onUser().subscribe((userInfo) => {
      this.user = userInfo;
      this.userName = this.user.name;
      console.log(userInfo);
    });

    if (this.token) {
      // this.token = JSON.parse(token);
    }
  }

  editUser() {
    this.router.navigate(['/edit']);
  }

  logout() {
    this.localSt.removeLocalStorage('id', 'token');
    this.userName = '';
    this.router.navigate(['/admin']);
    this.openPopup();
  }

  deleteUser() {
    const token = localStorage.getItem('token') || '{}';
    this.editService.deleteUser(this.user.id, token).subscribe((data) => {
      console.log(data);
    });
    this.localSt.removeLocalStorage('id', 'token');
    this.userName = '';
    this.router.navigate(['/admin']);
  }
}
