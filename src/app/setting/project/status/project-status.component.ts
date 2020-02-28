import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../service/setting.service';
import {MatSnackBar} from '@angular/material';
type TicketPriorityType = Array<{id: number, name: string }>;
type TicketStatusType = Array<{id: number, name: string,  color: string }>;
type  TicketOptionSetting = {name: string, color: string, order: number };
const add = {
  name: '',
  color: '',
  order:0
}


@Component({
  selector: 'project-status-setting',
  templateUrl: './project-status.component.html',
  styleUrls: ['../../setting.component.scss']
})

export class ProjectStatusComponent implements OnInit {
  settings:any[] = [];
  step:number;
  // Option Initiators
  ticketOptionLoaded: boolean;
  // ticketPriorityList: TicketPriorityType = [];
  ticketStatusList: TicketStatusType = [];
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
    // this.settingService.settings.subscribe( (res:any) => {
    //   this.ticketPriorityList = res;
    //   this.ticketOptionLoaded = true;
    // });

    this.settingService.statusSettings.subscribe( (res:any) =>{
      this.ticketStatusList = res;
      this.ticketOptionLoaded = true;
    });
    
  }

  addTicketStatusSetting(){
    this.settingService.saveTicketStatus(this.ticketSettingToAdd).subscribe( (res:any) => {
      this.settingService.loadAllProjectStatus('');
      this.snackBar.open('New Status has been added', 'X', {
        duration: 5000,
        direction: "ltr",
        verticalPosition:"top",
        horizontalPosition: "right",
        panelClass: "success-snack"
          }
      );
    });
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
