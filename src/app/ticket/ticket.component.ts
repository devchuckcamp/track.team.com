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

    constructor(
        private ticketService: TicketService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['project_name'] !== undefined) {
                console.log(params['project_name'],'project name');
                this.ticketService.getProjectTicketAll(params['project_name']).subscribe( res => {
                    console.log(res);
                    this.tickets = res.data;
                });
            } else {

            }
        });
    }

}
