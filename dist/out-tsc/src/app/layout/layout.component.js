import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(authService, userService, projectService, settingService, router, activatedRoute) {
        var _this = this;
        this.authService = authService;
        this.userService = userService;
        this.projectService = projectService;
        this.settingService = settingService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.settings = [];
        this.projectsList = [];
        this.setClient();
        // Settings
        this.settingService.loadAll();
        this.admin_sub_1 = "";
        this.admin_sub_2 = "";
        this.admin_project_sub = "";
        this.router.events.subscribe(function (path) {
            _this.profile = _this.authService.getAuthUser();
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
                _this.breadcrumb = slug_list;
                var isSubRoute = (_this.activeURL.match(/\//g) || []).length;
                if (slug_list.includes("projects") || slug_list[3] == 'projects') {
                    _this.admin_sub_1 = "projects";
                    _this.admin_sub_2 = slug_list[4];
                    _this.admin_project_sub = slug_list[slug_list.length - 1];
                }
                if (slug_list.includes("profile") || slug_list[2] == 'profile') {
                    _this.admin_sub_1 = "profile";
                    _this.admin_sub_2 = slug_list[4];
                    _this.admin_project_sub = slug_list[slug_list.length - 1];
                }
                if (slug_list.includes("activity") || slug_list[3] == 'activity') {
                    _this.admin_sub_1 = "activity";
                    _this.admin_sub_2 = slug_list[4];
                    _this.admin_project_sub = slug_list[slug_list.length - 1];
                }
            }
        });
    }
    LayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.activatedRoute.snapshot.params['filter'];
        this.settingService.settings.subscribe(function (res) {
            _this.settings = res;
        });
        this.avatar = localStorage.getItem('avatar');
        this.auth_client = localStorage.getItem('client');
        // this.projectService.getAllProjects().subscribe( res =>{
        //   let list = res;
        //   this.projectsList = list;
        // });
        this.projectService.loadAll();
        this.projectService.projects.subscribe(function (res) {
            _this.projectsList = res;
        });
    };
    LayoutComponent.prototype.ngAfterViewInit = function () {
    };
    LayoutComponent.prototype.setClient = function () {
        var _this = this;
        this.subscription = this.userService.currentClient.subscribe(function (client) { _this.auth_client = client; });
    };
    tslib_1.__decorate([
        ViewChild("chart"),
        tslib_1.__metadata("design:type", ElementRef)
    ], LayoutComponent.prototype, "refChart", void 0);
    LayoutComponent = tslib_1.__decorate([
        Component({
            selector: 'app-layout',
            templateUrl: './layout.component.html',
            styleUrls: ['./layout.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            UserService,
            ProjectService,
            SettingService,
            Router,
            ActivatedRoute])
    ], LayoutComponent);
    return LayoutComponent;
}());
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map