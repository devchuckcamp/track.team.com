import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activeURL:string;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
  ) {
    this.router.events.subscribe(path =>{

      if(path instanceof NavigationEnd ){
        //Get Url
        let currentURL = path.url;
        //Get Params
        let indexActUrlParam = currentURL.indexOf("?");
        //Get the exact active route
        let indexActUrl = indexActUrlParam == -1 ? currentURL : currentURL.slice(0, indexActUrlParam);
        //Assign to our private activeUrl
        this.activeURL = indexActUrl;
        let isSubRoute = (this.activeURL.match(/\//g) || []).length;
      }
    });
  }

  ngOnInit() {

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'] );
    return false;
  }

}
