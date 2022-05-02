/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-stor/local-storage.service';
import { UserAuthServiceService } from '../auth-service/user-auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuardGuard implements CanActivate {
  constructor(
    private serviceLocSt: LocalStorageService,
    private routers: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.serviceLocSt.getLocalStorage('id', 'token')) {
      return true;
    }
    this.routers.navigate(['/admin'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
