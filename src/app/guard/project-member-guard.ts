import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute,ActivatedRouteSnapshot, RouterStateSnapshot, NavigationEnd  } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ProjectService } from '../service/project.service';

import { Observable, Subscription } from 'rxjs';
import { AuthGuard } from './auth';

@Injectable()
export class ProjectMemberGuard implements CanActivate {
    valid:boolean;
    subscription:Subscription;
    constructor(
        private router: Router,
        private authService:AuthService,
        private projectService:ProjectService,
        private _authGuard:AuthGuard,
        private activatedRoute: ActivatedRoute,
        ) {
            this.subscription = this.projectService.currentIsMember.subscribe( (res:any) => {
                this.valid = res  ? true : false ;
            });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.projectService.isMember(route.params['project_name']).subscribe( (res:any) =>{
            if(res){
                this.router.navigate([state.url]);
                return true;
            } else {
                this.projectService.setIsMember(false);
                let client = localStorage.getItem('client');
                this.router.navigate(['/'+client+'/'+'admin']);
            }
        });
        return Promise.resolve(true);

    }
    setValidity():void {
        this.subscription = this.projectService.currentIsMember.subscribe( (res:any) => {
            this.valid = res  ? true : false ;
        });
    }
}
