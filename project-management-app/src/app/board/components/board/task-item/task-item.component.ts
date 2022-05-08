import { Component, Input } from '@angular/core';
import {
  ITask,
  ITaskBody,
  IUpdateTask,
} from '../../../../shared/models/board.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../redux/state.models';
import { BoardService } from '../../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog } from '../../../../shared/models/general.models';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {
  deleteTask,
  updateTask,
} from '../../../../redux/actions/board.actions';
import { GetUsersService } from '../../../../auth/services/userList/get-users.service';
import { IGetUser } from '../../../../shared/models/user-models';
import { TaskModalComponent } from '../../modal/task-modal/task-modal.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() public task!: ITask;
  @Input() public columnId!: string;
  @Input() public boardId!: string;

  public login: string = '';

  constructor(
    private store: Store<AppState>,
    private readonly boardService: BoardService,
    public dialog: MatDialog,
    private getService: GetUsersService,
  ) {}

  ngOnInit() {
    if (this.task) {
      this.getService.userList.forEach((user) => {
        if (user.id === this.task.userId) this.login = user.login;
      });
    }
  }

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
                taskDeleteID: this.task.id,
              }),
            );
          });
      }
    });
  }

  onTaskEdit(event: MouseEvent) {
    if (
      (event.target as HTMLElement).tagName !== 'BUTTON' &&
      !(event.target as HTMLElement).closest('button')
    ) {
      const dialogRef = this.dialog.open(TaskModalComponent, {
        width: '450px',
        data: {
          title: this.task.title,
          description: this.task.description,
          editTask: true,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const upTask: IUpdateTask = {
            title: result.title,
            order: this.task.order,
            description: result.description,
            userId: this.task.userId,
            columnId: this.columnId,
            boardId: this.boardId,
          };
          this.boardService
            .updateTask(upTask, this.task.id)
            .subscribe((response) => {
              this.store.dispatch(
                updateTask({
                  boardID: this.boardId,
                  columnID: this.columnId,
                  taskID: this.task.id,
                  task: response,
                }),
              );
            });
        }
      });
    }
  }
}
