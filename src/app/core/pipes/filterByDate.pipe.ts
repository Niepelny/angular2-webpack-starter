import {
  Pipe,
  PipeTransform
 } from '@angular/core';

 import _ from 'lodash';

@Pipe({
  name: 'myFilterByDate',
  pure: false,
})

export class FilterByDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return _.sortBy(value, ['date']);
  }
}
