import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, forkJoin, map, Observable, Subject } from 'rxjs';
import {
  IBoard,
  IBoardDetail,
  IColumn,
  ITaskBody,
} from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MGExMTFiZC0wMWU5LTQ0NzktOTE2Yi1mMjgzOTMzZDk5NzciLCJsb2dpbiI6ImtsZXBhIiwiaWF0IjoxNjUxMDY4MzMyfQ.bgk4-DfryVzaLLmzojWPwm55a2gtFeaqM0Qb4xgCrC0';
  private httpOptions = {
    headers: new HttpHeaders({
      authorization: 'Bearer ' + this.userToken,
    }),
  };

  public error: HttpErrorResponse;

  public boardList$ = new Subject<IBoardDetail[]>();

  public error$ = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) {}

  private getBoardsList(): Observable<any> {
    return this.http.get(`/api/boards`, this.httpOptions).pipe(
      // @ts-ignore
      map((data: IBoard[]) => {
        console.log(data);
        return data;
      }),
      catchError((err) => {
        console.log(err);
        this.error = err;
        this.error$.next(err);
        return [];
      }),
    );
  }

  public getBoardById(id: string): Observable<IBoardDetail> {
    return this.http
      .get(`/api/boards/${id}`, this.httpOptions)
      .pipe(map((responce: any) => responce));
  }

  public postBoard(title: object): Observable<IBoard> {
    return this.http
      .post(`/api/boards`, title, this.httpOptions)
      .pipe(map((responce: any) => responce));
  }

  public deleteBoard(id: string): Observable<IBoard> {
    return this.http
      .delete(`/api/boards/${id}`, this.httpOptions)
      .pipe(map((responce: any) => responce));
  }

  public updateBoard(board: IBoard): Observable<IBoard> {
    return this.http
      .put(`/api/boards/${board.id}`, board.title, this.httpOptions)
      .pipe(map((responce: any) => responce));
  }

  public postColumn(
    id: string,
    title: string,
    order: number,
  ): Observable<IColumn> {
    const body = {
      title: title,
      order: order,
    };
    return this.http
      .post(`/api/boards/${id}/columns`, body, this.httpOptions)
      .pipe(map((responce: any) => responce));
  }

  public deleteColumn(idBoard: string, idColumn: string): Observable<IColumn> {
    return this.http
      .delete(`/api/boards/${idBoard}/columns/${idColumn}`, this.httpOptions)
      .pipe(map((responce: any) => responce));
  }

  public postTask(
    idBoard: string,
    idColumn: string,
    taskBody: ITaskBody,
  ): Observable<IColumn> {
    return this.http
      .post(
        `/api/boards/${idBoard}/columns/${idColumn}/tasks`,
        taskBody,
        this.httpOptions,
      )
      .pipe(map((responce: any) => responce));
  }

  public fetchBoardsList() {
    return this.getBoardsList().subscribe((response) => {
      // @ts-ignore
      const boardsList = response.map((boards) => this.getBoardById(boards.id));
      console.log(boardsList);
      // @ts-ignore
      forkJoin(boardsList).subscribe((data: IBoardDetail[]) => {
        console.log(data);
        this.boardList$.next(data);
      });
      return response;
    });
  }
}
