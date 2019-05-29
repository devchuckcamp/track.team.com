import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var domain = localStorage.getItem('domain');
        if (localStorage.getItem('currentUser') !== null) {
            this.authService.getAuthenticatedUser().subscribe(function (res) {
                localStorage.setItem('authUser', JSON.stringify(res));
            });
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Router,
            AuthService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.js.map