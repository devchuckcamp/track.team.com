import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
/**
 * @title Dialog Overview
 */
var ConfirmDeleteDialog = /** @class */ (function () {
    function ConfirmDeleteDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        console.log(data, 'dialog data');
    }
    ConfirmDeleteDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ConfirmDeleteDialog = tslib_1.__decorate([
        Component({
            selector: 'confirm-delete-dialog',
            templateUrl: 'confirm-delete-dialog.component.html',
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ConfirmDeleteDialog);
    return ConfirmDeleteDialog;
}());
export { ConfirmDeleteDialog };
//# sourceMappingURL=confirm-delete-dialog.component.js.map