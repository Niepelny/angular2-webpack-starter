import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

import { AppState } from '../../app.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'header'
  selector: 'find-course',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  styleUrls: [],
  // Our list of styles in our component. We may add more to compose many styles together
  template: ``
})
export class CoursesComponent {
  @Input() curseName: any;
  // Set our default values
  public localState = '';

  // TypeScript public modifiers
  constructor() {}

  public ngOnChanges(changeRecord) {
    console.log('tutaj');
    console.log(changeRecord.curseName.currentValue);
  }

}
