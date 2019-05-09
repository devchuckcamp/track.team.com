import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auth_user_basic:any;
  auth_user:any;

  constructor(
    private authService:AuthService,
    private userService:UserService,
  ) {
    this.auth_user_basic = this.authService.getAuthUser();
    this.authService.getAuthenticatedUserProfile(this.auth_user_basic.id).subscribe(res=>{
      console.log('profile id:', res);
      this.auth_user_basic = res;
    });
  }

  ngOnInit() {

  }

}
