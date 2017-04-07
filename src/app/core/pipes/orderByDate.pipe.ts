import {
  Pipe,
  PipeTransform
 } from '@angular/core';

 import _ from 'lodash';

@Pipe({
  name: 'myOrderByDate',
  pure: false,
})

export class OrderByDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return _.sortBy(value, ['date']);
  }
}
