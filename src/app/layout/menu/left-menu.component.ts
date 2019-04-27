import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';


@Component({
    selector: 'app-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['../layout.component.scss']
})
export class LeftMenuComponent implements OnInit, AfterViewInit {
    @Input('project_name') project_name:string;
    @Input('admin_project_sub') admin_project_sub:string;
    active_menu:string;
    project:Project;
    activeURL: string;
    admin_sub_1: string;
    admin_sub_2: string;

    constructor(
            private http: HttpClient,
            public router: Router,
            private route: ActivatedRoute,
            private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.active_menu = this.admin_project_sub;
        this.route.params.subscribe(params => {
            console.log(this.project_name,'project_name');
            if (params['project_name'] !== undefined || this.project_name !== '') {
                let project_name = this.project_name ? this.project_name : params['project_name'];
                this.getAllProject(project_name);
            }
        });

        //
        this.router.events.subscribe(path =>{

            if(path instanceof NavigationEnd ){
              //Get Url
              let currentURL = path.url;
              //Get Params
              let indexActUrlParam = currentURL.indexOf("?");
              //Get the exact active route
              let indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam );
              //Assign to our private activeUrl
              this.activeURL = indexActUrl;

              let slug_list = this.activeURL.split('/');
              let isSubRoute = (this.activeURL.match(/\//g) || []).length;

              if(slug_list.includes("projects") || slug_list[2] == 'projects'){
                this.admin_sub_1 = "projects";
                this.admin_sub_2 =  slug_list[3];
                this.admin_project_sub =  slug_list[slug_list.length-1];
                this.project_name = this.admin_project_sub;
                this.getAllProject(this.admin_sub_2);
                console.log(this.admin_project_sub, 'slug_list 2');
              }
            }
        });
    }

    ngAfterViewInit(){
        console.log(this.admin_project_sub,'active_menu');
    }

    getAllProject(project_name:any){
        this.projectService.getProject(project_name).subscribe( res => {
            if(res){
                this.project = res;
            }
        });
    }

}
