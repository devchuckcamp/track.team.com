import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
/**
 * @title Dialog Overview
 */
var DialogOverviewExampleDialog = /** @class */ (function () {
    function DialogOverviewExampleDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        // Slick
        this.slides = [
            { img: "../assets/images/1.jpg" },
            { img: "../assets/images/2.jpg" },
            { img: "../assets/images/3.jpg" },
            { img: "../assets/images/4.jpg" },
            { img: "../assets/images/5.jpg" },
            { img: "../assets/images/6.jpg" },
            { img: "../assets/images/7.jpg" },
            { img: "../assets/images/8.jpg" },
            { img: "../assets/images/9.jpg" },
            { img: "../assets/images/10.jpg" },
            { img: "../assets/images/11.jpg" },
            { img: "../assets/images/12.jpg" }
        ];
        this.slideConfig = {
            "slidesToShow": 1,
            "slidesToScroll": 1,
            "nextArrow": "<div class='nav-btn next-slide'><i class='fa fa-chevron-right'></div>",
            "prevArrow": "<div class='nav-btn prev-slide'><i class='fa fa-chevron-left'></div>",
            "dots": true,
            "infinite": false
        };
        console.log(data, 'dialog data');
    }
    DialogOverviewExampleDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DialogOverviewExampleDialog.prototype.addSlide = function () {
        this.slides.push({ img: "http://placehold.it/350x150/777777" });
    };
    DialogOverviewExampleDialog.prototype.removeSlide = function () {
        this.slides.length = this.slides.length - 1;
    };
    DialogOverviewExampleDialog.prototype.slickInit = function (e) {
        console.log('slick initialized');
    };
    DialogOverviewExampleDialog.prototype.breakpoint = function (e) {
        console.log('breakpoint');
    };
    DialogOverviewExampleDialog.prototype.afterChange = function (e) {
        console.log('afterChange');
    };
    DialogOverviewExampleDialog.prototype.beforeChange = function (e) {
        console.log('beforeChange');
    };
    DialogOverviewExampleDialog = tslib_1.__decorate([
        Component({
            selector: 'dialog-overview-example-dialog',
            templateUrl: 'dialog-attachment-overview.html',
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], DialogOverviewExampleDialog);
    return DialogOverviewExampleDialog;
}());
export { DialogOverviewExampleDialog };
//# sourceMappingURL=dialog-attachment-overview.component.js.map