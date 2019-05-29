import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';
var ProjectDetailComponent = /** @class */ (function () {
    function ProjectDetailComponent(http, router, route, projectService, userService) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.projectService = projectService;
        this.userService = userService;
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.client_slug.subscribe(function (res) { return _this.auth_client = res; });
        this.route.params.subscribe(function (params) {
            if (params['project_name'] !== undefined && params['project_name'] !== 'add' && params['project_name'] !== 'activity') {
                _this.projectService.getProject(params['project_name']).subscribe(function (res) {
                    if (res) {
                        _this.project = res;
                        _this.tickets = _this.project.tickets;
                        _this.openTickets = _this.tickets.filter(function (ticket) { return ticket.status_id == 1; });
                        _this.inProgressTickets = _this.tickets.filter(function (ticket) { return ticket.status_id == 2; });
                        _this.completedTickets = _this.tickets.filter(function (ticket) { return ticket.status_id == 5; });
                    }
                });
            }
        });
    };
    ProjectDetailComponent.prototype.goToFilterTicket = function (filter) {
        this.router.navigate(['/' + this.auth_client + '/admin/projects/', this.project.slug, 'tickets', 'filter', filter]);
        return false;
    };
    ProjectDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-project-detail',
            templateUrl: './project-detail.component.html',
            styleUrls: ['./project.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Router,
            ActivatedRoute,
            ProjectService,
            UserService])
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());
export { ProjectDetailComponent };
//# sourceMappingURL=project-detail.component.js.map