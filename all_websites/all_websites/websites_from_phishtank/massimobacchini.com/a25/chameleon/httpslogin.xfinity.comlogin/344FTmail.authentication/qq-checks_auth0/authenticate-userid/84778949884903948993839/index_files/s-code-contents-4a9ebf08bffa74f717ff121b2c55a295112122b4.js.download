/* SiteCatalyst code version: appmeasurement 2.7.0*/

/* Change Log:
05/31/2018:
1. Added Resi appMeasurement
2. upgrade to version 2.7.0
3. Removed Channel Manager Plugin
4. Removed scEnv() getViewSizeCategory() trackResizeEvent()
*/
var upDate='11212019'; 
s = new AppMeasurement()

if(_satellite.getVar('AA : businessType')=== "resi"){
  console.log(_satellite.getVar('AA : businessType'));
  if(_satellite.configurationSettings.settings.isStaging.toString() == "true"){
      s.account="comcastdotcomqa";
      }
  
   if(_satellite.configurationSettings.settings.isStaging.toString() == "false"){
     s.account="comcastdotcomprod"; 
   }
}

if(_satellite.getVar('AA : businessType')=== "busn"){   
  s.account="comcastbizportaldev";
  
   if(_satellite.configurationSettings.settings.isStaging.toString() == "false"){
     s.account="comcastbizportalprod"; 
   }
}

var s_account=s.account
var s=s_gi(s_account)    

/************************** CONFIG SECTION **************************/
s.currencyCode = "USD"
s.charSet = "UTF-8"
s.trackDownloadLinks = true
s.trackExternalLinks = true
s.trackInlineStats = true
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkLeaveQueryString = false
s.linkTrackVars = "None"
s.linkTrackEvents = "None"

/*Tracking Server*/
  
s.visitor = Visitor.getInstance("DA11332E5321D0550A490D45@AdobeOrg");
s.trackingServer="comcastcom.d1.sc.omtrdc.net";  
s.trackingServerSecure="comcastcom.d1.sc.omtrdc.net";




/*****Link Internal Filter setup Start******/

if(_satellite.getVar('AA : businessType')=== 'busn'){
 s.linkInternalFilters="javascript:,login.comcast.net,login.xfinity.com,businessclass.comcast.net";  
}
else if(_satellite.getVar('AA : businessType')=== "resi"){
//any edits to the s.linkInternalFilters will need a change in the s_account variable setting as done above
s.linkInternalFilters = "javascript:,comcast.com,www.xfinity,comcast.convergentcare.com,customer.xfinity.com,es.xfinity.com,forums.xfinity.com,ly.xfinity.com,mobile.xfinity.com,mostlivesports.com,referafriend.xfinity.com,sitesearch.xfinity.com,wifi.xfinity.com,forums.businesshelp.comcast.com,api.xfinity.com,cdn.xfinity.com,comcastsupport.com,login.xfinity.com"
}

/*****Link Internal Filter setup Ends******/

s.usePlugins = true
function s_doPlugins(s) {

/****Residential custom  code placeholder****/
if(_satellite.getVar('AA : businessType')=== 'resi'){
    
s.prop54 = (typeof(Visitor) != "undefined" ? "VisitorAPI Present" : "VisitorAPI Missing");


    
        /* Allant integration testing */
        s.eVar51 = s.Util.getQueryParam('mid'); 
    //allant link ID
        s.eVar52 = s.Util.getQueryParam('rid'); 
    //allant recipient ID
        s.campaign = s.eVar53 = (s.eVar51 + '').substring(0, s.eVar51.indexOf('^'));
    
    s.eVar66 = s.Util.getQueryParam('TargetId');// Targetted IDs
    var _buyflow_events = ['event18','event19','event33','event50'];
    var _ev = (s.events + '').split(',');
    s.events = '';
        for (var _i = 0; _i < _ev.length; _i++) 
    {
                for (var _n = 0; _n < _buyflow_events.length; _n++) 
        {
                        if (_ev[_i] == _buyflow_events[_n]) 
            {
                                _ev[_i] += s.purchaseID ? (':' + s.purchaseID) : '';
                        }
                 }
                s.events += _ev[_i] + ',';
         }
    s.events = s.events.substring(0, s.events.length - 1);
    s.eVar37 = "D=pageName";
    /* To avoid the searches event from firing if the same KW is searched */
    if (s.eVar41) {
            s.t_search = s.getValOnce(s.eVar41, 'ev41', 0);
            s.eVar42 = 'D="' + s.eVar42 + ' : "+v41';
                if (s.events.indexOf("event9") > -1) s.events = s.repl(s.events, ",event9", "");
                /*Handles multiple tabbed search tracking*/
                if (s.t_search) s.events = s.apl(s.events, "event9", ",", 2);
        }
    s._searchTerms = s.getAndPersistValue(s.eVar41, 'stc18', 0);
    if (!s.prop18 && s._searchTerms) s.prop18 = 'D="' + s._searchTerms + ' - "+ pageName';

    /* Campaing Tracking*/

    s.getQueryParam('cmp,CMP,dfaid,DFAID,mid,MID,cid,CID');

     /*Internal Link Tracking*/
    if (!s.eVar45) s.eVar45 = s.Util.getQueryParam('intcmp');
  if (!s.eVar45) s.eVar45 = s.Util.getQueryParam('INTCMP');
        
        s.eVar45 = s.getValOnce(s.eVar45, "s_v45", 0);

        /*Call to TNT integration Plugin*/
        s.tnt = s.trackTNT();
      
    
        //Copy purchaseID to transactionID and prop21 then truncate to 20 characters
       if (s.purchaseID) {
               s.prop21 = "D=xact";
               s.purchaseID = (s.purchaseID + '').slice(0, 20)
               }
        //page and content pathing
    if(!s.prop25){
        s.prop25=s.pageName+"|page load";
    }
  //Day Since Last Visits
  s.eVar46=s.getDaysSinceLastVisit('s_lv');
  // Percent page View
	if(s.pageName) s.prop70=s.getPreviousValue(s.pageName,"gpv_Page");
    if(s.pageName)
        
       // var ppvArray = s.getPercentPageViewed();
   /* if(typeof ppvArray != 'undefined' && typeof ppvArray[1] != 'undefined')
    {
        //set prop8 equal to the initial percent of the previous page viewed and the highest percent of the previous page viewed, delimited by a pipe character
        s.prop71 = 'initialpercent=' + ppvArray[2] + ' | highestpercent=' + ppvArray[1];
        //set prop9 equal to the previous page viewed
        s.prop70 = ppvArray[0];
    }
    else
        //blank out both prop8/prop9 if the plugin did not return a proper array
        s.prop71 = s.prop70 = ""; */

  //Passing the s_code location into prop73

      s.prop73 ="DTM Hosted |"+upDate;

       
    //Page load plugin call
    s.prop72=s_getLoadTime();
if(s_getLoadTime())s.events=s.apl(s.events,'event36='+s_getLoadTime(),',',1);
    
/**get Responsive Web Design Values**/
    var phoneMax='750';//initialize phonemax value
    var desktopMin='980';//initiliaze desktopmin value
      
    if(typeof bp1!='undefined' && typeof bp2!='undefined'){ 
      phoneMax= bp1;//set to bp1 if value is present on page
      desktopMin=bp2;//set to bp2 if value is present on page
    }
    var second=s.getRwd(false,phoneMax,desktopMin);
      if (typeof s.prop44 != 'undefined'){
      if(s.prop44.indexOf('responsive')>-1){ //update the text code to contains 'responsive' now from 'responsivedesign'
      second=s.getRwd(true,phoneMax,desktopMin);
      } 
    }
    var viewportwidth;
    var viewportheight;
    
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined')
    {
        viewportwidth = window.innerWidth,
        viewportheight = window.innerHeight
    }
    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
       && typeof document.documentElement.clientWidth !=
       'undefined' && document.documentElement.clientWidth != 0)
    {
         viewportwidth = document.documentElement.clientWidth,
         viewportheight = document.documentElement.clientHeight
    }
    // older versions of IE
    else
    {
         viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
         viewportheight = document.getElementsByTagName('body')[0].clientHeight
    }

    if (viewportwidth > viewportheight){
      var first='landscape';
      }
      else first='portrait';
    //populating evar29 with the concatanated value of orientation and rwd plugin response  
    s.eVar29 = first + ':' + second;
  
  /* Time To Complete different actions */
  if(s.inList("prodView", s.events) || s.inList("purchase", s.events) || s.inList("event12", s.events))
  {
    // Time between the last prodView and first purchase
    s.eVar87 = s.getTimeBetweenEvents('prodView', 'l', 'purchase', 'f', 's_ttc_ev87');
    // Time between the last Customize (e12) and first purchase
    s.eVar88 = s.getTimeBetweenEvents('event12', 'l', 'purchase', 'f', 's_ttc_ev88');
  }

}

