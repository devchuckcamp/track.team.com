import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ProjectService } from '../service/project.service';
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
    @Input('projectsList') projectsList:any = [];
    projectToAdd:any = new Object();
    projectForm:FormGroup;
    subscription:Subscription;
    constructor(
        private projectService: ProjectService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
    ) {}

    uniqueProjectValidator(form: FormGroup) {

    }

    ngOnInit() {
      this.initForm();
      this.projectService.loadAll();
      this.projectService.projects.subscribe( (res:any) => {
        this.projectsList = res;
      });
    }
    ngAfterViewInit(){
      
    }
    addNewProject(){
      if(this.projectForm.valid){
        let exist = this.projectsList.some(proj => proj.name.toLowerCase() == this.projectForm.value.name.toLowerCase());
        console.log(exist,'exist');
        if(!exist){
          this.projectService.save(this.projectToAdd).subscribe( res => {
            this.projectService.loadAll();
            
            this.snackBar.open('Project '+this.projectToAdd+' has been added', 'X', {
              duration: 5000,
              direction: "ltr",
              verticalPosition:"top",
              horizontalPosition: "right",
              panelClass: "success-fail"
          }
        );
          });
          console.log(this.projectToAdd,'projectToAdd');
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
