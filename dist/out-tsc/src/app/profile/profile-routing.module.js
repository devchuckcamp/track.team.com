import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
var routes = [
    { path: '', component: ProfileComponent },
];
var ProfileRoutingModule = /** @class */ (function () {
    function ProfileRoutingModule() {
    }
    ProfileRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ProfileRoutingModule);
    return ProfileRoutingModule;
}());
export { ProfileRoutingModule };
//# sourceMappingURL=profile-routing.module.js.map