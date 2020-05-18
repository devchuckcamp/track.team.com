import { Component, OnInit, OnDestroy, HostListener, Pipe, PipeTransform  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { MetaService } from '../service/meta.service';
import { TaskService } from '../service/task.service';
import { GlobalRoutesService } from '../config/config';
//Pipes

// Model
import { Ticket } from '../model/ticket';
import { Thread } from '../model/thread';
import { User } from '../model/user';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
// File Upload
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from  'rxjs';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

// Dialog
import {DialogOverviewExampleDialog} from './dialog-attachment-overview.component';
import {DialogStatusHistoryDialog} from './dialog-status-history.component';
import {TaskDetailDialog} from './modal/dialog-ticket-task.component';
// import {CloneTaskDialog} from './modal/dialog-clone-task.component';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { projection } from '@angular/core/src/render3';
import { WebSocketSubject } from 'rxjs/webSocket';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
const mentionedMember: Array<{ email: string, first_name: string, last_name: string, user_id: number;}> = [];
type memberListType = Array<{id: number, email: string, first_name:string, last_name: string; }>;
type TicketStatusType = Array<{id: number, name: string,  color: string }>;

const memberListArray: memberListType = [];
const today = new Date();
today.setDate(0);
today.setHours(0);
today.setMinutes(0);

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket.component.scss']
})

export class TicketDetailComponent implements OnInit, OnDestroy, Pipe {
    currentAutHUser:any;
    authenticatedUser:any;
    tickets: Ticket[] = [];
    ticket: any;
    eta:any = 0;
    thread:Thread[];
    thread_pager:any;
    auth:any;
    fileType:any;
    uploadImages:any = [];
    pdfImages = '../assets/pdf-file-preview.png';
    members:any[] =[];
    assigned_user:any =  [];
    tag_users:any[] = [];
    assignableMembers:any = [];
    assignableMembersFiltered:boolean;
    settings:any[] = [];
    memberList = [];
    items: any[] =[];
    ticketCategories:any[] = [];
    ticket_patches:any =  [];
    ticketStatusList: TicketStatusType = [];
    mentionConfig:any;
   
    showAddCheckListForm:boolean = true;
    // Consumed Time
    is_ongoing:boolean = false;
    total_time_consumed:any;
    // Billed Time
    startedBillingTime:boolean = false;
    el: Element;
    billableTimeTotal:any;
    unixBillableTimeTotal:number = 0;
    totalHourBilled:any = 0;
    days:number = 0;
    daysCount:any;
    hours:any;
    minutes:any;
    seconds:any;
    // Comment
    comment_id:any= null;
    //Ticket Logs
    ticket_logs:any =  [];
    // Form Group
    ticketDetailForm :FormGroup;
    manualTimeBillForm:FormGroup;
    addTaskForm: FormGroup;
    project_name:string;
    loggedin_user:string;
    replyView:boolean;
    loading:    boolean;
    updating_status:boolean = false;
    updating_eta:boolean  = false;
    updating_priority:boolean = false;
    updating_category:boolean = false;
    updating_patch:boolean = false;
    replayText:string;
    animal: string;
    name: string;
    selectedFile: ImageSnippet;
    //ETA
    etaAccess:boolean = false;
    //Task
    selectedTask:any;
    //Report
    download_report_url:any;
    public uploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver: boolean = false;
    download_auth_token:any = ""
    download_report:any = "";
    //Global
    processingRequest:boolean = false
    private socket$: WebSocketSubject<any>;
    // Approval
    showManualBillTimeForm:boolean = false;
    approval:any;
    approved = false;

