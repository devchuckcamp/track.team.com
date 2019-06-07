import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketDetailRoutingModule } from './ticket-detail-routing.module';
import { DialogOverviewExampleDialog } from './dialog-attachment-overview.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ClientGlobalRoutesService } from '../config/client';
import { GlobalRoutesService } from '../config/config';
import { FileDropModule } from 'ngx-file-drop';
import { FileUploadModule } from 'ng2-file-upload';
// Import your library
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MentionModule } from 'angular-mentions';
import { SafeHtml } from '../component/pipe/sanitize.pipe';
// Material
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';
var TicketDetailModule = /** @class */ (function () {
    function TicketDetailModule() {
    }
    TicketDetailModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                TicketDetailComponent,
                DialogOverviewExampleDialog,
                SafeHtml,
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
                TicketDetailRoutingModule,
                FileDropModule,
                FileUploadModule,
                SlickCarouselModule,
                FormsModule,
                MentionModule,
            ],
            exports: [DialogOverviewExampleDialog],
            entryComponents: [
                DialogOverviewExampleDialog
            ],
            providers: [
                UserService,
                GlobalRoutesService,
                ClientGlobalRoutesService,
            ]
        })
    ], TicketDetailModule);
    return TicketDetailModule;
}());
export { TicketDetailModule };
//# sourceMappingURL=ticket-detail.module.js.map