import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { SettingService } from '../service/setting.service';
var add = {
    name: '',
    color: '',
};
var UnderConstructionComponent = /** @class */ (function () {
    function UnderConstructionComponent(settingService) {
        this.settingService = settingService;
        this.settings = [];
        this.ticketPriorityList = [];
    }
    UnderConstructionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ticketSettingToAdd = add;
        this.ticketOptionLoaded = false;
        this.settingService.settings.subscribe(function (res) {
            _this.ticketPriorityList = res;
            _this.ticketOptionLoaded = true;
        });
    };
    UnderConstructionComponent.prototype.addTicketPrioritySetting = function () {
        var _this = this;
        console.log(this.ticketSettingToAdd, 'ticketSettingToAdd');
        this.settingService.save(this.ticketSettingToAdd).subscribe(function (res) {
            _this.settingService.loadAll();
        });
    };
    UnderConstructionComponent.prototype.updateTicketPrioritySetting = function (ticketPriority) {
        var color = { name: ticketPriority.name, color: ticketPriority.color };
        this.settingService.update(color, ticketPriority.id).subscribe();
    };
    UnderConstructionComponent.prototype.updateColorOption = function (color) {
        console.log(color, 'color');
    };
    UnderConstructionComponent = tslib_1.__decorate([
        Component({
            selector: 'app-under-construction',
            templateUrl: './under-construction.component.html',
            styleUrls: ['./under-construction.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [SettingService])
    ], UnderConstructionComponent);
    return UnderConstructionComponent;
}());
export { UnderConstructionComponent };
//# sourceMappingURL=under-construction.component.js.map