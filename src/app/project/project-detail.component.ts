import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase} from '@angular/common/http';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectDetailComponent implements OnInit {
    project:Project;

    constructor(
            private http: HttpClient,
            public router: Router,
            private route: ActivatedRoute,
            private projectService: ProjectService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log('project_name','project_name detail');
            if (params['project_name'] !== undefined) {
                this.projectService.getProject(params['project_name']).subscribe( res => {
                    console.log(res,'detail');
                    if(res){
                        this.project = res;
                    }
                });
            }
        });
    }

}
