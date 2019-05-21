import { Component, OnInit } from '@angular/core';
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
  constructor(
    private projectService: ProjectService,
    private router:Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(path =>{

      if(path instanceof NavigationEnd ){
        this.projectService.getAllProjects().subscribe( res => {
            this.projects = res;
            console.log(res);
        });
       
      }
    });
  }

  goTo(slug:string){
    this.router.navigate(['/admin/projects', slug] );
    return false;
  }

}
