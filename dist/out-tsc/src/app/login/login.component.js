import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, userService, clientService) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.clientService = clientService;
        this.loading = false;
        this.submitted = false;
        this.subscription = this.clientService.currentClient.subscribe(function (client) { _this.client = client; });
        //redirect to home if already logged in
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (localStorage.getItem('currentUser') && this.authenticationService.Bearer !== '') {
            this.router.navigate([this.returnUrl ? this.returnUrl == '/' ? 'admin' : '/' : '/admin']);
        }
        if (localStorage.getItem('client')) {
            this.auth_client = localStorage.setItem('client', 'sos');
            this.clientService.validate(this.auth_client).subscribe(function (res) {
                _this.client = res;
                _this.clientService.setClient(res);
                _this.auth_client = _this.client.slug;
            }, function (error) {
                console.log('error:' + error);
            });
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.loginAuth(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(function (data) {
            var user_id;
            localStorage.setItem('currentUser', JSON.stringify(data));
            _this.authenticationService.getAuthenticatedUser().subscribe(function (res) {
                localStorage.setItem('authUser', JSON.stringify(res));
                localStorage.setItem('csrf_token', JSON.stringify({ 'token': 'lkcc371220183d' }));
                user_id = JSON.parse(localStorage.getItem('authUser')).id;
                _this.authenticationService.getAuthenticatedUserProfile(user_id).subscribe(function (response) {
                    _this.avatar = response;
                    if (_this.avatar.avatar !== null) {
                        localStorage.setItem('avatar', _this.avatar.avatar.data);
                    }
                    var auth_client = '';
                    _this.loading = false;
                    if (!_this.auth_client) {
                        auth_client = localStorage.getItem('client');
                    }
                    if (data.access_token && !_this.loading) {
                        // this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? 'admin': '/' : '/admin']);
                        window.location.href = auth_client + '/admin';
                    }
                });
            });
        }, function (error) {
            // this.alertService.error(error);
            _this.loading = false;
        });
        return false;
    };
    LoginComponent = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            ActivatedRoute,
            Router,
            AuthService,
            UserService,
            ClientService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map