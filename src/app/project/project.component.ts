import { Component, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})



export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  auth_client:any = localStorage.getItem('client');
  constructor(
    private projectService: ProjectService,
    private router:Router
  ) { }

  ngOnInit() {
    this.projectService.projects.subscribe( (res:any) => {
      this.projects = res;
    });
    this.router.events.subscribe(path =>{

      if(path instanceof NavigationEnd ){
      }
    });
  }

  goTo(slug:string){
    this.router.navigate(['/'+this.auth_client+'/admin/projects', slug] );
    return false;
  }

}
