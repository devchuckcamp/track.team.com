import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectDetailComponent } from './project-detail.component';
var routes = [
    { path: '', component: ProjectDetailComponent },
];
var ProjectDetailRoutingModule = /** @class */ (function () {
    function ProjectDetailRoutingModule() {
    }
    ProjectDetailRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ProjectDetailRoutingModule);
    return ProjectDetailRoutingModule;
}());
export { ProjectDetailRoutingModule };
//# sourceMappingURL=project-detail-routing.module.js.map