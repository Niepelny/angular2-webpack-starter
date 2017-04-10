import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
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
  templateUrl: './coursesnavigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CourseNavigationComponent {
  @Output() sortByName = new EventEmitter<any>();
  public name = '';
  constructor(
  ) {
    console.log('CoursesComponent');
  }

  public findCourse (value) {
    this.sortByName.emit(value);
  }
}
