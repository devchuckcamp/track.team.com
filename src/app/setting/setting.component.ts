import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';

type TicketPriorityType = Array<{id: number, name: string }>;
type TicketStatusType = Array<{id: number, name: string }>;
type  TicketOptionSetting = {name: string, color: string };
const add = {
  name: '',
  color: '',
}


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit {
  settings:any[] = [];
  step:number;
  // Option Initiators
  ticketOptionLoaded: boolean;
  ticketPriorityList: TicketPriorityType = [];
  ticketStatusList: TicketStatusType = [];
  ticketSettingToAdd:TicketOptionSetting;
  constructor(
    private settingService:SettingService,
  ) {
    this.step = 0;
  }

  ngOnInit() {

    this.ticketSettingToAdd = add;
    this.ticketOptionLoaded = false;
    this.settingService.settings.subscribe( (res:any) => {
      this.ticketPriorityList = res;
      this.ticketOptionLoaded = true;
    });
  }

  addTicketPrioritySetting(){
    this.settingService.save(this.ticketSettingToAdd).subscribe( (res:any) => {
      this.settingService.loadAll();
    });
  }
  updateTicketPrioritySetting(ticketPriority:any){

    let color = {name:ticketPriority.name,color:ticketPriority.color,order:ticketPriority.order};
    this.settingService.update(color, ticketPriority.id).subscribe();
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
