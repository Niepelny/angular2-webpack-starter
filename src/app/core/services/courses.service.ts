import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ICourse } from '../../pages/courses/iCourse.interface';

import { FilterByNamePipe } from '../pipes/filterByName.pipe';
import _ from 'lodash';

interface ICourseMock {
  name: string;
}

const coursesList: ICourse[] = [{
  id: 1,
  name: 'kurs 1',
  duration: 40,
  createdDate: new Date('2017-04-03'),
  description: `jakis opis At vero eos et accusamus et iusto odio
  dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
  atque corrupti quos dolores et quas molestias excepturi sint occaecati
  cupiditate non provident, similique sunt in culpa qui officia deserunt
   mollitia animi, id est laborum et dolorum fuga`,
  topRated: true
}, {
  id: 2,
  name: 'kurs 2',
  duration: 45,
  createdDate: new Date('2017-04-27'),
  description: `jakis At vero eos et
   accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
   voluptatum deleniti atque corrupti quos dolores et quas molestias
    excepturi sint occaecati cupiditate non provident, similique sunt in
    culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga`,
  topRated: true
}, {
  id: 3,
  name: 'kurs 3',
  duration: 60,
  createdDate: new Date('2017-03-17'),
  description: 'jakis opis',
  topRated: false
}, {
  id: 4,
  name: 'kurs 4',
  duration: 132,
  createdDate: new Date('2017-04-15'),
  description: 'jakis opis data',
  topRated: false
}, {
  id: 5,
  name: 'kurs 5',
  duration: 94,
  createdDate: new Date('2017-03-20'),
  description: `jakis opis jakis opis jakis opisjakis opis
  jakis opis jakis opis jakis opis jakis opis jakis opisjakis
   opisjakis opisjakis opisjakis opisjakis opis`,
  topRated: true
}];

@Injectable()
export class CoursesService {
  private isPopupDisplayed;
  private deleteCourseId;
  private courses: ReplaySubject<ICourse[]> = new ReplaySubject();

  constructor(
    private orderByNamePipe: FilterByNamePipe,
  ) {
    this.isPopupDisplayed = false;
  }

  public get coursesStream(): Observable<ICourse[]>  {
    // return this.courses;
    return  this.courses.map((data) => {
      return data;
    }).delay(2000);
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

  public orderBy (obj: ICourseMock) {
    if ( obj.name === '') {
      this.courses.next(coursesList);
    } else {
      const result: ICourse[] =  this.orderByNamePipe.transform(coursesList, obj);
      this.courses.next(result);
    }
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
