import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarModule } from '../navbar/navbar.module';
import { LayoutComponent } from './layout.component';
import { UserService } from '../service/user.service';


@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    NgbAlertModule,
    NavbarModule,
    LayoutRoutingModule,
  ],
  exports:[
  ],
  providers: [
    UserService
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
