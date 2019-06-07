import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TicketService } from '../service/ticket.service';
import { ThreadService } from '../service/thread.service';
import { AuthService } from '../service/auth.service';
import { ProjectService } from '../service/project.service';
import { SettingService } from '../service/setting.service';
import { GlobalRoutesService } from '../config/config';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogOverviewExampleDialog } from './dialog-attachment-overview.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var ImageSnippet = /** @class */ (function () {
    function ImageSnippet(src, file) {
        this.src = src;
        this.file = file;
    }
    return ImageSnippet;
}());
var mentionedMember = [];
var memberListArray = [];
var TicketDetailComponent = /** @class */ (function () {
    function TicketDetailComponent(ticketService, threadService, authService, projectService, settingService, router, route, snackBar, dialog, http, globalRoutesService, sanitizer) {
        this.ticketService = ticketService;
        this.threadService = threadService;
        this.authService = authService;
        this.projectService = projectService;
        this.settingService = settingService;
        this.router = router;
        this.route = route;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.http = http;
        this.globalRoutesService = globalRoutesService;
        this.sanitizer = sanitizer;
        this.tickets = [];
        this.uploadImages = [];
        this.pdfImages = '../assets/pdf-file-preview.png';
        this.members = [];
        this.assigned_user = [];
        this.assignableMembers = [];
        this.settings = [];
        this.memberList = [];
        this.items = [];
        this.uploader = new FileUploader({});
        this.hasBaseDropZoneOver = false;
        this.apiEndpoint = this.globalRoutesService.apiEndPoint();
        // File Upload
        this.files = [];
        this.pdf = '';
        this.requests = [];
        this.auth = this.authService.getAuthUser();
        this.loggedin_user = "";
        this.replyView = false;
        this.loading = false;
        this.loggedin_user = this.auth.username;
    }
    TicketDetailComponent.prototype.openDialog = function (uploads) {
        var _this = this;
        var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '100%',
            height: '100%',
            data: { uploads: uploads }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.animal = result;
        });
    };
    TicketDetailComponent.prototype.getSantizeUrl = function (url) {
        if (url.includes("application/pdf")) {
            url = this.pdfImages;
        }
        return this.sanitizer.bypassSecurityTrustUrl(url);
    };
    TicketDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.assignableMembersFiltered = false;
        // Settings
        this.settingService.settings.subscribe(function (res) {
            _this.settings = res;
        });
        this.replayText = "";
        this.route.params.subscribe(function (params) {
            if (params['ticket_id'] !== undefined) {
                _this.project_name = params['project_name'];
                _this.auth = _this.authService.getAuthUser();
                _this.ticketService.getProjectTicket(params['project_name'], params['ticket_id']).subscribe(function (res) {
                    if (res) {
                        _this.ticket = res;
                        _this.assigned_user = res.assignees.map(function (assgn) {
                            return assgn.user_id;
                        });
                    }
                    _this.loading = true;
                    _this.threadService.getAllTicketThread(res.id).subscribe(function (res) {
                        if (res.data) {
                            _this.thread = res.data;
                        }
                        _this.loading = false;
                    });
                });
            }
            else {
            }
        });
        this.mentionConfig = {
            mentions: [{
                    items: this.items,
                    triggerChar: "@",
                    labelKey: "first_name",
                    disableSearch: false,
                    mentionSelect: this.itemMentioned
                }
            ]
        };
        // Get all member
        this.projectService.getAllMemberFullList(this.project_name).subscribe(function (res) {
            if (res) {
                console.log(res, 'members');
                _this.members = res;
                for (var i = 0; i < _this.members.length; i++) {
                    memberListArray.push(_this.members[i].user);
                }
                _this.memberList = _this.members;
                for (var i = 0; i < _this.members.length; i++) {
                    _this.items.push(_this.members[i].user.user_details);
                }
            }
        });
    };
    TicketDetailComponent.prototype.searchMemberToAssign = function (keyword) {
        var _this = this;
        this.projectService.getAllMemberFullList(this.project_name, keyword).subscribe(function (res) {
            _this.filterAssignableMember(res);
            _this.assignableMembersFiltered = true;
        });
    };
    TicketDetailComponent.prototype.filterAssignableMember = function (members) {
        var _this = this;
        this.members = members;
        this.assignableMembers = members.filter(function (member) {
            return !_this.assigned_user.includes(member.user_id);
        });
    };
    TicketDetailComponent.prototype.ticketAssigned = function (user_id) {
        return (user_id == this.auth.id ? true : false);
    };
    TicketDetailComponent.prototype.additionalAssignee = function (assignee) {
        var _this = this;
        if (!this.assigned_user.includes(assignee.user_id)) {
            var assigneeObj = [{
                    ticket_id: this.ticket.id,
                    user_id: assignee.user_id,
                    project_id: assignee.project_id
                }];
            // Call add assignee service
            this.ticketService.addAssignees(assigneeObj).subscribe(function (res) {
                if (res.length) {
                    _this.assigned_user.push(assignee.user_id);
                    _this.ticket.assignees.push(assignee);
                    _this.filterAssignableMember(_this.members);
                    _this.snackBar.open('Assignee has been updated', 'X', {
                        duration: 5000,
                        direction: "ltr",
                        verticalPosition: "top",
                        horizontalPosition: "right",
                        panelClass: "success-snack"
                    });
                }
            }, function (err) {
                console.log('ERROR:', err);
            });
        }
        else {
            console.log(assignee, 'member already assigned');
        }
    };
    TicketDetailComponent.prototype.closeAssigneeSearchResults = function () {
        this.assignableMembersFiltered = false;
        return false;
    };
    TicketDetailComponent.prototype.viewTicket = function (ticket) {
        this.ticket = ticket;
        return false;
    };
    TicketDetailComponent.prototype.onReplayKey = function (text) {
        this.replayText = text;
        return false;
    };
    TicketDetailComponent.prototype.auto_grow = function (element) {
        //console.log(element);
        // element.style.height = "5px";
        // element.style.height = (element.scrollHeight)+"px";
        var style = { 'min-height': '200px', 'max-height': '300px' };
        return style;
    };
    TicketDetailComponent.prototype.submitReplyBox = function () {
        var _this = this;
        if (this.replyView) {
            // Check replay
            if (this.replayText !== '') {
                this.loading = true;
                this.replyView = false;
                var thread = {
                    "ticket_id": this.ticket.id,
                    "user_id": this.auth.id,
                    "message": this.replayText,
                    "files": this.uploadImages
                };
                this.threadService.send(thread).subscribe(function (res) {
                    if (res) {
                        _this.ticketService.mentionUser(mentionedMember, _this.ticket.id).subscribe(function (res) {
                            mentionedMember.length = 0;
                        });
                        _this.loading = false;
                        _this.ticket.thread.push(res);
                        _this.uploadImages = [];
                    }
                });
            }
        }
        else {
            this.replyView = true;
        }
        return false;
    };
    TicketDetailComponent.prototype.getFileType = function () {
        return this.fileType;
    };
    TicketDetailComponent.prototype.showPdf = function () {
        var linkSource = 'data:application/pdf;base64,' + this.pdf;
        var downloadLink = document.createElement("a");
        var fileName = "sample.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };
    TicketDetailComponent.prototype._handleReaderLoaded = function (readerEvt) {
        var binaryString = readerEvt.target.result;
        var base64textString = '';
        base64textString = btoa(binaryString);
        this.pdf = base64textString;
        this.uploadImages.push('data:' + this.getFileType() + ';base64,' + btoa(binaryString));
        console.log(this.uploadImages, 'uploadImages');
        return base64textString;
    };
    TicketDetailComponent.prototype.dropped = function (event) {
        var _this = this;
        this.files = event.files;
        var formData = new FormData();
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var droppedFile = _a[_i];
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                var fileEntry = droppedFile.fileEntry;
                fileEntry.file(function (file) {
                    _this.fileType = file.type;
                    if (file) {
                        var reader = new FileReader();
                        reader.onload = _this._handleReaderLoaded.bind(_this);
                        var binary = _this._handleReaderLoaded.bind(_this);
                        reader.readAsBinaryString(file);
                    }
                });
            }
            else {
                // It was a directory (empty directories are added, otherwise only files)
                var fileEntry = droppedFile.fileEntry;
            }
        }
    };
    TicketDetailComponent.prototype.getFiles = function () {
        return this.uploader.queue.map(function (fileItem) {
            return fileItem.file;
        });
    };
    TicketDetailComponent.prototype.fileOverBase = function (event) {
        this.hasBaseDropZoneOver = event;
    };
    TicketDetailComponent.prototype.upload = function () {
        var _this = this;
        var files = this.getFiles();
        files.forEach(function (file) {
            var formData = new FormData();
            formData.append('uploaded_files', file.rawFile, file.name);
            _this.requests.push(formData);
        });
        this.http.post(this.apiEndpoint + '/api/v1/thread/image/upload', this.requests, this.fileHeader())
            .subscribe(function (data) {
            // Sanitized logo returned from backend
            console.log(data, 'data');
        });
    };
    TicketDetailComponent.prototype.fileHeader = function () {
        var token = this.authService.Bearer;
        var headers = new HttpHeaders({
            'Authorization': 'Bearer' + token,
            'Content-Type': 'multipart/form-data;',
            'enctype': 'multipart/form-data',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Allow_Headers': ' Allow, Access-Control-Allow-Origin, Content-type, Accept',
            'Allow': 'GET,POST,PUT,DELETE,OPTION'
        });
        var options = { headers: headers };
        return options;
    };
    TicketDetailComponent.prototype.fileOver = function (event) {
    };
    TicketDetailComponent.prototype.fileLeave = function (event) {
    };
    TicketDetailComponent.prototype.updateTicketStatus = function (status) {
        var _this = this;
        this.ticket.status_id = status;
        var data = {
            status_id: status
        };
        this.ticketService.update(this.ticket, 'status').subscribe(function (res) {
            if (res && res.status_id == status) {
                _this.snackBar.open('Data has been updated', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition: "top",
                    horizontalPosition: "right",
                    panelClass: "success-snack"
                });
            }
            else {
            }
        });
    };
    TicketDetailComponent.prototype.updateTicketPriority = function (priority_id) {
        var _this = this;
        var priorityObj = this.settings.find(function (res) { return res.id == priority_id; });
        this.ticketService.update(this.ticket, 'priority', priorityObj).subscribe(function (res) {
            if (res && res.priority_id == status) {
                _this.ticket.priority = res;
                _this.snackBar.open('Priority has been updated', 'X', {
                    duration: 5000,
                    direction: "ltr",
                    verticalPosition: "top",
                    horizontalPosition: "right",
                    panelClass: "success-snack"
                });
            }
            else {
            }
        });
    };
    TicketDetailComponent.prototype.getImage = function (thread_id) {
        this.threadService.getImage(thread_id).subscribe(function (res) {
            return res;
        });
    };
    TicketDetailComponent.prototype.removeTagUser = function (tag_info) {
        var _this = this;
        var tag_id = tag_info.id;
        this.ticketService.removeTag(tag_id).subscribe(function (res) {
            _this.ticket.tag_users = _this.ticket.tag_users.filter(function (tag) { return tag.id !== tag_info.id; });
        });
        return false;
    };
    TicketDetailComponent.prototype.itemMentioned = function (tag) {
        var mentionedUserEmail = memberListArray.filter(function (res) { return res.id == tag.user_id; });
        var mentioned = {
            first_name: tag.first_name,
            last_name: tag.last_name,
            email: mentionedUserEmail[0].email,
            user_id: tag.user_id,
        };
        mentionedMember.push(mentioned);
        return '@' + tag.first_name + '' + tag.last_name;
    };
    TicketDetailComponent = tslib_1.__decorate([
        Component({
            selector: 'app-ticket-detail',
            templateUrl: './ticket-detail.component.html',
            styleUrls: ['./ticket.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [TicketService,
            ThreadService,
            AuthService,
            ProjectService,
            SettingService,
            Router,
            ActivatedRoute,
            MatSnackBar,
            MatDialog,
            HttpClient,
            GlobalRoutesService,
            DomSanitizer])
    ], TicketDetailComponent);
    return TicketDetailComponent;
}());
export { TicketDetailComponent };
//# sourceMappingURL=ticket-detail.component.js.map