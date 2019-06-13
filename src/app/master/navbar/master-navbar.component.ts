import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { ProjectService } from '../../service/project.service';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { ThreadService } from '../../service/thread.service';
import { TicketService } from '../../service/ticket.service';
import { MemberService } from '../../service/member.service';
import { ClientService } from '../../service/client.service';
import { Project } from '../../model/project';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-master-navbar',
  templateUrl: './master-navbar.component.html',
  styleUrls: ['./master-navbar.component.scss']
})
export class MasterNavbarComponent implements OnInit, OnDestroy  {
  activeURL:string;
  parentUrl:string;
  user_avatar:string;
  clients:any;
  auth_user:any;
  auth_client:string;
  auth_client_info:any;
  subscription: Subscription;
  default_avatar = '../assets/default-profile.png';
  projects: any[] = [];
  logo = '../assets/logo/ecomia-header-logo.svg';
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private authService:AuthService,
    private userService:UserService,
    private ticketService:TicketService,
    private threadService:ThreadService,
    private memberService:MemberService,
    private clientService:ClientService,
    private activatedRoute: ActivatedRoute,
  ) {
    if(!this.user_avatar){
      this.user_avatar = localStorage.getItem('avatar');
    }
    if(!this.auth_user){
      this.userService.setUser(localStorage.getItem('authUser'));
      this.auth_user =JSON.parse(localStorage.getItem('authUser'));
    }

    this.setClient();
    this.setAvatar();
    this.setUser();

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

        if(slug_list.includes("clients")){
          this.parentUrl = "clients";
        } else if(slug_list.includes("tickets")){
          this.parentUrl = "tickets";
        } else if(slug_list.includes("users")){
          this.parentUrl = "users";
        }else if(slug_list.includes("user-role")){
          this.parentUrl = "user-role";
        } else if(slug_list.includes("activity")){
          this.parentUrl = "activity";
          console.log(slug_list,'activity slug_list');
        } else {
          this.parentUrl = "";
        }
      }
    });
  }


  ngOnInit() {
    this.clientService.getAll().subscribe( res => {
      if(res){
        this.clients = res.data;
      }
    });
    this.userService.currentAvatar.subscribe(avatar => {
      this.user_avatar = avatar;
    });

    this.projectService.loadAll();
    this.projectService.projects.subscribe( (res:any) => {
      this.projects = res;
    });
  }
  ngOnDestroy(){
    this.userService.clearAvatar();
    this.userService.clearClient();
    this.userService.clearUser();
    this.userService.clearClientInfo();
  }
  setUser():void {
    this.subscription = this.userService.currentLoggedInUser.subscribe( (res:any) => { this.auth_user = JSON.parse(res); });
  }
  setClientInfo():void {
    this.subscription = this.userService.currentClientInfo.subscribe(client_info => { this.auth_client_info = client_info;  });
  }
  setClient():void {
    this.subscription = this.userService.currentClient.subscribe(client => { this.auth_client = client;  });
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
    window.location.href='/'
    return false;
  }



}
