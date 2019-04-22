import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FundIncomingComponent } from './fund-incoming.component';
import { FundIncomingRoutingModule } from './fund-incoming-routing.module';

@NgModule({
  declarations: [
    FundIncomingComponent,
  ],
  imports: [
    FundIncomingRoutingModule,
  ],

})
export class FundIncomingModule{ }
