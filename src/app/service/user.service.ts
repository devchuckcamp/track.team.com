import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { User } from '../model/user';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class UserService {
    apiEndpoint:string;
    Bearer:any;
    // Logged in user avatar
    Avatar =  new BehaviorSubject(localStorage.getItem("avatar"));
    currentAvatar = this.Avatar.asObservable();
    // Logged in user info
    loggedInUser =  new BehaviorSubject(<any>{});
    currentLoggedInUser = this.loggedInUser.asObservable();
    // Client Info
    client_slug =  new BehaviorSubject(localStorage.getItem("client"));
    currentClient = this.client_slug.asObservable();
    client_info =  new BehaviorSubject(localStorage.getItem("client_info"));
    currentClientInfo = this.client_info.asObservable();
    
    constructor(
        private config: GlobalRoutesService,
        private http: HttpClient,
        ) {
            this.apiEndpoint = this.config.apiEndPoint();
            if(localStorage.getItem("currentUser")){
                this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
            }
            // if(localStorage.getItem("client_info")){
            //     this.client_info = JSON.parse(localStorage.getItem("client_info"));
            // }
            // if(localStorage.getItem("authUser")){
            //     this.currentLoggedInUser = JSON.parse(localStorage.getItem("authUser"));
            // }
    }
    setClientInfo(client:any){
        this.client_info.next(client);
    }

    clearClientInfo(){
        this.client_info.complete();
    }
    setClient(client:string){
        this.client_slug.next(client);
    }

    clearClient(){
        this.client_slug.complete();
    }

    setAvatar(avatar:string){
        this.Avatar.next(avatar);
    }

    clearAvatar(){
        this.Avatar.complete();
    }

    setUser(user:any){
        this.loggedInUser.next(user);
    }

    clearUser(){
        this.loggedInUser.complete();
    }

    validateAccountToken(token:string){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/validate/account/token?token='+token);
    }
    loginAuth (username:string,password:string): Observable<any> {
            var body = JSON.stringify({
                username:username,
                password:password
            });
            return this.http.post<any>(this.apiEndpoint+'/api/v1/authenticate', body, this.jt())
              .pipe(
                retry(2),
                catchError(this.config.handleError)
              );
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.config.apiEndPoint()+'/users');
    }

    getById(id: number) {
        return this.http.get<User>(this.config.apiEndPoint()+'/users/'+id, this.jt());
    }

    save(user: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/users', user, this.jt());
    }
    unAuthSave(user:any, token:any = null){

        return this.http.post(this.config.apiEndPoint()+'/api/v1/account/users', user, this.AuthToken(token));
    }
    saveinfo(user_details: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/users/details', user_details, this.jt());
    }
    unAuthSaveinfo(user_details: any, token:any = null) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/account/users/details', user_details, this.AuthToken(token));
    }
    update(user: any, id:any = null) {
        let data = JSON.stringify(user);
        return this.http.put(this.config.apiEndPoint()+'/api/v1/users/details/'+id, data, this.jt());
    }
    updateUserDetail(info: any, id:any = null) {
        let data = JSON.stringify(info);
        return this.http.put(this.config.apiEndPoint()+'/api/v1/users/details/'+id, data, this.jt());
    }


    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/users/id');
    }

    uploadAvatar(data:any): Observable<any>{
        let avatar = JSON.stringify(data);
        this.currentAvatar = data;
        return this.http.post(this.config.apiEndPoint()+'/api/v1/users/avatar', avatar, this.jt());
    }

    updateAvatar(data:any, id:number): Observable<any>{
        let avatar = JSON.stringify(data);
        this.currentAvatar = data;
        return this.http.put(this.config.apiEndPoint()+'/api/v1/users/avatar/'+id, avatar, this.jt());
    }
    verifyUniqueUsername(username:string){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/validate/user/unique/username?username='+username );
    }
    private jt() {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer '+this.Bearer,
            'Content-Type':  'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow':'GET,POST,PUT,DELETE,OPTION'
          })
        let options = { headers: headers };
        return options;
    }

    private AuthToken(token:any) {
        let headers = new HttpHeaders({
            'AuthToken': token,
            'Content-Type':  'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow':'GET,POST,PUT,DELETE,OPTION'
          })
        let options = { headers: headers };
        return options;
    }
}