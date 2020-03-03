import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth';
@Injectable()
export class NonMasterGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService:AuthService,
        private _authGuard:AuthGuard,
        ) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let domain = localStorage.getItem('domain');
        let valid:any;

        let auth = this._authGuard.canActivate(route, state);

        if (auth && localStorage.getItem('authUser')) {
            let user = JSON.parse(localStorage.getItem('authUser'));
            let client = localStorage.getItem('client');
            if (user.role_id !== 9001) {
                return Promise.resolve(true);
            } else {
                //return Promise.resolve(false);
                this.router.navigate(['master']);
            }
        }
    }
}
