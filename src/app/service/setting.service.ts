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
    settings: Observable<any[]>
        private _settings: BehaviorSubject<any[]>;
        private baseUrl: string;
        private dataStore: {
            settings: any[]
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
            this.dataStore = { settings: [] };
            this._settings = <BehaviorSubject<any[]>>new BehaviorSubject([]);
            this.settings = this._settings.asObservable();
        }

    getAll() {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/ticket-priorities', this.jt()).pipe(map( (res:any) => res));
    }

    loadAll() {
        this.http.get(this.config.apiEndPoint()+'/api/v1/ticket-priorities?all=1', this.jt()).subscribe( (res :any)=> {
          this.dataStore.settings = res;
          this._settings.next(Object.assign({}, this.dataStore).settings);
        }, error => console.log('Could not load projects.'));
    }
    
    create(ticket: any) {
        this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-priorities', JSON.stringify(ticket)).subscribe( (data:any) => {
            this.dataStore.settings.push(data);
            this._settings.next(Object.assign({}, this.dataStore).settings);
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

    save(ticketOption: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-priorities', ticketOption, this.jt());
    }

    update(ticket: any, ticket_id: number) {
        let data = JSON.stringify({
            name:ticket.name,
            color:ticket.color,
        });
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket-priorities/'+ticket_id, data, this.jt());
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