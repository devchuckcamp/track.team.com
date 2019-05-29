import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProjectService } from '../service/project.service';
var ProjectComponent = /** @class */ (function () {
    function ProjectComponent(projectService, router) {
        this.projectService = projectService;
        this.router = router;
        this.projects = [];
        this.auth_client = localStorage.getItem('client');
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.projectService.projects.subscribe(function (res) {
            _this.projects = res;
        });
        this.router.events.subscribe(function (path) {
            if (path instanceof NavigationEnd) {
            }
        });
    };
    ProjectComponent.prototype.goTo = function (slug) {
        this.router.navigate(['/' + this.auth_client + '/admin/projects', slug]);
        return false;
    };
    ProjectComponent = tslib_1.__decorate([
        Component({
            selector: 'app-project',
            templateUrl: './project.component.html',
            styleUrls: ['./project.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ProjectService,
            Router])
    ], ProjectComponent);
    return ProjectComponent;
}());
export { ProjectComponent };
//# sourceMappingURL=project.component.js.map