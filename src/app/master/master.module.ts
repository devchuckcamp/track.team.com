import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MasterRoutingModule } from './master-routing.module';
import { ApplicationPipesModule } from '../component/pipe/pipe.module';
// Components
import { MasterComponent } from './master.component';
import { MasterNavbarComponent } from './navbar/master-navbar.component';
import { MasterSidebarComponent } from './sidebar/master-sidebar.component';
import { MasterBreadcrumbComponent } from './component/master-breadcrumb.component';
// Pages
import { MasterClientComponent } from './pages/master-client.component';

// Services
import { SettingService } from '../service/setting.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';
import { ActivityService } from '../service/activity.service';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators, EmailValidator,
  FormGroupDirective, NgForm, } from '@angular/forms';
// Material
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
// Mention
import { MentionModule } from 'angular-mentions';


@NgModule({
  declarations: [
    MasterComponent,
    MasterNavbarComponent,
    MasterSidebarComponent,
    MasterClientComponent,
    MasterBreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbAlertModule,
    MasterRoutingModule,
    ApplicationPipesModule,
    SlickCarouselModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MentionModule,
  ],
  providers: [
    AuthService,
    SettingService,
    UserService,
    ProjectService,
    TicketService,
    ThreadService,
    ActivityService,
  ],
  bootstrap: [MasterComponent]
})
export class MasterModule { }
