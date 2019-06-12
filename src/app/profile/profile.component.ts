import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
import { ProjectService } from '../service/project.service';
import { User } from '../model/user';
import { Ticket } from '../model/ticket';
import { Thread } from '../model/thread';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable, throwError, Subject, Subscription } from 'rxjs';

export interface Auth_User {
  id: number;
  username: string;
  email: string;
  name: string;
  role_id: number;
  user_details: any;
  user_avatar:any;
  projects: Array<any>;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  auth_user_basic:any;
  auth_user:any;
  auth_user_details:any;
  user_avatar:any = {};
  userAvatar:any;
  fileType:any;
  default_avatar = '../../assets/default-profile.png';
  // Form
  userProfileForm: FormGroup;
  subsription:Subscription;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  constructor(
    private authService:AuthService,
    private userService:UserService,
    private snackBar:MatSnackBar,
  ) {
    this.initProfile();
  }

  ngOnInit() {
    this.initForm();
    this.userService.currentAvatar.subscribe(avatar => {
      this.userAvatar = avatar;
    });
  }

  ngAfterViewInit(){

  }

  initProfile():void{

    this.auth_user_basic = this.authService.getAuthUser();
    this.authService.getAuthenticatedUserProfile(this.auth_user_basic.id).subscribe(res=>{
      this.auth_user = res;

      if(!localStorage.getItem('avatar') && this.auth_user.avatar){
        this.user_avatar = this.auth_user.avatar;
        this.updateAvatar(this.auth_user.avatar.data);
        // this.userAvatar = this.user_avatar.data;
      } else {
        this.userAvatar = localStorage.getItem('avatar');
      }
    });
  }

  initForm():void{
    this.userProfileForm = new FormGroup({
      username: new FormControl( '',[Validators.required,]),
      email: new FormControl( '',[Validators.required,Validators.email]),
      first_name: new FormControl( '',[Validators.required,]),
      last_name: new FormControl( '',[Validators.required,]),
    });
  }

  updateProfile(){

    if (this.userProfileForm.valid) {
      let info = {
        first_name: this.userProfileForm.value.first_name,
        last_name: this.userProfileForm.value.last_name,
      };
      this.userService.updateUserDetail(info, this.auth_user.user_details.id).subscribe(res => {
        if (res) {
          this.userService
          localStorage.removeItem('avatar');
          if(this.userAvatar){
            localStorage.setItem('avatar',  this.userAvatar);
          }
          this.auth_user.user_details = res;
          this.updateUserDetail(this.auth_user);
          let avatar = {
            data: this.userAvatar,
          };

          if (this.user_avatar.id) {
            this.userService.updateAvatar(avatar, this.user_avatar.id).subscribe(res => {
              this.updateAvatar(this.userAvatar);
              this.toast('Profile has been updated!');
              this.auth_user.avatar = res;
            });
          } else {
            this.userService.uploadAvatar(avatar).subscribe(res => {
              this.updateAvatar(this.userAvatar);
              this.toast('Profile has been save!');
              this.user_avatar = res;
            });
          }
        }
      });
    } else {
      this.toast('Form validation is failed!');
    }
    return false;
  }
  updateUserDetail(user:any){
    this.userService.setUser(JSON.stringify(user));
    localStorage.setItem('authUser',  JSON.stringify(user));
    this.userService.currentLoggedInUser = user;
  }
  updateAvatar(avtr:any){
    this.userService.setAvatar(avtr);
    this.user_avatar.data = avtr;
    this.userAvatar = avtr;
    this.userService.currentAvatar = this.userAvatar;
  }

  public files: UploadFile[] = [];

  getFileType(){
    return this.fileType;
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    let base64textString = '';
    base64textString= btoa(binaryString);
    this.userAvatar = 'data:'+this.getFileType()+';base64,'+btoa(binaryString);
    return base64textString;
  }

  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
      this.fileType = file.type;
    if (files && file) {
        var reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }

  toast(message:string){
    this.snackBar.open(message, 'X', {
        duration: 5000,
        direction: "ltr",
        verticalPosition:"top",
        horizontalPosition: "right",
        panelClass: "success-snack"
      }
    );
  }

}
