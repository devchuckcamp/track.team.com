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
type  TicketOptionSetting = {name: string, color: string, order: number };
const addCustomStatus = {
  name: '',
  color: '',
  order:0,
  app_default:0,
  is_custom:1,
  project:''
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
  ticketSettingToAdd:TicketOptionSetting;
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
  error:any;
  project:any;
  active_custom_status:number = 0;
  crud_access_custom_status:boolean = false;
  active_custom_status_loaded:boolean = false;
  // Paginator
  // MatPaginator Inputs
  length = 0;
  pageSize = 15;
  pageNum = 1;
  pageSizeOptions: number[] = [15, 50, 100];
  // Custom Status
  projectCustomStatusList:any;
  onLoadCustomMeta:any = [];
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
    this.active_custom_status = null;
    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined && params['project_name']){
        this.project_name = params['project_name'];
        addCustomStatus.project = params['project_name'];
        this.ticketSettingToAdd = addCustomStatus;
        // Custom Status Starts
        this.projectService.getProject(params['project_name']).subscribe( res => {
          // console.log('Active Custom Status', res);
          this.project = res;
          this.crud_access_custom_status = res.crud_access_custom_status;
          this.active_custom_status_loaded =true;
          // console.log('Active Custom Status', this.project);
          if(res.active_custom_status !== null){
              if(res.active_custom_status.value.value == 1){
                this.active_custom_status = res.active_custom_status;
                this.metaService.getMeta( params['project_name'], 'project', 'custom_status').subscribe((custom_stat)=>{
                      let arr = [];
                      this.onLoadCustomMeta = custom_stat.data;
                      // console.log('this.onLoadCustomMeta', this.onLoadCustomMeta);
                      custom_stat.data.forEach(el => {
                          arr.push(el.custom_status);
                      });
                    this.projectCustomStatusList = arr;
                    //console.log('projectCustomStatusList', this.projectCustomStatusList);
                    // console.log('List of Custom Status', this.projectCustomStatusList);
                    this.ticketOptionLoaded = true;
                  });
              } else {
                  this.active_custom_status = 0;
                  this.settingService.loadAllProjectStatus(params['project_name']);
                  this.settingService.statusSettings.subscribe( (statuses:any) =>{
                    let arr = statuses.data ? statuses.data : statuses;
                    this.projectCustomStatusList = arr;
                    // console.log('projectCustomStatusList', this.projectCustomStatusList);
                    this.ticketOptionLoaded = true;
                  });
              }
          } else {
              this.active_custom_status = 0;
              this.settingService.loadAllProjectStatus(params['project_name']);
              this.settingService.statusSettings.subscribe( (statuses:any) =>{
                  let arr = statuses.data ? statuses.data : statuses;
                  this.projectCustomStatusList = arr;
                  // console.log('projectCustomStatusList', this.projectCustomStatusList);
                  this.ticketOptionLoaded = true;
                });
          }
          
      });
        // Custom Status Ends
      }
    });
    // this.loading = true;
    this.metaService.getETAAccess(this.project_name, 'project', 'eta_access').subscribe((res)=>{
      if(!res.error){
        this.eta = res.data;
      } else {
        this.error = res;
        // console.log(res);
      }
        this.loading = false;
    });
  }

  updateColorOption(color:string){
    // console.log(color);
  }
  addTicketStatusSetting(){
    this.settingService.saveTicketStatus(this.ticketSettingToAdd).subscribe( (res:any) => {
      this.settingService.loadAllProjectStatus(this.project_name);
      this.metaService.getMeta( this.project_name, 'project', 'custom_status').subscribe((custom_stat)=>{
          let arr = [];
          custom_stat.data.forEach(el => {
              arr.push(el.custom_status);
          });
        this.projectCustomStatusList = arr;
        // console.log('List of Custom Status', this.projectCustomStatusList);
        this.ticketOptionLoaded = true;
      });
      this.ticketSettingToAdd.color = '';
      this.ticketSettingToAdd.name = '';
      this.ticketSettingToAdd.order = null;
      this.snackBar.open('New Status has been added', 'X', {
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
  updateTicketStatusSetting(ticketStatus:any){

    let color = {name:ticketStatus.name, color:ticketStatus.color, order:ticketStatus.order};
    this.settingService.updateTicketStatus(color, ticketStatus.id).subscribe( (res:any) => {
      if(res && res.color == ticketStatus.color){
        this.snackBar.open('Status has been updated', 'X', {
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

  setStatusAsDefault(status_id, index){
    this.projectCustomStatusList.map( (e:any, index:number) => {
        e.is_default = false;
        return e;
    });

    this.metaService.updateDefaultStatus(this.project_name, status_id).subscribe((res:any) => {
      // console.log(res);
      if(res.id){
        this.snackBar.open('Default Status has been updated', 'X', {
          duration: 5000,
          direction: "ltr",
          verticalPosition:"top",
          horizontalPosition: "right",
          panelClass: "success-snack"
            }
        );
      }
    });
    this.projectCustomStatusList[index].is_default = true;
    return false;
  }

  toggleAccess(metaid, val){
    if(this.project.crud_access_custom_status){
      this.metaService.updateMetaValue(metaid,val).subscribe((res:any)=>{
        if(res.id){
          this.eta.map((el, index)=>{
            if(el.id == res.id){
              //console.log(this.eta[index]);
              this.eta[index].value = res.value;
            }
          });
        }
      });
    }
  }
  // Status
  toggleActiveCustomStatus(val){
    if(this.project.crud_access_custom_status){
      this.active_custom_status = (val == true ? 1 :0);
      this.metaService.createMeta(this.project_name, 'project', 'setting_active_custom_status', this.active_custom_status).subscribe((res:any) => {
        // console.log(res);
      });
      return false;
    }
  }

}
