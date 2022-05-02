import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { PopupLogoutComponent } from '../../modals/popup-logout/popup-logout.component';
import { HeaderNameService } from '../../services/header-name.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string;

  constructor(
    private header: HeaderNameService,
    private localStorage: LocalStorageService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  openPopup() {
    this.dialog.open(PopupLogoutComponent);
  }

  ngOnInit(): void {
    this.header.onMessage().subscribe((user) => {
      this.userName = user.name;
    });
  }

  editUser() {
    this.router.navigate(['/edit']);
  }

  logout() {
    this.localStorage.removeLocalStorage('id', 'token');
    this.userName = '';
    this.router.navigate(['/admin']);
    this.openPopup();
  }
}
