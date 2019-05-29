import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberDetailComponent } from './member-detail.component';
var routes = [
    { path: '', component: MemberDetailComponent },
];
var MemberDetailRoutingModule = /** @class */ (function () {
    function MemberDetailRoutingModule() {
    }
    MemberDetailRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], MemberDetailRoutingModule);
    return MemberDetailRoutingModule;
}());
export { MemberDetailRoutingModule };
//# sourceMappingURL=member-detail-routing.module.js.map