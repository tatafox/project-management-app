import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, forkJoin, map, Observable, Subject } from 'rxjs';
import { IBoard, IBoardDetail } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MGExMTFiZC0wMWU5LTQ0NzktOTE2Yi1mMjgzOTMzZDk5NzciLCJsb2dpbiI6ImtsZXBhIiwiaWF0IjoxNjUxMDY4MzMyfQ.bgk4-DfryVzaLLmzojWPwm55a2gtFeaqM0Qb4xgCrC0',
    }),
  };

  public error: HttpErrorResponse;

  public boardList$ = new Subject<IBoardDetail[]>();

  public error$ = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) {}

  public getBoardsList(): Observable<any> {
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

  getBoardById(id: string): Observable<IBoardDetail> {
    return this.http
      .get(`/api/boards/${id}`, this.httpOptions)
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
