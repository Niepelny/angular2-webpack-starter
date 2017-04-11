import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { LoginService } from '../core/services/login.service';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import _ from 'lodash';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'header'
  selector: 'app-header',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  private isLoggedUser: boolean = false;
  public iLikeTrainsLogo = 'assets/img/I-LIKE-TRAINS.jpg';
  public name = 'Angular 2 Webpack Starter';
  public url = 'http://localhost:3000';
  // TypeScript public modifiers
  constructor(
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    public appState: AppState
  ) { };

  public get isLogged() {
    return this.isLoggedUser;
    // return this.loginService.isLoggedIn();
  }

  public logOut() {
    this.loginService.logOut();
  }
  public ngOnInit() {
    console.log('hello `header` component');
     const getData = this.loginService.userEmmiter.subscribe(value => {
      console.log('tutaj')
      console.log(value);
      if (!_.isEmpty(value)) {
        console.log(1)
        this.isLoggedUser = true;
      } else{
        console.log(2)
        this.isLoggedUser = false;

      }
    })
  }

}
