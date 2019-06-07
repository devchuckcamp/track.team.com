import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var ProjectService = /** @class */ (function () {
    function ProjectService(config, http) {
        this.config = config;
        this.http = http;
        this.ProjectsList = [];
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        this.baseUrl = this.config.apiEndPoint() + '/api/v1/projects?all=1';
        this.dataStore = { projects: [] };
        this._projects = new BehaviorSubject([]);
        this.projects = this._projects.asObservable();
    }
    ProjectService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects', this.jt()).pipe(map(function (res) { return res; }));
    };
    ProjectService.prototype.loadAll = function () {
        var _this = this;
        this.http.get(this.config.apiEndPoint() + '/api/v1/projects?all=1', this.jt()).subscribe(function (data) {
            _this.dataStore.projects = data;
            _this._projects.next(Object.assign({}, _this.dataStore).projects);
        }, function (error) { return console.log('Could not load projects.'); });
    };
    ProjectService.prototype.create = function (project) {
        var _this = this;
        this.http.post(this.config.apiEndPoint() + '/api/v1/projects', JSON.stringify(project)).subscribe(function (data) {
            _this.dataStore.projects.push(data);
            _this._projects.next(Object.assign({}, _this.dataStore).projects);
        }, function (error) { return console.log('Could not create todo.'); });
    };
    ProjectService.prototype.getAllProjects = function () {
        //return this.http.get<Project[]>(this.config.apiEndPoint()+'/api/v1/projects?all=1', this.jt());
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects?all=1', this.jt());
    };
    ProjectService.prototype.getAllMember = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + project_name + '?' + 'members=all', this.jt()).pipe(map(function (res) { return res; }));
    };
    ProjectService.prototype.getAllMemberObs = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + project_name + '?' + 'members=all', this.jt()).pipe(map(function (res) { return res.data; }));
    };
    ProjectService.prototype.getAllMemberFullList = function (project_name, filter_keyword) {
        if (filter_keyword === void 0) { filter_keyword = null; }
        var filter = '';
        if (filter_keyword) {
            filter = '&filter=' + filter_keyword;
        }
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + project_name + '?' + 'members=all&full=1' + filter, this.jt()).pipe(map(function (res) { return res; }));
    };
    ProjectService.prototype.getProject = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/projects/' + id, this.jt()).pipe(map(function (res) { return res; }));
    };
    ProjectService.prototype.save = function (project) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/projects', project, this.jt());
    };
    ProjectService.prototype.update = function (project) {
        return this.http.put(this.config.apiEndPoint() + '/api/v1/projects/project.id', project);
    };
    ProjectService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/projects/id');
    };
    ProjectService.prototype.jt = function () {
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
    ProjectService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], ProjectService);
    return ProjectService;
}());
export { ProjectService };
//# sourceMappingURL=project.service.js.map