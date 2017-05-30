import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ICourse } from '../../pages/courses/iCourse.interface';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { FilterByNamePipe } from '../pipes/filterByName.pipe';
import _ from 'lodash';

interface ICourseMock {
  name: string;
}

@Injectable()
export class CoursesService {
  public items;
  public pageCount: number = 1;
  public count: number;
  private isPopupDisplayed;
  private deleteCourseId;
  private courses: ReplaySubject<ICourse[]> = new ReplaySubject();
  private limit: BehaviorSubject<number> = new BehaviorSubject<number>(10);
  private coursesList: ICourse[] = [];
  private courseFireBase: FirebaseObjectObservable<ICourse[]>;

  constructor(
    private orderByNamePipe: FilterByNamePipe,
    public af: AngularFire
  ) {
    this.isPopupDisplayed = false;
    this.items = this.af.database.list('/courses', {
      query: {
        limitToFirst: this.limit,
        orderByKey: true,
      }
    }).subscribe((data) => {
      // Found the last key

      this.coursesList = data;

      this.getCourses();
    });
    this.items = this.af.database.list('/courses', {
      query: {
        limitToLast: 1
      }
    }).subscribe((data) => {
      // Found the last key
      this.count = data[0]._id;
    });

  }

  public get getLastId() {
    return this.coursesList[this.coursesList.length]._id;
  }

  public get coursesStream(): Observable<ICourse[]> {
    return this.courses.map((data) => {
      return data;
    }).delay(0);
  }
  public setNextPage() {
    this.pageCount += 1;
    this.limit.next(this.limit.getValue() + 10);
  }

  public getCourses() {
    this.courses.next(this.coursesList);
  }

  public createNewCourse(course: ICourse) {
    const queryList = this.af.database.list('/courses');
    queryList.push(course);
  }

  public getCourse(id: number) {
    const selectedElement = this.coursesList.find((data) => {
      return data._id === id;
    });
    this.courses.next([selectedElement]);
  }

  public deleteCourse(courseId): boolean {
    const queryList = this.af.database.object(`/courses/${courseId}`);
    queryList.remove();
    return false;
  }

  public confirmPopupStatus(): boolean {
    return !!this.isPopupDisplayed;
  }

  public orderBy(obj: ICourseMock) {
    if (obj.name === '') {
      this.courses.next(this.coursesList);
    } else {
      const result: ICourse[] = this.orderByNamePipe.transform(this.coursesList, obj);
      this.courses.next(result);
    }
  }

  public updateCourses(course: any, key): boolean {
    const queryList = this.af.database.object(`/courses/${key}`);
    queryList.update(course);
    return true;
  }

  public get courseCount(): number {
    return this.coursesList.length + 1;
  }

}
