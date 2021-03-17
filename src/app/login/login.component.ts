import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable, Subscription  } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger(
      'loginAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
        'passwordAnimation', [
          transition(':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('200ms', style({transform: 'translateX(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateX(200%)', opacity: 0}),
            animate('100ms', style({transform: 'translateX(100%)', opacity: 0}))
          ])
        ]
      )
  ],
})


export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    passwordResetForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: any;
    auth_client:any;
    subscription:Subscription;
    client:any;
    form_shown:any;
    show_password_reset_form:boolean;
    passwordRequestSent:boolean;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private userService: UserService,
        private clientService: ClientService
    ) {
        this.subscription = this.clientService.currentClient.subscribe( client => { this.client = client });
        //redirect to home if already logged in
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
       
        if (localStorage.getItem('client')) {
            this.auth_client = localStorage.getItem('client');

            this.clientService.validate(this.auth_client).subscribe( (res:any) => {
                this.client = res;
                localStorage.setItem('client_info',JSON.stringify(res));

                // this.userService.setClientInfo(this.client);
                // this.clientService.setClient(res);
                this.auth_client = this.client.slug;
            }, error=>{
                console.log('error:'+error);

            });
        }
        if(localStorage.getItem('currentUser') && this.authenticationService.Bearer !== ''){
            this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? this.auth_client+'/admin': '/' : this.auth_client+'/admin'] );
        }
    }

    ngOnInit() {
        this.form_shown = 'Login';
        this.returnUrl = JSON.parse(localStorage.getItem('returnUrl'));
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.passwordResetForm= this.formBuilder.group({
            email: ['', Validators.required]
        });
        
        this.passwordRequestSent = false;

        this.route.params.subscribe(params => {
            if (params['password_reset'] !== undefined && params['password_reset'] == 'password_reset') {
                this.showPasswordResetForm();
            } else {
                this.show_password_reset_form = false;
            }
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    public u:any;
    public avatar:any;
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.loginAuth(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    let user_id:number;
                    localStorage.setItem('currentUser',JSON.stringify(data));
                    this.authenticationService.getAuthenticatedUser().subscribe( res => {
                        localStorage.setItem('authUser',JSON.stringify(res));
                        localStorage.setItem('csrf_token',JSON.stringify({'token':'lkcc371220183d'}));
                        user_id = JSON.parse(localStorage.getItem('authUser')).id;
                        this.authenticationService.getAuthenticatedUserProfile(user_id).subscribe( response => {
                            this.avatar = response;
                            if(this.avatar.avatar !== null){
                                localStorage.setItem('avatar',this.avatar.avatar.data);
                            }
                            let auth_client= '';
                            this.loading = false;
                            if (!this.auth_client) {
                                auth_client = localStorage.getItem('client');
                            }
                            //console.log(localStorage.getItem('client'),'auth_client');
                            if(localStorage.getItem('client') && data.access_token && !this.loading){
                                // this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? 'admin': '/' : '/admin']);
                                if(this.returnUrl){
                                    localStorage.removeItem('returnUrl');
                                    window.location.href = this.returnUrl.url;
                                } else {
                                    window.location.href=localStorage.getItem('client')+'/admin';
                                }
                            }
                        });
                    });
                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                });
        return false;
    }
    showPasswordResetForm(){
        this.form_shown = this.form_shown == 'Login'? 'Account':'Login';
        this.passwordRequestSent = false;
        this.show_password_reset_form = this.show_password_reset_form ? false : true;
        return false;
    }

    
    get ps() { return this.passwordResetForm.controls; }
    submitPasswordResetForm(){
        console.log('Request Password Reset');
        let email = this.ps.email.value;
        let data = JSON.stringify({email:email});
        this.userService.requestPasswordReset(data).subscribe( (res:any) => {
            
            if(res.reset_token){
                this.passwordRequestSent = true;
                console.log(res.reset_token);
            }
        });
        return false;
    }
}