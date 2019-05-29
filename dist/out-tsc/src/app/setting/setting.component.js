import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SettingService } from '../service/setting.service';
var add = {
    name: '',
    color: '',
};
var SettingComponent = /** @class */ (function () {
    function SettingComponent(settingService) {
        this.settingService = settingService;
        this.settings = [];
        this.ticketPriorityList = [];
        this.step = 0;
    }
    SettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ticketSettingToAdd = add;
        this.ticketOptionLoaded = false;
        this.settingService.settings.subscribe(function (res) {
            _this.ticketPriorityList = res;
            _this.ticketOptionLoaded = true;
        });
    };
    SettingComponent.prototype.addTicketPrioritySetting = function () {
        var _this = this;
        console.log(this.ticketSettingToAdd, 'ticketSettingToAdd');
        this.settingService.save(this.ticketSettingToAdd).subscribe(function (res) {
            _this.settingService.loadAll();
        });
    };
    SettingComponent.prototype.updateTicketPrioritySetting = function (ticketPriority) {
        var color = { name: ticketPriority.name, color: ticketPriority.color };
        this.settingService.update(color, ticketPriority.id).subscribe();
    };
    SettingComponent.prototype.updateColorOption = function (color) {
        console.log(color, 'color');
    };
    SettingComponent.prototype.setStep = function (index) {
        this.step = index;
    };
    SettingComponent.prototype.nextStep = function () {
        this.step++;
    };
    SettingComponent.prototype.prevStep = function () {
        this.step--;
    };
    SettingComponent = tslib_1.__decorate([
        Component({
            selector: 'app-setting',
            templateUrl: './setting.component.html',
            styleUrls: ['./setting.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [SettingService])
    ], SettingComponent);
    return SettingComponent;
}());
export { SettingComponent };
//# sourceMappingURL=setting.component.js.map