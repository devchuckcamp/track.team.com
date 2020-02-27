import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';

export interface DialogData {
    id: any;
  }
  /**
   * @title Dialog Overview
   */

  @Component({
    selector: 'dialog-ticket-task',
    templateUrl: 'dialog-ticket-task.component.html',
  })
  export class TaskDetailDialog {

    taskDetailForm:FormGroup;
    task:Task;

    constructor(
      private sanitizer: DomSanitizer,
      private formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<TaskDetailDialog>,
      private taskService:TaskService,
      @Inject(MAT_DIALOG_DATA) public data: Task) {
        dialogRef.disableClose = true;
        this.task = this.data;
        this.taskDetailForm = this.formBuilder.group({
            'id': new FormControl(this.data.id, []),
            'title': new FormControl(this.data.title, []),
            'ticket_id': new FormControl(this.data.ticket_id, []),
            'description': new FormControl(this.data.description, []),
            'status': new FormControl(this.data.status, [])
            });
    }

    // updateTaskDetail(){
    //     console.log(this.task);
    //     return false;
    // }
    updateTaskDetail(){
        var task = {
            task_id: this.task.id,
            title: this.taskDetailForm.value.title,
            description:this.taskDetailForm.value.description,
            status: this.taskDetailForm.value.status == true? 1 : 0,
            ticket_id: this.task.ticket_id,
        };
        //console.log(this.taskDetailForm.value);
        this.taskService.update(task).subscribe( (res:any)=>{
          this.dialogRef.close(res);
        //   this.ticket.ticket_task.find( ({ id }, index) => {
        //     if(id === task_id){
        //       this.ticket.ticket_task[index] = res;
        //     }
        //   });
        //   this.snackBar.open('Task has been updated', 'X', {
        //       duration: 5000,
        //       direction: "ltr",
        //       verticalPosition:"top",
        //       horizontalPosition: "right",
        //       panelClass: "success-snack"
        //   });

        });
        return false;
    }
    onNoClick() {
      this.dialogRef.close();
      return false;
    }

    // closeDialog() {
    //   return this.dialogRef.close({ event: 'Cancel'});
    // }
    onClose() {
      //console.log('closed');
      this.dialogRef.close();
      return false;
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