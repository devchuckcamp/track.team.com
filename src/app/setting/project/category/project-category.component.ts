import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../service/setting.service';
import {MatSnackBar} from '@angular/material';

type TicketPriorityType = Array<{id: number, name: string }>;
type TicketStatusType = Array<{id: number, name: string}>;
type  TicketOptionSetting = {name: string};
const add = {
  name: ''
}


@Component({
  selector: 'project-category-setting',
  templateUrl: './project-category.component.html',
  styleUrls: ['../../setting.component.scss']
})

export class ProjectCategoryComponent implements OnInit {
  settings:any[] = [];
  step:number;
  // Option Initiators
  ticketOptionLoaded: boolean;
  // ticketPriorityList: TicketPriorityType = [];
  ticketCategoryList: TicketStatusType = [];
  ticketSettingToAdd:TicketOptionSetting;
  constructor(
    private settingService:SettingService,
    private snackBar: MatSnackBar,
  ) {
    this.step = 0;
  }

  ngOnInit() {

    this.ticketSettingToAdd = add;
    this.ticketOptionLoaded = false;

    this.settingService.categorySettings.subscribe( (res:any) =>{
      this.ticketCategoryList = res;
      this.ticketOptionLoaded = true;
    });
  }

  addTicketCategorySetting(){
    this.settingService.saveTicketCategory(this.ticketSettingToAdd).subscribe( (res:any) => {
      this.settingService.loadAllTicketCategory();
    });
  }
  updateTicketCategorySetting(ticketStatus:any){

    let category = {name:ticketStatus.name};
    this.settingService.updateTicketCategory(category, ticketStatus.id).subscribe( (res:any) => {
      this.snackBar.open('Category has been updated', 'X', {
        duration: 5000,
        direction: "ltr",
        verticalPosition:"top",
        horizontalPosition: "right",
        panelClass: "success-snack"
          }
      );
    });
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

}
