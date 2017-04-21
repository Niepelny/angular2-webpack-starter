import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  SimpleChanges,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoursesService } from '../../../core/services/courses.service';
import { AppState } from '../../../app.service';
import { ICourse } from '../iCourse.interface';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PopupService } from '../../../popup/service/popup.service';
import { IPopup } from '../../../logic/iPopup.interface';

@Component({
  selector: 'app-course',
  providers: [],
  styleUrls: ['./course.component.scss'],
  templateUrl: './course.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  @Input() courseData: ICourse;
  @Output() deteleCourse = new EventEmitter<any>();
  public id: number;
  public name: string;
  public time: string;
  public date: string;
  public description: string;
  private popupData = {
    header: 'Deleting item',
    bodyText: 'Are you shure you want delete?'
  };

  constructor(
    public coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private popupService: PopupService,
  ) {
    console.log('CoursesComponent');
    console.log(this.courseData)
  }

  public editCourses() {
    return true;
  }

  public ngOnInit() {
    console.log('course generator');
    console.log(this.courseData)
  }

  public deleteCurse(id) {
    this.deteleCourse.emit(id);
  }
}
