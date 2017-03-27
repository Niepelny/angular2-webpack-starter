import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../app.service';
import { ICourse } from '../iCourse.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './editCourse.component.html',
  styleUrls: ['./editCourse.component.html'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EditCourseComponent implements OnInit {
  @Input() courseData: Object;
  constructor() {
    console.log('test');
    this.courseData = {
      id: null,
      name: null,
      time: null,
      date: null,
      description: null
    };
  }

  public ngOnInit() {
    console.log(this.courseData);
    console.log('test');
  }
}
