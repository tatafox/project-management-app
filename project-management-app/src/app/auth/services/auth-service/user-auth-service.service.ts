import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line object-curly-newline
import { catchError, map, Observable, Subject, tap } from 'rxjs';
import { IUserSignIn, IUserSignUp, IUser } from 'src/app/shared/user-models';
import { IBoardDetail } from '../../../shared/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class UserAuthServiceService {
  private URL = '/api';

  private errorMessage = '';

  private token: string = 'signup';

  public user: IUser;
  public user$ = new Subject<IUser>();

  constructor(private http: HttpClient) {}

  postDataUser(user: IUserSignUp): Observable<any> {
    return this.http
      .post(`${this.URL}/signup`, user)
      .pipe(tap((data: any) => data));
  }

  signInUser(user: IUserSignIn): Observable<any> {
    return this.http.post(`${this.URL}/signin`, user).pipe(
      tap((data: any) => {
        localStorage.setItem('token', data.token);
        this.setToken(data.token);
      }),
    );
  }

  fetchRegistration(user: IUserSignUp) {
    this.postDataUser(user).subscribe(
      (responce) => {
        this.user = { ...responce };
        const userSignIn: IUserSignIn = {
          login: user.login,
          password: user.password,
        };
        this.signInUser(userSignIn).subscribe(
          (responce) => {
            this.user.token = responce.token;
            this.user$.next(this.user);
          },
          (error) => {
            return error;
          },
        );
        return responce;
      },
      (error) => {
        return error;
      },
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
        authorization: `Bearer ${this.token}`,
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
