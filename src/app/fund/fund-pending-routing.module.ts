import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundPendingComponent } from './fund-pending.component';

const routes:   Routes = [
    { path: '', component: FundPendingComponent, },
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class FundPendingRoutingModule{}