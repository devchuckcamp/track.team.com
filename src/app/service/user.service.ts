import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { User } from '../model/user';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class UserService {
    apiEndpoint:string;
    private Bearer:any;

    constructor(
        private config: GlobalRoutesService,
        private http: HttpClient,
        ) {
            this.apiEndpoint = this.config.apiEndPoint();
            if(localStorage.getItem("currentUser")){
                this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
            }
        }

    loginAuth (username:string,password:string): Observable<any> {
            var body = JSON.stringify({
                username:username,
                password:password
            });
            return this.http.post<any>(this.apiEndpoint+'/api/v1/authenticate', body, this.jt())
              .pipe(
                retry(2),
                catchError(this.config.handleError)
              );
          }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.config.apiEndPoint()+'/users');
    }

    getById(id: number) {
        return this.http.get<User>(this.config.apiEndPoint()+'/users/'+id, this.jt());
    }

    save(user: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/users', user, this.jt());
    }

    saveinfo(user_details: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/users/details', user_details, this.jt());
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