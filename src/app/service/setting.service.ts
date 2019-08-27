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
    // Project Priorities
    settings: Observable<any[]>
        private _settings: BehaviorSubject<any[]>;
        private baseUrl: string;
        private dataStore: {
            settings: any[]
        };
    // Project Status
    statusSettings: Observable<any[]>
        private _statusSettings: BehaviorSubject<any[]>;
        private statusSettingsDataStore: {
            statusSettings: any[]
        };
    ProjectsList: Project[]= [];

    // Project Category
     categorySettings: Observable<any[]>
     private _categorySettings: BehaviorSubject<any[]>;
     private categorySettingsDataStore: {
        categorySettings: any[]
     };

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

            this.statusSettingsDataStore = { statusSettings: [] };
            this._statusSettings = <BehaviorSubject<any[]>>new BehaviorSubject([]);
            this.statusSettings = this._statusSettings.asObservable();

            this.categorySettingsDataStore = { categorySettings: [] };
            this._categorySettings = <BehaviorSubject<any[]>>new BehaviorSubject([]);
            this.categorySettings = this._categorySettings.asObservable();
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


    loadAllProjectStatus() {
        this.http.get(this.config.apiEndPoint()+'/api/v1/ticket_statuses?all=1', this.jt()).subscribe( (res :any)=> {
          this.statusSettingsDataStore.statusSettings = res;
          this._statusSettings.next(Object.assign({}, this.statusSettingsDataStore).statusSettings);
        }, error => console.log('Could not load projects.'));
    }
    
    createProjectStatus(ticket: any) {
        this.http.post(this.config.apiEndPoint()+'/api/v1/ticket_statuses', JSON.stringify(ticket)).subscribe( (data:any) => {
            this.statusSettingsDataStore.statusSettings.push(data);
            this._statusSettings.next(Object.assign({}, this.statusSettingsDataStore).statusSettings);
          }, error => console.log('Could not create todo.'));
    }

    loadAllTicketCategory() {
        this.http.get(this.config.apiEndPoint()+'/api/v1/ticket-category?all=1', this.jt()).subscribe( (res :any)=> {
          this.categorySettingsDataStore.categorySettings = res;
          this._categorySettings.next(Object.assign({}, this.categorySettingsDataStore).categorySettings);
        }, error => console.log('Could not load projects.'));
    }
    
    createTicketCategory(ticket: any) {
        this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-category', JSON.stringify(ticket)).subscribe( (data:any) => {
            this.categorySettingsDataStore.categorySettings.push(data);
            this._categorySettings.next(Object.assign({}, this.categorySettingsDataStore).categorySettings);
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
            order:ticket.order
        });
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket-priorities/'+ticket_id, data, this.jt());
    }

    saveTicketStatus(ticketOption: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/ticket_statuses', ticketOption, this.jt());
    }

    updateTicketStatus(ticket: any, ticket_id: number) {
        let data = JSON.stringify({
            name:ticket.name,
            color:ticket.color,
        });
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket_statuses/'+ticket_id, data, this.jt());
    }

    deleteTicketStatus(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/projects/id');
    }
    saveTicketCategory(ticketOption: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-category', ticketOption, this.jt());
    }

    updateTicketCategory(ticket: any, ticket_id: number) {
        let data = JSON.stringify({
            name:ticket.name,
        });
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket-category/'+ticket_id, data, this.jt());
    }

    deleteTicketCategory(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/ticket-category/'+id);
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