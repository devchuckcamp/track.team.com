import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountRoutingModule } from './create-accouting-routing.module';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { ClientGlobalRoutesService } from '../../config/client';
import { GlobalRoutesService } from '../../config/config';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
// Material
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';
var CreateAccountModule = /** @class */ (function () {
    function CreateAccountModule() {
    }
    CreateAccountModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                CreateAccountComponent,
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
                CreateAccountRoutingModule,
                ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
                FormsModule,
            ],
            //   exports: [ConfirmDeleteDialog],
            //   entryComponents: [
            //     ConfirmDeleteDialog
            //   ],
            providers: [
                UserService,
                GlobalRoutesService,
                ClientGlobalRoutesService,
                ProjectService,
            ]
        })
    ], CreateAccountModule);
    return CreateAccountModule;
}());
export { CreateAccountModule };
//# sourceMappingURL=create-account.module.js.map