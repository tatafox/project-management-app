import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  addBoard,
  addError,
  clearError,
  setBoardsList,
} from '../../../redux/actions/board.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/state.models';
import { BoardService } from '../../services/board.service';
import { Subscription } from 'rxjs';
import { IBoardDetail } from '../../../shared/models/board.model';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private readonly boardService: BoardService,
  ) {}

  ngOnInit(): void {
    /*this.boardService.fetchBoardsList();
    this.subscription.push(
      this.boardService.boardList$.subscribe((boards) => {
      //сохраняем в стор список бордов и убираем ошибку (на случай если она  была до)
        this.store.dispatch(setBoardsList({ boards }));
        const error = null;
        this.store.dispatch(clearError({ error }));
      }),
    );
    this.subscription.push(
      this.boardService.error$.subscribe((error) => {
        this.store.dispatch(addError({ error }));
        console.log(error);
      }),
    );*/
  }

  addBoard() {
    this.boardService
      .postBoard({ title: 'New board add 9' })
      .subscribe((response) => {
        const board: IBoardDetail = {
          ...response,
          // @ts-ignore
          columns: [],
        };
        this.store.dispatch(addBoard({ board }));
        console.log(response, board);
      });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscribe) => subscribe.unsubscribe());
  }
}
