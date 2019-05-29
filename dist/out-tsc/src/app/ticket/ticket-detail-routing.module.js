import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketDetailComponent } from './ticket-detail.component';
var routes = [
    { path: '', component: TicketDetailComponent },
];
var TicketDetailRoutingModule = /** @class */ (function () {
    function TicketDetailRoutingModule() {
    }
    TicketDetailRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], TicketDetailRoutingModule);
    return TicketDetailRoutingModule;
}());
export { TicketDetailRoutingModule };
//# sourceMappingURL=ticket-detail-routing.module.js.map