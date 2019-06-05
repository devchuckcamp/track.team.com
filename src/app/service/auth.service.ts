import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { User } from '../model/user';
import { GlobalRoutesService } from '../config/config';
import { ClientGlobalRoutesService } from '../config/client';

@Injectable({ providedIn: 'root' })
export class AuthService {
    apiEndpoint:string;
    Bearer:any;
    CSRF_TOKEN:any;
    constructor(
        private config: GlobalRoutesService,
        private client:ClientGlobalRoutesService,
        private http: HttpClient,
        ) {
            this.apiEndpoint = this.config.apiEndPoint();
            if(localStorage.getItem("currentUser")){
                this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
            }
            if(localStorage.getItem("csrf_token")){
                this.CSRF_TOKEN = JSON.parse(localStorage.getItem("csrf_token")).token;
            } else {
                localStorage.setItem('csrf_token',JSON.stringify({'token':'lkcc371220183d'}));
            }
        }

    loginAuth (username:string,password:string): Observable<any> {
            let client = JSON.parse(this.client.getClientKey());
            var body = JSON.stringify({
                "username":username,
                "password":password,
                "client_id" :client.client_id,
                "client_secret":client.client_secret,
                "grant_type" : "password",
            });

            return this.http.post<any>(this.apiEndpoint+'/api/v1/oauth/token', body, this.jt())
              .pipe(
                // retry(2),
                catchError(this.config.handleError)
              );
          }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.config.apiEndPoint()+'/users');
    }
    getAuthenticatedUser(){
        if(localStorage.getItem("currentUser")){
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        return this.http.get<User[]>(this.config.apiEndPoint()+'/api/user',this.jt());
    }
    getAuthenticatedUserProfile(id:number){
        if(localStorage.getItem("currentUser")){
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        return this.http.get(this.config.apiEndPoint()+'/api/v1/users/'+id,this.jt());
    }
    getAuthUser(){
        return JSON.parse(localStorage.getItem("authUser"));
    }
    getById(id: number) {
        return this.http.get<User>(this.config.apiEndPoint()+'/users/'+id, this.jt());
    }

    register(user: User) {
        return this.http.post(this.config.apiEndPoint()+'/users/register', user);
    }

    update(user: User) {
        return this.http.put(this.config.apiEndPoint()+'/users/user.id', user);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/users/id');
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
}