import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import Chart from 'chart.js';
import { BreadcrumbComponent } from '../layout/component/breadcrumb.component';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild("chart")
  public refChart: ElementRef;
  public chartData: any;
  public authUser:User;
  private viewInfoRoute : string;
  activeURL: string;
  admin_sub_1: string;
  admin_sub_2: string;
  admin_project_sub: string;
  profile:any;
  breadcrumb:any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
      this.admin_sub_1 = "";
      this.admin_sub_2 = "";
      this.admin_project_sub = "";
      this.router.events.subscribe(path =>{
      this.profile = this.authService.getAuthUser();
      console.log(this.authService.getAuthUser(),'profile');
        if(path instanceof NavigationEnd ){
          //Get Url
          let currentURL = path.url;
          //Get Params
          let indexActUrlParam = currentURL.indexOf("?");
          //Get the exact active route
          let indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam );
          //Assign to our private activeUrl
          this.activeURL = indexActUrl;

          let slug_list = this.activeURL.split('/');
          this.breadcrumb = slug_list;
          let isSubRoute = (this.activeURL.match(/\//g) || []).length;
          if(slug_list.includes("projects") || slug_list[2] == 'projects'){
            this.admin_sub_1 = "projects";
            this.admin_sub_2 =  slug_list[3];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }

          if(slug_list.includes("profile") || slug_list[2] == 'profile'){
            this.admin_sub_1 = "profile";
            this.admin_sub_2 =  slug_list[3];
            this.admin_project_sub =  slug_list[slug_list.length-1];
          }
        }
      });

      // Chart
      this.chartData = {};
    }

  ngOnInit() {

    // this.chartData = {
    //   labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //   datasets: [
    //     {
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255,99,132,1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //     ],
    //     borderWidth: 1
    //   },
    //   {
    //     label: '# of Voters',
    //     data: [12, 19, 3, 5, 2, 3],
    //     backgroundColor: [
    //       'rgba(255, 99, 132, 0.2)',
    //       'rgba(54, 162, 235, 0.2)',
    //       'rgba(255, 206, 86, 0.2)',
    //       'rgba(75, 192, 192, 0.2)',
    //       'rgba(153, 102, 255, 0.2)',
    //       'rgba(255, 159, 64, 0.2)'
    //     ],
    //     borderColor: [
    //       'rgba(255,99,132,1)',
    //       'rgba(54, 162, 235, 1)',
    //       'rgba(255, 206, 86, 1)',
    //       'rgba(75, 192, 192, 1)',
    //       'rgba(153, 102, 255, 1)',
    //       'rgba(255, 159, 64, 1)'
    //   ],
    //   borderWidth: 1
    // }
    // ]
    // };
    // let chart = this.refChart.nativeElement;
    // let ctx = chart.getContext("2d");
    // let myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: this.chartData,
    //   options: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {
  }

}