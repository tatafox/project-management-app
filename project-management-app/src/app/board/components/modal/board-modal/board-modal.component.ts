import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
})
export class BoardModalComponent {
  constructor(
    public dialogRef: MatDialogRef<BoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
