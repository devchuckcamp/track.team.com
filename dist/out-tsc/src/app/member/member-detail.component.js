import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
var MemberDetailComponent = /** @class */ (function () {
    function MemberDetailComponent(router, http, route, userService, authService) {
        this.router = router;
        this.http = http;
        this.route = route;
        this.userService = userService;
        this.authService = authService;
        this.default_avatar = '../../assets/default-profile.png';
    }
    MemberDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.route.params.subscribe(function (params) {
            var currentUrl = _this.router.url.substring(0, _this.router.url.indexOf('?'));
            if (params['user_id'] !== undefined || currentUrl === '/admin/member') {
                _this.user = {
                    'name': params['username'],
                    'username': params['username']
                };
                _this.initProfile(params['user_id']);
            }
        });
    };
    MemberDetailComponent.prototype.initForm = function () {
        this.userProfileForm = new FormGroup({
            username: new FormControl('', [Validators.required,]),
            email: new FormControl('', [Validators.required, Validators.email]),
            first_name: new FormControl('', [Validators.required,]),
            last_name: new FormControl('', [Validators.required,]),
        });
    };
    MemberDetailComponent.prototype.initProfile = function (id) {
        var _this = this;
        this.auth_user = this.authService.getAuthUser();
        this.authService.getAuthenticatedUserProfile(id).subscribe(function (res) {
            _this.user = res;
            if (_this.user.avatar) {
                _this.user_avatar = _this.user.avatar;
                _this.userAvatar = _this.user.avatar.data;
            }
            else {
                _this.userAvatar = '../../assets/default-profile.png';
            }
            _this.user.user_details = _this.user.user_details;
        });
    };
    MemberDetailComponent.prototype.updateMemberProfile = function () {
        if (this.userProfileForm.valid) {
            console.log('Valid');
        }
        else {
            console.log('Not Valid');
        }
        return false;
    };
    MemberDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-member-detail',
            templateUrl: './member-detail.component.html',
            styleUrls: ['./member-detail.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            HttpClient,
            ActivatedRoute,
            UserService,
            AuthService])
    ], MemberDetailComponent);
    return MemberDetailComponent;
}());
export { MemberDetailComponent };
//# sourceMappingURL=member-detail.component.js.map