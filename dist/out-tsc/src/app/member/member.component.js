import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { ProjectService } from '../service/project.service';
import { MemberService } from '../service/member.service';
import { MatPaginator, MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { ConfirmDeleteDialog } from '../share/alert/confirm-delete-dialog.component';
var ELEMENT_DATA = [];
var projectsInvitationList = [];
/** Error when the parent is invalid */
var CrossFieldErrorMatcher = /** @class */ (function () {
    function CrossFieldErrorMatcher() {
    }
    CrossFieldErrorMatcher.prototype.isErrorState = function (control, form) {
        return control.dirty && form.invalid;
    };
    return CrossFieldErrorMatcher;
}());
var MemberComponent = /** @class */ (function () {
    // projectsInvitationList = [];
    function MemberComponent(router, http, route, userService, authService, projectService, memberService, formBuilder, snackBar, dialog) {
        this.router = router;
        this.http = http;
        this.route = route;
        this.userService = userService;
        this.authService = authService;
        this.projectService = projectService;
        this.memberService = memberService;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.displayedColumns = ['avatar', 'username', 'first_name', 'last_name', 'email', 'action'];
        // MatPaginator Inputs
        this.length = 0;
        this.pageSize = 25;
        this.pageSizeOptions = [25, 50, 100];
        // Form
        this.errorMatcher = new CrossFieldErrorMatcher();
        this.memberInviteFormShow = false;
        this.memberToAdd = {};
        this.memberToInvite = {};
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.default_avatar = '../assets/default-profile.png';
        this.loading = '../../assets/icon/loading.gif';
        this.submitting = false;
        this.submittingInvitation = false;
        this.submittedInvitation = false;
        this.projects = [];
        this.projectsSearchable = [];
    }
    MemberComponent.prototype.confirmRemoveFromProject = function (member_info) {
        var _this = this;
        var dialogRef = this.dialog.open(ConfirmDeleteDialog, {
            width: '280px',
            data: { member_info: member_info }
        });
        dialogRef.componentInstance.confirmMessage = "Are you sure you want to remove " + member_info.user.user_details.first_name + " " + member_info.user.user_details.last_name + "'s account from this project.";
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result, 'closed dialog');
            if (result) {
                // this.removeUser(user);
                _this.removeUserFromProject(member_info);
            }
        });
    };
    MemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth = this.authService.getAuthUser();
        this.setClient();
        this.projectService.loadAll();
        this.projectService.projects.subscribe(function (res) {
            _this.projects = res;
        });
        this.memberFormShow = false;
        this.showMemberSearchForm = false;
        this.memberToAdd.title = '';
        this.memberToAdd.description = '';
        this.memberToAdd.assigned_to = null;
        this.memberToAdd.status_id = null;
        // invites
        this.memberToInvite.email = null;
        this.memberToInvite.projects = [];
        this.length = 0;
        this.memberInviteForm = this.formBuilder.group({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'projects': new FormControl([], [Validators.required]),
        });
        this.memberForm = this.formBuilder.group({
            'username': new FormControl('', [Validators.required]),
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required]),
            'confirmPassword': new FormControl('', [Validators.required]),
            'role_id': new FormControl('', [Validators.required]),
            'first_name': new FormControl('', [Validators.required]),
            'last_name': new FormControl('', [Validators.required]),
        }, {
            validator: [this.passwordMatchValidator, this.passwordStrenghtValidator],
        });
        this.route.params.subscribe(function (params) {
            if (params['project_name'] !== undefined) {
                _this.project_name = params['project_name'];
                _this.projectService.getProject(params['project_name']).subscribe(function (res) {
                    if (res) {
                        _this.project_id = res.id;
                        projectsInvitationList.push(res.id);
                    }
                    _this.projectsSearchable = _this.filterProjectInvite();
                    console.log(_this.projects, 'complete projects list');
                    console.log(_this.projectsSearchable, 'projectsSearchable list');
                    console.log(projectsInvitationList, 'projectsInvitationList list');
                });
                _this.getMember();
            }
        });
        this.dataSource.paginator = this.paginator;
    };
    MemberComponent.prototype.filterProjectInvite = function () {
        return this.projects.filter(function (project) {
            return !projectsInvitationList.includes(project.id);
        });
    };
    MemberComponent.prototype.includeProjectInvitation = function (project) {
        projectsInvitationList.push(project.id);
    };
    MemberComponent.prototype.setClient = function () {
        var _this = this;
        this.subscription = this.userService.currentClientInfo.subscribe(function (client) { _this.auth_client_info = JSON.parse(client); });
    };
    Object.defineProperty(MemberComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.memberForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MemberComponent.prototype, "invite", {
        get: function () { return this.memberInviteForm.controls; },
        enumerable: true,
        configurable: true
    });
    MemberComponent.prototype.setPageSizeOptions = function (setPageSizeOptionsInput) {
        console.log(setPageSizeOptionsInput);
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(function (str) { return +str; });
    };
    //Pagination Section
    MemberComponent.prototype.onPageChange = function (event) {
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
    };
    MemberComponent.prototype.passwordMatchValidator = function (form) {
        var condition = form.get('password').value !== form.get('confirmPassword').value;
        return condition ? { passwordsDoNotMatch: true } : null;
    };
    MemberComponent.prototype.passwordStrenghtValidator = function (form) {
        var hasNumber = /\d/.test(form.get('password').value);
        var hasUpper = /[A-Z]/.test(form.get('password').value);
        var hasLower = /[a-z]/.test(form.get('password').value);
        var valid = hasNumber && hasUpper && hasLower;
        return !valid ? { strong: true } : null;
    };
    MemberComponent.prototype.getMember = function () {
        var _this = this;
        this.projectService.getAllMember(this.project_name).subscribe(function (res) {
            _this.dataSource = new MatTableDataSource(res.data);
            _this.users = res.data;
            _this.length = res.total;
        });
    };
    MemberComponent.prototype.toggleMemberForm = function () {
        if (!this.memberFormShow)
            this.memberFormShow = true;
        else
            this.memberFormShow = false;
        return false;
    };
    MemberComponent.prototype.toggleMemberSearchForm = function () {
        if (!this.showMemberSearchForm)
            this.showMemberSearchForm = true;
        else
            this.showMemberSearchForm = false;
        return false;
    };
    MemberComponent.prototype.toggleAccountInviteForm = function () {
        // Member List Form
        if (!this.memberInviteFormShow) {
            this.memberFormShow = false;
            this.showMemberSearchForm = false;
            this.memberInviteFormShow = true;
        }
        else {
            this.memberFormShow = false;
            this.showMemberSearchForm = false;
            this.memberInviteFormShow = false;
        }
        return false;
    };
    MemberComponent.prototype.memberSearch = function (term) {
        var _this = this;
        this.memberService.searchMember(term).subscribe(function (res) {
            if (res.length) {
                _this.memberSearchResult = res;
            }
            else {
                _this.memberSearchResult = [];
            }
        });
        return false;
    };
    MemberComponent.prototype.addMemberToProject = function (member) {
        var _this = this;
        var memberObj = {
            user_id: member.user.id,
            project_id: this.project_id,
        };
        this.memberService.save(memberObj).subscribe(function (res) {
            if (res) {
                _this.snackBar.open('User ' + res + ' Member has been added to the project', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition: "top",
                    horizontalPosition: "right",
                    panelClass: "success-snack"
                });
            }
        });
        return false;
    };
    MemberComponent.prototype.inviteAccountToProjects = function () {
        console.log(this.memberInviteForm.value);
        return false;
    };
    MemberComponent.prototype.addNewAccountToProject = function () {
        var _this = this;
        if (this.memberForm.valid) {
            var username = this.memberForm.value.username;
            var name_1 = username;
            var email = this.memberForm.value.email;
            var password = this.memberForm.value.password;
            var role_id = this.memberForm.value.role_id;
            var account = {
                username: username,
                email: email,
                name: name_1,
                password: password,
                role_id: role_id
            };
            // Save Account information
            this.userService.save(account).subscribe(function (res) {
                var save_account = res;
                if (save_account.id) {
                    var account_info = {
                        first_name: _this.memberForm.value.first_name,
                        last_name: _this.memberForm.value.last_name,
                        user_id: save_account.id,
                    };
                    // Save additional information
                    _this.userService.saveinfo(account_info).subscribe(function (res) {
                        if (res) {
                            var memberObj = {
                                user_id: save_account.id,
                                project_id: _this.project_id,
                            };
                            // Save Membership information
                            _this.memberService.save(memberObj).subscribe(function (res) {
                                _this.getMember();
                                _this.memberForm.reset();
                                _this.toggleMemberForm();
                            });
                        }
                    });
                    _this.snackBar.open('New Member has been added', 'X', {
                        duration: 5000,
                        direction: "ltr",
                        verticalPosition: "top",
                        horizontalPosition: "right",
                        panelClass: "success-snack"
                    });
                }
                else {
                    _this.snackBar.open('An error occured during  account creation.', 'X', {
                        duration: 5000,
                        direction: "ltr",
                        verticalPosition: "top",
                        horizontalPosition: "right",
                        panelClass: "fail-snack"
                    });
                }
            });
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
    MemberComponent.prototype.removeUser = function (user_id) {
        var _this = this;
        this.memberService.delete(user_id).subscribe(function (res) {
            if (res == null) {
                _this.dataSource.data = _this.dataSource.data.filter(function (user) { return user.user_id !== user_id; });
                _this.snackBar.open('User has been removed!', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition: "top",
                    horizontalPosition: "right",
                    panelClass: "success-snack"
                });
            }
        });
    };
    MemberComponent.prototype.removeUserFromProject = function (member) {
        var _this = this;
        this.memberService.removeUserFromProject(member.id).subscribe(function (res) {
            if (res == null) {
                _this.dataSource.data = _this.dataSource.data.filter(function (user) { return user.user_id !== member.user_id; });
                _this.snackBar.open('User has been removed!', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition: "top",
                    horizontalPosition: "right",
                    panelClass: "success-snack"
                });
            }
        });
    };
    tslib_1.__decorate([
        ViewChild(MatPaginator),
        tslib_1.__metadata("design:type", MatPaginator)
    ], MemberComponent.prototype, "paginator", void 0);
    MemberComponent = tslib_1.__decorate([
        Component({
            selector: 'app-member',
            templateUrl: './member.component.html',
            styleUrls: ['./member.component.scss'],
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
            FormBuilder,
            MatSnackBar,
            MatDialog])
    ], MemberComponent);
    return MemberComponent;
}());
export { MemberComponent };
//# sourceMappingURL=member.component.js.map