import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ThreadService } from '../service/thread.service';
import { TicketService } from '../service/ticket.service';
import { MemberService } from '../service/member.service';
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router, activedRoute, projectService, authService, userService, ticketService, threadService, memberService, activatedRoute) {
        var _this = this;
        this.router = router;
        this.activedRoute = activedRoute;
        this.projectService = projectService;
        this.authService = authService;
        this.userService = userService;
        this.ticketService = ticketService;
        this.threadService = threadService;
        this.memberService = memberService;
        this.activatedRoute = activatedRoute;
        this.default_avatar = '../assets/default-profile.png';
        this.projects = [];
        this.logo = '../assets/logo/ecomia-header-logo.svg';
        if (!this.user_avatar) {
            this.user_avatar = localStorage.getItem('avatar');
        }
        this.setClient();
        this.setAvatar();
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
                var isSubRoute = (_this.activeURL.match(/\//g) || []).length;
                if (slug_list.includes("projects")) {
                    _this.parentUrl = "projects";
                }
                else if (slug_list.includes("tickets")) {
                    _this.parentUrl = "tickets";
                }
                else if (slug_list.includes("users")) {
                    _this.parentUrl = "users";
                }
                else if (slug_list.includes("user-role")) {
                    _this.parentUrl = "user-role";
                }
                else if (slug_list.includes("activity")) {
                    _this.parentUrl = "activity";
                    console.log(slug_list, 'activity slug_list');
                }
                else {
                    _this.parentUrl = "";
                }
            }
        });
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.currentAvatar.subscribe(function (avatar) {
            _this.user_avatar = avatar;
        });
        this.projectService.loadAll();
        this.projectService.projects.subscribe(function (res) {
            _this.projects = res;
        });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.userService.clearAvatar();
        this.userService.clearClient();
    };
    NavbarComponent.prototype.setClient = function () {
        var _this = this;
        this.subscription = this.userService.currentClient.subscribe(function (client) { _this.auth_client = client; });
    };
    NavbarComponent.prototype.setAvatar = function () {
        var _this = this;
        this.subscription = this.userService.currentAvatar.subscribe(function (avatar) { _this.user_avatar = avatar; });
    };
    NavbarComponent.prototype.logout = function () {
        localStorage.clear();
        this.authService.Bearer = '';
        this.userService.Bearer = '';
        this.projectService.Bearer = '';
        this.threadService.Bearer = '';
        this.ticketService.Bearer = '';
        this.memberService.Bearer = '';
        // this.router.navigate(['/login'] );
        window.location.href = '/login';
        return false;
    };
    NavbarComponent = tslib_1.__decorate([
        Component({
            selector: 'app-navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            ProjectService,
            AuthService,
            UserService,
            TicketService,
            ThreadService,
            MemberService,
            ActivatedRoute])
    ], NavbarComponent);
    return NavbarComponent;
}());
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map