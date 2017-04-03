import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: [ './popup.component.scss' ],
})

export class PopupComponent implements OnInit {
  @Input() popupData: Object;

  constructor() {
    console.log(this.popupData)
  }

  ngOnInit() { }
}