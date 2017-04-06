import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myColor',
  pure: true
})

export class ColorPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    console.log('color pipe: ', value);
    return value;
  }
}
