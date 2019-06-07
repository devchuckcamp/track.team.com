import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProjectNewComponent } from '../project/project-new.component';
import { UnderConstructionComponent } from '../share/under-construction.component';
import { ActivityLogComponent } from '../share/activity-log.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../guard/auth';
var routes = [
    {
        path: 'admin/fund',
        redirectTo: '/admin/fund/current',
        pathMatch: 'full',
    },
    {
        path: ':auth_client',
        redirectTo: ':auth_client/admin',
        pathMatch: 'full',
    },
    {
        path: ':auth_client/admin', component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'projects', component: LayoutComponent },
            { path: 'projects/add', component: ProjectNewComponent },
            { path: 'projects/:project_name', loadChildren: '../project/project-detail.module#ProjectDetailModule' },
            { path: 'projects/:project_name/tickets', loadChildren: '../ticket/ticket.module#TicketModule' },
            { path: 'projects/:project_name/tickets/filter', loadChildren: '../ticket/ticket.module#TicketModule' },
            { path: 'projects/:project_name/tickets/filter/:filter_type', loadChildren: '../ticket/ticket.module#TicketModule' },
            { path: 'projects/:project_name/tickets/filter/:filter_type', loadChildren: '../ticket/ticket.module#TicketModule' },
            { path: 'projects/:project_name/tickets/:ticket_id', loadChildren: '../ticket/ticket-detail.module#TicketDetailModule' },
            { path: 'projects/:project_name/tickets/filter/:filter_type/:ticket_id', loadChildren: '../ticket/ticket-detail.module#TicketDetailModule' },
            { path: 'projects/:project_name/members', loadChildren: '../member/member.module#MemberModule' },
            { path: 'projects/:project_name/members/:user_id', loadChildren: '../member/member-detail.module#MemberDetailModule' },
            { path: 'projects/:project_name/settings', component: UnderConstructionComponent },
            { path: 'projects/:project_name/activity', component: ActivityLogComponent },
            { path: 'fund/current', loadChildren: '../fund/fund.module#FundModule' },
            { path: 'fund/incoming', loadChildren: '../fund/fund-incoming.module#FundIncomingModule' },
            { path: 'fund/pending', loadChildren: '../fund/fund-pending.module#FundPendingModule' },
            { path: 'news', loadChildren: '../investor/investor.module#InvestorModule', },
            { path: 'member', loadChildren: '../member/member.module#MemberModule', },
            { path: 'member/:username', loadChildren: '../member/member-detail.module#MemberDetailModule', },
            { path: 'activity', component: ActivityLogComponent, },
            { path: 'activity/:filter', component: ActivityLogComponent, },
            { path: 'profile', component: ProfileComponent },
            { path: 'settings', loadChildren: '../setting/setting.module#SettingModule' },
        ]
    },
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
export { LayoutRoutingModule };
//# sourceMappingURL=layout-routing.module.js.map