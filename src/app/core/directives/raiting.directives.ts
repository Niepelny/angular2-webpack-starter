import {
Directive,
  ElementRef,
  Input,
  OnInit
 } from '@angular/core';

@Directive({ selector: '[raiting]' })
export class RaitingDirective implements OnInit {
  @Input('raiting') raiting: string;
  constructor(
    public el: ElementRef
  ) {}

  ngOnInit () {
    console.log(this.el, this.raiting);
    // dla przyszłości
    if (this.raiting) {
      const raitingSpan = '&#9734;';
      this.el.nativeElement.innerHTML = raitingSpan;
      console.log('t ',raitingSpan)
    }
  }
}
