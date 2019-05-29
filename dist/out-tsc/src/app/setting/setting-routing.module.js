import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
var routes = [
    { path: '', component: SettingComponent },
];
var SettingRoutingModule = /** @class */ (function () {
    function SettingRoutingModule() {
    }
    SettingRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], SettingRoutingModule);
    return SettingRoutingModule;
}());
export { SettingRoutingModule };
//# sourceMappingURL=setting-routing.module.js.map