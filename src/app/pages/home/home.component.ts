import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ElementRef } from 'angular2/core';
import { FormsModule }   from '@angular/forms';
import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { CoursesService } from '../../services/courses.service';
import { ICourse } from '../courses/iCourse.interface';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  // Set our default values
  public localState = { value: '' };
  public coursesList: ICourse[] = [];
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    public coursesService: CoursesService,
    private _ngZone: NgZone,
    private ref: ChangeDetectorRef
  ) {
    this.coursesList = [];
  }

  public submitState(value: string) {
    this.appState.set('value', value);
    this.localState.value = '';
  }

  public get ispopupShow(): boolean {
    return this.coursesService.confirmPopupStatus();
  }
  public ngOnInit() {
    this.getCoursesList();
    // this.title.getData().subscribe(data => this.data = data);
  }

  public getCoursesList () {
    this.coursesService.getCourses().subscribe(
      (data: ICourse[]) => {
        this._ngZone.run(() => {
            this.coursesListsetter = data;
            this.ref.markForCheck();
        });
    });
  }

  public set coursesListsetter(list: ICourse[]) {
    this.coursesList = list;
  }

  public confirmDelete(): Boolean {
    this.coursesService.confirmDelete();
    return true;
  }

  public get coursesListFilled(): Boolean {
    return this.coursesList.length > 0;
  }

  public cancelDelete (): Boolean {
    this.coursesService.rejectDelete();
    return false;
  }
}
