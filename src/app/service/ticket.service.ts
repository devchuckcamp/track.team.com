import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, BehaviorSubject, throwError, Subject, forkJoin } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Ticket } from '../model/ticket';
import { GlobalRoutesService } from '../config/config';
class TicketCategory{
    name:string;
}

class TicketStatus{
    name:string;
}
@Injectable({ providedIn: 'root' })
export class TicketService {
    apiEndpoint:string;
    Bearer:any;
    // Ticket Category List
    ticketsCategory: Observable<TicketCategory[]>
    _ticketsCategory: BehaviorSubject<TicketCategory[]>;
    ticketsCategoryStore: {
        ticketsCategory: any[]
    };
    TicketsCategoryList: TicketCategory[]= [];

    ticketStatus: Observable<TicketStatus[]>
    _ticketStatus: BehaviorSubject<TicketStatus[]>;
    ticketStatusStore: {
        ticketStatus: any[]
    };
    ticketStatusList: TicketStatus[]= [];

    

    constructor(
        private config: GlobalRoutesService,
        private http: HttpClient,
        ) {

            this.apiEndpoint = this.config.apiEndPoint();
            // Ticket Categories
            this.ticketsCategoryStore = { ticketsCategory: [] };
            this._ticketsCategory = <BehaviorSubject<TicketCategory[]>>new BehaviorSubject([]);
            this.ticketsCategory = this._ticketsCategory.asObservable();

            // Ticket Statuses
            this.ticketStatusStore = { ticketStatus: [] };
            this._ticketStatus = <BehaviorSubject<TicketStatus[]>>new BehaviorSubject([]);
            this.ticketStatus = this._ticketStatus.asObservable();


            if(localStorage.getItem("currentUser")){
                this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
            }
        }

    getAll() {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets', this.jt()).pipe(map( (res:any) => res));
    }
    loadAllTicketStatuses(client:any){
        this.http.get(this.config.apiEndPoint()+'/api/v1/ticket_statuses?client='+client, this.jt()).subscribe( (data :any)=> {
            this.ticketStatusStore.ticketStatus = data;
            this._ticketStatus.next(Object.assign({}, this.ticketStatusStore).ticketStatus);
          }, error => console.log('Could not load Categories.'));
    }
    loadAllTicketCategory(client:any) {
        this.http.get(this.config.apiEndPoint()+'/api/v1/ticket-category?client='+client, this.jt()).subscribe( (data :any)=> {
          this.ticketsCategoryStore.ticketsCategory = data;
          this._ticketsCategory.next(Object.assign({}, this.ticketsCategoryStore).ticketsCategory);
        }, error => console.log('Could not load Categories.'));
    }
    getProjectTicketAll(project_name: string, page:number = 1, per_page:number = 25, filter:any = ''){
        var page_num = '';
        var per_page_num = '';
        var filter_by = '';
        if(page != 1){
            page_num = '&page='+page;
        }
        if(per_page != 25){
            per_page_num = '&per_page='+per_page;
        }

        if(filter !== ''){
            filter_by = '&filter_by='+filter;
        }
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets?project='+project_name+page_num+per_page_num+filter_by, this.jt()).pipe(map( (res:any) => res));
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
        if(type == 'category'){
            data = JSON.stringify({
                category_id:customData.id
            });
        }
        return this.http.put(this.config.apiEndPoint()+'/api/v1/tickets/'+ticket.id, data, this.jt());
    }

    updateOrder(ticket_1: any, ticket_2:any):any {
        let data = JSON.stringify({
            swap:1,
            ticket_lead:ticket_1.id,
            ticket_trail:ticket_2.id,
        });

        return this.http.put(this.config.apiEndPoint()+'/api/v1/tickets/'+ticket_1.id, data, this.jt());
    }
    reOrderTickets(project_id:number){
        let data = {};
        data = { project_id:project_id }
        let datas:any = JSON.stringify(data);
        return this.http.put(this.config.apiEndPoint()+'/api/v1/tickets-reorder', datas, this.jt());
    }
    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/api/v1/tickets/'+id, this.jt());
    }
    createBilling(ticket:any, isNew:boolean = false){
        ticket.new = isNew;
        return this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-time-billables',ticket, this.jt());
    }
    startBilling(ticket_id:number, time:any){
        let data = {};
        data = { time:time, started: 1, stopped: 0 }
        let datas:any = JSON.stringify(data);
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket-time-billables/'+ticket_id, datas, this.jt());
    }

    stopBilling(ticket:any, time:any):any{
        let data = {};
        data = { time:time, started: 0, stopped: 1 }
        let datas:any = JSON.stringify(data);
        return this.http.put(this.config.apiEndPoint()+'/api/v1/ticket-time-billables/'+ticket.id, datas, this.jt());
    }
    //Filter Ticket
    filterTicketByKeyword(project_name:string, page:number, per_page:number,keyword_filter:string = '', statusFilter:any= null){
        var page_num = '';
        var per_page_num = '';
        var keyword = '';
        var status:any = '';
        if(page){
            page_num = '&page='+page;
        }
        if(per_page){
            per_page_num = '&per_page='+per_page;
        }

        if(keyword_filter !== ''){
            keyword = '&keyword='+keyword_filter;
        }

        if(statusFilter){
            status = '&status_filter='+statusFilter;
        }
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets?project='+project_name+page_num+per_page_num+keyword+status, this.jt()).pipe(map( (res:any) => res));
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


    // Report
    getTicketBillReport(id: number, token:any = '') {
        let auth_token = '&token='+token;
        let report = 'report='+id;
        let param = auth_token+report;
        return this.http.get(this.config.apiEndPoint()+'/api/v1/ticket-time-billables-report'+param, this.fileHeader());
    }
    
    createDownloadToken(ticket:any){
        let data:any = JSON.stringify({
            ticket_id:ticket.id,
            project_id:ticket.project_id
        });
        return this.http.post(this.config.apiEndPoint()+'/api/v1/ticket-download-token', data,this.jt());
    }

    private fileHeader() {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.Bearer,
            'Content-Type':  'multipart/form-data;',
            'enctype': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Allow_Headers': ' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow': 'GET,POST,PUT,DELETE,OPTION'
        })
        let options = { headers: headers };
        return options;
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