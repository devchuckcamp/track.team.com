import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ClientService } from '../service/client.service';
import { FormBuilder, Validators } from '@angular/forms';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(clientService, formBuilder) {
        this.clientService = clientService;
        this.formBuilder = formBuilder;
        this.authenticated = false;
        this.valid_client = localStorage.getItem('client') ? true : false;
        this.invalid_client = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.clientForm = this.formBuilder.group({
            client: ['', Validators.required],
        });
        if (localStorage.getItem('currentUser')) {
            this.authenticated = true;
        }
    };
    HomeComponent.prototype.validate_client = function () {
        var _this = this;
        var client_name = this.clientForm.value.client;
        this.clientService.validate(client_name).subscribe(function (res) {
            console.log(res, 'client validated');
            if (res.id) {
                _this.valid_client = true;
                _this.clientService.setClient(res);
                _this.subscription = _this.clientService.currentClient.subscribe(function (client) { _this.client = client; });
                // this.client = res;
                if (!localStorage.getItem('client')) {
                    localStorage.setItem('client', _this.client.slug);
                }
            }
            else {
                _this.invalid_client = true;
                _this.error_msg = res.error;
            }
        }, function (error) {
            console.log('error:' + error);
            _this.invalid_client = true;
            _this.error_msg = error;
        });
        return false;
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ClientService,
            FormBuilder])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map