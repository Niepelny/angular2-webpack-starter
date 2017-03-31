import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICourse } from '../../pages/courses/iCourse.interface';
import _ from 'lodash';

const coursesList = [{
  id: 1,
  name: 'kurs 1',
  time: '1h',
  date: '16.03.2017',
  description: `jakis opis At vero eos et accusamus et iusto odio
  dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
  atque corrupti quos dolores et quas molestias excepturi sint occaecati
  cupiditate non provident, similique sunt in culpa qui officia deserunt
   mollitia animi, id est laborum et dolorum fuga`
}, {
  id: 2,
  name: 'kurs 2',
  time: '1h',
  date: '16.03.2017',
  description: `jakis At vero eos et
   accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
   voluptatum deleniti atque corrupti quos dolores et quas molestias
    excepturi sint occaecati cupiditate non provident, similique sunt in
    culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga`
}, {
  id: 3,
  name: 'kurs 3',
  time: '1h',
  date: '16.03.2017',
  description: 'jakis opis'
}, {
  id: 4,
  name: 'kurs 4',
  time: '1h',
  date: '16.03.2017',
  description: 'jakis opis data'
}, {
  id: 5,
  name: 'kurs 5',
  time: '1h',
  date: '16.03.2017',
  description: `jakis opis jakis opis jakis opisjakis opis
  jakis opis jakis opis jakis opis jakis opis jakis opisjakis
   opisjakis opisjakis opisjakis opisjakis opis`
} ];

@Injectable()
export class CoursesService {
  private isPopupDisplayed;
  private deleteCourseId;
  private courses: BehaviorSubject<ICourse[]> = new BehaviorSubject([]);

  constructor () {
    this.isPopupDisplayed = false;
  }

  public get coursesStream (): Observable<ICourse[]> {
    return this.courses.delay(2000);
  }

  public getCourses () {
    this.courses.next(coursesList);
  }

  public createNewCourse (course: ICourse) {
    coursesList.push(course);
    this.courses.next(coursesList);
  }

  public getCourse(id: number) {
    const selectedElement = coursesList.find((data) => {
      return data.id === id;
    });
    this.courses.next([selectedElement]);
  }

  public deleteCourse (courseId): boolean {
    this.isPopupDisplayed = true;
    this.deleteCourseId = courseId;
    return true;
  }

  public confirmPopupStatus (): boolean {
    return !!this.isPopupDisplayed;
  }

  public confirmDelete (): boolean {
    _.pullAllBy(coursesList, [{ id: this.deleteCourseId }], 'id');
    this.isPopupDisplayed = false;
    return false;
  }

  public rejectDelete (): boolean {
    this.isPopupDisplayed = true;
    return true;
  }

  public updateCourses (course: ICourse): boolean {
    this. deleteCourseId = +course.id;
    this.confirmDelete();
    const newCourse = Object.assign({}, course, {id: +course.id});
    this.createNewCourse(newCourse);
    return true;
  }

  public get courseCount (): number {
    return coursesList.length + 1;
  }
}
