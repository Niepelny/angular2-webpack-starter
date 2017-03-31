import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppState } from '../../app.service';
import { LoginService } from '../../core/services/login.service';
import { HeaderComponent } from '../header/header.component';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'login',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './login.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  // Set our default values
  public localState = { value: '' };
  public user = {
    name: '',
    password: '',
  };

  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public loginService: LoginService,
    private router: Router
  ) {}

  public onSubmit(e) {
    e.preventDefault();
    const result = this.loginService.checkLogin(this.user);
    this.router.navigate(['/']);
    return false;
  }

  public ngOnInit() {
    console.log('hello `login` component');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
