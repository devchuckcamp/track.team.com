import { Component, OnInit, Inject } from '@angular/core';
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
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { projection } from '@angular/core/src/render3';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
const mentionedMember: Array<{ email: string, first_name: string, last_name: string, user_id: number;}> = [];
type memberListType = Array<{id: number, email: string, first_name:string, last_name: string; }>;
const memberListArray: memberListType = [];

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketDetailComponent implements OnInit {
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
    mentionConfig:any;

    project_name:string;
    loggedin_user:string;
    replyView:boolean;
    loading:    boolean;
    replayText:string;
    animal: string;
    name: string;
    selectedFile: ImageSnippet;
    public uploader: FileUploader = new FileUploader({});
    public hasBaseDropZoneOver: boolean = false;
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
    getSantizeUrl(url : string) {
      if(url.includes("application/pdf")){
        url = this.pdfImages;
      }
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    ngOnInit() {
      this.assignableMembersFiltered = false;
      // Settings
      this.settingService.settings.subscribe( (res:any) => {
        this.settings = res;
      });
        this.replayText = "";
        this.route.params.subscribe(params => {
            if (params['ticket_id'] !== undefined) {
                this.project_name = params['project_name'];
                this.auth = this.authService.getAuthUser();

                this.ticketService.getProjectTicket(params['project_name'],params['ticket_id']).subscribe( (res:any) => {
                  if(res){
                      this.ticket = res;
                       this.assigned_user = res.assignees.map(assgn => {
                        return assgn.user_id;
                       });
                  }
                  this.loading = true;
                  this.threadService.getAllTicketThread(res.id).subscribe( res => {
                    if(res.data){
                      this.thread = res.data;
                    }
                    this.loading = false;
                  });

                });
            } else {

            }
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
            console.log(res,'members');
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
          console.log('ERROR:',err);
        });
      } else {
        console.log(assignee,'member already assigned');
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
        return false;
    }
    auto_grow(element) {
      //console.log(element);
      // element.style.height = "5px";
      // element.style.height = (element.scrollHeight)+"px";
      let style = {'min-height': '200px','max-height':'300px'};
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
      console.log(this.uploadImages,'uploadImages');
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
        console.log(data, 'data');
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

      this.ticketService.update(this.ticket,'status').subscribe( res => {

        if(res && res.status_id == status){
          this.snackBar.open('Data has been updated', 'X', {
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
      this.ticketService.update(this.ticket, 'priority', priorityObj).subscribe( res => {
        if(res && res.priority_id == status){
          this.ticket.priority = res;
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
