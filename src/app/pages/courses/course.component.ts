import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';

import { AppState } from '../../app.service';
import { ICourse } from './course.interface';
import { CoursesService } from '../services/courses.service';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'header'
  selector: 'find-course',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    CoursesService
  ],
  styleUrls: [ './course.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './course.component.html'
})
export class CourseComponent implements ICourse, OnInit {
  public id: number;
  public name: string;
  public time: string;
  public date: string;
  public description: string;

  constructor(
    public coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    console.log('CoursesComponent');
  }

  public editCourses() {
    const newCourse = {
      id: this.coursesService.courseCount,
      name: this.name,
      time: this.time,
      date: this.date,
      description: this.description,
    };
    this.coursesService.editCourse(newCourse);
    this.router.navigate(['/']);
  };

  public deleteCourses(r: string) {
    return true;
  };

  public createCourse(courseForm: NgForm) {

    console.log(courseForm.value);
    const courseId = this.id ? this.id : this.coursesService.courseCount;
    const newCourse = {
      id: courseId,
      name: this.name,
      time: this.time,
      date: this.date,
      description: this.description,
    };
    if (this.id) {
      this.coursesService.editCourse(newCourse);
    } else {
      this.coursesService.createNewCourse(newCourse);
    }

    this.router.navigate(['/']);
  }

  public ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.coursesService.getCourse(+this.id).then((data) => {
        this.name = data.name;
        this.time = data.time;
        this.date = data.date;
        this.description = data.description;
      });
    }
  }
}
