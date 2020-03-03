import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master.component';
import { MasterClientComponent } from './pages/master-client.component';
import { MasterGuard } from '../guard/master';
import { AuthGuard } from '../guard/auth';
const routes:   Routes = [
    { path: '',
    component: MasterComponent,
    children:[
        {
            path: 'clients', component: MasterClientComponent,
        },
        {
            path: 'clients/:slug', component: MasterClientComponent,
        },
        {
            path: 'clients/:slug/projects', component: MasterClientComponent,
        },
        {
            path: 'clients/:slug/projects/tickets', component: MasterClientComponent,
        },
        {
            path: 'clients/:slug/projects/members', component: MasterClientComponent,
        },
    ]
    },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class MasterRoutingModule{}