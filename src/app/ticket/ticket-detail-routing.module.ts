import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketDetailComponent } from './ticket-detail.component';

const routes:   Routes = [
    { path: '', component: TicketDetailComponent },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class TicketDetailRoutingModule{}