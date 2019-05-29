import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../../service/project.service';
var LeftMenuComponent = /** @class */ (function () {
    function LeftMenuComponent(http, router, route, projectService) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.projectService = projectService;
        this.admin_sub_3 = '';
        this.active_menu = this.admin_project_sub;
        this.onload_slug_list = [];
        this.is_dashboard = true;
        var currentURL = window.location.pathname;
        //Get Params
        var indexActUrlParam = currentURL.indexOf("?");
        //Get the exact active route
        var indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam);
        //Assign to our private activeUrl
        this.activeURL = indexActUrl;
        var slug_list = this.activeURL.split('/');
        var isSubRoute = (this.activeURL.match(/\//g) || []).length;
        this.onload_slug_list = slug_list;
        this.admin_project_sub = slug_list[slug_list.length - 1];
        this.admin_sub_3 = this.admin_project_sub;
        this.project = {
            id: null,
            name: '',
            slug: '',
            tickets: []
        };
        if (slug_list.length < 5) {
            this.is_dashboard = false;
        }
        else {
            this.is_dashboard = true;
        }
        if ((!slug_list.includes("activity") && !slug_list.includes("add")) && (slug_list.includes("projects") || slug_list[3] == 'projects') && slug_list.length >= 5) {
            this.admin_sub_1 = "projects";
            this.admin_sub_2 = slug_list[4];
            this.admin_project_sub = slug_list[slug_list.length - 1];
            this.project_name = this.admin_project_sub;
            this.getAllProject(this.admin_sub_2);
        }
        if (slug_list[3] == 'projects' && slug_list[5] == 'tickets') {
            this.admin_project_sub = 'tickets';
            this.admin_sub_3 = 'tickets';
        }
        if (slug_list[slug_list.length - 1] !== this.admin_project_sub) {
            this.is_dashboard = false;
        }
        if (slug_list[2] == 'projects' && slug_list[5] == 'members') {
            this.is_dashboard = false;
            this.admin_project_sub = 'members';
            this.admin_sub_3 = 'members';
        }
        if (slug_list[3] == 'projects' && slug_list[5] == 'activity') {
            this.is_dashboard = false;
            this.admin_project_sub = 'activity';
            this.admin_sub_3 = 'activity';
        }
    }
    LeftMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if ((params['project_name'] !== 'add') && params['project_name'] !== undefined || _this.project_name !== '') {
                var project_name = _this.project_name ? _this.project_name : params['project_name'];
                _this.getAllProject(project_name);
            }
            _this.router.events.subscribe(function (path) {
                if (path instanceof NavigationEnd) {
                    _this.createUrlVariables(path);
                }
            });
        });
    };
    LeftMenuComponent.prototype.ngOnDestroy = function () {
        this.project = {
            id: null,
            name: '',
            slug: '',
            tickets: []
        };
    };
    LeftMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.router.events.subscribe(function (path) {
            if (path instanceof NavigationEnd) {
                _this.createUrlVariables(path);
            }
        });
    };
    LeftMenuComponent.prototype.getAllProject = function (project_name) {
        var _this = this;
        this.projectService.getProject(project_name).subscribe(function (res) {
            if (res) {
                _this.project = res;
            }
        });
    };
    LeftMenuComponent.prototype.createUrlVariables = function (path) {
        //Get Url
        var currentURL = path.url;
        //Get Params
        var indexActUrlParam = currentURL.indexOf("?");
        //Get the exact active route
        var indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam);
        //Assign to our private activeUrl
        this.activeURL = indexActUrl;
        var slug_list = this.activeURL.split('/');
        var isSubRoute = (this.activeURL.match(/\//g) || []).length;
        this.onload_slug_list = slug_list;
        this.admin_project_sub = slug_list[slug_list.length - 1];
        this.admin_sub_3 = this.admin_project_sub;
        if (slug_list.length < 4) {
            this.is_dashboard = false;
        }
        else {
            this.is_dashboard = true;
        }
        if ((!slug_list.includes("add") && !slug_list.includes("activity")) && (slug_list.includes("projects") || slug_list[3] == 'projects') && slug_list.length >= 5) {
            this.admin_sub_1 = "projects";
            this.admin_sub_2 = slug_list[4];
            this.admin_project_sub = slug_list[slug_list.length - 1];
            this.project_name = this.admin_project_sub;
            this.getAllProject(this.admin_sub_2);
        }
        if (slug_list[3] == 'projects' && slug_list[5] == 'tickets') {
            this.admin_project_sub = 'tickets';
            this.admin_sub_3 = 'tickets';
        }
        if (slug_list[slug_list.length - 1] !== this.admin_project_sub) {
            this.is_dashboard = false;
        }
        if (slug_list[3] == 'projects' && slug_list[5] == 'members') {
            this.is_dashboard = false;
            this.admin_project_sub = 'members';
            this.admin_sub_3 = 'members';
        }
        if (slug_list[3] == 'projects' && slug_list[5] == 'activity') {
            this.is_dashboard = false;
            this.admin_project_sub = 'activity';
            this.admin_sub_3 = 'activity';
        }
    };
    tslib_1.__decorate([
        Input('project_name'),
        tslib_1.__metadata("design:type", String)
    ], LeftMenuComponent.prototype, "project_name", void 0);
    tslib_1.__decorate([
        Input('admin_project_sub'),
        tslib_1.__metadata("design:type", String)
    ], LeftMenuComponent.prototype, "admin_project_sub", void 0);
    tslib_1.__decorate([
        Input('auth_profile'),
        tslib_1.__metadata("design:type", Object)
    ], LeftMenuComponent.prototype, "auth_profile", void 0);
    tslib_1.__decorate([
        Input('auth_client'),
        tslib_1.__metadata("design:type", Object)
    ], LeftMenuComponent.prototype, "auth_client", void 0);
    LeftMenuComponent = tslib_1.__decorate([
        Component({
            selector: 'app-left-menu',
            templateUrl: './left-menu.component.html',
            styleUrls: ['../layout.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router,
            ActivatedRoute,
            ProjectService])
    ], LeftMenuComponent);
    return LeftMenuComponent;
}());
export { LeftMenuComponent };
//# sourceMappingURL=left-menu.component.js.map