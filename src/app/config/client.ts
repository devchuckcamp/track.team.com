import { Injectable, isDevMode } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ClientGlobalRoutesService {

    //private clientID = 'newclient';
    //private storage = localStorage.getItem('currentUser').json();
    private Bearer:any;
    private clientSecret = "";
    private clientID:number = 0;

    constructor() {
        if(localStorage.getItem("currentUser")){
            this.Bearer = localStorage.getItem("currentUser");
        }


        
        //Development Client ID
            //this.clientID = 6;
        //Production Production
            this.clientID = 2;
        
        //Development Key 
           //this.clientSecret = "cxRsFvBb9NSocKZsan6fjDPTs6NRyTe7t9YUGxHE";
        //Production Key
            this.clientSecret = "qQw77McftRqbYgFdFPaohqcBtEGi5Hf0F53kD1HZ";

        //2nd Key 
            //this.clientSecret   =   "cYoSGSGh9CVwemD0uwKeFztSNB9e75v5VbdIRh2f";
        //Production Key
            //this.clientSecret = "MpVC9NbhB3WcoozfvUICL1Mg14ADD7nfQy1eGGuB";
        
    }
    //Client Credentials
    
    getClientKey(){
        var data = JSON.stringify({
            "client_id" :this.clientID,
            "client_secret":this.clientSecret,
            "grant_type" : "password",
        })
        return data;
    }
}