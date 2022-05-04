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
export class ProtectAuthPagesGuard implements CanActivate {
  constructor(
    private service: UserAuthServiceService,
    private route: Router,
    private localService: LocalStorageService,
  ) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.localService.getLocalStorage('id', 'token')) {
      return true;
    }
    this.route.navigate(['/main']);
    return false;
  }
}
