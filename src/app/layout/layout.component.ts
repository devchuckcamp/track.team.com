import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import Chart from 'chart.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild("chart")
  public refChart: ElementRef;
  public chartData: any;
  private viewInfoRoute : string;
  activeURL: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
      this.router.events.subscribe(path =>{

        if(path instanceof NavigationEnd ){
          //Get Url
          let currentURL = path.url;
          //Get Params
          let indexActUrlParam = currentURL.indexOf("?");
          //Get the exact active route
          let indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam );
          //Assign to our private activeUrl
          this.activeURL = indexActUrl;
          console.log(this.activeURL);
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