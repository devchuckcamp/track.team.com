import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Project } from '../model/project';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class SettingService {
    apiEndpoint:string;
    Bearer:any;
    projects: Observable<Project[]>
        private _projects: BehaviorSubject<Project[]>;
        private baseUrl: string;
        private dataStore: {
            projects: any[]
        };
    ProjectsList: Project[]= [];
    constructor(
        private config: GlobalRoutesService,
        private http: HttpClient,
        ) {
            this.apiEndpoint = this.config.apiEndPoint();
            if(localStorage.getItem("currentUser")){
                this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
            }
            this.baseUrl = this.config.apiEndPoint()+'/api/v1/projects?all=1';
            this.dataStore = { projects: [] };
            this._projects = <BehaviorSubject<Project[]>>new BehaviorSubject([]);
            this.projects = this._projects.asObservable();
        }

    getAll() {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects', this.jt()).pipe(map( (res:any) => res));
    }

    loadAll() {
        this.http.get(this.config.apiEndPoint()+'/api/v1/projects?all=1', this.jt()).subscribe( (data :any)=> {
          this.dataStore.projects = data;
          this._projects.next(Object.assign({}, this.dataStore).projects);
        }, error => console.log('Could not load projects.'));
    }
    
    create(project: Project) {
        this.http.post(this.config.apiEndPoint()+'/api/v1/projects', JSON.stringify(project)).subscribe( (data:any) => {
            this.dataStore.projects.push(data);
            this._projects.next(Object.assign({}, this.dataStore).projects);
          }, error => console.log('Could not create todo.'));
      }

    getAllProjects() :Observable<Project[]> {
         //return this.http.get<Project[]>(this.config.apiEndPoint()+'/api/v1/projects?all=1', this.jt());
         return this.http.get<Project[]>(this.config.apiEndPoint()+'/api/v1/projects?all=1', this.jt());
    }
    getAllMember(project_name:string) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+project_name+'?'+'members=all', this.jt()).pipe(map( (res:any) => res));
    }

    getAllMemberObs(project_name:string) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+project_name+'?'+'members=all', this.jt()).pipe(map( (res:any) => res.data));
    }

    getProject(id: any) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+id, this.jt()).pipe(map( (res:any) => res));
    }

    save(project: Project) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/projects', project, this.jt());
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