(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"nGI/":function(t,l,n){"use strict";n.r(l);var a=n("CcnG"),e=function(){return function(){}}(),i=n("yWMr"),d=n("t68o"),c=n("zbXB"),r=n("NcP4"),o=n("xYTU"),m=n("pMnS"),p=n("Jnj8"),u=n("FVSy"),s=n("Fzqc"),g=n("Wf4p"),h=n("ZYjt"),f=a["\u0275crt"]({encapsulation:2,styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}@media (-ms-high-contrast:active){.mat-card{outline:solid 1px}}.mat-card-actions,.mat-card-content,.mat-card-subtitle{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px 0}@media (max-width:599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card-content>:first-child,.mat-card>:first-child{margin-top:0}.mat-card-content>:last-child:not(.mat-card-footer),.mat-card>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child{margin-left:0;margin-right:0}.mat-card-subtitle:not(:first-child),.mat-card-title:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}"],data:{}});function b(t){return a["\u0275vid"](2,[a["\u0275ncd"](null,0),a["\u0275ncd"](null,1)],null,null)}var x=n("Ip0R"),v=n("DrJT"),k=n("Ouoq"),j=function(){function t(t,l,n,a,e){this.http=t,this.router=l,this.route=n,this.projectService=a,this.userService=e}return t.prototype.ngOnInit=function(){var t=this;this.userService.client_slug.subscribe(function(l){return t.auth_client=l}),this.route.params.subscribe(function(l){void 0!==l.project_name&&"add"!==l.project_name&&"activity"!==l.project_name&&t.projectService.getProject(l.project_name).subscribe(function(l){l&&(t.project=l,t.tickets=t.project.tickets,t.openTickets=t.tickets.filter(function(t){return 1==t.status_id}),t.inProgressTickets=t.tickets.filter(function(t){return 2==t.status_id}),t.completedTickets=t.tickets.filter(function(t){return 5==t.status_id}))})})},t.prototype.goToFilterTicket=function(t){return this.router.navigate(["/"+this.auth_client+"/admin/projects/",this.project.slug,"tickets","filter",t]),!1},t}(),w=n("t/Na"),T=n("ZYCi"),y=a["\u0275crt"]({encapsulation:0,styles:[p.a],data:{}});function C(t){return a["\u0275vid"](0,[(t()(),a["\u0275eld"](0,0,null,null,2,"h2",[["class","header-title"]],null,null,null,null,null)),(t()(),a["\u0275ted"](1,null,["Project ",""])),a["\u0275ppd"](2,1)],null,function(t,l){var n=l.component,e=a["\u0275unv"](l,1,0,t(l,2,0,a["\u0275nov"](l.parent,0),n.project.name));t(l,1,0,e)})}function _(t){return a["\u0275vid"](0,[(t()(),a["\u0275eld"](0,0,null,null,18,"div",[["class","row"]],null,null,null,null,null)),(t()(),a["\u0275eld"](1,0,null,null,5,"div",[["class","col-lg-4 clickable"]],null,[[null,"click"]],function(t,l,n){var a=!0;return"click"===l&&(a=!1!==t.component.goToFilterTicket("open")&&a),a},null,null)),(t()(),a["\u0275eld"](2,0,null,null,4,"mat-card",[["class","font-white bg-info mat-card"]],null,null,null,b,f)),a["\u0275did"](3,49152,null,0,u.a,[],null,null),(t()(),a["\u0275ted"](-1,0,["Open Tickets "])),(t()(),a["\u0275eld"](5,0,null,0,1,"span",[["class","badge"]],null,null,null,null,null)),(t()(),a["\u0275ted"](6,null,[" ",""])),(t()(),a["\u0275eld"](7,0,null,null,5,"div",[["class","col-lg-4 clickable"]],null,[[null,"click"]],function(t,l,n){var a=!0;return"click"===l&&(a=!1!==t.component.goToFilterTicket("in-progress")&&a),a},null,null)),(t()(),a["\u0275eld"](8,0,null,null,4,"mat-card",[["class","font-white bg-warning mat-card"]],null,null,null,b,f)),a["\u0275did"](9,49152,null,0,u.a,[],null,null),(t()(),a["\u0275ted"](-1,0,["In Progress Tickets "])),(t()(),a["\u0275eld"](11,0,null,0,1,"span",[["class","badge"]],null,null,null,null,null)),(t()(),a["\u0275ted"](12,null,["",""])),(t()(),a["\u0275eld"](13,0,null,null,5,"div",[["class","col-lg-4 clickable"]],null,[[null,"click"]],function(t,l,n){var a=!0;return"click"===l&&(a=!1!==t.component.goToFilterTicket("complete")&&a),a},null,null)),(t()(),a["\u0275eld"](14,0,null,null,4,"mat-card",[["class","font-white bg-success mat-card"]],null,null,null,b,f)),a["\u0275did"](15,49152,null,0,u.a,[],null,null),(t()(),a["\u0275ted"](-1,0,["Completed Tickets "])),(t()(),a["\u0275eld"](17,0,null,0,1,"span",[["class","badge"]],null,null,null,null,null)),(t()(),a["\u0275ted"](18,null,["",""]))],null,function(t,l){var n=l.component;t(l,6,0,n.openTickets.length),t(l,12,0,n.inProgressTickets.length),t(l,18,0,n.completedTickets.length)})}function I(t){return a["\u0275vid"](0,[a["\u0275pid"](0,x.TitleCasePipe,[]),(t()(),a["\u0275eld"](1,0,null,null,2,"div",[["class","col-lg-12 content-header text-center"]],null,null,null,null,null)),(t()(),a["\u0275and"](16777216,null,null,1,null,C)),a["\u0275did"](3,16384,null,0,x.NgIf,[a.ViewContainerRef,a.TemplateRef],{ngIf:[0,"ngIf"]},null),(t()(),a["\u0275eld"](4,0,null,null,2,"div",[["class","col-lg-12 content-main"]],null,null,null,null,null)),(t()(),a["\u0275and"](16777216,null,null,1,null,_)),a["\u0275did"](6,16384,null,0,x.NgIf,[a.ViewContainerRef,a.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(t,l){var n=l.component;t(l,3,0,n.project),t(l,6,0,n.tickets)},null)}function L(t){return a["\u0275vid"](0,[(t()(),a["\u0275eld"](0,0,null,null,1,"app-project-detail",[],null,null,null,I,y)),a["\u0275did"](1,114688,null,0,j,[w.c,T.l,T.a,v.a,k.a],null,null)],function(t,l){t(l,1,0)},null)}var R=a["\u0275ccf"]("app-project-detail",j,L,{},{},[]),N=n("eDkP"),z=n("4tE/"),F=n("M2Lx"),P=n("o3x0"),M=n("jQLj"),O=n("mVsa"),S=n("dWZg"),Z=n("uGex"),D=n("v9Dh"),W=n("4epT"),Y=n("OkvK"),B=n("wmQ5"),J=n("lLAP"),K=n("OBdK"),V=n("OfrC"),q=n("0np6"),A=n("4c35"),G=n("qAlS"),E=n("6Wmm"),Q=n("BgWK"),U=n("UodH"),H=n("u7R8"),X=n("de3e"),$=n("/dO6"),tt=n("LC5p"),lt=n("YhbO"),nt=n("jlZm"),at=n("r43C"),et=n("SMsm"),it=n("/VYK"),dt=n("seP3"),ct=n("b716"),rt=n("0/Q6"),ot=n("Z+uX"),mt=n("Blfk"),pt=n("9It4"),ut=n("Nsh5"),st=n("w+lc"),gt=n("kWGw"),ht=n("vARd"),ft=n("Lwpp"),bt=n("y4qS"),xt=n("BHnd"),vt=n("La40"),kt=n("8mMr"),jt=n("J12g"),wt=function(){return function(){}}(),Tt=n("YSh2");n.d(l,"ProjectDetailModuleNgFactory",function(){return yt});var yt=a["\u0275cmf"](e,[],function(t){return a["\u0275mod"]([a["\u0275mpd"](512,a.ComponentFactoryResolver,a["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,d.a,c.b,c.a,r.a,o.a,o.b,m.a,R]],[3,a.ComponentFactoryResolver],a.NgModuleRef]),a["\u0275mpd"](4608,x.NgLocalization,x.NgLocaleLocalization,[a.LOCALE_ID,[2,x["\u0275angular_packages_common_common_a"]]]),a["\u0275mpd"](4608,N.c,N.c,[N.i,N.e,a.ComponentFactoryResolver,N.h,N.f,a.Injector,a.NgZone,x.DOCUMENT,s.b,[2,x.Location]]),a["\u0275mpd"](5120,N.j,N.k,[N.c]),a["\u0275mpd"](5120,z.a,z.b,[N.c]),a["\u0275mpd"](4608,F.c,F.c,[]),a["\u0275mpd"](4608,g.d,g.d,[]),a["\u0275mpd"](5120,P.c,P.d,[N.c]),a["\u0275mpd"](135680,P.e,P.e,[N.c,a.Injector,[2,x.Location],[2,P.b],P.c,[3,P.e],N.e]),a["\u0275mpd"](4608,M.h,M.h,[]),a["\u0275mpd"](5120,M.a,M.b,[N.c]),a["\u0275mpd"](5120,O.a,O.c,[N.c]),a["\u0275mpd"](4608,g.c,g.y,[[2,g.h],S.a]),a["\u0275mpd"](5120,Z.a,Z.b,[N.c]),a["\u0275mpd"](5120,D.b,D.c,[N.c]),a["\u0275mpd"](4608,h.f,g.e,[[2,g.i],[2,g.n]]),a["\u0275mpd"](5120,W.c,W.a,[[3,W.c]]),a["\u0275mpd"](5120,Y.b,Y.a,[[3,Y.b]]),a["\u0275mpd"](5120,B.b,B.a,[[3,B.b]]),a["\u0275mpd"](135680,J.h,J.h,[a.NgZone,S.a]),a["\u0275mpd"](4608,K.e,K.e,[a.TemplateRef]),a["\u0275mpd"](4608,V.a,V.a,[]),a["\u0275mpd"](4608,q.a,q.a,[w.c,V.a]),a["\u0275mpd"](4608,k.a,k.a,[q.a,w.c]),a["\u0275mpd"](1073742336,s.a,s.a,[]),a["\u0275mpd"](1073742336,g.n,g.n,[[2,g.f],[2,h.g]]),a["\u0275mpd"](1073742336,S.b,S.b,[]),a["\u0275mpd"](1073742336,g.x,g.x,[]),a["\u0275mpd"](1073742336,x.CommonModule,x.CommonModule,[]),a["\u0275mpd"](1073742336,g.v,g.v,[]),a["\u0275mpd"](1073742336,g.s,g.s,[]),a["\u0275mpd"](1073742336,A.g,A.g,[]),a["\u0275mpd"](1073742336,G.c,G.c,[]),a["\u0275mpd"](1073742336,N.g,N.g,[]),a["\u0275mpd"](1073742336,z.c,z.c,[]),a["\u0275mpd"](1073742336,F.d,F.d,[]),a["\u0275mpd"](1073742336,J.a,J.a,[]),a["\u0275mpd"](1073742336,E.a,E.a,[]),a["\u0275mpd"](1073742336,Q.c,Q.c,[]),a["\u0275mpd"](1073742336,U.c,U.c,[]),a["\u0275mpd"](1073742336,H.a,H.a,[]),a["\u0275mpd"](1073742336,u.c,u.c,[]),a["\u0275mpd"](1073742336,X.a,X.a,[]),a["\u0275mpd"](1073742336,$.b,$.b,[]),a["\u0275mpd"](1073742336,P.h,P.h,[]),a["\u0275mpd"](1073742336,M.i,M.i,[]),a["\u0275mpd"](1073742336,tt.a,tt.a,[]),a["\u0275mpd"](1073742336,lt.c,lt.c,[]),a["\u0275mpd"](1073742336,nt.d,nt.d,[]),a["\u0275mpd"](1073742336,g.o,g.o,[]),a["\u0275mpd"](1073742336,at.a,at.a,[]),a["\u0275mpd"](1073742336,et.c,et.c,[]),a["\u0275mpd"](1073742336,it.c,it.c,[]),a["\u0275mpd"](1073742336,dt.e,dt.e,[]),a["\u0275mpd"](1073742336,ct.b,ct.b,[]),a["\u0275mpd"](1073742336,rt.a,rt.a,[]),a["\u0275mpd"](1073742336,O.b,O.b,[]),a["\u0275mpd"](1073742336,g.z,g.z,[]),a["\u0275mpd"](1073742336,g.p,g.p,[]),a["\u0275mpd"](1073742336,Z.d,Z.d,[]),a["\u0275mpd"](1073742336,D.e,D.e,[]),a["\u0275mpd"](1073742336,W.d,W.d,[]),a["\u0275mpd"](1073742336,ot.a,ot.a,[]),a["\u0275mpd"](1073742336,mt.a,mt.a,[]),a["\u0275mpd"](1073742336,pt.a,pt.a,[]),a["\u0275mpd"](1073742336,ut.a,ut.a,[]),a["\u0275mpd"](1073742336,st.a,st.a,[]),a["\u0275mpd"](1073742336,gt.a,gt.a,[]),a["\u0275mpd"](1073742336,ht.e,ht.e,[]),a["\u0275mpd"](1073742336,Y.c,Y.c,[]),a["\u0275mpd"](1073742336,ft.e,ft.e,[]),a["\u0275mpd"](1073742336,B.c,B.c,[]),a["\u0275mpd"](1073742336,bt.p,bt.p,[]),a["\u0275mpd"](1073742336,xt.m,xt.m,[]),a["\u0275mpd"](1073742336,vt.a,vt.a,[]),a["\u0275mpd"](1073742336,kt.a,kt.a,[]),a["\u0275mpd"](1073742336,K.c,K.c,[]),a["\u0275mpd"](1073742336,jt.a,jt.a,[]),a["\u0275mpd"](1073742336,T.n,T.n,[[2,T.t],[2,T.l]]),a["\u0275mpd"](1073742336,wt,wt,[]),a["\u0275mpd"](1073742336,e,e,[]),a["\u0275mpd"](256,$.a,{separatorKeyCodes:[Tt.f]},[]),a["\u0275mpd"](256,g.g,g.k,[]),a["\u0275mpd"](1024,T.j,function(){return[[{path:"",component:j}]]},[])])})}}]);