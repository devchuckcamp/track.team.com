import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
var TicketComponent = /** @class */ (function () {
    function TicketComponent(ticketService, projectService, threadService, authService, settingService, router, route, formBuilder, snackBar) {
        this.ticketService = ticketService;
        this.projectService = projectService;
        this.threadService = threadService;
        this.authService = authService;
        this.settingService = settingService;
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.tickets = [];
        this.members = [];
        this.tag_users = [];
        this.ticketPriorities = [];
        this.tagged_members = new FormControl();
        this.assignees = new FormControl();
        this.ticketToAdd = new Object();
        // File Upload
        this.files = [];
        this.loggedin_user = "Admin";
        this.replayView = false;
        this.loading = false;
        this.submitting = false;
    }
    TicketComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth = this.authService.getAuthUser();
        this.settingService.settings.subscribe(function (res) {
            _this.ticketPriorities = res;
        });
        this.route.params.subscribe(function (params) {
            if (params['project_name'] !== undefined) {
                _this.project_name = params['project_name'];
            }
        });
        this.ticketToAdd.title = '';
        this.ticketToAdd.description = '';
        this.ticketToAdd.assigned_to = null;
        this.ticketToAdd.assignees = null;
        this.ticketToAdd.status_id = null;
        this.replayText = "";
        this.ticketFormShow = false;
        this.ticketForm = new FormGroup({
            'title': new FormControl('', [Validators.required,]),
            'description': new FormControl('', [Validators.required,]),
            'priority': new FormControl('', [Validators.required,]),
            'assigned_to': new FormControl('', []),
            'assignees': new FormControl('', []),
        });
        this.projectService.getAllMemberFullList(this.project_name).subscribe(function (res) {
            console.log(res);
            if (res) {
                _this.members = res;
                _this.taggable_members = res;
                // console.log(this.taggable_members, 'taggable_members');
            }
            // this.length = res.total;
        });
        // const membersObservable = this.projectService.getAllMemberObs(this.project_name);
        // membersObservable.subscribe(( members:Members[]) => { this.members = members; });
        // const taggableMembersObservable = this.projectService.getAllMemberObs(this.project_name);
        // taggableMembersObservable.subscribe(( taggable_members:TaggableMembers[]) => { this.taggable_members = taggable_members; console.log(taggable_members,'taggable_members') });
        this.route.params.subscribe(function (params) {
            if (params['project_name'] !== undefined) {
                _this.project_name = params['project_name'];
                _this.loading = true;
                if (params['filter_type'] !== undefined) {
                    _this.getFilterTicket(params['project_name'], params['filter_type']);
                }
                else {
                    _this.getTicket(params['project_name']);
                }
                _this.projectService.getProject(params['project_name']).subscribe(function (res) {
                    if (res)
                        _this.project_id = res.id;
                });
            }
            else {
            }
        });
    };
    TicketComponent.prototype.ngOnDestroy = function () {
    };
    TicketComponent.prototype.assignTo = function (id) {
        // this.taggable_members = this.members;
        // let new_taggable_members = this.taggable_members.filter( member => member.user_id != id);
        // this.taggable_members = new_taggable_members;
    };
    TicketComponent.prototype.tagTo = function (member) {
    };
    TicketComponent.prototype.isTagged = function (member_id) {
        if (this.ticketForm.value.assigned_to == member_id) {
            return true;
        }
        return false;
    };
    TicketComponent.prototype.getFilterTicket = function (project_name, filter) {
        var _this = this;
        this.ticketService.getProjectTicketFilter(project_name, filter).subscribe(function (res) {
            _this.loading = false;
            _this.tickets = res.data;
            _this.tag_users = res.data.tag_users;
        });
    };
    TicketComponent.prototype.getTicket = function (project_name) {
        var _this = this;
        this.ticketService.getProjectTicketAll(project_name).subscribe(function (res) {
            _this.loading = false;
            _this.tickets = res.data;
            _this.tag_users = res.data.tag_users;
        });
    };
    TicketComponent.prototype.viewTicket = function (ticket) {
        this.ticket = ticket;
        return false;
    };
    TicketComponent.prototype.onReplayKey = function (text) {
        this.replayText = text;
        return false;
    };
    TicketComponent.prototype.submitReplyBox = function () {
        var _this = this;
        if (this.replayView) {
            // Check replay
            if (this.replayText !== '') {
                this.loading = true;
                this.replayView = false;
                var thread = {
                    "ticket_id": this.ticket.id,
                    "user_id": this.auth.id,
                    "message": this.replayText,
                };
                this.threadService.send(thread).subscribe(function (res) {
                    _this.loading = false;
                    _this.ticket.thread.push(res);
                });
            }
            else {
            }
        }
        else {
            this.replayView = true;
        }
        return false;
    };
    TicketComponent.prototype.dropped = function (event) {
        this.files = event.files;
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var droppedFile = _a[_i];
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry = droppedFile.fileEntry;
                fileEntry.file(function (file) {
                    // Here you can access the real file
                    // console.log(droppedFile.relativePath, file);
                    /**
                    // You could upload it like this:
                    const formData = new FormData()
                    formData.append('logo', file, relativePath)
           
                    // Headers
                    const headers = new HttpHeaders({
                      'security-token': 'mytoken'
                    })
           
                    this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                    .subscribe(data => {
                      // Sanitized logo returned from backend
                    })
                    **/
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
                // console.log(droppedFile.relativePath, fileEntry);
            }
        }
    };
    TicketComponent.prototype.fileOver = function (event) {
        // console.log(event);
    };
    TicketComponent.prototype.fileLeave = function (event) {
        // console.log(event);
    };
    TicketComponent.prototype.toggleTicketForm = function () {
        if (!this.ticketFormShow)
            this.ticketFormShow = true;
        else
            this.ticketFormShow = false;
        return false;
    };
    TicketComponent.prototype.getTaggedMember = function (ticket) {
        if (ticket === void 0) { ticket = null; }
        var membersTagged = [];
        if (this.tagged_members.value) {
            this.tagged_members.value.forEach(function (obj) {
                var member = {
                    ticket_id: ticket,
                    user_id: obj.user.id
                };
                membersTagged.push(member);
            });
        }
        return membersTagged;
    };
    TicketComponent.prototype.getAssignedMembers = function (ticket_id) {
        var _this = this;
        if (ticket_id === void 0) { ticket_id = null; }
        var membersAssigned = [];
        if (this.ticketToAdd.assignees.length) {
            this.ticketToAdd.assignees.forEach(function (obj) {
                var member = {
                    ticket_id: ticket_id,
                    project_id: _this.project_id,
                    user_id: obj.id
                };
                membersAssigned.push(member);
            });
        }
        return membersAssigned;
    };
    TicketComponent.prototype.addNewTicket = function () {
        var _this = this;
        if (this.ticketForm.valid) {
            var title = this.ticketForm.value.title;
            var description = this.ticketForm.value.description;
            var assigned_to = this.ticketForm.value.assigned_to;
            var ticket = {
                title: title,
                description: description,
                assigned_to: null,
                project_id: this.project_id,
                priority_id: this.ticketToAdd.priority,
            };
            console.log(this.ticketToAdd, 'ticketToAdd');
            this.submitting = true;
            this.ticketService.save(ticket).subscribe(function (res) {
                if (res) {
                    var added_ticket = res;
                    var tagged = _this.getTaggedMember(added_ticket.id);
                    if (tagged.length) {
                        _this.ticketService.addTaggedUser(tagged).subscribe(function (res) {
                        });
                    }
                    if (_this.ticketToAdd.assignees.length) {
                        var assigned_members = _this.getAssignedMembers(added_ticket.id);
                        console.log(assigned_members, 'assigned_members');
                        _this.addAssignees(assigned_members);
                        _this.submitting = false;
                    }
                    if (!_this.submitting) {
                        console.log(tagged, 'tagged');
                        _this.tickets = [];
                        _this.loading = true;
                        _this.ticketFormShow = false;
                        _this.ticketForm.reset();
                        _this.snackBar.open('Data has been updated', 'X', {
                            duration: 5000,
                            direction: "ltr",
                            verticalPosition: "top",
                            horizontalPosition: "right",
                            panelClass: "success-snack"
                        });
                        _this.ticketToAdd = {};
                        // Refresh ticket table
                        _this.getTicket(_this.project_name);
                    }
                }
                else {
                    _this.snackBar.open('Data entered is not valid!', 'X', {
                        duration: 5000,
                        direction: "ltr",
                        verticalPosition: "top",
                        horizontalPosition: "right",
                        panelClass: "fail-snack"
                    });
                }
                _this.loading = false;
                _this.submitting = false;
            });
        }
        else {
            this.snackBar.open('Please fill up required fields!', 'X', {
                duration: 5000,
                direction: "ltr",
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: "fail-snack"
            });
        }
        return false;
    };
    TicketComponent.prototype.addAssignees = function (assignees) {
        this.ticketService.addAssignees(assignees).subscribe(function (res) {
            console.log(res, 'saved assinees');
        });
    };
    TicketComponent.prototype.deleteTicket = function (ticket_id) {
        var _this = this;
        console.log(ticket_id);
        this.ticketService.delete(ticket_id).subscribe(function (res) {
            console.log(res);
            if (res == null) {
                _this.getTicket(_this.project_name);
                _this.snackBar.open('Ticket has been deleted', 'X', {
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
    TicketComponent = tslib_1.__decorate([
        Component({
            selector: 'app-ticket',
            templateUrl: './ticket.component.html',
            styleUrls: ['./ticket.component.scss'],
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
        tslib_1.__metadata("design:paramtypes", [TicketService,
            ProjectService,
            ThreadService,
            AuthService,
            SettingService,
            Router,
            ActivatedRoute,
            FormBuilder,
            MatSnackBar])
    ], TicketComponent);
    return TicketComponent;
}());
export { TicketComponent };
//# sourceMappingURL=ticket.component.js.map