import * as io from 'socket.io-client';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { GlobalRoutesService } from '../config/config';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private url = 'http://localhost:3000';
    private socket;
    private Bearer:any;
    private apiEndpoint:string;
    constructor(
        private http: HttpClient,
        private config: GlobalRoutesService,
    ) {
        this.apiEndpoint = this.config.apiEndPoint();
        if(localStorage.getItem("currentUser")){
            this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
        }
        this.socket = io(this.url, {query:"token="+this.Bearer});
    }

    public getMessagesOnload = (project_id:any, per_page:number = 5) => {
        return this.http.get(this.apiEndpoint+'/api/v1/project-thread?project_id='+project_id+'&per_page='+per_page, this.authHeaders()).pipe(map( (res:any) => res)); 
    }
    public sendMessage(message:any, project_id:any) {
        this.socket = io(this.url, {query:"token="+this.Bearer+"&project_id="+project_id});
        this.socket.emit('chat-message-'+project_id, message);
    }

    public getMessages = (project_id:any) => {
        return Observable.create((observer) => {
            this.socket.on('chat-message-'+project_id, (message) => {
                observer.next(message);
            });
        });
    }

    public getTyping = () => {
        return Observable.create((observer) => {
            this.socket.on('typing', (message) => {
                observer.next(message);
            });
        });
    }

    private headers() {
        let headers = new HttpHeaders({
            'Content-Type':  'application/json',
            'Accept':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow':'GET,POST,PUT,DELETE,OPTION'
          })
        let options = { headers: headers };
        return options;
    }
    private authHeaders() {
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
}