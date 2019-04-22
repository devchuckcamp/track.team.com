import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MemberDetailComponent } from './member-detail.component';

const routes:   Routes = [
    { path: '', component: MemberDetailComponent },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MemberDetailRoutingModule{}