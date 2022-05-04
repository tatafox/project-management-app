import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IGetUser, IUser } from 'src/app/shared/user-models';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private info = new Subject<IUser>();

  constructor() {}

  sendUser(info: IUser) {
    this.info.next(info);
    console.log(info);
  }

  onMessage(): Observable<any> {
    return this.info.asObservable();
  }
}
