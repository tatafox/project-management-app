import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { IGetUser, IUser } from 'src/app/shared/user-models';

@Injectable({
  providedIn: 'root',
})
export class UserEditService {
  private URL = '/api';

  public token: any;

  public user = new Subject<IUser>();

  public userList = new Subject<IGetUser[]>();

  public statusError$ = new Subject<any>();

  constructor(private http: HttpClient) {}

  deleteUser(id: string, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        accept: '*/*',
        authorization: `Bearer ${token}`,
      }),
    };
    return this.http.delete(`${this.URL}/users/${id}`, httpOptions).pipe(
      map((data: any) => {
        console.log(data);
      }),
      catchError((err) => {
        console.log(err);
        return [];
      }),
    );
  }
}
