import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-column-modal',
  templateUrl: './column-modal.component.html',
  styleUrls: ['./column-modal.component.scss'],
})
export class ColumnModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ColumnModalComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
