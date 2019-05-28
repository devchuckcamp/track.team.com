import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/toPromise';
// import * as xml2js from 'xml2js';
import { User } from '../model/user';

//GLobal
import { ClientGlobalRoutesService } from '../config/client';

@Injectable()
export class GlobalRoutesService {

    private clientID = 'newclient';
    //private storage = localStorage.getItem('currentUser').json();
    private Bearer:any;
    private err:any;
    private userID = '';
    public mimsPort='80';
    public apiPort='';
    //public apiPort = '8081'; //for staging
    public host='13df5855.ngrok.io'; //development
    //public host='192.168.10.10'; //for staging
    //public host='support.ecomia.com'; //for production
    //public protocol='http://'; //for development
    public protocol='https://'; //production
    public googleLogin=this.protocol+this.host+':'+this.apiPort+'/glogin';

    constructor(
        private http: HttpClient,
        private clientGlobalRoutesService:ClientGlobalRoutesService
    ) {
        if(localStorage.getItem("currentUser")){
            this.Bearer = localStorage.getItem("currentUser");
        }
    }

    apiEndPoint(){
        return this.protocol+this.host+':'+this.apiPort;
    }

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
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };
    loginAuth (username:string,password:string): Observable<any> {
        var body = JSON.stringify({
            username:username,
            password:password
        });
        return this.http.post<any>(this.protocol+this.host+':'+this.apiPort+'/users', body, this.jt())
          .pipe(
            retry(2),
            catchError(this.handleError)
          );
      }

    //Global
    getProtocol(){
        return this.protocol;
    }

    getHost(){
        return this.host+':';
    }

    getHostPort(){
        return this.apiPort;
    }

    // Users
    getUsersURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/auth-user';
    }
    getAllUsersURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/users';
    }

    // Employee
    getAllEmployeesURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/employee';
    }

    getPatientVitalURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/patient-physical-exam';
    }

    // Doctors
    getAllDoctorsURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/doctors';
    }
    //Specialty
    getAllDoctorsSpecialtyURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/specialty';
    }
    getDoctorURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/doctors';
    }
    // All Departments
    getAllDepartmentsURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/department';
    }
    // Specific Department
    getDepartmentURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/department'
    }
    //Availability Time
    getDoctorAvailabilityTimeURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/doctor-availability-time';
    }
    //Availability Day
    getDoctorAvailabilityDayURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/doctor-availability-day';
    }

    // Patient
    getAllPatientsURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/patients';
    }
    getPatientURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/patients';
    }

    // Secretaries
    getAllSecretariesURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/secretaries';
    }
    getSecretaryURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/secretaries';
    }

    // Pharmacists
    getAllPharmacistsURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/pharmacists';
    }
    getPharmacistURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/pharmacists';
    }

    // Pharmacy
    getAllPharmaciesURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/pharmacies';
    }
    getPharmacyURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/pharmacies';
    }

    // CLinic
    getClinicURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/clinics';
    }

    // Appointments
    getAppointmentURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/appointments';
    }
    getAppointmentDetailURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/appointment-details';
    }

    // Audit Trail
    getAuditURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/audit-trail';
    }
    getAuditsURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/audit-trail';
    }

    // Authentication
    getLoginURI(){
        return this.protocol+this.host+':'+this.apiPort+'/oauth/token';
    }
    //Google Login
    getGoogleLogin(){
        return this.googleLogin;
    }

    //Client Credentials
    getClientKey(){
        var data = this.clientGlobalRoutesService.getClientKey();

        return data;
    }

    //Check Applicant Domain
    getDomainURI(){
        return this.protocol+this.host+':'+this.apiPort+'/api/v1/domain';
    }

    private jt() {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer '+this.Bearer,
            'Content-Type':  'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow':'GET,POST,PUT,DELETE,OPTION'
          })
        let options = { headers: headers };
        return options;
    }

    private plain() {
            let headers = new HttpHeaders({'Accept':'application/json'});
            headers.append('Content-type','application/json');
            return headers;
    }
}