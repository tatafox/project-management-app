import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  removeLocalStorage(keyFirst: string, keySecond: string) {
    localStorage.removeItem(keyFirst);
    localStorage.removeItem(keySecond);
  }

  getLocalStorage(keyFirst: string, keySecond: string) {
    const first = localStorage.getItem(keyFirst);
    const second = localStorage.getItem(keySecond);
    return !!(first && second);
  }
}
