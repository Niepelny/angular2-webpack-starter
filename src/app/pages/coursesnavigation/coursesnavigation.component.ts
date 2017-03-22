import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'header'
  selector: 'app-courses-navigation',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
  ],
  styleUrls: [ './coursesnavigation.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './coursesnavigation.component.html'
})

export class CourseNavigationComponent {

  constructor(
  ) {
    console.log('CoursesComponent');
  }
}
