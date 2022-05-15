import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import {
  IGetUser,
  IUser,
  IUserSignUp,
} from 'src/app/shared/models/user-models';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserEditService {
  private URL = '/api';

  public token: any;

  public user = new Subject<IUser>();

  public userList = new Subject<IGetUser[]>();

  public statusError$ = new Subject<any>();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  private showToastError(errorText: string) {
    this.toastr.error(errorText, 'Error', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
  }

  deleteUser(id: string, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete(`${this.URL}/users/${id}`, httpOptions).pipe(
      map((data: any) => data),
      catchError((err) => {
        this.showToastError(err.message);
        this.statusError$.next(err);
        return [];
      }),
    );
  }

  editUser(id: string, token: string, body: IUserSignUp): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http
      .put<any>(`${this.URL}/users/${id}`, body, httpOptions)
      .pipe(
        map((data: any) => data),
        catchError((err) => {
          this.showToastError(err.message);
          this.statusError$.next(err);
          return [];
        }),
      );
  }
}
