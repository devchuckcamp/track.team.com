import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundComponent } from './fund.component';

const routes:   Routes = [
    { path: '', component: FundComponent, },
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class FundRoutingModule{}