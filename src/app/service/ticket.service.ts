import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject, forkJoin } from 'rxjs';
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
    getProjectTicketAll(project_name: string, page:number = 1, per_page:number = 25){
        var page_num = '';
        var per_page_num = '';
        if(page != 1){
            page_num = '&page='+page;
        }
        if(per_page != 25){
            per_page_num = '&per_page='+per_page;
        }
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets?project='+project_name+page_num+per_page_num, this.jt()).pipe(map( (res:any) => res));
    }
    getProjectTicketFilter(project_name: string, filter: string){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets?project='+project_name+'&filter=1&status='+filter, this.jt()).pipe(map( (res:any) => res));
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

    update(ticket: any, type:string = 'all', customData:any = null):any {
        let data = JSON.stringify({
            status_id:ticket.status_id
        });
        if(type == 'status'){
            data = JSON.stringify({
                status_id:ticket.status_id
            });
        }
        if(type == 'priority'){
            data = JSON.stringify({
                priority_id:customData.id
            });
        }
        return this.http.put(this.config.apiEndPoint()+'/api/v1/tickets/'+ticket.id, data, this.jt());
    }

    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/tickets/'+id, this.jt());
    }
    // Mention
    mentionUser(mentionedUser:any, ticket_id:number){
        var mention:{
            email:string,
            first_name:string,
            last_name:string,
            user_id:number
            ticket_id:number
        };
        let ticketID = ticket_id;
        let mentions = [];
        mentionedUser.forEach(obj => {
            mention = {
                email: obj.email,
                first_name:obj.first_name,
                last_name:obj.last_name,
                user_id :obj.user_id,
                ticket_id:ticketID
            };
            mentions.push(this.http.post(this.config.apiEndPoint()+'/api/v1/tickets-mention-users', mention, this.jt()));
        });
        return forkJoin(mentions);
    }
    addTaggedUser(assigned_members: any) {
        let tag:{
            ticket_id:number,
            user_id:number
        };
        let https = [];
        assigned_members.forEach(obj => {
            console.log(obj,'assigned members from service.');
            tag = {
                ticket_id: obj.ticket_id,
                user_id :obj.user_id,
            };

            https.push(this.http.post(this.config.apiEndPoint()+'/api/v1/tickets-tag-users', tag, this.jt()));
        });
        return forkJoin(https);
    }

    addAssignees(assignees: any) {
        let tag:{
            ticket_id:number,
            user_id:number,
            project_id:number
        };
        let https = [];
        assignees.forEach(obj => {
            console.log(obj,'member to be tagged from service.');
            tag = {
                ticket_id: obj.ticket_id,
                user_id :obj.user_id,
                project_id :obj.project_id
            };

            https.push(this.http.post(this.config.apiEndPoint()+'/api/v1/tickets-assign-users', tag, this.jt()));
        });
        return forkJoin(https);
    }


    removeTag(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/tickets-tag-users/'+id, this.jt());
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