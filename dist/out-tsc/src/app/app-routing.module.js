import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ClientGuard } from './guard/client';
var routes = [
    { path: 'investor', loadChildren: './investor/investor.module#InvestorModule' },
    {
        path: '', component: HomeComponent,
        children: [
            {
                path: 'home', component: HomeComponent,
            },
        ]
    },
    {
        path: 'account/activation',
        redirectTo: 'account/token',
        pathMatch: 'full',
    },
    {
        path: 'account/activation/token/:account_token', loadChildren: './external-page/account/create-account.module#CreateAccountModule'
    },
    {
        path: 'login', component: LoginComponent,
        canActivate: [ClientGuard],
    },
    {
        path: 'register', component: RegisterComponent,
    },
    {
        path: '', component: HomeComponent,
        children: [
            {
                path: 'home', component: HomeComponent,
            },
        ]
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { useHash: true }
                // { enableTracing: true }
                )],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map