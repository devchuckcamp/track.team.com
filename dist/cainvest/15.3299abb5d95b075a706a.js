(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"nGI/":function(t,l,n){"use strict";n.r(l);var e=n("CcnG"),a=function(){return function(){}}(),i=n("yWMr"),c=n("t68o"),u=n("zbXB"),r=n("NcP4"),o=n("xYTU"),d=n("pMnS"),s=n("Jnj8"),m=n("FVSy"),p=n("Fzqc"),g=n("Wf4p"),f=n("ZYjt"),h=e["\u0275crt"]({encapsulation:2,styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}@media (-ms-high-contrast:active){.mat-card{outline:solid 1px}}.mat-card-actions,.mat-card-content,.mat-card-subtitle{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px 0}@media (max-width:599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card-content>:first-child,.mat-card>:first-child{margin-top:0}.mat-card-content>:last-child:not(.mat-card-footer),.mat-card>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child{margin-left:0;margin-right:0}.mat-card-subtitle:not(:first-child),.mat-card-title:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"],data:{}});function v(t){return e["\u0275vid"](2,[e["\u0275ncd"](null,0),e["\u0275ncd"](null,1)],null,null)}var b=n("Ip0R"),x=n("MBfO"),k=n("Z+uX"),L=n("wFw1"),S=n("DrJT"),j=n("Zgwo"),w=n("Wfh1"),y=n("Ouoq"),C=function(){function t(t,l,n,e,a,i,c){this.http=t,this.router=l,this.route=n,this.projectService=e,this.userService=a,this.settingService=i,this.metaService=c,this.ticketStatusList=[],this.ticketPatchList=[],this.ticketPatchListLength=0}return t.prototype.ngOnInit=function(){var t=this;this.ticketStatusListLoading=!0,this.ticketPatchListloading=!0,this.userService.client_slug.subscribe(function(l){return t.auth_client=l}),this.route.params.subscribe(function(l){void 0!==l.project_name&&"add"!==l.project_name&&"activity"!==l.project_name&&t.projectService.getProject(l.project_name).subscribe(function(n){null!==n.active_custom_status?n.active_custom_status.value&&1==n.active_custom_status.value.value?t.metaService.getMeta(l.project_name,"project","custom_status").subscribe(function(l){var e=[];l.data.forEach(function(t){e.push(t.custom_status)}),t.ticketStatusListLoading=!1,e=t.getCount(e,n.tickets),t.ticketStatusList=e,t.ticketStatusList.sort(function(t,l){return t.order-l.order}),t.ticketOptionLoaded=!0}):(t.settingService.loadAllProjectStatus(""),t.settingService.statusSettings.subscribe(function(l){var e=l.data?l.data:l;t.ticketStatusListLoading=!1,e=t.getCount(e,n.tickets),t.ticketStatusList=e,t.ticketStatusList.sort(function(t,l){return t.order-l.order}),t.ticketOptionLoaded=!0})):(t.settingService.loadAllProjectStatus(l.project_name),t.settingService.statusSettings.subscribe(function(l){var e=l.data?l.data:l;t.ticketStatusListLoading=!1,e=t.getCount(e,n.tickets),t.ticketStatusList=e,t.ticketStatusList.sort(function(t,l){return t.order-l.order}),t.ticketOptionLoaded=!0})),t.projectService.loadAllPatches(l.project_name),t.ticketPatchList=t.projectService.projectsPatches,t.projectService.projectsPatches.subscribe(function(l){t.ticketPatchListloading=!1,t.ticketPatchList=l.data,t.ticketPatchListLength=l.total}),n&&(t.project=n,t.tickets=t.project.tickets)})})},t.prototype.getCustomStatusMeta=function(t,l,n){this.metaService.getMeta(t,l,n).subscribe(function(t){})},t.prototype.calculateCompletionRate=function(t,l){var n=0,e=0;if(this.ticketPatchList[l].tickets){for(var a=0;a<this.ticketPatchList[l].tickets.length;a++)5==this.ticketPatchList[l].tickets[a].status_id&&e++;n=e>0?100*e/this.ticketPatchList[l].tickets.length:0}return n},t.prototype.goToFilterTicket=function(t){return this.router.navigate(["/"+this.auth_client+"/admin/projects/",this.project.slug,"tickets","filter",t]),!1},t.prototype.showPatch=function(t){return this.router.navigate(["/"+this.auth_client+"/admin/projects/",this.project.slug,"patches",t],{state:{is_page:!0}}),!1},t.prototype.getCount=function(t,l){return t.map(function(t,n){var e=t.name.replace(" ","-").toLowerCase();return e.replace("--","-").toLowerCase(),t.slug=e,t.count=l.filter(function(l){return l.status_id==t.id}),t}),t},t}(),_=n("t/Na"),P=n("ZYCi"),R=e["\u0275crt"]({encapsulation:0,styles:[s.a],data:{}});function I(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,2,"h2",[["class","header-title"]],null,null,null,null,null)),(t()(),e["\u0275ted"](1,null,["Project ",""])),e["\u0275ppd"](2,1)],null,function(t,l){var n=l.component,a=e["\u0275unv"](l,1,0,t(l,2,0,e["\u0275nov"](l.parent,0),n.project.name));t(l,1,0,a)})}function N(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row border-b-gray text-center"]],null,null,null,null,null)),(t()(),e["\u0275eld"](1,0,null,null,1,"div",[["class","col"]],null,null,null,null,null)),(t()(),e["\u0275eld"](2,0,null,null,0,"img",[["src","../../assets/icon/loading.gif"]],null,null,null,null,null))],null,null)}function O(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,7,"div",[["class","col-lg-4 clickable mar-y-10"]],null,[[null,"click"]],function(t,l,n){var e=!0;return"click"===l&&(e=!1!==t.component.goToFilterTicket(t.context.$implicit.slug)&&e),e},null,null)),(t()(),e["\u0275eld"](1,0,null,null,6,"mat-card",[["class","font-white mat-card"]],null,null,null,v,h)),e["\u0275did"](2,49152,null,0,m.a,[],null,null),e["\u0275did"](3,278528,null,0,b.NgStyle,[e.KeyValueDiffers,e.ElementRef,e.Renderer2],{ngStyle:[0,"ngStyle"]},null),e["\u0275pod"](4,{"background-color":0,color:1}),(t()(),e["\u0275ted"](5,0,[""," "," "])),(t()(),e["\u0275eld"](6,0,null,0,1,"span",[["class","badge"]],null,null,null,null,null)),(t()(),e["\u0275ted"](7,null,[" (",")"]))],function(t,l){var n=t(l,4,0,l.context.$implicit.color,"#fafafa");t(l,3,0,n)},function(t,l){var n=l.component;t(l,5,0,l.context.$implicit.name,null!==n.project.active_custom_status&&1==n.project.active_custom_status.value.value?"":"Tickets"),t(l,7,0,l.context.$implicit.count.length)})}function T(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row border-b-gray"]],null,null,null,null,null)),(t()(),e["\u0275and"](16777216,null,null,1,null,O)),e["\u0275did"](2,278528,null,0,b.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(t,l){t(l,2,0,l.component.ticketStatusList)},null)}function F(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row border-b-gray text-center"]],null,null,null,null,null)),(t()(),e["\u0275eld"](1,0,null,null,1,"div",[["class","col"]],null,null,null,null,null)),(t()(),e["\u0275eld"](2,0,null,null,0,"img",[["src","../../assets/icon/loading.gif"]],null,null,null,null,null))],null,null)}function M(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,12,"div",[["class","col-lg-4 clickable mar-y-10"]],null,[[null,"click"]],function(t,l,n){var e=!0;return"click"===l&&(e=!1!==t.component.showPatch(t.context.$implicit.id)&&e),e},null,null)),(t()(),e["\u0275eld"](1,0,null,null,11,"mat-card",[["class","font-white mat-card"]],null,null,null,v,h)),e["\u0275did"](2,49152,[["completion",4]],0,m.a,[],null,null),e["\u0275did"](3,278528,null,0,b.NgStyle,[e.KeyValueDiffers,e.ElementRef,e.Renderer2],{ngStyle:[0,"ngStyle"]},null),e["\u0275pod"](4,{"background-color":0,"background-color":1}),(t()(),e["\u0275ted"](5,0,["Patch "," "])),(t()(),e["\u0275eld"](6,0,null,0,1,"span",[["class","badge"]],null,null,null,null,null)),(t()(),e["\u0275ted"](7,null,[" (",")"])),(t()(),e["\u0275eld"](8,0,null,0,2,"span",[["class","badge"]],null,null,null,null,null)),(t()(),e["\u0275ted"](9,null,["","% completion"])),e["\u0275ppd"](10,2),(t()(),e["\u0275eld"](11,0,null,0,1,"mat-progress-bar",[["aria-valuemax","100"],["aria-valuemin","0"],["class","mat-progress-bar"],["mode","determinate"],["role","progressbar"]],[[1,"aria-valuenow",0],[1,"mode",0],[2,"_mat-animation-noopable",null]],null,null,x.b,x.a)),e["\u0275did"](12,4374528,null,0,k.b,[e.ElementRef,e.NgZone,[2,L.a],[2,k.a]],{value:[0,"value"],bufferValue:[1,"bufferValue"],mode:[2,"mode"]},null)],function(t,l){var n=l.component,e=t(l,4,0,l.context.$implicit.color,"rgb(40, 167, 69)");t(l,3,0,e),t(l,12,0,n.calculateCompletionRate(l.context.$implicit.id,l.context.index),100,"determinate")},function(t,l){var n=l.component;t(l,5,0,l.context.$implicit.name),t(l,7,0,l.context.$implicit.tickets.length);var a=e["\u0275unv"](l,9,0,t(l,10,0,e["\u0275nov"](l.parent.parent,1),n.calculateCompletionRate(l.context.$implicit.id,l.context.index),"1.2-2"));t(l,9,0,a),t(l,11,0,e["\u0275nov"](l,12).value,e["\u0275nov"](l,12).mode,e["\u0275nov"](l,12)._isNoopAnimation)})}function V(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,2,"div",[["class","row border-b-gray"]],null,null,null,null,null)),(t()(),e["\u0275and"](16777216,null,null,1,null,M)),e["\u0275did"](2,278528,null,0,b.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(t,l){t(l,2,0,l.component.ticketPatchList)},null)}function z(t){return e["\u0275vid"](0,[e["\u0275pid"](0,b.TitleCasePipe,[]),e["\u0275pid"](0,b.DecimalPipe,[e.LOCALE_ID]),(t()(),e["\u0275eld"](2,0,null,null,2,"div",[["class","col-lg-12 content-header text-center"]],null,null,null,null,null)),(t()(),e["\u0275and"](16777216,null,null,1,null,I)),e["\u0275did"](4,16384,null,0,b.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),e["\u0275eld"](5,0,null,null,18,"div",[["class","col-lg-12 content-main"]],null,null,null,null,null)),(t()(),e["\u0275eld"](6,0,null,null,0,"div",[["class","row border-b-gray"]],null,null,null,null,null)),(t()(),e["\u0275eld"](7,0,null,null,0,"div",[["class","row border-b-gray text-center"]],null,null,null,null,null)),(t()(),e["\u0275eld"](8,0,null,null,3,"div",[["class","row border-b-gray"]],null,null,null,null,null)),(t()(),e["\u0275eld"](9,0,null,null,2,"div",[["class","col-lg-12 text-center"]],null,null,null,null,null)),(t()(),e["\u0275eld"](10,0,null,null,1,"h2",[],null,null,null,null,null)),(t()(),e["\u0275ted"](-1,null,["Status"])),(t()(),e["\u0275and"](16777216,null,null,1,null,N)),e["\u0275did"](13,16384,null,0,b.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),e["\u0275and"](16777216,null,null,1,null,T)),e["\u0275did"](15,16384,null,0,b.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),e["\u0275eld"](16,0,null,null,3,"div",[["class","row border-b-gray"]],null,null,null,null,null)),(t()(),e["\u0275eld"](17,0,null,null,2,"div",[["class","col-lg-12 text-center"]],null,null,null,null,null)),(t()(),e["\u0275eld"](18,0,null,null,1,"h2",[],null,null,null,null,null)),(t()(),e["\u0275ted"](-1,null,["Patches"])),(t()(),e["\u0275and"](16777216,null,null,1,null,F)),e["\u0275did"](21,16384,null,0,b.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),e["\u0275and"](16777216,null,null,1,null,V)),e["\u0275did"](23,16384,null,0,b.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,l){var n=l.component;t(l,4,0,n.project),t(l,13,0,n.ticketStatusListLoading),t(l,15,0,n.ticketStatusList&&!n.ticketStatusListLoading),t(l,21,0,n.ticketPatchListloading),t(l,23,0,n.ticketPatchList&&!n.ticketPatchListloading)},null)}function D(t){return e["\u0275vid"](0,[(t()(),e["\u0275eld"](0,0,null,null,1,"app-project-detail",[],null,null,null,z,R)),e["\u0275did"](1,114688,null,0,C,[_.c,P.l,P.a,S.a,y.a,j.a,w.a],null,null)],function(t,l){t(l,1,0)},null)}var A=e["\u0275ccf"]("app-project-detail",C,D,{},{},[]),$=n("eDkP"),Z=n("4tE/"),E=n("M2Lx"),K=n("o3x0"),W=n("jQLj"),Y=n("mVsa"),B=n("dWZg"),J=n("uGex"),q=n("v9Dh"),G=n("4epT"),Q=n("OkvK"),U=n("wmQ5"),H=n("lLAP"),X=n("OBdK"),tt=n("gIcY"),lt=n("OfrC"),nt=n("0np6"),et=n("4c35"),at=n("qAlS"),it=n("6Wmm"),ct=n("BgWK"),ut=n("UodH"),rt=n("u7R8"),ot=n("de3e"),dt=n("/dO6"),st=n("LC5p"),mt=n("YhbO"),pt=n("jlZm"),gt=n("r43C"),ft=n("SMsm"),ht=n("/VYK"),vt=n("seP3"),bt=n("b716"),xt=n("0/Q6"),kt=n("Blfk"),Lt=n("9It4"),St=n("Nsh5"),jt=n("w+lc"),wt=n("kWGw"),yt=n("vARd"),Ct=n("Lwpp"),_t=n("y4qS"),Pt=n("BHnd"),Rt=n("La40"),It=n("8mMr"),Nt=n("J12g"),Ot=function(){return function(){}}(),Tt=n("YSh2");n.d(l,"ProjectDetailModuleNgFactory",function(){return Ft});var Ft=e["\u0275cmf"](a,[],function(t){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,c.a,u.b,u.a,r.a,o.a,o.b,d.a,A]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,b.NgLocalization,b.NgLocaleLocalization,[e.LOCALE_ID,[2,b["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,$.c,$.c,[$.i,$.e,e.ComponentFactoryResolver,$.h,$.f,e.Injector,e.NgZone,b.DOCUMENT,p.b,[2,b.Location]]),e["\u0275mpd"](5120,$.j,$.k,[$.c]),e["\u0275mpd"](5120,Z.a,Z.b,[$.c]),e["\u0275mpd"](4608,E.c,E.c,[]),e["\u0275mpd"](4608,g.d,g.d,[]),e["\u0275mpd"](5120,K.c,K.d,[$.c]),e["\u0275mpd"](135680,K.e,K.e,[$.c,e.Injector,[2,b.Location],[2,K.b],K.c,[3,K.e],$.e]),e["\u0275mpd"](4608,W.i,W.i,[]),e["\u0275mpd"](5120,W.a,W.b,[$.c]),e["\u0275mpd"](5120,Y.b,Y.g,[$.c]),e["\u0275mpd"](4608,g.c,g.y,[[2,g.h],B.a]),e["\u0275mpd"](5120,J.a,J.b,[$.c]),e["\u0275mpd"](5120,q.b,q.c,[$.c]),e["\u0275mpd"](4608,f.f,g.e,[[2,g.i],[2,g.n]]),e["\u0275mpd"](5120,G.c,G.a,[[3,G.c]]),e["\u0275mpd"](5120,Q.b,Q.a,[[3,Q.b]]),e["\u0275mpd"](5120,U.b,U.a,[[3,U.b]]),e["\u0275mpd"](135680,H.h,H.h,[e.NgZone,B.a]),e["\u0275mpd"](4608,X.e,X.e,[e.TemplateRef]),e["\u0275mpd"](4608,tt.z,tt.z,[]),e["\u0275mpd"](4608,tt.e,tt.e,[]),e["\u0275mpd"](4608,lt.a,lt.a,[]),e["\u0275mpd"](4608,nt.a,nt.a,[_.c,lt.a]),e["\u0275mpd"](4608,y.a,y.a,[nt.a,_.c]),e["\u0275mpd"](1073742336,p.a,p.a,[]),e["\u0275mpd"](1073742336,g.n,g.n,[[2,g.f],[2,f.g]]),e["\u0275mpd"](1073742336,B.b,B.b,[]),e["\u0275mpd"](1073742336,g.x,g.x,[]),e["\u0275mpd"](1073742336,b.CommonModule,b.CommonModule,[]),e["\u0275mpd"](1073742336,g.v,g.v,[]),e["\u0275mpd"](1073742336,g.s,g.s,[]),e["\u0275mpd"](1073742336,et.g,et.g,[]),e["\u0275mpd"](1073742336,at.c,at.c,[]),e["\u0275mpd"](1073742336,$.g,$.g,[]),e["\u0275mpd"](1073742336,Z.c,Z.c,[]),e["\u0275mpd"](1073742336,E.d,E.d,[]),e["\u0275mpd"](1073742336,H.a,H.a,[]),e["\u0275mpd"](1073742336,it.b,it.b,[]),e["\u0275mpd"](1073742336,ct.c,ct.c,[]),e["\u0275mpd"](1073742336,ut.c,ut.c,[]),e["\u0275mpd"](1073742336,rt.a,rt.a,[]),e["\u0275mpd"](1073742336,m.c,m.c,[]),e["\u0275mpd"](1073742336,ot.c,ot.c,[]),e["\u0275mpd"](1073742336,dt.b,dt.b,[]),e["\u0275mpd"](1073742336,K.h,K.h,[]),e["\u0275mpd"](1073742336,W.j,W.j,[]),e["\u0275mpd"](1073742336,st.a,st.a,[]),e["\u0275mpd"](1073742336,mt.c,mt.c,[]),e["\u0275mpd"](1073742336,pt.d,pt.d,[]),e["\u0275mpd"](1073742336,g.o,g.o,[]),e["\u0275mpd"](1073742336,gt.a,gt.a,[]),e["\u0275mpd"](1073742336,ft.c,ft.c,[]),e["\u0275mpd"](1073742336,ht.c,ht.c,[]),e["\u0275mpd"](1073742336,vt.e,vt.e,[]),e["\u0275mpd"](1073742336,bt.c,bt.c,[]),e["\u0275mpd"](1073742336,xt.c,xt.c,[]),e["\u0275mpd"](1073742336,Y.e,Y.e,[]),e["\u0275mpd"](1073742336,g.z,g.z,[]),e["\u0275mpd"](1073742336,g.p,g.p,[]),e["\u0275mpd"](1073742336,J.d,J.d,[]),e["\u0275mpd"](1073742336,q.e,q.e,[]),e["\u0275mpd"](1073742336,G.d,G.d,[]),e["\u0275mpd"](1073742336,k.c,k.c,[]),e["\u0275mpd"](1073742336,kt.a,kt.a,[]),e["\u0275mpd"](1073742336,Lt.a,Lt.a,[]),e["\u0275mpd"](1073742336,St.a,St.a,[]),e["\u0275mpd"](1073742336,jt.a,jt.a,[]),e["\u0275mpd"](1073742336,wt.a,wt.a,[]),e["\u0275mpd"](1073742336,yt.e,yt.e,[]),e["\u0275mpd"](1073742336,Q.c,Q.c,[]),e["\u0275mpd"](1073742336,Ct.e,Ct.e,[]),e["\u0275mpd"](1073742336,U.c,U.c,[]),e["\u0275mpd"](1073742336,_t.p,_t.p,[]),e["\u0275mpd"](1073742336,Pt.m,Pt.m,[]),e["\u0275mpd"](1073742336,Rt.a,Rt.a,[]),e["\u0275mpd"](1073742336,It.a,It.a,[]),e["\u0275mpd"](1073742336,X.c,X.c,[]),e["\u0275mpd"](1073742336,Nt.a,Nt.a,[]),e["\u0275mpd"](1073742336,P.o,P.o,[[2,P.u],[2,P.l]]),e["\u0275mpd"](1073742336,Ot,Ot,[]),e["\u0275mpd"](1073742336,tt.x,tt.x,[]),e["\u0275mpd"](1073742336,tt.k,tt.k,[]),e["\u0275mpd"](1073742336,tt.t,tt.t,[]),e["\u0275mpd"](1073742336,a,a,[]),e["\u0275mpd"](256,dt.a,{separatorKeyCodes:[Tt.f]},[]),e["\u0275mpd"](256,g.g,g.k,[]),e["\u0275mpd"](1024,P.j,function(){return[[{path:"",component:C}]]},[]),e["\u0275mpd"](256,tt.A,"never",[])])})}}]);