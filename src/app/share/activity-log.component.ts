import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { ActivityService } from '../service/activity.service';
import {MatPaginator, MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
type TicketPriorityType = Array<{id: number, name: string }>;
type  TicketOptionSetting = {name: string, color: string };
const add = {
  name: '',
  color: '',
}

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
//   styleUrls: ['./activity-log.component.scss']
})

export class ActivityLogComponent implements OnInit {
    // Option Initiators
    ticketOptionLoaded: boolean;
    ticketPriorityList: TicketPriorityType = [];
    ticketSettingToAdd:TicketOptionSetting;
    logs: any[] = [];
    displayedColumns: string[] = ['module',  'user', 'description', 'project', 'updated_at'];
    // MatPaginator Inputs
    length = 5;
    pageSize = 5;
    pageSizeOptions: number[] = [1, 5, 10, 15, 25, 100];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    project_name:any;
    constructor(
        private settingService:SettingService,
        private activityService:ActivityService,
        public router: Router,
        private route: ActivatedRoute,
    ) {

    }

  ngOnInit() {
    this.route.params.subscribe(params => {
        if ( (params['project_name'] !== 'add' ) && params['project_name'] !== undefined) {
            let project_name = this.project_name ? this.project_name : params['project_name'];
            this.getAllProjectActivity(project_name);
        } else {
            this.getAllActivity();
        }
        this.router.events.subscribe(path =>{
            if(path instanceof NavigationEnd ){

            }
        });
    });
  }

    getAllProjectActivity(project_name:string){
        console.log(project_name);
    }
    getAllActivity(){
        this.activityService.getAll().subscribe( (res:any) => {
            console.log(res, 'all activities');
            this.dataSource = new MatTableDataSource(res.data);
                this.logs = res.data;
                this.length = res.total;
        });
    }
}
