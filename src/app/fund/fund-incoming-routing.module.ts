import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundIncomingComponent } from './fund-incoming.component';

const routes:   Routes = [
    { path: '', component: FundIncomingComponent, },
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class FundIncomingRoutingModule{}