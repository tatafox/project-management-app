import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserSignUp } from 'src/app/shared/user-models';

@Injectable({
  providedIn: 'root',
})
export class UserAuthServiceService {
  private URL = 'http://localhost:4000/';

  constructor(private http: HttpClient) {}

  postDataUser(user: IUserSignUp) {
    return this.http.post(`${this.URL}signup`, user);
  }
}
