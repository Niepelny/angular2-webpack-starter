import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilterOutdated'
})

export class FilterOutdatedPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {

    const timeInterval = 14 * 24 * 60 * 60 * 1000;
    const newCollection = [];
    value.filter((data) => {
      console.log(new Date().getTime() - data.date.getTime());
      if (new Date().getTime() - data.date.getTime() < timeInterval) {
        newCollection.push(data);
      }
    });
    return newCollection;
  }
}
