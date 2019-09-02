import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicketComponent } from './ticket.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { UserService } from '../service/user.service';
import { ClientGlobalRoutesService } from '../config/client';
import { GlobalRoutesService } from '../config/config';
import { FileDropModule } from 'ngx-file-drop';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators, EmailValidator,
  FormGroupDirective, NgForm, } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
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

import { EllipsisPipe } from '../component/pipe/ellipses.pipe';

@NgModule({
  declarations: [
    TicketComponent,
    EllipsisPipe,
  ],
  imports: [
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
    TicketRoutingModule,
    FileDropModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    DragDropModule,
  ],
  exports:[
    FormsModule,
    CommonModule,
  ],
  providers:[
    UserService,
    GlobalRoutesService,
    ClientGlobalRoutesService,
  ]

})
export class TicketModule{ }