/****Residential custom  code placeholder Ends****/

/* Business code starts here */ 

if(_satellite.getVar('AA : businessType')=== 'busn'){  
  /* Set Page View Event */
    s.events = s.apl(s.events, 'event11', ',', 2);
  
  /* track campaigns and email confirmations */
  s.campaign=s.getQueryParam('cid');
  
  /* track bounce rate and clickthroughs */
  s.clickPast(s.campaign,'event7','event8');
  
  /* Set New/Repeat Visitor into eVar7 */
  s.eVar7=s.getNewRepeat();
    
    // Copy content props to eVars
    s.eVar11 = "D=pageName";
    if (!s.eVar12 && s.prop12) s.eVar12 = "D=c12";
    if (!s.eVar13 && s.prop13) s.eVar13 = "D=c13";
    if (!s.eVar14 && s.prop14) s.eVar14 = "D=c14";
    
  /*Internal Link Tracking*/
    if (!s.eVar45) s.eVar45 = s.getQueryParam('intcmp')
    s.eVar45 = s.getValOnce(s.eVar45, "s_v45", 0)
  /* Get days since Last visit */
  s.eVar46=s.getDaysSinceLastVisit('s_lv');
  
} 
/* Business code ends here */

/*DCOE Audience Management SSF Module*/

    s.AudienceManagement.setup({
             "partner":"comcast",
             "containerNSID":0,
             "uuidCookie": { //optional if you want to drop the UUID on the first party domain
                "name":"aam_uuid",
                "days": 30
            }
    });  
    if(s.eVar71){
        var cGuid = s.eVar71;
    }  
      if(s.eVar64){
        var aGuid = s.eVar64;
    } 
     

        if((typeof cGuid != 'undefined' && cGuid) && (typeof aGuid != 'undefined' && aGuid))  
            {
                        
                        
                        _satellite.getVisitorId().setCustomerIDs({
                                    "comcast618custguidv71":{
                                    "id":cGuid,
                                    "authState":Visitor.AuthState.AUTHENTICATED
                                    },
                                    "comcast_v64":{
                                    "id":aGuid,
                                    "authState":Visitor.AuthState.AUTHENTICATED
                                    }

                        });
            } 
        if((typeof cGuid != 'undefined' && cGuid) && (typeof aGuid == 'undefined' && !aGuid))  
            {
                       
                        
                        _satellite.getVisitorId().setCustomerIDs({
                                    "comcast618custguidv71":{
                                    "id":cGuid,
                                    "authState":Visitor.AuthState.AUTHENTICATED
                                    },
                                   

                        });
            }       
        if((typeof aGuid != 'undefined' && aGuid) && (typeof cGuid == 'undefined' && !cGuid))  
            {
                        
                        
                        _satellite.getVisitorId().setCustomerIDs({
                                    "comcast_v64":{
                                    "id":aGuid,
                                    "authState":Visitor.AuthState.AUTHENTICATED
                                    }
                                   

                        });
            }
/*DCOE Audience Management SSF Module End*/
  
  /* Comcast Athena DIL Config*/
var DILComcastA = DIL.create(
    {
      partner: "comcastathena",
      containerNSID: 1 ,
      uuidCookie:
      {
        name: 'aam_uuid',
        days: 30
      },
      visitorService:
      {
        namespace: '723C39F756ABCD0B7F000101@AdobeOrg'
      },
    });
    //Analytics Integration
    var _scDilObj;
    if (typeof s != 'undefined' && s === Object(s) && typeof s.account != 'undefined' && s.account)
    {
      _scDilObj = s_gi(s.account);
    }
    else
    {
      _scDilObj = s_gi(s_account);
    }
    DIL.modules.siteCatalyst.init(_scDilObj, DILComcastA,
    {
      names: ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
      iteratedNames: [
      {
        name: 'eVar',
        maxIndex: 100
      },
      {
        name: 'prop',
        maxIndex: 75
      },
      {
        name: 'pev',
        maxIndex: 3
      },
      {
        name: 'hier',
        maxIndex: 4
      }]
    });
  
}

s.doPlugins = s_doPlugins
/************************** PLUGINS SECTION *************************/
/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd=window;
s.fl=new Function("x","l",""
+"return x?(''+x).substring(0,l):x");

s.rep=new Function("x","o","n",""
+"var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for("
+"i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){"
+"j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i"
+">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi"
+"n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape=new Function("x",""
+"var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y"
+"='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp"
+"onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf("
+"n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}"
+"else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub"
+"string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e="
+"h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='"
+"+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2"
+"B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)"
+"{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst"
+"ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst"
+"ring(i);i=x.indexOf('%',i)}}}return x");
s.epa=new Function("x",""
+"var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu"
+"nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape"
+"(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri=new Function("u",""
+"if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')"
+"==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr"
+"eateElement('a'),l=['href','protocol','host','hostname','port','pat"
+"hname','search','hash'],p,r={href:u,toString:function(){return this"
+".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p"
+"]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam"
+"e='/'+p;return r");
s.gtfs=new Function(""
+"var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot"
+"ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?"
+"d.referrer:d.location;return{location:s.parseUri(u)}");


/*
 * Cookie Combining Utility v1.0 (Minified)
 */
if(!s.__ccucr){var c_rspers=function(){var s=this,cv=s.c_rr("s_pers"),date=(new Date).getTime(),expd=null,cvarr=[],vcv="";if(!cv)return vcv;cvarr=cv.split(";");for(var i=0,l=cvarr.length;i<l;i++){expd=cvarr[i].match(/\|([0-9]+)$/);if(expd&&parseInt(expd[1])>=date)vcv+=cvarr[i]+";"}return vcv};var c_r=function(k){var s=this,d=new Date,v=s.c_rr(k),c=s.c_rspers(),i,m,e;if(v)return v;k=s.escape?s.escape(k):encodeURIComponent(k);i=c.indexOf(" "+k+"=");c=i<0?s.c_rr("s_sess"):c;i=c.indexOf(" "+k+"=");m=
i<0?i:c.indexOf("|",i);e=i<0?i:c.indexOf(";",i);m=m>0?m:e;v=i<0?"":s.unescape?s.unescape(c.substring(i+2+k.length,m<0?c.length:m)):decodeURIComponent(c.substring(i+2+k.length,m<0?c.length:m));return v};s.c_rr=s.c_r;s.__ccucr=true;s.c_rspers=c_rspers;s.c_r=s.cookieRead=c_r}
if(!s.__ccucw){var c_w=function(k,v,e){var s=this,d=new Date,ht=0,pn="s_pers",sn="s_sess",pc=0,sc=0,pv,sv,c,i,t,f;d.setTime(d.getTime()-6E4);if(s.c_rr(k))s.c_wr(k,"",d);k=s.escape?s.escape(k):encodeURIComponent(k);pv=s.c_rspers();i=pv.indexOf(" "+k+"=");if(i>-1){pv=pv.substring(0,i)+pv.substring(pv.indexOf(";",i)+1);pc=1}sv=s.c_rr(sn);i=sv.indexOf(" "+k+"=");if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.indexOf(";",i)+1);sc=1}d=new Date;if(e){if(e==1)e=new Date,f=e.getYear(),e.setYear(f+5+(f<1900?
1900:0));if(e.getTime()>d.getTime()){pv+=" "+k+"="+(s.escape?s.escape(v):encodeURIComponent(v))+"|"+e.getTime()+";";pc=1}}else{sv+=" "+k+"="+(s.escape?s.escape(v):encodeURIComponent(v))+";";sc=1}sv=sv.replace(/%00/g,"");pv=pv.replace(/%00/g,"");if(sc)s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t.indexOf(";")!=-1){var t1=parseInt(t.substring(t.indexOf("|")+1,t.indexOf(";")));t=t.substring(t.indexOf(";")+1);ht=ht<t1?t1:ht}d.setTime(ht);s.c_wr(pn,pv,d)}return v==s.c_r(s.unescape?s.unescape(k):decodeURIComponent(k))};
s.c_wr=s.c_w;s.__ccucw=true;s.c_w=s.cookieWrite=c_w};


