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
import { UserAuthServiceService } from '../auth-service/user-auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuardGuard implements CanActivate {
  private isToken: string;

  constructor(
    private service: UserAuthServiceService,
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
    this.service.user$.subscribe((user) => {
      this.isToken = user.token;
    });
    if (this.isToken) {
      return true;
    }
    this.routers.navigate(['/admin']);
    return false;
  }
}
