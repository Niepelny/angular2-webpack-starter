import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  public beepImg = 'assets/img/404-beep.gif';
  constructor() {
    console.log('404 ready')
  }

  ngOnInit() {
    console.log('404 init')
  }
}
