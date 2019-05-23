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
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../guard/auth';

const routes:   Routes = [
    {
        path: 'admin/fund',
        redirectTo:'/admin/fund/current',
        pathMatch:'full',
    },
    {
        path: 'admin', component:LayoutComponent,
        canActivate:[AuthGuard],
        children:[
            { path: 'projects',  component:LayoutComponent },
            { path: 'projects/add', component:ProjectNewComponent},
            { path: 'projects/:project_name', loadChildren:'../project/project-detail.module#ProjectDetailModule'},
            { path: 'projects/:project_name/tickets', loadChildren:'../ticket/ticket.module#TicketModule'},
            { path: 'projects/:project_name/tickets/:ticket_id', loadChildren:'../ticket/ticket-detail.module#TicketDetailModule'},
            { path: 'projects/:project_name/members', loadChildren:'../member/member.module#MemberModule'},
            { path: 'projects/:project_name/members/:user_id', loadChildren:'../member/member-detail.module#MemberDetailModule'},
            { path: 'projects/:project_name/settings', component:UnderConstructionComponent},
            { path: 'fund/current', loadChildren:'../fund/fund.module#FundModule'},
            { path: 'fund/incoming', loadChildren:'../fund/fund-incoming.module#FundIncomingModule'},
            { path: 'fund/pending', loadChildren:'../fund/fund-pending.module#FundPendingModule'},
            { path: 'investor', loadChildren:'../investor/investor.module#InvestorModule', },
            { path: 'member', loadChildren:'../member/member.module#MemberModule', },
            { path: 'member/:username', loadChildren:'../member/member-detail.module#MemberDetailModule', },
            { path: 'rollin', loadChildren:'../rollin/rollin.module#RollinModule', },
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