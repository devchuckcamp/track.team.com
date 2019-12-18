import * as io from 'socket.io-client';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class MenuService {
    sideBarMenuStatus =  new BehaviorSubject(1);
    currentSideBarMenu = this.sideBarMenuStatus.asObservable();
    constructor(
        private http: HttpClient,
        private config: GlobalRoutesService,
    ) {
       
    }

    toggleSideBarMenu(status:number){
        this.sideBarMenuStatus.next(status);
    }

    setAvatar(status:number){
        this.sideBarMenuStatus.next(status);
    }
}