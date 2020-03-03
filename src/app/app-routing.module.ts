import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './guard/auth';
import { ClientGuard } from './guard/client';
import { MasterGuard } from './guard/master';
// External Pages
import { CreateAccountComponent } from './external-page/account/create-account.component';

const routes:   Routes = [
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
        path: 'account/activation/token/:account_token', loadChildren:'./external-page/account/create-account.module#CreateAccountModule'
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
    {
        path: 'master', canActivate:[MasterGuard,AuthGuard], loadChildren:'./master/master.module#MasterModule',
    },
];

@NgModule({
    imports:[RouterModule.forRoot(
        routes, { useHash: true,
            
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled'
            
        }
        // { enableTracing: true }
        )],
    exports:[RouterModule],
    providers:[
        {
            provide: 'MasterGuard',
            useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
        },
        {
            provide: 'NonMasterGuard',
            useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
          }
    ]
})
export class AppRoutingModule{}