import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { IGetUser, IUser } from 'src/app/shared/models/user-models';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      // eslint-disable-next-line no-return-assign
      this.getUserList().subscribe((list) => (this.userList = list));
    }
  }

  private showToastError(errorText: string) {
    this.toastr.error(errorText, 'Error', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
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
        this.showToastError(err.message);
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
    return this.http
      .get(`${this.URL}/users`, httpOptions)
      .pipe(map((data: any) => data));
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
