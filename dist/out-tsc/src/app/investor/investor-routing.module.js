import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestorComponent } from './investor.component';
var routes = [
    { path: '', component: InvestorComponent },
];
var InvestorRoutingModule = /** @class */ (function () {
    function InvestorRoutingModule() {
    }
    InvestorRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], InvestorRoutingModule);
    return InvestorRoutingModule;
}());
export { InvestorRoutingModule };
//# sourceMappingURL=investor-routing.module.js.map