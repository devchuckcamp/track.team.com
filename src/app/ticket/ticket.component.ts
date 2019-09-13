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
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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
    ticketStatuses: any[] = [];
    members:Members[] = [];
    tag_users:TaggableMembers[] = [];
    ticketPriorities:any[] =[];
    ticketsCategory:any[] = [];
    taggable_members:any;
    tagged_members = new FormControl();
    assignees = new FormControl();
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
    //Filter
    filter:any;
    initialFilter:any = [];
    statusFilter:any = [];
    // Search
    searchText:any = '';
    // Paginator
    // MatPaginator Inputs
    length = 0;
    pageSize = 25;
    pageNum = 1;
    pageSizeOptions: number[] = [25, 50, 100];
    // tslint:disable:max-line-length
    todo = [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ];
    done = [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ];

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
      this.statusFilter.length =0;
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
      this.ticketToAdd.category = null;
      this.ticketToAdd.assigned_to = null;
      this.ticketToAdd.assignees = null;
      this.ticketToAdd.status_id = null;
      this.replayText = "";
      this.ticketFormShow = false;
      this.ticketForm = new FormGroup({
        'title': new FormControl('', [Validators.required,]),
        'description': new FormControl('', [Validators.required,]),
        'category': new FormControl('', [Validators.required,]),
        'priority': new FormControl('', [Validators.required,]),
        'assigned_to': new FormControl('', []),
        'assignees': new FormControl('', []),
      });
      // Tickets Category
      this.ticketService.ticketsCategory.subscribe( (res:any) => {
        this.ticketsCategory = res;
      });
      // Tickets Status
      this.ticketService.loadAllTicketStatuses(1);
      this.projectService.getAllMemberFullList(this.project_name).subscribe( res => {
        if(res){
          this.members = res;
          this.taggable_members = res;
        }
        // this.length = res.total;
      });

      this.route.params.subscribe(params => {
        let filteredStats = [];

        if (params['project_name'] !== undefined) {
          this.project_name = params['project_name'];
          this.loading = true;
          if (params['filter_type'] !== undefined) {
            this.filter = params['filter_type'];
            this.getFilterTicket(params['project_name'],params['filter_type']);
          } else {
            this.getTicket(params['project_name']);
          }
          this.ticketService.ticketStatus.subscribe( (res:any) => {
            this.ticketStatuses = res.data;
            filteredStats = res.data;
            if(res.data){
              this.statusFilter = [];

              let filterIDs = [];
              filterIDs = res.data.filter(res=> res.name == this.filter );

              if (params['filter_type'] !== undefined) {
                res.data.forEach(stat => {
                  let filter_type = params['filter_type'].replace('-', " ").toLowerCase();
                  if(stat.name.toLowerCase() == filter_type){
                    this.statusFilter.push(stat.id);
                  }
                });
              // } else {
              //   res.data.forEach(stat => {
              //     if(stat.id !==5){
              //       this.statusFilter.push(stat.id);
              //     }
              //   });
              }
            }
          });

          this.projectService.getProject(params['project_name']).subscribe( res=>{
            if(res) this.project_id = res.id;
          });
        } else {

        }
      });
    }

    drop(event: CdkDragDrop<any[]>) {
      let swap = false;
      //If they're on the same priority order swap their sub order
      if(event.container.data[event.previousIndex].order == event.container.data[event.currentIndex].order){
        this.ticketService.updateOrder(event.container.data[event.previousIndex], event.container.data[event.currentIndex]).subscribe( (res:any) => {
          if(res){
            this.snackBar.open('Ticket has been swapped!', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
            );
          }
        });
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
      } else {
        alert('Swapping of priority order are only exclusive to tickets of the same priority group.');
      }
    }

    isSelected(id:any){
      let index: number = this.statusFilter.indexOf(id);
      let found = false;
      if (index !== -1) {
        found = true;
      }else{
        found = false;
      }
      return found;
    }

    ngOnDestroy(){
      this.filter = '';
      this.initialFilter = [];
      this.initialFilter.length =0;
      this.statusFilter= [];
      this.statusFilter.length =0;
    }

    assignTo(id:number){

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
        this.length = res.total;
        this.tag_users = res.data.tag_users;
      });
    }
    getTicket(project_name:any){
      this.ticketService.getProjectTicketAll(project_name, this.pageNum, this.pageSize).subscribe(res => {
        this.loading = false;
        this.tickets = res.data;
        this.length = res.total;
        this.tag_users = res.data.tag_users;
      });
    }

    setPageSizeOptions(setPageSizeOptionsInput: any) {
      this.pageSize = setPageSizeOptionsInput.pageSize;
      let pageSize = setPageSizeOptionsInput.pageSize;
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      this.ticketService.getProjectTicketAll(this.project_name, this.pageNum, this.pageSize).subscribe(res => {
        this.loading = false;
        this.tickets = res.data;
        this.length = res.total;
        this.tag_users = res.data.tag_users;
      });
    }

    //Pagination Section
    onPageChange(event) {
      if(event.pageSize > this.length){
        this.pageNum = 1;
        this.pageSize = event.pageSize;
      }else{
        this.pageNum = event.pageIndex+1;
        this.pageSize = this.pageSizeOptions[0];
      }

      this.ticketService.getProjectTicketAll(this.project_name, this.pageNum, this.pageSize, this.filter).subscribe(res => {
        this.loading = false;
        this.tickets = res.data;
        this.length = res.total;
        this.tag_users = res.data.tag_users;
      });
    }

    viewTicket(ticket){
      this.ticket = ticket;
      return false;
    }
    goToTicket(ticketID:any){
      this.router.navigateByUrl(ticketID).then(e => {
        if (e) {
          // console.log("Navigation is successful!");
        } else {
          // console.log("Navigation has failed!");
        }
      });
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

    public getAssignedMembers(ticket_id:any = null){
      let membersAssigned = [];
      if(this.ticketToAdd.assignees.length){
        this.ticketToAdd.assignees.forEach(obj => {
          let member = {
            ticket_id:ticket_id,
            project_id:this.project_id,
            user_id:obj.id
          };
          membersAssigned.push(member);
        });
      }
      return membersAssigned;
    }

    public addNewTicket(){
      if(this.ticketForm.valid){
        let title = this.ticketForm.value.title;
        let description = this.ticketForm.value.description;
        let assigned_to = this.ticketForm.value.assigned_to;
        let ticket = {
          title:title,
          description:description,
          assigned_to:null,
          category_id:this.ticketForm.value.category,
          project_id: this.project_id,
          priority_id:this.ticketToAdd.priority,
        };

        this.submitting= true;
        this.ticketService.save(ticket).subscribe( res => {

          if(res){
            let added_ticket:any = res;
            let tagged = this.getTaggedMember(added_ticket.id);
            if(tagged.length){
              this.ticketService.addTaggedUser(tagged).subscribe( res => {

              });
            }

              if(this.ticketToAdd.assignees.length){
                const assigned_members:any = this.getAssignedMembers(added_ticket.id);
                this.addAssignees(assigned_members);
                this.submitting =false;
              }
            if(!this.submitting){
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
              this.ticketToAdd = {};
              // Refresh ticket table
              this.getTicket(this.project_name);
            }
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
    addAssignees(assignees){
      this.ticketService.addAssignees(assignees).subscribe( res => {
      });
    }
    deleteTicket(ticket_id:number){
      this.ticketService.delete(ticket_id).subscribe( res => {
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

    reOrderTickets(){
      this.ticketService.reOrderTickets(this.project_id).subscribe( (res:any) =>{
        // console.log(res,'res');
      });

      return false;
    }

    searchTicket(){
      if(this.searchText !== ''){
        this.ticketService.filterTicketByKeyword(this.project_name, this.pageNum, this.pageSize, this.searchText, this.statusFilter).subscribe( (res:any) =>{
          this.tickets = res.data;
          this.length = res.total;
        });
      } else {
        this.getTicket(this.project_name);
      }
      return false;
    }
    checkStatusFilter(stat:any){
      const index: number = this.statusFilter.indexOf(stat);
      if (index !== -1) {
          this.statusFilter.splice(index, 1);
      }else{
        this.statusFilter.push(stat);
      }
      // console.log(this.statusFilter,'statusFilter');
    }
}
