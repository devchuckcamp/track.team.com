import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
var ClientGuard = /** @class */ (function () {
    function ClientGuard(router, clientService) {
        this.router = router;
        this.clientService = clientService;
    }
    ClientGuard.prototype.canActivate = function (route, state) {
        var domain = localStorage.getItem('domain');
        if (localStorage.getItem('client') !== null) {
            this.clientService.validate(localStorage.getItem('client')).subscribe(function (res) {
                //localStorage.setItem('authUser',JSON.stringify(res));
            });
            return true;
        }
        this.router.navigate(['/']);
        return false;
    };
    ClientGuard = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router,
            ClientService])
    ], ClientGuard);
    return ClientGuard;
}());
export { ClientGuard };
//# sourceMappingURL=client.js.map