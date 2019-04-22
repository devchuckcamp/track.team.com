import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarModule } from '../navbar/navbar.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { InvestorComponent } from './investor.component';
import { InvestorRoutingModule } from './investor-routing.module';

@NgModule({
  declarations: [
    InvestorComponent,
  ],
  imports: [
    InvestorRoutingModule,
  ],

})
export class InvestorModule{ }
