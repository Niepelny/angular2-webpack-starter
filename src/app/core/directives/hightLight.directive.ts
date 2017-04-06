import {
  Directive,
  ElementRef,
  Input,
  OnInit
 } from '@angular/core';

import { DatePipe } from '@angular/common';
@Directive({ selector: '[myHighlight]' })

export class HighlightDirective implements OnInit {
  @Input('myHighlight') courseDate: string;
  constructor(
    public el: ElementRef) {
  }

  ngOnInit () {
    const validDate = new Date(this.courseDate);
    const currentDate = new Date().getTime();
    const dayInMilisecond = 86400000;
    function getLastDate() {
      return validDate.getTime() >= currentDate - 14 * dayInMilisecond;
    }
    if (currentDate > validDate.getTime() && getLastDate()) {
      this.el.nativeElement.classList.add('course-new');
    }
    if (validDate.getTime() > currentDate) {
      this.el.nativeElement.classList.add('course-upcoming');
    }

  }
}
