import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(authService, userService, snackBar) {
        this.authService = authService;
        this.userService = userService;
        this.snackBar = snackBar;
        this.user_avatar = {};
        this.default_avatar = '../../assets/default-profile.png';
        this.files = [];
        this.initProfile();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.userService.currentAvatar.subscribe(function (avatar) {
            _this.userAvatar = avatar;
        });
    };
    ProfileComponent.prototype.ngAfterViewInit = function () {
    };
    ProfileComponent.prototype.initProfile = function () {
        var _this = this;
        this.auth_user_basic = this.authService.getAuthUser();
        this.authService.getAuthenticatedUserProfile(this.auth_user_basic.id).subscribe(function (res) {
            _this.auth_user = res;
            if (!localStorage.getItem('avatar') && _this.auth_user.avatar) {
                _this.user_avatar = _this.auth_user.avatar;
                _this.updateAvatar(_this.auth_user.avatar.data);
                // this.userAvatar = this.user_avatar.data;
            }
            else {
                _this.userAvatar = localStorage.getItem('avatar');
            }
        });
    };
    ProfileComponent.prototype.initForm = function () {
        this.userProfileForm = new FormGroup({
            username: new FormControl('', [Validators.required,]),
            email: new FormControl('', [Validators.required, Validators.email]),
            first_name: new FormControl('', [Validators.required,]),
            last_name: new FormControl('', [Validators.required,]),
        });
    };
    ProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        if (this.userProfileForm.valid) {
            var info = {
                first_name: this.userProfileForm.value.first_name,
                last_name: this.userProfileForm.value.last_name,
            };
            this.userService.updateUserDetail(info, this.auth_user.user_details.id).subscribe(function (res) {
                if (res) {
                    localStorage.removeItem('avatar');
                    localStorage.setItem('avatar', _this.userAvatar);
                    _this.auth_user.user_details = res;
                    var avatar = {
                        data: _this.userAvatar,
                    };
                    if (_this.user_avatar.id) {
                        _this.userService.updateAvatar(avatar, _this.user_avatar.id).subscribe(function (res) {
                            _this.updateAvatar(_this.userAvatar);
                            _this.toast('Profile has been updated!');
                            _this.auth_user.avatar = res;
                        });
                    }
                    else {
                        _this.userService.uploadAvatar(avatar).subscribe(function (res) {
                            _this.updateAvatar(_this.userAvatar);
                            _this.toast('Profile has been save!');
                            _this.user_avatar = res;
                        });
                    }
                }
            });
        }
        else {
            this.toast('Form validation is failed!');
        }
        return false;
    };
    ProfileComponent.prototype.updateAvatar = function (avtr) {
        this.userService.setAvatar(avtr);
        this.user_avatar.data = avtr;
        this.userAvatar = avtr;
        this.userService.currentAvatar = this.userAvatar;
    };
    ProfileComponent.prototype.getFileType = function () {
        return this.fileType;
    };
    ProfileComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        var base64textString = '';
        base64textString = btoa(binaryString);
        this.userAvatar = 'data:' + this.getFileType() + ';base64,' + btoa(binaryString);
        return base64textString;
    };
    ProfileComponent.prototype.handleFileSelect = function (evt) {
        var files = evt.target.files;
        var file = files[0];
        this.fileType = file.type;
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    };
    ProfileComponent.prototype.toast = function (message) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            direction: "ltr",
            verticalPosition: "top",
            horizontalPosition: "right",
            panelClass: "success-snack"
        });
    };
    ProfileComponent = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            UserService,
            MatSnackBar])
    ], ProfileComponent);
    return ProfileComponent;
}());
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map