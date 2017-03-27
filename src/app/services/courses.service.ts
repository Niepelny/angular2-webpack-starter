import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ICourse } from '../pages/courses/iCourse.interface';

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

  constructor () {
    this.isPopupDisplayed = false;
  }

  public getCourses (): Observable<ICourse[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(coursesList);
      }, 2000);
      setTimeout(() => {
        observer.complete();
      }, 3000);
    });
  }

  public createNewCourse (course: ICourse): boolean {
    coursesList.push(course);
    return true;
  }

  public getCourse(id: number): Promise<ICourse> {
    return new Promise((resolve, reject) => {
      coursesList.filter((item) => {
        if (item.id === id) {
          resolve(item);
        }
      });
      reject('error');
    });
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
    coursesList.filter((item) => {
      if (item.id === this.deleteCourseId) {
        const index = coursesList.indexOf(item);
        if (index >= 0) {
          coursesList.splice( index, 1 );
          this.isPopupDisplayed = false;
          return true;
        }
      }
    });
    return false;
  }

  public rejectDelete (): boolean {
    this.isPopupDisplayed = true;
    return true;
  }

  public editCourse (course: ICourse): boolean {
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
