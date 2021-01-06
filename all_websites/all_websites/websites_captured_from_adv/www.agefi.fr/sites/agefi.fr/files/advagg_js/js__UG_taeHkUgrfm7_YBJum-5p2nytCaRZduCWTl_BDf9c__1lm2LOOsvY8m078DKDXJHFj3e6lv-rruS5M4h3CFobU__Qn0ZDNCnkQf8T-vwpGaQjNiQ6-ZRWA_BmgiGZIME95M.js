// 
// yepnope.js
// Version - 1.5.4pre
//
// by
// Alex Sexton - @SlexAxton - AlexSexton[at]gmail.com
// Ralph Holzmann - @ralphholzmann - ralphholzmann[at]gmail.com
//
// http://yepnopejs.com/
// https://github.com/SlexAxton/yepnope.js/
//
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);;/**/
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/libraries/matchMedia.js. */
(function(doc){var docElem=doc.documentElement,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement('body'),div=doc.createElement('div'),polyfill;polyfill=(function(undefined){var div=doc.createElement('div'),bool;div.id="mq-test-1";div.style.cssText="position:absolute;top:-100em";fakeBody.appendChild(div);return function(q){div.innerHTML="&shy;<style media=\""+q+"\">#mq-test-1{width: 83px;}</style>";docElem.insertBefore(fakeBody,refNode);bool=div.offsetWidth===83;docElem.removeChild(fakeBody);return{matches:bool,media:q}}}());window.matchMedia=window.matchMedia||polyfill}(document));;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/libraries/matchMedia.js. */
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/libraries/jquery.cookie.js. */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){module.exports=factory(require('jquery'))}else factory(jQuery)}(function($){var pluses=/\+/g
function encode(s){return config.raw?s:encodeURIComponent(s)}
function decode(s){return config.raw?s:decodeURIComponent(s)}
function stringifyCookieValue(value){return encode(config.json?JSON.stringify(value):String(value))}
function parseCookieValue(s){if(s.indexOf('"')===0)s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');try{s=decodeURIComponent(s.replace(pluses,' '));return config.json?JSON.parse(s):s}catch(e){}}
function read(s,converter){var value=config.raw?s:parseCookieValue(s);return $.isFunction(converter)?converter(value):value};var config=$.cookie=function(key,value,options){if(arguments.length>1&&!$.isFunction(value)){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setMilliseconds(t.getMilliseconds()+days*864e+5)};return(document.cookie=[encode(key),'=',stringifyCookieValue(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''))};var result=key?undefined:{},cookies=document.cookie?document.cookie.split('; '):[],i=0,l=cookies.length;for(;i<l;i++){var parts=cookies[i].split('='),name=decode(parts.shift()),cookie=parts.join('=');if(key===name){result=read(cookie,value);break};if(!key&&(cookie=read(cookie))!==undefined)result[name]=cookie};return result};config.defaults={};$.removeCookie=function(key,options){$.cookie(key,'',$.extend({},options,{expires:-1}));return!$.cookie(key)}}));;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/libraries/jquery.cookie.js. */
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/libraries/jquery.ba-throttle-debounce.min.js. */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}
function g(){var o=this,m=+new Date()-d,n=arguments
function l(){d=+new Date();j.apply(o,n)}
function k(){h=c};if(i&&!h)l();h&&clearTimeout(h);if(i===c&&m>e){l()}else if(f!==true)h=setTimeout(i?k:l,i===c?e-m:e)};if($.guid)g.guid=j.guid=j.guid||$.guid++;return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/libraries/jquery.ba-throttle-debounce.min.js. */
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/palpix/base.js. */
(function(){var PX=window.PX||{};PX.config=PX.config||{};PX.ads=PX.ads||{};PX.broadcasts=PX.broadcasts||{};PX.debug=!!(window.location.href.indexOf('pxdebug')>-1);window.PX=PX})();(function(){var breaker={},has=function(obj,key){return hasOwnProperty.call(obj,key)};PX.utils={each:function(obj,iterator,context){if(obj==null)return;if(Array.prototype.forEach&&obj.forEach===Array.prototype.forEach){obj.forEach(iterator,context)}else if(obj.length===+obj.length){for(var i=0,l=obj.length;i<l;i++)if(iterator.call(context,obj[i],i,obj)===breaker)return}else for(var key in obj)if(has(obj,key))if(iterator.call(context,obj[key],key,obj)===breaker)return},extend:function(obj){PXU.each(Array.prototype.slice.call(arguments,1),function(source){if(source)for(var prop in source)obj[prop]=source[prop]});return obj},isArray:function(arr){return!!(Object.prototype.toString.call(arr)==='[object Array]')},inArray:function(find,arr){var i;if(arr&&this.isArray(arr)){i=arr.length;while(i--)if(i in arr&&arr[i]===find)return i};return-1},log:function(){if(PX.debug&&window.console&&window.console.log)console.log(Array.prototype.slice.call(arguments))},findReplace:function(str,find,replace){var reg=new RegExp(find,'g');return str.replace(reg,replace)},openWin:function(url,name,options){var screenHeight=screen.height,screenWidth=screen.width,defaults={width:600,height:400,resizable:'yes',scrollbars:'yes',toolbar:'no',location:'no',directories:'no',status:'no',menubar:'no',copyhistory:'no',top:0,left:0},o=PXU.extend(defaults,options),str=[];str.push('width='+o.width);str.push('height='+o.height);str.push('resizable='+o.resizable);str.push('scrollbars='+o.scrollbars);str.push('toolbar='+o.toolbar);str.push('location='+o.location);str.push('directories='+o.directories);str.push('status='+o.status);str.push('menubar='+o.menubar);str.push('copyhistory='+o.copyhistory);str.push('top='+((screenHeight/2)-(o.height/2)));str.push('left='+((screenWidth/2)-(o.width/2)));str=str.join(',');window.open(url,name,str)}};window.PXU=PX.utils})();(function(){var _list=[];PX.mod={test:function(defined,required){var bool;if(arguments.length>0){bool=this.define(defined)}else if(bool&&required)bool=this.require(required);return bool},isLoaded:function(module){return!!(PXU.inArray(module,_list)>-1)},define:function(module){if(this.isLoaded(module)){PXU.log('Module déjà chargé: px.'+module,'error');return};_list.push(module);return true},require:function(modules){var i,ref,res,bool=true,error=function(){PXU.log('Module requis: "'+ref+'"','error')};if(!modules)return;if(typeof modules==='string'){ref=modules;res=this.isLoaded(ref);if(!res)error()};if(PXU.isArray(modules)&&modules.length>0)if(modules.length===1){ref=modules[0];res=this.isLoaded(ref);if(!res)error()}else{i=modules.length;while(i--){ref=modules[i];res=this.isLoaded(ref);if(!res){bool=false;error()}};res=bool};return res}}})();;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/palpix/base.js. */
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/palpix/test.js. */
(function(){var moduleName='test',logPrefix='px.'+moduleName;if(!PX.mod.test(moduleName))return;var _unitTest={rwd:function(str){if(str===_get.rwd())return true;return false},screen:function(str){if(str===_get.screen())return true;return false},media:(function(doc,docElem){var supportMQ,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement('body'),div=doc.createElement('div');fakeBody.style.background="none";div.id="mq-syntax-test";div.style.cssText="position:absolute;top:-100em";fakeBody.appendChild(div);div.innerHTML="&shy;<style>@media screen and (min-width: 0px) { #mq-syntax-test { width: 12px; } }</style>";docElem.insertBefore(fakeBody,refNode);supportMQ=div.offsetWidth===12;docElem.removeChild(fakeBody);return function(str){if(!supportMQ)return true;return!!(window.matchMedia&&window.matchMedia(str).matches)}}(document,document.documentElement)),tpl:function(str){if(PX.config.template&&str===PX.config.template)return true;return false},retina:function(){return window.devicePixelRatio&&window.devicePixelRatio>=1.5},touch:function(){return!!('ontouchstart'in window)||!!(window.DocumentTouch&&document instanceof DocumentTouch)}},_get={rwd:function(){var style,breakpoint='desktop',regQuotes=/^('|")|('|")$/g;if(window.getComputedStyle){style=window.getComputedStyle(document.documentElement,":before");if(style){breakpoint=style.content||null;if(typeof breakpoint==='string'||breakpoint instanceof String)breakpoint=breakpoint.replace(regQuotes,"")}};return breakpoint},screen:function(){var style,breakpoint='m',regQuotes=/^('|")|('|")$/g;if(window.getComputedStyle){style=window.getComputedStyle(document.documentElement,":after");if(style){breakpoint=style.content||null;if(typeof breakpoint==='string'||breakpoint instanceof String)breakpoint=breakpoint.replace(regQuotes,"")}};return breakpoint},media:function(){return},tpl:function(){return PX.config.template},retina:_unitTest.retina,touch:_unitTest.touch};PX[moduleName]=function(type,data){var i,args=arguments.length;if(args===1)return _get[type]();if(_unitTest[type]){if(typeof data==='string')return _unitTest[type](data);if(PXU.isArray(data)&&data.length){if(data.length===1)return _unitTest[type]&&_unitTest[type](data[0]);i=data.length;while(i--)if(_unitTest[type](data[i]))return true}};return false}})();(function(){var moduleName='feature',logPrefix='px.'+moduleName;if(!PX.mod.test(moduleName))return
function featureTest(property,value,noPrefixes){var prop=property+':',el=document.createElement('test'),mStyle=el.style;if(!noPrefixes){mStyle.cssText=prop+['-webkit-','-moz-','-ms-','-o-',''].join(value+';'+prop)+value+';'}else mStyle.cssText=prop+value;return mStyle[property].indexOf(value)!==-1};PX[moduleName]=function(property,value,noPrefixes){if(!property){return false}else return featureTest(property,value,noPrefixes)}}());;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/palpix/test.js. */
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/palpix/plugins.js. */
(function(loader,html,moduleName){if(!PX.mod.test(moduleName,['test']))return;var logPrefix='px.'+moduleName,_path=PX.path.scripts+'plugin/',_defaults={name:'',dependencies:[],condition:function(){return true},callback:function(){}};PX[moduleName]={list:{},register:function(options){var that=this,opts=PXU.extend({},_defaults,options);if(!opts.name){PXU.log(logPrefix+' : Name missing for Plugins registration','error');return};if(that.list[opts.name]){PXU.log(logPrefix+' : Plugin "'+opts.name+'" already registred','error');return};var toLoad=opts.dependencies.length,name='';if(toLoad>0){for(var i=0;i<opts.dependencies.length;i++){name=opts.dependencies[i];var path=_path+name+'.js?'+PX.config.cacheQuery;loader([{load:path,callback:function(){html.className=html.className.replace('no-plugin-'+name,'plugin-'+name);toLoad--;setup()}}])}}else setup()
function setup(){if(toLoad==0){that.list[opts.name]=opts;that.list[opts.name].loaded=false;html.className+=' no-plugin-'+opts.name;that.loadProcess(opts.name,opts.callback)}}},init:function(pluginName,callback){var that=this,plugin=that.list[pluginName],cb;if(!plugin){PXU.log(logPrefix+' : Plugin "'+pluginName+'" missing','error');return};cb=(typeof callback==='function')?callback:plugin.callback;if(plugin.loaded){cb()}else that.loadProcess(pluginName,cb)},loadProcess:function(name,callback){var that=this,path=_path+name+'.js?'+PX.config.cacheQuery,plugin=that.list[name];if(plugin.condition())loader([{load:path,callback:function(){plugin.loaded=true;html.className=html.className.replace('no-plugin-'+name,'plugin-'+name);callback()}}])}}}(yepnope,document.documentElement,'plugins'));;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/palpix/plugins.js. */
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/bootstrap.js. */
(function($){PX.plugins.register({name:'popin',condition:function(){return!!($('[data-popin]').length&&PX.test('media','(min-width: 768px)'))||$('[data-popin-mobile]').length},selector:'[data-popin]',callback:function(){PX.plugins.list.popin.init()}});PX.plugins.register({name:'article-infinite-scroll',condition:function(){return typeof history.replaceState==='function'&&PX.test('media','(min-width: 1240px)')&&$('.article-nav').length}});PX.plugins.register({name:'px_slideshow',dependencies:['slick'],condition:function(){return document.getElementById('slideshow')!=undefined},callback:function(){var $slideshow=$('#slideshow'),$slideshow_nav=$('#slideshow-nav');$slideshow.px_slideshow({type:'main',hiddenClassName:'offset',nav:$slideshow_nav,thumbsOptions:{slidesToShow:5,variableWidth:false,responsive:[{breakpoint:768,settings:{slidesToShow:2}}]}})}});PX.plugins.register({name:'slick',condition:function(){return document.getElementById('event-slider')!=undefined},callback:function(){var $eventSlideshow=$('#event-slider');$eventSlideshow.slick({dots:true,adaptiveHeight:true})}});PX.plugins.register({name:'sticky',condition:function(){!function(e,n,s){function t(e,n){return typeof e===n}
function o(){var e,n,s,o,a,i,c;for(var f in r){if(e=[],n=r[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],c=i.split("."),1===c.length?Modernizr[c[0]]=o:(!Modernizr[c[0]]||Modernizr[c[0]]instanceof Boolean||(Modernizr[c[0]]=new Boolean(Modernizr[c[0]])),Modernizr[c[0]][c[1]]=o),l.push((o?"":"no-")+c.join("-"))}}
function a(e){var n=f.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")};Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?f.className.baseVal=n:f.className=n)}
function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)};var l=[],r=[],c={_version:"3.1.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){r.push({name:e,fn:n,options:s})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=c,Modernizr=new Modernizr();var f=n.documentElement,u="svg"===f.nodeName.toLowerCase(),p=c._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];c._prefixes=p,Modernizr.addTest("csspositionsticky",function(){var e="position:",n="sticky",s=i("a"),t=s.style;return t.cssText=e+p.join(n+";"+e).slice(0,-e.length),-1!==t.position.indexOf(n)}),o(),a(l),delete c.addTest,delete c.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);return!Modernizr.csspositionsticky&&PX.test('media','(min-width: 768px)')&&$('.sticky').length}});PX.plugins.register({name:'easytabs',condition:function(){return document.querySelector('.easytabs')&&PX.test('media','(min-width: 478px)')},callback:function(){$('.easytabs').easytabs({updateHash:false})}});PX.plugins.register({name:'px_accordion',condition:function(){return document.querySelectorAll&&document.querySelectorAll('.px_accordion').length},callback:function(){$('.px_accordion').px_accordion({multiple:true})}});PX.plugins.register({name:'px_scrollTo',dependencies:['scrollTo'],condition:function(){return document.querySelector('.px_scrollTo')},callback:function(){$('.px_scrollTo').px_scrollTo()}});PX.plugins.register({name:'powertip',condition:function(){return document.querySelector('.powertip')&&PX.test('media','(min-width: 478px)')},callback:function(){$('.powertip').powerTip({followMouse:true,mouseOnToPopup:true,placement:'e',smartPlacement:true,offset:20})}});PX.plugins.register({name:'twitter',condition:function(){return $('.twitter-tweet').length}});PX.plugins.register({name:'ios-orientationchange-fix',condition:function(){return;var ua=navigator.userAgent;return!!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(ua)&&ua.indexOf("AppleWebKit")>-1)}})}(jQuery));(function($){var $dropdowns=$('[data-dropdown]');$(document).on('click.dropdown',function(event){var $closest=$(event.target).closest('[data-dropdown]');if($closest.length)$closest.parents('.dropdown').toggleClass('dropdown--open');$dropdowns.filter(function(i,el){if($closest&&$closest[0]===el)return false;return true}).parents('.dropdown').removeClass('dropdown--open')})}(jQuery));(function($){var sAttr='data-2x';return $('img['+sAttr+']').each(function(i){var $img=$(this),maxWidth=$img.attr('width')+'px',src=$img.attr('data-2x').split('.');if(src)if(window.devicePixelRatio&&window.devicePixelRatio>=1.5){$img.attr('src',src[0]+'-2x.'+src[1]).removeAttr(sAttr).attr('style','max-width: '+maxWidth).addClass('image--retina')}else $img.attr('src',src[0]+'.'+src[1]).removeAttr(sAttr)})}(jQuery));(function($){var $elements=$('[data-tweet-date]');if(!$elements.length)return;$elements.each(function(i,el){var output='',now=new Date().getTime(),$el=$(el),tDate=$el.attr('data-tweet-date'),tweet=Date.parse(tDate);if(isNaN(tweet))tweet=Date.parse(tDate.replace(/( \+)/,' UTC$1'));var diff=now-tweet,secDur=1e3,minDur=60*secDur,hourDur=60*minDur,dayDur=24*hourDur;if(diff<minDur){output=Math.floor(diff/secDur)+'s'}else if(diff<hourDur){output=Math.floor(diff/minDur)+'min'}else if(diff<dayDur){output=Math.floor(diff/hourDur)+'h'}else{output=Math.floor(diff/dayDur);output=output+'&nbsp;jour'+(output>1?'s':'')};$el.html(output)})}(jQuery));(function($){var $elements=$('[data-share-action]');if(!$elements.length)return;$elements.on('click',function(e){e.preventDefault();var action=$(this).attr('data-share-action')||'Partage';PXU.openWin(this.href,action)})}(jQuery));(function($){var breakpoints=['xs','s','m','l','xl'];$(function(){$('[data-img-src]').each(function(){parseElement($(this))})})
function parseElement($el){var sources=$el.data('imgSrc'),src=null;if(typeof sources==='string'){src=sources}else src=getResponsiveSource(sources);applySource($el,src);$el.removeAttr('data-img-src')}
function getResponsiveSource(sources){var src=sources['default']?getDensity(sources['default']):null,currentBreakpoint=PX.test('screen');for(var i=breakpoints.length-1;i>=0;i--){if(sources[breakpoints[i]])src=getDensity(sources[breakpoints[i]]);if(breakpoints[i]===currentBreakpoint)break};return src}
function getDensity(source){var density;if(typeof source==='string'){density=source}else if(source['1x']){density=source['1x'];if(PX.test('retina')&&source['2x'])density=source['2x']};return density}
function applySource($el,src){var naturalWidth;if(!src)return false;if($el.get(0).nodeName==='IMG'){$el.attr('src',src);if(PX.test('retina')){$el.addClass('img-retina');naturalWidth=$el.data('width');if(naturalWidth)$el.css('max-width',naturalWidth)}}else $el.css('background-image','url('+src+')')}}(jQuery));(function($){var $buttons=$('[data-newsletter-update]');if(!$buttons.length)return;$buttons.on('click',function(e){e.preventDefault();var $btn=$(this),defaultText=$(this).text(),$message=$btn.prev(),theme=$btn.data('newsletterUpdate'),$request;$btn.text('Validation...').addClass('btn--loading');$request=$.ajax(this.href);$request.done(function(data){if(data.inscrit){onSubscribe($btn,$message,theme)}else onUnsubscribe($btn,$message,theme)});$request.fail(function(){onError($btn,$message,defaultText)});$request.always(function(){$btn.removeClass('btn--loading')})})
function onSubscribe($btn,$message,theme){$btn.removeClass('btn--'+theme).addClass('btn--white').attr('title','Cliquez ici pour vous désinscrire.').html('&#10003; Inscrit');updateMessage($message,'Inscription validée')}
function onUnsubscribe($btn,$message,theme){$btn.removeClass('btn--white').addClass('btn--'+theme).attr('title','Cliquez ici pour vous inscrire.').html('Ajouter');updateMessage($message,'Désinscription validée')}
function onError($btn,$message,defaultText){$btn.html(defaultText);updateMessage($message,'Erreur de validation')};var messagesTimers=[]
function updateMessage($element,message){var id=$element.attr('id'),timer=messagesTimers[id]||null;if(timer)clearTimeout(timer);$element.text(message);messagesTimers[id]=setTimeout(function(){$element.text('')},3e3)}}(jQuery));(function($){var $form=$('.tunnel-form');if(!$form.length)return;if(PX.test('screen','xs'))$('[value*="étape suivante"]').val("Valider")}(jQuery));(function($){var $wrapper=$('.tunnel-form-inner--vos-newsletters');if(!$wrapper.length||!$(document.documentElement).hasClass('lte-ie8'))return;$wrapper.find('input[type="checkbox"]').on('change',function(){var $input=$(this),$label=$input.next('label'),$on=$label.find('.on'),$off=$label.find('.off');if($input.attr('checked')){$on.show();$off.hide()}else{$on.hide();$off.show()}}).trigger('change')}(jQuery));(function($){var $body=$('body'),$burger=$("#burger"),$burgerButton=$("#burgerButton"),$burgerOverflow=$("#burgerOverflow")
function openMenu(){$burgerOverflow.addClass('open');$burgerButton.addClass('open');$burger.addClass('open');$body.addClass('no-scroll')}
function closeMenu(){$burgerOverflow.removeClass('open');$burgerButton.removeClass('open').blur();$burger.removeClass('open');$body.removeClass('no-scroll')};$burgerOverflow.click(function(){closeMenu()});$burgerButton.click(function(){if($(this).hasClass('open')){closeMenu()}else openMenu()})})(jQuery);(function($){var cookieName='cookie_consent',hasAccepted=$.cookie(cookieName),$element,$closeHandler;if(hasAccepted);else{$element=$('#cookie-notice').removeClass('hide');$element.find('.px-messages_after').one('click.notice',closeNotice)}
function closeNotice(){$.cookie(cookieName,true,{expires:365});$element.remove()}})(jQuery);(function($){var $buttonSearch=$('#buttonSearch'),$buttonSearchClose=$('#buttonSearchClose'),$dropdownSearch=$('#dropdownSearch');$buttonSearch.click(openDropdown);$buttonSearchClose.click(closeDropdown)
function openDropdown(e){e.preventDefault();e.stopPropagation();$buttonSearchClose.fadeIn(100);$dropdownSearch.slideDown(300)}
function closeDropdown(e){e.preventDefault();e.stopPropagation();$buttonSearchClose.fadeOut(100);$dropdownSearch.slideUp(300)}})(jQuery);(function($){var activated=false,first_init=true,$sections=$('[data-mobile-section]'),breakpoints=['s','xs'];if(!$sections.length)return;$(window).on('resize.mobile_section',$.throttle(250,function(){if(PX.test('screen',breakpoints)&&!activated)init();if(!PX.test('screen',breakpoints)&&activated)destroy()})).trigger('resize.mobile_section')
function init(){activated=true;$sections.each(function(){var $element=$(this).addClass('mobile-section'),$heading=$element.find('.heading').addClass('mobile-section_heading'),$handler=$heading.find('.heading_side');$handler.on('click.mobile_section',function(){$element.toggleClass('mobile-section--open')});if(first_init){var state=$element.attr('data-mobile-section');if(state=='open')$element.addClass('mobile-section--open')}});first_init=false}
function destroy(){activated=false;$sections.each(function(){var $element=$(this).removeClass('mobile-section'),$handler=$element.find('.bloc-head');$handler.off('click.mobile_section')})}})(jQuery);(function($){$(function(){var selectors='title|meta[property="og:title"]|meta[name="description"]|meta[property="og:description"]|h1'.split('|'),selector,$element,value,output=[];for(var i=0,l=selectors.length;i<l;i++){value=false;selector=selectors[i];$element=$(selector);if(selector.indexOf('meta')===0){value=$element.attr('content')}else value=$element.text();if(value){output.push(selector+'\n"'+value+'"')}else output.push('&lt;'+selector+'&gt; /!\\ NOT FOUND')};if('localStorage'in window&&localStorage.getItem&&localStorage.getItem('px_meta')!=null)$('body').append('<pre class="px-console px-console--fly">'+output.join('\n\n')+'</pre>')})})(jQuery);(function($){$('[data-congrate]').on('click.congrate',function(e){e.preventDefault();if(!$(this).data('congrate'))return handleError(element,'Vous avez déjà félicité cette personne.');processCongrate(this)})
function processCongrate(element){var $req,reqUrl,$element=$(element);if(!element||!$(element).data('congrate'))return handleError(element);$element.addClass('btn--loading');reqUrl='/ajax-congratulate/node/'+$(element).data('congrate');$req=$.ajax(reqUrl);$req.done(function(data){if(!data){return handleError(element)}else{if(!data.success)return handleError(element);handleSuccess(element,data.count)}});$req.fail(function(response,type,status){if(response.status===403){handleError(element,'Vous avez déjà félicité cette personne.')}else handleError(element)});$req.always(function(){$element.removeClass('btn--loading')})}
function resetError(element){var $message=getMessageWrapper(element);$message.removeClass('message-congrate--active').empty()}
function handleError(element,str){var message=str?str:'Désolé, une erreur est survenue. Merci de réessayer ultérieurement.',$message=getMessageWrapper(element);$message.addClass('message-congrate--active').text(message);return false}
function handleSuccess(element,count){var countMessage=count+' félicitation'+(count>1?'s':'');$(element).html('<span class="btn_ico"><span class="ico_tcheck_m_white"></span></span> <span class="btn_text">Vous avez félicité cette personne</span>').attr('data-congrate',0).removeClass('btn--primary').addClass('btn--white-inv btn--disabled btn--ico').next('.nomination_bottom__link').text(countMessage)}
function getMessageWrapper(element){var $element=$(element),$message=$element.parents('.nomination_bottom').next('.message-congrate');if(!$message.length){$element.parents('.nomination_bottom').after('<div class="message-congrate font-small"></div>');$message=$element.parents('.nomination_bottom').next('.message-congrate')};return $message}})(jQuery);(function(doc,$){var menu=doc.getElementById('mini-site-menu'),resize_event='resize.fixed',$menu,$anchors,screen_size,menu_height;if(!menu)return;screen_size=PX.test('screen');if(screen_size==='s'||screen_size==='xs')return;$menu=$(menu);$anchors=$('.mini-site-page .anchor');menu.className+=' mini-site_menu--fixed'
function process(){if(typeof menu_height!=='undefined'){doc.body.style.paddingTop=menu_height+'px';$anchors.css('top',-menu_height-50)}};$(window).on(resize_event,function(){var new_height=$menu.outerHeight();if(new_height!==menu_height){menu_height=new_height;process()}}).trigger(resize_event)})(document,jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/bootstrap.js. */
/* Source and licensing information for the line(s) below can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/page-refresh.js. */
(function($){var timeoutValue=6e4,exceptions=['#block-system-main video','.user-login-form','.user-pass','.signin-box','#agefi-user-register-form','#block-system-main .search-form'],timeout,exceptionsFlag=false
function setRefresh(exceptionsFlag){if(!exceptionsFlag)timeout=setTimeout(function(){location.reload(true)},timeoutValue)};$(window).load(function(){for(var i=0;i<exceptions.length;i++)if($('body').find(exceptions[i]).length)exceptionsFlag=true;setRefresh(exceptionsFlag)});if(document.hasFocus()===false){exceptionsFlag=true;clearTimeout(timeout)};$(window).blur(function(){exceptionsFlag=true;clearTimeout(timeout)});$(window).focus(function(){setRefresh(false)})})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.agefi.fr/sites/agefi.fr/themes/agefi/js/page-refresh.js. */
