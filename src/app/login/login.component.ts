import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable, Subscription  } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { ClientService } from '../service/client.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    auth_client:any;
    subscription:Subscription;
    client:any;

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
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if(localStorage.getItem('currentUser') && this.authenticationService.Bearer !== ''){
            this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? 'admin': '/' : '/admin'] );
        }
        if (localStorage.getItem('client')) {
            this.auth_client = localStorage.getItem('client');

            this.clientService.validate(this.auth_client).subscribe( (res:any) => {
                this.client = res;
                localStorage.setItem('client_info',JSON.stringify(res));

                this.userService.setClientInfo(this.client);
                this.clientService.setClient(res);
                this.auth_client = this.client.slug;
            }, error=>{
                console.log('error:'+error);

            });
        }
        
    }

    ngOnInit() {
        
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
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
                            console.log(localStorage.getItem('client'),'auth_client');
                            if(localStorage.getItem('client') && data.access_token && !this.loading){
                                // this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? 'admin': '/' : '/admin']);
                                window.location.href=localStorage.getItem('client')+'/admin';
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
}