(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"2Zpj":function(e,n,t){"use strict";t.d(n,"a",function(){return s}),t.d(n,"b",function(){return a});var r=t("CcnG"),i=t("gI3B"),o=function(){return function(e,n){this.relativePath=e,this.fileEntry=n}}(),l=function(){return function(e){this.files=e}}(),s=function(){function e(e,n){var t=this;this.zone=e,this.renderer=n,this.accept="*",this.multiple=!0,this.dropZoneLabel="",this.dropZoneClassName="ngx-file-drop__drop-zone",this.contentClassName="ngx-file-drop__content",this.showBrowseBtn=!1,this.browseBtnClassName="btn btn-primary btn-xs ngx-file-drop__browse-btn",this.browseBtnLabel="Browse files",this.onFileDrop=new r.n,this.onFileOver=new r.n,this.onFileLeave=new r.n,this.isDraggingOverDropZone=!1,this.globalDraggingInProgress=!1,this.files=[],this.numOfActiveReadEntries=0,this.helperFormEl=null,this.fileInputPlaceholderEl=null,this.dropEventTimerSubscription=null,this._disabled=!1,this.globalDragStartListener=this.renderer.listen("document","dragstart",function(e){t.globalDraggingInProgress=!0}),this.globalDragEndListener=this.renderer.listen("document","dragend",function(e){t.globalDraggingInProgress=!1})}return Object.defineProperty(e.prototype,"disabled",{get:function(){return this._disabled},set:function(e){this._disabled=null!=e&&""+e!="false"},enumerable:!0,configurable:!0}),e.prototype.ngOnDestroy=function(){this.dropEventTimerSubscription&&(this.dropEventTimerSubscription.unsubscribe(),this.dropEventTimerSubscription=null),this.globalDragStartListener(),this.globalDragEndListener(),this.files=[],this.helperFormEl=null,this.fileInputPlaceholderEl=null},e.prototype.onDragOver=function(e){this.isDropzoneDisabled()||(this.isDraggingOverDropZone||(this.isDraggingOverDropZone=!0,this.onFileOver.emit(e)),this.preventAndStop(e))},e.prototype.onDragLeave=function(e){this.isDropzoneDisabled()||(this.isDraggingOverDropZone&&(this.isDraggingOverDropZone=!1,this.onFileLeave.emit(e)),this.preventAndStop(e))},e.prototype.dropFiles=function(e){var n;!this.isDropzoneDisabled()&&(this.isDraggingOverDropZone=!1,e.dataTransfer)&&(e.dataTransfer.dropEffect="copy",n=e.dataTransfer.items?e.dataTransfer.items:e.dataTransfer.files,this.preventAndStop(e),this.checkFiles(n))},e.prototype.onBrowseButtonClick=function(e){this.fileSelector&&this.fileSelector.nativeElement&&this.fileSelector.nativeElement.click()},e.prototype.uploadFiles=function(e){this.isDropzoneDisabled()||e.target&&(this.checkFiles(e.target.files||[]),this.resetFileInput())},e.prototype.checkFiles=function(e){for(var n=this,t=function(n){var t=e[n],i=null;if(r.canGetAsEntry(t)&&(i=t.webkitGetAsEntry()),i)i.isFile?(s=new o(i.name,i),r.addToQueue(s)):i.isDirectory&&r.traverseFileTree(i,i.name);else if(t){var l={name:t.name,isDirectory:!1,isFile:!0,file:function(e){e(t)}},s=new o(l.name,l);r.addToQueue(s)}},r=this,s=0;s<e.length;s++)t(s);this.dropEventTimerSubscription&&this.dropEventTimerSubscription.unsubscribe(),this.dropEventTimerSubscription=Object(i.a)(200,200).subscribe(function(){n.files.length>0&&0===n.numOfActiveReadEntries&&(n.onFileDrop.emit(new l(n.files)),n.files=[])})},e.prototype.traverseFileTree=function(e,n){var t=this;if(e.isFile){var r=new o(n,e);this.files.push(r)}else{n+="/";var i=e.createReader(),l=[],s=function(){t.numOfActiveReadEntries++,i.readEntries(function(r){if(r.length)l=l.concat(r),s();else if(0===l.length){var i=new o(n,e);t.zone.run(function(){t.addToQueue(i)})}else for(var a=function(e){t.zone.run(function(){t.traverseFileTree(l[e],n+l[e].name)})},c=0;c<l.length;c++)a(c);t.numOfActiveReadEntries--})};s()}},e.prototype.resetFileInput=function(){if(this.fileSelector&&this.fileSelector.nativeElement){var e=this.fileSelector.nativeElement,n=e.parentElement,t=this.getHelperFormElement(),r=this.getFileInputPlaceholderElement();n!==t&&(this.renderer.insertBefore(n,r,e),this.renderer.appendChild(t,e),t.reset(),this.renderer.insertBefore(n,e,r),this.renderer.removeChild(n,r))}},e.prototype.getHelperFormElement=function(){return this.helperFormEl||(this.helperFormEl=this.renderer.createElement("form")),this.helperFormEl},e.prototype.getFileInputPlaceholderElement=function(){return this.fileInputPlaceholderEl||(this.fileInputPlaceholderEl=this.renderer.createElement("div")),this.fileInputPlaceholderEl},e.prototype.canGetAsEntry=function(e){return!!e.webkitGetAsEntry},e.prototype.isDropzoneDisabled=function(){return this.globalDraggingInProgress||this.disabled},e.prototype.addToQueue=function(e){this.files.push(e)},e.prototype.preventAndStop=function(e){e.stopPropagation(),e.preventDefault()},e}(),a=function(){return function(){}}()},XatG:function(e,n,t){"use strict";t.d(n,"b",function(){return l}),t.d(n,"c",function(){return c}),t.d(n,"a",function(){return d});var r=t("CcnG"),i=t("2Zpj"),o=t("Ip0R"),l=r.rb({encapsulation:0,styles:[".ngx-file-drop__drop-zone[_ngcontent-%COMP%]{height:100px;margin:auto;border:2px dotted #0782d0;border-radius:30px}.ngx-file-drop__drop-zone--over[_ngcontent-%COMP%]{background-color:rgba(147,147,147,.5)}.ngx-file-drop__content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100px;color:#0782d0}.ngx-file-drop__drop-zone-label[_ngcontent-%COMP%]{text-align:center}.ngx-file-drop__file-input[_ngcontent-%COMP%]{display:none}"],data:{}});function s(e){return r.Nb(0,[(e()(),r.tb(0,0,null,null,1,"div",[["class","ngx-file-drop__drop-zone-label"]],null,null,null,null,null)),(e()(),r.Lb(1,null,["",""]))],null,function(e,n){e(n,1,0,n.component.dropZoneLabel)})}function a(e){return r.Nb(0,[(e()(),r.tb(0,0,null,null,1,"div",[],null,null,null,null,null)),(e()(),r.tb(1,0,null,null,0,"input",[["type","button"]],[[8,"className",0],[8,"value",0]],[[null,"click"]],function(e,n,t){var r=!0;return"click"===n&&(r=!1!==e.component.onBrowseButtonClick(t)&&r),r},null,null))],null,function(e,n){var t=n.component;e(n,1,0,t.browseBtnClassName,r.vb(1,"",t.browseBtnLabel,""))})}function c(e){return r.Nb(0,[r.Jb(402653184,1,{fileSelector:0}),(e()(),r.tb(1,0,null,null,7,"div",[],[[8,"className",0],[2,"ngx-file-drop__drop-zone--over",null]],[[null,"drop"],[null,"dragover"],[null,"dragleave"]],function(e,n,t){var r=!0,i=e.component;return"drop"===n&&(r=!1!==i.dropFiles(t)&&r),"dragover"===n&&(r=!1!==i.onDragOver(t)&&r),"dragleave"===n&&(r=!1!==i.onDragLeave(t)&&r),r},null,null)),(e()(),r.tb(2,0,null,null,6,"div",[],[[8,"className",0]],null,null,null,null)),r.Cb(null,0),(e()(),r.kb(16777216,null,null,1,null,s)),r.sb(5,16384,null,0,o.n,[r.S,r.P],{ngIf:[0,"ngIf"]},null),(e()(),r.tb(6,0,[[1,0],["fileSelector",1]],null,0,"input",[["class","ngx-file-drop__file-input"],["type","file"]],[[8,"accept",0],[8,"multiple",0]],[[null,"change"]],function(e,n,t){var r=!0;return"change"===n&&(r=!1!==e.component.uploadFiles(t)&&r),r},null,null)),(e()(),r.kb(16777216,null,null,1,null,a)),r.sb(8,16384,null,0,o.n,[r.S,r.P],{ngIf:[0,"ngIf"]},null)],function(e,n){var t=n.component;e(n,5,0,t.dropZoneLabel),e(n,8,0,t.showBrowseBtn)},function(e,n){var t=n.component;e(n,1,0,t.dropZoneClassName,t.isDraggingOverDropZone),e(n,2,0,t.contentClassName),e(n,6,0,t.accept,t.multiple)})}function p(e){return r.Nb(0,[(e()(),r.tb(0,0,null,null,1,"file-drop",[],null,null,null,c,l)),r.sb(1,180224,null,0,i.a,[r.B,r.H],null,null)],null,null)}var d=r.pb("file-drop",i.a,p,{accept:"accept",multiple:"multiple",dropZoneLabel:"dropZoneLabel",dropZoneClassName:"dropZoneClassName",contentClassName:"contentClassName",disabled:"disabled",showBrowseBtn:"showBrowseBtn",browseBtnClassName:"browseBtnClassName",browseBtnLabel:"browseBtnLabel"},{onFileDrop:"onFileDrop",onFileOver:"onFileOver",onFileLeave:"onFileLeave"},["*"])},wErx:function(e,n,t){"use strict";t.d(n,"a",function(){return r});var r=[".hidden[_ngcontent-%COMP%]{display:none}.area[_ngcontent-%COMP%]{width:77%;padding:15px;margin:15px;border:1px solid #333;background:rgba(0,0,0,.7)}#dropZone[_ngcontent-%COMP%]{border:2px dashed #bbb;border-radius:5px;padding:50px;text-align:center;font:21pt bold arial;color:#bbb}.drop-file-over[_ngcontent-%COMP%]{background:#333}.search-result-container[_ngcontent-%COMP%]{background-color:#d3d3d3;margin-left:-4px;min-width:235px!important}div.search-member-row-result-container[_ngcontent-%COMP%]:nth-child(1){margin-top:30px!important}.close-search-result-btn[_ngcontent-%COMP%]{right:0;color:#fafafa!important;padding:5px 10px}.ticket-description-info[_ngcontent-%COMP%]{resize:none;overflow-y:scroll}.mar-l-10[_ngcontent-%COMP%]{margin-left:10px}.thread-message-head[_ngcontent-%COMP%]{max-height:60px}.thread-message-wrapper[_ngcontent-%COMP%]{white-space:pre-line}.search-field[_ngcontent-%COMP%]{font-size:20px;padding:15px}.search-btn[_ngcontent-%COMP%]{margin-left:0}.search-btn[_ngcontent-%COMP%], .search-field[_ngcontent-%COMP%]{height:44px}.example-container[_ngcontent-%COMP%]{width:400px;max-width:100%;margin:0 25px 25px 0;display:inline-block;vertical-align:top}.example-list[_ngcontent-%COMP%]{border:1px solid #ccc;min-height:60px;background:#fff;border-radius:4px;overflow:hidden;display:block}.example-box[_ngcontent-%COMP%]{padding:20px 10px;border-bottom:1px solid #ccc;color:rgba(0,0,0,.87);display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box;cursor:move;background:#fff;font-size:14px}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform 250ms cubic-bezier(0,0,.2,1)}.example-box[_ngcontent-%COMP%]:last-child{border:none}.example-list.cdk-drop-list-dragging[_ngcontent-%COMP%]   .example-box[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform 250ms cubic-bezier(0,0,.2,1)}.task-menu-pull-right[_ngcontent-%COMP%]   .cdk-overlay-pane[_ngcontent-%COMP%]{margin:0!important}.text-left-below-xl[_ngcontent-%COMP%]{text-align:left}@media (max-width:1200px){.text-left-below-xl[_ngcontent-%COMP%]{text-align:left}.text-center-lg[_ngcontent-%COMP%]{text-align:center}.full-w-md[_ngcontent-%COMP%]{width:100%!important}.search-btn[_ngcontent-%COMP%]{position:absolute;right:0}.q-width[_ngcontent-%COMP%]{width:50%}}@media only screen and (max-width:991px){.q-width[_ngcontent-%COMP%]{width:75%}}@media only screen and (max-width:991px) and (max-width:767px){.q-width[_ngcontent-%COMP%]{width:100%}}"]}}]);