import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarModule } from '../navbar/navbar.module';
// Components
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectComponent } from '../project/project.component';
import { ProjectNewComponent } from '../project/project-new.component';
import { ProfileComponent } from '../profile/profile.component';
import { LayoutComponent } from './layout.component';
import { LeftMenuComponent } from '../layout/menu/left-menu.component';
import { LeftMenuTopComponent } from '../layout/menu/left-menu-top.component';
import { BreadcrumbComponent } from '../layout/component/breadcrumb.component';
import { UnderConstructionComponent } from '../share/under-construction.component';
import { ActivityLogComponent } from '../share/activity-log.component';
// Services
import { SettingService } from '../service/setting.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';
import { ActivityService } from '../service/activity.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
// Material
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';
// Mention
import { MentionModule } from 'angular-mentions';
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                NavbarComponent,
                LayoutComponent,
                LeftMenuComponent,
                LeftMenuTopComponent,
                BreadcrumbComponent,
                DashboardComponent,
                ProjectComponent,
                ProjectNewComponent,
                ProfileComponent,
                UnderConstructionComponent,
                ActivityLogComponent,
            ],
            imports: [
                CommonModule,
                NgbModule.forRoot(),
                NgbAlertModule,
                NavbarModule,
                LayoutRoutingModule,
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
                ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
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
            bootstrap: [LayoutComponent]
        })
    ], LayoutModule);
    return LayoutModule;
}());
export { LayoutModule };
//# sourceMappingURL=layout.module.js.map