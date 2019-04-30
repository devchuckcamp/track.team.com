import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarModule } from '../navbar/navbar.module';

import { LayoutComponent } from './layout.component';
import { LeftMenuComponent } from '../layout/menu/left-menu.component';
import { BreadcrumbComponent } from '../layout/component/breadcrumb.component';

import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    LeftMenuComponent,
    BreadcrumbComponent
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
    AuthService,
    UserService,
    ProjectService,
    TicketService,
    ThreadService,
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
