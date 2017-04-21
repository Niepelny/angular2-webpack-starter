import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilterOutdated'
})

export class FilterOutdatedPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {

    const timeInterval = 14 * 24 * 60 * 60 * 1000;
    const newCollection = [];
    value.filter((data) => {
      if (new Date().getTime() - <number> new Date(data.createdDate).getTime() < timeInterval) {
        newCollection.push(data);
      }
    });
    return newCollection;
  }
}
