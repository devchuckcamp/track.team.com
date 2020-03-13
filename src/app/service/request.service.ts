import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Project } from '../model/project';
import { Patch } from '../model/patch';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class RequestService {
    apiEndpoint:string;
    Bearer:any;
    constructor(
        private config: GlobalRoutesService,
        private http: HttpClient,
        ) {

            this.apiEndpoint = this.config.apiEndPoint();
            if(localStorage.getItem("currentUser")){
                this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
            }
        }


    save(request) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/user-request', request, this.jt());
    }

    update(request: Project) {
        return this.http.put(this.config.apiEndPoint()+'/api/v1/user-request/request.id', request);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/user-request/'+id, this.jt());
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