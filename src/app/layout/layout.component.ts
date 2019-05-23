import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import Chart from 'chart.js';
import { BreadcrumbComponent } from '../layout/component/breadcrumb.component';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { User } from '../model/user';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  avatar:any;
  @ViewChild("chart")
  public refChart: ElementRef;
  public chartData: any;
  public authUser:User;
  private viewInfoRoute : string;
  settings:any[] = [];
  subscription:Subscription;
  activeURL: string;
  admin_sub_1: string;
  admin_sub_2: string;
  admin_project_sub: string;
  profile:any;
  breadcrumb:any;
  projectsList:any[] =[];
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService,
    private settingService:SettingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
      // Settings
      this.settingService.loadAll();
      this.admin_sub_1 = "";
      this.admin_sub_2 = "";
      this.admin_project_sub = "";
      this.router.events.subscribe(path =>{
      this.profile = this.authService.getAuthUser();
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
          this.breadcrumb = slug_list;
          let isSubRoute = (this.activeURL.match(/\//g) || []).length;
          if(slug_list.includes("projects") || slug_list[2] == 'projects'){
            this.admin_sub_1 = "projects";
            this.admin_sub_2 =  slug_list[3];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }

          if(slug_list.includes("profile") || slug_list[2] == 'profile'){
            this.admin_sub_1 = "profile";
            this.admin_sub_2 =  slug_list[3];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }
        }
      });

    }
  ngOnInit() {
    this.settingService.settings.subscribe( (res:any) => {
      this.settings = res;
      console.log(res);
    });

    this.avatar = localStorage.getItem('avatar');
    // this.projectService.getAllProjects().subscribe( res =>{
    //   let list = res;
    //   this.projectsList = list;
    // });
    this.projectService.loadAll();
        this.projectService.projects.subscribe( (res:any) => {
          this.projectsList = res;
        });
  }

  ngAfterViewInit() {
  }

}