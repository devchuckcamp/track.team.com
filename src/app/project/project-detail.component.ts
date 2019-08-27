import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { UserService } from '../service/user.service';

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
    ticketOptionLoaded:boolean;
    ticketStatusList:any = [];
    onQaTickets:number;
    onTestingTickets:number;
    auth_client:any;
    constructor(
            private http: HttpClient,
            public router: Router,
            private route: ActivatedRoute,
            private projectService: ProjectService,
            private userService:UserService,
            private settingService:SettingService,
    ) { }

    ngOnInit() {
        this.userService.client_slug.subscribe(res => this.auth_client = res);
        this.route.params.subscribe(params => {
            if (params['project_name'] !== undefined && params['project_name'] !== 'add' && params['project_name'] !== 'activity') {
                this.projectService.getProject(params['project_name']).subscribe( res => {
                    this.settingService.statusSettings.subscribe( (statuses:any) =>{
                        let arr = statuses;
                        arr = this.getCount(arr,res.tickets);
                        console.log(arr, "arr");
                        this.ticketStatusList = arr;

                        this.ticketOptionLoaded = true;
                      });
                    if(res){
                        this.project = res;
                        this.tickets = this.project.tickets;
                    }
                });
            }
        });
    }

    goToFilterTicket(filter:any){
        this.router.navigate([ '/'+this.auth_client+'/admin/projects/',this.project.slug,'tickets', 'filter',filter]);
        return false;
    }

    getCount(arr:any, tickets:any){
        arr.map( (e:any, index:number) => {
            let slug = e.name.replace(" ","-").toLowerCase();
            slug.replace("--","-").toLowerCase();
            e.slug = slug;
            e.count = tickets.filter(ticket => ticket.status_id == e.id);
            return e;
        });
        return arr;
    }
}
