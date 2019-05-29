import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService:AuthService,
        
        ) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let domain = localStorage.getItem('domain');

        if (localStorage.getItem('currentUser') !== null) {
            this.authService.getAuthenticatedUser().subscribe( res => {
                localStorage.setItem('authUser',JSON.stringify(res));
            });
            return true;
        }
        
        this.router.navigate(['/login']);
        return false;
    }
}
