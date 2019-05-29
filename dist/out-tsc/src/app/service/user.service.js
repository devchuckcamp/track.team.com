import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var UserService = /** @class */ (function () {
    function UserService(config, http) {
        this.config = config;
        this.http = http;
        this.Avatar = new BehaviorSubject(localStorage.getItem("avatar"));
        this.currentAvatar = this.Avatar.asObservable();
        this.client_slug = new BehaviorSubject(localStorage.getItem("client"));
        this.currentClient = this.client_slug.asObservable();
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        // if (!localStorage.getItem('client')) {
        //     localStorage.setItem('client','sos');
        // }
    }
    UserService.prototype.setClient = function (client) {
        this.client_slug.next(client);
    };
    UserService.prototype.clearClient = function () {
        this.client_slug.complete();
    };
    UserService.prototype.setAvatar = function (avatar) {
        this.Avatar.next(avatar);
    };
    UserService.prototype.clearAvatar = function () {
        this.Avatar.complete();
    };
    UserService.prototype.loginAuth = function (username, password) {
        var body = JSON.stringify({
            username: username,
            password: password
        });
        return this.http.post(this.apiEndpoint + '/api/v1/authenticate', body, this.jt())
            .pipe(retry(2), catchError(this.config.handleError));
    };
    UserService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/users');
    };
    UserService.prototype.getById = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/users/' + id, this.jt());
    };
    UserService.prototype.save = function (user) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/users', user, this.jt());
    };
    UserService.prototype.saveinfo = function (user_details) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/users/details', user_details, this.jt());
    };
    UserService.prototype.update = function (user, id) {
        if (id === void 0) { id = null; }
        var data = JSON.stringify(user);
        return this.http.put(this.config.apiEndPoint() + '/api/v1/users/details/' + id, data, this.jt());
    };
    UserService.prototype.updateUserDetail = function (info, id) {
        if (id === void 0) { id = null; }
        var data = JSON.stringify(info);
        return this.http.put(this.config.apiEndPoint() + '/api/v1/users/details/' + id, data, this.jt());
    };
    UserService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/users/id');
    };
    UserService.prototype.uploadAvatar = function (data) {
        var avatar = JSON.stringify(data);
        this.currentAvatar = data;
        return this.http.post(this.config.apiEndPoint() + '/api/v1/users/avatar', avatar, this.jt());
    };
    UserService.prototype.updateAvatar = function (data, id) {
        var avatar = JSON.stringify(data);
        this.currentAvatar = data;
        return this.http.put(this.config.apiEndPoint() + '/api/v1/users/avatar/' + id, avatar, this.jt());
    };
    UserService.prototype.jt = function () {
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
    UserService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], UserService);
    return UserService;
}());
export { UserService };
//# sourceMappingURL=user.service.js.map