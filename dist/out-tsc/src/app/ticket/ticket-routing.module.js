import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketComponent } from './ticket.component';
var routes = [
    { path: '', component: TicketComponent },
];
var TicketRoutingModule = /** @class */ (function () {
    function TicketRoutingModule() {
    }
    TicketRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], TicketRoutingModule);
    return TicketRoutingModule;
}());
export { TicketRoutingModule };
//# sourceMappingURL=ticket-routing.module.js.map