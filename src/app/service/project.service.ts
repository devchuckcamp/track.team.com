import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Project } from '../model/project';
import { Patch } from '../model/patch';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class ProjectService {
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
        public projectPatchDataStore: {
            projectPatches: any[]
        };
    ProjectPatches: Patch[]= [];

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
        }
    setIsMember(valid:boolean){
        this.isAMember.next(valid);
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

    loadAllPatches(project:any, page = 1, pageSize = 25, full:any ='') {
        this.http.get(this.projectPatchBaseUrl+'?project='+project+'&page='+page+'&per_page='+pageSize+'&all='+full, this.jt()).subscribe( (data :any)=> {
          this.projectPatchDataStore.projectPatches = data;
          this._projectPatch.next(Object.assign({}, this.projectPatchDataStore).projectPatches);
        }, error => console.log('Could not load projects.'));
    }

    createPatch(patch: Patch) {
        return this.http.post(this.projectPatchBaseUrl, JSON.stringify(patch), this.jt()).subscribe( (data:any) => {
            //this.projectPatchDataStore.projectPatches.push(data);
            this._projectPatch.next(Object.assign({}, this.projectPatchDataStore).projectPatches);
          }, error => console.log('Could not create Patch.'));
    }
    viewPatch(id){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/ticket-patch/'+id, this.jt()).pipe(map( (res:any) => res));
    }
    updateTicketPatch(patch: any, patch_id: number) {
        let data = JSON.stringify({
            name:patch.name
        });
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket-patch/'+patch_id, data, this.jt());
    }

    getAllMember(project_name:string) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+project_name+'?'+'members=all', this.jt()).pipe(map( (res:any) => res));
    }

    getAllMemberObs(project_name:string) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+project_name+'?'+'members=all', this.jt()).pipe(map( (res:any) => res.data));
    }

    getAllMemberFullList(project_name:string, filter_keyword:string = null) {
        let filter = '';
        if(filter_keyword){ filter = '&filter='+filter_keyword; }
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+project_name+'?'+'members=all&full=1'+filter, this.jt()).pipe(map( (res:any) => res));
    }

    getProject(id: any,origin:any = null) {
        let orgn = origin ? '?origin='+origin :'';
        
        return this.http.get(this.config.apiEndPoint()+'/api/v1/projects/'+id+orgn, this.jt()).pipe(map( (res:any) => res));
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

    isMember(project_name:any): Observable<any>{
        return this.http.get(this.config.apiEndPoint()+'/api/v1/project-auth-member?project='+project_name, this.jt()).pipe(
            map( (res:any) => {
                if(res.id){
                    this.setIsMember(true);
                    return res;
                } else {
                    this.setIsMember(false);
                    return ;
                }
                return res;
            })
            );
    }

    getProjectReport(project:any, start:any, end:any,auth_token:any){
        let params = '';
        let startDate = start ? '&start='+start :'';
        let endDate =   end ? '&end='+end :'';
        let projectname = project ? '?project='+project :'';
        let token = '&auth_token='+auth_token;
        params = projectname+ token + startDate + endDate;
        return this.http.get(this.config.apiEndPoint()+'/api/v1/project-report'+params, this.jt()).pipe(map( (res:any) => res));
    }

    createDownloadToken(ticket:any){
        let data:any = JSON.stringify({
            ticket_id:ticket.id,
            project_id:ticket.project_id
        });
        return this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-download-token', data,this.jt());
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