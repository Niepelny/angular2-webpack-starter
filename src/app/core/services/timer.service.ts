import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class TimerService {

  constructor(private _router: Router) { }

  isAuthenticated(): boolean {
    // auth logic
    return true
  }

  canActivate(): boolean {
    const isAuth = this.isAuthenticated();
    if (!isAuth) {
      //if not authenticated do something. e.g redirect to login  page
      this._router.navigate(['', '/login'])
    }
    return isAuth;
  }
}