"use strict";(self.webpackChunke_detection=self.webpackChunke_detection||[]).push([[823],{5823:(I,u,e)=>{e.r(u),e.d(u,{LoginModule:()=>T});var m=e(9808),l=e(8555),r=e(3075),g=e(2139),t=e(5e3),c=e(294),p=e(426),h=e(2930),f=e(2543),d=e(1223),v=e(6766),C=e(1279),y=e(1377),b=e(1062);const L=function(){return{background:"linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.9)),\n                url(./assets/images/govt-of-odisha.jpg) center center / cover no-repeat "}},S=[{path:"",component:(()=>{class n{constructor(o,i,s){this.loginService=o,this.alertService=i,this.router=s,this.user=new g.K,this.username=new r.NI(""),this.password=new r.NI(""),this.hide=!0,this.isLoggedIn=!1}ngOnInit(){}onSubmit(){this.loginService.getUserByUserNameAndPassword(this.username.value,this.password.value).subscribe(o=>{console.log(o),console.log(this.username.value,this.password.value),null==o?this.alertService.error("UserId and Password Invalid!!"):o.userName==this.username.value&&o.password==this.password.value?(this.loginService.setLoggedIn(o),this.router.navigate(["/dashboard"]).then(()=>{window.location.reload()})):this.alertService.error("UserId and Password Invalid!!!")},o=>this.alertService.error(o.message))}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(c.r),t.Y36(p.c),t.Y36(l.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:27,vars:11,consts:[[1,"login-page"],[1,"shadow-lg"],[1,"card",3,"ngStyle"],[1,"header","mt-3"],[1,"display-1"],[1,"d-block"],["appearance","outline",1,"d-block"],[2,"font-weight","500"],["matInput","","type","email","placeholder","username","required","",3,"formControl"],["matSuffix",""],["matInput","","placeholder","Password","required","",3,"type","formControl","keyup.enter"],["mat-icon-button","","matSuffix","",3,"click"],["mat-raised-button","","type","submit",1,"btn","btn-success","d-block","btn-lg","p-3",2,"font-weight","500","bottom","10px",3,"click"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0)(1,"mat-card",1)(2,"div",2)(3,"div",3)(4,"h1",4),t._uU(5),t.ALo(6,"translate"),t.qZA()(),t._UZ(7,"mat-divider"),t.TgZ(8,"div",5)(9,"mat-form-field",6)(10,"mat-label",7),t._uU(11,"UserName"),t.qZA(),t._UZ(12,"input",8),t.TgZ(13,"mat-icon",9),t._uU(14," person_pin"),t.qZA()()(),t.TgZ(15,"div",5)(16,"mat-form-field",6)(17,"mat-label",7),t._uU(18,"Password"),t.qZA(),t.TgZ(19,"input",10),t.NdJ("keyup.enter",function(){return i.onSubmit()}),t.qZA(),t.TgZ(20,"button",11),t.NdJ("click",function(){return i.hide=!i.hide}),t.TgZ(21,"mat-icon"),t._uU(22),t.qZA()()()(),t.TgZ(23,"div",5)(24,"button",12),t.NdJ("click",function(){return i.onSubmit()}),t.TgZ(25,"h3"),t._uU(26,"Submit "),t.qZA()()()()()()),2&o&&(t.xp6(2),t.Q6J("ngStyle",t.DdM(10,L)),t.xp6(3),t.Oqu(t.lcZ(6,8,"e-Detection")),t.xp6(7),t.Q6J("formControl",i.username),t.xp6(7),t.Q6J("type",i.hide?"password":"text")("formControl",i.password),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",i.hide),t.xp6(2),t.Oqu(i.hide?"visibility_off":"visibility"))},directives:[h.a8,m.PC,f.d,d.KE,d.hX,v.Nt,r.Fj,r.Q7,r.JJ,r.oH,C.Hw,d.R9,y.lW],pipes:[b.X$],styles:[".login-page[_ngcontent-%COMP%]{height:100vh;background-color:#edeff1}mat-card[_ngcontent-%COMP%]{padding:10px;margin:auto;width:40%;height:60%;top:20%;border-radius:10px}.card[_ngcontent-%COMP%]{vertical-align:middle;align-items:center;margin:auto;height:100%;border:1px solid blue;border-radius:10px}.card[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{width:100%;text-align:center;padding-top:.5%;height:25%}.d-block[_ngcontent-%COMP%]{width:100%;padding:5px 15px;font-size:18px}.d-block[_ngcontent-%COMP%]:hover     .ng-untouched.mat-form-field-appearance-outline .mat-form-field-outline{color:#7d027a!important;opacity:1!important}  mat-form-field mat-label{font-weight:600px!important}  .ng-untouched.mat-form-field-appearance-outline .mat-form-field-outline{color:green!important;opacity:1!important}.display-1[_ngcontent-%COMP%]{font-weight:400}"]}),n})()}];let M=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.Bz.forChild(S)],l.Bz]}),n})();var w=e(6115),P=e(3928),U=e(3561);let T=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[m.ez,M,r.UX,w.q,P.z,U.uH]]}),n})()}}]);