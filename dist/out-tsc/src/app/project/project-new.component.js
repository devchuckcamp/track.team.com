import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
var ProjectNewComponent = /** @class */ (function () {
    function ProjectNewComponent(projectService, formBuilder, snackBar) {
        this.projectService = projectService;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        //projectsList:any;
        this.projects = [];
        this.projectsList = [];
        this.projectToAdd = new Object();
    }
    ProjectNewComponent.prototype.uniqueProjectValidator = function (form) {
    };
    ProjectNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.projectService.loadAll();
        this.projectService.projects.subscribe(function (res) {
            _this.projectsList = res;
        });
    };
    ProjectNewComponent.prototype.ngAfterViewInit = function () {
    };
    ProjectNewComponent.prototype.addNewProject = function () {
        var _this = this;
        if (this.projectForm.valid) {
            var exist = this.projectsList.some(function (proj) { return proj.name.toLowerCase() == _this.projectForm.value.name.toLowerCase(); });
            console.log(exist, 'exist');
            if (!exist) {
                this.projectService.save(this.projectToAdd).subscribe(function (res) {
                    _this.projectService.loadAll();
                    _this.snackBar.open('Project ' + _this.projectToAdd + ' has been added', 'X', {
                        duration: 5000,
                        direction: "ltr",
                        verticalPosition: "top",
                        horizontalPosition: "right",
                        panelClass: "success-fail"
                    });
                });
                console.log(this.projectToAdd, 'projectToAdd');
            }
            else {
                this.snackBar.open('Project name ' + this.projectForm.value.name + ' already exist', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition: "top",
                    horizontalPosition: "right",
                    panelClass: "success-fail"
                });
            }
        }
        else {
            this.snackBar.open('Internal error saving your project', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: "success-fail"
            });
        }
        return false;
    };
    ProjectNewComponent.prototype.initForm = function () {
        this.projectForm = this.formBuilder.group({
            'name': new FormControl('', [Validators.required,]),
        }, {
            validator: [],
        });
    };
    tslib_1.__decorate([
        Input('projectsList'),
        tslib_1.__metadata("design:type", Object)
    ], ProjectNewComponent.prototype, "projectsList", void 0);
    ProjectNewComponent = tslib_1.__decorate([
        Component({
            selector: 'app-project-new',
            templateUrl: './project-new.component.html',
            styleUrls: ['./project.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [ProjectService,
            FormBuilder,
            MatSnackBar])
    ], ProjectNewComponent);
    return ProjectNewComponent;
}());
export { ProjectNewComponent };
//# sourceMappingURL=project-new.component.js.map