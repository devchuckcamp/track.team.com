import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RollinComponent } from './rollin.component';

const routes:   Routes = [
    { path: '', component: RollinComponent },

];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RollinRoutingModule{}