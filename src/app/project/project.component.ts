import { Component, OnInit } from '@angular/core';
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
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.projectService.getAll().subscribe( res => {
            console.log(res);
            this.projects = res.data;
        });
  }

}
