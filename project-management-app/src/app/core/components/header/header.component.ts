/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable operator-linebreak */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserEditService } from 'src/app/auth/services/user-edit/user-edit.service';
import { GetUsersService } from 'src/app/auth/services/userList/get-users.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IUser } from 'src/app/shared/models/user-models';
import { IBoardBody, IBoardDetail } from 'src/app/shared/models/board.model';
import { Store } from '@ngrx/store';
import { addBoard } from 'src/app/redux/actions/board.actions';
import { PopupLogoutComponent } from '../../modals/popup-logout/popup-logout.component';
import { PopupDeleteComponent } from '../../modals/popup-delete/popup-delete.component';
import { BoardModalComponent } from '../../../board/components/modal/board-modal/board-modal.component';
import { AppState } from '../../../redux/state.models';
import { BoardService } from '../../../board/services/board.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private dialogRef: MatDialogRef<PopupDeleteComponent>;

  public board: IBoardBody = {
    title: '',
    description: '',
  };

  public userName: string;

  public user: IUser;

  public token!: string | null;

  public id: string = '';

  public href: string = '';

  @ViewChild('header') header: ElementRef;

  public localeList = [
    { code: 'en-US', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ];

  constructor(
    private localSt: LocalStorageService,
    private router: Router,
    private dialog: MatDialog,
    private editService: UserEditService,
    private serviceGet: GetUsersService,
    private store: Store<AppState>,
    private readonly boardService: BoardService,
  ) {}

  ngOnInit(): void {
    this.serviceGet.onUser().subscribe((userInfo) => {
      this.user = userInfo;
      this.userName = this.user.name;
    });
    window.onscroll = () => {
      if (this.header) {
        const header = this.header.nativeElement;
        if (window.pageYOffset > 0) {
          header.style.background = '#FFA000';
        } else {
          header.style.background = '#FFC107';
        }
      }
    };
  }

  openLogoutPopup() {
    this.dialog.open(PopupLogoutComponent);
  }

  deleteUser() {
    this.dialogRef = this.dialog.open(PopupDeleteComponent, {
      disableClose: false,
    });
    this.dialogRef.componentInstance.confirmMessage =
      'Are you sure you want to delete?';
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // do confirmation actions
        const token = localStorage.getItem('token') || '{}';
        this.editService
          .deleteUser(this.user.id, token)
          .subscribe((data) => {});
        this.localSt.removeLocalStorage('id', 'token');
        this.userName = '';
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/main']);
      }
    });
  }

  editUser() {
    this.router.navigate(['/edit']);
  }

  logout() {
    this.localSt.removeLocalStorage('id', 'token');
    this.userName = '';
    this.router.navigate(['/admin']);
    this.openLogoutPopup();
  }

  onCreateBoard(): void {
    const dialogRef = this.dialog.open(BoardModalComponent, {
      width: '450px',
      data: this.board,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.board = result;
      this.addBoard(this.board);
    });
  }

  private addBoard(newBoard: IBoardBody) {
    this.boardService.postBoard(newBoard).subscribe((response) => {
      const board: IBoardDetail = {
        ...response,
        // @ts-ignore
        columns: [],
      };
      this.store.dispatch(addBoard({ board }));
    });
  }
}
