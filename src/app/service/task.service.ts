import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Project } from '../model/project';
import { Patch } from '../model/patch';
import { Task } from '../model/task';
import { Meta } from '../model/meta';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class TaskService {
    apiEndpoint:string;
    Bearer:any;
    // Logged in user avatar
    isAMember =  new BehaviorSubject<boolean>(null);
    currentIsMember = this.isAMember.asObservable();
    projects: Observable<Project[]>
        private _projects: BehaviorSubject<Project[]>;
        private baseUrl: string;
        private dataStore: {
            projects: any[]
        };
    ProjectsList: Project[]= [];

    projectsPatches: Observable<Project[]>
        private _projectPatch: BehaviorSubject<Project[]>;
        private projectPatchBaseUrl: string;
        private ticketTaskBaseUrl: string;
        public ticketTaskDataStore: {
            ticketTask: any[]
        };
        public projectPatchDataStore: {
            projectPatches: any[]
        };
    ProjectPatches: Patch[]= [];
    
    ticketTask: Observable<Task[]>
    _ticketTask: BehaviorSubject<Task[]>;
    ticketTaskStore: {
        ticketTask: any
    };
    ticketTaskList: Task;


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

            this.projectPatchBaseUrl = this.config.apiEndPoint()+'/api/v1/ticket-patch';
            this.projectPatchDataStore = { projectPatches: [] };
            this._projectPatch = <BehaviorSubject<any[]>>new BehaviorSubject([]);
            this.projectsPatches = this._projectPatch.asObservable();

            this.ticketTaskBaseUrl = this.config.apiEndPoint()+'/api/v1/ticket-task';
            this.ticketTaskDataStore = { ticketTask: [] };
            this._ticketTask = <BehaviorSubject<any[]>>new BehaviorSubject([]);
            this.ticketTask = this._ticketTask.asObservable();
        }
    setIsMember(valid:boolean){
        this.isAMember.next(valid);
    }
    getAll() {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects', this.jt()).pipe(map( (res:any) => res), catchError(this.config.handleError));
    }

    loadAll() {
        this.http.get(this.config.apiEndPoint()+'/api/v1/projects?all=1', this.jt()).subscribe( (data :any)=> {
          this.dataStore.projects = data;
          this._projects.next(Object.assign({}, this.dataStore).projects);
        }, error => console.log('Could not load projects.'));
    }

    create(task) {
        var data = JSON.stringify({
            ticket_id:task.ticket_id,
            title: task.title,
            description: task.description
        });
        return this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-task', data, this.jt());
    }
    update(task:any){
        var data = JSON.stringify({
            title:task.title,
            description:task.description,
            status:task.status
        });
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket-task/'+task.task_id, data, this.jt());
    }
    remove(taskid){
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/ticket-task/'+taskid, this.jt());
    }

    // Settings
    getETAAccess(project:any = null, meta:any = null, sub_meta:any = null){
        let vars = '?project='+project+'&meta='+meta+'&sub_meta='+sub_meta;
        return this.http.get(this.config.apiEndPoint()+'/api/v1/meta'+vars, this.jt()).pipe(map( (res:any) => res));
    }
    getMetaValue(project:any = null, meta:any = null, sub_meta:any = null, resource_id:any = null, type:any=null){
        let vars = '?project='+project+'&meta='+meta+'&sub_meta='+sub_meta+'&type='+type;
        return this.http.get(this.config.apiEndPoint()+'/api/v1/meta/'+resource_id+vars, this.jt()).pipe(map( (res:any) => res));;
    }
    updateMetaValue(metaid, val){
        let data = JSON.stringify({
            meta_id:metaid,
            value: val
        });
        return this.http.put(this.config.apiEndPoint()+'/api/v1/meta-value/'+metaid, data, this.jt());
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