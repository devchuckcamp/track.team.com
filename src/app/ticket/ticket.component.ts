import { Component, OnInit, OnDestroy, ChangeDetectorRef, Inject , Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { Ticket } from '../model/ticket';
import { Thread } from '../model/thread';
import { User } from '../model/user';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatSnackBar  } from '@angular/material';
import { Observable } from "rxjs"

interface ProjectMemberInfo{
  id: number;
  user_id: number;
  first_name:string;
  last_name:string;
}
interface TaggableMembers {
  id: number;
  project_id: number;
  user_id: number;
  project_member_info: ProjectMemberInfo;
  user: User;
}

interface Members {
  id: number;
  project_id: number;
  user_id: number;
  project_member_info: ProjectMemberInfo;
  user: User;
}

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
export class TicketComponent implements OnInit, OnDestroy {
    tickets: Ticket[] = [];
    members:Members[] = [];
    tag_users:TaggableMembers[] = [];
    ticketPriorities:any[] =[];
    taggable_members:any;
    tagged_members = new FormControl();
    ticketToAdd:any = new Object();
    ticket: any;
    thread:any;
    auth:any;
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
        private settingService:SettingService,
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
      this.auth = this.authService.getAuthUser();

      this.settingService.settings.subscribe( (res:any) => {
        this.ticketPriorities = res;
      });
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
        'priority': new FormControl('', [Validators.required,]),
        'assigned_to': new FormControl('', [Validators.required,]),
      });

      this.projectService.getAllMember(this.project_name).subscribe( res => {
        // console.log(res.data);
        if(res.data){
          this.members = res.data;
          this.taggable_members = res.data;

          // console.log(this.taggable_members, 'taggable_members');
        }
        // this.length = res.total;
      });

      // const membersObservable = this.projectService.getAllMemberObs(this.project_name);
      // membersObservable.subscribe(( members:Members[]) => { this.members = members; });

      // const taggableMembersObservable = this.projectService.getAllMemberObs(this.project_name);
      // taggableMembersObservable.subscribe(( taggable_members:TaggableMembers[]) => { this.taggable_members = taggable_members; console.log(taggable_members,'taggable_members') });

      this.route.params.subscribe(params => {
        if (params['project_name'] !== undefined) {
          this.project_name = params['project_name'];
          this.loading = true;

          if (params['filter_type'] !== undefined) {
            this.getFilterTicket(params['project_name'],params['filter_type']);
          } else {
            this.getTicket(params['project_name']);
          }
          this.projectService.getProject(params['project_name']).subscribe( res=>{
            if(res) this.project_id = res.id;
          });
        } else {

        }
      });
    }

    ngOnDestroy(){

    }

    assignTo(id:number){
      this.taggable_members = this.members;
      let new_taggable_members = this.taggable_members.filter( member => member.user_id != id);
      this.taggable_members = new_taggable_members;
    }

    tagTo(member:any){

    }

    isTagged(member_id:any){
      if(this.ticketForm.value.assigned_to == member_id){
        return true;
      }
      return false;
    }
    getFilterTicket(project_name:any,filter:any){
      this.ticketService.getProjectTicketFilter(project_name,filter).subscribe(res => {
        this.loading = false;
        this.tickets = res.data;
        this.tag_users = res.data.tag_users;
      });
    }
    getTicket(project_name:any){
      this.ticketService.getProjectTicketAll(project_name).subscribe(res => {
        this.loading = false;
        this.tickets = res.data;
        this.tag_users = res.data.tag_users;
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
            // console.log(droppedFile.relativePath, file);
   
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
          // console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }
   
    public fileOver(event){
      // console.log(event);
    }
   
    public fileLeave(event){
      // console.log(event);
    }

    public toggleTicketForm(){
      if(! this.ticketFormShow ) this.ticketFormShow = true;
      else  this.ticketFormShow = false;

      return false;
    }

    public getTaggedMember(ticket:any = null){
      let membersTagged = [];
      if(this.tagged_members.value){
        this.tagged_members.value.forEach(obj => {
          let member = {
            ticket_id:ticket,
            user_id:obj.user.id
          };
          membersTagged.push(member);
        });
      }
      return membersTagged;
    }

    public addNewTicket(){
      
      if(this.ticketForm.valid){
        let title = this.ticketForm.value.title;
        let description = this.ticketForm.value.description;
        let assigned_to = this.ticketForm.value.assigned_to;
        let ticket = {
          title:title,
          description:description,
          assigned_to:parseInt(assigned_to),
          project_id: this.project_id,
          priority_id:this.ticketToAdd.priority
        };
        console.log(this.ticketToAdd,'ticketToAdd');
        this.submitting= true;
        this.ticketService.save(ticket).subscribe( res => {

          if(res){
            let added_ticket:any = res;
            let tagged = this.getTaggedMember(added_ticket.id);
            if(tagged.length){
              this.ticketService.addTaggedUser(tagged).subscribe( res => {

              });
            }
            console.log(tagged,'tagged');
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
