import { Component, Input } from '@angular/core';
import { IBoardDetail, ITask } from '../../../../shared/models/board.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../redux/state.models';
import { BoardService } from '../../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog } from '../../../../shared/models/general.models';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { deleteTask } from '../../../../redux/actions/board.actions';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() public task!: ITask;
  @Input() public columnId!: string;
  @Input() public boardId!: string;

  constructor(
    private store: Store<AppState>,
    private readonly boardService: BoardService,
    public dialog: MatDialog,
  ) {}

  onDeleteTask() {
    const dialogData: IConfirmDialog = {
      title: 'Delete task',
      message: 'This task will delete. Are you sure?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardService
          .deleteTask(this.boardId, this.columnId, this.task.id)
          .subscribe((response) => {
            this.store.dispatch(
              deleteTask({
                boardID: this.boardId,
                columnID: this.columnId,
                taskID: this.task.id,
              }),
            );
          });
      }
    });
  }
}
