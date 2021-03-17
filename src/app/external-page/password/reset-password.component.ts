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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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
export class ResetPasswordComponent implements OnInit {
    reset_token:string;
    client:any;
    // Form
    errorMatcher = new CrossFieldErrorMatcher();
    loading_login:boolean = false;
    passwordResetForm: FormGroup;
    resetForm:FormGroup;
    validToken:boolean;
    account_activated:boolean = false;
    tokenError:any = {};
    loadedToken:boolean;

    default_avatar = '../../../assets/default-profile.png';
    loading = '../../../../assets/icon/loading.gif';
    avatar:any;
    token_valid:boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService:UserService,
    private authService:AuthService,
    private memberService:MemberService,
    private clientService:ClientService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      passwordConfirm: ['', Validators.required],
      password: ['', Validators.required]
    });

    
    this.route.params.subscribe(params => {
        if (params['reset_token'] !== undefined) {
          this.reset_token ='';
            console.log(this.reset_token);
            this.userService.validatePasswordResetToken(params['reset_token']).subscribe( (res:any) => {
                console.log(res);
                if(res.reset_token && res.status == 0){
                  this.reset_token = params['reset_token'];
                    this.token_valid = true;
                } else {
                  this.token_valid = false;
                  this.reset_token = '';
                }
            });
            // this.userService.validateAccountToken(params['reset_token']).subscribe( (res:any) => {
            //   console.log(res,'token info');
            //   if(res.valid){
            //     let added_at =  Date.parse(res.created_at)/1000;
            //     console.log(added_at,'added_at');
            //     let remaining = added_at+86400;
            //     let currentDate = Math.floor(Date.now() / 1000);

            //     if(!res.expired){
            //       this.validToken = true;
            //       this.token_info = res;
            //       this.client = res.client;
            //       // this.tokenError.message = 'Token has expired!';
            //     } else {
            //       this.validToken = false;
            //       this.tokenError.message = 'Token has expired!';
            //     }
            //   } else {
            //     this.tokenError.message = 'Token is invalid';
            //   }
            // }, (error:any)=>{
            //   console.log('ERROR:',error);
            //});
            this.loadedToken = true;
        }

        this.passwordResetForm = this.formBuilder.group({
          'token': new FormControl('', [Validators.required]),
          'password': new FormControl('', [Validators.required]),
          'confirmPassword': new FormControl('', [Validators.required]),
          
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

  get f() { return this.passwordResetForm.controls; }
  onSubmit() {
    this.loading_login = true;

    console.log();
    let pwd = this.f.password.value;
    let token = this.f.token.value;
    console.log('token', token);
    console.log('pwd', pwd);
    let data = {
        password:pwd,
        token:token
    };
    this.userService.resetUserPassword(data).subscribe((res:any) =>{
        console.log(res);
        if(res.status==200){
            setTimeout(()=>{
                window.location.href = '/login';
            },3000);
            
        }
    });
    return false;
  }

}
