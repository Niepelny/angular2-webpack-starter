import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private isLoaderStatus;
  constructor () {
    this.isLoaderStatus = true;
  }

  public get showLoader () {
    return this.isLoaderStatus;
  }

  public set loaderStatus (loader: Boolean) {
    this.isLoaderStatus = loader;
  }
}
