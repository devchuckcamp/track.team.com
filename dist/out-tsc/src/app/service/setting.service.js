import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var SettingService = /** @class */ (function () {
    function SettingService(config, http) {
        this.config = config;
        this.http = http;
        this.ProjectsList = [];
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        this.baseUrl = this.config.apiEndPoint() + '/api/v1/projects?all=1';
        this.dataStore = { settings: [] };
        this._settings = new BehaviorSubject([]);
        this.settings = this._settings.asObservable();
    }
    SettingService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/ticket-priorities', this.jt()).pipe(map(function (res) { return res; }));
    };
    SettingService.prototype.loadAll = function () {
        var _this = this;
        this.http.get(this.config.apiEndPoint() + '/api/v1/ticket-priorities?all=1', this.jt()).subscribe(function (res) {
            _this.dataStore.settings = res;
            _this._settings.next(Object.assign({}, _this.dataStore).settings);
        }, function (error) { return console.log('Could not load projects.'); });
    };
    SettingService.prototype.create = function (ticket) {
        var _this = this;
        this.http.post(this.config.apiEndPoint() + '/api/v1/ticket-priorities', JSON.stringify(ticket)).subscribe(function (data) {
            _this.dataStore.settings.push(data);
            _this._settings.next(Object.assign({}, _this.dataStore).settings);
        }, function (error) { return console.log('Could not create todo.'); });
    };
    SettingService.prototype.getAllProjects = function () {
        //return this.http.get<Project[]>(this.config.apiEndPoint()+'/api/v1/projects?all=1', this.jt());
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects?all=1', this.jt());
    };
    SettingService.prototype.getAllMember = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + project_name + '?' + 'members=all', this.jt()).pipe(map(function (res) { return res; }));
    };
    SettingService.prototype.getAllMemberObs = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + project_name + '?' + 'members=all', this.jt()).pipe(map(function (res) { return res.data; }));
    };
    SettingService.prototype.getProject = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + id, this.jt()).pipe(map(function (res) { return res; }));
    };
    SettingService.prototype.save = function (ticketOption) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/ticket-priorities', ticketOption, this.jt());
    };
    SettingService.prototype.update = function (ticket, ticket_id) {
        var data = JSON.stringify({
            name: ticket.name,
            color: ticket.color,
        });
        return this.http.put(this.config.apiEndPoint() + '/api/v1/ticket-priorities/' + ticket_id, data, this.jt());
    };
    SettingService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/projects/id');
    };
    SettingService.prototype.jt = function () {
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
    SettingService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], SettingService);
    return SettingService;
}());
export { SettingService };
//# sourceMappingURL=setting.service.js.map