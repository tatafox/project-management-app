import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskDialogData } from '../../../../shared/models/board.model';
import { GetUsersService } from '../../../../auth/services/userList/get-users.service';
import { IGetUser } from '../../../../shared/models/user-models';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent {
  public userList: IGetUser[];

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private getService: GetUsersService,
  ) {
    this.userList = this.getService.userList;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
