import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})


export class MemberDetailComponent implements OnInit {
  user:any;
  auth_user:any;
  user_avatar:any;
  userAvatar:any;
  default_avatar = '../../assets/default-profile.png';
  users : User[];
  userProfileForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService:UserService,
    private authService:AuthService,
) {
}

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe(params => {
      let currentUrl = this.router.url.substring(0, this.router.url.indexOf('?'));

      if (params['user_id'] !== undefined || currentUrl === '/admin/member') {
        this.user = {
          'name':params['username'],
          'username' : params['username']
        }
        this.initProfile(params['user_id']);
      }
    });
  }

  initForm(){
    this.userProfileForm = new FormGroup({
      username: new FormControl( '',[Validators.required,]),
      email: new FormControl( '',[Validators.required,Validators.email]),
      first_name: new FormControl( '',[Validators.required,]),
      last_name: new FormControl( '',[Validators.required,]),
    });
  }

  initProfile(id:number):void{
    this.auth_user = this.authService.getAuthUser();

    this.authService.getAuthenticatedUserProfile(id).subscribe(res => {
      this.user = res;
      if(this.user.avatar){
        this.user_avatar = this.user.avatar;
        this.userAvatar = this.user.avatar.data;
      } else {
        this.userAvatar = '../../assets/default-profile.png';
      }
      this.user.user_details = this.user.user_details;
    });
  }

  updateMemberProfile(){
    if(this.userProfileForm.valid){
      console.log('Valid');
    } else {
      console.log('Not Valid');
    }

    return false;
  }

}
