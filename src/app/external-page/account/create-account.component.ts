import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { ProjectService } from '../../service/project.service';
import { MemberService } from '../../service/member.service';
import { ClientService } from '../../service/client.service';
import {MatPaginator, MatSnackBar, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm, EmailValidator } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { MustMatch } from '../../component/validator/must-match.validator';
import { PasswordValidator } from '../../component/validator/password-strong.validator';
import {ErrorStateMatcher} from '@angular/material';
import { Observable, Subscription  } from 'rxjs';
import { first } from 'rxjs/operators';

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
  selector: 'app-account-create',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  animations: [
    trigger(
      'removeAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('150ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class CreateAccountComponent implements OnInit {
  project_name: string;
  account_token:string;
  project_id: number;
  users : User[];
  client:any;
  auth:User;
  auth_client:any;
  auth_client_info:any;
  token_info:any;
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
  loading_login:boolean = false;
  memberForm: FormGroup;
  loginForm:FormGroup;
  memberToAdd:any =  {};
  validToken:boolean;
  account_activated:boolean = false;
  tokenError:any = {};
  loadedToken:boolean;
  uniqueUsername:any = {};
//   dialogRef: MatDialogRef<ConfirmDeleteDialog>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  default_avatar = '../../assets/default-profile.png';
  loading = '../../../assets/icon/loading.gif';
  avatar:any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService:UserService,
    private authService:AuthService,
    private projectService:ProjectService,
    private memberService:MemberService,
    private clientService:ClientService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
        if (params['account_token'] !== undefined) {
            this.account_token = params['account_token'];
            console.log(this.account_token);

            this.userService.validateAccountToken(params['account_token']).subscribe( (res:any) => {
              console.log(res,'token info');
              if(res.valid){
                let added_at =  Date.parse(res.created_at)/1000;
                console.log(added_at,'added_at');
                let remaining = added_at+86400;
                let currentDate = Math.floor(Date.now() / 1000);

                if(!res.expired){
                  this.validToken = true;
                  this.token_info = res;
                  this.client = res.client;
                  // this.tokenError.message = 'Token has expired!';
                } else {
                  this.validToken = false;
                  this.tokenError.message = 'Token has expired!';
                }
              } else {
                this.tokenError.message = 'Token is invalid';
              }
            }, (error:any)=>{
              console.log('ERROR:',error);
            });
            this.loadedToken = true;
        }

        this.memberForm = this.formBuilder.group({
          'username': new FormControl('', [Validators.required]),
          'password': new FormControl('', [Validators.required]),
          'confirmPassword': new FormControl('', [Validators.required]),
          'first_name': new FormControl('', [Validators.required]),
          'last_name': new FormControl('', [Validators.required]),
        }, {
            validator: [this.passwordMatchValidator, this.passwordStrenghtValidator],
        });

    });
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

  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.loading_login = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading_login = true;
    this.authService.loginAuth(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                let user_id:number;
                localStorage.setItem('currentUser',JSON.stringify(data));
                this.authService.getAuthenticatedUser().subscribe( res => {
                    localStorage.setItem('authUser',JSON.stringify(res));
                    user_id = JSON.parse(localStorage.getItem('authUser')).id;
                    this.authService.getAuthenticatedUserProfile(user_id).subscribe( response => {
                        this.avatar = response;
                        if(this.avatar.avatar !== null){
                            localStorage.setItem('avatar',this.avatar.avatar.data);
                        }
                        let auth_client= '';
                        this.loading_login = false;
                        if (!this.auth_client) {
                            auth_client = localStorage.getItem('client');
                        }
                        console.log(localStorage.getItem('client'),'auth_client');
                        if(localStorage.getItem('client') && data.access_token && !this.loading_login){
                            // this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? 'admin': '/' : '/admin']);
                            window.location.href=localStorage.getItem('client')+'/admin';
                        }
                    });
                });
            },
            error => {
                // this.alertService.error(error);
                this.loading_login = false;
            });
    return false;
  }
  activateAccount(){
    if(this.memberForm.valid){
      let username = this.memberForm.value.username;
      let name = username;
      let email = this.token_info.email;
      let password = this.memberForm.value.password;
      let account = {
        username: username,
        email: email,
        name: name,
        password: password,
        role_id: this.token_info.role_id
      };

      this.userService.verifyUniqueUsername(username).subscribe( (res:any) => {
        if(res.result){

          this.uniqueUsername = {unique : true};
          // Save Account information
          this.userService.unAuthSave(account,this.token_info.token).subscribe((res) => {
            let save_account: any = res;
            if (save_account.id) {
                  let account_info = {
                    first_name: this.memberForm.value.first_name,
                    last_name: this.memberForm.value.last_name,
                    user_id: save_account.id,
                  };
                  let processed_membeship = 0;
                  let account_activated = false;
                  // Save additional information
                  this.userService.unAuthSaveinfo(account_info,this.token_info.token).subscribe((res) => {
                    if (res) {
                      let to_process_membeship = this.token_info.membership.length;
                      this.token_info.membership.forEach( (mem:any) => {
                        let memberObj = {
                          user_id: save_account.id,
                          project_id: mem.project_id,
                          client_id:this.token_info.client_id
                        };
                        // Save Membership information
                        this.memberService.unAuthSave(memberObj,this.token_info.token).subscribe( (res:any) => {
                          if(res.id){
                            processed_membeship++;
                            if(processed_membeship == to_process_membeship){
                              account_activated = true;
                            }
                            if(account_activated){
                              // Delete the token after activation
                              this.clientService.deleteToken(this.token_info.token).subscribe( (res:any) => {
                                this.snackBar.open('Account has been activated', 'X', {
                                  duration: 5000,
                                  direction: "ltr",
                                  verticalPosition: "top",
                                  horizontalPosition: "right",
                                  panelClass: "success-snack"
                                });
                                // Client
                                localStorage.setItem('client_info',JSON.stringify(this.token_info.client));
                                localStorage.setItem('client',this.token_info.client.slug);
                                this.subscription = this.userService.currentClientInfo.subscribe(client => {this.auth_client_info =  JSON.parse(client);  });

                                this.account_activated = true;
                              });
                            }
                          } else {

                          }
                        });
                      }); // Foreach ends
                    }
                  });
                }
          });
        } else {

          this.uniqueUsername.unique = {unique : false};
          this.uniqueUsername.error_message = username+' as username is already taken.';
        }

      });
    } else {
      this.snackBar.open('An error occured during  account creation.', 'X', {
        duration: 5000,
        direction: "ltr",
        verticalPosition: "top",
        horizontalPosition: "right",
        panelClass: "fail-snack"
      });
    }

    return false;
  }

  removeInvite(project_id:number){
    this.token_info.membership =  this.token_info.membership.filter( mem => mem.project_id != project_id);
    return false;
  }
}
