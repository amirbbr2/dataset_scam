jQuery(document).ready(function(){
jQuery("img").each(function(){
var img_src=jQuery(this).attr('src');
if(typeof img_src!==typeof undefined&&img_src!==false){
var img_alt=jQuery(this).attr('alt');
var str=img_src
var pieces=str.split('/');
var imgName=pieces[pieces.length-1];
var imgnameArray=imgName.split('.');
var alt=imgnameArray[0];
if(img_alt==''||typeof img_alt===typeof undefined||img_alt===false){
jQuery(this).attr('alt',alt);
}}
});
});
(function($){
$.fn.menumaker=function(options){
var cssmenu=$(this), settings=$.extend({
format: "dropdown",
sticky: false
}, options);
return this.each(function(){
$(this).find(".button-nav").on('click', function(){
$(this).toggleClass('menu-opened');
var mainmenu=$(this).next('ul');
if(mainmenu.hasClass('open')){
mainmenu.slideToggle().removeClass('open');
}else{
mainmenu.slideToggle().addClass('open');
if(settings.format==="dropdown"){
mainmenu.find('ul').show();
}}
});
cssmenu.find('li ul').parent().addClass('has-sub');
multiTg=function(){
cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
cssmenu.find('.submenu-button').on('click', function(){
$(this).toggleClass('submenu-opened');
if($(this).siblings('ul').hasClass('open')){
$(this).siblings('ul').removeClass('open').slideToggle();
}else{
$(this).siblings('ul').addClass('open').slideToggle();
}});
};
if(settings.format==='multitoggle') multiTg();
else cssmenu.addClass('dropdown');
if(settings.sticky===true) cssmenu.css('position', 'fixed');
resizeFix=function(){
var mediasize=1000;
if($(window).width() > mediasize){
cssmenu.find('ul').show();
}
if($(window).width() <=mediasize){
cssmenu.find('ul').hide().removeClass('open');
}};
resizeFix();
return $(window).on('resize', resizeFix);
});
};})(jQuery);
(function($){
$(document).ready(function(){
$("#site-navigation").menumaker({
format: "multitoggle"
});
});
})(jQuery);
/*(function(){
var container, button, menu, links, i, len;
container=document.getElementById('site-navigation');
if(! container){
return;
}
button=container.getElementsByTagName('button')[0];
if('undefined'===typeof button){
return;
}
menu=container.getElementsByTagName('ul')[0];
if('undefined'===typeof menu){
button.style.display='none';
return;
}
menu.setAttribute('aria-expanded', 'false');
if(-1===menu.className.indexOf('nav-menu')){
menu.className +=' nav-menu';
}
button.onclick=function(){
if(-1!==container.className.indexOf('toggled')){
container.className=container.className.replace(' toggled', '');
button.setAttribute('aria-expanded', 'false');
menu.setAttribute('aria-expanded', 'false');
}else{
container.className +=' toggled';
button.setAttribute('aria-expanded', 'true');
menu.setAttribute('aria-expanded', 'true');
}};
links=menu.getElementsByTagName('a');
for(i=0, len=links.length; i < len; i++){
links[i].addEventListener('focus', toggleFocus, true);
links[i].addEventListener('blur', toggleFocus, true);
}
function toggleFocus(){
var self=this;
while(-1===self.className.indexOf('nav-menu')){
if('li'===self.tagName.toLowerCase()){
if(-1!==self.className.indexOf('focus')){
self.className=self.className.replace(' focus', '');
}else{
self.className +=' focus';
}}
self=self.parentElement;
}}
(function(container){
var touchStartFn, i,
parentLink=container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');
if('ontouchstart' in window){
touchStartFn=function(e){
var menuItem=this.parentNode, i;
if(! menuItem.classList.contains('focus')){
e.preventDefault();
for(i=0; i < menuItem.parentNode.children.length; ++i){
if(menuItem===menuItem.parentNode.children[i]){
continue;
}
menuItem.parentNode.children[i].classList.remove('focus');
}
menuItem.classList.add('focus');
}else{
menuItem.classList.remove('focus');
}};
for(i=0; i < parentLink.length; ++i){
parentLink[i].addEventListener('touchstart', touchStartFn, false);
}}
}(container));
})(); */;
;(function($){
var defaults={
mode: 'horizontal',
slideSelector: '',
infiniteLoop: true,
hideControlOnEnd: false,
speed: 500,
easing: null,
slideMargin: 0,
startSlide: 0,
randomStart: false,
captions: false,
ticker: false,
tickerHover: false,
adaptiveHeight: false,
adaptiveHeightSpeed: 500,
video: false,
useCSS: true,
preloadImages: 'visible',
responsive: true,
slideZIndex: 50,
wrapperClass: 'bx-wrapper',
touchEnabled: true,
swipeThreshold: 50,
oneToOneTouch: true,
preventDefaultSwipeX: true,
preventDefaultSwipeY: false,
ariaLive: true,
ariaHidden: true,
keyboardEnabled: false,
pager: true,
pagerType: 'full',
pagerShortSeparator: ' / ',
pagerSelector: null,
buildPager: null,
pagerCustom: null,
controls: true,
nextText: 'Next',
prevText: 'Prev',
nextSelector: null,
prevSelector: null,
autoControls: false,
startText: 'Start',
stopText: 'Stop',
autoControlsCombine: false,
autoControlsSelector: null,
auto: false,
pause: 4000,
autoStart: true,
autoDirection: 'next',
stopAutoOnClick: false,
autoHover: false,
autoDelay: 0,
autoSlideForOnePage: false,
minSlides: 1,
maxSlides: 1,
moveSlides: 0,
slideWidth: 0,
shrinkItems: false,
onSliderLoad: function(){ return true; },
onSlideBefore: function(){ return true; },
onSlideAfter: function(){ return true; },
onSlideNext: function(){ return true; },
onSlidePrev: function(){ return true; },
onSliderResize: function(){ return true; }};
$.fn.bxSlider=function(options){
if(this.length===0){
return this;
}
if(this.length > 1){
this.each(function(){
$(this).bxSlider(options);
});
return this;
}
var slider={},
el=this,
windowWidth=$(window).width(),
windowHeight=$(window).height();
if($(el).data('bxSlider')){ return; }
var init=function(){
if($(el).data('bxSlider')){ return; }
slider.settings=$.extend({}, defaults, options);
slider.settings.slideWidth=parseInt(slider.settings.slideWidth);
slider.children=el.children(slider.settings.slideSelector);
if(slider.children.length < slider.settings.minSlides){ slider.settings.minSlides=slider.children.length; }
if(slider.children.length < slider.settings.maxSlides){ slider.settings.maxSlides=slider.children.length; }
if(slider.settings.randomStart){ slider.settings.startSlide=Math.floor(Math.random() * slider.children.length); }
slider.active={ index: slider.settings.startSlide };
slider.carousel=slider.settings.minSlides > 1||slider.settings.maxSlides > 1 ? true:false;
if(slider.carousel){ slider.settings.preloadImages='all'; }
slider.minThreshold=(slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
slider.maxThreshold=(slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
slider.working=false;
slider.controls={};
slider.interval=null;
slider.animProp=slider.settings.mode==='vertical' ? 'top':'left';
slider.usingCSS=slider.settings.useCSS&&slider.settings.mode!=='fade'&&(function(){
var div=document.createElement('div'),
props=['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
for (var i=0; i < props.length; i++){
if(div.style[props[i]]!==undefined){
slider.cssPrefix=props[i].replace('Perspective', '').toLowerCase();
slider.animProp='-' + slider.cssPrefix + '-transform';
return true;
}}
return false;
}());
if(slider.settings.mode==='vertical'){ slider.settings.maxSlides=slider.settings.minSlides; }
el.data('origStyle', el.attr('style'));
el.children(slider.settings.slideSelector).each(function(){
$(this).data('origStyle', $(this).attr('style'));
});
setup();
};
var setup=function(){
var preloadSelector=slider.children.eq(slider.settings.startSlide);
el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
slider.viewport=el.parent();
if(slider.settings.ariaLive&&!slider.settings.ticker){
slider.viewport.attr('aria-live', 'polite');
}
slider.loader=$('<div class="bx-loading" />');
slider.viewport.prepend(slider.loader);
el.css({
width: slider.settings.mode==='horizontal' ? (slider.children.length * 1000 + 215) + '%':'auto',
position: 'relative'
});
if(slider.usingCSS&&slider.settings.easing){
el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
}else if(!slider.settings.easing){
slider.settings.easing='swing';
}
slider.viewport.css({
width: '100%',
overflow: 'hidden',
position: 'relative'
});
slider.viewport.parent().css({
maxWidth: getViewportMaxWidth()
});
slider.children.css({
float: slider.settings.mode==='horizontal' ? 'left':'none',
listStyle: 'none',
position: 'relative'
});
slider.children.css('width', getSlideWidth());
if(slider.settings.mode==='horizontal'&&slider.settings.slideMargin > 0){ slider.children.css('marginRight', slider.settings.slideMargin); }
if(slider.settings.mode==='vertical'&&slider.settings.slideMargin > 0){ slider.children.css('marginBottom', slider.settings.slideMargin); }
if(slider.settings.mode==='fade'){
slider.children.css({
position: 'absolute',
zIndex: 0,
display: 'none'
});
slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
}
slider.controls.el=$('<div class="bx-controls" />');
if(slider.settings.captions){ appendCaptions(); }
slider.active.last=slider.settings.startSlide===getPagerQty() - 1;
if(slider.settings.video){ el.fitVids(); }
if(slider.settings.preloadImages==='all'||slider.settings.ticker){ preloadSelector=slider.children; }
if(!slider.settings.ticker){
if(slider.settings.controls){ appendControls(); }
if(slider.settings.auto&&slider.settings.autoControls){ appendControlsAuto(); }
if(slider.settings.pager){ appendPager(); }
if(slider.settings.controls||slider.settings.autoControls||slider.settings.pager){ slider.viewport.after(slider.controls.el); }}else{
slider.settings.pager=false;
}
loadElements(preloadSelector, start);
};
var loadElements=function(selector, callback){
var total=selector.find('img:not([src=""]), iframe').length,
count=0;
if(total===0){
callback();
return;
}
selector.find('img:not([src=""]), iframe').each(function(){
$(this).one('load error', function(){
if(++count===total){ callback(); }}).each(function(){
if(this.complete){ $(this).trigger('load'); }});
});
};
var start=function(){
if(slider.settings.infiniteLoop&&slider.settings.mode!=='fade'&&!slider.settings.ticker){
var slice=slider.settings.mode==='vertical' ? slider.settings.minSlides:slider.settings.maxSlides,
sliceAppend=slider.children.slice(0, slice).clone(true).addClass('bx-clone'),
slicePrepend=slider.children.slice(-slice).clone(true).addClass('bx-clone');
if(slider.settings.ariaHidden){
sliceAppend.attr('aria-hidden', true);
slicePrepend.attr('aria-hidden', true);
}
el.append(sliceAppend).prepend(slicePrepend);
}
slider.loader.remove();
setSlidePosition();
if(slider.settings.mode==='vertical'){ slider.settings.adaptiveHeight=true; }
slider.viewport.height(getViewportHeight());
el.redrawSlider();
slider.settings.onSliderLoad.call(el, slider.active.index);
slider.initialized=true;
if(slider.settings.responsive){ $(window).bind('resize', resizeWindow); }
if(slider.settings.auto&&slider.settings.autoStart&&(getPagerQty() > 1||slider.settings.autoSlideForOnePage)){ initAuto(); }
if(slider.settings.ticker){ initTicker(); }
if(slider.settings.pager){ updatePagerActive(slider.settings.startSlide); }
if(slider.settings.controls){ updateDirectionControls(); }
if(slider.settings.touchEnabled&&!slider.settings.ticker){ initTouch(); }
if(slider.settings.keyboardEnabled&&!slider.settings.ticker){
$(document).keydown(keyPress);
}};
var getViewportHeight=function(){
var height=0;
var children=$();
if(slider.settings.mode!=='vertical'&&!slider.settings.adaptiveHeight){
children=slider.children;
}else{
if(!slider.carousel){
children=slider.children.eq(slider.active.index);
}else{
var currentIndex=slider.settings.moveSlides===1 ? slider.active.index:slider.active.index * getMoveBy();
children=slider.children.eq(currentIndex);
for (i=1; i <=slider.settings.maxSlides - 1; i++){
if(currentIndex + i >=slider.children.length){
children=children.add(slider.children.eq(i - 1));
}else{
children=children.add(slider.children.eq(currentIndex + i));
}}
}}
if(slider.settings.mode==='vertical'){
children.each(function(index){
height +=$(this).outerHeight();
});
if(slider.settings.slideMargin > 0){
height +=slider.settings.slideMargin * (slider.settings.minSlides - 1);
}}else{
height=Math.max.apply(Math, children.map(function(){
return $(this).outerHeight(false);
}).get());
}
if(slider.viewport.css('box-sizing')==='border-box'){
height +=parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
}else if(slider.viewport.css('box-sizing')==='padding-box'){
height +=parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
}
return height;
};
var getViewportMaxWidth=function(){
var width='100%';
if(slider.settings.slideWidth > 0){
if(slider.settings.mode==='horizontal'){
width=(slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
}else{
width=slider.settings.slideWidth;
}}
return width;
};
var getSlideWidth=function(){
var newElWidth=slider.settings.slideWidth,
wrapWidth=slider.viewport.width();
if(slider.settings.slideWidth===0 ||
(slider.settings.slideWidth > wrapWidth&&!slider.carousel) ||
slider.settings.mode==='vertical'){
newElWidth=wrapWidth;
}else if(slider.settings.maxSlides > 1&&slider.settings.mode==='horizontal'){
if(wrapWidth > slider.maxThreshold){
return newElWidth;
}else if(wrapWidth < slider.minThreshold){
newElWidth=(wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
}else if(slider.settings.shrinkItems){
newElWidth=Math.floor((wrapWidth + slider.settings.slideMargin) / (Math.ceil((wrapWidth + slider.settings.slideMargin) / (newElWidth + slider.settings.slideMargin))) - slider.settings.slideMargin);
}}
return newElWidth;
};
var getNumberSlidesShowing=function(){
var slidesShowing=1,
childWidth=null;
if(slider.settings.mode==='horizontal'&&slider.settings.slideWidth > 0){
if(slider.viewport.width() < slider.minThreshold){
slidesShowing=slider.settings.minSlides;
}else if(slider.viewport.width() > slider.maxThreshold){
slidesShowing=slider.settings.maxSlides;
}else{
childWidth=slider.children.first().width() + slider.settings.slideMargin;
slidesShowing=Math.floor((slider.viewport.width() +
slider.settings.slideMargin) / childWidth);
}}else if(slider.settings.mode==='vertical'){
slidesShowing=slider.settings.minSlides;
}
return slidesShowing;
};
var getPagerQty=function(){
var pagerQty=0,
breakPoint=0,
counter=0;
if(slider.settings.moveSlides > 0){
if(slider.settings.infiniteLoop){
pagerQty=Math.ceil(slider.children.length / getMoveBy());
}else{
while (breakPoint < slider.children.length){
++pagerQty;
breakPoint=counter + getNumberSlidesShowing();
counter +=slider.settings.moveSlides <=getNumberSlidesShowing() ? slider.settings.moveSlides:getNumberSlidesShowing();
}}
}else{
pagerQty=Math.ceil(slider.children.length / getNumberSlidesShowing());
}
return pagerQty;
};
var getMoveBy=function(){
if(slider.settings.moveSlides > 0&&slider.settings.moveSlides <=getNumberSlidesShowing()){
return slider.settings.moveSlides;
}
return getNumberSlidesShowing();
};
var setSlidePosition=function(){
var position, lastChild, lastShowingIndex;
if(slider.children.length > slider.settings.maxSlides&&slider.active.last&&!slider.settings.infiniteLoop){
if(slider.settings.mode==='horizontal'){
lastChild=slider.children.last();
position=lastChild.position();
setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
}else if(slider.settings.mode==='vertical'){
lastShowingIndex=slider.children.length - slider.settings.minSlides;
position=slider.children.eq(lastShowingIndex).position();
setPositionProperty(-position.top, 'reset', 0);
}}else{
position=slider.children.eq(slider.active.index * getMoveBy()).position();
if(slider.active.index===getPagerQty() - 1){ slider.active.last=true; }
if(position!==undefined){
if(slider.settings.mode==='horizontal'){ setPositionProperty(-position.left, 'reset', 0); }
else if(slider.settings.mode==='vertical'){ setPositionProperty(-position.top, 'reset', 0); }}
}};
var setPositionProperty=function(value, type, duration, params){
var animateObj, propValue;
if(slider.usingCSS){
propValue=slider.settings.mode==='vertical' ? 'translate3d(0, ' + value + 'px, 0)':'translate3d(' + value + 'px, 0, 0)';
el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
if(type==='slide'){
el.css(slider.animProp, propValue);
if(duration!==0){
el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e){
if(!$(e.target).is(el)){ return; }
el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
updateAfterSlideTransition();
});
}else{
updateAfterSlideTransition();
}}else if(type==='reset'){
el.css(slider.animProp, propValue);
}else if(type==='ticker'){
el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
el.css(slider.animProp, propValue);
if(duration!==0){
el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e){
if(!$(e.target).is(el)){ return; }
el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
setPositionProperty(params.resetValue, 'reset', 0);
tickerLoop();
});
}else{
setPositionProperty(params.resetValue, 'reset', 0);
tickerLoop();
}}
}else{
animateObj={};
animateObj[slider.animProp]=value;
if(type==='slide'){
el.animate(animateObj, duration, slider.settings.easing, function(){
updateAfterSlideTransition();
});
}else if(type==='reset'){
el.css(slider.animProp, value);
}else if(type==='ticker'){
el.animate(animateObj, duration, 'linear', function(){
setPositionProperty(params.resetValue, 'reset', 0);
tickerLoop();
});
}}
};
var populatePager=function(){
var pagerHtml='',
linkContent='',
pagerQty=getPagerQty();
for (var i=0; i < pagerQty; i++){
linkContent='';
if(slider.settings.buildPager&&$.isFunction(slider.settings.buildPager)||slider.settings.pagerCustom){
linkContent=slider.settings.buildPager(i);
slider.pagerEl.addClass('bx-custom-pager');
}else{
linkContent=i + 1;
slider.pagerEl.addClass('bx-default-pager');
}
pagerHtml +='<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
}
slider.pagerEl.html(pagerHtml);
};
var appendPager=function(){
if(!slider.settings.pagerCustom){
slider.pagerEl=$('<div class="bx-pager" />');
if(slider.settings.pagerSelector){
$(slider.settings.pagerSelector).html(slider.pagerEl);
}else{
slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
}
populatePager();
}else{
slider.pagerEl=$(slider.settings.pagerCustom);
}
slider.pagerEl.on('click touchend', 'a', clickPagerBind);
};
var appendControls=function(){
slider.controls.next=$('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
slider.controls.prev=$('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
slider.controls.next.bind('click touchend', clickNextBind);
slider.controls.prev.bind('click touchend', clickPrevBind);
if(slider.settings.nextSelector){
$(slider.settings.nextSelector).append(slider.controls.next);
}
if(slider.settings.prevSelector){
$(slider.settings.prevSelector).append(slider.controls.prev);
}
if(!slider.settings.nextSelector&&!slider.settings.prevSelector){
slider.controls.directionEl=$('<div class="bx-controls-direction" />');
slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
}};
var appendControlsAuto=function(){
slider.controls.start=$('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
slider.controls.stop=$('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
slider.controls.autoEl=$('<div class="bx-controls-auto" />');
slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
if(slider.settings.autoControlsCombine){
slider.controls.autoEl.append(slider.controls.start);
}else{
slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
}
if(slider.settings.autoControlsSelector){
$(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
}else{
slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
}
updateAutoControls(slider.settings.autoStart ? 'stop':'start');
};
var appendCaptions=function(){
slider.children.each(function(index){
var title=$(this).find('img:first').attr('title');
if(title!==undefined&&('' + title).length){
$(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
}});
};
var clickNextBind=function(e){
e.preventDefault();
if(slider.controls.el.hasClass('disabled')){ return; }
if(slider.settings.auto&&slider.settings.stopAutoOnClick){ el.stopAuto(); }
el.goToNextSlide();
};
var clickPrevBind=function(e){
e.preventDefault();
if(slider.controls.el.hasClass('disabled')){ return; }
if(slider.settings.auto&&slider.settings.stopAutoOnClick){ el.stopAuto(); }
el.goToPrevSlide();
};
var clickStartBind=function(e){
el.startAuto();
e.preventDefault();
};
var clickStopBind=function(e){
el.stopAuto();
e.preventDefault();
};
var clickPagerBind=function(e){
var pagerLink, pagerIndex;
e.preventDefault();
if(slider.controls.el.hasClass('disabled')){
return;
}
if(slider.settings.auto&&slider.settings.stopAutoOnClick){ el.stopAuto(); }
pagerLink=$(e.currentTarget);
if(pagerLink.attr('data-slide-index')!==undefined){
pagerIndex=parseInt(pagerLink.attr('data-slide-index'));
if(pagerIndex!==slider.active.index){ el.goToSlide(pagerIndex); }}
};
var updatePagerActive=function(slideIndex){
var len=slider.children.length;
if(slider.settings.pagerType==='short'){
if(slider.settings.maxSlides > 1){
len=Math.ceil(slider.children.length / slider.settings.maxSlides);
}
slider.pagerEl.html((slideIndex + 1) + slider.settings.pagerShortSeparator + len);
return;
}
slider.pagerEl.find('a').removeClass('active');
slider.pagerEl.each(function(i, el){ $(el).find('a').eq(slideIndex).addClass('active'); });
};
var updateAfterSlideTransition=function(){
if(slider.settings.infiniteLoop){
var position='';
if(slider.active.index===0){
position=slider.children.eq(0).position();
}else if(slider.active.index===getPagerQty() - 1&&slider.carousel){
position=slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
}else if(slider.active.index===slider.children.length - 1){
position=slider.children.eq(slider.children.length - 1).position();
}
if(position){
if(slider.settings.mode==='horizontal'){ setPositionProperty(-position.left, 'reset', 0); }
else if(slider.settings.mode==='vertical'){ setPositionProperty(-position.top, 'reset', 0); }}
}
slider.working=false;
slider.settings.onSlideAfter.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
};
var updateAutoControls=function(state){
if(slider.settings.autoControlsCombine){
slider.controls.autoEl.html(slider.controls[state]);
}else{
slider.controls.autoEl.find('a').removeClass('active');
slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
}};
var updateDirectionControls=function(){
if(getPagerQty()===1){
slider.controls.prev.addClass('disabled');
slider.controls.next.addClass('disabled');
}else if(!slider.settings.infiniteLoop&&slider.settings.hideControlOnEnd){
if(slider.active.index===0){
slider.controls.prev.addClass('disabled');
slider.controls.next.removeClass('disabled');
}else if(slider.active.index===getPagerQty() - 1){
slider.controls.next.addClass('disabled');
slider.controls.prev.removeClass('disabled');
}else{
slider.controls.prev.removeClass('disabled');
slider.controls.next.removeClass('disabled');
}}
};
var initAuto=function(){
if(slider.settings.autoDelay > 0){
var timeout=setTimeout(el.startAuto, slider.settings.autoDelay);
}else{
el.startAuto();
$(window).focus(function(){
el.startAuto();
}).blur(function(){
el.stopAuto();
});
}
if(slider.settings.autoHover){
el.hover(function(){
if(slider.interval){
el.stopAuto(true);
slider.autoPaused=true;
}}, function(){
if(slider.autoPaused){
el.startAuto(true);
slider.autoPaused=null;
}});
}};
var initTicker=function(){
var startPosition=0,
position, transform, value, idx, ratio, property, newSpeed, totalDimens;
if(slider.settings.autoDirection==='next'){
el.append(slider.children.clone().addClass('bx-clone'));
}else{
el.prepend(slider.children.clone().addClass('bx-clone'));
position=slider.children.first().position();
startPosition=slider.settings.mode==='horizontal' ? -position.left:-position.top;
}
setPositionProperty(startPosition, 'reset', 0);
slider.settings.pager=false;
slider.settings.controls=false;
slider.settings.autoControls=false;
if(slider.settings.tickerHover){
if(slider.usingCSS){
idx=slider.settings.mode==='horizontal' ? 4:5;
slider.viewport.hover(function(){
transform=el.css('-' + slider.cssPrefix + '-transform');
value=parseFloat(transform.split(',')[idx]);
setPositionProperty(value, 'reset', 0);
}, function(){
totalDimens=0;
slider.children.each(function(index){
totalDimens +=slider.settings.mode==='horizontal' ? $(this).outerWidth(true):$(this).outerHeight(true);
});
ratio=slider.settings.speed / totalDimens;
property=slider.settings.mode==='horizontal' ? 'left':'top';
newSpeed=ratio * (totalDimens - (Math.abs(parseInt(value))));
tickerLoop(newSpeed);
});
}else{
slider.viewport.hover(function(){
el.stop();
}, function(){
totalDimens=0;
slider.children.each(function(index){
totalDimens +=slider.settings.mode==='horizontal' ? $(this).outerWidth(true):$(this).outerHeight(true);
});
ratio=slider.settings.speed / totalDimens;
property=slider.settings.mode==='horizontal' ? 'left':'top';
newSpeed=ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
tickerLoop(newSpeed);
});
}}
tickerLoop();
};
var tickerLoop=function(resumeSpeed){
var speed=resumeSpeed ? resumeSpeed:slider.settings.speed,
position={left: 0, top: 0},
reset={left: 0, top: 0},
animateProperty, resetValue, params;
if(slider.settings.autoDirection==='next'){
position=el.find('.bx-clone').first().position();
}else{
reset=slider.children.first().position();
}
animateProperty=slider.settings.mode==='horizontal' ? -position.left:-position.top;
resetValue=slider.settings.mode==='horizontal' ? -reset.left:-reset.top;
params={resetValue: resetValue};
setPositionProperty(animateProperty, 'ticker', speed, params);
};
var isOnScreen=function(el){
var win=$(window),
viewport={
top: win.scrollTop(),
left: win.scrollLeft()
},
bounds=el.offset();
viewport.right=viewport.left + win.width();
viewport.bottom=viewport.top + win.height();
bounds.right=bounds.left + el.outerWidth();
bounds.bottom=bounds.top + el.outerHeight();
return (!(viewport.right < bounds.left||viewport.left > bounds.right||viewport.bottom < bounds.top||viewport.top > bounds.bottom));
};
var keyPress=function(e){
var activeElementTag=document.activeElement.tagName.toLowerCase(),
tagFilters='input|textarea',
p=new RegExp(activeElementTag,['i']),
result=p.exec(tagFilters);
if(result==null&&isOnScreen(el)){
if(e.keyCode===39){
clickNextBind(e);
return false;
}else if(e.keyCode===37){
clickPrevBind(e);
return false;
}}
};
var initTouch=function(){
slider.touch={
start: {x: 0, y: 0},
end: {x: 0, y: 0}};
slider.viewport.bind('touchstart MSPointerDown pointerdown', onTouchStart);
slider.viewport.on('click', '.bxslider a', function(e){
if(slider.viewport.hasClass('click-disabled')){
e.preventDefault();
slider.viewport.removeClass('click-disabled');
}});
};
var onTouchStart=function(e){
slider.controls.el.addClass('disabled');
if(slider.working){
e.preventDefault();
slider.controls.el.removeClass('disabled');
}else{
slider.touch.originalPos=el.position();
var orig=e.originalEvent,
touchPoints=(typeof orig.changedTouches!=='undefined') ? orig.changedTouches:[orig];
slider.touch.start.x=touchPoints[0].pageX;
slider.touch.start.y=touchPoints[0].pageY;
if(slider.viewport.get(0).setPointerCapture){
slider.pointerId=orig.pointerId;
if(slider.pointerId===1){
slider.viewport.get(0).setPointerCapture(slider.pointerId);
}}
slider.viewport.bind('touchmove MSPointerMove pointermove', onTouchMove);
slider.viewport.bind('touchend MSPointerUp pointerup', onTouchEnd);
slider.viewport.bind('MSPointerCancel pointercancel', onPointerCancel);
}};
var onPointerCancel=function(e){
setPositionProperty(slider.touch.originalPos.left, 'reset', 0);
slider.controls.el.removeClass('disabled');
slider.viewport.unbind('MSPointerCancel pointercancel', onPointerCancel);
slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
if(slider.viewport.get(0).releasePointerCapture){
slider.viewport.get(0).releasePointerCapture(slider.pointerId);
}};
var onTouchMove=function(e){
var orig=e.originalEvent,
touchPoints=(typeof orig.changedTouches!=='undefined') ? orig.changedTouches:[orig],
xMovement=Math.abs(touchPoints[0].pageX - slider.touch.start.x),
yMovement=Math.abs(touchPoints[0].pageY - slider.touch.start.y),
value=0,
change=0;
if((xMovement * 3) > yMovement&&slider.settings.preventDefaultSwipeX){
e.preventDefault();
}else if((yMovement * 3) > xMovement&&slider.settings.preventDefaultSwipeY){
e.preventDefault();
}
if(slider.settings.mode!=='fade'&&slider.settings.oneToOneTouch){
if(slider.settings.mode==='horizontal'){
change=touchPoints[0].pageX - slider.touch.start.x;
value=slider.touch.originalPos.left + change;
}else{
change=touchPoints[0].pageY - slider.touch.start.y;
value=slider.touch.originalPos.top + change;
}
setPositionProperty(value, 'reset', 0);
}};
var onTouchEnd=function(e){
slider.viewport.unbind('touchmove MSPointerMove pointermove', onTouchMove);
slider.controls.el.removeClass('disabled');
var orig=e.originalEvent,
touchPoints=(typeof orig.changedTouches!=='undefined') ? orig.changedTouches:[orig],
value=0,
distance=0;
slider.touch.end.x=touchPoints[0].pageX;
slider.touch.end.y=touchPoints[0].pageY;
if(slider.settings.mode==='fade'){
distance=Math.abs(slider.touch.start.x - slider.touch.end.x);
if(distance >=slider.settings.swipeThreshold){
if(slider.touch.start.x > slider.touch.end.x){
el.goToNextSlide();
}else{
el.goToPrevSlide();
}
el.stopAuto();
}}else{
if(slider.settings.mode==='horizontal'){
distance=slider.touch.end.x - slider.touch.start.x;
value=slider.touch.originalPos.left;
}else{
distance=slider.touch.end.y - slider.touch.start.y;
value=slider.touch.originalPos.top;
}
if(!slider.settings.infiniteLoop&&((slider.active.index===0&&distance > 0)||(slider.active.last&&distance < 0))){
setPositionProperty(value, 'reset', 200);
}else{
if(Math.abs(distance) >=slider.settings.swipeThreshold){
if(distance < 0){
el.goToNextSlide();
}else{
el.goToPrevSlide();
}
el.stopAuto();
}else{
setPositionProperty(value, 'reset', 200);
}}
}
slider.viewport.unbind('touchend MSPointerUp pointerup', onTouchEnd);
if(slider.viewport.get(0).releasePointerCapture){
slider.viewport.get(0).releasePointerCapture(slider.pointerId);
}};
var resizeWindow=function(e){
if(!slider.initialized){ return; }
if(slider.working){
window.setTimeout(resizeWindow, 10);
}else{
var windowWidthNew=$(window).width(),
windowHeightNew=$(window).height();
if(windowWidth!==windowWidthNew||windowHeight!==windowHeightNew){
windowWidth=windowWidthNew;
windowHeight=windowHeightNew;
el.redrawSlider();
slider.settings.onSliderResize.call(el, slider.active.index);
}}
};
var applyAriaHiddenAttributes=function(startVisibleIndex){
var numberOfSlidesShowing=getNumberSlidesShowing();
if(slider.settings.ariaHidden&&!slider.settings.ticker){
slider.children.attr('aria-hidden', 'true');
slider.children.slice(startVisibleIndex, startVisibleIndex + numberOfSlidesShowing).attr('aria-hidden', 'false');
}};
var setSlideIndex=function(slideIndex){
if(slideIndex < 0){
if(slider.settings.infiniteLoop){
return getPagerQty() - 1;
}else{
return slider.active.index;
}}else if(slideIndex >=getPagerQty()){
if(slider.settings.infiniteLoop){
return 0;
}else{
return slider.active.index;
}}else{
return slideIndex;
}};
el.goToSlide=function(slideIndex, direction){
var performTransition=true,
moveBy=0,
position={left: 0, top: 0},
lastChild=null,
lastShowingIndex, eq, value, requestEl;
slider.oldIndex=slider.active.index;
slider.active.index=setSlideIndex(slideIndex);
if(slider.working||slider.active.index===slider.oldIndex){ return; }
slider.working=true;
performTransition=slider.settings.onSlideBefore.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
if(typeof (performTransition)!=='undefined'&&!performTransition){
slider.active.index=slider.oldIndex;
slider.working=false;
return;
}
if(direction==='next'){
if(!slider.settings.onSlideNext.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)){
performTransition=false;
}}else if(direction==='prev'){
if(!slider.settings.onSlidePrev.call(el, slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index)){
performTransition=false;
}}
slider.active.last=slider.active.index >=getPagerQty() - 1;
if(slider.settings.pager||slider.settings.pagerCustom){ updatePagerActive(slider.active.index); }
if(slider.settings.controls){ updateDirectionControls(); }
if(slider.settings.mode==='fade'){
if(slider.settings.adaptiveHeight&&slider.viewport.height()!==getViewportHeight()){
slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
}
slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex + 1).fadeIn(slider.settings.speed, function(){
$(this).css('zIndex', slider.settings.slideZIndex);
updateAfterSlideTransition();
});
}else{
if(slider.settings.adaptiveHeight&&slider.viewport.height()!==getViewportHeight()){
slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
}
if(!slider.settings.infiniteLoop&&slider.carousel&&slider.active.last){
if(slider.settings.mode==='horizontal'){
lastChild=slider.children.eq(slider.children.length - 1);
position=lastChild.position();
moveBy=slider.viewport.width() - lastChild.outerWidth();
}else{
lastShowingIndex=slider.children.length - slider.settings.minSlides;
position=slider.children.eq(lastShowingIndex).position();
}}else if(slider.carousel&&slider.active.last&&direction==='prev'){
eq=slider.settings.moveSlides===1 ? slider.settings.maxSlides - getMoveBy():((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
lastChild=el.children('.bx-clone').eq(eq);
position=lastChild.position();
}else if(direction==='next'&&slider.active.index===0){
position=el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
slider.active.last=false;
}else if(slideIndex >=0){
requestEl=slideIndex * parseInt(getMoveBy());
position=slider.children.eq(requestEl).position();
}
if(typeof (position)!=='undefined'){
value=slider.settings.mode==='horizontal' ? -(position.left - moveBy):-position.top;
setPositionProperty(value, 'slide', slider.settings.speed);
}else{
slider.working=false;
}}
if(slider.settings.ariaHidden){ applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }};
el.goToNextSlide=function(){
if(!slider.settings.infiniteLoop&&slider.active.last){ return; }
var pagerIndex=parseInt(slider.active.index) + 1;
el.goToSlide(pagerIndex, 'next');
};
el.goToPrevSlide=function(){
if(!slider.settings.infiniteLoop&&slider.active.index===0){ return; }
var pagerIndex=parseInt(slider.active.index) - 1;
el.goToSlide(pagerIndex, 'prev');
};
el.startAuto=function(preventControlUpdate){
if(slider.interval){ return; }
slider.interval=setInterval(function(){
if(slider.settings.autoDirection==='next'){
el.goToNextSlide();
}else{
el.goToPrevSlide();
}}, slider.settings.pause);
if(slider.settings.autoControls&&preventControlUpdate!==true){ updateAutoControls('stop'); }};
el.stopAuto=function(preventControlUpdate){
if(!slider.interval){ return; }
clearInterval(slider.interval);
slider.interval=null;
if(slider.settings.autoControls&&preventControlUpdate!==true){ updateAutoControls('start'); }};
el.getCurrentSlide=function(){
return slider.active.index;
};
el.getCurrentSlideElement=function(){
return slider.children.eq(slider.active.index);
};
el.getSlideElement=function(index){
return slider.children.eq(index);
};
el.getSlideCount=function(){
return slider.children.length;
};
el.isWorking=function(){
return slider.working;
};
el.redrawSlider=function(){
slider.children.add(el.find('.bx-clone')).outerWidth(getSlideWidth());
slider.viewport.css('height', getViewportHeight());
if(!slider.settings.ticker){ setSlidePosition(); }
if(slider.active.last){ slider.active.index=getPagerQty() - 1; }
if(slider.active.index >=getPagerQty()){ slider.active.last=true; }
if(slider.settings.pager&&!slider.settings.pagerCustom){
populatePager();
updatePagerActive(slider.active.index);
}
if(slider.settings.ariaHidden){ applyAriaHiddenAttributes(slider.active.index * getMoveBy()); }};
el.destroySlider=function(){
if(!slider.initialized){ return; }
slider.initialized=false;
$('.bx-clone', this).remove();
slider.children.each(function(){
if($(this).data('origStyle')!==undefined){
$(this).attr('style', $(this).data('origStyle'));
}else{
$(this).removeAttr('style');
}});
if($(this).data('origStyle')!==undefined){
this.attr('style', $(this).data('origStyle'));
}else{
$(this).removeAttr('style');
}
$(this).unwrap().unwrap();
if(slider.controls.el){ slider.controls.el.remove(); }
if(slider.controls.next){ slider.controls.next.remove(); }
if(slider.controls.prev){ slider.controls.prev.remove(); }
if(slider.pagerEl&&slider.settings.controls&&!slider.settings.pagerCustom){ slider.pagerEl.remove(); }
$('.bx-caption', this).remove();
if(slider.controls.autoEl){ slider.controls.autoEl.remove(); }
clearInterval(slider.interval);
if(slider.settings.responsive){ $(window).unbind('resize', resizeWindow); }
if(slider.settings.keyboardEnabled){ $(document).unbind('keydown', keyPress); }
$(this).removeData('bxSlider');
};
el.reloadSlider=function(settings){
if(settings!==undefined){ options=settings; }
el.destroySlider();
init();
$(el).data('bxSlider', this);
};
init();
$(el).data('bxSlider', this);
return this;
};})(jQuery);
!function(factory){"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],factory):factory("undefined"!=typeof module&&module.exports?require("jquery"):jQuery)}(function($){"use strict";function init(options){return!options||void 0!==options.allowPageScroll||void 0===options.swipe&&void 0===options.swipeStatus||(options.allowPageScroll=NONE),void 0!==options.click&&void 0===options.tap&&(options.tap=options.click),options||(options={}),options=$.extend({},$.fn.swipe.defaults,options),this.each(function(){var $this=$(this),plugin=$this.data(PLUGIN_NS);plugin||(plugin=new TouchSwipe(this,options),$this.data(PLUGIN_NS,plugin))})}function TouchSwipe(element,options){function touchStart(jqEvent){if(!(getTouchInProgress()||$(jqEvent.target).closest(options.excludedElements,$element).length>0)){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent;if(!event.pointerType||"mouse"!=event.pointerType||0!=options.fallbackToMouseEvents){var ret,touches=event.touches,evt=touches?touches[0]:event;return phase=PHASE_START,touches?fingerCount=touches.length:options.preventDefaultEvents!==!1&&jqEvent.preventDefault(),distance=0,direction=null,currentDirection=null,pinchDirection=null,duration=0,startTouchesDistance=0,endTouchesDistance=0,pinchZoom=1,pinchDistance=0,maximumsMap=createMaximumsData(),cancelMultiFingerRelease(),createFingerData(0,evt),!touches||fingerCount===options.fingers||options.fingers===ALL_FINGERS||hasPinches()?(startTime=getTimeStamp(),2==fingerCount&&(createFingerData(1,touches[1]),startTouchesDistance=endTouchesDistance=calculateTouchesDistance(fingerData[0].start,fingerData[1].start)),(options.swipeStatus||options.pinchStatus)&&(ret=triggerHandler(event,phase))):ret=!1,ret===!1?(phase=PHASE_CANCEL,triggerHandler(event,phase),ret):(options.hold&&(holdTimeout=setTimeout($.proxy(function(){$element.trigger("hold",[event.target]),options.hold&&(ret=options.hold.call($element,event,event.target))},this),options.longTapThreshold)),setTouchInProgress(!0),null)}}}function touchMove(jqEvent){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent;if(phase!==PHASE_END&&phase!==PHASE_CANCEL&&!inMultiFingerRelease()){var ret,touches=event.touches,evt=touches?touches[0]:event,currentFinger=updateFingerData(evt);if(endTime=getTimeStamp(),touches&&(fingerCount=touches.length),options.hold&&clearTimeout(holdTimeout),phase=PHASE_MOVE,2==fingerCount&&(0==startTouchesDistance?(createFingerData(1,touches[1]),startTouchesDistance=endTouchesDistance=calculateTouchesDistance(fingerData[0].start,fingerData[1].start)):(updateFingerData(touches[1]),endTouchesDistance=calculateTouchesDistance(fingerData[0].end,fingerData[1].end),pinchDirection=calculatePinchDirection(fingerData[0].end,fingerData[1].end)),pinchZoom=calculatePinchZoom(startTouchesDistance,endTouchesDistance),pinchDistance=Math.abs(startTouchesDistance-endTouchesDistance)),fingerCount===options.fingers||options.fingers===ALL_FINGERS||!touches||hasPinches()){if(direction=calculateDirection(currentFinger.start,currentFinger.end),currentDirection=calculateDirection(currentFinger.last,currentFinger.end),validateDefaultEvent(jqEvent,currentDirection),distance=calculateDistance(currentFinger.start,currentFinger.end),duration=calculateDuration(),setMaxDistance(direction,distance),ret=triggerHandler(event,phase),!options.triggerOnTouchEnd||options.triggerOnTouchLeave){var inBounds=!0;if(options.triggerOnTouchLeave){var bounds=getbounds(this);inBounds=isInBounds(currentFinger.end,bounds)}!options.triggerOnTouchEnd&&inBounds?phase=getNextPhase(PHASE_MOVE):options.triggerOnTouchLeave&&!inBounds&&(phase=getNextPhase(PHASE_END)),phase!=PHASE_CANCEL&&phase!=PHASE_END||triggerHandler(event,phase)}}else phase=PHASE_CANCEL,triggerHandler(event,phase);ret===!1&&(phase=PHASE_CANCEL,triggerHandler(event,phase))}}function touchEnd(jqEvent){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent,touches=event.touches;if(touches){if(touches.length&&!inMultiFingerRelease())return startMultiFingerRelease(event),!0;if(touches.length&&inMultiFingerRelease())return!0}return inMultiFingerRelease()&&(fingerCount=fingerCountAtRelease),endTime=getTimeStamp(),duration=calculateDuration(),didSwipeBackToCancel()||!validateSwipeDistance()?(phase=PHASE_CANCEL,triggerHandler(event,phase)):options.triggerOnTouchEnd||options.triggerOnTouchEnd===!1&&phase===PHASE_MOVE?(options.preventDefaultEvents!==!1&&jqEvent.cancelable!==!1&&jqEvent.preventDefault(),phase=PHASE_END,triggerHandler(event,phase)):!options.triggerOnTouchEnd&&hasTap()?(phase=PHASE_END,triggerHandlerForGesture(event,phase,TAP)):phase===PHASE_MOVE&&(phase=PHASE_CANCEL,triggerHandler(event,phase)),setTouchInProgress(!1),null}function touchCancel(){fingerCount=0,endTime=0,startTime=0,startTouchesDistance=0,endTouchesDistance=0,pinchZoom=1,cancelMultiFingerRelease(),setTouchInProgress(!1)}function touchLeave(jqEvent){var event=jqEvent.originalEvent?jqEvent.originalEvent:jqEvent;options.triggerOnTouchLeave&&(phase=getNextPhase(PHASE_END),triggerHandler(event,phase))}function removeListeners(){$element.unbind(START_EV,touchStart),$element.unbind(CANCEL_EV,touchCancel),$element.unbind(MOVE_EV,touchMove),$element.unbind(END_EV,touchEnd),LEAVE_EV&&$element.unbind(LEAVE_EV,touchLeave),setTouchInProgress(!1)}function getNextPhase(currentPhase){var nextPhase=currentPhase,validTime=validateSwipeTime(),validDistance=validateSwipeDistance(),didCancel=didSwipeBackToCancel();return!validTime||didCancel?nextPhase=PHASE_CANCEL:!validDistance||currentPhase!=PHASE_MOVE||options.triggerOnTouchEnd&&!options.triggerOnTouchLeave?!validDistance&&currentPhase==PHASE_END&&options.triggerOnTouchLeave&&(nextPhase=PHASE_CANCEL):nextPhase=PHASE_END,nextPhase}function triggerHandler(event,phase){var ret,touches=event.touches;return(didSwipe()||hasSwipes())&&(ret=triggerHandlerForGesture(event,phase,SWIPE)),(didPinch()||hasPinches())&&ret!==!1&&(ret=triggerHandlerForGesture(event,phase,PINCH)),didDoubleTap()&&ret!==!1?ret=triggerHandlerForGesture(event,phase,DOUBLE_TAP):didLongTap()&&ret!==!1?ret=triggerHandlerForGesture(event,phase,LONG_TAP):didTap()&&ret!==!1&&(ret=triggerHandlerForGesture(event,phase,TAP)),phase===PHASE_CANCEL&&touchCancel(event),phase===PHASE_END&&(touches?touches.length||touchCancel(event):touchCancel(event)),ret}function triggerHandlerForGesture(event,phase,gesture){var ret;if(gesture==SWIPE){if($element.trigger("swipeStatus",[phase,direction||null,distance||0,duration||0,fingerCount,fingerData,currentDirection]),options.swipeStatus&&(ret=options.swipeStatus.call($element,event,phase,direction||null,distance||0,duration||0,fingerCount,fingerData,currentDirection),ret===!1))return!1;if(phase==PHASE_END&&validateSwipe()){if(clearTimeout(singleTapTimeout),clearTimeout(holdTimeout),$element.trigger("swipe",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipe&&(ret=options.swipe.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection),ret===!1))return!1;switch(direction){case LEFT:$element.trigger("swipeLeft",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeLeft&&(ret=options.swipeLeft.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection));break;case RIGHT:$element.trigger("swipeRight",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeRight&&(ret=options.swipeRight.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection));break;case UP:$element.trigger("swipeUp",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeUp&&(ret=options.swipeUp.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection));break;case DOWN:$element.trigger("swipeDown",[direction,distance,duration,fingerCount,fingerData,currentDirection]),options.swipeDown&&(ret=options.swipeDown.call($element,event,direction,distance,duration,fingerCount,fingerData,currentDirection))}}}if(gesture==PINCH){if($element.trigger("pinchStatus",[phase,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData]),options.pinchStatus&&(ret=options.pinchStatus.call($element,event,phase,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData),ret===!1))return!1;if(phase==PHASE_END&&validatePinch())switch(pinchDirection){case IN:$element.trigger("pinchIn",[pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData]),options.pinchIn&&(ret=options.pinchIn.call($element,event,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData));break;case OUT:$element.trigger("pinchOut",[pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData]),options.pinchOut&&(ret=options.pinchOut.call($element,event,pinchDirection||null,pinchDistance||0,duration||0,fingerCount,pinchZoom,fingerData))}}return gesture==TAP?phase!==PHASE_CANCEL&&phase!==PHASE_END||(clearTimeout(singleTapTimeout),clearTimeout(holdTimeout),hasDoubleTap()&&!inDoubleTap()?(doubleTapStartTime=getTimeStamp(),singleTapTimeout=setTimeout($.proxy(function(){doubleTapStartTime=null,$element.trigger("tap",[event.target]),options.tap&&(ret=options.tap.call($element,event,event.target))},this),options.doubleTapThreshold)):(doubleTapStartTime=null,$element.trigger("tap",[event.target]),options.tap&&(ret=options.tap.call($element,event,event.target)))):gesture==DOUBLE_TAP?phase!==PHASE_CANCEL&&phase!==PHASE_END||(clearTimeout(singleTapTimeout),clearTimeout(holdTimeout),doubleTapStartTime=null,$element.trigger("doubletap",[event.target]),options.doubleTap&&(ret=options.doubleTap.call($element,event,event.target))):gesture==LONG_TAP&&(phase!==PHASE_CANCEL&&phase!==PHASE_END||(clearTimeout(singleTapTimeout),doubleTapStartTime=null,$element.trigger("longtap",[event.target]),options.longTap&&(ret=options.longTap.call($element,event,event.target)))),ret}function validateSwipeDistance(){var valid=!0;return null!==options.threshold&&(valid=distance>=options.threshold),valid}function didSwipeBackToCancel(){var cancelled=!1;return null!==options.cancelThreshold&&null!==direction&&(cancelled=getMaxDistance(direction)-distance>=options.cancelThreshold),cancelled}function validatePinchDistance(){return null===options.pinchThreshold||pinchDistance>=options.pinchThreshold}function validateSwipeTime(){var result;return result=!options.maxTimeThreshold||!(duration>=options.maxTimeThreshold)}function validateDefaultEvent(jqEvent,direction){if(options.preventDefaultEvents!==!1)if(options.allowPageScroll===NONE)jqEvent.preventDefault();else{var auto=options.allowPageScroll===AUTO;switch(direction){case LEFT:(options.swipeLeft&&auto||!auto&&options.allowPageScroll!=HORIZONTAL)&&jqEvent.preventDefault();break;case RIGHT:(options.swipeRight&&auto||!auto&&options.allowPageScroll!=HORIZONTAL)&&jqEvent.preventDefault();break;case UP:(options.swipeUp&&auto||!auto&&options.allowPageScroll!=VERTICAL)&&jqEvent.preventDefault();break;case DOWN:(options.swipeDown&&auto||!auto&&options.allowPageScroll!=VERTICAL)&&jqEvent.preventDefault();break;case NONE:}}}function validatePinch(){var hasCorrectFingerCount=validateFingers(),hasEndPoint=validateEndPoint(),hasCorrectDistance=validatePinchDistance();return hasCorrectFingerCount&&hasEndPoint&&hasCorrectDistance}function hasPinches(){return!!(options.pinchStatus||options.pinchIn||options.pinchOut)}function didPinch(){return!(!validatePinch()||!hasPinches())}function validateSwipe(){var hasValidTime=validateSwipeTime(),hasValidDistance=validateSwipeDistance(),hasCorrectFingerCount=validateFingers(),hasEndPoint=validateEndPoint(),didCancel=didSwipeBackToCancel(),valid=!didCancel&&hasEndPoint&&hasCorrectFingerCount&&hasValidDistance&&hasValidTime;return valid}function hasSwipes(){return!!(options.swipe||options.swipeStatus||options.swipeLeft||options.swipeRight||options.swipeUp||options.swipeDown)}function didSwipe(){return!(!validateSwipe()||!hasSwipes())}function validateFingers(){return fingerCount===options.fingers||options.fingers===ALL_FINGERS||!SUPPORTS_TOUCH}function validateEndPoint(){return 0!==fingerData[0].end.x}function hasTap(){return!!options.tap}function hasDoubleTap(){return!!options.doubleTap}function hasLongTap(){return!!options.longTap}function validateDoubleTap(){if(null==doubleTapStartTime)return!1;var now=getTimeStamp();return hasDoubleTap()&&now-doubleTapStartTime<=options.doubleTapThreshold}function inDoubleTap(){return validateDoubleTap()}function validateTap(){return(1===fingerCount||!SUPPORTS_TOUCH)&&(isNaN(distance)||distance<options.threshold)}function validateLongTap(){return duration>options.longTapThreshold&&distance<DOUBLE_TAP_THRESHOLD}function didTap(){return!(!validateTap()||!hasTap())}function didDoubleTap(){return!(!validateDoubleTap()||!hasDoubleTap())}function didLongTap(){return!(!validateLongTap()||!hasLongTap())}function startMultiFingerRelease(event){previousTouchEndTime=getTimeStamp(),fingerCountAtRelease=event.touches.length+1}function cancelMultiFingerRelease(){previousTouchEndTime=0,fingerCountAtRelease=0}function inMultiFingerRelease(){var withinThreshold=!1;if(previousTouchEndTime){var diff=getTimeStamp()-previousTouchEndTime;diff<=options.fingerReleaseThreshold&&(withinThreshold=!0)}return withinThreshold}function getTouchInProgress(){return!($element.data(PLUGIN_NS+"_intouch")!==!0)}function setTouchInProgress(val){$element&&(val===!0?($element.bind(MOVE_EV,touchMove),$element.bind(END_EV,touchEnd),LEAVE_EV&&$element.bind(LEAVE_EV,touchLeave)):($element.unbind(MOVE_EV,touchMove,!1),$element.unbind(END_EV,touchEnd,!1),LEAVE_EV&&$element.unbind(LEAVE_EV,touchLeave,!1)),$element.data(PLUGIN_NS+"_intouch",val===!0))}function createFingerData(id,evt){var f={start:{x:0,y:0},last:{x:0,y:0},end:{x:0,y:0}};return f.start.x=f.last.x=f.end.x=evt.pageX||evt.clientX,f.start.y=f.last.y=f.end.y=evt.pageY||evt.clientY,fingerData[id]=f,f}function updateFingerData(evt){var id=void 0!==evt.identifier?evt.identifier:0,f=getFingerData(id);return null===f&&(f=createFingerData(id,evt)),f.last.x=f.end.x,f.last.y=f.end.y,f.end.x=evt.pageX||evt.clientX,f.end.y=evt.pageY||evt.clientY,f}function getFingerData(id){return fingerData[id]||null}function setMaxDistance(direction,distance){direction!=NONE&&(distance=Math.max(distance,getMaxDistance(direction)),maximumsMap[direction].distance=distance)}function getMaxDistance(direction){if(maximumsMap[direction])return maximumsMap[direction].distance}function createMaximumsData(){var maxData={};return maxData[LEFT]=createMaximumVO(LEFT),maxData[RIGHT]=createMaximumVO(RIGHT),maxData[UP]=createMaximumVO(UP),maxData[DOWN]=createMaximumVO(DOWN),maxData}function createMaximumVO(dir){return{direction:dir,distance:0}}function calculateDuration(){return endTime-startTime}function calculateTouchesDistance(startPoint,endPoint){var diffX=Math.abs(startPoint.x-endPoint.x),diffY=Math.abs(startPoint.y-endPoint.y);return Math.round(Math.sqrt(diffX*diffX+diffY*diffY))}function calculatePinchZoom(startDistance,endDistance){var percent=endDistance/startDistance*1;return percent.toFixed(2)}function calculatePinchDirection(){return pinchZoom<1?OUT:IN}function calculateDistance(startPoint,endPoint){return Math.round(Math.sqrt(Math.pow(endPoint.x-startPoint.x,2)+Math.pow(endPoint.y-startPoint.y,2)))}function calculateAngle(startPoint,endPoint){var x=startPoint.x-endPoint.x,y=endPoint.y-startPoint.y,r=Math.atan2(y,x),angle=Math.round(180*r/Math.PI);return angle<0&&(angle=360-Math.abs(angle)),angle}function calculateDirection(startPoint,endPoint){if(comparePoints(startPoint,endPoint))return NONE;var angle=calculateAngle(startPoint,endPoint);return angle<=45&&angle>=0?LEFT:angle<=360&&angle>=315?LEFT:angle>=135&&angle<=225?RIGHT:angle>45&&angle<135?DOWN:UP}function getTimeStamp(){var now=new Date;return now.getTime()}function getbounds(el){el=$(el);var offset=el.offset(),bounds={left:offset.left,right:offset.left+el.outerWidth(),top:offset.top,bottom:offset.top+el.outerHeight()};return bounds}function isInBounds(point,bounds){return point.x>bounds.left&&point.x<bounds.right&&point.y>bounds.top&&point.y<bounds.bottom}function comparePoints(pointA,pointB){return pointA.x==pointB.x&&pointA.y==pointB.y}var options=$.extend({},options),useTouchEvents=SUPPORTS_TOUCH||SUPPORTS_POINTER||!options.fallbackToMouseEvents,START_EV=useTouchEvents?SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerDown":"pointerdown":"touchstart":"mousedown",MOVE_EV=useTouchEvents?SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerMove":"pointermove":"touchmove":"mousemove",END_EV=useTouchEvents?SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerUp":"pointerup":"touchend":"mouseup",LEAVE_EV=useTouchEvents?SUPPORTS_POINTER?"mouseleave":null:"mouseleave",CANCEL_EV=SUPPORTS_POINTER?SUPPORTS_POINTER_IE10?"MSPointerCancel":"pointercancel":"touchcancel",distance=0,direction=null,currentDirection=null,duration=0,startTouchesDistance=0,endTouchesDistance=0,pinchZoom=1,pinchDistance=0,pinchDirection=0,maximumsMap=null,$element=$(element),phase="start",fingerCount=0,fingerData={},startTime=0,endTime=0,previousTouchEndTime=0,fingerCountAtRelease=0,doubleTapStartTime=0,singleTapTimeout=null,holdTimeout=null;try{$element.bind(START_EV,touchStart),$element.bind(CANCEL_EV,touchCancel)}catch(e){$.error("events not supported "+START_EV+","+CANCEL_EV+" on jQuery.swipe")}this.enable=function(){return this.disable(),$element.bind(START_EV,touchStart),$element.bind(CANCEL_EV,touchCancel),$element},this.disable=function(){return removeListeners(),$element},this.destroy=function(){removeListeners(),$element.data(PLUGIN_NS,null),$element=null},this.option=function(property,value){if("object"==typeof property)options=$.extend(options,property);else if(void 0!==options[property]){if(void 0===value)return options[property];options[property]=value}else{if(!property)return options;$.error("Option "+property+" does not exist on jQuery.swipe.options")}return null}}var VERSION="1.6.18",LEFT="left",RIGHT="right",UP="up",DOWN="down",IN="in",OUT="out",NONE="none",AUTO="auto",SWIPE="swipe",PINCH="pinch",TAP="tap",DOUBLE_TAP="doubletap",LONG_TAP="longtap",HORIZONTAL="horizontal",VERTICAL="vertical",ALL_FINGERS="all",DOUBLE_TAP_THRESHOLD=10,PHASE_START="start",PHASE_MOVE="move",PHASE_END="end",PHASE_CANCEL="cancel",SUPPORTS_TOUCH="ontouchstart"in window,SUPPORTS_POINTER_IE10=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled&&!SUPPORTS_TOUCH,SUPPORTS_POINTER=(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&!SUPPORTS_TOUCH,PLUGIN_NS="TouchSwipe",defaults={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:".noSwipe",preventDefaultEvents:!0};$.fn.swipe=function(method){var $this=$(this),plugin=$this.data(PLUGIN_NS);if(plugin&&"string"==typeof method){if(plugin[method])return plugin[method].apply(plugin,Array.prototype.slice.call(arguments,1));$.error("Method "+method+" does not exist on jQuery.swipe")}else if(plugin&&"object"==typeof method)plugin.option.apply(plugin,arguments);else if(!(plugin||"object"!=typeof method&&method))return init.apply(this,arguments);return $this},$.fn.swipe.version=VERSION,$.fn.swipe.defaults=defaults,$.fn.swipe.phases={PHASE_START:PHASE_START,PHASE_MOVE:PHASE_MOVE,PHASE_END:PHASE_END,PHASE_CANCEL:PHASE_CANCEL},$.fn.swipe.directions={LEFT:LEFT,RIGHT:RIGHT,UP:UP,DOWN:DOWN,IN:IN,OUT:OUT},$.fn.swipe.pageScroll={NONE:NONE,HORIZONTAL:HORIZONTAL,VERTICAL:VERTICAL,AUTO:AUTO},$.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:ALL_FINGERS}});
jQuery(window).on('load', function(){
jQuery('.prev-photo i').show();
jQuery('.next-photo i').show();
});
jQuery(document).ready(function(){
if(window.navigator.userAgent.toLowerCase().indexOf("chrome") > 0){
jQuery("body").on("mousedown", ".bx-viewport a", function(){
if(jQuery(this).attr("href")&&jQuery(this).attr("href")!="#"){
window.location=jQuery(this).attr("href");
}});
}
jQuery(".wp-block-gallery a").attr('data-fancybox', 'gallery');
if(jQuery('.wp-block-gallery').length > 0){
var imgs=jQuery('.wp-block-gallery img'),
len=imgs.length,
counter=0;
[].forEach.call(imgs, function(img){
if(img.complete){
incrementCounter();
}else{
img.addEventListener('load', incrementCounter, false);
}});
function incrementCounter(){
counter++;
jQuery('.loading-photos span').text(counter + '/' + len);
if(counter===len){
waterfall('.wp-block-gallery');
setTimeout(function(){
jQuery('.wp-block-gallery').css('opacity', 1);
jQuery('.loading-photos').hide();
}, 1000);
}}
jQuery(window).resize(function(){
waterfall('.wp-block-gallery');
});
jQuery(window).load(function(){
waterfall('.wp-block-gallery');
});
}
jQuery(".gallery a").attr('data-fancybox', 'gallery');
if(jQuery('.gallery').length > 0){
var imgs=jQuery('.gallery img'),
len=imgs.length,
counter=0;
[].forEach.call(imgs, function(img){
if(img.complete){
incrementCounter();
}else{
img.addEventListener('load', incrementCounter, false);
}});
function incrementCounter(){
counter++;
jQuery('.loading-photos span').text(counter + '/' + len);
if(counter===len){
waterfall('.gallery');
setTimeout(function(){
jQuery('.gallery').css('opacity', 1);
jQuery('.loading-photos').hide();
}, 1000);
}}
jQuery(window).resize(function(){
waterfall('.gallery');
});
}
if(jQuery('#wpst-video').length > 0&&!wpst_ajax_var.ctpl_installed){
var playerOptions={
controlBar: {
children: [
'playToggle',
'progressControl',
'durationDisplay',
'volumePanel',
'qualitySelector',
'fullscreenToggle',
],
},
};
videojs('wpst-video', playerOptions);
}
var imgDefer=document.getElementsByTagName('img');
for (var i=0; i<imgDefer.length; i++){
var dataSrc=imgDefer[i].getAttribute('data-src');
if(dataSrc){
imgDefer[i].setAttribute('src', dataSrc);
imgDefer[i].classList.add('display-img');
}}
jQuery('.tab-link').on('click', function(e){
var tabId=jQuery(this).data('tab-id');
jQuery('#' + tabId).show().siblings().hide();
jQuery(this).addClass('active').siblings().removeClass('active');
e.preventDefault();
});
jQuery('body').on('click', '.happy-inside-player .close', function(e){
jQuery(this).parent('.happy-inside-player').hide();
});
(function(){
var is_post=jQuery('body.single-post').length > 0;
if(!is_post) return;
var post_id=jQuery('article.post').attr('id').replace('post-', '');
jQuery.ajax({
type: 'post',
url: wpst_ajax_var.url,
dataType: 'json',
data: {
action: 'post-views',
nonce: wpst_ajax_var.nonce,
post_id: post_id
}})
.done(function(doneData){
})
.fail(function(errorData){
console.error(errorData);
})
.always(function(alwaysData){
jQuery.ajax({
type: 'post',
url: wpst_ajax_var.url,
dataType: 'json',
data: {
action: 'get-post-data',
nonce: wpst_ajax_var.nonce,
post_id: post_id
}})
.done(function(doneData){
if(doneData.views){
jQuery("#video-views span").text(doneData.views);
}
if(doneData.likes){
jQuery(".likes_count").text(doneData.likes);
}
if(doneData.dislikes){
jQuery(".dislikes_count").text(doneData.dislikes);
}
if(doneData.rating){
jQuery(".percentage").text(doneData.rating);
jQuery(".rating-bar-meter").css('width', doneData.rating);
}})
.fail(function(errorData){
console.error(errorData);
})
.always(function(){
})
});
})();
jQuery(".post-like a").on('click', function(e){
e.preventDefault();
var heart=jQuery(this);
var post_id=heart.data("post_id");
var post_like=heart.data("post_like");
jQuery.ajax({
type: "post",
url: wpst_ajax_var.url,
dataType:"json",
data: "action=post-like&nonce=" + wpst_ajax_var.nonce + "&post_like=" + post_like + "&post_id=" + post_id,
success:function(data, textStatus, jqXHR){
if(data.alreadyrate!==true){
jQuery(".rating-bar-meter").removeClass("not-rated-yet");
jQuery(".rating-result .percentage").text(Math.floor(data.percentage) + "%");
jQuery(".rating-result .percentage").show();
jQuery(".likes .likes_count").text(data.likes);
jQuery(".likes .dislikes_count").text(data.dislikes);
jQuery(".post-like").text(data.button);
if(data.nbrates > 0){
jQuery(".rating-bar-meter").animate({
width: data.progressbar + "%",
}, "fast", function(){
});
}}
}});
return false;
});
main_setThumbsHeight();
function ratio_format(){
var width=options.thumbnails_ratio.split('/')[0];
var height=options.thumbnails_ratio.split('/')[1];
return height / width;
}
jQuery(window).resize(function(){
main_setThumbsHeight();
});
function main_setThumbsHeight(){
var eltWidthMain=jQuery(jQuery('.post-thumbnail')[0]).width();
jQuery('.post-thumbnail img').height(eltWidthMain * ratio_format());
jQuery('.post-thumbnail .wpst-trailer').height(eltWidthMain * ratio_format());
jQuery('.photos .post-thumbnail .photo-bg').height(eltWidthMain);
jQuery('.post-thumbnail .no-thumb').height(eltWidthMain * ratio_format());
}
sidebar_setThumbsHeight();
jQuery(window).resize(function(){
sidebar_setThumbsHeight();
});
function sidebar_setThumbsHeight(){
var eltWidthSidebar=jQuery(jQuery('#sidebar .post-thumbnail')[0]).width();
jQuery('#sidebar .post-thumbnail img').height(eltWidthSidebar * ratio_format());
jQuery('#sidebar .post-thumbnail .wpst-trailer').height(eltWidthSidebar * ratio_format());
jQuery('#sidebar .no-thumb').height(eltWidthSidebar * ratio_format());
}
footer_setThumbsHeight();
jQuery(window).resize(function(){
footer_setThumbsHeight();
});
function footer_setThumbsHeight(){
var eltWidthFooter=jQuery(jQuery('.site-footer .post-thumbnail')[0]).width();
jQuery('.site-footer .post-thumbnail img').height(eltWidthFooter * ratio_format());
jQuery('.site-footer .post-thumbnail .wpst-trailer').height(eltWidthFooter * ratio_format());
jQuery('.site-footer .no-thumb').height(eltWidthFooter * ratio_format());
}
jQuery('.thumb-block a').hover(function(e){
jQuery(this).attr('data-title', jQuery(this).attr('title'));
jQuery(this).removeAttr('title');
},
function(e){
jQuery(this).attr('title', jQuery(this).attr('data-title'));
});
jQuery('.video-with-trailer').each(function(i, obj){
jQuery(this).on("mouseover", function(){ hoverVideo(i); });
jQuery(this).on("mouseout", function(){ hideVideo(i); });
});
var changeThumb=null;
var stopped=false;
jQuery('body').on('mouseenter', '.thumbs-rotation', function(e){
var $this=jQuery(this);
stopped=false;
if($this.data('thumbs')!=undefined){
var dataThumbs=$this.data('thumbs');
var thumbs=dataThumbs.split(',');
var nbThumbs=thumbs.length;
var i=1;
changeThumb=null;
clearTimeout(changeThumb);
changeThumb=function(){
if(stopped==false){
$this.find('img').attr('srcset', thumbs[i - 1]);
if(i <=nbThumbs){
setTimeout(changeThumb, 700);
if(i==nbThumbs){
i=1;
}else{
i++;
}}
}};
changeThumb();
}}).on('mouseleave', '.thumbs-rotation', function(e){
stopped=true;
changeThumb=null;
var highestTimeoutId=setTimeout(";");
for (var i=0 ; i < highestTimeoutId ; i++){
clearTimeout(i);
}
var $blockImg=jQuery(this).find('img');
var defaultThumb=$blockImg.attr('src');
$blockImg.attr('srcset', defaultThumb);
});
jQuery('.video-description .more').readmore({
speed: 75,
collapsedHeight: 50,
moreLink: '<a class="morelink" href="#">' + objectL10nMain.readmore + ' <i class="fa fa-chevron-down"></i></a>',
lessLink: '<a class="morelink" href="#">' + objectL10nMain.close + ' <i class="fa fa-chevron-up"></i></a>'
});
if(jQuery('#back-to-top').length){
var scrollTrigger=100,
backToTop=function (){
var scrollTop=jQuery(window).scrollTop();
if(scrollTop > scrollTrigger){
jQuery('#back-to-top').addClass('show');
}else{
jQuery('#back-to-top').removeClass('show');
}};
backToTop();
jQuery(window).on('scroll', function (){
backToTop();
});
jQuery('#back-to-top').on('click', function (e){
e.preventDefault();
jQuery('html,body').animate({
scrollTop: 0
}, 300);
});
}});
function hoverVideo(i){
var playPromise=jQuery('.wpst-trailer')[i].play();
if(playPromise!==undefined){
playPromise.then(_=> {
})
.catch(error=> {
});
}}
function hideVideo(i){
jQuery('.wpst-trailer')[i].load();
}
function wpst_open_login_dialog(href){
jQuery('#wpst-user-modal .modal-dialog').removeClass('registration-complete');
var modal_dialog=jQuery('#wpst-user-modal .modal-dialog');
modal_dialog.attr('data-active-tab', '');
switch(href){
case '#wpst-register':
modal_dialog.attr('data-active-tab', '#wpst-register');
break;
case '#wpst-login':
default:
modal_dialog.attr('data-active-tab', '#wpst-login');
break;
}
jQuery('#wpst-user-modal').modal('show');
}
function wpst_close_login_dialog(){
jQuery('#wpst-user-modal').modal('hide');
}
jQuery(function($){
"use strict";
$('[href="#wpst-login"], [href="#wpst-register"]').click(function(e){
e.preventDefault();
wpst_open_login_dialog($(this).attr('href'));
});
$('.modal-footer a, a[href="#wpst-reset-password"]').click(function(e){
e.preventDefault();
$('#wpst-user-modal .modal-dialog').attr('data-active-tab', $(this).attr('href'));
});
$('#wpst_login_form').on('submit', function(e){
e.preventDefault();
var button=$(this).find('button');
button.button('loading');
$.post(wpst_ajax_var.url, $('#wpst_login_form').serialize(), function(data){
var obj=$.parseJSON(data);
$('.wpst-login .wpst-errors').html(obj.message);
if(obj.error==false){
$('#wpst-user-modal .modal-dialog').addClass('loading');
window.location.reload(true);
button.hide();
}
button.button('reset');
});
});
$('#wpst_registration_form').on('submit', function(e){
e.preventDefault();
var button=$(this).find('button');
button.button('loading');
$.post(wpst_ajax_var.url, $('#wpst_registration_form').serialize(), function(data){
var obj=$.parseJSON(data);
$('.wpst-register .wpst-errors').html(obj.message);
if(obj.error==false){
$('#wpst-user-modal .modal-dialog').addClass('registration-complete');
button.hide();
}
button.button('reset');
});
});
$('#wpst_reset_password_form').on('submit', function(e){
e.preventDefault();
var button=$(this).find('button');
button.button('loading');
$.post(wpst_ajax_var.url, $('#wpst_reset_password_form').serialize(), function(data){
var obj=$.parseJSON(data);
$('.wpst-reset-password .wpst-errors').html(obj.message);
button.button('reset');
});
});
if(window.location.hash=='#login'){
wpst_open_login_dialog('#wpst-login');
}});
(function(factory){
if(typeof define==='function'&&define.amd){
define(['jquery'], factory);
}else if(typeof exports==='object'){
module.exports=factory(require('jquery'));
}else{
factory(jQuery);
}}(function($){
'use strict';
var readmore='readmore',
defaults={
speed: 100,
collapsedHeight: 200,
heightMargin: 16,
moreLink: '<a href="#">Read More</a>',
lessLink: '<a href="#">Close</a>',
embedCSS: true,
blockCSS: 'display: block; width: 100%;',
startOpen: false,
blockProcessed: function(){},
beforeToggle: function(){},
afterToggle: function(){}},
cssEmbedded={},
uniqueIdCounter=0;
function debounce(func, wait, immediate){
var timeout;
return function(){
var context=this, args=arguments;
var later=function(){
timeout=null;
if(! immediate){
func.apply(context, args);
}};
var callNow=immediate&&!timeout;
clearTimeout(timeout);
timeout=setTimeout(later, wait);
if(callNow){
func.apply(context, args);
}};}
function uniqueId(prefix){
var id=++uniqueIdCounter;
return String(prefix==null ? 'rmjs-':prefix) + id;
}
function setBoxHeights(element){
var el=element.clone().css({
height: 'auto',
width: element.width(),
maxHeight: 'none',
overflow: 'hidden'
}).insertAfter(element),
expandedHeight=el.outerHeight(),
cssMaxHeight=parseInt(el.css({maxHeight: ''}).css('max-height').replace(/[^-\d\.]/g, ''), 10),
defaultHeight=element.data('defaultHeight');
el.remove();
var collapsedHeight=cssMaxHeight||element.data('collapsedHeight')||defaultHeight;
element.data({
expandedHeight: expandedHeight,
maxHeight: cssMaxHeight,
collapsedHeight: collapsedHeight
})
.css({
maxHeight: 'none'
});
}
var resizeBoxes=debounce(function(){
$('[data-readmore]').each(function(){
var current=$(this),
isExpanded=(current.attr('aria-expanded')==='true');
setBoxHeights(current);
current.css({
height: current.data((isExpanded ? 'expandedHeight':'collapsedHeight'))
});
});
}, 100);
function embedCSS(options){
if(! cssEmbedded[options.selector]){
var styles=' ';
if(options.embedCSS&&options.blockCSS!==''){
styles +=options.selector + ' + [data-readmore-toggle], ' +
options.selector + '[data-readmore]{' +
options.blockCSS +
'}';
}
styles +=options.selector + '[data-readmore]{' +
'transition: height ' + options.speed + 'ms;' +
'overflow: hidden;' +
'}';
(function(d, u){
var css=d.createElement('style');
css.type='text/css';
if(css.styleSheet){
css.styleSheet.cssText=u;
}else{
css.appendChild(d.createTextNode(u));
}
d.getElementsByTagName('head')[0].appendChild(css);
}(document, styles));
cssEmbedded[options.selector]=true;
}}
function Readmore(element, options){
this.element=element;
this.options=$.extend({}, defaults, options);
embedCSS(this.options);
this._defaults=defaults;
this._name=readmore;
this.init();
if(window.addEventListener){
window.addEventListener('load', resizeBoxes);
window.addEventListener('resize', resizeBoxes);
}else{
window.attachEvent('load', resizeBoxes);
window.attachEvent('resize', resizeBoxes);
}}
Readmore.prototype={
init: function(){
var current=$(this.element);
current.data({
defaultHeight: this.options.collapsedHeight,
heightMargin: this.options.heightMargin
});
setBoxHeights(current);
var collapsedHeight=current.data('collapsedHeight'),
heightMargin=current.data('heightMargin');
if(current.outerHeight(true) <=collapsedHeight + heightMargin){
if(this.options.blockProcessed&&typeof this.options.blockProcessed==='function'){
this.options.blockProcessed(current, false);
}
return true;
}else{
var id=current.attr('id')||uniqueId(),
useLink=this.options.startOpen ? this.options.lessLink:this.options.moreLink;
current.attr({
'data-readmore': '',
'aria-expanded': this.options.startOpen,
'id': id
});
current.after($(useLink)
.on('click', (function(_this){
return function(event){
_this.toggle(this, current[0], event);
};})(this))
.attr({
'data-readmore-toggle': id,
'aria-controls': id
}));
if(! this.options.startOpen){
current.css({
height: collapsedHeight
});
}
if(this.options.blockProcessed&&typeof this.options.blockProcessed==='function'){
this.options.blockProcessed(current, true);
}}
},
toggle: function(trigger, element, event){
if(event){
event.preventDefault();
}
if(! trigger){
trigger=$('[aria-controls="' + this.element.id + '"]')[0];
}
if(! element){
element=this.element;
}
var $element=$(element),
newHeight='',
newLink='',
expanded=false,
collapsedHeight=$element.data('collapsedHeight');
if($element.height() <=collapsedHeight){
newHeight=$element.data('expandedHeight') + 'px';
newLink='lessLink';
expanded=true;
}else{
newHeight=collapsedHeight;
newLink='moreLink';
}
if(this.options.beforeToggle&&typeof this.options.beforeToggle==='function'){
this.options.beforeToggle(trigger, $element, ! expanded);
}
$element.css({'height': newHeight});
$element.on('transitionend', (function(_this){
return function(){
if(_this.options.afterToggle&&typeof _this.options.afterToggle==='function'){
_this.options.afterToggle(trigger, $element, expanded);
}
$(this).attr({
'aria-expanded': expanded
}).off('transitionend');
}})(this));
$(trigger).replaceWith($(this.options[newLink])
.on('click', (function(_this){
return function(event){
_this.toggle(this, element, event);
};})(this))
.attr({
'data-readmore-toggle': $element.attr('id'),
'aria-controls': $element.attr('id')
}));
},
destroy: function(){
$(this.element).each(function(){
var current=$(this);
current.attr({
'data-readmore': null,
'aria-expanded': null
})
.css({
maxHeight: '',
height: ''
})
.next('[data-readmore-toggle]')
.remove();
current.removeData();
});
}};
$.fn.readmore=function(options){
var args=arguments,
selector=this.selector;
options=options||{};
if(typeof options==='object'){
return this.each(function(){
if($.data(this, 'plugin_' + readmore)){
var instance=$.data(this, 'plugin_' + readmore);
instance.destroy.apply(instance);
}
options.selector=selector;
$.data(this, 'plugin_' + readmore, new Readmore(this, options));
});
}
else if(typeof options==='string'&&options[0]!=='_'&&options!=='init'){
return this.each(function (){
var instance=$.data(this, 'plugin_' + readmore);
if(instance instanceof Readmore&&typeof instance[options]==='function'){
instance[options].apply(instance, Array.prototype.slice.call(args, 1));
}});
}};}));
if(typeof jQuery==='undefined'){
throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($){
'use strict';
var version=$.fn.jquery.split(' ')[0].split('.')
if((version[0] < 2&&version[1] < 9)||(version[0]==1&&version[1]==9&&version[2] < 1)||(version[0] > 3)){
throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
}}(jQuery);
+function ($){
'use strict';
var Button=function (element, options){
this.$element=$(element)
this.options=$.extend({}, Button.DEFAULTS, options)
this.isLoading=false
}
Button.VERSION='3.3.7'
Button.DEFAULTS={
loadingText: 'loading...'
}
Button.prototype.setState=function (state){
var d='disabled'
var $el=this.$element
var val=$el.is('input') ? 'val':'html'
var data=$el.data()
state +='Text'
if(data.resetText==null) $el.data('resetText', $el[val]())
setTimeout($.proxy(function (){
$el[val](data[state]==null ? this.options[state]:data[state])
if(state=='loadingText'){
this.isLoading=true
$el.addClass(d).attr(d, d).prop(d, true)
}else if(this.isLoading){
this.isLoading=false
$el.removeClass(d).removeAttr(d).prop(d, false)
}}, this), 0)
}
Button.prototype.toggle=function (){
var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){
var $input=this.$element.find('input')
if($input.prop('type')=='radio'){
if($input.prop('checked')) changed=false
$parent.find('.active').removeClass('active')
this.$element.addClass('active')
}else if($input.prop('type')=='checkbox'){
if(($input.prop('checked'))!==this.$element.hasClass('active')) changed=false
this.$element.toggleClass('active')
}
$input.prop('checked', this.$element.hasClass('active'))
if(changed) $input.trigger('change')
}else{
this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
this.$element.toggleClass('active')
}}
function Plugin(option){
return this.each(function (){
var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data) $this.data('bs.button', (data=new Button(this, options)))
if(option=='toggle') data.toggle()
else if(option) data.setState(option)
})
}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function (){
$.fn.button=old
return this
}
$(document)
.on('click.bs.button.data-api', '[data-toggle^="button"]', function (e){
var $btn=$(e.target).closest('.btn')
Plugin.call($btn, 'toggle')
if(!($(e.target).is('input[type="radio"], input[type="checkbox"]'))){
e.preventDefault()
if($btn.is('input,button')) $btn.trigger('focus')
else $btn.find('input:visible,button:visible').first().trigger('focus')
}})
.on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e){
$(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
})
}(jQuery);
+function ($){
'use strict';
var Modal=function (element, options){
this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=false
if(this.options.remote){
this.$element
.find('.modal-content')
.load(this.options.remote, $.proxy(function (){
this.$element.trigger('loaded.bs.modal')
}, this))
}}
Modal.VERSION='3.3.7'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={
backdrop: true,
keyboard: true,
show: true
}
Modal.prototype.toggle=function (_relatedTarget){
return this.isShown ? this.hide():this.show(_relatedTarget)
}
Modal.prototype.show=function (_relatedTarget){
var that=this
var e=$.Event('show.bs.modal', { relatedTarget: _relatedTarget })
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented()) return
this.isShown=true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
this.$dialog.on('mousedown.dismiss.bs.modal', function (){
that.$element.one('mouseup.dismiss.bs.modal', function (e){
if($(e.target).is(that.$element)) that.ignoreBackdropClick=true
})
})
this.backdrop(function (){
var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){
that.$element.appendTo(that.$body)
}
that.$element
.show()
.scrollTop(0)
that.adjustDialog()
if(transition){
that.$element[0].offsetWidth
}
that.$element.addClass('in')
that.enforceFocus()
var e=$.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
transition ?
that.$dialog
.one('bsTransitionEnd', function (){
that.$element.trigger('focus').trigger(e)
})
.emulateTransitionEnd(Modal.TRANSITION_DURATION) :
that.$element.trigger('focus').trigger(e)
})
}
Modal.prototype.hide=function (e){
if(e) e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented()) return
this.isShown=false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element
.removeClass('in')
.off('click.dismiss.bs.modal')
.off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade') ?
this.$element
.one('bsTransitionEnd', $.proxy(this.hideModal, this))
.emulateTransitionEnd(Modal.TRANSITION_DURATION) :
this.hideModal()
}
Modal.prototype.enforceFocus=function (){
$(document)
.off('focusin.bs.modal')
.on('focusin.bs.modal', $.proxy(function (e){
if(document!==e.target &&
this.$element[0]!==e.target &&
!this.$element.has(e.target).length){
this.$element.trigger('focus')
}}, this))
}
Modal.prototype.escape=function (){
if(this.isShown&&this.options.keyboard){
this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e){
e.which==27&&this.hide()
}, this))
}else if(!this.isShown){
this.$element.off('keydown.dismiss.bs.modal')
}}
Modal.prototype.resize=function (){
if(this.isShown){
$(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
}else{
$(window).off('resize.bs.modal')
}}
Modal.prototype.hideModal=function (){
var that=this
this.$element.hide()
this.backdrop(function (){
that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')
})
}
Modal.prototype.removeBackdrop=function (){
this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null
}
Modal.prototype.backdrop=function (callback){
var that=this
var animate=this.$element.hasClass('fade') ? 'fade':''
if(this.isShown&&this.options.backdrop){
var doAnimate=$.support.transition&&animate
this.$backdrop=$(document.createElement('div'))
.addClass('modal-backdrop ' + animate)
.appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal', $.proxy(function (e){
if(this.ignoreBackdropClick){
this.ignoreBackdropClick=false
return
}
if(e.target!==e.currentTarget) return
this.options.backdrop=='static'
? this.$element[0].focus()
: this.hide()
}, this))
if(doAnimate) this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback) return
doAnimate ?
this.$backdrop
.one('bsTransitionEnd', callback)
.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
callback()
}else if(!this.isShown&&this.$backdrop){
this.$backdrop.removeClass('in')
var callbackRemove=function (){
that.removeBackdrop()
callback&&callback()
}
$.support.transition&&this.$element.hasClass('fade') ?
this.$backdrop
.one('bsTransitionEnd', callbackRemove)
.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
callbackRemove()
}else if(callback){
callback()
}}
Modal.prototype.handleUpdate=function (){
this.adjustDialog()
}
Modal.prototype.adjustDialog=function (){
var modalIsOverflowing=this.$element[0].scrollHeight > document.documentElement.clientHeight
this.$element.css({
paddingLeft:  !this.bodyIsOverflowing&&modalIsOverflowing ? this.scrollbarWidth:'',
paddingRight: this.bodyIsOverflowing&&!modalIsOverflowing ? this.scrollbarWidth:''
})
}
Modal.prototype.resetAdjustments=function (){
this.$element.css({
paddingLeft: '',
paddingRight: ''
})
}
Modal.prototype.checkScrollbar=function (){
var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){
var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right - Math.abs(documentElementRect.left)
}
this.bodyIsOverflowing=document.body.clientWidth < fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()
}
Modal.prototype.setScrollbar=function (){
var bodyPad=parseInt((this.$body.css('padding-right')||0), 10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
}
Modal.prototype.resetScrollbar=function (){
this.$body.css('padding-right', this.originalBodyPad)
}
Modal.prototype.measureScrollbar=function (){
var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth - scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth
}
function Plugin(option, _relatedTarget){
return this.each(function (){
var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({}, Modal.DEFAULTS, $this.data(), typeof option=='object'&&option)
if(!data) $this.data('bs.modal', (data=new Modal(this, options)))
if(typeof option=='string') data[option](_relatedTarget)
else if(options.show) data.show(_relatedTarget)
})
}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function (){
$.fn.modal=old
return this
}
$(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e){
var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/, '')))
var option=$target.data('bs.modal') ? 'toggle':$.extend({ remote: !/#/.test(href)&&href }, $target.data(), $this.data())
if($this.is('a')) e.preventDefault()
$target.one('show.bs.modal', function (showEvent){
if(showEvent.isDefaultPrevented()) return
$target.one('hidden.bs.modal', function (){
$this.is(':visible')&&$this.trigger('focus')
})
})
Plugin.call($target, option, this)
})
}(jQuery);
(function(){
var isIe=/(trident|msie)/i.test(navigator.userAgent);
if(isIe&&document.getElementById&&window.addEventListener){
window.addEventListener('hashchange', function(){
var id=location.hash.substring(1),
element;
if(!(/^[A-z0-9_-]+$/.test(id))){
return;
}
element=document.getElementById(id);
if(element){
if(!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))){
element.tabIndex=-1;
}
element.focus();
}}, false);
}})();
!function(d,l){"use strict";var e=!1,o=!1;if(l.querySelector)if(d.addEventListener)e=!0;if(d.wp=d.wp||{},!d.wp.receiveEmbedMessage)if(d.wp.receiveEmbedMessage=function(e){var t=e.data;if(t)if(t.secret||t.message||t.value)if(!/[^a-zA-Z0-9]/.test(t.secret)){var r,a,i,s,n,o=l.querySelectorAll('iframe[data-secret="'+t.secret+'"]'),c=l.querySelectorAll('blockquote[data-secret="'+t.secret+'"]');for(r=0;r<c.length;r++)c[r].style.display="none";for(r=0;r<o.length;r++)if(a=o[r],e.source===a.contentWindow){if(a.removeAttribute("style"),"height"===t.message){if(1e3<(i=parseInt(t.value,10)))i=1e3;else if(~~i<200)i=200;a.height=i}if("link"===t.message)if(s=l.createElement("a"),n=l.createElement("a"),s.href=a.getAttribute("src"),n.href=t.value,n.host===s.host)if(l.activeElement===a)d.top.location.href=t.value}}},e)d.addEventListener("message",d.wp.receiveEmbedMessage,!1),l.addEventListener("DOMContentLoaded",t,!1),d.addEventListener("load",t,!1);function t(){if(!o){o=!0;var e,t,r,a,i=-1!==navigator.appVersion.indexOf("MSIE 10"),s=!!navigator.userAgent.match(/Trident.*rv:11\./),n=l.querySelectorAll("iframe.wp-embedded-content");for(t=0;t<n.length;t++){if(!(r=n[t]).getAttribute("data-secret"))a=Math.random().toString(36).substr(2,10),r.src+="#?secret="+a,r.setAttribute("data-secret",a);if(i||s)(e=r.cloneNode(!0)).removeAttribute("security"),r.parentNode.replaceChild(e,r)}}}}(window,document);