import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RollinComponent } from './rollin.component';
var routes = [
    { path: '', component: RollinComponent },
];
var RollinRoutingModule = /** @class */ (function () {
    function RollinRoutingModule() {
    }
    RollinRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], RollinRoutingModule);
    return RollinRoutingModule;
}());
export { RollinRoutingModule };
//# sourceMappingURL=rollin-routing.module.js.map