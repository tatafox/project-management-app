import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  IBoardDetail,
  IColumnList,
  ITask,
} from '../../../../shared/models/board.model';
import { IConfirmDialog } from '../../../../shared/models/general.models';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import {
  deleteColumn,
  updateBoard,
  updateColumn,
} from '../../../../redux/actions/board.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../redux/state.models';
import { BoardService } from '../../../services/board.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent {
  @Input() public column!: IColumnList;
  @Input() public boardId!: string;

  @ViewChild('inputTitle') inputTitle: ElementRef;

  public editColumnFlag: boolean = false;

  constructor(
    private store: Store<AppState>,
    private readonly boardService: BoardService,
    public dialog: MatDialog,
  ) {}

  onColumnClick(event: MouseEvent, id: string) {
    if (
      (event.target as HTMLElement).classList.contains('column-item__delete') ||
      (event.target as HTMLElement).closest('button.column-item__delete')
    ) {
      // delete column
      this.deleteColumn(id);
    } else if (
      (event.target as HTMLElement).classList.contains('column-item__title')
    ) {
      // -- TO DO ---
      // edit column
      this.editColumnFlag = true;
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
        this.boardService
          .deleteColumn(this.boardId, id)
          .subscribe((response) => {
            this.store.dispatch(
              deleteColumn({ boardID: this.boardId, columnDeleteID: id }),
            );
          });
      }
    });
  }

  onCancelEditColumn() {
    this.editColumnFlag = false;
  }

  onEditColumn() {
    this.editColumnFlag = false;
    const valueInput = this.inputTitle.nativeElement.value;
    const newColumn = {
      title: valueInput,
      id: this.column.id,
      order: this.column.order,
      tasks: this.column.tasks,
    };
    this.boardService
      .updateColumn(this.boardId, newColumn)
      .subscribe((response) => {
        this.store.dispatch(
          updateColumn({ boardID: this.boardId, columnUpdate: newColumn }),
        );
      });
  }
}
