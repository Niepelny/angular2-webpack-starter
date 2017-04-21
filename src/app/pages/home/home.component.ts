import {
  Component,
  OnInit,
  OnChanges,
  SimpleChange,
  Input,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { ElementRef } from 'angular2/core';
import { FormsModule } from '@angular/forms';
import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import { CoursesService } from '../../core/services/courses.service';
import { ICourse } from '../courses/iCourse.interface';
import { LoaderService } from '../../core/services/loader.service';
import { PopupComponent } from '../../core/components/popup';

import { FilterByNamePipe } from '../../core/pipes/filterByName.pipe';

import { PopupService } from '../../popup/service/popup.service';
import { IPopup } from '../../logic/iPopup.interface';

import { Observable, Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title,
    CoursesService,
    FilterByNamePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  // Set our default values
  public localState = { value: '' };
  public coursesList: ICourse[] = [];
  public showLoader: Boolean = true;
  public ticks = 0;
  private popupData = {
    header: 'Deleting item',
    bodyText: 'Are you shure you want delete?'
  };
  private subscription: Subscription;

  private start;
  // TypeScript public modifiers
  constructor(
    public appState: AppState,
    public title: Title,
    public coursesService: CoursesService,
    public loaderService: LoaderService,
    private _ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private orderByNamePipe: FilterByNamePipe,
    private popupService: PopupService,
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
    console.log('this.ngZone init');
    console.log(this._ngZone);
    console.log(this._ngZone.onStable);
    console.log(this._ngZone.onUnstable);
    console.log('----');
    this.getCoursesList();
    this._ngZone.onUnstable.subscribe(() => {
      this.start = new Date();
      console.log('onUnstable', this.start.getTime());
    });

    this._ngZone.onStable.subscribe(() => {
      const d = new Date();
      console.log('onStable', d.getTime());
      if (this.start) {
        console.log('onUnstable - onStable ', d.getTime() - this.start.getTime());
      }
    });
  }

  public getCoursesList() {
    this.coursesService.coursesStream.subscribe(
      (data: ICourse[]) => {
        this.coursesListsetter = data;
        this.ref.markForCheck();
      });
    this.coursesService.getCourses();
  }

  public loadMore() {
    this.coursesService.setNextPage();
  }

  public set coursesListsetter(list: ICourse[]) {
    this.coursesList = list;
    this.showLoader = false;
    console.log('this.ngZone coursesListsetter');
    console.log(this._ngZone);
    console.log(this._ngZone.onStable);
    console.log(this._ngZone.onUnstable);
    console.log('----');
  }

  public get coursesListFilled(): Boolean {
    return this.coursesList.length > 0;
  }

  public deteleCourse(data: any) {
    this.popupService.setUpPopup(
      true,
      data,
      this.popupData,
      this.coursesService.deleteCourse,
      null
    );
  }
  public addMutable() {
    // This function was created only for training purpose
    const mutableCourse: ICourse = {
      id: 6,
      name: 'mutable',
      duration: 32,
      date: new Date(),
      topRated: true,
      description: 'noone',
    };
    this.coursesList.concat(mutableCourse);
    // this.coursesList.push({
    //   id: 6,
    //   name: 'mutable',
    //   time: '0:32',
    //   date: new Date(),
    //   topRated: 'true',
    //   description: 'noone',
    // })
    console.log(this.coursesList);
    // exp 2
    // this.coursesList[3].description = 'changed';
    // console.log(this.coursesList);
  }

  public sortByName(name: any) {
    console.log('sort by name: ', name);
    this.coursesService.orderBy({ name });
  }
}
