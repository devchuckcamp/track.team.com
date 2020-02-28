import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Ticket } from '../model/ticket';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class ActivityService {
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

    getAll(page_number:number =1, per_page:number = 25) {
        let page =  '';
        let perPage =   '';
        page = '?page='+page_number;
        perPage = '&per_page='+per_page;
        return this.http.get(this.config.apiEndPoint()+'/api/v1/activity'+page+perPage, this.jt()).pipe(map( (res:any) => res));
    }
    getProjectAllActivity(project_name: string, page_number:number  = 1, per_page:number = 25){
        let page =  '';
        let perPage = '';
        page = '&page='+page_number;
        perPage = '&per_page='+per_page;
        return this.http.get(this.config.apiEndPoint()+'/api/v1/activity?project='+project_name+page+perPage, this.jt()).pipe(map( (res:any) => res));
    }
    getProjectTicket(project_name: string = '',ticket_id:number){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets/'+ticket_id+'?project='+project_name, this.jt()).pipe(map( (res:any) => res));
    }
    getTicket(id: number) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets/'+id, this.jt()).pipe(map( (res:any) => res));
    }

    searchMember(term:string){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/users/?search=1&term='+term, this.jt()).pipe(map( (res:any) => res));
    }

    save(member: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/projects/members', member, this.jt());
    }

    update(ticket: Ticket) {
        return this.http.put(this.config.apiEndPoint()+'/api/v1/tickets/ticket.id', ticket);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/users/'+id, this.jt());
    }

    removeUserFromProject(user_id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/projects/members/'+user_id, this.jt());
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