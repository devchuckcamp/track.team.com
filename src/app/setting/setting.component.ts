import { Component, OnInit } from '@angular/core';
import { SettingService } from '../service/setting.service';

type TicketPriorityType = Array<{id: number, name: string }>;
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

  // Option Initiators
  ticketOptionLoaded: boolean;
  ticketPriorityList: TicketPriorityType = [];
  ticketSettingToAdd:TicketOptionSetting;
  constructor(
    private settingService:SettingService,
  ) {

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
    console.log(this.ticketSettingToAdd,'ticketSettingToAdd');
    this.settingService.save(this.ticketSettingToAdd).subscribe( (res:any) => {
      this.settingService.loadAll();
    });
  }
  updateTicketPrioritySetting(ticketPriority:any){

    let color = {name:ticketPriority.name,color:ticketPriority.color};
    this.settingService.update(color, ticketPriority.id).subscribe();
  }

  updateColorOption(color:string){
    console.log(color,'color');
  }

}
