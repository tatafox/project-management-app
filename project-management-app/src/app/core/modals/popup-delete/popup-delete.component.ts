import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-delete',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss'],
})
export class PopupDeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<PopupDeleteComponent>) {}

  public confirmMessage: string;

  ngOnInit(): void {}
}
