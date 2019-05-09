import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Ticket } from '../model/ticket';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class TicketService {
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

    getAll() {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets', this.jt()).pipe(map( (res:any) => res));
    }
    getProjectTicketAll(project_name: string){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets?project='+project_name, this.jt()).pipe(map( (res:any) => res));
    }
    getProjectTicket(project_name: string = '',ticket_id:number){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets/'+ticket_id+'?project='+project_name, this.jt()).pipe(map( (res:any) => res));
    }
    getTicket(id: number) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets/'+id, this.jt()).pipe(map( (res:any) => res));
    }

    save(ticket: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/tickets', ticket, this.jt());
    }

    update(ticket: any, type:string = 'all'):any {
        let data = JSON.stringify({
            status_id:ticket.status_id
        });
        if(type == 'status'){
            data = JSON.stringify({
                status_id:ticket.status_id
            });
        }
        return this.http.put(this.config.apiEndPoint()+'/api/v1/tickets/'+ticket.id, data, this.jt());
    }

    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/tickets/'+id, this.jt());
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