import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { MetaService } from '../service/meta.service';

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
    ticketStatusListLoading:boolean;
    ticketPatchListloading:boolean;
    ticketStatusList:any = [];
    ticketPatchList:any = [];
    ticketPatchListLength   =   0;
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
            private metaService: MetaService,
    ) { }

    ngOnInit() {
        this.ticketStatusListLoading = true;
        this.ticketPatchListloading = true;
        this.userService.client_slug.subscribe(res => this.auth_client = res);
        this.route.params.subscribe(params => {
            if (params['project_name'] !== undefined && params['project_name'] !== 'add' && params['project_name'] !== 'activity') {
                
                this.projectService.getProject(params['project_name']).subscribe( res => {
                    if(res.active_custom_status !== null){
                        if(res.active_custom_status.value && res.active_custom_status.value.value == 1){
                            this.metaService.getMeta( params['project_name'], 'project', 'custom_status').subscribe((custom_stat)=>{
                                let arr = [];
                                custom_stat.data.forEach(el => {
                                    arr.push(el.custom_status);
                                });
                                this.ticketStatusListLoading = false;
                                // console.log(arr);
                                arr = this.getCount(arr, res.tickets);
                                this.ticketStatusList = arr;
                                this.ticketStatusList.sort(function(a, b) {
                                    return a.order - b.order;
                                });
                                this.ticketOptionLoaded = true;
                            });
                        } else {
                            this.settingService.loadAllProjectStatus('');
                            this.settingService.statusSettings.subscribe( (statuses:any) =>{
                                let arr = statuses.data ? statuses.data : statuses;
                                this.ticketStatusListLoading = false;
                                arr = this.getCount(arr,res.tickets);
                                this.ticketStatusList = arr;
                                this.ticketStatusList.sort(function(a, b) {
                                    return a.order - b.order;
                                });
                                this.ticketOptionLoaded = true;
                              });
                        }
                    } else {
                        this.settingService.loadAllProjectStatus(params['project_name']);
                        this.settingService.statusSettings.subscribe( (statuses:any) =>{
                            // console.log('statuses', statuses);
                            let arr = statuses.data ? statuses.data : statuses;
                            this.ticketStatusListLoading = false;
                            arr = this.getCount(arr, res.tickets);
                            this.ticketStatusList = arr;
                            this.ticketStatusList.sort(function(a, b) {
                                return a.order - b.order;
                            });
                            this.ticketOptionLoaded = true;
                          });
                    }
                    // this.getCustomStatusMeta(params['project_name'], 'project', 'setting_active_custom_status');
                      this.projectService.loadAllPatches(params['project_name']);
                      this.ticketPatchList = this.projectService.projectsPatches;
                      this.projectService.projectsPatches.subscribe( (res:any) =>{
                        this.ticketPatchListloading = false;
                        this.ticketPatchList = res.data;
                        this.ticketPatchListLength = res.total;
                      });
                    if(res){
                        this.project = res;
                        this.tickets = this.project.tickets;
                    }
                });
            }
        });
    }

    getCustomStatusMeta(project, meta, subMeta){
        this.metaService.getMeta(project, meta, subMeta).subscribe((res)=>{
            
            if(res.data){
                // console.log(res.data);
                // Get Custom Statuses
               
            }
        });
    }

    calculateCompletionRate(patch_id:number, index:number){
        var rate =  0;
        var count = 0;
        var completedTickets = 0; 
        if(this.ticketPatchList[index].tickets){
            for(var i=0;i < this.ticketPatchList[index].tickets.length; i++){
                if(this.ticketPatchList[index].tickets[i].status_id == 5){
                    completedTickets++;
                }
            }
            count = completedTickets;
            rate = completedTickets > 0 ? (completedTickets*100)/this.ticketPatchList[index].tickets.length : 0;
        }
        return rate;
    }
    goToFilterTicket(filter:any){
        this.router.navigate([ '/'+this.auth_client+'/admin/projects/',this.project.slug,'tickets', 'filter',filter]);
        return false;
    }


    showPatch(patch_id:number){
        this.router.navigate([ '/'+this.auth_client+'/admin/projects/', this.project.slug,'patches', patch_id], {state:{ is_page: true }});
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
