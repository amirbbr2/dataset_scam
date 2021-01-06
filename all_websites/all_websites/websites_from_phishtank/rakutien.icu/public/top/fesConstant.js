var domain = "https://fes.rakuten-bank.co.jp";
var pathName = "/rb/fes/html/iframeControl.html";
var tLayerPathMainService = "/MS/main";
var retryMaxCount = 5;
var retryWaitTime = 100;

/**  accessing a cross-origin frame. Begin */
var accessTopURL_Now = "";
if (parent !== window) {
	try {accessTopURL_Now = parent.location.href;} catch (e) {accessTopURL_Now = document.referrer;}
}
var accessTopURL_Now_ArrUrl = accessTopURL_Now.split("//");
var accessTopURL_Now_HostName_Index = accessTopURL_Now_ArrUrl[1].indexOf("/");
var accessTopURL_Now_HostName = accessTopURL_Now_ArrUrl[1].substring(0, accessTopURL_Now_HostName_Index);
var accessTopURL_Now_HostName_Other = accessTopURL_Now_ArrUrl[1].substring(accessTopURL_Now_HostName_Index);
if (accessTopURL_Now_HostName_Other.length > 12 && accessTopURL_Now_HostName_Other.substring(0, 12) === "/FESCC/fescc") {// fescc
    domain = accessTopURL_Now_ArrUrl[0] + "//" + accessTopURL_Now_HostName;
}
/**  accessing a cross-origin frame. End */