import { Component, OnInit, OnDestroy, HostListener, Pipe, PipeTransform  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { GlobalRoutesService } from '../config/config';
import { Ticket } from '../model/ticket';
import { Thread } from '../model/thread';
import { User } from '../model/user';
// File Upload
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from  'rxjs';
import { FormsModule } from '@angular/forms';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogOverviewExampleDialog} from './dialog-attachment-overview.component';
import {DialogStatusHistoryDialog} from './dialog-status-history.component';
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

@Pipe({ name: 'safeHtml' })
export class TicketDetailComponent implements OnInit, OnDestroy, PipeTransform {
    tickets: Ticket[] = [];
    ticket: any;
    thread:Thread[];
    auth:any;
    fileType:any;
    uploadImages:any = [];
    pdfImages = '../assets/pdf-file-preview.png';
    members:any[] =[];
    assigned_user:any =  [];
    assignableMembers:any = [];
    assignableMembersFiltered:boolean;
    settings:any[] = [];
    memberList = [];
    items: any[] =[];
    ticketCategories:any[] = [];
    ticket_patches:any =  [];
    ticketStatusList: TicketStatusType = [];
    mentionConfig:any;

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
    //Ticket Logs
    ticket_logs:any =  [];

    project_name:string;
    loggedin_user:string;
    replyView:boolean;
    loading:    boolean;
    updating_status:boolean = false;
    updating_priority:boolean = false;
    updating_category:boolean = false;
    updating_patch:boolean = false;
    replayText:string;
    animal: string;
    name: string;
    selectedFile: ImageSnippet;

    //Report
    download_report_url:any;
    public uploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver: boolean = false;
   download_auth_token:any = ""
   download_report:any = "";

    private socket$: WebSocketSubject<any>;

    constructor(
        private ticketService: TicketService,
        private threadService:  ThreadService,
        private authService:    AuthService,
        private projectService: ProjectService,
        private settingService: SettingService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private http: HttpClient,
        private globalRoutesService:GlobalRoutesService,
        private sanitizer: DomSanitizer
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
        this.animal = result;
      });
    }
    openStatusHistoryDialog(logs:any){
      const statusDialogRef = this.dialog.open(DialogStatusHistoryDialog, {
        width: '50%',
        height: '50%',
        data: {ticket_logs: logs}
      });
      return false;
      statusDialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });

      return false;
    }
    getSantizeUrl(url : string) { 
      if(url.includes("application/pdf")){
        url = this.pdfImages;
      }
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    ngOnInit() {
      this.settingService.statusSettings.subscribe( (res:any) =>{
        //console.log(res,'status list');
        this.ticketStatusList = res;
      });
      this.assignableMembersFiltered = false;
      // Settings
      this.settingService.settings.subscribe( (res:any) => {
        this.settings = res;
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

                this.ticketService.getProjectTicket(params['project_name'],params['ticket_id']).subscribe( (res:any) => {
                  if(res){

                        if(res.ticket_status_logs){
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
                      this.ticket = res;

                      this.assigned_user = res.assignees.map(assgn => {
                        return assgn.user_id;
                      });
                  }
                  this.loading = true;
                  this.threadService.getAllTicketThread(res.id).subscribe(  res => {
                    if(res.data){
                      this.thread = res.data;
                    }
                    this.loading = false;
                  });

                });
            } else {

            }
        });

        this.projectService.loadAllPatches(this.project_name, 1, 15, 1);
        this.projectService.projectsPatches.subscribe( (res:any)=> {
          this.ticket_patches = res;
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
    getTicketBillReport(id:number){
      this.ticketService.getTicketBillReport(this.ticket.billed_time_consumed.id).subscribe( (res:any )=>{

      } );
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
      this.assignableMembers = members.filter((member:any) =>{
        return !this.assigned_user.includes(member.user_id)
      });
    }

    ticketAssigned(user_id:number){
      return (user_id == this.auth.id ? true: false);
    }

    additionalAssignee(assignee):void{
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
            this.ticket.assignees.push(assignee);
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
        //console.log(text.length);
      while (text.length > 0) {
        result += text.substring(0, 200) + '\n';
        text = text.substring(200);
      }
      this.replayText  = result;
    }

    auto_grow(element) {

      let  textArea = document.getElementById("ticket-description-info")
      textArea.style.overflow = 'hidden';
      textArea.style.height = '0px';
      let height =  textArea.scrollHeight + 'px';
      let style = {'min-height': height,'max-height':height };
      return style;
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

    removeTagUser(tag_info:any){
      let tag_id = tag_info.id;
      this.ticketService.removeTag(tag_id).subscribe( res => {
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
}