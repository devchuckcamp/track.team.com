import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalRoutesService } from '../config/config';

export interface DialogData {
    uploads: any;
  }
  /**
   * @title Dialog Overview
   */

  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-attachment-overview.html',
    styleUrls: ['dialog-attachment-overview.scss']
  })
  export class DialogOverviewExampleDialog {
    pdfImages = '../../assets/pdf-file-preview.png';
    constructor(
      private sanitizer: DomSanitizer,
      private config:GlobalRoutesService,
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        // console.log(data,'dialog data');
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
      getSantizeUrl(upload : any) {
        // if(url.includes("application/pdf")){
        //   url = this.pdfImages;
        // }
        // return this.sanitizer.bypassSecurityTrustUrl(url);
        if(upload.url){
          let url  = upload.url;
          if(url.includes("application/pdf")){
            url = this.pdfImages;
          }
          return this.sanitizer.bypassSecurityTrustUrl(url);
        } else {
          // If PDF or CSV file
          if(upload.path.toLowerCase().substr(upload.path.length - 3) == 'pdf'){
            return "../../assets/default/default_pdf.svg";
          } if(upload.path.toLowerCase().substr(upload.path.length - 3) == 'csv'){
            return "../../assets/default/default_csv.png";
          }else if(upload.path.toLowerCase().substr(upload.path.length - 4) == 'xlsx' || upload.path.toLowerCase().substr(upload.path.length - 3) == 'xls'){
            return  "../../assets/default/default_csv.png";
          }
          return this.config.apiEndPoint()+'/'+upload.path;
        }
      }
      addSlide() {
        this.slides.push({img: "http://placehold.it/350x150/777777"})
      }

      download(linkFile:any,file_name:any) {
        let link = linkFile.url;
        if(link == null){
          link = this.config.apiEndPoint()+'/'+linkFile.path;
        }
        
        const linkSource = link;
        const downloadLink = document.createElement("a");
        const fileName = file_name;
  
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.target = '_blank';
        downloadLink.click();
    }
      removeSlide() {
        this.slides.length = this.slides.length - 1;
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