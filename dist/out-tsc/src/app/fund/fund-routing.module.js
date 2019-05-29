import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FundComponent } from './fund.component';
var routes = [
    { path: '', component: FundComponent, },
];
var FundRoutingModule = /** @class */ (function () {
    function FundRoutingModule() {
    }
    FundRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], FundRoutingModule);
    return FundRoutingModule;
}());
export { FundRoutingModule };
//# sourceMappingURL=fund-routing.module.js.map