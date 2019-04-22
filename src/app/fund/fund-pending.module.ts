import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FundPendingComponent } from './fund-pending.component';
import { FundPendingRoutingModule } from './fund-pending-routing.module';

@NgModule({
  declarations: [
    FundPendingComponent,
  ],
  imports: [
    FundPendingRoutingModule,
  ],

})
export class FundPendingModule{ }
