import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ActivityService } from '../service/activity.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
var add = {
    name: '',
    color: '',
};
var ELEMENT_DATA = [];
var ActivityLogComponent = /** @class */ (function () {
    function ActivityLogComponent(settingService, activityService, router, route) {
        this.settingService = settingService;
        this.activityService = activityService;
        this.router = router;
        this.route = route;
        // Option Initiators
        this.loading = '../../assets/icon/loading.gif';
        this.ticketPriorityList = [];
        this.logs = [];
        this.displayedColumns = ['module', 'user', 'description', 'project', 'updated_at'];
        // MatPaginator Inputs
        this.length = 15;
        this.pageSize = 15;
        this.pageSizeOptions = [15, 25, 100];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    }
    ActivityLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if ((params['project_name'] !== 'add') && params['project_name'] !== undefined) {
                var project_name = _this.project_name ? _this.project_name : params['project_name'];
                _this.getAllProjectActivity(project_name);
            }
            else {
                _this.getAllActivity();
            }
            _this.router.events.subscribe(function (path) {
                if (path instanceof NavigationEnd) {
                }
            });
        });
    };
    ActivityLogComponent.prototype.getAllProjectActivity = function (project_name) {
        console.log(project_name);
    };
    ActivityLogComponent.prototype.getAllActivity = function () {
        var _this = this;
        this.activityService.getAll().subscribe(function (res) {
            console.log(res, 'all activities');
            _this.dataSource = new MatTableDataSource(res.data);
            _this.logs = res.data;
            _this.length = res.total;
        });
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], ActivityLogComponent.prototype, "paginator", void 0);
    ActivityLogComponent = tslib_1.__decorate([
        Component({
            selector: 'app-activity-log',
            templateUrl: './activity-log.component.html',
        }),
        tslib_1.__metadata("design:paramtypes", [SettingService,
            ActivityService,
            Router,
            ActivatedRoute])
    ], ActivityLogComponent);
    return ActivityLogComponent;
}());
export { ActivityLogComponent };
//# sourceMappingURL=activity-log.component.js.map