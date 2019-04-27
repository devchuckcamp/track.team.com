import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
    tickets: Ticket[] = [];
    ticket: any;
    project_name:string;
    loggedin_user:string;

    constructor(
        private ticketService: TicketService,
        private router: Router,
        private route: ActivatedRoute,
    ) { 
        this.loggedin_user = "Admin";
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['project_name'] !== undefined) {
                this.project_name = params['project_name'];

                this.ticketService.getProjectTicketAll(params['project_name']).subscribe( res => {
                    console.log(res.data);
                    this.tickets = res.data;
                });
            } else {

            }
        });
    }

    viewTicket(ticket){
        console.log(ticket);
        this.ticket = ticket;
        return false;
    }

}
