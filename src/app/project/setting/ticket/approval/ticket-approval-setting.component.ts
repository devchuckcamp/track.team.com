import { Component, OnInit, Input } from '@angular/core';
import { SettingService } from './../../../../service/setting.service';
import { ProjectService } from './../../../../service/project.service';
import { UserService } from './../../../../service/user.service';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { MetaService } from 'src/app/service/meta.service';

type TicketPriorityType = Array<{id: number, name: string }>;
type TicketPatch = Array<{id: number, name: string}>;
type  TicketPatchOption = {name: string, project:string};
const add = {
  name: '',
  project: null
}


@Component({
  selector: 'ticket-approval-setting',
  templateUrl: './ticket-approval-setting.component.html',
  styleUrls: ['../../project-setting.component.scss']
})

export class TicketApprovalSettingComponent implements OnInit {
  settings:any[] = [];
  step:number;
  // Option Initiators
  ticketOptionLoaded: boolean;
  ticketPriorityList: TicketPriorityType = [];
  projectPatchList: TicketPatch = [];
  ticketPatchSetting:TicketPatchOption;
  project_name:string;
  auth_client:any;
  //Patch View
  selected_patch:any;
  ticketPatchForm:FormGroup;
  patch_id:any;
  ticketPatchFormSubmitting:boolean;
  loading:boolean;
  activeURL:any;
  on_main_page:boolean;
  loaded:boolean;
  // Paginator
  // MatPaginator Inputs
  length = 0;
  pageSize = 15;
  pageNum = 1;
  pageSizeOptions: number[] = [15, 50, 100];
  checked = false;
  approval:any;
  constructor(
    private settingService:SettingService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService:  UserService,
    private metaService: MetaService,
    private router:Router,
  ) {
    this.step = 0;
    this.loading = true;
    this.loaded = false;
    this.on_main_page = false;
  }

  ngOnInit() {
    this.userService.client_slug.subscribe(res => this.auth_client = res);
    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined ) {
        this.project_name = params['project_name'];
        this.metaService.getMeta( params['project_name'], 'project', 'ticket_approval').subscribe((approval)=>{
            this.checked = approval.value.value == 1 ? true:false;
            this.approval = approval;
        });
      }
    });
      this.loaded = true;
  }

  toggleApproval(){
    if(this.checked){
        this.checked = false;
    } else {
        this.checked =true;
    }
    let val = this.checked ? 1 : 0;
    this.metaService.updateMetaValue(this.approval.id,val).subscribe((res:any)=>{
       this.snackBar.open('Approval has been updated.', 'X', {
              duration: 5000,
              direction: "ltr",
              verticalPosition:"top",
              horizontalPosition: "right",
              panelClass: "success-snack"
                }
            );
      });
  }
}
