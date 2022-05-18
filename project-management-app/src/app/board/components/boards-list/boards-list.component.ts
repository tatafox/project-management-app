/* eslint-disable no-return-assign */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  addError,
  clearError,
  deleteBoard,
  setBoardsList,
} from '../../../redux/actions/board.actions';
import { AppState } from '../../../redux/state.models';
import { BoardService } from '../../services/board.service';
import { IBoard, IBoardDetail } from '../../../shared/models/board.model';
import { IConfirmDialog } from '../../../shared/models/general.models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  public boardsList: IBoardDetail[];

  constructor(
    private store: Store<AppState>,
    private readonly boardService: BoardService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store
        .select((state) => state.boardState.boards)
        .subscribe((boards) => (this.boardsList = boards)),
    );
    this.boardService.fetchBoardsList();
    this.subscription.push(
      this.boardService.boardList$.subscribe((boards) => {
        // сохраняем в стор список бордов и убираем ошибку (на случай если она  была до)
        this.store.dispatch(setBoardsList({ boards }));
        const error = null;
        this.store.dispatch(clearError({ error }));
      }),
    );
    this.subscription.push(
      this.boardService.error$.subscribe((error) => {
        this.store.dispatch(addError({ error }));
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscribe) => subscribe.unsubscribe());
  }

  onBoardDetail(board: IBoard, event: MouseEvent) {
    if (
      (event.target as HTMLElement).tagName !== 'BUTTON' &&
      !(event.target as HTMLElement).closest('button')
    ) {
      this.router.navigate(['main', 'board', board.id]);
    }
  }

  onDeleteBoard(board: IBoard) {
    const dialogData: IConfirmDialog = {
      title: 'Delete board',
      message:
        'When you delete board, you also delete columns & tasks. Are you sure?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      const result = dialogResult;
      if (result) {
        this.boardService.deleteBoard(board.id).subscribe((response) => {
          this.store.dispatch(deleteBoard({ id: board.id }));
        });
      }
    });
  }
}
