import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { MenuService } from '../service/menu.service';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ThreadService } from '../service/thread.service';
import { TicketService } from '../service/ticket.service';
import { MemberService } from '../service/member.service';
import { NotificationService } from '../service/notification.service';
import { Project } from '../model/project';
import { Observable, Subscription  } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import * as _ from 'lodash';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export class Message {
  constructor(
      public sender: any,
      public content: any,
      public isBroadcast = false,
      public channel: any,
      public event: any,
      public data :any,
  ) { }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy  {
  currentAutHUser:any;
  authenticatedUser:any;
  activeURL:string;
  parentUrl:string;
  user_avatar:string;
  auth_user:any;
  auth_client:string;
  auth_client_info:any;
  currentSideBarMenu:number;
  web_app_key:any = 12345;
  hide_user_update:boolean = false;
  subscription: Subscription;
  default_avatar = '../assets/default-profile.png';
  projects: any[] = [];
  ticketsCategory: any[] =[];
  // notification
  notification:any = [];
  unread_notification:any = [];
  unread_notification_count:number = 0;

  logo = '../assets/logo/ecomia-header-logo.svg';
  public serverMessages = new Array<Message>();

  public clientMessage = '';
  public isBroadcast = false;
  public sender = '';

  private socket$: WebSocketSubject<any>;

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private authService:AuthService,
    private userService:UserService,
    private ticketService:TicketService,
    private threadService:ThreadService,
    private memberService:MemberService,
    private menuService:MenuService,
    private snackBar: MatSnackBar,
    private notificationService:NotificationService,
  ) {
    if(!this.user_avatar){
      this.user_avatar = localStorage.getItem('avatar');
    }
    if(!this.auth_user){
      this.userService.setUser(localStorage.getItem('authUser'));
      this.auth_user =JSON.parse(localStorage.getItem('authUser'));
    }
    this.setSideBarStatus();
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

        if(slug_list.includes("projects")){
          this.parentUrl = "projects";
        } else if(slug_list.includes("tickets")){
          this.parentUrl = "tickets";
        } else if(slug_list.includes("users")){
          this.parentUrl = "users";
        }else if(slug_list.includes("user-role")){
          this.parentUrl = "user-role";
        } else if(slug_list.includes("activity")){
          this.parentUrl = "activity";
        } else {
          this.parentUrl = "";
        }
      }
    });

    // this.socket$ = new WebSocketSubject({url:'ws://192.168.10.10:6001/app/'+this.web_app_key, protocol:[]});
    // this.socket$
    //   .subscribe(
    //     (message) => {
    //       if (message.channel == 'channel-notify.' + this.auth_user.id) {
    //         if (message.data != undefined) {
    //           let ss = message.data;
    //           let obj = JSON.parse(ss);
    //           message = {
    //             sender: obj.message.data.message_by.username,
    //             data: obj.message,
    //             app_link: obj.link,
    //             isBroadcast: false
    //           };
    //           this.unread_notification_count++;
    //           this.notification.push(message);
    //         }
    //       }
    //     },
    //     (err) => console.error(err),
    //     () => console.warn('Completed!')
    //   );
    // let data = { "event": "pusher:subscribe", "data": { "channel": "channel-notify." + this.auth_user.id } }
    // this.socket$.next(data);
  }


  ngOnInit() {
    this.currentAutHUser =  this.authService.currentLocalAuthenticatedUser();
      this.authService.currentAuthenticatedUser().subscribe((res:any) =>{
        this.authenticatedUser = res;
        if(_.isEqual(this.currentAutHUser, this.authenticatedUser)){

          } else {
          }
      });
    this.userService.currentAvatar.subscribe(avatar => {
      this.user_avatar = avatar ;
    });
      this.projectService.loadAll();
      this.projectService.projects.subscribe( (res:any) => {
        this.projects = res;
      });
      this.ticketService.loadAllTicketCategory(this.auth_client);
      this.ticketService.ticketsCategory.subscribe(res => {
        this.ticketsCategory = res;
      });
      this.notificationService.loadAllNotification();
      this.notificationService.notification.subscribe((res: any) => {
        res.forEach( (info:any) => {
          let message = {
            id:info.id,
            sender: info.data.data.message_by.username,
            data: info.data,
            app_link: info.app_link,
            read:info.read,
            isBroadcast: false
          };
          if(!info.read) this.unread_notification_count++;
          this.notification.push(message);
        });
      });
  }
  ngOnDestroy(){
    this.userService.clearAvatar();
    this.userService.clearClient();
    this.userService.clearUser();
    this.userService.clearClientInfo();
  }
  hideUserUpdatePanel(){
    this.hide_user_update = true;
    return false;
  }
  sendAccessRequest(){
    this.snackBar.open('Request has been sent', 'X', {
        duration: 5000,
        direction: "ltr",
        verticalPosition:"top",
        horizontalPosition: "right",
        panelClass: "success-snack"
    });

    return false;
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
  setSideBarStatus():void {
    this.subscription = this.menuService.currentSideBarMenu.subscribe( (res:any) => { this.currentSideBarMenu = res; });
  }
  readAll(){

    this.notificationService.readAll().subscribe( (res:any) => {
      this.unread_notification_count = 0;
      for(var i =0;i <this.notification.length;i++){
        this.notification[i].read = 1;
      }
    });
    console.log('read', this.notification);
    return false;
  }

  read(link:string, index:number){

    this.notificationService.read(link).subscribe( (res:any) => {
      let readCount = 1;
      let len = this.notification.length;
      this.notification[index].read = 1;
      for(var i =0;i <len;i++){
        if(this.notification[i].app_link == link){
          this.notification[i].read = 1;
          readCount++;
        }
      }
      this.unread_notification_count = this.unread_notification_count - readCount;
      if(this.unread_notification_count <=0) {  this.unread_notification_count  = 0; }
    });
    if(link == window.location.href){
      return false;
    }
  }

  logout(){
    // this.socket$.unsubscribe();
    localStorage.clear();
    this.authService.Bearer = '';
    this.userService.Bearer = '';
    this.projectService.Bearer = '';
    this.threadService.Bearer = '';
    this.ticketService.Bearer = '';
    this.memberService.Bearer = '';

    window.location.href='/'
    return false;
  }

  private jt() {
    let headers = new HttpHeaders({
        'Authorization': 'Bearer '+12345,
        'Content-Type':  'application/json',
        'Accept':'application/json',
        'Access-Control-Allow-Origin':'*',
        'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
        'Allow':'GET,POST,PUT,DELETE,OPTION'
      })
    let options = { headers: headers };
    return options;
  }

  toggleSideNav(){
    if(this.currentSideBarMenu == 1){
      this.menuService.setAvatar(0);
    } else {
      this.menuService.setAvatar(1);
    }
    return false;
  }

}
