import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//GLobal
import { ClientGlobalRoutesService } from '../config/client';
var GlobalRoutesService = /** @class */ (function () {
    function GlobalRoutesService(http, clientGlobalRoutesService) {
        this.http = http;
        this.clientGlobalRoutesService = clientGlobalRoutesService;
        this.clientID = 'newclient';
        this.userID = '';
        this.mimsPort = '80';
        this.apiPort = '';
        //public apiPort = '8081'; //for staging
        //public host='bcb30376.ngrok.io'; //development
        this.host = '192.168.10.10'; //for staging
        //public host='support.ecomia.com'; //for production
        this.protocol = 'http://'; //for development
        //public protocol='https://'; //production
        this.googleLogin = this.protocol + this.host + ':' + this.apiPort + '/glogin';
        if (localStorage.getItem("currentUser")) {
            this.Bearer = localStorage.getItem("currentUser");
        }
    }
    GlobalRoutesService.prototype.apiEndPoint = function () {
        return this.protocol + this.host + ':' + this.apiPort;
    };
    //loginAuth(username:string,password:string): Observable<any> {
    //     var body = JSON.stringify({
    //             username:username,
    //             password:password
    //         });
    //     return this.http.post(this.protocol+this.host+':'+this.apiPort+'/api/v1/authenticate',
    //         body
    //         ,this.jt())
    //         .pipe(map(response => response)
    //         catchError(this.handleError('addHero', hero))
    //         );
    //                 // return this.http
    //                 // .post<EhsAssessmentAr>(`${this.baseUrl}/ar?labId=${labId}`)
    //                 // .pipe(
    //                 //     map((x:EhsAssessmentAr[]) => {
    //                 //         const ret = EhsAssessmentAr.fromJson(x);
    //                 //         ret.ar = this.sanitizer.sanitize(SecurityContext.HTML, ret.ar.replace(/\n/g, '<br/>'));
    //                 //         return ret;
    //                 //     })
    //                 // )
    // }
    GlobalRoutesService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            //console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            //   console.error(
            //     `Backend returned code ${error.status}, ` +
            //     `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(error.error);
    };
    ;
    GlobalRoutesService.prototype.loginAuth = function (username, password) {
        var body = JSON.stringify({
            username: username,
            password: password
        });
        return this.http.post(this.protocol + this.host + ':' + this.apiPort + '/users', body, this.jt())
            .pipe(retry(2), catchError(this.handleError));
    };
    //Global
    GlobalRoutesService.prototype.getProtocol = function () {
        return this.protocol;
    };
    GlobalRoutesService.prototype.getHost = function () {
        return this.host + ':';
    };
    GlobalRoutesService.prototype.getHostPort = function () {
        return this.apiPort;
    };
    // Users
    GlobalRoutesService.prototype.getUsersURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/auth-user';
    };
    GlobalRoutesService.prototype.getAllUsersURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/users';
    };
    // Employee
    GlobalRoutesService.prototype.getAllEmployeesURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/employee';
    };
    GlobalRoutesService.prototype.getPatientVitalURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/patient-physical-exam';
    };
    // Doctors
    GlobalRoutesService.prototype.getAllDoctorsURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/doctors';
    };
    //Specialty
    GlobalRoutesService.prototype.getAllDoctorsSpecialtyURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/specialty';
    };
    GlobalRoutesService.prototype.getDoctorURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/doctors';
    };
    // All Departments
    GlobalRoutesService.prototype.getAllDepartmentsURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/department';
    };
    // Specific Department
    GlobalRoutesService.prototype.getDepartmentURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/department';
    };
    //Availability Time
    GlobalRoutesService.prototype.getDoctorAvailabilityTimeURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/doctor-availability-time';
    };
    //Availability Day
    GlobalRoutesService.prototype.getDoctorAvailabilityDayURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/doctor-availability-day';
    };
    // Patient
    GlobalRoutesService.prototype.getAllPatientsURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/patients';
    };
    GlobalRoutesService.prototype.getPatientURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/patients';
    };
    // Secretaries
    GlobalRoutesService.prototype.getAllSecretariesURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/secretaries';
    };
    GlobalRoutesService.prototype.getSecretaryURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/secretaries';
    };
    // Pharmacists
    GlobalRoutesService.prototype.getAllPharmacistsURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/pharmacists';
    };
    GlobalRoutesService.prototype.getPharmacistURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/pharmacists';
    };
    // Pharmacy
    GlobalRoutesService.prototype.getAllPharmaciesURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/pharmacies';
    };
    GlobalRoutesService.prototype.getPharmacyURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/pharmacies';
    };
    // CLinic
    GlobalRoutesService.prototype.getClinicURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/clinics';
    };
    // Appointments
    GlobalRoutesService.prototype.getAppointmentURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/appointments';
    };
    GlobalRoutesService.prototype.getAppointmentDetailURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/appointment-details';
    };
    // Audit Trail
    GlobalRoutesService.prototype.getAuditURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/audit-trail';
    };
    GlobalRoutesService.prototype.getAuditsURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/audit-trail';
    };
    // Authentication
    GlobalRoutesService.prototype.getLoginURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/oauth/token';
    };
    //Google Login
    GlobalRoutesService.prototype.getGoogleLogin = function () {
        return this.googleLogin;
    };
    //Client Credentials
    GlobalRoutesService.prototype.getClientKey = function () {
        var data = this.clientGlobalRoutesService.getClientKey();
        return data;
    };
    //Check Applicant Domain
    GlobalRoutesService.prototype.getDomainURI = function () {
        return this.protocol + this.host + ':' + this.apiPort + '/api/v1/domain';
    };
    GlobalRoutesService.prototype.jt = function () {
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
    GlobalRoutesService.prototype.plain = function () {
        var headers = new HttpHeaders({ 'Accept': 'application/json' });
        headers.append('Content-type', 'application/json');
        return headers;
    };
    GlobalRoutesService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            ClientGlobalRoutesService])
    ], GlobalRoutesService);
    return GlobalRoutesService;
}());
export { GlobalRoutesService };
//# sourceMappingURL=config.js.map