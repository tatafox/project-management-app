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
  ITask,
  IUpdateTask,
  ITaskBody,
  IColumnList,
} from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public userToken = localStorage.getItem('token') || '';

  private httpOptions = {
    headers: new HttpHeaders({
      authorization: `Bearer ${this.userToken}`,
    }),
  };

  public error: HttpErrorResponse;

  public boardList$ = new Subject<IBoardDetail[]>();

  public error$ = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) {}

  private getBoardsList(): Observable<any> {
    if (!this.userToken) {
      this.userToken = localStorage.getItem('token') || '';
      this.httpOptions = {
        headers: new HttpHeaders({
          authorization: `Bearer ${this.userToken}`,
        }),
      };
    }
    return this.http.get('/api/boards', this.httpOptions).pipe(
      // @ts-ignore
      map((data: IBoard[]) => {
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
      .post('/api/boards', title, this.httpOptions)
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
      title,
      order,
    };
    return this.http
      .post(`/api/boards/${id}/columns`, body, this.httpOptions)
      .pipe(map((responce: any) => responce));
  }

  public updateColumn(
    idBoard: string,
    newColumn: IColumnList,
  ): Observable<IColumn> {
    const updateColumnBody = {
      title: newColumn.title,
      order: newColumn.order,
    };
    return this.http
      .put(
        `/api/boards/${idBoard}/columns/${newColumn.id}`,
        updateColumnBody,
        this.httpOptions,
      )
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
  ): Observable<ITask> {
    return this.http
      .post(
        `/api/boards/${idBoard}/columns/${idColumn}/tasks`,
        taskBody,
        this.httpOptions,
      )
      .pipe(map((responce: any) => responce));
  }

  public updateTask(
    updateTask: IUpdateTask,
    taskId: string,
  ): Observable<ITask> {
    return this.http
      .put(
        `/api/boards/${updateTask.boardId}/columns/${updateTask.columnId}/tasks/${taskId}`,
        updateTask,
        this.httpOptions,
      )
      .pipe(map((responce: any) => responce));
  }

  public deleteTask(
    idBoard: string,
    idColumn: string,
    idTask: string,
  ): Observable<ITask> {
    return this.http
      .delete(
        `/api/boards/${idBoard}/columns/${idColumn}/tasks/${idTask}`,
        this.httpOptions,
      )
      .pipe(map((responce: any) => responce));
  }

  public fetchBoardsList() {
    if (!this.userToken) {
      this.userToken = localStorage.getItem('token') || '';
      this.httpOptions = {
        headers: new HttpHeaders({
          authorization: `Bearer ${this.userToken}`,
        }),
      };
    }
    return this.getBoardsList().subscribe((response) => {
      // @ts-ignore
      const boardsList = response.map((boards) => this.getBoardById(boards.id));
      // @ts-ignore
      forkJoin(boardsList).subscribe((data: IBoardDetail[]) => {
        this.boardList$.next(data);
      });
      return response;
    });
  }
}
