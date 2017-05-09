import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ICourse } from '../../pages/courses/iCourse.interface';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { FilterByNamePipe } from '../pipes/filterByName.pipe';
import _ from 'lodash';

interface ICourseMock {
  name: string;
}

@Injectable()
export class CoursesService {
  public items;
  public pageCount: number = 1;
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
    console.log('k')
    this.items = this.af.database.list('/courses', {
      query: {
        limitToFirst: this.limit
      }
    }).subscribe((data) => {
      // Found the last key
      console.log('----')
      console.log('tutaj')
      console.log(this.pageCount)
      console.log(data)
      this.coursesList = data;
      this.getCourses();
    });
    // this.items.forEach((data) => {
    //   console.log('tutaj2', data)
    //   this.coursesList = data;
    // })
    // this.items.map((data) => {
    //   console.log('tutaj1');
    //   console.log(data);
    // })
  }

  public get coursesStream(): Observable<ICourse[]> {
    // return this.courses;
    return this.courses.map((data) => {
      console.log('tutaj');
      console.log(data);
      return data;
    }).delay(0);
  }
  public setNextPage() {
    this.pageCount += 1;
    this.limit.next(this.limit.getValue() + 10);
  }

  public getCourses() {
    console.log('1 ', this.coursesList)
    this.courses.next(this.coursesList);
  }

  public createNewCourse(course: ICourse) {
    console.log(course);

    // const queryList = this.af.database.list('/courses', {
    //   query: {
    //     limitToLast: 1,
    //     orderByChild: 'id',
    //     orderByKey: true
    //   }
    // }).subscribe((data: any) => {
    //   // Found the last key
    //   debugger;
    //   const items = this.af.database.list('/courses');
    //   course._id = +data._id;
    //   items.push(course);
    // });
    const newCourse = {
      name: course.name,
      duration: course.duration,
      date: course.date,
      topRated: course.topRated,
      description: course.description
    }

    this.items.push(newCourse);
    // this.getCourses();
    // this.courses.next(this.coursesList);
  }
  private pushCourse() {
    const items = this.af.database.list('/courses');
    console.log(items)
    // items.push(course);
  }

  public getCourse(id: number) {
    const selectedElement = this.coursesList.find((data) => {
      return data._id === id;
    });
    this.courses.next([selectedElement]);
  }

  public deleteCourse(courseId): boolean {
    // _.pullAllBy(this.coursesList, [{ id: courseId }], 'id');

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

  public updateCourses(course: ICourse): boolean {
    this.deleteCourse(+course._id);
    const newCourse = Object.assign({}, course, { id: +course._id });
    this.createNewCourse(newCourse);
    return true;
  }

  public get courseCount(): number {
    return this.coursesList.length + 1;
  }

}