/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat=new Function("d","cn",""
+"var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:"
+"'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length="
+"=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct"
+"-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N"
+"ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");



/*
 * Plugin: getQueryParam 2.4
 */
s.getQueryParam=new Function("p","d","u","h",""
+"var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+"tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+"?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+"')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+"g(i==p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u","h",""
+"var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+"string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return''");

/*                                                                  
* Plugin: clickPast - version 1.0
*/
s.clickPast=new Function("scp","ct_ev","cp_ev","cpc",""
+"var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+"{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+",0,0);}}}");

s.p_fo=new Function("n",""
+"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+"new Object;return 1;}else {return 0;}");

/*
 * Utility manageVars v1.4 - clear variable values (requires split 1.5)
 */
s.manageVars=new Function("c","l","f",""
+"var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+"geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
+"'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+"it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+"a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+"}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+");return true;}else{return false;}");
s.clearVars=new Function("t","var s=this;s[t]='';");
s.lowercaseVars=new Function("t",""
+"var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index"
+"Of('D=')!=0){s[t]=s[t].toLowerCase();}}");

/* Plugin: getValOnce 0.2 -  */
s.getValOnce = new Function("v", "c", "e", ""
+ "var s=this,k=s.c_r(c),a=new Date;e=e?e:0;if(v){a.setTime(a.getTime("
+ ")+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");



/*
 * Plugin: getAndPersistValue 0.4 - get a value on every page
 */
s.getAndPersistValue=function(v,c,e){var s=this,a=new Date;e=e?e:0;c=c?c:"s_gapv";a.setTime(a.getTime()+e*864E5);if(v)s.c_w(c,v,e?a:0);return s.c_r(c)};


/*
 * Plugin Utility: apl (Append to List) v2.0 (Minified)
 */
s.apl=function(l,v,d,u){var s=this,m=0,d=d?d:",";if(!l)l="";var i,a=l.split(d),al=a.length;for(i=0;i<al;i++)if(u==1&&a[i]==v){m=1;break}else if(u!=1&&a[i].toLowerCase()==v.toLowerCase()){m=1;break}if(!m)l=l?l+d+v:v;return l};

/*
 * Plugin: getValOnce v1.11
 */
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");


/* Plugin Utility: Replace v1.0*/
s.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugin Utility: Join v1.0
 */
s.join=new Function("v","p",""
+"var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");


//******************************************* BEGIN CODE TO DEPLOY *******************************************/
/* Adobe Consulting Plugin: getPreviousValue v2.0 (Requires AppMeasurement) */
s.getPreviousValue=function(v,c){var s=this,d;c=c||"s_gpv";var b=new Date;b.setTime(b.getTime()+18E5);s.c_r(c)&&(d=s.c_r(c));v?s.c_w(c,v,b):s.c_w(c,d,b);return d};
/******************************************** END CODE TO DEPLOY ********************************************/
/*
//* Utility Function: p_gh
*/
s.p_gh = new Function(""
+ "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
+ "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
+ "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
+ "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

s.p_gn = new Function("t", "h", ""
+ "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+ "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+ "return 0;");

/*
 * Plugin Utility: pt - runs function in f argument against list of
 * variables declared in x (delimited by d), with a as an optional
 * argument to be included in f function call
 */
/* 
 * s.pt utility (runs function f against variables in x)
 */
s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:""}return""};


/*
* Utility Function: vpr - set the variable vs with value v
*/
s.vpr = new Function("vs", "v",
"if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

//Page load plugin definition
function s_getLoadTime(){if(!window.s_loadT){var b=new Date().getTime(),o=window.performance?performance.timing:0,a=o?o.requestStart:window.inHeadTS||0;s_loadT=a?Math.round((b-a)/100):''}return (s_loadT<0)?'':s_loadT;}

//getRWD plugin definition
s.getRwd=function(a,c,e){var d;var b=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;var f=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;if(a){if(b<c){d="phone layout";}else{if(b>=e){d="desktop layout";}else{if(b>=c&&b<e){d="tablet layout";}}}d=d+":"+b+"x"+f;}else{d="not rwd page:"+b+"x"+f;}return d;};

/*
 * Plugin Utility: apl v1.1
 */
s.apl=new Function("l","v","d","u",""
+"var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)l=l?l+d+v:v;return l");

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
* Plugin: getTimeBetweenEvents 0.2 - return the time between two events
*/
s.getTimeBetweenEvents=new Function("v1","v1fl","v2","v2fl","cn","e","fmt","rv",""
+"var s=this,v1p=false,v2p=false,v1a=s.split(v1,','),v2a=s.split(v2,'"
+",'),rva=rv?s.split(rv,','):[],t1,t2='',d=new Date(),x=new Date();cn"
+"=cn?cn:'s_tbe';fmt=fmt?fmt:'f';e=e?e:0;for(var i=0;i<rva.length;++i"
+"){if(s.inList(rva[i],s.events,',')){x.setDate(x.getDate()-1);s.c_w("
+"cn,'',x);return'';}}t1=s.c_r(cn);x.setTime(x.getTime()+e*86400000);"
+"for(var i=0;i<v1a.length&&!v1p;++i){v1p=s.inList(v1a[i],s.events,',"
+"');}for(var i=0;i<v2a.length&&!v2p;++i){v2p=s.inList(v2a[i],s.event"
+"s,',');}if(v1a.length==1&&v2a.length==1&&v1==v2){if(v1p&&v2p){s.c_w"
+"(cn,d.getTime(),e?x:0);if(t1){t2=(d.getTime()-t1)/1000;}}}else{if(v"
+"1p&&(v1fl=='l'||!t1)){s.c_w(cn,d.getTime(),e?x:0);}if(v2p&&t1){if(v"
+"2fl=='f'){x.setDate(x.getDate()-1);s.c_w(cn,'',x);}t2=(d.getTime()-"
+"t1)/1000;}}return t2?s.fmt_t2(t2,fmt):'';");
s.fmt_t2=new Function("t","fmt",""
+"if(fmt=='d'){return t/86400;}else if(fmt=='h'){return t/3600;}else "
+"if(fmt=='m'){return t/60;}else if(fmt=='s'){return t;}else{var td=8"
+"6400,th=3600,tm=60,r=5,u,un;if(t>td){u=td;un='days';}else if(t>th){"
+"u=th;un='hours';}else if(t>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1"
+";un='seconds';}t=t*r/u;return(Math.round(t)/r)+' '+un;}");

/*
 * Utility: inList v1.0 - find out if a value is in a list
 */
 
s.inList=new Function("v","l","d",""
+"var s=this,ar=Array(),i=0,d=(d)?d:',';if(typeof(l)=='string'){if(s."
+"split)ar=s.split(l,d);else if(l.split)ar=l.split(d);else return-1}e"
+"lse ar=l;while(i<ar.length){if(v==ar[i])return true;i++}return fals"
+"e;");

 /* Plugin: manageVars v1.6 (requires s.pt utility if using AppMeasurement)*/
 
s.manageVars=function(c,l,f){var s=this,vl,la,vla;l=l?l:"";f=f?f:1;if(!s[c])return false;vl="pageName,purchaseID,channel,server,pageType,campaign,state,zip,events,products,transactionID";for(var n=1;n<76;n++)vl+=",prop"+n;for(var n=1;n<251;n++)vl+=",eVar"+n;for(n=1;n<6;n++)vl+=",hier"+n;for(n=1;n<4;n++)vl+=",list"+n;for(n in s.contextData)vl+=",contextData."+n;if(l&&(f==1||f==2)){if(f==1)vl=l.replace("['",".").replace("']","");if(f==2){la=l.split(",");vla=vl.split(",");vl="";for(x in la){if(la[x].indexOf("contextData")>
-1){lax=la[x].split("'");la[x]="contextData."+lax[1]}for(y in vla)if(la[x]==vla[y])vla[y]=""}for(y in vla)vl+=vla[y]?","+vla[y]:""}s.pt(vl,",",c,0);return true}else if(l==""&&f==1){s.pt(vl,",",c,0);return true}else return false};
/*s.clearVars=function(t){var s=this;if(t.indexOf("contextData")==-1)s[t]="";else if(t.indexOf("contextData")>-1){var c=t.substring(t.indexOf(".")+1);s.contextData[c]=""}};
s.lowercaseVars=function(t){var s=this;if(t!="events"&&t.indexOf("contextData")==-1&&s[t]){s[t]=s[t].toString();if(s[t].indexOf("D=")!=0)s[t]=s[t].toLowerCase()}else if(t.indexOf("contextData")>-1){var c=t.substring(t.indexOf(".")+1);if(s.contextData[c]){s.contextData[c]=s.contextData[c].toString();s.contextData[c]=s.contextData[c].toLowerCase()}}};
*/
/*
 * TNT Integration Plugin v2.2
 */
s.trackTNT=function(v,p,b){var s=this,n="s_tnt",q="s_tntref",p=p?p:n,v=v?v:n,r="",pm=false,b=b?b:true;s.gqp=s.getQueryParam?s.getQueryParam:s.Util.getQueryParam;if(s.gqp(q)!="")s.referrer=s.gqp(q);else if(s.c_r(q)!=""){s.referrer=s.c_r(q);document.cookie=q+"=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;"}else if(document.cookie.indexOf(q)!=-1&&s.c_r(q)==""||location.search.indexOf(q+"=")!=-1&&s.gqp(q)==""){s.referrer="Typed/Bookmarked";document.cookie=q+"=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;"}if(s.gqp(p)!=
"")pm=s.gqp(p);else if(s.c_r(p)){pm=s.c_r(p);document.cookie=p+"=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT;"}else if(s.c_r(p)==""&&s.gqp(p)=="")pm="";if(pm)r+=pm+",";if(window[v]!=undefined)r+=window[v];if(b)window[v]="";return r};

/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");


s.p_gh = new Function("", ""
+ "var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o"
+ "),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o"
+ "=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot"
+ "(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");
s.p_gn = new Function("t", "h", ""
+ "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+ "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+ "return 0;");



/*********Integrate Module ******************/

function AppMeasurement_Module_Integrate(l){var c=this;c.s=l;var e=window;e.s_c_in||(e.s_c_il=[],e.s_c_in=0);c._il=e.s_c_il;c._in=e.s_c_in;c._il[c._in]=c;e.s_c_in++;c._c="s_m";c.list=[];c.add=function(d,b){var a;b||(b="s_Integrate_"+d);e[b]||(e[b]={});a=c[d]=e[b];a.a=d;a.e=c;a._c=0;a._d=0;void 0==a.disable&&(a.disable=0);a.get=function(b,d){var f=document,h=f.getElementsByTagName("HEAD"),k;if(!a.disable&&(d||(v="s_"+c._in+"_Integrate_"+a.a+"_get_"+a._c),a._c++,a.VAR=v,a.CALLBACK="s_c_il["+c._in+"]."+
a.a+".callback",a.delay(),h=h&&0<h.length?h[0]:f.body))try{k=f.createElement("SCRIPT"),k.type="text/javascript",k.setAttribute("async","async"),k.src=c.c(a,b),0>b.indexOf("[CALLBACK]")&&(k.onload=k.onreadystatechange=function(){a.callback(e[v])}),h.firstChild?h.insertBefore(k,h.firstChild):h.appendChild(k)}catch(l){}};a.callback=function(b){var c;if(b)for(c in b)Object.prototype[c]||(a[c]=b[c]);a.ready()};a.beacon=function(b){var d="s_i_"+c._in+"_Integrate_"+a.a+"_"+a._c;a.disable||(a._c++,d=e[d]=
new Image,d.src=c.c(a,b))};a.script=function(b){a.get(b,1)};a.delay=function(){a._d++};a.ready=function(){a._d--;a.disable||l.delayReady()};c.list.push(d)};c._g=function(d){var b,a=(d?"use":"set")+"Vars";for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&b[a])try{b[a](l,b)}catch(e){}};c._t=function(){c._g(1)};c._d=function(){var d,b;for(d=0;d<c.list.length;d++)if((b=c[c.list[d]])&&!b.disable&&0<b._d)return 1;return 0};c.c=function(c,b){var a,e,g,f;"http"!=b.toLowerCase().substring(0,4)&&
(b="http://"+b);l.ssl&&(b=l.replace(b,"http:","https:"));c.RAND=Math.floor(1E13*Math.random());for(a=0;0<=a;)a=b.indexOf("[",a),0<=a&&(e=b.indexOf("]",a),e>a&&(g=b.substring(a+1,e),2<g.length&&"s."==g.substring(0,2)?(f=l[g.substring(2)])||(f=""):(f=""+c[g],f!=c[g]&&parseFloat(f)!=c[g]&&(g=0)),g&&(b=b.substring(0,a)+encodeURIComponent(f)+b.substring(e+1)),a=e));return b}}

