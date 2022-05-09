import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { IGetUser, IUser } from 'src/app/shared/models/user-models';

@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  private URL = '/api';

  public token: any;

  private subject = new Subject<any>();

  private userInfo: IUser;

  public userList: IGetUser[];

  public id: any;

  public statusError$ = new Subject<any>();

  constructor(private http: HttpClient) {
    this.getUserList().subscribe((list) => (this.userList = list));
  }

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
        this.userInfo = data;
        this.sendUser(this.userInfo);
        return this.userInfo;
      }),
      catchError((err) => {
        console.log(err);
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
        return data;
      }),
    );
  }

  sendToken(token: string) {
    this.subject.next(token);
  }

  onToken(): Observable<string> {
    return this.subject.asObservable();
  }

  sendUser(info: IUser) {
    this.subject.next(info);
  }

  onUser(): Observable<IUser> {
    return this.subject.asObservable();
  }
}
