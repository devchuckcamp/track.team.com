import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    user_id: any;
  }
  /**
   * @title Dialog Overview
   */

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.component.html',
})
export class ConfirmDeleteDialog {
  public confirmMessage:string;
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log(data,'dialog data');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}