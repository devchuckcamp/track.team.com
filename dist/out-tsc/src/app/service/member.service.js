import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var MemberService = /** @class */ (function () {
    function MemberService(config, http) {
        this.config = config;
        this.http = http;
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
    }
    MemberService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets', this.jt()).pipe(map(function (res) { return res; }));
    };
    MemberService.prototype.getProjectTicketAll = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets?project=' + project_name, this.jt()).pipe(map(function (res) { return res; }));
    };
    MemberService.prototype.getProjectTicket = function (project_name, ticket_id) {
        if (project_name === void 0) { project_name = ''; }
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets/' + ticket_id + '?project=' + project_name, this.jt()).pipe(map(function (res) { return res; }));
    };
    MemberService.prototype.getTicket = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets/' + id, this.jt()).pipe(map(function (res) { return res; }));
    };
    MemberService.prototype.searchMember = function (term) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/users/?search=1&term=' + term, this.jt()).pipe(map(function (res) { return res; }));
    };
    MemberService.prototype.save = function (member) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/projects/members', member, this.jt());
    };
    MemberService.prototype.update = function (ticket) {
        return this.http.put(this.config.apiEndPoint() + '/api/v1/tickets/ticket.id', ticket);
    };
    MemberService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/users/' + id, this.jt());
    };
    MemberService.prototype.removeUserFromProject = function (user_id) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/projects/members/' + user_id, this.jt());
    };
    MemberService.prototype.jt = function () {
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
    MemberService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], MemberService);
    return MemberService;
}());
export { MemberService };
//# sourceMappingURL=member.service.js.map