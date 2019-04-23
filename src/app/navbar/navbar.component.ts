import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { ProjectService } from '../service/project.service';


import { Project } from '../model/project';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeURL:string;
  parentUrl:string;
  projects: Project[] = [];
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    this.router.events.subscribe(path =>{

      if(path instanceof NavigationEnd ){
        //Get Url
        let currentURL = path.url;
        //Get Params
        let indexActUrlParam = currentURL.indexOf("?");
        //Get the exact active route
        let indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam);
        //Assign to our private activeUrl
        this.activeURL = indexActUrl;
        let slug_list = this.activeURL.split('/');
        let isSubRoute = (this.activeURL.match(/\//g) || []).length;

        if(slug_list.includes("projects")){
          this.parentUrl = "projects";
        } else if(slug_list.includes("tickets")){
          this.parentUrl = "tickets";
        } else if(slug_list.includes("users")){
          this.parentUrl = "users";
        }else if(slug_list.includes("user-role")){
          this.parentUrl = "user-role";
        } else if(slug_list.includes("log")){
          this.parentUrl = "log";
        }
      }
    });
  }

  ngOnInit() {
    this.projectService.getAll().subscribe(res=>{
      
      if(res){
        this.projects = res.data;
      }
      
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'] );
    return false;
  }

}
