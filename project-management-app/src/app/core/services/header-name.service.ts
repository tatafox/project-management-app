import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderNameService {
  private name = new Subject<string>();

  constructor() {}

  sendName(name: string) {
    this.name.next(name);
  }

  onMessage(): Observable<any> {
    return this.name.asObservable();
  }
}
