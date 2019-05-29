import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var ActivityService = /** @class */ (function () {
    function ActivityService(config, http) {
        this.config = config;
        this.http = http;
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
    }
    ActivityService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/activity', this.jt()).pipe(map(function (res) { return res; }));
    };
    ActivityService.prototype.getProjectAllActivity = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/activity?project=' + project_name, this.jt()).pipe(map(function (res) { return res; }));
    };
    ActivityService.prototype.getProjectTicket = function (project_name, ticket_id) {
        if (project_name === void 0) { project_name = ''; }
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets/' + ticket_id + '?project=' + project_name, this.jt()).pipe(map(function (res) { return res; }));
    };
    ActivityService.prototype.getTicket = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets/' + id, this.jt()).pipe(map(function (res) { return res; }));
    };
    ActivityService.prototype.searchMember = function (term) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/users/?search=1&term=' + term, this.jt()).pipe(map(function (res) { return res; }));
    };
    ActivityService.prototype.save = function (member) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/projects/members', member, this.jt());
    };
    ActivityService.prototype.update = function (ticket) {
        return this.http.put(this.config.apiEndPoint() + '/api/v1/tickets/ticket.id', ticket);
    };
    ActivityService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/users/' + id, this.jt());
    };
    ActivityService.prototype.removeUserFromProject = function (user_id) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/projects/members/' + user_id, this.jt());
    };
    ActivityService.prototype.jt = function () {
        var headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.Bearer,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Allow_Headers': ' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow': 'GET,POST,PUT,DELETE,OPTION'
        });
        var options = { headers: headers };
        return options;
    };
    ActivityService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], ActivityService);
    return ActivityService;
}());
export { ActivityService };
//# sourceMappingURL=activity.service.js.map