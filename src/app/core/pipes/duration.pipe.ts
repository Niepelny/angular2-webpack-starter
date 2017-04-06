import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({
  name: 'myDuration'
})

export class DurationPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const timeSplit = value.split(':');
    let hours = '';
    let minutes = timeSplit[0] + 'min';
    if (timeSplit.length > 1) {
      hours = +timeSplit[0] !== 0 ? timeSplit[0] + 'h ' : '';
      minutes = timeSplit[1] + 'min';
    }
    return `${hours}${minutes}`;
  }
}
