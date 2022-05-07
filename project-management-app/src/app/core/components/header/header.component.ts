/* eslint-disable object-shorthand */
/* eslint-disable operator-linebreak */
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserEditService } from 'src/app/auth/services/user-edit/user-edit.service';
import { GetUsersService } from 'src/app/auth/services/userList/get-users.service';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { IUser } from 'src/app/shared/models/user-models';
import { IBoardDetail } from 'src/app/shared/models/board.model';
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
  dialogRef: MatDialogRef<PopupDeleteComponent>;

  title: string;

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
    private store: Store<AppState>,
    private readonly boardService: BoardService,
  ) {}

  ngOnInit(): void {
    this.serviceGet.onUser().subscribe((userInfo) => {
      this.user = userInfo;
      this.userName = this.user.name;
    });
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
        this.editService.deleteUser(this.user.id, token).subscribe((data) => {
          console.log(data);
        });
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
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.title = result;
      console.log(this.title);
      this.addBoard(this.title);
    });
  }

  private addBoard(title: string) {
    this.boardService.postBoard({ title: title }).subscribe((response) => {
      const board: IBoardDetail = {
        ...response,
        // @ts-ignore
        columns: [],
      };
      this.store.dispatch(addBoard({ board }));
      console.log(response, board);
    });
  }
}
