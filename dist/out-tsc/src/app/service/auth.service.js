import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
import { ClientGlobalRoutesService } from '../config/client';
var AuthService = /** @class */ (function () {
    function AuthService(config, client, http) {
        this.config = config;
        this.client = client;
        this.http = http;
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        if (localStorage.getItem("csrf_token")) {
            this.CSRF_TOKEN = JSON.parse(localStorage.getItem("csrf_token")).token;
        }
        else {
            localStorage.setItem('csrf_token', JSON.stringify({ 'token': 'lkcc371220183d' }));
        }
    }
    AuthService.prototype.loginAuth = function (username, password) {
        var client = JSON.parse(this.client.getClientKey());
        var body = JSON.stringify({
            "username": username,
            "password": password,
            "client_id": client.client_id,
            "client_secret": client.client_secret,
            "grant_type": "password",
        });
        return this.http.post(this.apiEndpoint + '/api/v1/oauth/token', body, this.jt())
            .pipe(
        // retry(2),
        catchError(this.config.handleError));
    };
    AuthService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/users');
    };
    AuthService.prototype.getAuthenticatedUser = function () {
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        return this.http.get(this.config.apiEndPoint() + '/api/user', this.jt());
    };
    AuthService.prototype.getAuthenticatedUserProfile = function (id) {
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        return this.http.get(this.config.apiEndPoint() + '/api/v1/users/' + id, this.jt());
    };
    AuthService.prototype.getAuthUser = function () {
        return JSON.parse(localStorage.getItem("authUser"));
    };
    AuthService.prototype.getById = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/users/' + id, this.jt());
    };
    AuthService.prototype.register = function (user) {
        return this.http.post(this.config.apiEndPoint() + '/users/register', user);
    };
    AuthService.prototype.update = function (user) {
        return this.http.put(this.config.apiEndPoint() + '/users/user.id', user);
    };
    AuthService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/users/id');
    };
    AuthService.prototype.jt = function () {
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
    AuthService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            ClientGlobalRoutesService,
            HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map