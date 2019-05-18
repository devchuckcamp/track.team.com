import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { ProjectService } from '../service/project.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ThreadService } from '../service/thread.service';
import { TicketService } from '../service/ticket.service';
import { MemberService } from '../service/member.service';
import { Project } from '../model/project';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy  {
  activeURL:string;
  parentUrl:string;
  user_avatar:string;
  subscription: Subscription;

  projects: Project[] = [];
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private authService:AuthService,
    private userService:UserService,
    private ticketService:TicketService,
    private threadService:ThreadService,
    private memberService:MemberService,
  ) {
    if(!this.user_avatar){
      this.user_avatar = localStorage.getItem('avatar');
    }
    this.setAvatar();

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
        } else {
          this.parentUrl = "";
        }
      }
    });
  }

  ngOnInit() {
    this.userService.currentAvatar.subscribe(avatar => {
      this.user_avatar = avatar;
    });
    this.projectService.getAll().subscribe(res=>{
      if(res){
        this.projects = res.data;
      }
    });
  }
  ngOnDestroy(){
    this.userService.clearAvatar();
  }

  setAvatar():void {
    this.subscription = this.userService.currentAvatar.subscribe(avatar => { this.user_avatar = avatar;  });
  }
  logout(){
    localStorage.clear();
    this.authService.Bearer = '';
    this.userService.Bearer = '';
    this.projectService.Bearer = '';
    this.threadService.Bearer = '';
    this.ticketService.Bearer = '';
    this.memberService.Bearer = '';
    // this.router.navigate(['/login'] );
    window.location.href='/login'
    return false;
  }

}
