import { Injectable } from '@angular/core';
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
  constructor () {
    this.loggedUser = localStorage.getItem('currentUser');
  }

  public checkLogin(value) {
    for (let data of users) {
      if (data.user === value.name &&
        data.password === value.password
      ) {
        this.setlocalStorageUser = value;
        this.loggedUser = { name: value.name };
        return true;
      }
      return false;
    }
  }

  public isLoggedIn () {
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
