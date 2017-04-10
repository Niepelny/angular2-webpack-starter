import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'myFilterByName'
})

export class FilterByNamePipe implements PipeTransform {
  transform(value: any, courseName: Object): any {
    return _.filter(value, courseName);
  }
}
