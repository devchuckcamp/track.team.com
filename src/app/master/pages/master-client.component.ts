import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
// import Chart from 'chart.js';
import {MatPaginator, MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { ProjectService } from '../../service/project.service';
import { SettingService } from '../../service/setting.service';
import { ClientService } from '../../service/client.service';
import { User } from '../../model/user';
import { Observable, Subscription  } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';
const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-master-client',
  templateUrl: './master-client.component.html',
  styleUrls: ['../master.component.scss'],
  animations: [
    trigger(
      'toggleAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('10ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('10ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class MasterClientComponent implements OnInit {
    avatar:any;
    auth_client:any;
    // @ViewChild("chart")
    // public refChart: ElementRef;
    // public chartData: any;
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
    loadingData:boolean;
    loading = '../../assets/icon/loading.gif';
    displayedColumns: string[] = ['name','slug', 'projects','users', 'activation', 'valid_until', 'status'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
    // MatPaginator Inputs
    length = 0;
    pageSize = 25;
    pageSizeOptions: number[] = [25, 50, 100];
    //   Form
    clientToAdd:any = new Object();
    clientForm: FormGroup;
    clientFormShow:boolean;
    // validation
    submitted:boolean = false;
    uniqueCLientName:any = { unique: true };
    uniqueCLientSlug:any = { unique: true };

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
        this.initClientForm();
        this.clientToAdd.name = '';
        this.clientToAdd.slug = '';
        this.clientFormShow = false;
        this.setClient();
        this.setUser();
        this.getAllClients();
    }
    ngAfterViewInit() {
    }
    initClientForm(){
        this.clientForm = new FormGroup({
            'name': new FormControl('', [Validators.required]),
            'slug': new FormControl('', [Validators.required]),
          });
    }
    toggleAddClientForm(){
        this.clientFormShow = !this.clientFormShow;
        return false;
    }

    generateSlug(name:string):void{
        this.clientToAdd.slug = name.toLowerCase().replace(' ','-');
    }
    verifyUnique(field:any, value:any):boolean{
        var unique = false;
        this.uniqueCLientName.unique = false;
        this.uniqueCLientSlug.unique = false;
        this.clientService.verifyUnique(field, value).subscribe( (res:any) => {
          console.log(res.unique,field);
              if(field =='slug'){
                  this.uniqueCLientSlug.unique = res.unique ;
              } else {
                this.uniqueCLientName.unique = res.unique;
              }
            unique =  res.unique;
        });
        return unique;
    }
    addNewClient(){
        if( this.clientForm.valid){
            let slug = this.clientForm.value.slug;
            let name = this.clientForm.value.name;
            let uniqueCLientSlugUnique = this.verifyUnique('slug', slug) ? true: false;
            let uniqueCLientNameUnique = this.verifyUnique('name', name) ? true: false;
            this.submitted = true;
            if(uniqueCLientNameUnique  && uniqueCLientSlugUnique ){
                let client = JSON.stringify({
                    name:name,
                    slug:slug
                });
                this.clientService.save(client).subscribe( (res:any) => {
                    if(res.id){
                        this.getAllClients();
                        this.clientForm.reset();
                    }
                });
            }
            // this.submitted = false;
        }

        return false;
    }
    getAllClients(){
        this.loadingData = true;
        this.clientService.getAll().subscribe( res => {
            if(res){
                this.clients = res.data;
                this.dataSource = new MatTableDataSource(res.data);
                this.length = res.total;
                this.loadingData = false;
            }
        });
    }
    setUser():void {
        this.subscription = this.userService.currentLoggedInUser.subscribe( (res:any) => { this.auth_user = JSON.parse(res); });
    }
    setClient():void {
        this.subscription = this.userService.currentClient.subscribe(client => { this.auth_client = client;  });
    }

    unixTStoDate(unix_timestamp:any){
        var date = new Date(unix_timestamp*1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return date;
    }

}