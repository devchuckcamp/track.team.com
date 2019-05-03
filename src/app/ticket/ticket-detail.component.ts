import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { Ticket } from '../model/ticket';
import { Thread } from '../model/thread';
import { User } from '../model/user';
import { MatSnackBar  } from '@angular/material';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketDetailComponent implements OnInit {
    tickets: Ticket[] = [];
    ticket: any;
    thread:any;
    auth:any;
    project_name:string;
    loggedin_user:string;
    replayView:boolean;
    loading:    boolean;
    replayText:string;

    constructor(
        private ticketService: TicketService,
        private threadService:  ThreadService,
        private authService:    AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
    ) {
        this.auth = this.authService.getAuthUser();
        this.loggedin_user = "";
        this.replayView = false;
        this.loading = false;
        this.loggedin_user = this.auth.username;
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
        if(this.replayView){
            // Check replay
            if(this.replayText !==''){
                this.loading = true;
                this.replayView  = false;
                let thread = {
                    "ticket_id":this.ticket.id,
                    "user_id": this.auth.id,
                    "message":this.replayText,
                };
                this.threadService.send(thread).subscribe( res => {
                    this.loading = false;
                    this.ticket.thread.push(res);
                });
            } else {
                console.log(this.replayText,'replayText is empty');
            }
        } else {
            this.replayView = true;
        }
        return false;
    }

    // File Upload
    public files: UploadFile[] = [];
 
    public dropped(event: UploadEvent) {
      this.files = event.files;
      for (const droppedFile of event.files) {
   
        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
   
            // Here you can access the real file
            console.log(droppedFile.relativePath, file);
   
            /**
            // You could upload it like this:
            const formData = new FormData()
            formData.append('logo', file, relativePath)
   
            // Headers
            const headers = new HttpHeaders({
              'security-token': 'mytoken'
            })
   
            this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
            .subscribe(data => {
              // Sanitized logo returned from backend
            })
            **/
   
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      }
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
}
