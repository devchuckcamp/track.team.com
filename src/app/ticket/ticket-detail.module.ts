import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketDetailRoutingModule } from './ticket-detail-routing.module';
// Dialog
import { DialogOverviewExampleDialog } from './dialog-attachment-overview.component';
import { DialogStatusHistoryDialog } from './dialog-status-history.component';
import {TaskDetailDialog} from './modal/dialog-ticket-task.component';
// import {CloneTaskDialog} from './modal/dialog-clone-task.component';

import { FormGroup , FormControl , ReactiveFormsModule , FormsModule } from '@angular/forms';

import { UserService } from '../service/user.service';
import { ClientGlobalRoutesService } from '../config/client';
import { GlobalRoutesService } from '../config/config';
import { FileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from 'ng2-file-upload';
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MentionModule } from 'angular-mentions';
import { TaskService } from '../service/task.service';
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

import { ApplicationPipesModule } from '../component/pipe/pipe.module';

@NgModule({
  declarations: [
    TicketDetailComponent,
    DialogOverviewExampleDialog,
    DialogStatusHistoryDialog,
    TaskDetailDialog,
  ],
  imports: [
    CommonModule,
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
    CommonModule,
    TicketDetailRoutingModule,
    FileDropModule,
    FileUploadModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    MentionModule,
    ApplicationPipesModule
  ],
  exports: [DialogOverviewExampleDialog, DialogStatusHistoryDialog, TaskDetailDialog],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogStatusHistoryDialog,
    TaskDetailDialog,
  ],
  providers:[
    UserService,
    GlobalRoutesService,
    ClientGlobalRoutesService,
    TaskService,
  ]

})
export class TicketDetailModule{ }
