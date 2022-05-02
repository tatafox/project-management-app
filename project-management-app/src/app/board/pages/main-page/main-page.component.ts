import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HaveToAuthComponent } from 'src/app/auth/components/modals/have-to-auth/have-to-auth.component';
import { GetUsersService } from 'src/app/auth/services/userList/get-users.service';
import { HeaderNameService } from 'src/app/core/services/header-name.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IGetUser } from 'src/app/shared/user-models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  private user: IGetUser;

  public error: any;

  private isTokenInLS = localStorage.getItem('token');

  private isIDInLS = localStorage.getItem('id');

  constructor(
    private serviceGet: GetUsersService,
    private router: Router,
    private dialog: MatDialog,
    private header: HeaderNameService,
    private local: LocalStorageService,
  ) {}

  openPopup() {
    this.dialog.open(HaveToAuthComponent);
  }

  ngOnInit(): void {
    this.serviceGet.statusError$.subscribe((err) => {
      if (err) {
        this.openPopup();
        this.local.removeLocalStorage('id', 'token');
        this.router.navigate(['/admin']);
      }
    });
    if (this.isTokenInLS && this.isIDInLS) {
      this.serviceGet.getUser().subscribe((data) => {
        this.user = data;
        this.header.sendName(this.user);
      });
    } else if (!this.isTokenInLS || !this.isIDInLS) {
      this.openPopup();
      this.local.removeLocalStorage('id', 'token');
      this.router.navigate(['/admin']);
    }
  }
}
