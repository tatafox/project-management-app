import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line object-curly-newline
import { catchError, Observable, Subject, tap } from 'rxjs';
import {
  IUserSignIn,
  IUserSignUp,
  IUser,
} from 'src/app/shared/models/user-models';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthServiceService {
  private URL = '/api';

  private errorMessage = '';

  private token: string = 'signup';

  public user: IUser;

  public statusError$ = new Subject<string>();

  public userObj = new Subject<IUser>();

  constructor(
    private http: HttpClient,
    private localStorService: LocalStorageService,
  ) {}

  postDataUser(user: IUserSignUp): Observable<any> {
    return this.http.post(`${this.URL}/signup`, user).pipe(
      tap((data: any) => data),
      catchError((err) => {
        this.errorMessage = err.message;
        this.statusError$.next(this.errorMessage);
        return [];
      }),
    );
  }

  signInUser(user: IUserSignIn): Observable<any> {
    return this.http.post(`${this.URL}/signin`, user).pipe(
      tap((data: any) => {
        localStorage.setItem('token', data.token);
      }),
    );
  }

  fetchRegistration(user: any): Observable<any> {
    this.localStorService.removeLocalStorage('id', 'token');
    this.postDataUser(user).subscribe(
      (responce) => {
        this.user = { ...responce };
        const userSignIn: IUserSignIn = {
          login: user.login,
          password: user.password,
        };
        this.signInUser(userSignIn).subscribe(
          (dataToken) => {
            this.user.token = dataToken.token;
            localStorage.setItem('id', this.user.id);
            this.userObj.next(this.user);
          },
          (error) => error,
        );
        return responce;
      },
      (error) => error,
    );
    return this.userObj;
  }
}
