import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../service/project.service';
var BreadcrumbComponent = /** @class */ (function () {
    function BreadcrumbComponent(http, router, route, projectService) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.projectService = projectService;
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.subscribe(function (path) {
            if (path instanceof NavigationEnd) {
                //Get Url
                var currentURL = path.url;
                //Get Params
                var indexActUrlParam = currentURL.indexOf("?");
                //Get the exact active route
                var indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam);
                //Assign to our private activeUrl
                _this.activeURL = indexActUrl;
                var slug_list = _this.activeURL.split('/');
                _this.breadcrumbs = slug_list;
            }
        });
    };
    BreadcrumbComponent.prototype.getRouterLink = function (index) {
        // if(index == 0)  return '/'+this.auth_client;
        if (index == 0 || index == 1 || index == 2)
            return '/' + this.auth_client + '/admin';
        if (index == 3)
            return '' + this.breadcrumbs[index];
        if (index == 4)
            return 'projects/' + this.project_name;
        if (index == 5)
            return 'projects/' + this.project_name + '/' + this.breadcrumbs[index];
        if (index == 6)
            return 'projects/' + this.project_name + '/' + this.breadcrumbs[5] + '/' + this.breadcrumbs[index];
    };
    tslib_1.__decorate([
        Input('slug_list'),
        tslib_1.__metadata("design:type", Object)
    ], BreadcrumbComponent.prototype, "breadcrumbs", void 0);
    tslib_1.__decorate([
        Input('auth_client'),
        tslib_1.__metadata("design:type", Object)
    ], BreadcrumbComponent.prototype, "auth_client", void 0);
    tslib_1.__decorate([
        Input('admin_project_sub'),
        tslib_1.__metadata("design:type", String)
    ], BreadcrumbComponent.prototype, "admin_project_sub", void 0);
    tslib_1.__decorate([
        Input('project_name'),
        tslib_1.__metadata("design:type", String)
    ], BreadcrumbComponent.prototype, "project_name", void 0);
    BreadcrumbComponent = tslib_1.__decorate([
        Component({
            selector: 'app-breadcrumb',
            templateUrl: './breadcrumb.component.html',
            styleUrls: ['../layout.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router,
            ActivatedRoute,
            ProjectService])
    ], BreadcrumbComponent);
    return BreadcrumbComponent;
}());
export { BreadcrumbComponent };
//# sourceMappingURL=breadcrumb.component.js.map