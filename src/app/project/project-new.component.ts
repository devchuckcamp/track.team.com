import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
import { UserService } from '../service/user.service';

import { Project } from '../model/project';
import { FormsModule } from '@angular/forms';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { Observable, Subscription  } from 'rxjs';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectNewComponent implements OnInit, AfterViewInit {
    //projectsList:any;
    projects: Project[] = []; 
    auth_client_info:any;
    @Input('projectsList') projectsList:any = [];
    projectToAdd:any = new Object();
    projectForm:FormGroup;
    subscription:Subscription;
    constructor(
        private projectService: ProjectService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private userService:UserService,
    ) {}

    uniqueProjectValidator(form: FormGroup) {

    }

    ngOnInit() {
      this.subscription = this.userService.currentClientInfo.subscribe(client => {this.auth_client_info =  JSON.parse(client);  });
      this.initForm();
      this.projectService.loadAll();
      this.projectService.projects.subscribe( (res:any) => {
        this.projectsList = res;
      });

    }
    ngAfterViewInit(){}
    addNewProject(){
      if(this.projectForm.valid){
        let exist = this.projectsList.some(proj => proj.name.toLowerCase() == this.projectForm.value.name.toLowerCase());
        // console.log(exist,'exist');
        if(!exist){
          this.projectToAdd.client_id = this.auth_client_info.id;
          this.projectService.save(this.projectToAdd).subscribe( res => {
            this.snackBar.open('Project '+this.projectForm.value.name+' has been added', 'X', {
              duration: 5000,
              direction: "ltr",
              verticalPosition:"top",
              horizontalPosition: "right",
              panelClass: "success-fail"
            });
            this.projectForm.reset();
            this.projectService.loadAll();

          });
          // console.log(this.projectToAdd,'projectToAdd');
        } else {
            this.snackBar.open('Project name '+this.projectForm.value.name+' already exist', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-fail"
              }
            );
        }
      } else {
        this.snackBar.open('Internal error saving your project', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "success-fail"
            }
          );
      }
      return false;
    }

    initForm(){
      this.projectForm = this.formBuilder.group({
        'name': new FormControl('', [Validators.required,]),
      }, {
        validator: [],
      });
    }
}
