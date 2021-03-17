import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';

import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { map, take } from 'rxjs/operators';
import { Thread } from '../model/thread';
import { GlobalRoutesService } from '../config/config';

interface ApiUploadResult {
    url: string;
}
 
export interface UploadResult {
    name: string;
    type: string;
    size: number;
    url: string;
}

@Injectable({ providedIn: 'root' })
export class ThreadService {
    apiEndpoint:string;
    Bearer:any;

    constructor(
        private config: GlobalRoutesService,
        private http: HttpClient,
        ) {
            this.apiEndpoint = this.config.apiEndPoint();
            if(localStorage.getItem("currentUser")){
                this.Bearer = JSON.parse(localStorage.getItem("currentUser")).access_token;
            }
        }

    getAll() {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets', this.jt()).pipe(map( (res:any) => res));
    }
    getProjectTicketAll(project_name: string){
        return this.http.get(this.config.apiEndPoint()+'/api/v1/tickets?project='+project_name, this.jt()).pipe(map( (res:any) => res));
    }
    getTicket(id: number) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/thread/'+id, this.jt()).pipe(map( (res:any) => res));
    }
    getAllTicketThread(ticket_id: number) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/thread?ticket='+ticket_id, this.jt()).pipe(map( (res:any) => res));
    }
    pageTicketThread(ticket_id: number, per_page:number =5, page = 1) {
        return this.http.get(this.config.apiEndPoint()+'/api/v1/thread?ticket='+ticket_id+'&per_page='+per_page+'&page='+page, this.jt()).pipe(map( (res:any) => res));
    }
    send(thread: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/thread', thread, this.fileHeader());
    }

    update(ticket: Thread) {
        return this.http.put(this.config.apiEndPoint()+'/api/v1/tickets/ticket.id', ticket);
    }

    delete(id: number) {
        return this.http.delete(this.config.apiEndPoint()+'/tickets/id');
    }
    getImage(thread_id:number){
        return this.http.get('https://homestead.test/uploads/thread/admin.PNG');
    }

    uploadImage(file:any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/thread-file', file, this.fileHeader());
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
    private fileHeader() {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer '+this.Bearer,
            'Enctype': 'multipart/form-data',
            'Access-Control-Allow-Origin':'*',
            'Allow_Headers':' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow':'GET,POST,PUT,DELETE,OPTION'
          })
        let options = { headers: headers };
        return options;
    }   
    
    uploadThreadFile(thread: any) {
        return this.http.post(this.config.apiEndPoint()+'/api/v1/thread/image/upload', thread, this.fileHeader());
    }

      // ---
    // PUBLIC METHODS.
    // ---
 
    // I upload the given file to the remote server. Returns a Promise.
    public async uploadFile( file: File ) : Promise<UploadResult> {
 
        var result = await this.http
            .post<ApiUploadResult>(
                'https://homestead.test/api/v1/thread/image/upload',
                file, // Send the File Blob as the POST body.
                {
                    // NOTE: Because we are posting a Blob (File is a specialized Blob
                    // object) as the POST body, we have to include the Content-Type
                    // header. If we don't, the server will try to parse the body as
                    // plain text.
                    headers: {
                        "Content-Type": file.type
                    },
                    params: {
                        clientFilename: file.name,
                        mimeType: file.type
                    }
                }
            )
            .toPromise()
        ;
 
        return({
            name: file.name,
            type: file.type,
            size: file.size,
            url: result.url
        });
 
    }
}