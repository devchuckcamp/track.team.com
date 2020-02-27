import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceHypen'}
  )
export class ReplaceHypen  implements PipeTransform{
  transform(value: string): string {
    return value.replace('-', ' ');
  }
}