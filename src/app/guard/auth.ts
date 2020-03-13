import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
    returnUrl:any = '';
    constructor(
        private router: Router,
        private authService:AuthService,
        ) {
            this.returnUrl = window.location.href;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let domain = localStorage.getItem('domain');

        if (localStorage.getItem('currentUser') !== null) {
            this.authService.profile.subscribe( res => {
                localStorage.setItem('authUser',JSON.stringify(res));
            });
            return true;
        } else {
            localStorage.setItem('returnUrl',JSON.stringify({url:this.returnUrl}));
        }
        
        this.router.navigate(['/login']);
        return false;
    }
}
