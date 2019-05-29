import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
var routes = [
    { path: '', component: ProjectComponent },
];
var ProjectRoutingModule = /** @class */ (function () {
    function ProjectRoutingModule() {
    }
    ProjectRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], ProjectRoutingModule);
    return ProjectRoutingModule;
}());
export { ProjectRoutingModule };
//# sourceMappingURL=project-routing.module.js.map