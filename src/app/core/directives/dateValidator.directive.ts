import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';

import { AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: 'dateValidator',
  providers: []
})
export class DateValidatorDirective implements Validator, OnChanges {
  @Input() forbiddenName: string;
  // private valFn = Validators.nullValidator;
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['dateValidator'];
    if (change) {
      const val: string = change.currentValue;
      // this.valFn = this.emailValidator(val);
    } else {
      // this.valFn = Validators.nullValidator;
    }
  }
  validate(control: AbstractControl): { [key: string]: any } {
    if (control.value.match(/[0-9{2}].[0-9{2}].[0-9{4}]/)) {
      return null;
    } else {
      return { invalidDate: true };
    }
  }

}
