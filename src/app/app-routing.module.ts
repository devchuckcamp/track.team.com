import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes:   Routes = [
    { path: 'investor', loadChildren:'./investor/investor.module#InvestorModule'},
    {
        path: '', component: HomeComponent,
        children:[
            {
                path: 'home', component: HomeComponent,
            },
        ]
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path: 'register', component: RegisterComponent,
    },
    {
        path: '', component: HomeComponent,
        children:[
            {
                path: 'home', component: HomeComponent,
            },
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
export class AppRoutingModule{}