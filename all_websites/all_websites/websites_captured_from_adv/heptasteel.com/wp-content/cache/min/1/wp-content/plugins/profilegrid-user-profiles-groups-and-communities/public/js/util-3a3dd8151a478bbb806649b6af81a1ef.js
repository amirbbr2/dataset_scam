'use strict';function cancelEvent(event){event=event||window.event;if(event){event=event.originalEvent||event;if(event.stopPropagation)event.stopPropagation();if(event.preventDefault)event.preventDefault()}
return!1}
function getGuid(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c=='x'?r:(r&0x3|0x8);return v.toString(16)})}(function(window){var keyPrefix='';var noPrefix=!1;var cache={};var useCs=!!(window.chrome&&chrome.storage&&chrome.storage.local);var useLs=!useCs&&!!window.localStorage;function storageSetPrefix(newPrefix){keyPrefix=newPrefix}
function storageSetNoPrefix(){noPrefix=!0}
function storageGetPrefix(){if(noPrefix){noPrefix=!1;return''}
return keyPrefix}
function storageGetValue(){var keys=Array.prototype.slice.call(arguments),callback=keys.pop(),result=[],single=keys.length==1,value,allFound=!0,prefix=storageGetPrefix(),i,key;for(i=0;i<keys.length;i++){key=keys[i]=prefix+keys[i];if(key.substr(0,3)!='xt_'&&cache[key]!==undefined){result.push(cache[key])}else if(useLs){try
{value=localStorage.getItem(key)}catch(e){useLs=!1}
try
{value=(value===undefined||value===null)?!1:JSON.parse(value)}catch(e){value=!1}
result.push(cache[key]=value)}else if(!useCs){result.push(cache[key]=!1)}else{allFound=!1}}
if(allFound){return callback(single?result[0]:result)}
chrome.storage.local.get(keys,function(resultObj){var value;result=[];for(i=0;i<keys.length;i++){key=keys[i];value=resultObj[key];value=value===undefined||value===null?!1:JSON.parse(value);result.push(cache[key]=value)}
callback(single?result[0]:result)})};function storageSetValue(obj,callback){var keyValues={},prefix=storageGetPrefix(),key,value;for(key in obj){if(obj.hasOwnProperty(key)){value=obj[key];key=prefix+key;cache[key]=value;value=JSON.stringify(value);if(useLs){try
{localStorage.setItem(key,value)}catch(e){useLs=!1}}else{keyValues[key]=value}}}
if(useLs||!useCs){if(callback){callback()}
return}
chrome.storage.local.set(keyValues,callback)};function storageRemoveValue(){var keys=Array.prototype.slice.call(arguments),prefix=storageGetPrefix(),i,key,callback;if(typeof keys[keys.length-1]==='function'){callback=keys.pop()}
for(i=0;i<keys.length;i++){key=keys[i]=prefix+keys[i];delete cache[key];if(useLs){try
{localStorage.removeItem(key)}catch(e){useLs=!1}}}
if(useCs){chrome.storage.local.remove(keys,callback)}else if(callback){callback()}};window.ConfigStorage={prefix:storageSetPrefix,noPrefix:storageSetNoPrefix,get:storageGetValue,set:storageSetValue,remove:storageRemoveValue}})(this)