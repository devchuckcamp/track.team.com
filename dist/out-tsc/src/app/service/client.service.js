import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var ClientService = /** @class */ (function () {
    function ClientService(config, http) {
        this.config = config;
        this.http = http;
        this.ProjectsList = [];
        this.client = new BehaviorSubject({});
        this.currentClient = this.client.asObservable();
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        this.baseUrl = this.config.apiEndPoint() + '/api/v1/projects?all=1';
        this.dataStore = { projects: [] };
        this._projects = new BehaviorSubject([]);
        this.projects = this._projects.asObservable();
    }
    ClientService.prototype.setClient = function (client) {
        this.client.next(client);
    };
    ClientService.prototype.clearClient = function () {
        this.client.complete();
    };
    ClientService.prototype.validate = function (client) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/client-user?client=' + client).pipe(map(function (res) { return res; }), catchError(this.config.handleError));
    };
    ClientService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects', this.jt()).pipe(map(function (res) { return res; }));
    };
    ClientService.prototype.loadAll = function () {
        var _this = this;
        this.http.get(this.config.apiEndPoint() + '/api/v1/projects?all=1', this.jt()).subscribe(function (data) {
            _this.dataStore.projects = data;
            _this._projects.next(Object.assign({}, _this.dataStore).projects);
        }, function (error) { return console.log('Could not load projects.'); });
    };
    ClientService.prototype.create = function (project) {
        var _this = this;
        this.http.post(this.config.apiEndPoint() + '/api/v1/projects', JSON.stringify(project)).subscribe(function (data) {
            _this.dataStore.projects.push(data);
            _this._projects.next(Object.assign({}, _this.dataStore).projects);
        }, function (error) { return console.log('Could not create todo.'); });
    };
    ClientService.prototype.getAllProjects = function () {
        //return this.http.get<Project[]>(this.config.apiEndPoint()+'/api/v1/projects?all=1', this.jt());
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects?all=1', this.jt());
    };
    ClientService.prototype.getAllMember = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + project_name + '?' + 'members=all', this.jt()).pipe(map(function (res) { return res; }));
    };
    ClientService.prototype.getAllMemberObs = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + project_name + '?' + 'members=all', this.jt()).pipe(map(function (res) { return res.data; }));
    };
    ClientService.prototype.getProject = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + id, this.jt()).pipe(map(function (res) { return res; }));
    };
    ClientService.prototype.save = function (project) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/projects', project, this.jt());
    };
    ClientService.prototype.update = function (project) {
        return this.http.put(this.config.apiEndPoint() + '/api/v1/projects/project.id', project);
    };
    ClientService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/projects/id');
    };
    ClientService.prototype.createActivationToken = function (obj) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/user/account/activation', obj, this.jt());
    };
    ClientService.prototype.deleteToken = function (token) {
        return this.http.delete(this.config.apiEndPoint() + '/api/v1/activated/account/token?token=' + token);
    };
    ClientService.prototype.jt = function () {
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
    ClientService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], ClientService);
    return ClientService;
}());
export { ClientService };
//# sourceMappingURL=client.service.js.map