import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';

import { AppState } from '../../../app.service';
import { ICourse } from '../iCourse.interface';
import { CoursesService } from '../../../core/services/courses.service';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ICourseEdited } from '../iCourseEdited.interface';

@Component({
  selector: 'find-course',
  providers: [
    CoursesService
  ],
  styleUrls: ['./addCourse.component.scss'],
  templateUrl: './addCourse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseComponent implements ICourseEdited, OnInit {
  public currentModel: Object;
  public currentCourse: ICourse;
  public currentCourseId: Number;

  constructor(
    public coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
    console.log('CoursesComponent');
    this.currentModel = this.coursesService;
  }

  public updateCourses() {
    this.coursesService.updateCourses(this.currentCourse);
    this.router.navigate(['/']);
  };

  public deleteCourses(r: string) {
    return true;
  };

  public createCourse(courseForm: NgForm) {
    const courseId = this.currentCourseId ? this.currentCourse.id : this.coursesService.courseCount;
    const newCourse = {
      id: courseId,
      name: this.currentCourse.name,
      duration: +this.currentCourse.duration,
      createdDate: new Date(this.currentCourse.createdDate),
      topRated: false,
      description: this.currentCourse.description,
    };
    if (this.currentCourse.id) {
      this.coursesService.updateCourses(newCourse);
    } else {
      this.coursesService.createNewCourse(newCourse);
    }
    this.router.navigate(['/']);
  }

  public courseDataOutput(data: any) {
    this.currentCourse = data;
  }

  public ngOnInit() {
    this.currentCourseId = this.route.snapshot.params['id'];
    this.currentCourse = {
      id: null,
      name: null,
      description: null,
      createdDate: null,
      topRated: null,
      duration: null
    };
    if (this.currentCourseId) {
      this.coursesService.coursesStream.subscribe(
        (data: ICourse[]) => {
          this.currentCourse = data[0];
          this.ref.markForCheck();
        });
    }

    if (this.currentCourseId) {
      this.coursesService.getCourse(+this.currentCourseId);
    }
  }
}
