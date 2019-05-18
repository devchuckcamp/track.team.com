import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    uploads: any;
  }
  /**
   * @title Dialog Overview
   */
  
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-attachment-overview.html',
  })
  export class DialogOverviewExampleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log(data,'dialog data');
      }
        
    onNoClick(): void {
      this.dialogRef.close();
    }

    // Slick
    slides = [
        {img: "../assets/images/1.jpg"},
        {img: "../assets/images/2.jpg"},
        {img: "../assets/images/3.jpg"},
        {img: "../assets/images/4.jpg"},
        {img: "../assets/images/5.jpg"},
        {img: "../assets/images/6.jpg"},
        {img: "../assets/images/7.jpg"},
        {img: "../assets/images/8.jpg"},
        {img: "../assets/images/9.jpg"},
        {img: "../assets/images/10.jpg"},
        {img: "../assets/images/11.jpg"},
        {img: "../assets/images/12.jpg"}
      ];
     
      slideConfig = {
        "slidesToShow": 1, 
        "slidesToScroll": 1,
        "nextArrow":"<div class='nav-btn next-slide'><i class='fa fa-chevron-right'></div>",
        "prevArrow":"<div class='nav-btn prev-slide'><i class='fa fa-chevron-left'></div>",
        "dots":true,
        "infinite": false
      };
      
      addSlide() {
        this.slides.push({img: "http://placehold.it/350x150/777777"})
      }
      
      removeSlide() {
        this.slides.length = this.slides.length - 1;
      }
      
      slickInit(e) {
        console.log('slick initialized');
      }
      
      breakpoint(e) {
        console.log('breakpoint');
      }
      
      afterChange(e) {
        console.log('afterChange');
      }
      
      beforeChange(e) {
        console.log('beforeChange');
      }
  
  }