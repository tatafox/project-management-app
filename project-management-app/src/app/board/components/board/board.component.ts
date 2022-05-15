/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-destructuring */
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '../../../redux/state.models';
import { BoardService } from '../../services/board.service';

import {
  IBoardDetail,
  IColumnList,
  ITaskBody,
} from '../../../shared/models/board.model';
import { updateBoard, updateTask } from '../../../redux/actions/board.actions';
import { ColumnModalComponent } from '../modal/column-modal/column-modal.component';
import { TaskModalComponent } from '../modal/task-modal/task-modal.component';

@Component({
  selector: 'app-boards',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnDestroy {
  private id!: string;

  private subscription: Subscription[] = [];

  public board: IBoardDetail;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private readonly boardService: BoardService,
    public dialog: MatDialog,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.subscription.push(
      this.store
        .select((state) => state.boardState.boards)
        .subscribe((boards) => {
          this.board = boards.filter((board) => board.id === this.id)[0];
          if (!this.board) {
            this.router.navigate(['/main']);
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscribe) => subscribe.unsubscribe());
  }

  public onNewColumn() {
    const dialogRef = this.dialog.open(ColumnModalComponent, {
      width: '450px',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.addColumn(result);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private addColumn(title: string) {
    const order = this.board.columns.length;
    this.boardService
      .postColumn(this.board.id, title, order)
      .subscribe((response) => {
        const newColumn: IColumnList = {
          ...response,
          tasks: [],
        };
        const board: IBoardDetail = {
          id: this.board.id,
          title: this.board.title,
          columns: [...this.board.columns, newColumn],
        };
        this.store.dispatch(updateBoard({ board }));
      });
  }

  onAddTask(column: IColumnList) {
    const userID: string = localStorage.getItem('id') || '';

    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '450px',
      data: {
        title: '',
        description: '',
        userId: userID,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTask: ITaskBody = {
          title: result.title,
          order: column.tasks.length,
          description: result.description,
          userId: result.userId,
        };
        this.boardService
          .postTask(this.id, column.id, newTask)
          .subscribe((response) => {
            this.store.dispatch(
              updateTask({
                boardID: this.id,
                columnID: column.id,
                task: response,
              }),
            );
          });
      }
    });
  }
}
