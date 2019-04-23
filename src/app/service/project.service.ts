import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Project } from '../model/project';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class ProjectService {
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

    getAll() {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects', this.jt()).pipe(map( (res:any) => res));
    }

    getProject(id: number) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+id, this.jt()).pipe(map( (res:any) => res));
    }

    register(project: Project) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/projects/register', project);
    }

    update(project: Project) {
        return this.http.put(this.config.apiEndPoint()+'/api/v1/projects/project.id', project);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/projects/id');
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