import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberComponent } from './member.component';
import { MemberRoutingModule } from './member-routing.module';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { ClientGlobalRoutesService } from '../config/client';
import { GlobalRoutesService } from '../config/config';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ConfirmDeleteDialog } from '../share/alert/confirm-delete-dialog.component';
// Material
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';
var MemberModule = /** @class */ (function () {
    function MemberModule() {
    }
    MemberModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                MemberComponent,
                ConfirmDeleteDialog,
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
                MemberRoutingModule,
                ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
                FormsModule,
            ],
            exports: [ConfirmDeleteDialog],
            entryComponents: [
                ConfirmDeleteDialog
            ],
            providers: [
                UserService,
                GlobalRoutesService,
                ClientGlobalRoutesService,
                ProjectService,
            ]
        })
    ], MemberModule);
    return MemberModule;
}());
export { MemberModule };
//# sourceMappingURL=member.module.js.map