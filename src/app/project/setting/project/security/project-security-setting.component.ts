import { Component, OnInit, Input } from '@angular/core';
import { SettingService } from './../../../../service/setting.service';
import { ProjectService } from './../../../../service/project.service';
import { UserService } from './../../../../service/user.service';
import { MetaService } from './../../../../service/meta.service';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { Meta } from '../../../../model/meta';
type TicketPriorityType = Array<{id: number, name: string }>;
type TicketPatch = Array<{id: number, name: string}>;
type  TicketPatchOption = {name: string, project:string};
const add = {
  name: '',
  project: null
}


@Component({
  selector: 'project-security-setting',
  templateUrl: './project-security-setting.component.html',
  styleUrls: ['../../project-setting.component.scss']
})

export class ProjectSecuritySettingComponent implements OnInit {
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
  eta:Meta[]  = [];

  // Paginator
  // MatPaginator Inputs
  length = 0;
  pageSize = 15;
  pageNum = 1;
  pageSizeOptions: number[] = [15, 50, 100];

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
    this.loaded = true;
    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined && params['project_name']){
        this.project_name = params['project_name'];
      }
    });
    this.loading = true;
    this.metaService.getETAAccess(this.project_name,'project','eta_access').subscribe((res)=>{
        this.eta = res.data;
        this.loading = false;
    });
  }

  toggleAccess(metaid, val){
    this.metaService.updateMetaValue(metaid,val).subscribe((res)=>{

    });
  }

}
