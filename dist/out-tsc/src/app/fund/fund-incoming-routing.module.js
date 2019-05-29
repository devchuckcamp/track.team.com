import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FundIncomingComponent } from './fund-incoming.component';
var routes = [
    { path: '', component: FundIncomingComponent, },
];
var FundIncomingRoutingModule = /** @class */ (function () {
    function FundIncomingRoutingModule() {
    }
    FundIncomingRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], FundIncomingRoutingModule);
    return FundIncomingRoutingModule;
}());
export { FundIncomingRoutingModule };
//# sourceMappingURL=fund-incoming-routing.module.js.map