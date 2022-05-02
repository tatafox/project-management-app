import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IGetUser } from 'src/app/shared/user-models';

@Injectable({
  providedIn: 'root',
})
export class HeaderNameService {
  private name = new Subject<IGetUser>();

  constructor() {}

  sendName(name: IGetUser) {
    this.name.next(name);
  }

  onMessage(): Observable<any> {
    return this.name.asObservable();
  }
}
