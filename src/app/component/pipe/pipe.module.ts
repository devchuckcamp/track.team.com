import { NgModule } from '@angular/core';
import { EllipsisPipe } from './ellipses.pipe';
import { SafeHtml } from './sanitize.pipe';
import { ReplaceHypen } from './replace.pipe';
import { CustomDatePipe } from './custom_date.pipe';
@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    EllipsisPipe,
    SafeHtml,
    ReplaceHypen,
    CustomDatePipe,
  ],
  exports: [
    EllipsisPipe,
    SafeHtml,
    ReplaceHypen,
    CustomDatePipe,
  ]
})
export class ApplicationPipesModule {}