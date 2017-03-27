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

import { CoursesService } from '../../../services/courses.service';
import { AppState } from '../../../app.service';
import { ICourse } from '../iCourse.interface';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-course',
  providers: [],
  styleUrls: [ './course.component.scss' ],
  templateUrl: './course.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements  OnInit {
  @Input() courseData: ICourse;
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

  public editCourses () {
    return true;
  }

  public ngOnInit() {
    console.log('course generator');
  }

   public deleteCurse(id) {
    this.coursesService.deleteCourse(id);
  }
}
