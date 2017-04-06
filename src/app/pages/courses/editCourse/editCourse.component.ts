import {
  Component,
  OnInit,
  Input,
  Output,
  NgZone,
  EventEmitter,
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
  @Input() courseData: ICourse;
  @Output() courseDataOutput = new EventEmitter<any>();
  constructor(
    private ngZone: NgZone,
  ) {
    console.log('test');
    this.courseData = {
      id: null,
      name: null,
      time: null,
      date: null,
      topRated: null,
      description: null
    };
    console.log('this.ngZone 2');
    console.log(this.ngZone);
    console.log(this.ngZone.onStable);
    console.log(this.ngZone.onUnstable);
    console.log('----');
  }

  public restartData() {
    this.courseDataOutput.emit(this.courseData);
  }

  public ngOnInit() {
    console.log('this.ngZone');
    console.log(this.ngZone);
    console.log(this.ngZone.onStable);
    console.log(this.ngZone.onUnstable);
    console.log('----');
    console.log(this.courseData);
    console.log('test');
  }
}
