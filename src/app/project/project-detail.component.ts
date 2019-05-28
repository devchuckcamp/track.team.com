import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectDetailComponent implements OnInit {
    project:Project;
    tickets:any;
    openTickets:number;
    inProgressTickets:number;
    completedTickets:number;

    constructor(
            private http: HttpClient,
            public router: Router,
            private route: ActivatedRoute,
            private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['project_name'] !== undefined && params['project_name'] !== 'add' && params['project_name'] !== 'activity') {
                this.projectService.getProject(params['project_name']).subscribe( res => {

                    if(res){
                        this.project = res;
                        this.tickets = this.project.tickets;
                        this.openTickets = this.tickets.filter(ticket => ticket.status_id == 1);
                        this.inProgressTickets = this.tickets.filter(ticket => ticket.status_id == 2);
                        this.completedTickets = this.tickets.filter(ticket => ticket.status_id == 5);

                    }
                });
            }
        });
    }

    goToFilterTicket(filter:any){
        console.log(filter);
        this.router.navigate([ 'admin/projects/',this.project.slug,'tickets', 'filter',filter]);
        return false;
    }

}
