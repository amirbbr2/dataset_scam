(function(){var elems=document.querySelectorAll('div.rotator-animate__item')
var settings={animationIn:'fadeIn',animationOut:'fadeOut',duration:1000,delay:1500,delayInit:100}
function staticLargeElem(elems){var temp=[]
for(var i=0;i<elems.length;i++){temp.push({t:elems[i].textContent,i:i})}
var large=temp.reduce(function(r,c){return r.t.length>=c.t.length?r:c})
elems[large.i].classList.add('static')}
function init(elem){var animationIn=elem.dataset.animationIn||settings.animationIn
var animationOut=elem.dataset.animationOut||settings.animationOut
var duration=parseInt(elem.dataset.animationDuration)||settings.duration
var delay=parseInt(elem.dataset.animationDelay)||settings.delay
var item=elem.querySelector('.title')
item.style.animationDuration=(duration/1000).toString()+'s'
item.classList.add('animated')
item.classList.add(animationIn)
var timeout=setTimeout(function(){item.classList.remove(animationIn)
attachOutListener(elem,animationOut)
item.classList.add(animationOut)},duration+delay)}
function attachOutListener(elem,animationOut){var item=elem.querySelector('.title')
var listener=function(e){item.classList.remove('animated')
item.classList.remove(animationOut)
if(elem.nextElementSibling){init(elem.nextElementSibling)
item.removeEventListener('animationend',listener)}else{var timeout=setTimeout(function(){init(elems[0])
item.removeEventListener('animationend',listener)},settings.delayInit)}}
item.addEventListener('animationend',listener)}
if(elems&&elems.length>0){staticLargeElem(elems)
init(elems[0])}})()