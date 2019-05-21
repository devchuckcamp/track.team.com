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
            if (params['project_name'] !== undefined && params['project_name'] !== 'add') {
                this.projectService.getProject(params['project_name']).subscribe( res => {
                    
                    if(res){
                        this.project = res;
                        this.tickets = this.project.tickets;
                        this.openTickets = this.tickets.filter(book => book.status_id == 1);
                        this.inProgressTickets = this.tickets.filter(book => book.status_id == 2);
                        this.completedTickets = this.tickets.filter(book => book.status_id == 5);

                        console.log( this.openTickets,' this.openTickets');
                        console.log( this.inProgressTickets,' this.inProgressTickets');
                        console.log( this.completedTickets,' this.completedTickets');

                    }
                });
            }
        });
    }

}
