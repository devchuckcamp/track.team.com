import { NgModule } from '@angular/core';
import { ProjectSettingComponent } from './project-setting.component';
import { TicketPatchSettingComponent } from './ticket/patch/ticket-patch-setting.component';
import { TicketStatusSettingComponent } from './ticket/status/ticket-status-setting.component';
import { TicketApprovalSettingComponent } from './ticket/approval/ticket-approval-setting.component';
import { ProjectSecuritySettingComponent } from './project/security/project-security-setting.component';
import { ProjectSettingRoutingModule } from './project-setting-routing.module';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ApplicationPipesModule } from '../../component/pipe/pipe.module';
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
@NgModule({
  declarations: [
    ProjectSettingComponent,
    TicketPatchSettingComponent,
    TicketStatusSettingComponent,
    TicketApprovalSettingComponent,
    ProjectSecuritySettingComponent,
  ],
  imports: [
    ProjectSettingRoutingModule,
    CommonModule,
    ColorPickerModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
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
    ApplicationPipesModule,
  ],
  exports:[
    TicketPatchSettingComponent,
    TicketStatusSettingComponent,
    ProjectSecuritySettingComponent,
  ]

})
export class ProjectSettingModule{ }
