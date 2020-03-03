import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ClientService } from '../service/client.service';
@Injectable()
export class ClientGuard implements CanActivate {

    constructor(
        private router: Router,
        private clientService:ClientService,
        
        ) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let domain = localStorage.getItem('domain');

        if (localStorage.getItem('client') !== null) {
            this.clientService.validate(localStorage.getItem('client')).subscribe( res => {
                //localStorage.setItem('authUser',JSON.stringify(res));
            });
            return true;
        }
        
        this.router.navigate(['/']);
        return false;
    }
}
