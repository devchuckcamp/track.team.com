import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarModule } from '../navbar/navbar.module';
import { RollinComponent } from './rollin.component';
import { RollinRoutingModule } from './rollin-routing.module';

@NgModule({
  declarations: [
    RollinComponent,
  ],
  imports: [
    RollinRoutingModule,
  ],

})
export class RollinModule{ }
