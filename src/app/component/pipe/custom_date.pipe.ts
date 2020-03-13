import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'customdate'
})
export class CustomDatePipe {
    transform(date: any, format: string): any {
        if (date) {
         return moment(date).format(format);
        }
      }
}