import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [ './popup.component.scss' ],
})

export class PopupComponent implements OnInit {
  public popupData: Object;
  private isShow = false;

  constructor(
    private popupService: PopupService,
  ) {
    console.log(this.popupData);
  }

  public set changeIsShowPopup (isShow: boolean) {
    this.isShow = isShow;
  }

  public get checkVisibility () {
    this.popupData = this.popupService.PopupData;
    return this.popupService.PopupVisibility;
  }

  public confirmDelete () {
    this.popupService.isPopupShowChange = false;
    this.popupService.confirmAction();
  }

  public cancelDelete () {
    this.popupService.rejectAction();
  }

  ngOnInit() {
    console.log('popup init');
  }
}
