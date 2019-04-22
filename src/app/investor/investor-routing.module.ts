import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorComponent } from './investor.component';

const routes:   Routes = [
    { path: '', component: InvestorComponent },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class InvestorRoutingModule{}