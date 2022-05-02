import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/state.models';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IBoardDetail, IColumnList } from '../../../shared/models/board.model';
import { BoardModalComponent } from '../modal/board-modal/board-modal.component';
import { updateBoard } from '../../../redux/actions/board.actions';

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
    /* this.subscription.push(
      this.store
        .select(
          (state) =>
            state.boardState.boards.filter((board) => board.id === this.id)[0],
        )
        .subscribe((boards) => {
          this.board = boards;
          if (!this.board) {
            this.router.navigate(['/main']);
          }
        }),
    );
    this.subscription.push(
      this.store
        .select(
          (state) =>
            state.boardState.boards.filter((board) => board.id === this.id)[0]
              .columns,
        )
        .subscribe((columns) => {
          this.columns = columns;
        }),
    );
  }*/
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscribe) => subscribe.unsubscribe());
  }

  public onEditColumn(id?: string) {
    const dialogRef = this.dialog.open(BoardModalComponent, {
      width: '450px',
      data: '',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.title = result;
      console.log(result);
      this.editColumn(result, id);
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
        //const board = { ...this.board } as IBoardDetail;
        const board: IBoardDetail = {
          id: this.board.id,
          title: this.board.title,
          columns: [...this.board.columns, newColumn],
        };
        console.log(board);
        //board.columns.push(newColumn);
        this.store.dispatch(updateBoard({ board }));
        console.log(response);
      });
  }
}
