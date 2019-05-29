import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var ClientGlobalRoutesService = /** @class */ (function () {
    function ClientGlobalRoutesService() {
        this.clientID = 'newclient';
        this.clientSecret = "";
        if (localStorage.getItem("currentUser")) {
            this.Bearer = localStorage.getItem("currentUser");
        }
        //Development Key
        this.clientSecret = "qQw77McftRqbYgFdFPaohqcBtEGi5Hf0F53kD1HZ";
        //Production Key
        //this.clientSecret = "daQUm35rekLrDeRoMdlTCyjbrOrTHvoev107mhdO";
        //2nd Key
        //this.clientSecret   =   "cYoSGSGh9CVwemD0uwKeFztSNB9e75v5VbdIRh2f";
        //Production Key
        //this.clientSecret = "MpVC9NbhB3WcoozfvUICL1Mg14ADD7nfQy1eGGuB";
    }
    //Client Credentials
    ClientGlobalRoutesService.prototype.getClientKey = function () {
        var data = JSON.stringify({
            "client_id": 2,
            "client_secret": this.clientSecret,
            "grant_type": "password",
        });
        return data;
    };
    ClientGlobalRoutesService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ClientGlobalRoutesService);
    return ClientGlobalRoutesService;
}());
export { ClientGlobalRoutesService };
//# sourceMappingURL=client.js.map