import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';
var routes = [
    { path: '', component: CreateAccountComponent },
];
var CreateAccountRoutingModule = /** @class */ (function () {
    function CreateAccountRoutingModule() {
    }
    CreateAccountRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], CreateAccountRoutingModule);
    return CreateAccountRoutingModule;
}());
export { CreateAccountRoutingModule };
//# sourceMappingURL=create-accouting-routing.module.js.map