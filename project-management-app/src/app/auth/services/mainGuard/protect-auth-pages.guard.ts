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
export class ProtectAuthPagesGuard implements CanActivate {
  private isTokenInLS = localStorage.getItem('token');

  private isIDInLS = localStorage.getItem('id');

  constructor(private service: UserAuthServiceService, private route: Router) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isIDInLS || !this.isTokenInLS) {
      return true;
    }
    this.route.navigate(['/main'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
