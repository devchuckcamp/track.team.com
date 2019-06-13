import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';

@Component({
    selector: 'app-master-breadcrumb',
    templateUrl: './master-breadcrumb.component.html',
    styleUrls: ['../master.component.scss']
})
export class MasterBreadcrumbComponent implements OnInit {
    @Input('slug_list') breadcrumbs:any;
    @Input('auth_client') auth_client:any;
    @Input('admin_project_sub') admin_project_sub:string;
    @Input('project_name') project_name:string;

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
                this.breadcrumbs = slug_list;
                console.log(slug_list);
            }
        });
    }

    getRouterLink(index:number){
        // if(index == 0)  return '/'+this.auth_client;
        if(index == 0 || index == 1 )  return '/'+'/master';
        if(index == 2) return ''+this.breadcrumbs[index];
        if(index == 3) return this.breadcrumbs[2]+'/'+this.breadcrumbs[index];
        if(index == 4) return this.breadcrumbs[2]+'/'+this.breadcrumbs[3]+'/'+this.breadcrumbs[index];
        if(index == 5) return this.breadcrumbs[2]+'/'+this.breadcrumbs[3]+'/'+this.breadcrumbs[4]+'/'+this.breadcrumbs[index];
        if(index == 6) return this.breadcrumbs[2]+'/'+this.breadcrumbs[3]+'/'+this.breadcrumbs[4]+'/'+this.breadcrumbs[5]+'/'+this.breadcrumbs[index];
    }
}
