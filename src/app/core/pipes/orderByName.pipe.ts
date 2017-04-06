import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'myOrderByName'
})

export class OrderByNamePipe implements PipeTransform {
  transform(value: any, courseName: Object): any {
    return _.filter(value, courseName);
  }
}
