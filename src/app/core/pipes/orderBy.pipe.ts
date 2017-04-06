import {
  Pipe,
  PipeTransform
 } from '@angular/core';

 import _ from 'lodash';

@Pipe({
  name: 'myOrderBy',
  pure: false,
})

export class OrderByPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return _.sortBy(value, ['date']);
  }
}
