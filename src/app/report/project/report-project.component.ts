import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ProjectService } from '../../service/project.service';
import { GlobalRoutesService } from '../../config/config';
import { Project } from '../../model/project';

@Component({
  selector: 'app-report-project',
  templateUrl: './report-project.component.html',
  styleUrls: ['../report.component.scss']
})
export class ReportProjectComponent implements OnInit {
  projects: Project[] = [];
  auth_client:any = localStorage.getItem('client');
  startDate = new Date().toLocaleString();
  endDate = new Date().toLocaleString();
  selectedStartDate:any;
  selectedEndDate:any;
  download_auth_token:any = '';
  download_report_url:any = '';
  project_name:any = '';
  selectedProject:any = Project;
  serializedDate = new FormControl((new Date()).toISOString());
    timeRange = new FormGroup({
        selectedStartDate: new FormControl( '',[Validators.required]),
        selectedEndDate: new FormControl( '',[Validators.required]),
      });
    
  constructor(
    private projectService: ProjectService,
    private router:Router,
    private route: ActivatedRoute,
    private globalRoutesService:GlobalRoutesService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['ticket_id'] !== undefined) {
          this.project_name = params['project_name'];
      }

    });
    this.projectService.projects.subscribe( (res:any) => {
      this.projects = res;
      this.selectedProject = this.projects.filter( (res:any) => {
        return (res.slug == this.project_name);
      });
      console.log( this.selectedProject,' this.selectedProject');
    });
  }

  goTo(slug:string){
    this.router.navigate(['/'+this.auth_client+'/admin/reports', slug] );
    return false;
  }

  getReport(){
    let obj = {
      ticket_id:1,
      project_id:2,
    }
    this.projectService.createDownloadToken(obj).subscribe( (res:any) => {
      this.download_auth_token =  res.token;
      this.download_auth_token = '?auth_token='+this.download_auth_token+'&project=' + this.project_name + '&start=' + this.timeRange.value.selectedStartDate.toDateString("Y-m-d H:i:s") + '&end=' + this.timeRange.value.selectedEndDate.toDateString("Y-m-d H:i:s");
      let params =  this.download_auth_token;
      this.download_report_url = this.globalRoutesService.apiEndPoint() + '/api/v1/project-report' + params+'&download=1';
      window.open(this.download_report_url, "_blank");
    });
    return false;
  }

}
