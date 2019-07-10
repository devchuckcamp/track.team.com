import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarModule } from '../navbar/navbar.module';
import { LayoutComponent } from './layout.component';
import { ProjectNewComponent } from '../project/project-new.component';
import { UnderConstructionComponent } from '../share/under-construction.component';
import { ActivityLogComponent } from '../share/activity-log.component';
import { ProfileComponent } from '../profile/profile.component';
import { MasterComponent } from '../master/master.component';
import { AuthGuard } from '../guard/auth';
import { MasterGuard } from '../guard/master';
import { NonMasterGuard } from '../guard/non-master';
import { ProjectMemberGuard } from '../guard/project-member-guard';
const routes:   Routes = [
    {
        path: ':auth_client',
        redirectTo:':auth_client/admin',
        pathMatch:'full',
    },
    {
        path: ':auth_client/admin', component:LayoutComponent,
        canActivate:[NonMasterGuard, AuthGuard],
        children:[
            { path: 'projects',  component:LayoutComponent },
            { path: 'projects/add', component:ProjectNewComponent},
            { path: 'projects/:project_name',canActivate:[ProjectMemberGuard], loadChildren:'../project/project-detail.module#ProjectDetailModule'},
            { path: 'projects/:project_name/tickets',canActivate:[ProjectMemberGuard], loadChildren:'../ticket/ticket.module#TicketModule'},
            { path: 'projects/:project_name/tickets/filter', canActivate:[ProjectMemberGuard], loadChildren:'../ticket/ticket.module#TicketModule'},
            { path: 'projects/:project_name/tickets/filter/:filter_type', canActivate:[ProjectMemberGuard], loadChildren:'../ticket/ticket.module#TicketModule'},
            { path: 'projects/:project_name/tickets/filter/:filter_type', canActivate:[ProjectMemberGuard], loadChildren:'../ticket/ticket.module#TicketModule'},
            { path: 'projects/:project_name/tickets/:ticket_id', canActivate:[ProjectMemberGuard], loadChildren:'../ticket/ticket-detail.module#TicketDetailModule'},
            { path: 'projects/:project_name/tickets/filter/:filter_type/:ticket_id', canActivate:[ProjectMemberGuard], loadChildren:'../ticket/ticket-detail.module#TicketDetailModule'},
            { path: 'projects/:project_name/members', canActivate:[ProjectMemberGuard], loadChildren:'../member/member.module#MemberModule'},
            { path: 'projects/:project_name/members/:user_id', canActivate:[ProjectMemberGuard], loadChildren:'../member/member-detail.module#MemberDetailModule'},
            { path: 'projects/:project_name/settings', canActivate:[ProjectMemberGuard], component:UnderConstructionComponent},
            { path: 'projects/:project_name/activity', canActivate:[ProjectMemberGuard], component:ActivityLogComponent},
            { path: 'fund/current', loadChildren:'../fund/fund.module#FundModule'},
            { path: 'fund/incoming', loadChildren:'../fund/fund-incoming.module#FundIncomingModule'},
            { path: 'fund/pending', loadChildren:'../fund/fund-pending.module#FundPendingModule'},
            { path: 'news', loadChildren:'../investor/investor.module#InvestorModule', },
            { path: 'member', loadChildren:'../member/member.module#MemberModule', },
            { path: 'member/:username', loadChildren:'../member/member-detail.module#MemberDetailModule', },
            { path: 'activity', component:ActivityLogComponent,},
            { path: 'activity/:filter', component:ActivityLogComponent,},
            { path: 'profile', component:ProfileComponent},
            { path: 'settings', loadChildren:'../setting/setting.module#SettingModule'},
        ]
    },
];

@NgModule({
    imports:[RouterModule.forRoot(
        routes, 
        // { enableTracing: true }
        )],
    exports:[RouterModule]
})
export class LayoutRoutingModule{}