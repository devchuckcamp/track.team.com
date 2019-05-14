import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { ProjectService } from '../service/project.service';

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
const mentionedMember: Array<{ first_name: string, last_name: string, user_id: number}> = [];
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
    mentions: string[] = ["Noah", "Liam", "Mason", "Jacob"];
    // mentionedMember:any[] = [];
    members:any[] =[];
    
    items: any[] =[
      // { "name" : "Noah" },
      // { "name" : "Liam" },
      // { "name" : "Mason" },
      // { "name" : "Jacob" }
    ];
    mentionConfig:any;
    // mentionConfig = {
    //   mentions:[{
    //     items: this.items,
    //       triggerChar: "@",
    //       labelKey:"first_name",
    //       disableSearch:false,
    //       mentionSelect: this.itemMentioned
    //     }
    //   ]
    // };
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
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private http: HttpClient,
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
        data: {uploads: uploads}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
    ngOnInit() {
        this.replayText = "";
        this.route.params.subscribe(params => {
            if (params['ticket_id'] !== undefined) {
                this.project_name = params['project_name'];

                this.ticketService.getProjectTicket(params['project_name'],params['ticket_id']).subscribe( res => {
                  console.log(res);
                  if(res){
                      this.ticket = res;
                    }
                    this.loading = true;
                    this.threadService.getAllTicketThread(res.id).subscribe( res => {
                      if(res.data){
                        this.thread = res.data;
                      }
                      this.loading = false;
                    });
                    this.auth = this.authService.getAuthUser();
                });
            } else {

            }
        });

        // Get all member
        this.projectService.getAllMember(this.project_name).subscribe( res => {
          console.log(res.data,'member');
          if(res.data){
            this.members = res.data;
            
            for(var i =0;i < this.members.length;i++){
              this.items.push(this.members[i].project_member_info);
            }
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
          }
          // this.length = res.total;
        });
    }


    processFile(imageInput: any) {
      // const file: File = imageInput.files[0];
      // const reader = new FileReader();

      // reader.addEventListener('load', (event: any) => {

      //   this.selectedFile = new ImageSnippet(event.target.result, file);
      //   const formData = new FormData();

      //   formData.append('uploaded_files', this.selectedFile.file);
      //   this.http.post('https://homestead.test/api/v1/thread/image/upload', formData, this.fileHeader())
      //       .subscribe(data => {
      //         // Sanitized logo returned from backend
      //         console.log(data, 'data');
      //       })
        // this.imageService.uploadImage(this.selectedFile.file).subscribe(
        //   (res) => {
          
        //   },
        //   (err) => {
          
        //   })
      // });
      // console.log(file);
      // reader.readAsDataURL(file);
    }

    viewTicket(ticket){
        this.ticket = ticket;
        return false;
    }

    onReplayKey(text:string){
        this.replayText = text;
        return false;
    }

    submitReplyBox(){
        if(this.replyView){
            // Check replay
            // if(this.replayText !==''){
            //     this.loading = true;
            //     this.replyView  = false;
            //     let thread = {
            //         "ticket_id":this.ticket.id,
            //         "user_id": this.auth.id,
            //         "message":this.replayText,
            //         "files": this.uploadImages
            //     };
            //     console.log(thread, 'thread');
            //     this.threadService.send(thread).subscribe( res => {
            //         this.loading = false;
            //         this.ticket.thread.push(res);
            //         this.uploadImages = [];
            //     });
            // } else {
            //     console.log(this.replayText,'replayText is empty');
            // }
        } else {
            this.replyView = true;
        }
        return false;
    }

    // File Upload
    public files: UploadFile[] = [];
  // handleFileSelect(evt){
  //     var files = evt.target.files;
  //     var file = files[0];

  //   if (files && file) {
  //       var reader = new FileReader();

  //       reader.onload = this._handleReaderLoaded.bind(this);
  //       let ss = this._handleReaderLoaded.bind(this);
  //       console.log(ss);
  //       reader.readAsBinaryString(file);
  //   }
  // }

    getFileType(){
      return this.fileType;
    }

    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
     
      let base64textString = '';
      base64textString= btoa(binaryString);
      this.uploadImages.push('data:'+this.getFileType()+';base64,'+btoa(binaryString));
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
            // var files = evt.target.files;
            //this.files= file;
            this.fileType = file.type;
            console.log(this.fileType,'filetype');
            if (file) {
                var reader = new FileReader();
                console.log(file,'file droppped');
                reader.onload = this._handleReaderLoaded.bind(this);
                let binary = this._handleReaderLoaded.bind(this);
                // console.log(ss);
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
      this.http.post('https://8f90aa5d.ngrok.io//api/v1/thread/image/upload', this.requests, this.fileHeader())
      .subscribe(data => {
        // Sanitized logo returned from backend
        console.log(data, 'data');
      })
    }
    private fileHeader() {
      let headers = new HttpHeaders({
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJmNGE5YWU0OWUyZjQ2ZWY1Yjk5NmIxMGMzYjY3MjUxMDZkZjJmMGIwMWU4MTUzYTI4NDdjNTAzMWYzMDUzMmZhN2M0ZjQ4MzQ3NjdmM2YwIn0.eyJhdWQiOiIyIiwianRpIjoiYmY0YTlhZTQ5ZTJmNDZlZjViOTk2YjEwYzNiNjcyNTEwNmRmMmYwYjAxZTgxNTNhMjg0N2M1MDMxZjMwNTMyZmE3YzRmNDgzNDc2N2YzZjAiLCJpYXQiOjE1NTY4MTI1MzcsIm5iZiI6MTU1NjgxMjUzNywiZXhwIjoxNTg4NDM0OTM3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.UK8-CmYniyfQghFl-y1uoRO5CC9mqggndoFv3gRyqX3QL7bdMYJURoXHriAM8lgs681sTthbppDgRM0UuutjEZIfTfSwi1kHXCN5Y1jUX4hiAq-WwlWLlIHajBki_akFFq-IH9cSFuJr6tzRv3p2nNm2dk6RM0aiGmgpSAziXAeMx41eX_KAXIEZYUBeITv-eCZpJf-KnhU7stqQ95zxly9ULEGJCYUNbGdt7VxK95QwaOf6xs90_NF6goVqrqhAOixctlEbw9i0p_vp5HjXUcyaHvYfp20ril0Xg6UyUrhm7QGkLP7cmQCJGL_vlU2WQcYb233xJA3OdPnfGjYAHb91hWA1wjHXtd6eotDIbqRu22iVehRT72RWcsI74wVb3YjbJBZ4vssLLVC3qj4zRKWgXC8L6QKgGE4zR59PD5UPXfMyXaMRV1oyqi-1wI5bMV_gyyi_c5yvuAuyckN0K1V0LuKBTzaKFzIo7bcGc4SL81nH9flkK5TjP07aEDGoOh4cKZuer_T6gAnyrs9gjW87Tgp88CBn_x86BjL1CofySDDjU3AKkzPkg98BRlB4aPvehyCmVgsG5KsBgwgIgjCbP3FAlyugZmA3JiyWbSGGP4P_VzpTXwJj3Enm2ChcBmKzZH45lcG-qRSVHIGhJIEMoI-rL_wA8q9klz_iCKw',
          'Content-Type':  'multipart/form-data;',
          'enctype': 'multipart/form-data',
          'Accept':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
          'Allow':'GET,POST,PUT,DELETE,OPTION'
        })
      let options = { headers: headers };
      return options;
  }
    public fileOver(event){
      console.log(event);
    }
   
    public fileLeave(event){
      console.log(event);
    }

    updateTicketStatus(status:number){
      console.log(status,'status updated');
      this.ticket.status_id = status;
      let data = {
        status_id:status
      }

      this.ticketService.update(this.ticket,'status').subscribe( res => {

        if(res && res.status_id == status){
          console.log(res,'updated');
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

    getImage(thread_id:number){
      this.threadService.getImage(thread_id).subscribe(res =>{
        return res;
      });
    }

    removeTagUser(tag_info:any){
      let tag_id = tag_info.id;
      this.ticketService.removeTag(tag_id).subscribe( res => {
        console.log('removed tag:'+ res);
        this.ticket.tag_users = this.ticket.tag_users.filter(
          tag => tag.id !== tag_info.id);
      });

      return false;
    }

    itemMentioned(tag:any){
      console.log(  mentionedMember,' mentionedMember');
      let mentioned = {
        first_name:tag.first_name,
        last_name:tag.last_name,
        user_id: tag.user_id
      };
      mentionedMember.push(mentioned);

      return '@'+tag.first_name+''+tag.last_name;
    }
}
