import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
export interface DialogData {
    ticket_logs: any;
  }
  /**
   * @title Dialog Overview
   */

  @Component({
    selector: 'dialog-status-history-dialog',
    templateUrl: 'dialog-status-history.component.html',
  })
  export class DialogStatusHistoryDialog {

    constructor(
      private sanitizer: DomSanitizer,
      public dialogRef: MatDialogRef<DialogStatusHistoryDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        // console.log(data,'status dialog data');
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

      slickInit(e) {
        // console.log('slick initialized');
      }

      breakpoint(e) {
        // console.log('breakpoint');
      }

      afterChange(e) {
        // console.log('afterChange');
      }

      beforeChange(e) {
        // console.log('beforeChange');
      }

  }