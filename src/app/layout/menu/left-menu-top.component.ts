import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../../service/project.service';
import { UserService } from '../../service/user.service';
import { Project } from '../../model/project';
import { Observable, Subscription  } from 'rxjs';

@Component({
    selector: 'app-left-menu-top',
    templateUrl: './left-menu-top.component.html',
    styleUrls: ['../layout.component.scss']
})
export class LeftMenuTopComponent implements OnInit, AfterViewInit {
    @Input('project_name') project_name:string;
    @Input('admin_project_sub') admin_project_sub:string;
    @Input('auth_profile') auth_profile:any;
    @Input('auth_client') auth_client:any;
    active_menu:string;
    auth_user:any;
    project:Project;
    profile:any;
    activeURL: string;
    admin_sub_1: string;
    admin_sub_2: string;
    admin_sub_3:    string;
    onload_slug_list: any;
    is_dashboard:boolean;
    user_avatar:string;
    auth_client_info:any;
    subscription:Subscription;
    default_avatar = '../../assets/default-profile.png';
    constructor(
            private http: HttpClient,
            public router: Router,
            private route: ActivatedRoute,
            private projectService: ProjectService,
            private userService:UserService
    ) { 
        
        this.admin_sub_3 = '';
        this.active_menu = this.admin_project_sub;
        this.onload_slug_list = [];
        this.is_dashboard = true;
        let currentURL = window.location.pathname;
        //Get Params
        let indexActUrlParam = currentURL.indexOf("?");
        //Get the exact active route
        let indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam );
        //Assign to our private activeUrl
        this.activeURL = indexActUrl;
        let slug_list = this.activeURL.split('/');
        let isSubRoute = (this.activeURL.match(/\//g) || []).length;
        this.onload_slug_list = slug_list;
        this.admin_project_sub =  slug_list[slug_list.length-1];
        this.admin_sub_3 = this.admin_project_sub;
        this.project = {
            id:null,
            name:'',
            slug:'',
            tickets:[]
        };
        if(slug_list.length>=4){
            this.is_dashboard = false;
        } else {
            this.is_dashboard = true;
        }
        if( (!slug_list.includes("activity") || !slug_list.includes("add")) && slug_list.includes("projects") || slug_list[3] == 'projects'){
            this.admin_sub_1 = "projects";
            this.admin_sub_2 =  slug_list[4];
            this.admin_project_sub =  slug_list[slug_list.length-1];
            this.project_name = this.admin_project_sub;
        }
        if(slug_list[3] == 'projects' && slug_list[5] == 'tickets'){
            this.admin_project_sub =  'tickets';
            this.admin_sub_3 =  'tickets';
        }
        if(slug_list[slug_list.length-1] !== this.admin_project_sub){
            this.is_dashboard = false;
        }
        if(slug_list[3] == 'projects' && slug_list[5] == 'members'){
            this.is_dashboard = false;
            this.admin_project_sub =  'members';
            this.admin_sub_3 =  'members';
        }

        if(slug_list[3] == 'profile'){
            this.is_dashboard = true;
            this.admin_project_sub =  'members';
            this.admin_sub_3 =  'members';
        }

        if(slug_list[3] == 'activity'){
            this.is_dashboard = false;
            this.admin_project_sub =  'activity';
            this.admin_sub_3 =  'activity';
        }
    }

    ngOnInit() {
        this.setUser();
        this.setAvatar();
        this.setClientInfo();
        this.router.events.subscribe(path =>{
            if(path instanceof NavigationEnd ){
                this.createUrlVariables(path);
            }
        });
    }
    setUser():void {
        this.subscription = this.userService.currentLoggedInUser.subscribe( (res:any) => { this.auth_user = JSON.parse(res); });
    }
    setAvatar():void {
        this.subscription = this.userService.currentAvatar.subscribe(avatar => { this.user_avatar = avatar;  });
    }
    setClientInfo():void {
        this.subscription = this.userService.currentClientInfo.subscribe(client_info => { this.auth_client_info = JSON.parse(client_info);  });
    }
    ngAfterViewInit(){
        // this.router.events.subscribe(path =>{
        //     if(path instanceof NavigationEnd ){
        //         this.createUrlVariables(path);
        //     }
        // });
    }

    createUrlVariables(path:any){
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
        this.onload_slug_list = slug_list;
        this.admin_project_sub =  slug_list[slug_list.length-1];
        this.admin_sub_3 = this.admin_project_sub;
        if(slug_list.length>=4){
            this.is_dashboard = false;
        } else {
            this.is_dashboard = true;
        }
        if((!slug_list.includes("activity") || !slug_list.includes("add")) && slug_list.includes("projects") || slug_list[3] == 'projects'){
            this.admin_sub_1 = "projects";
            this.admin_sub_2 =  slug_list[4];
            this.admin_project_sub =  slug_list[slug_list.length-1];
            this.project_name = this.admin_project_sub;
        }
        if(slug_list[3] == 'projects' && slug_list[5] == 'tickets'){
            this.admin_project_sub =  'tickets';
            this.admin_sub_3 =  'tickets';
        }
        if(slug_list[slug_list.length-1] !== this.admin_project_sub){
            this.is_dashboard = false;
        }
        if(slug_list[3] == 'projects' && slug_list[5] == 'members'){
            this.is_dashboard = false;
            this.admin_project_sub =  'members';
            this.admin_sub_3 =  'members';
        }

        if(slug_list[3] == 'activity'){
            this.is_dashboard = false;
            this.admin_project_sub =  'activity';
            this.admin_sub_3 =  'activity';
        }
    }

}