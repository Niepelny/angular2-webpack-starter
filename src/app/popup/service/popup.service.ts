import { Injectable } from '@angular/core';
import { IPopup } from '../logic/iPopup.interface';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class PopupService {
  private isPopupShow: boolean;
  private popupData: IPopup;
  private confirmCallback: any;
  private rejectCallback: any;
  private Id;
  constructor(
    public af: AngularFire
  ) {
    this.isPopupShow = false;
  }

  public setUpPopup(
    value: boolean,
    id: any,
    popupData: IPopup,
    confirmCallback: any,
    rejectCallback: any) {
    this.isPopupShow = value;
    this.Id = id;
    this.popupData = popupData;
    this.confirmCallback = confirmCallback;
    this.rejectCallback = rejectCallback;
  }

  public set isPopupShowChange(value: boolean) {
    this.isPopupShow = value;
  }

  public get PopupVisibility() {
    return this.isPopupShow;
  }

  public get PopupData() {
    return this.popupData;
  }

  public confirmAction() {
    this.confirmCallback(this.Id);
    this.isPopupShowChange = false;
  }

  public rejectAction() {
    this.isPopupShowChange = false;
  }
}