/***********Integrate Module code ENDS*************/

/* Audience Manager Load Module*/

s.loadModule("AudienceManagement");

function AppMeasurement_Module_AudienceManagement(d){var a=this;a.s=d;var b=window;b.s_c_in||(b.s_c_il=[],b.s_c_in=0);a._il=b.s_c_il;a._in=b.s_c_in;a._il[a._in]=a;b.s_c_in++;a._c="s_m";a.setup=function(c){b.DIL&&c&&(c.disableDefaultRequest=!0,c.disableScriptAttachment=!0,c.disableCORS=!0,c.secureDataCollection=!1,a.instance=b.DIL.create(c),a.tools=b.DIL.tools)};a.isReady=function(){return a.instance?!0:!1};a.getEventCallConfigParams=function(){return a.instance&&a.instance.api&&a.instance.api.getEventCallConfigParams?
a.instance.api.getEventCallConfigParams():{}};a.passData=function(b){a.instance&&a.instance.api&&a.instance.api.passData&&a.instance.api.passData(b)}}
"function"!==typeof window.DIL&&(window.DIL=function(e,f){var k=[],g,u;e!==Object(e)&&(e={});var s,q,F,P,A,y,L,G,Q,R,S,B,C,H,z;s=e.partner;q=e.containerNSID;F=!!e.disableDestinationPublishingIframe;P=e.iframeAkamaiHTTPS;A=e.mappings;y=e.uuidCookie;L=!0===e.enableErrorReporting;G=e.visitorService;Q=e.declaredId;R=!0===e.removeFinishedScriptsAndCallbacks;S=!0===e.delayAllUntilWindowLoad;B=!0===e.disableIDSyncs;C="undefined"===typeof e.secureDataCollection||!0===e.secureDataCollection;H=!0===e.useCORSOnly;
z="boolean"===typeof e.isCoopSafe?e.isCoopSafe:null;var T,U,M,I,V,W,X,Y,N;T=!0===e.disableScriptAttachment;U=!0===e.disableDefaultRequest;M=e.afterResultForDefaultRequest;I=e.dpIframeSrc;V=!0===e.testCORS;W=!0===e.useJSONPOnly;X=e.visitorConstructor;Y=!0===e.disableCORS;N=e.blacklistIELessThan9;L&&DIL.errorModule.activate();var $=!0===window._dil_unit_tests;(g=f)&&k.push(g+"");if(!s||"string"!==typeof s)return g="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",
message:g,filename:"dil.js"}),Error(g);g="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(q||"number"===typeof q)q=parseInt(q,10),!isNaN(q)&&0<=q&&(g="");g&&(q=0,k.push(g),g="");u=DIL.getDil(s,q);if(u instanceof DIL&&u.api.getPartner()===s&&u.api.getContainerNSID()===q)return u;if(this instanceof DIL)DIL.registerDil(this,s,q);else return new DIL(e,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+s+" and containerNSID = "+
q);var m={IS_HTTPS:C||"https:"===document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,MILLIS_PER_DAY:864E5,DIL_COOKIE_NAME:"AAMC_"+encodeURIComponent(s)+"_"+q,FIRST_PARTY_SYNCS:"AMSYNCS",FIRST_PARTY_SYNCS_ON_PAGE:"AMSYNCSOP",HAS_JSON_STRINGIFY:window.JSON===Object(window.JSON)&&"function"===typeof window.JSON.stringify,REGION:"REGION",SIX_MONTHS_IN_MINUTES:259200,IE_VERSION:function(){if(document.documentMode)return document.documentMode;for(var a=7;4<a;a--){var b=document.createElement("div");
b.innerHTML="\x3c!--[if IE "+a+"]><span></span><![endif]--\x3e";if(b.getElementsByTagName("span").length)return a}return null}(),IS_IE_LESS_THAN_9_NOT_SUPPORTED:!1};m.IS_IE_LESS_THAN_9="number"===typeof m.IE_VERSION&&9>m.IE_VERSION;m.BLACKLIST_IE_LESS_THAN_9="undefined"!==typeof N?N:m.IS_IE_LESS_THAN_9&&m.IS_IE_LESS_THAN_9_NOT_SUPPORTED;var O={stuffed:{}},r={},n={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},
callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:q+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,
mid:null,noVisitorAPI:!1,VisitorAPI:null,instance:null,releaseType:"no VisitorAPI",isOptedOut:!0,isOptedOutCallbackCalled:!1,admsProcessingStarted:!1,process:function(a){try{if(!this.admsProcessingStarted){this.admsProcessingStarted=!0;var b=this,c,d,l,h;if("function"===typeof a&&"function"===typeof a.getInstance){if(G===Object(G)&&(c=G.namespace)&&"string"===typeof c)d=a.getInstance(c,{idSyncContainerID:q});else{this.releaseType="no namespace";this.releaseRequests();return}if(d===Object(d)&&d instanceof
a&&"function"===typeof d.isAllowed&&"function"===typeof d.getMarketingCloudVisitorID&&"function"===typeof d.getCustomerIDs&&"function"===typeof d.isOptedOut){this.VisitorAPI=a;if(!d.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=d;l=function(a){"VisitorAPI"!==b.releaseType&&(b.mid=a,b.releaseType="VisitorAPI",b.releaseRequests())};h=d.getMarketingCloudVisitorID(l);if("string"===typeof h&&h.length){l(h);return}setTimeout(function(){"VisitorAPI"!==
b.releaseType&&(b.releaseType="timeout",b.releaseRequests())},this.getLoadTimeout());return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(e){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;n.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var a=t.isPopulatedString,b=this.getMarketingCloudVisitorID();a(this.mid)&&this.mid===
b||(this.mid=b);return a(this.mid)?"d_mid="+this.mid+"&":""},getCustomerIDs:function(){return this.instance?this.instance.getCustomerIDs():null},getCustomerIDsQueryString:function(a){if(a===Object(a)){var b="",c=[],d=[],l,h;for(l in a)a.hasOwnProperty(l)&&(d[0]=l,h=a[l],h===Object(h)&&(d[1]=h.id||"",d[2]=h.authState||0,c.push(d),d=[]));if(d=c.length)for(a=0;a<d;a++)b+="&d_cid_ic="+p.encodeAndBuildRequest(c[a],"%01");return b}return""},getIsOptedOut:function(){this.instance?this.instance.isOptedOut([this,
this.isOptedOutCallback],this.VisitorAPI.OptOut.GLOBAL,!0):(this.isOptedOut=!1,this.isOptedOutCallbackCalled=!0)},isOptedOutCallback:function(a){this.isOptedOut=a;this.isOptedOutCallbackCalled=!0;n.registerRequest()},getLoadTimeout:function(){var a=this.instance;if(a){if("function"===typeof a.getLoadTimeout)return a.getLoadTimeout();if("undefined"!==typeof a.loadTimeout)return a.loadTimeout}return this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},
setDeclaredId:function(a,b){var c=t.isPopulatedString,d=encodeURIComponent;if(a===Object(a)&&c(b)){var l=a.dpid,h=a.dpuuid,e=null;if(c(l)&&c(h)){e=d(l)+"$"+d(h);if(!0===this.declaredIdCombos[e])return"setDeclaredId: combo exists for type '"+b+"'";this.declaredIdCombos[e]=!0;this.declaredId[b]={dpid:l,dpuuid:h};return"setDeclaredId: succeeded for type '"+b+"'"}}return"setDeclaredId: failed for type '"+b+"'"},getDeclaredIdQueryString:function(){var a=this.declaredId.request,b=this.declaredId.init,c=
encodeURIComponent,d="";null!==a?d="&d_dpid="+c(a.dpid)+"&d_dpuuid="+c(a.dpuuid):null!==b&&(d="&d_dpid="+c(b.dpid)+"&d_dpuuid="+c(b.dpuuid));return d}},registerRequest:function(a){var b=this.firingQueue;a===Object(a)&&b.push(a);this.firing||!b.length||S&&!DIL.windowLoaded||(this.adms.isOptedOutCallbackCalled||this.adms.getIsOptedOut(),this.adms.calledBack&&!this.adms.isOptedOut&&this.adms.isOptedOutCallbackCalled&&(this.adms.isOptedOutCallbackCalled=!1,a=b.shift(),a.src=a.src.replace(/demdex.net\/event\?d_nsid=/,
"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),t.isPopulatedString(a.corsPostData)&&(a.corsPostData=a.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),D.fireRequest(a),this.firstRequestHasFired||"script"!==a.tag&&"cors"!==a.tag||(this.firstRequestHasFired=!0)))},processVisitorAPI:function(){this.adms.process(X||window.Visitor)},requestRemoval:function(a){if(!R)return"removeFinishedScriptsAndCallbacks is not boolean true";var b=this.toRemove,c,d;a===Object(a)&&
(c=a.script,d=a.callbackName,(c===Object(c)&&"SCRIPT"===c.nodeName||"no script created"===c)&&"string"===typeof d&&d.length&&b.push(a));if(this.readyToRemove&&b.length){d=b.shift();c=d.script;d=d.callbackName;"no script created"!==c?(a=c.src,c.parentNode.removeChild(c)):a=c;window[d]=null;try{delete window[d]}catch(l){}this.removed.push({scriptSrc:a,callbackName:d});DIL.variables.scriptsRemoved.push(a);DIL.variables.callbacksRemoved.push(d);return this.requestRemoval()}return"requestRemoval() processed"},
getCoopQueryString:function(){var a="";!0===z?a="&d_coop_safe=1":!1===z&&(a="&d_coop_unsafe=1");return a}};u=function(){var a="http://fast.",b="?d_nsid="+q+"#"+encodeURIComponent(document.location.href);if("string"===typeof I&&I.length)return I+b;m.IS_HTTPS&&(a=!0===P?"https://fast.":"https://");return a+s+".demdex.net/dest5.html"+b};var v={THROTTLE_START:3E4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:"destination_publishing_iframe_"+s+"_"+q,url:u(),onPagePixels:[],iframeHost:null,getIframeHost:function(a){if("string"===
typeof a){var b=a.split("/");if(3<=b.length)return b[0]+"//"+b[2];k.push("getIframeHost: url is malformed: "+a);return a}},iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:m.POST_MESSAGE_ENABLED?null:100,ibsDeleted:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,newIframeCreated:null,iframeIdChanged:!1,originalIframeHasLoadedAlready:null,
regionChanged:!1,timesRegionChanged:0,attachIframe:function(){function a(){d=document.createElement("iframe");d.sandbox="allow-scripts allow-same-origin";d.title="Adobe ID Syncing iFrame";d.id=c.id;d.name=c.id+"_name";d.style.cssText="display: none; width: 0; height: 0;";d.src=c.url;c.newIframeCreated=!0;b();document.body.appendChild(d)}function b(){p.addListener(d,"load",function(){d.className="aamIframeLoaded";c.iframeHasLoaded=!0;c.requestToProcess()})}if(!m.BLACKLIST_IE_LESS_THAN_9){var c=this,
d=document.getElementById(this.id);d?"IFRAME"!==d.nodeName?(this.id+="_2",this.iframeIdChanged=!0,a()):(this.newIframeCreated=!1,"aamIframeLoaded"!==d.className?(this.originalIframeHasLoadedAlready=!1,b()):(this.iframeHasLoaded=this.originalIframeHasLoadedAlready=!0,this.iframe=d,this.requestToProcess())):a();this.iframe=d}},requestToProcess:function(a,b){function c(){d.jsonForComparison.push(a);d.jsonWaiting.push([a,b])}var d=this,l,h;l=n.adms.instance;a===Object(a)&&l===Object(l)&&l.idSyncContainerID===
q&&(v.ibsDeleted.push(a.ibs),delete a.ibs);if(a&&!t.isEmptyObject(a))if(m.HAS_JSON_STRINGIFY)if(l=JSON.stringify(a.ibs||[]),h=JSON.stringify(a.dests||[]),this.jsonForComparison.length){var e=!1,f,g,k;f=0;for(g=this.jsonForComparison.length;f<g;f++)if(k=this.jsonForComparison[f],l===JSON.stringify(k.ibs||[])&&h===JSON.stringify(k.dests||[])){e=!0;break}e?this.jsonDuplicates.push(a):c()}else c();else c();(this.receivedThirdPartyCookiesNotification||!m.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length&&
(l=this.jsonWaiting.shift(),!1===this.newIframeCreated&&delete l[0].ibs,this.process(l[0],l[1]),this.requestToProcess());this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){d.messageSendingInterval=m.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},checkIfRegionChanged:function(a){var b=p.getDilCookieField(m.REGION);null!==b&&"undefined"!==typeof a.dcs_region&&parseInt(b,
10)!==a.dcs_region&&(this.regionChanged=!0,this.timesRegionChanged++,p.setDilCookieField(m.FIRST_PARTY_SYNCS_ON_PAGE,""),p.setDilCookieField(m.FIRST_PARTY_SYNCS,""));"undefined"!==typeof a.dcs_region&&p.setDilCookieField(m.REGION,a.dcs_region)},processSyncOnPage:function(a){var b,c,d;if((b=a.ibs)&&b instanceof Array&&(c=b.length))for(a=0;a<c;a++)d=b[a],d.syncOnPage&&this.checkFirstPartyCookie(d,"","syncOnPage")},process:function(a,b){var c=encodeURIComponent,d,l,h,e,f,g;b===Object(b)&&(g=p.encodeAndBuildRequest(["",
b.dpid||"",b.dpuuid||""],","));if((d=a.dests)&&d instanceof Array&&(l=d.length))for(h=0;h<l;h++)e=d[h],f=[c("dests"),c(e.id||""),c(e.y||""),c(e.c||"")],this.addMessage(f.join("|"));if((d=a.ibs)&&d instanceof Array&&(l=d.length))for(h=0;h<l;h++)e=d[h],f=[c("ibs"),c(e.id||""),c(e.tag||""),p.encodeAndBuildRequest(e.url||[],","),c(e.ttl||""),"",g,e.fireURLSync?"true":"false"],e.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(f.join("|")):e.fireURLSync&&this.checkFirstPartyCookie(e,f.join("|")));
this.jsonProcessed.push(a)},checkFirstPartyCookie:function(a,b,c){var d=(c="syncOnPage"===c?!0:!1)?m.FIRST_PARTY_SYNCS_ON_PAGE:m.FIRST_PARTY_SYNCS,l=this.getOnPageSyncData(d),h=!1,e=!1,f=Math.ceil((new Date).getTime()/m.MILLIS_PER_DAY);l?(l=l.split("*"),e=this.pruneSyncData(l,a.id,f),h=e.dataPresent,e=e.dataValid,h&&e||this.fireSync(c,a,b,l,d,f)):(l=[],this.fireSync(c,a,b,l,d,f))},getOnPageSyncData:function(a){var b=n.adms.instance;return b&&"function"===typeof b.idSyncGetOnPageSyncInfo?b.idSyncGetOnPageSyncInfo():
p.getDilCookieField(a)},pruneSyncData:function(a,b,c){var d=!1,l=!1,e,f,g;if(a instanceof Array)for(f=0;f<a.length;f++)e=a[f],g=parseInt(e.split("-")[1],10),e.match("^"+b+"-")?(d=!0,c<g?l=!0:(a.splice(f,1),f--)):c>=g&&(a.splice(f,1),f--);return{dataPresent:d,dataValid:l}},manageSyncsSize:function(a){if(a.join("*").length>this.MAX_SYNCS_LENGTH)for(a.sort(function(a,c){return parseInt(a.split("-")[1],10)-parseInt(c.split("-")[1],10)});a.join("*").length>this.MAX_SYNCS_LENGTH;)a.shift()},fireSync:function(a,
b,c,d,e,h){function f(a,b,c,d){return function(){g.onPagePixels[a]=null;var e=g.getOnPageSyncData(c),l=[];if(e){var e=e.split("*"),h,f,k;h=0;for(f=e.length;h<f;h++)k=e[h],k.match("^"+b.id+"-")||l.push(k)}g.setSyncTrackingData(l,b,c,d)}}var g=this;if(a){if("img"===b.tag){a=b.url;c=m.IS_HTTPS?"https:":"http:";var k,n,w;d=0;for(k=a.length;d<k;d++){n=a[d];w=/^\/\//.test(n);var x=new Image;p.addListener(x,"load",f(this.onPagePixels.length,b,e,h));x.src=(w?c:"")+n;this.onPagePixels.push(x)}}}else this.addMessage(c),
this.setSyncTrackingData(d,b,e,h)},addMessage:function(a){var b=encodeURIComponent,b=L?b("---destpub-debug---"):b("---destpub---");this.messages.push((m.POST_MESSAGE_ENABLED?"":b)+a)},setSyncTrackingData:function(a,b,c,d){a.push(b.id+"-"+(d+Math.ceil(b.ttl/60/24)));this.manageSyncsSize(a);p.setDilCookieField(c,a.join("*"))},sendMessages:function(){var a=this,b="",c=encodeURIComponent;this.regionChanged&&(b=c("---destpub-clear-dextp---"),this.regionChanged=!1);this.messages.length?m.POST_MESSAGE_ENABLED?
(b=b+c("---destpub-combined---")+this.messages.join("%01"),this.postMessage(b),this.messages=[],this.sendingMessages=!1):(b+=this.messages.shift(),this.postMessage(b),setTimeout(function(){a.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(a){DIL.xd.postMessage(a,this.url,this.iframe.contentWindow);this.messagesPosted.push(a)},receiveMessage:function(a){var b=/^---destpub-to-parent---/;"string"===typeof a&&b.test(a)&&(b=a.replace(b,"").split("|"),"canSetThirdPartyCookies"===
b[0]&&(this.canSetThirdPartyCookies="true"===b[1]?!0:!1,this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(a))}},J={traits:function(a){t.isValidPdata(a)&&(r.sids instanceof Array||(r.sids=[]),p.extendArray(r.sids,a));return this},pixels:function(a){t.isValidPdata(a)&&(r.pdata instanceof Array||(r.pdata=[]),p.extendArray(r.pdata,a));return this},logs:function(a){t.isValidLogdata(a)&&(r.logdata!==Object(r.logdata)&&(r.logdata={}),p.extendObject(r.logdata,
a));return this},customQueryParams:function(a){t.isEmptyObject(a)||p.extendObject(r,a,n.reservedKeys);return this},signals:function(a,b){var c,d=a;if(!t.isEmptyObject(d)){if(b&&"string"===typeof b)for(c in d={},a)a.hasOwnProperty(c)&&(d[b+c]=a[c]);p.extendObject(r,d,n.reservedKeys)}return this},declaredId:function(a){n.declaredId.setDeclaredId(a,"request");return this},result:function(a){"function"===typeof a&&(r.callback=a);return this},afterResult:function(a){"function"===typeof a&&(r.postCallbackFn=
a);return this},useImageRequest:function(){r.useImageRequest=!0;return this},clearData:function(){r={};return this},submit:function(){D.submitRequest(r);r={};return this},getPartner:function(){return s},getContainerNSID:function(){return q},getEventLog:function(){return k},getState:function(){var a={},b={};p.extendObject(a,n,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});p.extendObject(b,v,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{initConfig:e,pendingRequest:r,
otherRequestInfo:a,destinationPublishingInfo:b}},idSync:function(a){if(B)return"Error: id syncs have been disabled";if(a!==Object(a)||"string"!==typeof a.dpid||!a.dpid.length)return"Error: config or config.dpid is empty";if("string"!==typeof a.url||!a.url.length)return"Error: config.url is empty";var b=a.url,c=a.minutesToLive,d=encodeURIComponent,e=v,h,b=b.replace(/^https:/,"").replace(/^http:/,"");if("undefined"===typeof c)c=20160;else if(c=parseInt(c,10),isNaN(c)||0>=c)return"Error: config.minutesToLive needs to be a positive number";
h=p.encodeAndBuildRequest(["",a.dpid,a.dpuuid||""],",");a=["ibs",d(a.dpid),"img",d(b),c,"",h];e.addMessage(a.join("|"));n.firstRequestHasFired&&e.requestToProcess();return"Successfully queued"},aamIdSync:function(a){if(B)return"Error: id syncs have been disabled";if(a!==Object(a)||"string"!==typeof a.dpuuid||!a.dpuuid.length)return"Error: config or config.dpuuid is empty";a.url="//dpm.demdex.net/ibs:dpid="+a.dpid+"&dpuuid="+a.dpuuid;return this.idSync(a)},passData:function(a){if(t.isEmptyObject(a))return"Error: json is empty or not an object";
v.ibsDeleted.push(a.ibs);delete a.ibs;D.defaultCallback(a);return a},getPlatformParams:function(){return n.platformParams},getEventCallConfigParams:function(){var a=n,b=a.modStatsParams,c=a.platformParams,d;if(!b){b={};for(d in c)c.hasOwnProperty(d)&&!a.nonModStatsParams[d]&&(b[d.replace(/^d_/,"")]=c[d]);!0===z?b.coop_safe=1:!1===z&&(b.coop_unsafe=1);a.modStatsParams=b}return b},setAsCoopSafe:function(){z=!0;return this},setAsCoopUnsafe:function(){z=!1;return this}},D={corsMetadata:function(){var a=
"none",b=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?a="XMLHttpRequest":(new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))()?a="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(b=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(b=!1));return{corsType:a,corsCookiesEnabled:b}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?
null:new window[this.corsMetadata.corsType]},submitRequest:function(a){n.registerRequest(D.createQueuedRequest(a));return!0},createQueuedRequest:function(a){var b=n,c,d=a.callback,e="img",h;if(!t.isEmptyObject(A)){var f,g,k;for(f in A)A.hasOwnProperty(f)&&(g=A[f],null!=g&&""!==g&&f in a&&!(g in a||g in n.reservedKeys)&&(k=a[f],null!=k&&""!==k&&(a[g]=k)))}t.isValidPdata(a.sids)||(a.sids=[]);t.isValidPdata(a.pdata)||(a.pdata=[]);t.isValidLogdata(a.logdata)||(a.logdata={});a.logdataArray=p.convertObjectToKeyValuePairs(a.logdata,
"=",!0);a.logdataArray.push("_ts="+(new Date).getTime());"function"!==typeof d&&(d=this.defaultCallback);b.useJSONP=!0!==a.useImageRequest;b.useJSONP&&(e="script",c=b.callbackPrefix+"_"+q+"_"+(new Date).getTime());b=this.makeRequestSrcData(a,c);W&&!H||!(h=this.getCORSInstance())||(e="cors");return{tag:e,src:b.src,corsSrc:b.corsSrc,internalCallbackName:c,callbackFn:d,postCallbackFn:a.postCallbackFn,useImageRequest:!!a.useImageRequest,requestData:a,corsInstance:h,corsPostData:b.corsPostData}},defaultCallback:function(a,
b){v.checkIfRegionChanged(a);v.processSyncOnPage(a);var c,d,e,h,f,g,k,m,w;if((c=a.stuff)&&c instanceof Array&&(d=c.length))for(e=0;e<d;e++)if((h=c[e])&&h===Object(h)){f=h.cn;g=h.cv;k=h.ttl;if("undefined"===typeof k||""===k)k=Math.floor(p.getMaxCookieExpiresInMinutes()/60/24);m=h.dmn||"."+document.domain.replace(/^www\./,"");w=h.type;f&&(g||"number"===typeof g)&&("var"!==w&&(k=parseInt(k,10))&&!isNaN(k)&&p.setCookie(f,g,1440*k,"/",m,!1),O.stuffed[f]=g)}c=a.uuid;t.isPopulatedString(c)&&!t.isEmptyObject(y)&&
(d=y.path,"string"===typeof d&&d.length||(d="/"),e=parseInt(y.days,10),isNaN(e)&&(e=100),p.setCookie(y.name||"aam_did",c,1440*e,d,y.domain||"."+document.domain.replace(/^www\./,""),!0===y.secure));F||n.abortRequests||v.requestToProcess(a,b)},makeRequestSrcData:function(a,b){a.sids=t.removeEmptyArrayValues(a.sids||[]);a.pdata=t.removeEmptyArrayValues(a.pdata||[]);var c=n,d=c.platformParams,e=p.encodeAndBuildRequest(a.sids,","),h=p.encodeAndBuildRequest(a.pdata,","),f=(a.logdataArray||[]).join("&");
delete a.logdataArray;var g=m.IS_HTTPS?"https://":"http://",k=c.declaredId.getDeclaredIdQueryString(),r=c.adms.instance?c.adms.getCustomerIDsQueryString(c.adms.getCustomerIDs()):"",w;w=[];var x,E,u,v;for(x in a)if(!(x in c.reservedKeys)&&a.hasOwnProperty(x))if(E=a[x],x=encodeURIComponent(x),E instanceof Array)for(u=0,v=E.length;u<v;u++)w.push(x+"="+encodeURIComponent(E[u]));else w.push(x+"="+encodeURIComponent(E));w=w.length?"&"+w.join("&"):"";e="d_nsid="+d.d_nsid+c.getCoopQueryString()+k+r+(e.length?
"&d_sid="+e:"")+(h.length?"&d_px="+h:"")+(f.length?"&d_ld="+encodeURIComponent(f):"");d="&d_rtbd="+d.d_rtbd+"&d_jsonv="+d.d_jsonv+"&d_dst="+d.d_dst;g=g+s+".demdex.net/event";h=c=g+"?"+e+(c.useJSONP?d+"&d_cb="+(b||""):"")+w;2048<c.length&&(c=c.substring(0,2048).substring(0,c.lastIndexOf("&")));return{corsSrc:g+"?"+(V?"testcors=1&d_nsid="+q+"&":"")+"_ts="+(new Date).getTime(),src:c,originalSrc:h,corsPostData:e+d+w,isDeclaredIdCall:""!==k}},fireRequest:function(a){if("img"===a.tag)this.fireImage(a);
else{var b=n.declaredId,b=b.declaredId.request||b.declaredId.init||{},b={dpid:b.dpid||"",dpuuid:b.dpuuid||""};"script"===a.tag?this.fireScript(a,b):"cors"===a.tag&&this.fireCORS(a,b)}},fireImage:function(a){var b=n,c,d;b.abortRequests||(b.firing=!0,c=new Image(0,0),b.sent.push(a),c.onload=function(){b.firing=!1;b.fired.push(a);b.num_of_img_responses++;b.registerRequest()},d=function(c){g="imgAbortOrErrorHandler received the event of type "+c.type;k.push(g);b.abortRequests=!0;b.firing=!1;b.errored.push(a);
b.num_of_img_errors++;b.registerRequest()},c.addEventListener?(c.addEventListener("error",d,!1),c.addEventListener("abort",d,!1)):c.attachEvent&&(c.attachEvent("onerror",d),c.attachEvent("onabort",d)),c.src=a.src)},fireScript:function(a,b){var c=this,d=n,e,h,f=a.src,m=a.postCallbackFn,p="function"===typeof m,q=a.internalCallbackName;d.abortRequests||(d.firing=!0,window[q]=function(c){try{c!==Object(c)&&(c={});B&&(v.ibsDeleted.push(c.ibs),delete c.ibs);var e=a.callbackFn;d.firing=!1;d.fired.push(a);
d.num_of_jsonp_responses++;e(c,b);p&&m(c,b)}catch(f){f.message="DIL jsonp callback caught error with message "+f.message;g=f.message;k.push(g);f.filename=f.filename||"dil.js";f.partner=s;DIL.errorModule.handleError(f);try{e({error:f.name+"|"+f.message},b),p&&m({error:f.name+"|"+f.message},b)}catch(l){}}finally{d.requestRemoval({script:h,callbackName:q}),d.registerRequest()}},T||H?(d.firing=!1,d.requestRemoval({script:"no script created",callbackName:q})):(h=document.createElement("script"),h.addEventListener&&
h.addEventListener("error",function(b){d.requestRemoval({script:h,callbackName:q});g="jsonp script tag error listener received the event of type "+b.type+" with src "+f;c.handleScriptError(g,a)},!1),h.type="text/javascript",h.src=f,e=DIL.variables.scriptNodeList[0],e.parentNode.insertBefore(h,e)),d.sent.push(a),d.declaredId.declaredId.request=null)},fireCORS:function(a,b){var c=this,d=n,e=this.corsMetadata.corsType,f=a.corsSrc,m=a.corsInstance,p=a.corsPostData,q=a.postCallbackFn,r="function"===typeof q;
if(!d.abortRequests&&!Y){d.firing=!0;try{m.open("post",f,!0),"XMLHttpRequest"===e&&(m.withCredentials=!0,m.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),m.onreadystatechange=function(){if(4===this.readyState&&200===this.status)a:{var e;try{if(e=JSON.parse(this.responseText),e!==Object(e)){c.handleCORSError(a,b,"Response is not JSON");break a}}catch(f){c.handleCORSError(a,b,"Error parsing response as JSON");break a}B&&(v.ibsDeleted.push(e.ibs),delete e.ibs);try{var h=a.callbackFn;
d.firing=!1;d.fired.push(a);d.num_of_cors_responses++;h(e,b);r&&q(e,b)}catch(l){l.message="DIL handleCORSResponse caught error with message "+l.message;g=l.message;k.push(g);l.filename=l.filename||"dil.js";l.partner=s;DIL.errorModule.handleError(l);try{h({error:l.name+"|"+l.message},b),r&&q({error:l.name+"|"+l.message},b)}catch(m){}}finally{d.registerRequest()}}}),m.onerror=function(){c.handleCORSError(a,b,"onerror")},m.ontimeout=function(){c.handleCORSError(a,b,"ontimeout")},m.send(p)}catch(u){this.handleCORSError(a,
b,"try-catch")}d.sent.push(a);d.declaredId.declaredId.request=null}},handleCORSError:function(a,b,c){n.num_of_cors_errors++;n.corsErrorSources.push(c);"ontimeout"===c||H||(a.tag="script",this.fireScript(a,b))},handleScriptError:function(a,b){n.num_of_jsonp_errors++;this.handleRequestError(a,b)},handleRequestError:function(a,b){var c=n;k.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.registerRequest()}},t={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?
!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,e=[],b=0;b<c;b++)d=a[b],"undefined"!==typeof d&&null!==d&&""!==d&&e.push(d);return e},isPopulatedString:function(a){return"string"===typeof a&&a.length}},p={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"===
typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"===typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,b,c){var d=[],e,f;b||(b="=");for(e in a)a.hasOwnProperty(e)&&(f=a[e],"undefined"!==typeof f&&null!==f&&""!==f&&d.push(e+b+(c?encodeURIComponent(f):f)));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===
a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=Array(d),f=0;f<d;f++)f in c&&(e[f]=b.call(b,c[f],f,c));return e},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var e=[],f=0;f<d;f++)if(f in c){var g=c[f];b.call(b,g,f,c)&&e.push(g)}return e}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),
c,d,e;c=0;for(d=b.length;c<d;c++){for(e=b[c];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(a))return decodeURIComponent(e.substring(a.length,e.length))}return null},setCookie:function(a,b,c,d,e,f){var g=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(g.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,
b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)!b.hasOwnProperty(d)||!t.isEmptyObject(c)&&d in c||(a[d]=b[d]);return!0}return!1},getMaxCookieExpiresInMinutes:function(){return m.SIX_MONTHS_IN_MINUTES},getCookieField:function(a,b){var c=this.getCookie(a),d=decodeURIComponent;if("string"===typeof c){var c=c.split("|"),e,f;e=0;for(f=c.length-1;e<f;e++)if(d(c[e])===b)return d(c[e+1])}return null},getDilCookieField:function(a){return this.getCookieField(m.DIL_COOKIE_NAME,
a)},setCookieField:function(a,b,c){var d=this.getCookie(a),e=!1,f=encodeURIComponent;b=f(b);c=f(c);if("string"===typeof d){var d=d.split("|"),g,f=0;for(g=d.length-1;f<g;f++)if(d[f]===b){d[f+1]=c;e=!0;break}e||(f=d.length,d[f]=b,d[f+1]=c)}else d=[b,c];this.setCookie(a,d.join("|"),this.getMaxCookieExpiresInMinutes(),"/",this.getDomain(),!1)},setDilCookieField:function(a,b){return this.setCookieField(m.DIL_COOKIE_NAME,a,b)},getDomain:function(a){!a&&window.location&&(a=window.location.hostname);if(a)if(/^[0-9.]+$/.test(a))a=
"";else{var b=a.split("."),c=b.length-1,d=c-1;1<c&&2>=b[c].length&&(2===b[c-1].length||0>",DOMAIN_2_CHAR_EXCEPTIONS,".indexOf(","+b[c]+","))&&d--;if(0<d)for(a="";c>=d;)a=b[c]+(a?".":"")+a,c--}return a},replaceMethodsWithFunction:function(a,b){var c;if(a===Object(a)&&"function"===typeof b)for(c in a)a.hasOwnProperty(c)&&"function"===typeof a[c]&&(a[c]=b)}};"error"===s&&0===q&&p.addListener(window,"load",function(){DIL.windowLoaded=!0});var Z=!1,K=function(){Z||(Z=!0,n.registerRequest(),aa(),F||n.abortRequests||
v.attachIframe(),n.readyToRemove=!0,n.requestRemoval())},aa=function(){F||setTimeout(function(){U||n.firstRequestHasFired||("function"===typeof M?J.afterResult(M).submit():J.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)};C=document;"error"!==s&&(DIL.windowLoaded?K():"complete"!==C.readyState&&"loaded"!==C.readyState?p.addListener(window,"load",function(){DIL.windowLoaded=!0;K()}):(DIL.windowLoaded=!0,K()));if("error"!==s)try{DIL.xd.receiveMessage(function(a){v.receiveMessage(a.data)},v.getIframeHost(v.url))}catch(ba){}n.declaredId.setDeclaredId(Q,
"init");n.processVisitorAPI();m.BLACKLIST_IE_LESS_THAN_9&&p.replaceMethodsWithFunction(J,function(){return this});this.api=J;this.getStuffedVariable=function(a){var b=O.stuffed[a];b||"number"===typeof b||(b=p.getCookie(a))||"number"===typeof b||(b="");return b};this.validators=t;this.helpers=p;this.constants=m;this.log=k;$&&(this.pendingRequest=r,this.requestController=n,this.setDestinationPublishingUrl=u,this.destinationPublishing=v,this.requestProcs=D,this.variables=O,this.callWindowLoadFunctions=
K)},function(){var e=document,f;null==e.readyState&&e.addEventListener&&(e.readyState="loading",e.addEventListener("DOMContentLoaded",f=function(){e.removeEventListener("DOMContentLoaded",f,!1);e.readyState="complete"},!1))}(),DIL.extendStaticPropertiesAndMethods=function(e){var f;if(e===Object(e))for(f in e)e.hasOwnProperty(f)&&(this[f]=e[f])},DIL.extendStaticPropertiesAndMethods({version:"6.12",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50},variables:{scriptNodeList:document.getElementsByTagName("script"),
scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoad:function(e){this.windowLoaded="function"===typeof e?!!e():"boolean"===typeof e?e:!0},create:function(e){try{return new DIL(e)}catch(f){throw Error("Error in attempt to create DIL instance with DIL.create(): "+f.message);}},registerDil:function(e,f,k){f=f+"$"+k;f in this.dils||(this.dils[f]=e)},getDil:function(e,f){var k;"string"!==typeof e&&(e="");f||(f=0);k=e+"$"+f;return k in this.dils?this.dils[k]:Error("The DIL instance with partner = "+
e+" and containerNSID = "+f+" was not found")},dexGetQSVars:function(e,f,k){f=this.getDil(f,k);return f instanceof this?f.getStuffedVariable(e):""},xd:{postMessage:function(e,f,k){var g=1;f&&(window.postMessage?k.postMessage(e,f.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):f&&(k.location=f.replace(/#.*$/,"")+"#"+ +new Date+g++ +"&"+e))},receiveMessage:function(e,f){var k;try{if(window.postMessage)if(e&&(k=function(g){if("string"===typeof f&&g.origin!==f||"[object Function]"===Object.prototype.toString.call(f)&&
!1===f(g.origin))return!1;e(g)}),window.addEventListener)window[e?"addEventListener":"removeEventListener"]("message",k,!1);else window[e?"attachEvent":"detachEvent"]("onmessage",k)}catch(g){}}}}),DIL.errorModule=function(){var e=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),f={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},
k=!1;return{activate:function(){k=!0},handleError:function(g){if(!k)return"DIL error module has not been activated";g!==Object(g)&&(g={});var u=g.name?(g.name+"").toLowerCase():"",s=[];g={name:u,filename:g.filename?g.filename+"":"",partner:g.partner?g.partner+"":"no_partner",site:g.site?g.site+"":document.location.href,message:g.message?g.message+"":""};s.push(u in f?f[u]:f.noerrortypedefined);e.api.pixels(s).logs(g).useImageRequest().submit();return"DIL error report sent"},pixelMap:f}}(),DIL.tools=
{},DIL.modules={helpers:{handleModuleError:function(e,f,k){var g="";f=f||"Error caught in DIL module/submodule: ";e===Object(e)?g=f+(e.message||"err has no message"):(g=f+"err is not a valid object",e={});e.message=g;k instanceof DIL&&(e.partner=k.api.getPartner());DIL.errorModule.handleError(e);return this.errorMessage=g}}});

/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.3.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.3.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();
