import { Component, OnInit } from '@angular/core';
import { SettingService } from './../../../../service/setting.service';
import { ProjectService } from './../../../../service/project.service';
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
  selector: 'ticket-patch-setting',
  templateUrl: './ticket-patch-setting.component.html',
  styleUrls: ['../../project-setting.component.scss']
})

export class TicketPatchSettingComponent implements OnInit {
  settings:any[] = [];
  step:number;
  // Option Initiators
  ticketOptionLoaded: boolean;
  ticketPriorityList: TicketPriorityType = [];
  projectPatchList: TicketPatch = [];
  ticketPatchSetting:TicketPatchOption;
  project_name:string;
  //Patch View
  selected_patch:any;
  ticketPatchForm:FormGroup;
  patch_id:any;
  ticketPatchFormSubmitting:boolean;
  loading:boolean;
  
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
  ) {
    this.step = 0;
    this.loading = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined ) {
        console.log(params['project_name'], 'params');
        this.project_name = params['project_name'];
      }

      if (params['patch_id'] !== undefined ) {
        console.log(params['patch_id'], 'patch_id');
        this.patch_id = params['patch_id'];
        
      }
    });
    this.ticketPatchSetting = add;
    this.ticketOptionLoaded = false;
    this.projectService.loadAllPatches(this.project_name, this.pageNum, this.pageSize);
    this.projectService.projectsPatches.subscribe( (res:any) =>{
        this.projectPatchList = res.data;
        this.length = res.total;
        this.loading = false;
      });
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
    console.log(patch,'patch');
    this.projectService.viewPatch(patch.id).subscribe( (res:any) => {
      if(res.id){
        this.selected_patch = res;
        this.ticketPatchForm = new FormGroup({
          'name': new FormControl('', [Validators.required,])
        });
      }
    });
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
