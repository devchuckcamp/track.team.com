import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { MemberDetailComponent } from './member-detail.component';
import { MemberDetailRoutingModule } from './member-detail-routing.module';
import { UserService } from '../service/user.service';
import { ClientGlobalRoutesService } from '../config/client';
import { GlobalRoutesService } from '../config/config';

@NgModule({
  declarations: [
    MemberDetailComponent,
  ],
  imports: [
    CommonModule,
    MemberDetailRoutingModule,
  ],
  providers:[
    GlobalRoutesService,
    ClientGlobalRoutesService,
    UserService,
    HttpClient,
  ]

})
export class MemberDetailModule{ }
