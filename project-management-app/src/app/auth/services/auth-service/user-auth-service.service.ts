import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line object-curly-newline
import { catchError, map, Observable, tap } from 'rxjs';
import { IUserSignUp } from 'src/app/shared/user-models';

@Injectable({
  providedIn: 'root',
})
export class UserAuthServiceService {
  private URL = 'http://localhost:4200/api';

  private errorMessage = '';

  private token: string = 'signup';

  constructor(private http: HttpClient) {}

  postDataUser(user: IUserSignUp): Observable<any> {
    return this.http.post(`${this.URL}/signup`, user).pipe(
      tap(() => {
        localStorage.setItem('reg-token', this.token);
        this.setToken(this.token);
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
    return this.http.get(`${this.URL}/users`).pipe(
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
