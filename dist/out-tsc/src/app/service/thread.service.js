import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalRoutesService } from '../config/config';
var ThreadService = /** @class */ (function () {
    function ThreadService(config, http) {
        this.config = config;
        this.http = http;
        this.apiEndpoint = this.config.apiEndPoint();
        if (localStorage.getItem("currentUser")) {
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
    }
    ThreadService.prototype.getAll = function () {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets', this.jt()).pipe(map(function (res) { return res; }));
    };
    ThreadService.prototype.getProjectTicketAll = function (project_name) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/tickets?project=' + project_name, this.jt()).pipe(map(function (res) { return res; }));
    };
    ThreadService.prototype.getTicket = function (id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/thread/' + id, this.jt()).pipe(map(function (res) { return res; }));
    };
    ThreadService.prototype.getAllTicketThread = function (ticket_id) {
        return this.http.get(this.config.apiEndPoint() + '/api/v1/thread?ticket=' + ticket_id, this.jt()).pipe(map(function (res) { return res; }));
    };
    ThreadService.prototype.send = function (thread) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/thread/', thread, this.jt());
    };
    ThreadService.prototype.update = function (ticket) {
        return this.http.put(this.config.apiEndPoint() + '/api/v1/tickets/ticket.id', ticket);
    };
    ThreadService.prototype.delete = function (id) {
        return this.http.delete(this.config.apiEndPoint() + '/tickets/id');
    };
    ThreadService.prototype.getImage = function (thread_id) {
        return this.http.get('https://homestead.test/uploads/thread/admin.PNG');
    };
    ThreadService.prototype.jt = function () {
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
    ThreadService.prototype.fileHeader = function () {
        var headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.Bearer,
            'Content-Type': 'null',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Allow_Headers': ' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow': 'GET,POST,PUT,DELETE,OPTION'
        });
        var options = { headers: headers };
        return options;
    };
    ThreadService.prototype.uploadThreadFile = function (thread) {
        return this.http.post(this.config.apiEndPoint() + '/api/v1/thread/image/upload', thread, this.fileHeader());
    };
    // ---
    // PUBLIC METHODS.
    // ---
    // I upload the given file to the remote server. Returns a Promise.
    ThreadService.prototype.uploadFile = function (file) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http
                            .post('https://homestead.test/api/v1/thread/image/upload', file, // Send the File Blob as the POST body.
                        {
                            // NOTE: Because we are posting a Blob (File is a specialized Blob
                            // object) as the POST body, we have to include the Content-Type
                            // header. If we don't, the server will try to parse the body as
                            // plain text.
                            headers: {
                                "Content-Type": file.type
                            },
                            params: {
                                clientFilename: file.name,
                                mimeType: file.type
                            }
                        })
                            .toPromise()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, ({
                                name: file.name,
                                type: file.type,
                                size: file.size,
                                url: result.url
                            })];
                }
            });
        });
    };
    ThreadService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [GlobalRoutesService,
            HttpClient])
    ], ThreadService);
    return ThreadService;
}());
export { ThreadService };
//# sourceMappingURL=thread.service.js.map