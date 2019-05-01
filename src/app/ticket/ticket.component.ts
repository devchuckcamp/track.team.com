import { Component, OnInit, ChangeDetectorRef, Inject , Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
import { ProjectService } from '../service/project.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { Ticket } from '../model/ticket';
import { Thread } from '../model/thread';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatSnackBar  } from '@angular/material';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('150ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class TicketComponent implements OnInit {
    tickets: Ticket[] = [];
    members:any[];
    ticketToAdd:any = new Object();
    ticket: any;
    thread:any;
    user:any;
    project_name:string;
    project_id: number;
    loggedin_user:string;
    replayView:boolean;
    loading:    boolean;
    submitting:    boolean;
    ticketFormShow: boolean;
    replayText:string;
    // Form Group
    ticketForm: FormGroup;
    constructor(
        private ticketService: TicketService,
        private projectService: ProjectService,
        private threadService:  ThreadService,
        private authService:    AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
    ) {
        this.loggedin_user = "Admin";
        this.replayView = false;
        this.loading = false;
        this.submitting = false;
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['project_name'] !== undefined) {
            this.project_name = params['project_name'];
        }
      });
      this.ticketToAdd.title = '';
      this.ticketToAdd.description = '';
      this.ticketToAdd.assigned_to = null;
      this.ticketToAdd.status_id = null;
      this.replayText = "";
      this.ticketFormShow = false;
      this.ticketForm = new FormGroup({
        'title': new FormControl('', [Validators.required,]),
        'description': new FormControl('', [Validators.required,]),
        'assigned_to': new FormControl('', [Validators.required,]),
      });

      

      this.projectService.getAllMember(this.project_name).subscribe( res => {
        console.log(res.data);
        if(res.data){
          this.members = res.data;
        }
        // this.length = res.total;
      });
      this.route.params.subscribe(params => {
        if (params['project_name'] !== undefined) {
          this.project_name = params['project_name'];
          this.loading = true;
          this.getTicket(params['project_name']);
          this.projectService.getProject(params['project_name']).subscribe( res=>{
            if(res) this.project_id = res.id;
          });
        } else {

        }
      });
    }
    getTicket(project_name:any){
      this.ticketService.getProjectTicketAll(project_name).subscribe(res => {
        this.loading = false;
        this.tickets = res.data;
        this.user = this.authService.getAuthUser();
      });
    }
    viewTicket(ticket){
        this.ticket = ticket;
        return false;
    }

    onReplayKey(text:string){
        this.replayText = text;
        console.log(this.replayText,'this.replayText');
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
                    "user_id": this.user.id,
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

    public toggleTicketForm(){
      if(! this.ticketFormShow ) this.ticketFormShow = true;
      else  this.ticketFormShow = false;
      console.log("New Ticket Form");
      
      return false;
    }

    public addNewTicket(){
      if(this.ticketForm.valid){
        let title = this.ticketForm.value.title;
        let description = this.ticketForm.value.description;
        let assigned_to = this.ticketForm.value.assigned_to;
        let ticket = {
          title:title,
          description:description,
          assigned_to:assigned_to,
          project_id: this.project_id
        };
        this.submitting= true;
        this.ticketService.save(ticket).subscribe( res => {

          if(res){
            this.tickets = [];
            this.loading = true;
            this.ticketFormShow = false;
            this.ticketForm.reset();
            this.snackBar.open('Data has been updated', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition:"top",
                    horizontalPosition: "right",
                    panelClass: "success-snack"
                }
            );
            // Refresh ticket table
            this.getTicket(this.project_name);
          } else {
            this.snackBar.open('Data entered is not valid!', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition:"top",
                    horizontalPosition: "right",
                    panelClass: "fail-snack"
                }
            );
          }
          this.loading = false;
          this.submitting = false;
        });
      } else {
        this.snackBar.open('Please fill up required fields!', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "fail-snack"
            }
        );
      }
      console.log("New Ticket Form");
      
      return false;
    }

    deleteTicket(ticket_id:number){
      console.log(ticket_id);
      this.ticketService.delete(ticket_id).subscribe( res => {
        console.log(res);
        if(res == null){
          this.getTicket(this.project_name);
          this.snackBar.open('Ticket has been deleted', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "success-snack"
            }
          );
        }
      });
      return false;
    }

}
