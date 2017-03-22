import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output
} from '@angular/core';

import { ElementRef } from 'angular2/core';
import { FormsModule }   from '@angular/forms';
import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { CoursesService } from '../services/courses.service';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    CoursesService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  // Set our default values
  public localState = { value: '' };
  public coursesList;
  public courses = {};
  public isShowAlert = false;
  private courseTodelete;
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    public coursesService: CoursesService
  ) {
    this.coursesList = [];
  }

  public submitState(value: string) {
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public deleteCurse(id: number) {
    this.isShowAlert = true;
    this.courseTodelete = id;
  }

  public ngOnInit() {
    this.coursesList = this.coursesService.getCourses();
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  public confirmDelete() {
    this.coursesService.deleteCourse(this.courseTodelete);
    this.isShowAlert = false;

  }

  public cancelDelete () {
    this.isShowAlert = false;
  }

  private logData(msg: string) {
    console.log(msg);
  }
}
