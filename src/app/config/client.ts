import { Injectable, isDevMode } from '@angular/core';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ClientGlobalRoutesService {

    private clientID = 'newclient';
    //private storage = localStorage.getItem('currentUser').json();
    private Bearer:any;
    private clientSecret = "";

    constructor() {
        if(localStorage.getItem("currentUser")){
            this.Bearer = localStorage.getItem("currentUser");
        }



        
        //Development Key
            this.clientSecret = "qQw77McftRqbYgFdFPaohqcBtEGi5Hf0F53kD1HZ";
        //New Key
            //this.clientSecret = "jVHHWF91tuqptHrTkM53Psi0vtPS5hZayNRelJ2v";

        //2nd Key
            //this.clientSecret   =   "cYoSGSGh9CVwemD0uwKeFztSNB9e75v5VbdIRh2f";
        //Production Key
            //this.clientSecret = "MpVC9NbhB3WcoozfvUICL1Mg14ADD7nfQy1eGGuB";
        
    }
    //Client Credentials
    
    getClientKey(){
        var data = JSON.stringify({
            "client_id" :2,
            "client_secret":this.clientSecret,
            "grant_type" : "password",
        })
        return data;
    }
}