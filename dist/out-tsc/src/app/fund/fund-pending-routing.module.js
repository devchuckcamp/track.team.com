import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FundPendingComponent } from './fund-pending.component';
var routes = [
    { path: '', component: FundPendingComponent, },
];
var FundPendingRoutingModule = /** @class */ (function () {
    function FundPendingRoutingModule() {
    }
    FundPendingRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], FundPendingRoutingModule);
    return FundPendingRoutingModule;
}());
export { FundPendingRoutingModule };
//# sourceMappingURL=fund-pending-routing.module.js.map