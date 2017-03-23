import { Injectable } from '@angular/core';
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
  public getCourses () {
    return coursesList;
  }

  public createNewCourse (course) {
    coursesList.push(course);
  }

  public getCourse(id: number) {
    return new Promise((resolve, reject) => {
      coursesList.forEach((item) => {
        if (item.id === id) {
          resolve(item);
        }
      });
    });
  }

  public  deleteCourse (courseId) {
    coursesList.filter((item) => {
      if (item.id === courseId) {
        const index = coursesList.indexOf(item);
        if (index >= 0) {
          coursesList.splice( index, 1 );
        }
      }
    });
  }

  public editCourse (course) {
    coursesList.filter((item) => {
      if (item.id === +course.id) {
        const index = coursesList.indexOf(item);
        if (index >= 0) {
          coursesList[index] = course;
        }
      }
    });
  }

  public get courseCount () {
    return coursesList.length + 1;
  }
}
