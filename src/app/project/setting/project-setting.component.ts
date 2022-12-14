import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../service/setting.service';
import { AuthService } from '../../service/auth.service';

import { User} from '../../model/user';
type TicketPriorityType = Array<{id: number, name: string }>;
type TicketStatusType = Array<{id: number, name: string }>;
type  TicketOptionSetting = {name: string, color: string };
const add = {
  name: '',
  color: '',
}


@Component({
  selector: 'app-project-setting',
  templateUrl: './project-setting.component.html',
  styleUrls: ['./project-setting.component.scss']
})

export class ProjectSettingComponent implements OnInit {
  settings:any[] = [];
  step:number;
  authenticatedUser:User;
  // Option Initiators
  ticketOptionLoaded: boolean;
  ticketPriorityList: TicketPriorityType = [];
  ticketStatusList: TicketStatusType = [];
  ticketSettingToAdd:TicketOptionSetting;
  constructor(
    private settingService:SettingService,
    private authService:AuthService,
  ) {
    this.step = 0;
  }

  ngOnInit() {
    this.authService.currentAuthenticatedUser();
    this.authService.profile.subscribe((res:any) => {
      this.authenticatedUser = res;
    });
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
    console.log(color);
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
