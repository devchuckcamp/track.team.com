import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { ProjectService } from '../../service/project.service';
import { MemberService } from '../../service/member.service';
import { ClientService } from '../../service/client.service';
import { MatPaginator, MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
var ELEMENT_DATA = [];
/** Error when the parent is invalid */
var CrossFieldErrorMatcher = /** @class */ (function () {
    function CrossFieldErrorMatcher() {
    }
    CrossFieldErrorMatcher.prototype.isErrorState = function (control, form) {
        return control.dirty && form.invalid;
    };
    return CrossFieldErrorMatcher;
}());
var CreateAccountComponent = /** @class */ (function () {
    function CreateAccountComponent(router, http, route, userService, authService, projectService, memberService, clientService, formBuilder, snackBar, dialog) {
        this.router = router;
        this.http = http;
        this.route = route;
        this.userService = userService;
        this.authService = authService;
        this.projectService = projectService;
        this.memberService = memberService;
        this.clientService = clientService;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.displayedColumns = ['avatar', 'username', 'first_name', 'last_name', 'email', 'action'];
        // MatPaginator Inputs
        this.length = 5;
        this.pageSize = 5;
        this.pageSizeOptions = [1, 5, 10, 15, 25, 100];
        // Form
        this.errorMatcher = new CrossFieldErrorMatcher();
        this.memberToAdd = {};
        this.account_activated = true;
        this.tokenError = {};
        this.uniqueUsername = {};
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.default_avatar = '../../assets/default-profile.png';
        this.loading = '../../../assets/icon/loading.gif';
    }
    CreateAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['account_token'] !== undefined) {
                _this.account_token = params['account_token'];
                console.log(_this.account_token);
                _this.userService.validateAccountToken(params['account_token']).subscribe(function (res) {
                    console.log(res, 'token info');
                    if (res.valid) {
                        var added_at = Date.parse(res.created_at) / 1000;
                        console.log(added_at, 'added_at');
                        var remaining = added_at + 86400;
                        var currentDate = Math.floor(Date.now() / 1000);
                        console.log(remaining, 'remaining');
                        if (!res.expired) {
                            _this.validToken = true;
                            _this.token_info = res;
                            // this.tokenError.message = 'Token has expired!';
                        }
                        else {
                            _this.validToken = false;
                            _this.tokenError.message = 'Token has expired!';
                        }
                    }
                    else {
                        _this.tokenError.message = 'Token is invalid';
                    }
                }, function (error) {
                    console.log('ERROR:', error);
                });
                _this.loadedToken = true;
            }
            _this.memberForm = _this.formBuilder.group({
                'username': new FormControl('', [Validators.required]),
                'password': new FormControl('', [Validators.required]),
                'confirmPassword': new FormControl('', [Validators.required]),
                'role_id': new FormControl('', [Validators.required]),
                'first_name': new FormControl('', [Validators.required]),
                'last_name': new FormControl('', [Validators.required]),
            }, {
                validator: [_this.passwordMatchValidator, _this.passwordStrenghtValidator],
            });
        });
    };
    CreateAccountComponent.prototype.passwordMatchValidator = function (form) {
        var condition = form.get('password').value !== form.get('confirmPassword').value;
        return condition ? { passwordsDoNotMatch: true } : null;
    };
    CreateAccountComponent.prototype.passwordStrenghtValidator = function (form) {
        var hasNumber = /\d/.test(form.get('password').value);
        var hasUpper = /[A-Z]/.test(form.get('password').value);
        var hasLower = /[a-z]/.test(form.get('password').value);
        var valid = hasNumber && hasUpper && hasLower;
        return !valid ? { strong: true } : null;
    };
    //   confirmRemoveFromProject(member_info:any): void {
    //     const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
    //       width: '280px',
    //       data: {member_info: member_info}
    //     });
    //     dialogRef.componentInstance.confirmMessage = "Are you sure you want to remove "+member_info.user.user_details.first_name+" "+ member_info.user.user_details.last_name +"'s account from this project.";
    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log(result,'closed dialog');
    //       if(result){
    //         // this.removeUser(user);
    //         this.removeUserFromProject(member_info);
    //       }
    //     });
    //   }
    //   ngOnInit() {
    //     this.auth = this.authService.getAuthUser();
    //     this.setClient();
    //     this.memberFormShow = false;
    //     this.showMemberSearchForm = false;
    //     this.memberToAdd.title = '';
    //     this.memberToAdd.description = '';
    //     this.memberToAdd.assigned_to = null;
    //     this.memberToAdd.status_id = null;
    //     this.length = 0;
    //     this.memberForm = this.formBuilder.group({
    //       'username': new FormControl('', [Validators.required]),
    //       'email': new FormControl('', [Validators.required,Validators.email]),
    //       'password': new FormControl('', [Validators.required]),
    //       'confirmPassword': new FormControl('', [Validators.required]),
    //       'role_id': new FormControl('', [Validators.required]),
    //       'first_name': new FormControl('', [Validators.required]),
    //       'last_name': new FormControl('', [Validators.required]),
    //     }, {
    //         validator: [this.passwordMatchValidator, this.passwordStrenghtValidator],
    //     });
    //     this.route.params.subscribe(params => {
    //       if (params['project_name'] !== undefined) {
    //           this.project_name = params['project_name'];
    //           this.projectService.getProject(params['project_name']).subscribe( res=>{
    //             if(res) this.project_id = res.id;
    //           });
    //           this.getMember();
    //       }
    //     });
    //     this.dataSource.paginator = this.paginator;
    //   }
    //   setClient():void{
    //     this.subscription = this.userService.currentClientInfo.subscribe(client => {this.auth_client_info =  JSON.parse(client);  });
    //   }
    //   // convenience getter for easy access to form fields
    //   get f() { return this.memberForm.controls; }
    //   setPageSizeOptions(setPageSizeOptionsInput: string) {
    //     console.log(setPageSizeOptionsInput);
    //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    //   }
    //   //Pagination Section
    //   onPageChange(event) {
    //     // alert(JSON.stringify("Current page index: " + event.pageIndex));
    //     //   this.currentPage = event.pageIndex+1;
    //     //    console.log(event,'event');
    //     //    this.per_page = event.pageSize;
    //     //    // this.config.currentPage = number;
    //     //    // this.getDoctors(number);
    //     //  this.filter = this.filter !== null ? this.filter : "";
    //     //  this.userService.getEmployees(event.pageIndex+1, event.pageSize, this.filter).subscribe( 
    //     //    (res)  =>  {
    //     //      console.log(res,'new employee list');
    //     //      this.length = res.total;
    //     //      this.employees = res.data;
    //     //      this.dataSource = new MatTableDataSource(res.data);
    //     //      this.loading =  false;
    //     //    },
    //     //    (err)  =>  {
    //     //      console.log("Error:"+err.status);
    //     //    }
    //     //    );
    //   }
    //   passwordMatchValidator(form: FormGroup) {
    //       const condition = form.get('password').value !== form.get('confirmPassword').value;
    //       return condition ? { passwordsDoNotMatch: true} : null;
    //   }
    //   passwordStrenghtValidator(form: FormGroup){
    //     let hasNumber = /\d/.test(form.get('password').value);
    //     let hasUpper = /[A-Z]/.test(form.get('password').value);
    //     let hasLower = /[a-z]/.test(form.get('password').value);
    //     const valid = hasNumber && hasUpper && hasLower;
    //     return !valid ? { strong: true } : null;
    //   }
    //   getMember(){
    //     this.projectService.getAllMember(this.project_name).subscribe( res => {
    //       this.dataSource = new MatTableDataSource(res.data);
    //       this.users = res.data;
    //       this.length = res.total;
    //     });
    //   }
    //   toggleMemberForm(){
    //     if(! this.memberFormShow ) this.memberFormShow = true;
    //     else  this.memberFormShow = false;
    //     return false;
    //   }
    //   toggleMemberSearchForm(){
    //     if(! this.showMemberSearchForm ) this.showMemberSearchForm = true;
    //     else  this.showMemberSearchForm = false;
    //     return false;
    //   }
    //   memberSearch(term:string){
    //     this.memberService.searchMember(term).subscribe(res=>{
    //       if(res.length){
    //         this.memberSearchResult = res;
    //       } else {
    //         this.memberSearchResult = [];
    //       }
    //     });
    //     return false;
    //   }
    //   addMemberToProject(member:any){
    //     let memberObj = {
    //       user_id:member.user.id,
    //       project_id: this.project_id,
    //     };
    //     this.memberService.save(memberObj).subscribe( res => {
    //       if(res){
    //         this.snackBar.open('User '+res+' Member has been added to the project', 'X', {
    //                 duration: 5000,
    //                 direction: "ltr",
    //                 verticalPosition:"top",
    //                 horizontalPosition: "right",
    //                 panelClass: "success-snack"
    //             }
    //         );
    //       }
    //     });
    //     return false;
    //   }
    //   addNewAccountToProject(){
    //     if(this.memberForm.valid){
    //       let username = this.memberForm.value.username;
    //       let name = username;
    //       let email = this.memberForm.value.email;
    //       let password = this.memberForm.value.password;
    //       let role_id = this.memberForm.value.role_id;
    //       let account = {
    //           username:username,
    //           email:email,
    //           name:name,
    //           password:password,
    //           role_id: role_id
    //         };
    //       // Save Account information
    //       this.userService.save(account).subscribe( (res) => {
    //         let save_account:any = res;
    //         if(save_account.id){
    //           let account_info = {
    //             first_name:this.memberForm.value.first_name,
    //             last_name:this.memberForm.value.last_name,
    //             user_id:save_account.id,
    //           };
    //           // Save additional information
    //           this.userService.saveinfo(account_info).subscribe( (res) => {
    //             if(res){
    //               let memberObj = {
    //                 user_id:save_account.id,
    //                 project_id: this.project_id,
    //               };
    //               // Save Membership information
    //               this.memberService.save(memberObj).subscribe( res => {
    //                 this.getMember();
    //                 this.memberForm.reset();
    //                 this.toggleMemberForm();
    //               });
    //             }
    //           });
    //           this.snackBar.open('New Member has been added', 'X', {
    //                   duration: 5000,
    //                   direction: "ltr",
    //                   verticalPosition:"top",
    //                   horizontalPosition: "right",
    //                   panelClass: "success-snack"
    //               }
    //           );
    //         } else {
    //           this.snackBar.open('An error occured during  account creation.', 'X', {
    //                   duration: 5000,
    //                   direction: "ltr",
    //                   verticalPosition:"top",
    //                   horizontalPosition: "right",
    //                   panelClass: "fail-snack"
    //               }
    //           );
    //         }
    //       });
    //     } else {
    //        this.snackBar.open('An error occured during  account creation.', 'X', {
    //                   duration: 5000,
    //                   direction: "ltr",
    //                   verticalPosition:"top",
    //                   horizontalPosition: "right",
    //                   panelClass: "fail-snack"
    //               }
    //           );
    //     }
    //     return false;
    //   }
    //   removeUser(user_id:any){
    //     this.memberService.delete(user_id).subscribe( (res:any) =>{
    //       if(res == null){
    //         this.dataSource.data = this.dataSource.data.filter( (user:any) => user.user_id !== user_id);
    //         this.snackBar.open('User has been removed!', 'X', {
    //                 duration: 5000,
    //                 direction: "ltr",
    //                 verticalPosition:"top",
    //                 horizontalPosition: "right",
    //                 panelClass: "success-snack"
    //             }
    //         );
    //       }
    //     });
    //   }
    //   removeUserFromProject(member:any){
    //     this.memberService.removeUserFromProject(member.id).subscribe( (res:any) =>{
    //       if(res == null){
    //         this.dataSource.data = this.dataSource.data.filter( (user:any) => user.user_id !== member.user_id);
    //         this.snackBar.open('User has been removed!', 'X', {
    //                 duration: 5000,
    //                 direction: "ltr",
    //                 verticalPosition:"top",
    //                 horizontalPosition: "right",
    //                 panelClass: "success-snack"
    //             }
    //         );
    //       }
    //     });
    //   }
    CreateAccountComponent.prototype.activateAccount = function () {
        var _this = this;
        if (this.memberForm.valid) {
            var username_1 = this.memberForm.value.username;
            var name_1 = username_1;
            var email = this.token_info.email;
            var password = this.memberForm.value.password;
            var role_id = this.memberForm.value.role_id;
            var account_1 = {
                username: username_1,
                email: email,
                name: name_1,
                password: password,
                role_id: role_id
            };
            this.userService.verifyUniqueUsername(username_1).subscribe(function (res) {
                if (res.result) {
                    _this.uniqueUsername = { unique: true };
                    // Save Account information
                    _this.userService.save(account_1).subscribe(function (res) {
                        var save_account = res;
                        if (save_account.id) {
                            var account_info = {
                                first_name: _this.memberForm.value.first_name,
                                last_name: _this.memberForm.value.last_name,
                                user_id: save_account.id,
                            };
                            var processed_membeship_1 = 0;
                            var account_activated_1 = false;
                            // Save additional information
                            _this.userService.saveinfo(account_info).subscribe(function (res) {
                                if (res) {
                                    var to_process_membeship_1 = _this.token_info.membership.length;
                                    _this.token_info.membership.forEach(function (mem) {
                                        var memberObj = {
                                            user_id: save_account.id,
                                            project_id: mem.project_id,
                                            client_id: _this.token_info.client_id
                                        };
                                        // Save Membership information
                                        _this.memberService.save(memberObj).subscribe(function (res) {
                                            if (res.id) {
                                                processed_membeship_1++;
                                                if (processed_membeship_1 == to_process_membeship_1) {
                                                    account_activated_1 = true;
                                                }
                                                if (account_activated_1) {
                                                    // Delete the token after activation
                                                    _this.clientService.deleteToken(_this.token_info.token).subscribe(function (res) {
                                                        _this.snackBar.open('Account has been activated', 'X', {
                                                            duration: 5000,
                                                            direction: "ltr",
                                                            verticalPosition: "top",
                                                            horizontalPosition: "right",
                                                            panelClass: "success-snack"
                                                        });
                                                        _this.account_activated = true;
                                                    });
                                                }
                                            }
                                            else {
                                            }
                                        });
                                    }); // Foreach ends
                                }
                            });
                        }
                    });
                }
                else {
                    _this.uniqueUsername.unique = { unique: false };
                    _this.uniqueUsername.error_message = username_1 + ' as username is already taken.';
                }
            });
            // Save Account information
            // this.userService.save(account).subscribe((res) => {
            //   let save_account: any = res;
            //   if (save_account.id) {
            //     let account_info = {
            //       first_name: this.memberForm.value.first_name,
            //       last_name: this.memberForm.value.last_name,
            //       user_id: save_account.id,
            //     };
            //     // Save additional information
            //     this.userService.saveinfo(account_info).subscribe((res) => {
            //       if (res) {
            //         let memberObj = {
            //           user_id: save_account.id,
            //           project_id: this.project_id,
            //         };
            //         // Save Membership information
            //         this.memberService.save(memberObj).subscribe(res => {
            //           // this.getMember();
            //           this.memberForm.reset();
            //           // this.toggleMemberForm();
            //         });
            //       }
            //     });
            //     this.snackBar.open('New Member has been added', 'X', {
            //       duration: 5000,
            //       direction: "ltr",
            //       verticalPosition: "top",
            //       horizontalPosition: "right",
            //       panelClass: "success-snack"
            //     }
            //     );
            //   } else {
            //     this.snackBar.open('An error occured during  account creation.', 'X', {
            //       duration: 5000,
            //       direction: "ltr",
            //       verticalPosition: "top",
            //       horizontalPosition: "right",
            //       panelClass: "fail-snack"
            //     }
            //     );
            //   }
            // });
        }
        else {
            this.snackBar.open('An error occured during  account creation.', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: "fail-snack"
            });
        }
        return false;
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], CreateAccountComponent.prototype, "paginator", void 0);
    CreateAccountComponent = tslib_1.__decorate([
        Component({
            selector: 'app-account-create',
            templateUrl: './create-account.component.html',
            styleUrls: ['./create-account.component.scss'],
            animations: [
                trigger('enterAnimation', [
                    transition(':enter', [
                        style({ transform: 'translateX(100%)', opacity: 0 }),
                        animate('150ms', style({ transform: 'translateX(0)', opacity: 1 }))
                    ]),
                    transition(':leave', [
                        style({ transform: 'translateX(0)', opacity: 1 }),
                        animate('150ms', style({ transform: 'translateX(100%)', opacity: 0 }))
                    ])
                ])
            ],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            HttpClient,
            ActivatedRoute,
            UserService,
            AuthService,
            ProjectService,
            MemberService,
            ClientService,
            FormBuilder,
            MatSnackBar,
            MatDialog])
    ], CreateAccountComponent);
    return CreateAccountComponent;
}());
export { CreateAccountComponent };
//# sourceMappingURL=create-account.component.js.map