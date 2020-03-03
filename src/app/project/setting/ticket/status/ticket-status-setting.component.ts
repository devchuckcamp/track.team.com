import { Component, OnInit, Input } from '@angular/core';
import { SettingService } from './../../../../service/setting.service';
import { ProjectService } from './../../../../service/project.service';
import { UserService } from './../../../../service/user.service';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';

type TicketPriorityType = Array<{id: number, name: string }>;
type TicketPatch = Array<{id: number, name: string}>;
type  TicketPatchOption = {name: string, project:string};
const add = {
  name: '',
  project: null
}


@Component({
  selector: 'ticket-status-setting',
  templateUrl: './ticket-status-setting.component.html',
  styleUrls: ['../../project-setting.component.scss']
})

export class TicketStatusSettingComponent implements OnInit {
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

  constructor(
    private settingService:SettingService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService:  UserService,
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
      }
      let currentURL = window.location.pathname;
      //Get Params
      let indexActUrlParam = currentURL.indexOf("?");
      //Get the exact active route
      let indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam );
      //Assign to our private activeUrl
      this.activeURL = indexActUrl;
      let slug_list = this.activeURL.split('/');
      if( (!slug_list.includes("settings"))){
        this.on_main_page = true;
      } else {
        this.on_main_page = false;
      }
      if (params['patch_id'] !== undefined ) {
        this.patch_id = params['patch_id'];
        this.on_main_page = true;
        this.projectService.viewPatch(params['patch_id']).subscribe( (res:any) => {
          if(res.id){
            this.selected_patch = res;
            this.loaded = true;
            this.loading = false;
            this.ticketPatchForm = new FormGroup({
              'name': new FormControl('', [Validators.required,])
            });
          }
        });
        setTimeout(()=>{
          this.projectService.loadAllPatches(this.project_name, this.pageNum, this.pageSize);
          this.projectService.projectsPatches.subscribe( (res:any) =>{
              this.projectPatchList = res.data;
              this.length = res.total;
              this.loading = false;
              this.loaded = true;
              this.ticketPatchSetting = add;
              this.ticketOptionLoaded = false;
            });
        },2000);
      } else {
        this.projectService.loadAllPatches(this.project_name, this.pageNum, this.pageSize);
        this.projectService.projectsPatches.subscribe( (res:any) =>{
            this.projectPatchList = res.data;
            this.length = res.total;
            this.loading = false;
            this.loaded = true;
            this.ticketPatchSetting = add;
            this.ticketOptionLoaded = false;
          });
        }
    });
    
    
      this.loaded = true;
  }

  addTicketPatchSetting(){
    this.ticketPatchSetting.project  =  this.project_name;
    this.projectService.createPatch(this.ticketPatchSetting);

    add.name  = '';
    this.snackBar.open('New Patch has been added.', 'X', {
        duration: 5000,
        direction: "ltr",
        verticalPosition:"top",
        horizontalPosition: "right",
        panelClass: "success-snack"
      }
    );
    setTimeout(()=>{ this.projectService.loadAllPatches(this.project_name, this.pageNum, this.pageSize); }, 1000);
  }
  viewPatch(patch){
    if(this.on_main_page){
      this.router.navigate([ '/'+this.auth_client+'/admin/projects/',this.project_name,'patches', patch.id]);
    } else {
      this.projectService.viewPatch(patch.id).subscribe((res: any) => {
        if (res.id) {
          this.selected_patch = res;
          this.ticketPatchForm = new FormGroup({
            'name': new FormControl('', [Validators.required,])
          });
        }
      });
    }
    return false;
  }
  viewTicket(ticketID){
      this.router.navigate([ '/'+this.auth_client+'/admin/projects/'+this.project_name+'/tickets/'+ticketID]);
    return false;
  }
  updateTicketPatchSetting(){
    // let category = {name:ticketStatus.name};
    // this.projectService.updateTicketPatch(category, ticketStatus.id).subscribe( (res:any) => {
    //   if(res.id){
    //     this.snackBar.open('Patch has been updated.', 'X', {
    //       duration: 5000,
    //       direction: "ltr",
    //       verticalPosition:"top",
    //       horizontalPosition: "right",
    //       panelClass: "success-snack"
    //         }
    //     );
    //   }
    // });
    this.ticketPatchFormSubmitting = true;
    return false;
  }

  returnToPatchList(){
    if(this.on_main_page){
      this.router.navigate([ '/'+this.auth_client+'/admin/projects/',this.project_name,'patches']);
    }
    this.selected_patch = null;
    return false;
  }

  updateColorOption(color:string){
    console.log(color,'color');
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  //Pagination Section
  onPageChange(event) {
    this.loading = true;
    if(event.pageSize > this.length){
      this.pageNum = 1;
      this.pageSize = event.pageSize;
    }else{
      this.pageNum = event.pageIndex+1;
      this.pageSize = this.pageSizeOptions[0];
    }
    this.projectService.loadAllPatches(this.project_name, this.pageNum, this.pageSize);
    this.projectService.projectsPatches.subscribe( (res:any)=> {
      this.projectPatchList = res.data;
      this.length = res.total;
      this.loading = false;
    });
  }

}
