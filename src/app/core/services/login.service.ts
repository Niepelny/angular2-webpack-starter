import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import _ from 'lodash';

const users = [{
  user: 'user',
  password: 'user'
}, {
  user: 'user2',
  password: 'password1'
}, {
  user: 'user3',
  password: 'password1'
}, {
  user: 'user4',
  password: 'password1'
}];

@Injectable()
export class LoginService {

  private loggedUser;
  private subscription;
  private ticks;
  public userEmmiter= new Subject();
  constructor() {
    this.loggedUser = localStorage.getItem('currentUser');
    this.userEmmiter.next(this.loggedUser);
  }

  public checkLogin(value) {
    for (let data of users) {
      if (data.user === value.name &&
        data.password === value.password
      ) {
        this.setlocalStorageUser = value;
        this.loggedUser = { name: value.name };
        this.userEmmiter.next(this.loggedUser);
        return true;
      }
      return false;
    }
  }

  public isLoggedIn() {
    return !!this.loggedUser;
  }

  public logOut() {
    this.loggedUser = '';
    localStorage.removeItem('currentUser');
  }

  private set setlocalStorageUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify({ name: user.name }));
  }

}
