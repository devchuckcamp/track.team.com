import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})


export class MemberDetailComponent implements OnInit {
  user:any;
  users : User[];
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService:UserService,
) {

}

  ngOnInit() {

    this.route.params.subscribe(params => {
      let currentUrl = this.router.url.substring(0, this.router.url.indexOf('?'));

      if (params['username'] !== undefined || currentUrl === '/admin/member') {
        this.user = {
          'name':params['username'],
          'username' : params['username']
        }
        this.userService.getById(params['username']).subscribe(res => {
          console.log(res,'Users');
          this.user = res;
        });
      }

    });
  }

}
