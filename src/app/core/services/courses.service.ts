import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICourse } from '../../pages/courses/iCourse.interface';

import { OrderByNamePipe } from '../pipes/orderByName.pipe';
import _ from 'lodash';

const coursesList: ICourse[] = [{
  id: 1,
  name: 'kurs 1',
  time: '0:40',
  date: new Date('2017.04.03'),
  description: `jakis opis At vero eos et accusamus et iusto odio
  dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
  atque corrupti quos dolores et quas molestias excepturi sint occaecati
  cupiditate non provident, similique sunt in culpa qui officia deserunt
   mollitia animi, id est laborum et dolorum fuga`,
  topRated: 'true'
}, {
  id: 2,
  name: 'kurs 2',
  time: '45',
  date: new Date('2017.04.27'),
  description: `jakis At vero eos et
   accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
   voluptatum deleniti atque corrupti quos dolores et quas molestias
    excepturi sint occaecati cupiditate non provident, similique sunt in
    culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga`,
  topRated: 'true'
}, {
  id: 3,
  name: 'kurs 3',
  time: '1h',
  date: new Date('2017.03.17'),
  description: 'jakis opis',
  topRated: 'false'
}, {
  id: 4,
  name: 'kurs 4',
  time: '2:12',
  date: new Date('2017.04.15'),
  description: 'jakis opis data',
  topRated: 'false'
}, {
  id: 5,
  name: 'kurs 5',
  time: '1:34',
  date: new Date('2017.03.20'),
  description: `jakis opis jakis opis jakis opisjakis opis
  jakis opis jakis opis jakis opis jakis opis jakis opisjakis
   opisjakis opisjakis opisjakis opisjakis opis`,
  topRated: 'true'
}];

@Injectable()
export class CoursesService {
  private isPopupDisplayed;
  private deleteCourseId;
  private courses: BehaviorSubject<ICourse[]> = new BehaviorSubject([]);

  constructor(
    private orderByNamePipe: OrderByNamePipe,
  ) {
    this.isPopupDisplayed = false;
  }

  public get coursesStream(): Observable<ICourse[]> {
    return this.courses.delay(0);
  }

  public getCourses() {
    this.courses.next(coursesList);
  }

  public createNewCourse(course: ICourse) {
    coursesList.push(course);
    this.courses.next(coursesList);
  }

  public getCourse(id: number) {
    const selectedElement = coursesList.find((data) => {
      return data.id === id;
    });
    this.courses.next([selectedElement]);
  }

  public deleteCourse(courseId): boolean {
    _.pullAllBy(coursesList, [{ id: courseId }], 'id');
    return false;
  }

  public confirmPopupStatus(): boolean {
    return !!this.isPopupDisplayed;
  }

  public orderBy (obj: Object) {
    const result: ICourse[] =  this.orderByNamePipe.transform(coursesList, obj);
    this.courses.next(result);
  }

  public updateCourses(course: ICourse): boolean {
    this.deleteCourse(+course.id);
    const newCourse = Object.assign({}, course, { id: +course.id });
    this.createNewCourse(newCourse);
    return true;
  }

  public get courseCount(): number {
    return coursesList.length + 1;
  }
}
