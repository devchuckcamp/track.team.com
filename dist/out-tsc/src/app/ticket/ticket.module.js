import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicketComponent } from './ticket.component';
import { TicketRoutingModule } from './ticket-routing.module';
import { UserService } from '../service/user.service';
import { ClientGlobalRoutesService } from '../config/client';
import { GlobalRoutesService } from '../config/config';
import { FileDropModule } from 'ngx-file-drop';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
// Material
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';
var TicketModule = /** @class */ (function () {
    function TicketModule() {
    }
    TicketModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                TicketComponent,
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
                ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
            ],
            exports: [
                FormsModule,
                CommonModule,
            ],
            providers: [
                UserService,
                GlobalRoutesService,
                ClientGlobalRoutesService,
            ]
        })
    ], TicketModule);
    return TicketModule;
}());
export { TicketModule };
//# sourceMappingURL=ticket.module.js.map