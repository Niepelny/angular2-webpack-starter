import { Pipe, PipeTransform } from '@angular/core';
import * as Moment from 'moment';

@Pipe({
  name: 'myDuration'
})

export class DurationPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    //old code i will left it here
    // const timeSplit = value.split(':');
    // let hours = '';
    // let minutes = timeSplit[0] + 'min';
    // if (timeSplit.length > 1) {
    //   
    //   minutes = timeSplit[1] + 'min';
    // }
    const hours = Math.floor(value/60);
    const min = value%60;
    let hoursPart = '';
    let minPart = '';
    if (hours) {
      hoursPart = `${hours}h `;
    }
    if (min) {
      minPart = `${min}min`;
    }
    return `${hoursPart}${minPart}`;
  }
}
