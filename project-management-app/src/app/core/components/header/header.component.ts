import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardModalComponent } from '../../../board/components/modal/board-modal/board-modal.component';
import { IBoardDetail } from '../../../shared/models/board.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/state.models';
import { BoardService } from '../../../board/services/board.service';
import { addBoard } from '../../../redux/actions/board.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title: string;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private readonly boardService: BoardService,
  ) {}

  onCreateBoard(): void {
    const dialogRef = this.dialog.open(BoardModalComponent, {
      width: '450px',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.title = result;
      console.log(this.title);
      this.addBoard(this.title);
    });
  }

  private addBoard(title: string) {
    this.boardService.postBoard({ title: title }).subscribe((response) => {
      const board: IBoardDetail = {
        ...response,
        // @ts-ignore
        columns: [],
      };
      this.store.dispatch(addBoard({ board }));
      console.log(response, board);
    });
  }
}
