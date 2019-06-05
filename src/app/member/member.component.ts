import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { ProjectService } from '../service/project.service';
import { MemberService } from '../service/member.service';
import {MatPaginator, MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { MustMatch } from '../component/validator/must-match.validator';
import { PasswordValidator } from '../component/validator/password-strong.validator';
import {ErrorStateMatcher} from '@angular/material';
import { Observable, Subscription  } from 'rxjs';
import { ConfirmDeleteDialog } from '../share/alert/confirm-delete-dialog.component';

interface createdAccount {
  id: number,
  name: string,
  username: string,
  role_id: number
}
const ELEMENT_DATA: User[] = [];

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('150ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class MemberComponent implements OnInit {
  project_name: string;
  project_id: number;
  users : User[];
  auth:User;
  auth_client:any;
  auth_client_info:any;
  memberSearchResult:any;
  displayedColumns: string[] = ['avatar', 'username', 'first_name', 'last_name', 'email', 'action'];
  subscription:Subscription;
  // MatPaginator Inputs
  length = 5;
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 15, 25, 100];
  // Form
  errorMatcher = new CrossFieldErrorMatcher();
  memberFormShow:boolean;
  showMemberSearchForm:boolean;
  memberForm: FormGroup;
  memberToAdd:any =  {};
  dialogRef: MatDialogRef<ConfirmDeleteDialog>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  default_avatar = '../assets/default-profile.png';
  loading = '../../assets/icon/loading.gif';

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService:UserService,
    private authService:AuthService,
    private projectService:ProjectService,
    private memberService:MemberService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {

  }
  confirmRemoveFromProject(member_info:any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '280px',
      data: {member_info: member_info}
    });

    dialogRef.componentInstance.confirmMessage = "Are you sure you want to remove "+member_info.user.user_details.first_name+" "+ member_info.user.user_details.last_name +"'s account from this project.";

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'closed dialog');
      if(result){
        // this.removeUser(user);
        this.removeUserFromProject(member_info);
      }
    });
  }
  ngOnInit() {
    this.auth = this.authService.getAuthUser();
    this.setClient();
    this.memberFormShow = false;
    this.showMemberSearchForm = false;

    this.memberToAdd.title = '';
    this.memberToAdd.description = '';
    this.memberToAdd.assigned_to = null;
    this.memberToAdd.status_id = null;
    this.length = 0;

    this.memberForm = this.formBuilder.group({
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required]),
      'role_id': new FormControl('', [Validators.required]),
      'first_name': new FormControl('', [Validators.required]),
      'last_name': new FormControl('', [Validators.required]),
    }, {
        validator: [this.passwordMatchValidator, this.passwordStrenghtValidator],
    });

    this.route.params.subscribe(params => {
      if (params['project_name'] !== undefined) {
          this.project_name = params['project_name'];
          this.projectService.getProject(params['project_name']).subscribe( res=>{
            if(res) this.project_id = res.id;
          });
          this.getMember();
      }
    });
    this.dataSource.paginator = this.paginator;
  }

  setClient():void{
    this.subscription = this.userService.currentClientInfo.subscribe(client => {this.auth_client_info =  JSON.parse(client);  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.memberForm.controls; }


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    console.log(setPageSizeOptionsInput);
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  //Pagination Section
  onPageChange(event) {
    // alert(JSON.stringify("Current page index: " + event.pageIndex));
    //   this.currentPage = event.pageIndex+1;
    //    console.log(event,'event');
    //    this.per_page = event.pageSize;
    //    // this.config.currentPage = number;
    //    // this.getDoctors(number);
    //  this.filter = this.filter !== null ? this.filter : "";

    //  this.userService.getEmployees(event.pageIndex+1, event.pageSize, this.filter).subscribe( 
    //    (res)  =>  {
    //      console.log(res,'new employee list');
    //      this.length = res.total;
    //      this.employees = res.data;
    //      this.dataSource = new MatTableDataSource(res.data);

    //      this.loading =  false;
    //    },
    //    (err)  =>  {
    //      console.log("Error:"+err.status);
    //    }
    //    );
  }

  passwordMatchValidator(form: FormGroup) {
      const condition = form.get('password').value !== form.get('confirmPassword').value;
      return condition ? { passwordsDoNotMatch: true} : null;
  }

  passwordStrenghtValidator(form: FormGroup){
    let hasNumber = /\d/.test(form.get('password').value);
    let hasUpper = /[A-Z]/.test(form.get('password').value);
    let hasLower = /[a-z]/.test(form.get('password').value);

    const valid = hasNumber && hasUpper && hasLower;
    return !valid ? { strong: true } : null;
  }

  getMember(){
    this.projectService.getAllMember(this.project_name).subscribe( res => {
      this.dataSource = new MatTableDataSource(res.data);
      this.users = res.data;
      this.length = res.total;
    });
  }

  toggleMemberForm(){
    if(! this.memberFormShow ) this.memberFormShow = true;
    else  this.memberFormShow = false;

    return false;
  }

  toggleMemberSearchForm(){
    if(! this.showMemberSearchForm ) this.showMemberSearchForm = true;
    else  this.showMemberSearchForm = false;

    return false;
  }

  memberSearch(term:string){
    this.memberService.searchMember(term).subscribe(res=>{
      if(res.length){
        this.memberSearchResult = res;
      } else {
        this.memberSearchResult = [];
      }
    });
    return false;
  }

  addMemberToProject(member:any){
    let memberObj = {
      user_id:member.user.id,
      project_id: this.project_id,
    };
    this.memberService.save(memberObj).subscribe( res => {
      if(res){
        this.snackBar.open('User '+res+' Member has been added to the project', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "success-snack"
            }
        );
      }
    });
    return false;
  }

  addNewAccountToProject(){
    if(this.memberForm.valid){
      let username = this.memberForm.value.username;
      let name = username;
      let email = this.memberForm.value.email;
      let password = this.memberForm.value.password;
      let role_id = this.memberForm.value.role_id;
      let account = {
          username:username,
          email:email,
          name:name,
          password:password,
          role_id: role_id
        };
      // Save Account information
      this.userService.save(account).subscribe( (res) => {
        let save_account:any = res;
        if(save_account.id){
          let account_info = {
            first_name:this.memberForm.value.first_name,
            last_name:this.memberForm.value.last_name,
            user_id:save_account.id,
          };
          // Save additional information
          this.userService.saveinfo(account_info).subscribe( (res) => {
            if(res){
              let memberObj = {
                user_id:save_account.id,
                project_id: this.project_id,
              };
              // Save Membership information
              this.memberService.save(memberObj).subscribe( res => {
                this.getMember();
                this.memberForm.reset();
                this.toggleMemberForm();
              });
            }
          });

          this.snackBar.open('New Member has been added', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "success-snack"
              }
          );

        } else {
          this.snackBar.open('An error occured during  account creation.', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "fail-snack"
              }
          );
        }
      });
    } else {
       this.snackBar.open('An error occured during  account creation.', 'X', {
                  duration: 5000,
                  direction: "ltr",
                  verticalPosition:"top",
                  horizontalPosition: "right",
                  panelClass: "fail-snack"
              }
          );
    }
    return false;
  }

  removeUser(user_id:any){
    this.memberService.delete(user_id).subscribe( (res:any) =>{
      if(res == null){
        this.dataSource.data = this.dataSource.data.filter( (user:any) => user.user_id !== user_id);
        this.snackBar.open('User has been removed!', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "success-snack"
            }
        );
      }
    });
  }

  removeUserFromProject(member:any){
    this.memberService.removeUserFromProject(member.id).subscribe( (res:any) =>{
      if(res == null){
        this.dataSource.data = this.dataSource.data.filter( (user:any) => user.user_id !== member.user_id);
        this.snackBar.open('User has been removed!', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition:"top",
                horizontalPosition: "right",
                panelClass: "success-snack"
            }
        );
      }
    });
  }

}
