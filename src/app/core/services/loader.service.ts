import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class LoaderService {

  public loaderObservable: ReplaySubject<boolean> = new ReplaySubject(1);
  private isLoaderStatus;
  constructor() {
    this.isLoaderStatus = true;
    // this.loaderObservable.next(this.isLoaderStatus);
  }

  public turnOnLoader() {
    this.isLoaderStatus = true;
  }

  public turnOffLoader() {
    this.isLoaderStatus = false;
  }

}
