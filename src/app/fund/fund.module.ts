import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FundComponent } from './fund.component';
import { FundRoutingModule } from './fund-routing.module';

@NgModule({
  declarations: [
    FundComponent,
  ],
  imports: [
    FundRoutingModule,
  ],

})
export class FundModule{ }
