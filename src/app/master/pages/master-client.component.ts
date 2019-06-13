import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import Chart from 'chart.js';
import {MatPaginator, MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { SettingService } from '../../service/setting.service';
import { ClientService } from '../../service/client.service';
import { User } from '../../model/user';
import { Observable, Subscription  } from 'rxjs';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-master-client',
  templateUrl: './master-client.component.html',
  styleUrls: ['../master.component.scss']
})
export class MasterClientComponent implements OnInit {
  avatar:any;
  auth_client:any;
  @ViewChild("chart")
  public refChart: ElementRef;
  public chartData: any;
  public authUser:User;
  private viewInfoRoute : string;
  settings:any[] = [];
  subscription:Subscription;
  activeURL: string;
  admin_sub_1: string;
  admin_sub_2: string;
  admin_project_sub: string;
  auth_user:any;
  profile:any;
  breadcrumb:any;
  projectsList:any[] =[];
  clients:any[] = [];
  displayedColumns: string[] = ['name','slug', 'projects','users'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  // MatPaginator Inputs
  length = 0;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 100];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService,
    private settingService:SettingService,
    private clientService:ClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
    }
    ngOnInit() {
        this.setClient();
        this.setUser();
        this.getAllClients();
    }
    ngAfterViewInit() {
    }

    getAllClients(){
        this.clientService.getAll().subscribe( res => {
            if(res){
                this.clients = res.data;
                this.dataSource = new MatTableDataSource(res.data);
                this.length = res.total;
            }
        });
    }
    setUser():void {
        this.subscription = this.userService.currentLoggedInUser.subscribe( (res:any) => { this.auth_user = res; });
    }
    setClient():void {
        this.subscription = this.userService.currentClient.subscribe(client => { this.auth_client = client;  });
    }

}