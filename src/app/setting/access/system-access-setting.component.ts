import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingService } from '../../service/setting.service';

import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { MetaService } from '../../service/meta.service';


import {MatPaginator, MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import {ErrorStateMatcher} from '@angular/material';
import { Observable, Subscription  } from 'rxjs';
import { ConfirmDeleteDialog } from '../../share/alert/confirm-delete-dialog.component';
import * as _ from 'lodash';

const ELEMENT_DATA: User[] = [];
const projectsInvitationList: Array<number> = [];


/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'system-access-setting',
  templateUrl: './system-access-setting.component.html',
  styleUrls: ['../setting.component.scss']
})

export class SystemAccessSettingComponent implements OnInit {
    currentAutHUser:any;
    authenticatedUser:any;

    settings:any[] = [];
    step:number;
    // Option Initiators
    users:User[] = [];
    auth:any;
    client_slug:any;
     // MatPaginator Inputs
    displayedColumns: string[] = ['avatar', 'username', 'first_name', 'last_name', 'email', 'action'];
    length = 0;
    pageSize = 25;
    per_page = 25;
    pageSizeOptions: number[] = [25, 50, 100];
    // Form
    errorMatcher = new CrossFieldErrorMatcher();
    memberFormShow:boolean;
    memberInviteFormShow:boolean = false;
    showMemberSearchForm:boolean;
    memberForm: FormGroup;
    memberInviteForm: FormGroup;
    memberToAdd:any =  {};
    memberToInvite:any =  {};
    dialogRef: MatDialogRef<ConfirmDeleteDialog>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

    default_avatar = '../../assets/default-profile.png';
    loading = '../../../assets/icon/loading.gif';
    constructor(
        private settingService:SettingService,
        private userService:UserService,
        private authService:AuthService,
        private metaService:MetaService,
        private snackBar: MatSnackBar,
    ) {
        this.step = 0;
    }

    ngOnInit() {
        this.currentAutHUser =  this.authService.currentLocalAuthenticatedUser();
        this.authService.currentAuthenticatedUser().subscribe((res:any) =>{
        this.authenticatedUser = res;
        if(_.isEqual(this.currentAutHUser, this.authenticatedUser)){

            } else {
            }
        });
        this.client_slug = localStorage.getItem('client');
        this.auth = this.authService.getAuthUser();
        this.getUsers();
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }
    getUsers(){
        this.userService.getClientUsers(this.client_slug).subscribe((res:any)=>{
            this.users = res.data;
            this.dataSource = new MatTableDataSource(res.data);
            this.length = res.total;
            this.dataSource.paginator = this.paginator;
        });
    }
    prevStep() {
        this.step--;
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      }
      //Pagination Section
      onPageChange(event) {
        this.per_page = event.pageSize;
        this.userService.getClientUsers(this.client_slug,event.pageIndex+1,event.pageSize).subscribe((res:any)=>{
            this.users = res.data;
            this.dataSource = new MatTableDataSource(res.data);
            this.length = res.total;
            this.dataSource.paginator = this.paginator;
        });
        // alert(JSON.stringify("Current page index: " + event.pageIndex));
        //   this.currentPage = event.pageIndex+1;
        //    console.log(event,'event');
        //    this.per_page = event.pageSize;
        //    // this.config.currentPage = number;
        //    // this.getDoctors(number);
        //  this.filter = this.filter !== null ? this.filter : "";

        //  this.userService.getEmployees(event.pageIndex+1, event.pageSize, this.filter).subscribe( 
        //    (res)  =>  {
        //      console.log(res,'new employee list');
        //      this.length = res.total;
        //      this.employees = res.data;
        //      this.dataSource = new MatTableDataSource(res.data);

        //      this.loading =  false;
        //    },
        //    (err)  =>  {
        //      console.log("Error:"+err.status);
        //    }
        //    );
      }

    toggleActiveCrudAccess(user_id:any, event, metaid){
        let meta_value = event ? 1 : 0;
        this.metaService.updateMetaValue(metaid,meta_value).subscribe((res:any)=>{
            console.log(res);
            this.snackBar.open('Access has been updated', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "success-snack"
            });
        });
    }

}
