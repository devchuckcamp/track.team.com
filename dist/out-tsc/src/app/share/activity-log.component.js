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
        this.length = 25;
        this.pageSize = 25;
        this.pageSizeOptions = [25, 50, 100];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.loadingProgress = true;
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
    ActivityLogComponent.prototype.getAllProjectActivity = function (project_name, page_number) {
        if (page_number === void 0) { page_number = 1; }
        console.log(project_name);
        this.loadingProgress = false;
    };
    ActivityLogComponent.prototype.getAllActivity = function (page_number) {
        var _this = this;
        if (page_number === void 0) { page_number = 1; }
        this.loadingProgress = true;
        this.activityService.getAll(page_number).subscribe(function (res) {
            _this.dataSource = new MatTableDataSource(res.data);
            _this.logs = res.data;
            _this.length = res.total;
            _this.loadingProgress = false;
        });
    };
    ActivityLogComponent.prototype.onPageChange = function (event) {
        var page_number = event.pageIndex <= 0 ? 1 : event.pageIndex + 1;
        console.log(page_number);
        this.getAllActivity(page_number);
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