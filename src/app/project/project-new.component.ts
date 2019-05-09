import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectNewComponent implements OnInit {
    projects: Project[] = []; 
    constructor(
        private projectService: ProjectService
    ) { }

    ngOnInit() {
        // this.projectService.getAll().subscribe( res => {
        //     console.log(123);
        //     this.projects = res.data;
        // });
  }

}
