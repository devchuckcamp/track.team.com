import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
// import Chart from 'chart.js';
import { BreadcrumbComponent } from '../layout/component/breadcrumb.component';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { MenuService } from '../service/menu.service';
import { User } from '../model/user';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {
  avatar:any;
  auth_client:any;
  // @ViewChild("chart")
  // public refChart: ElementRef;
  // public chartData: any;
  public authUser:User;
  private viewInfoRoute : string;
  settings:any[] = [];
  subscription:Subscription;
  activeURL: string;
  admin_sub_1: string;
  admin_sub_2: string;
  admin_project_sub: string;
  auth_user:any;
  profile:any;
  breadcrumb:any;
  projectsList:any[] =[];
  currentSideBarMenu:number;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService,
    private settingService:SettingService,
    private menuService:MenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
      this.setClient();
      // Settings
      this.settingService.loadAll();
      this.settingService.loadAllProjectStatus('');
      this.settingService.loadAllTicketCategory();
      this.profile = this.authService.getAuthUser();
      this.admin_sub_1 = "";
      this.admin_sub_2 = "";
      this.admin_project_sub = "";
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
          let slug_list = [];
          slug_list = this.activeURL.split('/');
          if(slug_list.includes("comment") || slug_list[7] == 'comment'){
            delete slug_list[7];
            delete slug_list[8];
            slug_list.splice(-2,2);
            slug_list = slug_list;
        
            slug_list = slug_list;
          }
          // console.log('slug_list', slug_list);
          this.breadcrumb = slug_list;
          let isSubRoute = (this.activeURL.match(/\//g) || []).length;
          if(slug_list.includes("projects") || slug_list[3] == 'projects'){
            this.admin_sub_1 = "projects";
            this.admin_sub_2 =  slug_list[4];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }

          if(slug_list.includes("profile") || slug_list[2] == 'profile'){
            this.admin_sub_1 = "profile";
            this.admin_sub_2 =  slug_list[4];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }

          if(slug_list.includes("activity") || slug_list[3] == 'activity'){
            this.admin_sub_1 = "activity";
            this.admin_sub_2 =  slug_list[4];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }

          if(slug_list.includes("reports") || slug_list[3] == 'reports'){
            this.admin_sub_1 = "reports";
            this.admin_sub_2 =  slug_list[4];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }
        }
        
      });
      this.setUser();
      this.setSideBarStatus();
    }
  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['filter'];

    this.settingService.settings.subscribe( (res:any) => {
      this.settings = res;
    });
    
    this.avatar = localStorage.getItem('avatar');
    this.auth_client = localStorage.getItem('client');
    // this.projectService.getAllProjects().subscribe( res =>{
    //   let list = res;
    //   this.projectsList = list;
    // });
    this.projectService.loadAll();
        this.projectService.projects.subscribe( (res:any) => {
          this.projectsList = res;
        });
  }
  setUser():void {
    this.subscription = this.userService.currentLoggedInUser.subscribe( (res:any) => { this.auth_user = res; });
}
  ngAfterViewInit() {
  }

  setClient():void {
    this.subscription = this.userService.currentClient.subscribe(client => { this.auth_client = client;  });
  }

  setSideBarStatus():void {
    this.subscription = this.menuService.currentSideBarMenu.subscribe( (res:any) => { this.currentSideBarMenu = res; });
  }

  getSidebarMenuStatus(){
      const active=this.currentSideBarMenu ==1;
      return {'col-lg-10 offset-lg-2  col-md-10 offset-md-2':active, 'max-main-content':!active };
  }

  toggle(){
    const active=this.currentSideBarMenu ==1;
    return {'col-lg-10 offset-lg-2 offset-md-1':active, 'col-lg-11 offset-lg-1':!active };
  }

}