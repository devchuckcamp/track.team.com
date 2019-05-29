import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var TicketService = /** @class */ (function () {
    function TicketService(config, http) {
        this.config = config;
        this.http = http;
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
    }
    TicketService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets', this.jt()).pipe(map(function (res) { return res; }));
    };
    TicketService.prototype.getProjectTicketAll = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets?project=' + project_name, this.jt()).pipe(map(function (res) { return res; }));
    };
    TicketService.prototype.getProjectTicketFilter = function (project_name, filter) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets?project=' + project_name + '&filter=1&status=' + filter, this.jt()).pipe(map(function (res) { return res; }));
    };
    TicketService.prototype.getProjectTicket = function (project_name, ticket_id) {
        if (project_name === void 0) { project_name = ''; }
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets/' + ticket_id + '?project=' + project_name, this.jt()).pipe(map(function (res) { return res; }));
    };
    TicketService.prototype.getTicket = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets/' + id, this.jt()).pipe(map(function (res) { return res; }));
    };
    TicketService.prototype.save = function (ticket) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/tickets', ticket, this.jt());
    };
    TicketService.prototype.update = function (ticket, type, customData) {
        if (type === void 0) { type = 'all'; }
        if (customData === void 0) { customData = null; }
        var data = JSON.stringify({
            status_id: ticket.status_id
        });
        if (type == 'status') {
            data = JSON.stringify({
                status_id: ticket.status_id
            });
        }
        if (type == 'priority') {
            data = JSON.stringify({
                priority_id: customData.id
            });
        }
        return this.http.put(this.config.apiEndPoint() + '/api/v1/tickets/' + ticket.id, data, this.jt());
    };
    TicketService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/tickets/' + id, this.jt());
    };
    // Mention
    TicketService.prototype.mentionUser = function (mentionedUser, ticket_id) {
        var _this = this;
        var mention;
        var ticketID = ticket_id;
        var mentions = [];
        mentionedUser.forEach(function (obj) {
            mention = {
                email: obj.email,
                first_name: obj.first_name,
                last_name: obj.last_name,
                user_id: obj.user_id,
                ticket_id: ticketID
            };
            mentions.push(_this.http.post(_this.config.apiEndPoint() + '/api/v1/tickets-mention-users', mention, _this.jt()));
        });
        return forkJoin(mentions);
    };
    TicketService.prototype.addTaggedUser = function (tagged_member) {
        var _this = this;
        var tag;
        var https = [];
        tagged_member.forEach(function (obj) {
            console.log(obj, 'member to be tagged from service.');
            tag = {
                ticket_id: obj.ticket_id,
                user_id: obj.user_id
            };
            https.push(_this.http.post(_this.config.apiEndPoint() + '/api/v1/tickets-tag-users', tag, _this.jt()));
        });
        return forkJoin(https);
    };
    TicketService.prototype.removeTag = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/tickets-tag-users/' + id, this.jt());
    };
    TicketService.prototype.jt = function () {
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
    TicketService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], TicketService);
    return TicketService;
}());
export { TicketService };
//# sourceMappingURL=ticket.service.js.map