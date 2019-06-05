import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientGuard } from './guard/client';
// External Pages
import { CreateAccountComponent } from './external-page/account/create-account.component';

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
        path: 'account/activation',
        redirectTo:'account/token',
        pathMatch:'full',
    },
    {
        path: 'account/activation/token/:account_token', component:CreateAccountComponent,
    },
    {
        path: 'login', component: LoginComponent,
        canActivate:[ClientGuard],
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
        routes, { useHash: true }
        // { enableTracing: true }
        )],
    exports:[RouterModule]
})
export class AppRoutingModule{}