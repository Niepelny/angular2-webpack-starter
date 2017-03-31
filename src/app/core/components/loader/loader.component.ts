import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    NgZone
 } from '@angular/core';

 import { LoaderService } from '../../services/loader.service';
 import { Observable } from 'rxjs';

@Component({
    selector: 'app-loader',
    providers: [],
    styleUrls: [ './loader.component.scss' ],
    templateUrl: './loader.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoaderComponent implements OnInit {
    @Input() isPopupShow: Observable<any>;
    public start: any;
    constructor(
        private loaderService: LoaderService,
        private _ngZone: NgZone,
    ) { }

    public get displayLodaer(): Boolean {
      console.log(this.loaderService.showLoader);
      return this.loaderService.showLoader;
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
