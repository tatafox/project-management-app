import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { IGetUser, IUser } from 'src/app/shared/user-models';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  private URL = '/api';

  public token: any;

  public user = new Subject<IUser>();

  public userList = new Subject<IGetUser[]>();

  public id: any;

  public statusError$ = new Subject<any>();

  private errorMessage = '';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    this.id = localStorage.getItem('id');
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.get(`${this.URL}/users/${this.id}`, httpOptions).pipe(
      map((data: any) => {
        this.user = data;
        return this.user;
      }),
      catchError((err) => {
        this.statusError$.next(err);
        return [];
      }),
    );
  }

  getUserList(): Observable<any> {
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.token}`,
      }),
    };
    return this.http.get(`${this.URL}/users`, httpOptions).pipe(
      map((data: any) => {
        this.userList = data;
        return this.userList;
      }),
    );
  }

  sendList(userList: IGetUser[]) {
    this.userList.next(userList);
  }

  onMessage(): Observable<any> {
    return this.userList.asObservable();
  }
}
