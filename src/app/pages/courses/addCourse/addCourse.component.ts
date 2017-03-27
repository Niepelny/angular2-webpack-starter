import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../../app.service';
import { ICourse } from '../iCourse.interface';
import { CoursesService } from '../../../services/courses.service';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ICourseEdited } from '../iCourseEdited.interface';

@Component({
  selector: 'find-course',
  providers: [
    CoursesService
  ],
  styleUrls: [ './addCourse.component.scss' ],
  templateUrl: './addCourse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseComponent implements ICourse, ICourseEdited, OnInit {
  public id: number;
  public name: string;
  public time: string;
  public date: string;
  public description: string;
  public currentModel: Object;

  constructor(
    public coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    console.log('CoursesComponent');
    this.currentModel = {
      id: this.coursesService.courseCount,
      name: this.name,
      time: this.time,
      date: this.date,
      description: this.description,
    };
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
      this.coursesService.getCourse(+this.id).then((data: ICourse) => {
        this.name = data.name;
        this.time = data.time;
        this.date = data.date;
        this.description = data.description;
        this.currentModel = {
          id: this.id,
          name: data.name,
          time: data.time,
          date: data.date,
          description: data.description,
        };
      });
    }
  }
}