    constructor(
        private ticketService: TicketService,
        private threadService:  ThreadService,
        private authService:    AuthService,
        private projectService: ProjectService,
        private settingService: SettingService,
        private metaService:MetaService,
        private taskService:TaskService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private http: HttpClient,
        private globalRoutesService:GlobalRoutesService,
        private sanitizer: DomSanitizer,
        private formBuilder: FormBuilder,
    ) {
        this.auth = this.authService.getAuthUser();
        this.loggedin_user = "";
        this.replyView = false;
        this.loading = false;
        this.loggedin_user = this.auth.username;
    }
    transform(value) {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
    @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {

      if(this.startedBillingTime){
        event.returnValue = false;
        //console.log("Billing Ongoing");
        this.startBillTime(this.ticket.id);
      } else {
        //console.log("Billing on hold");
      }
    }

    run() {
      if(!this.ticket.billed_time_consumed){
        this.unixBillableTimeTotal = 0;
        today.setSeconds(this.unixBillableTimeTotal);
        today.setMinutes(0);
        today.setHours(0);
      } else {
        if(!this.startedBillingTime){
          this.unixBillableTimeTotal = this.ticket.billed_time_consumed.time;
        }
        today.setSeconds(this.unixBillableTimeTotal);
        today.setMinutes(this.seconds_minutes(this.unixBillableTimeTotal));
        today.setHours(this.seconds_hours(this.unixBillableTimeTotal));
        today.setDate(this.seconds_days(this.unixBillableTimeTotal));
      }
      if(this.startedBillingTime){
        let dHour:any = '';
        today.setSeconds(today.getSeconds() + 1); // Determine increment per second by second/s
        this.unixBillableTimeTotal +=1;
        this.hours = today.getHours().toString();
        this.minutes = today.getMinutes().toString();
        this.seconds = today.getSeconds().toString();
        this.daysCount = today.getDay().toString();
        if(this.days){
          dHour += this._format_recursive_hour(this.hours);
        }else if (this.hours.length < 2) {
          dHour = '0' + this.hours;
        }

        if (this.daysCount.length < 2) {
          this.daysCount = this._format_recursive_hour(this.daysCount);
        }
        if (this.seconds.length < 2) {
          this.seconds = '0' + this.seconds;
        }

        if (this.minutes.length < 2) {
          this.minutes = '0' + this.minutes;
        }

        if( this.hours == '01' || this.hours == '1'){
          this.days++;
        } else {
          if(this.days){
            dHour = this._format_recursive_hour(this.totalHourBilled); //Returns "09"
          } else {
            dHour =  this.hours;
          }
        }
        this.daysCount = this.seconds_days(this.unixBillableTimeTotal);
        this.billableTimeTotal = (this.daysCount != '00' || this.daysCount > 0 ? this.daysCount == 1 ?   this.daysCount +' day ':  this.daysCount +' days ' : '') + this.hours + ' : ' + this.minutes + ' : ' + this.seconds;
      }
    }

    format_billed_time(){
      let dHour:any = '';
      this.hours = today.getHours().toString();
        this.minutes = today.getMinutes().toString();
        this.seconds = today.getSeconds().toString();
        this.daysCount = today.getDay().toString();
        if(this.days){
          dHour += this._format_recursive_hour(this.hours);
        }else if (this.hours.length < 2) {
          dHour = '0' + this.hours;
        }

        if (this.daysCount.length < 2) {
          this.daysCount = this._format_recursive_hour(this.daysCount);
        }
        if (this.seconds.length < 2) {
          this.seconds = '0' + this.seconds;
        }

        if (this.minutes.length < 2) {
          this.minutes = '0' + this.minutes;
        }

        if( this.hours == '01' || this.hours == '1'){
          // this.totalHourBilled += 24;
          this.days++;
          // dHour = 23 + this.days;
        } else {
          if(this.days){
            dHour = this._format_recursive_hour(this.totalHourBilled); //Returns "09"
          } else {
            dHour =  this.hours;
          }
        }

        console.log('this.manualTimeBillForm.value',this.manualTimeBillForm.value);
        this.daysCount = this.seconds_days(this.unixBillableTimeTotal);
        this.billableTimeTotal = (this.daysCount != '00' || this.daysCount > 0 ? this.daysCount == 1 ?   this.daysCount +' day ':  this.daysCount +' days ' : '') + this.hours + ' : ' + this.minutes + ' : ' + this.seconds;
    }

    _format_recursive_hour(n){
      return n > 9 ? "" + n: "0" + n;
    }

    openDialog(uploads:any): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '100%',
        height: '100%',
        data: {uploads: uploads}
      });

      dialogRef.afterClosed().subscribe(result => {
        // this.animal = result;
      });
    }
    openStatusHistoryDialog(logs:any){
      const statusDialogRef = this.dialog.open(DialogStatusHistoryDialog, {
        width: '50%',
        height: '50%',
        data: {ticket_logs: logs}
      });

      statusDialogRef.afterClosed().subscribe(result => {
        // this.animal = result;
      });

      return false;
    }
    openTaskDetailDialog(task:any):void{
      const taskDetailDialogRef = this.dialog.open(TaskDetailDialog, {
        width: '50%',
        height: '50%',
        data: task
      });
      taskDetailDialogRef.afterClosed().subscribe(task => {
        if(task){
          // console.log(task);
          this.ticket.ticket_task.find( ({ id }, index) => {
            if(id === task.id){
              this.ticket.ticket_task[index] = task;
            }
          });
          this.snackBar.open('Task has been updated', 'X', {
              duration: 5000,
              direction: "ltr",
              verticalPosition:"top",
              horizontalPosition: "right",
              panelClass: "success-snack"
          });
        }
      });
    }
    openCloneTaskDialog(task:any): void {
      // const cloneTaskDialogRef = this.dialog.open(CloneTaskDialog, {
      //   width: '50%',
      //   height: '50%',
      //   data: task
      // });
      // cloneTaskDialogRef.afterClosed().subscribe(task => {
      //   if(task){
      //     console.log(task);
      //     this.ticket.ticket_task.find( ({ id }, index) => {
      //       if(id === task.id){
      //         this.ticket.ticket_task[index] = task;
      //       }
      //     });
      //     this.snackBar.open('Task has been updated', 'X', {
      //         duration: 5000,
      //         direction: "ltr",
      //         verticalPosition:"top",
      //         horizontalPosition: "right",
      //         panelClass: "success-snack"
      //     });
      //   }
      // });
    }
    getSantizeUrl(url : string) { 
      if(url.includes("application/pdf")){
        url = this.pdfImages;
      }
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    ngOnInit() {
      this.authService.currentAuthenticatedUser();
      this.authService.profile.subscribe((res:any) => {
        this.authenticatedUser = res;
      });
      this.assignableMembersFiltered = false;
      // Settings
      this.settingService.settings.subscribe( (res:any) => {
        this.settings = res;
      });
      this.ticketDetailForm = this.formBuilder.group({
                      'eta': new FormControl('', []),
                      'status': new FormControl('', []),
      });
      this.manualTimeBillForm = this.formBuilder.group({
        'hours': new FormControl(this.hours, []),
        'minutes': new FormControl(this.minutes, []),
        'seconds': new FormControl(this.seconds, []),
      });
      this.addTaskForm = this.formBuilder.group({
        'title': new FormControl('', [Validators.required,]),
        'description': new FormControl('', [Validators.required,]),
      });
      // Tickets Category
      this.settingService.categorySettings.subscribe( (res:any) =>{
        this.ticketCategories = res;
      });
      // this.ticketService.ticketsCategory.subscribe( (res:any) => {
      //   this.ticketCategories = res;
      // });
        this.replayText = "";
        this.route.params.subscribe(params => {
            
            if (params['ticket_id'] !== undefined) {
                this.project_name = params['project_name'];
                this.settingService.loadAllProjectStatus(this.project_name);
                this.settingService.statusSettings.subscribe( (res:any) =>{
                  this.ticketStatusList = !res.data ? res : res.data;
                });
                this.auth = this.authService.getAuthUser();

                // this.socket$ = new WebSocketSubject('ws://192.168.10.10:6001/app/12345');
                // this.socket$
                //   .subscribe(
                //     (message) => {
                //       // let content = JSON.parse(message.data);
                //       if (message.channel == 'channel-notify.' + this.auth.id) {
                //         if (message.data != undefined) {
                //           let ss = message.data;
                //           let obj = JSON.parse(ss);
                //           message = {
                //             sender: obj.message.data.message_by.username,
                //             content: obj.message,
                //             app_link: obj.link,
                //             isBroadcast: false
                //           };

                //           this.ticket.thread.push(message.content.data);
                //         }
                //       }
                //     },
                //     (err) => console.error(err),
                //     () => console.warn('Completed!')
                //   );
                // let data = { "event": "pusher:subscribe", "data": { "channel": "channel-notify." + this.auth.id } }
                // this.socket$.next(data);
                this.loading = true;
                this.ticketService.getProjectTicket(params['project_name'],params['ticket_id']).subscribe( (res:any) => {
                  if(res){

                    // Get Project Approval Status
                    if(res.approval_settings){
                      if(res.approval_settings.value && res.approval_settings.value.value==1){
                        this.approved = true;
                      } else {
                        this.approved = false;
                      }
                    }
                      if(res.ticket_status_logs){
                        this.eta = res.eta;
                        this.ticketDetailForm.value.eta = res.eta;
                        this.ticket_logs = res.ticket_status_logs.reverse();
                      }
                      today.setSeconds(0);
                      today.setMinutes(this.seconds_minutes(0));
                      today.setHours(this.seconds_hours(0));
                      today.setDate(this.seconds_days(0));
                      setInterval(() => this.run(), 1000);
                      this.process_time_consumption(res.progress_time_consumed);
                      if(res.billed_time_consumed){
                        this.download_auth_token = '?token='+this.ticketService.Bearer;
                        this.download_report = '&report='+res.id;
                        let param = this.download_auth_token+this.download_report;

                        this.download_report_url = this.globalRoutesService.apiEndPoint()+'/api/v1/ticket-time-billables-report'+param;
                        this.unixBillableTimeTotal = res.billed_time_consumed.time;
                        if(res.billed_time_consumed.started == 1){
                          this.startedBillingTime = true;
                          today.setSeconds(this.unixBillableTimeTotal);
                          today.setMinutes(this.seconds_minutes(this.unixBillableTimeTotal));
                          today.setHours(this.seconds_hours(this.unixBillableTimeTotal));
                          today.setDate(this.seconds_days(this.unixBillableTimeTotal));
                        } else {
                          this.startedBillingTime = false;
                          today.setSeconds(this.unixBillableTimeTotal);
                          today.setMinutes(this.seconds_minutes(this.unixBillableTimeTotal));
                          today.setHours(this.seconds_hours(this.unixBillableTimeTotal));
                          today.setDate(this.seconds_days(this.unixBillableTimeTotal));
                        }
                      } else {
                        this.unixBillableTimeTotal = 0;
                        this.startedBillingTime = false;
                      }
                      this.format_billed_time();
                      res.thread = res.thread.reverse();

                      this.ticket = res;
                      this.tag_users = res.tag_users.map(res=> {return res.user_id });
                      this.ticketDetailForm.value.status = res.status_id;
                      this.metaService.getMetaValue(this.project_name,'project','eta_access', 'auth_user_meta','auth_user_meta').subscribe((res)=>{
                        if(res){
                          this.etaAccess = res.value == 1? true : false;
                        }
                      });

                      this.thread_pager = res.thread_pager;

                      this.assigned_user = res.assignees.map(assgn => {
                        return assgn.user_id;
                      });
                      this.loading = false;
                      
                      if (params['comment_id'] !== undefined) {
                        this.comment_id = params['comment_id'];
                        this.scrollToCommentDiv(params['comment_id']);
                      }
                  }

                  // this.threadService.getAllTicketThread(res.id).subscribe(  res => {
                  //   if(res.data){
                  //     this.thread = res.data;
                  //   }
                  //   this.loading = false;
                  // });

                });
            } else {

            }
        });

        this.projectService.loadAllPatches(this.project_name, 1, 15, 0);
        this.projectService.projectsPatches.subscribe( (res:any)=> {
          this.ticket_patches = res;
          // console.log('ticket_patches', this.ticket_patches);
        });

        this.mentionConfig = {
          mentions:[{
            items: this.items,
              triggerChar: "@",
              labelKey:"first_name",
              disableSearch:false,
              mentionSelect: this.itemMentioned
            }
          ]
        };

        // Get all member
        this.projectService.getAllMemberFullList(this.project_name).subscribe( (res:any) => {
          if(res){
            this.members = res;
            for(var i = 0; i < this.members.length; i++){
              memberListArray.push(this.members[i].user);
            }
            this.memberList = this.members;
            for(var i =0;i < this.members.length;i++){
              this.items.push(this.members[i].user.user_details);
            }
          }
        });
    }
    ngOnDestroy(){
      this.unixBillableTimeTotal = 0;
      today.setSeconds(0);
      today.setMinutes(this.seconds_minutes(0));
      today.setHours(this.seconds_hours(0));
      today.setDate(this.seconds_days(0));
    }


    scrollToCommentDiv(comment_id){
      if(this.ticket.thread){
        setTimeout(() => {
          var el = document.getElementById("thread-"+comment_id);
          let yOffset = -60;
          let yPos = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          if(el !== null) window.scrollTo({ behavior: 'smooth', top: yPos });
        }, 500);
      }
    }
    process_time_consumption(data:any){
      let time_consumed = 0;
      this.is_ongoing = false;
      data.forEach(el => {
        let ended = el.ended
        if (!ended) {
          this.is_ongoing = true;
          let added_at = Date.parse(el.created_at) / 1000;
          ended = added_at
        } else {
          let time = ended - el.started;
          time_consumed += time;
        }
      });
      let consumed_total = this.seconds_to_days_hours_mins_secs_str(time_consumed);
      this.total_time_consumed = consumed_total;
    }
    seconds_minutes(time:any){
      return Math.floor(time / 60);
    }
    seconds_hours(time:any){
      return Math.floor(time / 60 / 60);
    }
    seconds_days(time:any){
      return Math.floor(time / 60 / 60 / 24);
    }
    seconds_to_days_hours_mins_secs_str(seconds)
    { // day, h, m and s
      var days     = Math.floor(seconds / (24*60*60));
          seconds -= days    * (24*60*60);
      var hours    = Math.floor(seconds / (60*60));
          seconds -= hours   * (60*60);
      var minutes  = Math.floor(seconds / (60));
          seconds -= minutes * (60);
      return ((0<days)?(days+" day, "):"")+hours+"h, "+minutes+"m and "+seconds+"s";
    }

    startBillTime(id:number){
      this.startedBillingTime = true;
      if(this.ticket.billed_time_consumed){
        this.ticketService.startBilling(id, this.unixBillableTimeTotal).subscribe( (res:any)=>{
          this.unixBillableTimeTotal = res.time;
        });
      } else {
        let ticket = {
          ticket_id:this.ticket.id,
        }
        this.ticketService.createBilling(ticket, true).subscribe( (res:any)=>{
          this.unixBillableTimeTotal = res.time;
          this.ticket.billed_time_consumed = res;

        });
      }
      return false;
    }

    stopBillTime(id:number){
      this.startedBillingTime = false;
      this.ticketService.stopBilling(this.ticket, this.unixBillableTimeTotal).subscribe( (res:any)=>{
        if(this.unixBillableTimeTotal !== res.time){
          this.snackBar.open('Timer have been already stopped from another device/tab/browser', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );
        }
        
        this.unixBillableTimeTotal = res.time;
        this.ticket.billed_time_consumed = res;
        today.setSeconds(this.unixBillableTimeTotal);
        today.setMinutes(this.seconds_minutes(this.unixBillableTimeTotal));
        today.setHours(this.seconds_hours(this.unixBillableTimeTotal));
        today.setDate(this.seconds_days(this.unixBillableTimeTotal));
        this.format_billed_time();
        
      });
      return false;
    }
    closeManualStopBillTimeForm(){
      this.showManualBillTimeForm = false;

      return false;
    }
    manualStopBillTime(id:number){
      this.startedBillingTime = false;
      this.ticketService.stopBilling(this.ticket, this.unixBillableTimeTotal).subscribe( (res:any)=>{
        if(this.unixBillableTimeTotal !== res.time){
          this.snackBar.open('Timer have been already stopped from another device/tab/browser', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );
        }
        this.unixBillableTimeTotal = res.time;
        this.ticket.billed_time_consumed = res;
        today.setSeconds(this.unixBillableTimeTotal);
        today.setMinutes(this.seconds_minutes(this.unixBillableTimeTotal));
        today.setHours(this.seconds_hours(this.unixBillableTimeTotal));
        today.setDate(this.seconds_days(this.unixBillableTimeTotal));
        this.format_billed_time();
        this.showManualBillTimeForm = true;
        console.log(res.time);
      });
      return false;
    }

    sendManualTime(){
      console.log(this.manualTimeBillForm);
      let hoursTotal = Number(this.manualTimeBillForm.value.hours > 0 ? this.manualTimeBillForm.value.hours*3600 :0);
      let minutesTotal = Number(this.manualTimeBillForm.value.minutes ? this.manualTimeBillForm.value.minutes*60:0);
      let secondsTotal = Number(this.manualTimeBillForm.value.seconds ? this.manualTimeBillForm.value.seconds :0);
      let totalSeconds = hoursTotal+minutesTotal+secondsTotal;
      console.log(totalSeconds);
      this.unixBillableTimeTotal = totalSeconds;
      today.setSeconds(totalSeconds);
      today.setMinutes(this.seconds_minutes(totalSeconds));
      today.setHours(this.seconds_hours(totalSeconds));
      today.setDate(this.seconds_days(totalSeconds));
      this.ticket.billed_time_consumed.time = totalSeconds;
      this.format_billed_time();
      this.ticketService.stopBilling(this.ticket, this.unixBillableTimeTotal).subscribe( (res:any)=>{
        this.closeManualStopBillTimeForm();
        this.snackBar.open('Billed time has been updated', 'X', {
          duration: 5000,
          direction: "ltr",
          verticalPosition:"top",
          horizontalPosition: "right",
          panelClass: "success-snack"
        });
      });
      return false;
    }
    approveTicket(){
      this.ticket.is_approved = 1;
      this.ticket.approval_settings.value.value = 1;
      let etaObj :any;
      etaObj = { is_approved : 1 };

      this.ticketService.update(this.ticket,'is_approved', etaObj).subscribe( res => {
          this.ticket_logs = res.ticket_status_logs.reverse();
          this.updating_eta = false;
          this.getLastAction();
          this.snackBar.open('ETA has been updated', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );
      });
    }
    getTicketBillReport(id:number){
      this.ticketService.getTicketBillReport(this.ticket.billed_time_consumed.id).subscribe( (res:any )=>{
      });
    }

    downloadReport(){

      // Check if user is authorized
      //Generate download token
      this.ticketService.createDownloadToken(this.ticket).subscribe( (res:any) => {

        if(res)  {
          this.download_auth_token = '?token='+res.token;
            let param = this.download_auth_token+this.download_report;
            this.download_report_url = this.globalRoutesService.apiEndPoint()+'/api/v1/ticket-time-billables-report'+param;
            window.open(this.download_report_url, "_blank");
        }
      });
      return false;
    }
    isAssignee(){
      let assignees = this.ticket.assignees;
      let assigned = assignees.filter(user => user.user_id == this.auth.id);
      return assigned.length;
    }
    searchMemberToAssign(keyword:string){
      this.projectService.getAllMemberFullList(this.project_name,keyword).subscribe( (res:any) => {
        this.filterAssignableMember(res);
        this.assignableMembersFiltered = true;
      });
    }

    filterAssignableMember(members:any){
      this.members = members;
      console.log(members);
      this.assignableMembers = members;
      // .filter((member:any) =>{
      //   return !this.assigned_user.includes(member.user_id)
      // });
      // console.log(this.assignableMembers);
    }

    ticketAssigned(user_id:number){
      return (user_id == this.auth.id ? true: false);
    }
    isAssignable(member){
      if(!this.assigned_user.includes(member.user_id)){
        return true;
      }
      return false;
    }
    isTaggable(member){
      if(!this.tag_users.includes(member.user_id)){
        return true;
      }
      return false;
    }
    additionalTag(member){
      let assigneeObj = {
        ticket_id:this.ticket.id,
        user_id:member.user_id,
      };
      // Call add assignee service
      this.ticketService.addTagMember(assigneeObj).subscribe( (res:any)=>{
        if(res){
          this.ticket.tag_users.push(res);
          this.tag_users.push(res.user_id);
          console.log(this.tag_users);
          console.log('new tags', this.ticket.tag_users);
          this.snackBar.open('Tag Members has been updated', 'X', {
            duration: 5000,
            direction: "ltr",
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "success-snack"
          }
          );
        }
      }, (err)=> {
          //console.log('ERROR:',err);
      });

      return false;
    }

    additionalAssignee(assignee){
      if(!this.assigned_user.includes(assignee.user_id)){
        let assigneeObj = [{
          ticket_id:this.ticket.id,
          user_id:assignee.user_id,
          project_id:assignee.project_id
        }];

        // Call add assignee service
        this.ticketService.addAssignees(assigneeObj).subscribe( (res)=>{
          if(res.length){
            this.assigned_user.push(assignee.user_id);
            console.log('assignees', res);
            this.ticket.assignees.push(res[0]);
            console.log('new assignees',  this.ticket.assignees);
            this.filterAssignableMember(this.members);
            this.snackBar.open('Assignee has been updated', 'X', {
              duration: 5000,
              direction: "ltr",
              verticalPosition:"top",
              horizontalPosition: "right",
              panelClass: "success-snack"
                }
            );
          }
        }, (err)=> {
          //console.log('ERROR:',err);
        });
      } else {
        //console.log(assignee,'member already assigned');
      }
      return false;
    }

    closeAssigneeSearchResults(){
      this.assignableMembersFiltered = false;
      return false;
    }

    apiEndpoint = this.globalRoutesService.apiEndPoint();

    viewTicket(ticket){
        this.ticket = ticket;
        return false;
    }

    onReplayKey(text:string){
        this.replayText = text;
        var result = '';
      // while (text.length > 0) {
      //   result += text.substring(0, 200) + '\n';
      //   text = text.substring(200);
      // }
      this.replayText  = text;
    }

    auto_grow(element) {

      let  textArea = document.getElementById("ticket-description-info");
      textArea.style.overflow = 'hidden';
      textArea.style.height = '0px';
      let height =  textArea.scrollHeight + 'px';
      let style = {'min-height': height,'max-height':height };
      return style;
    }

    showMore(){
      if(this.ticket.thread_pager.current_page < this.ticket.thread_pager.total_page){
        this.ticket.thread_pager.current_page++;
        this.threadService.pageTicketThread(this.ticket.id, this.thread_pager.per_page, this.ticket.thread_pager.current_page).subscribe((res) => {
          
          if(res.data.length){
            this.thread_pager.current_page = res.current_page;
            // this.thread_pager.total = res.current_page* this.thread_pager.per_page >= this.thread_pager.total ? this.thread_pager.total : res.current_page* this.thread_pager.per_page;
            this.ticket.thread_pager.current_page = res.current_page;
            let newThreads = res.data.reverse();
            newThreads.forEach(thrd => {
              this.ticket.thread.unshift(thrd);
            });
            this.ticket.thread = this.ticket.thread.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.id === thing.id
              ))
            );
          }
        });
      }
      return false;
    }

    showLess(){
      if(this.ticket.thread_pager.current_page < this.ticket.thread_pager.total_page){
        this.ticket.thread_pager.current_page++;
        this.threadService.pageTicketThread(this.ticket.id, this.thread_pager.per_page, this.ticket.thread_pager.current_page).subscribe((res) => {
          if(res.data.length){
            this.thread_pager.current_page = res.current_page;
            // this.thread_pager.total = res.current_page* this.thread_pager.per_page >= this.thread_pager.total ? this.thread_pager.total : res.current_page* this.thread_pager.per_page;
            this.ticket.thread_pager.current_page = res.current_page;
            let newThreads = res.data.reverse();
            newThreads.forEach(thrd => {
              this.ticket.thread.unshift(thrd);
            });
            this.ticket.thread = this.ticket.thread.filter((thing, index, self) =>
              index === self.findIndex((t) => (
                t.id === thing.id
              ))
            );
          }
        });
      }
      return false;
    }
    submitReplyBox(){
        if(this.replyView){
            // Check replay
            if(this.replayText !==''){
              this.loading = true;
              this.replyView  = false;
              let thread = {
                  "ticket_id":this.ticket.id,
                  "user_id": this.auth.id,
                  "message":this.replayText,
                  "files": this.uploadImages
              };

              this.threadService.send(thread).subscribe( res => {
                //console.log(res,'saved thread');
                if(res){
                  this.ticketService.mentionUser(mentionedMember, this.ticket.id).subscribe(res => {
                    mentionedMember.length = 0;

                  });
                  this.loading = false;
                  this.getLastAction();
                  this.ticket.thread.push(res);
                  this.uploadImages = [];
                }
              });
            }
        } else {
            this.replyView = true;
        }
        return false;
    }

    // File Upload
    public files: UploadFile[] = [];
    pdf = '';
    getFileType(){
      return this.fileType;
    }
    showPdf() {
      const linkSource = 'data:application/pdf;base64,' + this.pdf;
      const downloadLink = document.createElement("a");
      const fileName = "sample.pdf";

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
  }
    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;

      let base64textString = '';
      base64textString= btoa(binaryString);
      this.pdf = base64textString;
      
      this.uploadImages.push('data:'+this.getFileType()+';base64,'+btoa(binaryString));
      //console.log(this.uploadImages,'uploadImages');
      return base64textString;
    }
    public dropped(event: UploadEvent) {
      this.files = event.files;
      let formData = new FormData();
      for (const droppedFile of event.files) {
   
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.fileType = file.type;

            if (file) {
                var reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                let binary = this._handleReaderLoaded.bind(this);

                reader.readAsBinaryString(file);
            }

          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        }
      }
    }
    getFiles(): FileLikeObject[] {
      return this.uploader.queue.map((fileItem) => {

        return fileItem.file;
      });
    }
    public imageUrlPREVIEW:any;
    fileOverBase(event):  void {
        this.hasBaseDropZoneOver  =  event;
    }
    public requests = [];
    upload() {   
      const files = this.getFiles();

      files.forEach((file) => {
        let formData = new FormData();
        formData.append('uploaded_files' , file.rawFile, file.name);
        this.requests.push(formData);
      });
      this.http.post(this.apiEndpoint+'/api/v1/thread/image/upload', this.requests, this.fileHeader())
      .subscribe(data => {
        // Sanitized logo returned from backend
        //console.log(data, 'data');
      })
    }
    private fileHeader() {
      let token = this.authService.Bearer;
      let headers = new HttpHeaders({
          'Authorization': 'Bearer'+token,
          'Content-Type':  'multipart/form-data;',
          'enctype': 'multipart/form-data',
          'Accept':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
          'Allow':'GET,POST,PUT,DELETE,OPTION'
        });
      let options = { headers: headers };
      return options;
  }
    public fileOver(event){

    }
    public fileLeave(event){

    }
    public updateTicketEta(eta:any = null){
      this.updating_eta = true;
      let etaObj :any;
      etaObj = { eta : this.ticketDetailForm.value.eta };

      this.ticketService.update(this.ticket,'eta', etaObj).subscribe( res => {
          this.ticket_logs = res.ticket_status_logs.reverse();
          this.updating_eta = false;
          this.getLastAction();
          this.snackBar.open('ETA has been updated', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );
      });
      return false;
    }
    public updateTicketStatus(status:number){
      this.ticket.status_id = status;
      let data = {
        status_id:status
      }
      this.updating_status = true;
      this.ticketService.update(this.ticket,'status').subscribe( res => {

        if(res && res.status_id == status){
          this.ticket_logs = res.ticket_status_logs.reverse();
          this.process_time_consumption(res.progress_time_consumed);
          this.updating_status = false;
          this.getLastAction();
          this.snackBar.open('Status has been updated', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );
        } else {

        }

      });
    }

    updateTicketPriority(priority_id:any){
      let priorityObj = this.settings.find( (res) =>  res.id == priority_id);
      this.updating_priority = true;
      this.ticketService.update(this.ticket, 'priority', priorityObj).subscribe( res => {
        if(res && res.priority_id == priority_id){
          this.ticket.priority = res;
          this.updating_priority = false;
          this.getLastAction();
          this.snackBar.open('Priority has been updated', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );
        } else {

        }
      });
    }

    updateTicketCategory(category:any){
      let priorityObj = this.ticketCategories.find( (res) =>  res.id == category);
      this.updating_category = true;
      this.ticketService.update(this.ticket, 'category', priorityObj).subscribe( res => {
        if(res && res.category_id == category){
          this.ticket.category = res;
          this.updating_category = false;
          this.getLastAction();
          this.snackBar.open('Category has been updated', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );
        } else {

        }
      });
    }

    updateTicketPatch(patch:any){
      let patchObj :any;
      if(patch !== ''){
        patchObj = this.ticket_patches.find( (res) =>  res.id == patch);
      } else {
        patchObj = { id:null};
      }
      this.updating_patch = true;
      this.getLastAction();
      this.ticketService.update(this.ticket, 'patch', patchObj).subscribe( res => {
        if( patchObj.id == null || (res && res.patch_id == patch)){
          this.ticket.category = res;
          this.updating_patch = false;
          this.snackBar.open('Patch has been updated', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
            );
          } else {

          }
      });
    }

    getImage(thread_id:number){
      this.threadService.getImage(thread_id).subscribe(res =>{
        return res;
      });
    }

    removeAssignee(assignee:any){
      console.log(this.assigned_user);
      this.ticketService.removeAssignee(assignee.id).subscribe( res => {
        this.ticket.assignees = this.ticket.assignees.filter(
          (assgn) =>{ return assgn.user_id !== assignee.user_id });
        });
        this.assigned_user = this.assigned_user.filter(
          (user )=> {
            return user !== assignee.user_id
          }
        );
        console.log(this.assigned_user);
      return false;
    }

    removeTagUser(tag_info:any){
      let tag_id = tag_info.id;
      this.ticketService.removeTag(tag_id).subscribe( res => {
        this.tag_users = this.tag_users.filter(
          (user )=> {
            return user !== tag_info.user_id
          }
        );
        this.snackBar.open('Member has been removed', 'X', {
              duration: 5000,
              direction: "ltr",
              verticalPosition:"top",
              horizontalPosition: "right",
              panelClass: "success-snack"
          }
        );
        this.ticket.tag_users = this.ticket.tag_users.filter(
          tag => tag.id !== tag_info.id);
      });

      return false;
    }

    itemMentioned(tag:any){
      let mentionedUserEmail = memberListArray.filter( res =>  res.id == tag.user_id );
      let mentioned = {
        first_name:tag.first_name,
        last_name:tag.last_name,
        email:mentionedUserEmail[0].email,
        user_id: tag.user_id,
      };
      mentionedMember.push(mentioned);

      return '@'+tag.first_name+''+tag.last_name;
    }

    toggleCheckListForm(){
      this.showAddCheckListForm = !this.showAddCheckListForm;

      return false;
    }
    addTicketTask(){
      var form = this.addTaskForm;
      if(form.valid){

        this.processingRequest = true;
        var task = {
          ticket_id: this.ticket.id,
          title: this.addTaskForm.value.title,
          description: this.addTaskForm.value.description,
        };
        this.taskService.create(task).subscribe( (res:any)=>{
          this.processingRequest = false;
          if(res.id){
            this.getLastAction();
            this.ticket.ticket_task.push(res);
            this.snackBar.open('Task added', 'X', {
              duration: 5000,
              direction: "ltr",
              verticalPosition:"top",
              horizontalPosition: "right",
              panelClass: "success-snack"
          }
      );
            form.reset();
          }
        });
      }
      return false;
    }
    getTaskMenu(id){
      return 'task_'+id;
    }
    selectTask(task:any){
      this.selectedTask = task;
    }
    removeTask(id){
      this.processingRequest = true;
      this.taskService.remove(id).subscribe( (res:any)=>{
        this.processingRequest = false;
        this.getLastAction();
        this.snackBar.open('Task has been removed', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "danger-snack"
            }
        );
        this.ticket.ticket_task = this.ticket.ticket_task.filter(function(el) { return el.id != id; });
      });
    }
    updateTaskStatus(ev, selectedTask){
      var task = {
        status: ev.checked ? 1 : 0,
        title: selectedTask.Title,
        description: selectedTask.description,
        task_id: selectedTask.id,
      };
      this.processingRequest = true;
      this.taskService.update(task).subscribe( (res:any)=>{

        this.ticket.ticket_task.find( ({ id }, index) => {
          if(id === selectedTask.id){
            this.processingRequest = false;
            this.ticket.ticket_task[index] = res;
          }
        });
        this.snackBar.open('Task has been updated', 'X', {
            duration: 5000,
            direction: "ltr",
            verticalPosition:"top",
            horizontalPosition: "right",
            panelClass: "success-snack"
        });
      });
    }
    calculateTaskCompletionRate( index:number){
      var rate =  0;
      var count = 0;
      var completedTasks = 0;
      if(this.ticket.ticket_task){
          for(var i=0;i < this.ticket.ticket_task.length; i++){
              if(this.ticket.ticket_task[i].status == 1){
                  completedTasks++;
              }
          }
          count = completedTasks;
          rate = completedTasks > 0 ? (completedTasks*100)/this.ticket.ticket_task.length : 0;
      }
      return rate;
  }
    getLastAction(){
      this.ticketService.getLastAction(this.project_name, this.ticket.id).subscribe( (res) => {
        this.ticket.last_action = res;
      });
    }
}