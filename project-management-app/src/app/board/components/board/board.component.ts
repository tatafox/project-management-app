import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/state.models';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  IBoard,
  IBoardDetail,
  IColumnList,
  ITaskBody,
} from '../../../shared/models/board.model';
import { BoardModalComponent } from '../modal/board-modal/board-modal.component';
import { deleteBoard, updateBoard } from '../../../redux/actions/board.actions';
import { IConfirmDialog } from '../../../shared/models/general.models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ColumnModalComponent } from '../modal/column-modal/column-modal.component';
import { TaskModalComponent } from '../modal/task-modal/task-modal.component';

@Component({
  selector: 'app-boards',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private id!: string;
  private subscription: Subscription[] = [];
  public board: IBoardDetail;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private readonly boardService: BoardService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
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

  public onEditColumn(id?: string) {
    const dialogRef = this.dialog.open(ColumnModalComponent, {
      width: '450px',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.editColumn(result, id);
    });
  }

  private editColumn(title: string, id?: string) {
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

  onColumnClick(event: MouseEvent, id: string) {
    console.log(event.target);
    if ((event.target as HTMLElement).tagName === 'SPAN') {
      // -- TO DO ---
      //edit column
    } else {
      //delete column
      this.deleteColumn(id);
    }
  }

  deleteColumn(id: string) {
    const dialogData: IConfirmDialog = {
      title: 'Delete column',
      message: 'When you delete column, you also delete tasks. Are you sure?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService.deleteColumn(this.id, id).subscribe((response) => {
          const board: IBoardDetail = {
            id: this.board.id,
            title: this.board.title,
            columns: [...this.board.columns.filter((item) => item.id !== id)],
          };
          console.log(board);
          this.store.dispatch(updateBoard({ board }));
        });
      }
    });
  }

  onAddTask(column: IColumnList) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '450px',
      data: {
        title: '',
        description: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        const newTask: ITaskBody = {
          title: result.title,
          description: result.description,
          order: column.tasks.length,
          userId: this.boardService.userToken,
        };
        this.boardService
          .postTask(this.id, column.id, newTask)
          .subscribe((response) => {
            console.log(response);
            /*const board: IBoardDetail = {
              id: this.board.id,
              title: this.board.title,
              columns: [...this.board.columns.filter((item) => item.id !== id)],
            };
            console.log(board);
            this.store.dispatch(updateBoard({ board }));*/
          });
      }
      //this.editColumn(result, id);
    });
  }
}
