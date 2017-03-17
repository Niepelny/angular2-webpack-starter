import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { ElementRef} from 'angular2/core';
import { FormsModule }   from '@angular/forms';
import { AppState } from '../../app.service';
import { XLargeDirective } from './x-large';


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'login',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class testFolderComponent implements OnInit {

  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  private logData(msg: string) {
    console.log(msg);
  }

  public submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public editCurse(id: number) {
    console.log('edit id: ' , id);
  }

  public deleteCurse(id: number) {
    console.log('delete id: ' , id);
  }

}
