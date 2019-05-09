import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../service/auth.service';

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

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        //private alertService: AlertService
    ) {
        //redirect to home if already logged in
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if(localStorage.getItem('currentUser') && JSON.parse(this.authenticationService.Bearer).access_token !== ''){
            this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? 'admin': '/' : '/admin'] );
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

                    localStorage.setItem('currentUser',JSON.stringify(data));
                    this.authenticationService.getAuthenticatedUser().subscribe( res => {
                        localStorage.setItem('authUser',JSON.stringify(res));
                        localStorage.setItem('csrf_token',JSON.stringify({'token':'lkcc371220183d'}));
                    });
                    if(data.access_token)
                        // this.router.navigate([this.returnUrl ? this.returnUrl  == '/' ? 'admin': '/' : '/admin']);
                        window.location.href='/admin'

                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                });
        return false;
    }
}