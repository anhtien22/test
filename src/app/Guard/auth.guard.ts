import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ROLE_TYPE } from '../constants/role';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tostr: ToastrService
  ) {}
  private userRole = ROLE_TYPE;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isloggedin()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu === this.userRole[3]) {
          if (this.authService.getrole() === this.userRole[1]) {
            return true;
          } else {
            this.router.navigate(['']);
            this.tostr.warning('You dont have access.');
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
