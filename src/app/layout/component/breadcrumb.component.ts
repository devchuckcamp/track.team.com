import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['../layout.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    @Input('slug_list') breadcrumbs:any;
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
            }
        });
    }

    getRouterLink(index:number){
        if(index == 1 || index == 0)  return '/admin';
        if(index == 2) return '/admin/'+this.breadcrumbs[index];
        if(index == 3) return '/admin/projects/'+this.project_name;
        if(index == 4) return '/admin/projects/'+this.project_name+'/'+this.breadcrumbs[index];
        if(index == 5) return '/admin/projects/'+this.project_name+'/'+this.breadcrumbs[4]+'/'+this.breadcrumbs[index];
    }
}
