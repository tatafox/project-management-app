import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line object-curly-newline
import { catchError, map, Observable, tap } from 'rxjs';
import { IUserSignIn, IUserSignUp } from 'src/app/shared/user-models';

@Injectable({
  providedIn: 'root',
})
export class UserAuthServiceService {
  private URL = '/api';

  private errorMessage = '';

  private token: string = 'signup';

  constructor(private http: HttpClient) {}

  postDataUser(user: IUserSignUp): Observable<any> {
    return this.http.post(`${this.URL}/signup`, user).pipe(
      tap((data: any) => {
        localStorage.setItem('token', data.token);
        this.setToken(data.token);
      }),
    );
  }

  signInUser(user: IUserSignIn): Observable<any> {
    return this.http.post(`${this.URL}/signin`, user).pipe(
      tap((data: any) => {
        localStorage.setItem('token', data.token);
        this.setToken(data.token);
      }),
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  logout() {
    this.setToken('');
    localStorage.clear();
  }

  /*------*/
  getUsers(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + this.token,
      }),
    };
    console.log(httpOptions);
    return this.http.get(`${this.URL}/users`, httpOptions).pipe(
      map((data: any) => {
        const usersList = data;
        console.log(usersList);
        return usersList;
      }),
      catchError((err) => {
        console.log(err);
        this.errorMessage = err.message;
        return [];
      }),
    );
  }
}
