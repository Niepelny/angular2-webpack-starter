import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import _ from 'lodash';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActionReducer, Action, Store } from '@ngrx/store';

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
interface IUser {
  user: string;
  password: string;
}
interface AppState {
  counter: number;
}

export const SET = 'SET';
export const RESET = 'RESET';

export function counterReducer(state: number = 0, action: Action) {
  switch (action.type) {
    case SET:
      return state + 1;

    case RESET:
      return 0;

    default:
      return state;
  }
}

@Injectable()
export class LoginService {
  public userEmmiter = new Subject();
  private loggedUser: Object;
  private users: IUser[];

  constructor(
    public af: AngularFire,
    private store: Store<AppState>
  ) {
    this.loggedUser = localStorage.getItem('currentUser');
    this.userEmmiter.next(this.loggedUser);;
    this.af.database.list('/users').subscribe((data: IUser[]) => {
      this.users = data;
    });
  }

  public checkLogin(value) {
    for (let data of this.users) {
      if (data.user === value.name &&
        data.password === value.password
      ) {
        this.setlocalStorageUser = value;

        this.loggedUser = { name: value.name };
        this.userEmmiter.next({ name: 'user1' });
        this.store.dispatch({ type: SET });
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
