import { NgModule } from '@angular/core';
import { EllipsisPipe } from './ellipses.pipe';
import { SafeHtml } from './sanitize.pipe';
import { ReplaceHypen } from './replace.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    EllipsisPipe,
    SafeHtml,
    ReplaceHypen,
  ],
  exports: [
    EllipsisPipe,
    SafeHtml,
    ReplaceHypen,
  ]
})
export class ApplicationPipesModule {}