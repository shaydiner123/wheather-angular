import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accuweatherIcon',
})
export class AccuweatherIconPipe implements PipeTransform {
  url: string = 'https://developer.accuweather.com/sites/default/files/';

  transform(value: unknown, ...args: unknown[]): unknown {
    let iconNumber: string = value + '';
    if (value <= 9) {
      iconNumber = '0' + value;
    }
    return this.url + `${iconNumber}-s.png`;
  }
}
