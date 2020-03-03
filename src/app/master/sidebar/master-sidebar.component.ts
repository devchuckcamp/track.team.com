import { Component, OnInit, OnDestroy, Input, AfterViewInit  } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';
import { UserService } from '../../service/user.service';
import { Observable, Subscription  } from 'rxjs';

@Component({
    selector: 'app-master-sidebar',
    templateUrl: './master-sidebar.component.html',
    styleUrls: ['../master.component.scss']
})
export class MasterSidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input('project_name') project_name:string;
    @Input('admin_project_sub') admin_project_sub:string;
    @Input('auth_profile') auth_profile:any;
    // @Input('auth_client') auth_client:any;

    subscription:Subscription;
    user_avatar:string;
    auth_client_info:any;
    auth_user:any;
    default_avatar = '../../assets/default-profile.png';
    active_menu:string;
    project:Project;
    profile:any;
    activeURL: string;
    admin_sub_1: string;
    admin_sub_2: string;
    admin_sub_3:    string;
    onload_slug_list: any;
    is_dashboard:boolean;
    constructor(
            private http: HttpClient,
            public router: Router,
            private route: ActivatedRoute,
            private projectService: ProjectService,
            private userService:UserService,
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
        console.log(this.activeURL,'activeURL');
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
        if(slug_list.length<5){
            this.is_dashboard = false;
        } else {
            this.is_dashboard = true;
        }
    }

    ngOnInit() {
        this.setUser();
        this.setAvatar();
        this.setClientInfo();
        this.route.params.subscribe(params => {
            this.router.events.subscribe(path =>{
                if(path instanceof NavigationEnd ){
                    this.createUrlVariables(path);
                }
            });
        });
    }

    ngOnDestroy(){
        this.project = {
            id:null,
            name:'',
            slug:'',
            tickets:[]
        };
    }
    ngAfterViewInit(){
    }

    getAllProject(){
        this.projectService.getAll().subscribe( res => {
            if(res){
                this.project = res;
            }
        });
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

        if(slug_list.length<4){
            this.is_dashboard = false;
        } else {
            this.is_dashboard = true;
        }
        if( (!slug_list.includes("add") && !slug_list.includes("activity") ) && (slug_list.includes("clients") || slug_list[3] == 'clients') ){
            this.admin_sub_1 = "clients";
            this.admin_sub_2 =  slug_list[4];
            this.admin_project_sub =  slug_list[slug_list.length-1];
            this.project_name = this.admin_project_sub;
            this.getAllProject();
        }
        if(slug_list[3] == 'clients' && slug_list[5] == 'tickets'){
            this.admin_project_sub =  'tickets';
            this.admin_sub_3 =  'tickets';
        }
        if(slug_list[slug_list.length-1] !== this.admin_project_sub){
            this.is_dashboard = false;
        }
        if(slug_list[3] == 'clients' && slug_list[5] == 'members'){
            this.is_dashboard = false;
            this.admin_project_sub =  'members';
            this.admin_sub_3 =  'members';
        }
        if(slug_list[3] == 'clients' && slug_list[5] == 'activity'){
            this.is_dashboard = false;
            this.admin_project_sub =  'activity';
            this.admin_sub_3 =  'activity';
        }
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

}
