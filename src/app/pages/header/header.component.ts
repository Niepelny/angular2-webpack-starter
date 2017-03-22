import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../../app.service';
import { LoginService } from '../services/login.service';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'header'
  selector: 'app-header',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    LoginService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './header.component.scss' ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public iLikeTrainsLogo = 'assets/img/I-LIKE-TRAINS.jpg';
  public name = 'Angular 2 Webpack Starter';
  public url = 'http://localhost:3000';
  // TypeScript public modifiers
  constructor(
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    public appState: AppState
  ) {};

  public isLogged() {
    return this.loginService.isLoggedIn;
  }

  public logOut() {
    this.loginService.logOut();
  }
  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
