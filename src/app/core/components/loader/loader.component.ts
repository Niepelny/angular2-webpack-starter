import {
    Component,
    OnInit,
    Input,
    OnChanges,
    ChangeDetectionStrategy,
    NgZone,
    ChangeDetectorRef
 } from '@angular/core';

import { LoaderService } from '../../services/loader.service';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-loader',
    providers: [],
    styleUrls: [ './loader.component.scss' ],
    templateUrl: './loader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoaderComponent implements OnInit, OnChanges {
  @Input() isPopupShow: Observable<any>;
  public start: any;
  public display: Boolean = true;
  constructor(
      private loaderService: LoaderService,
      private _ngZone: NgZone,
      private courses: CoursesService,
      private ElementRef: ChangeDetectorRef,
  ) {}

  public get displayLodaer(): Boolean {
    console.log(this.loaderService.showLoader);
    return this.display;
  }

  ngOnChanges () {
    this.courses.coursesStream.subscribe(
      (resp) => {
        this.display = false;
        this.ElementRef.markForCheck();
      },
      (error) => {
          console.error('error', error);
      }
    );
  }

  ngOnInit() {
    this._ngZone.onUnstable.subscribe(() => {
      this.start = new Date ();
      console.log('onUnstable', this.start.getTime());
    });

    this._ngZone.onStable.subscribe(() => {
      const d = new Date();
      console.log('onStable', d.getTime());
      if (this.start) {
        console.log('onUnstable - onStable ', d.getTime() - this.start.getTime());
      }
    });
    this.isPopupShow = this.loaderService.showLoader;
  }
}
