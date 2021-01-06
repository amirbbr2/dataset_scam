!function(t,s,n,a){t.fn.kkstarratings=function(s){t.fn.kkstarratings.options=t.extend({ajaxurl:null,nonce:null,func:null,grs:!1,msg:"امتیاز دهید",fuelspeed:400,thankyou:"متشکریم",error_msg:"خطا",tooltip:!0,tooltips:{0:{tip:"افتضاح",color:"red"},1:{tip:"بد",color:"brown"},2:{tip:"متوسط",color:"orange"},3:{tip:"خوب",color:"blue"},4:{tip:"عالي",color:"green"}}},t.fn.kkstarratings.options,s||{});var n=[];return this.each(function(){n.push(t(this))}),t.fn.kkstarratings.fetch(n,0,"0%",t.fn.kkstarratings.options.msg,!0),this.each(function(){})},t.fn.kkstarratings.animate=function(s){if(s.hasClass("disabled"))t(".kksr-stars a",s).unbind("click").click(function(){return!1});else{var n=t(".kksr-legend",s).html(),a=t(".kksr-fuel",s).css("width");t(".kksr-stars a",s).hover(function(){var a=t(this).attr("href").split("#")[1];0!=t.fn.kkstarratings.options.tooltip&&(null!=t.fn.kkstarratings.options.tooltips[a-1]?t(".kksr-legend",s).html('<span style="color:'+t.fn.kkstarratings.options.tooltips[a-1].color+'">'+t.fn.kkstarratings.options.tooltips[a-1].tip+"</span>"):t(".kksr-legend",s).html(n)),t(".kksr-fuel",s).stop(!0,!0).css("width","0%"),t(".kksr-stars a",s).each(function(n,i){var r=t(this),e=r.attr("href").split("#")[1];parseInt(e)<=parseInt(a)&&(t(".kksr-stars a",s).stop(!0,!0),r.hide().addClass("kksr-star").addClass("orange").fadeIn("fast"))})},function(){t(".kksr-stars a",s).removeClass("kksr-star").removeClass("orange"),0!=t.fn.kkstarratings.options.tooltip&&t(".kksr-legend",s).html(n),t(".kksr-fuel",s).stop(!0,!0).animate({width:a},t.fn.kkstarratings.options.fuelspeed)}).unbind("click").click(function(){return t.fn.kkstarratings.click(s,t(this).attr("href").split("#")[1])})}},t.fn.kkstarratings.update=function(s,n,a,i,r){"true"==i&&t(".kksr-fuel",s).removeClass("yellow").addClass("orange"),t(".kksr-fuel",s).stop(!0,!0).animate({width:n},t.fn.kkstarratings.options.fuelspeed,"linear",function(){"true"==i&&(s.addClass("disabled"),t(".kksr-stars a",s).unbind("hover")),t.fn.kkstarratings.options.grs&&r?t.fn.kkstarratings.animate(s):t(".kksr-legend",s).stop(!0,!0).hide().html(a||t.fn.kkstarratings.options.msg).fadeIn("slow",function(){t.fn.kkstarratings.animate(s)})})},t.fn.kkstarratings.click=function(s,n){t(".kksr-stars a",s).unbind("hover").unbind("click").removeClass("kksr-star").removeClass("orange").click(function(){return!1});var a=t(".kksr-legend",s).html(),i=t(".kksr-fuel",s).css("width");return t.fn.kkstarratings.fetch(s,n,i,a,!1),!1},t.fn.kkstarratings.fetch=function(s,n,a,i,r){var e=[];t.each(s,function(){e.push(t(this).attr("data-id"))}),t.ajax({url:t.fn.kkstarratings.options.ajaxurl,data:"action="+t.fn.kkstarratings.options.func+"&id="+e+"&stars="+n+"&_wpnonce="+t.fn.kkstarratings.options.nonce,type:"post",dataType:"json",beforeSend:function(){t(".kksr-fuel",s).animate({width:"0%"},t.fn.kkstarratings.options.fuelspeed),n&&t(".kksr-legend",s).fadeOut("fast",function(){t(".kksr-legend",s).html('<span style="color: green">'+t.fn.kkstarratings.options.thankyou+"</span>")}).fadeIn("slow")},success:function(n){t.each(s,function(){var s=t(this),e=s.attr("data-id");n[e].success?t.fn.kkstarratings.update(s,n[e].fuel+"%",n[e].legend,n[e].disable,r):t.fn.kkstarratings.update(s,a,i,!1,r)})},complete:function(){},error:function(n){t(".kksr-legend",s).fadeOut("fast",function(){t(".kksr-legend",s).html('<span style="color: red">'+t.fn.kkstarratings.options.error_msg+"</span>")}).fadeIn("slow",function(){t.fn.kkstarratings.update(s,a,i,!1,r)})}})},t.fn.kkstarratings.options={ajaxurl:bhittani_plugin_kksr_js.ajaxurl,func:bhittani_plugin_kksr_js.func,nonce:bhittani_plugin_kksr_js.nonce,grs:bhittani_plugin_kksr_js.grs,tooltip:bhittani_plugin_kksr_js.tooltip,tooltips:bhittani_plugin_kksr_js.tooltips,msg:bhittani_plugin_kksr_js.msg,fuelspeed:bhittani_plugin_kksr_js.fuelspeed,thankyou:bhittani_plugin_kksr_js.thankyou,error_msg:bhittani_plugin_kksr_js.error_msg}}(jQuery,window,document),jQuery(document).ready(function(t){t(".kk-star-ratings").kkstarratings()}),jQuery(document).ready(function(t){t(".notification-drop .item").on("click",function(){t(this).find("ul").toggle()}),t(".tabs-menu a").click(function(s){s.preventDefault(),t(this).parent().addClass("current"),t(this).parent().siblings().removeClass("current");var n=t(this).attr("href");t(".tab-content").not(n).css("display","none"),t(n).fadeIn()}),t(".tabs .tabs-nav li").click(function(s){var n=t(this).addClass("tab-active"),a=n.closest(".tabs").find(".tabs-content > *");n.siblings().removeClass("tab-active");var i=n.index(),r=a.eq(i).stop(!0,!0).fadeIn(0);a.not(r).stop(!0,!0).fadeOut(0)}).filter(":first-child").click(),t(".mobile-icon").click(function(){t(".menulink ul").toggleClass("showing")}),t(".ulposts").owlCarousel({loop:!0,rtl:!0,stagePadding:0,autoHeight:!1,margin:0,autoplay:!0,smartSpeed:200,nav:!0,dots:!1,smartSpeed:700,responsive:{0:{items:1},480:{items:2},520:{items:2},640:{items:2},800:{items:3},1024:{items:4},1280:{items:5},1360:{items:5}}})}),jQuery(document).ready(function(t){function s(s){id=t(s).attr("data-id"),t(".active").removeClass("active"),t(s).addClass("active"),t(".hidetab[id!='cell"+id+"']").hide(),t("#cell"+id).show()}t("#weekly .item").click(function(){s(this)});var n=(new Date).getDay()+1;7==n&&(n=0),s(t(".item_wt_day"+n))});

(function(l,e){"object"===typeof exports?e(exports):"function"===typeof define&&define.amd?define(["exports"],e):e(l)})(this,function(l){function e(a){this._targetElement="undefined"!=typeof a.length?a:[a];"undefined"===typeof window._progressjsId&&(window._progressjsId=1);"undefined"===typeof window._progressjsIntervals&&(window._progressjsIntervals={});this._options={theme:"blue",overlayMode:!1,considerTransition:!0}}function m(a,c){var d=this;100<=c&&(c=100);a.hasAttribute("data-progressjs")&&
setTimeout(function(){"undefined"!=typeof d._onProgressCallback&&d._onProgressCallback.call(d,a,c);var b=h(a);b.style.width=parseInt(c)+"%";var b=b.querySelector(".progressjs-percent"),g=parseInt(b.innerHTML.replace("%","")),e=parseInt(c),j=function(a,b,c){var d=Math.abs(b-c);3>d?k=30:20>d?k=20:intervanIn=1;0!=b-c&&(a.innerHTML=(f?++b:--b)+"%",setTimeout(function(){j(a,b,c)},k))},f=!0;g>e&&(f=!1);var k=10;j(b,g,e)},50)}function h(a){a=parseInt(a.getAttribute("data-progressjs"));return document.querySelector('.progressjs-container > .progressjs-progress[data-progressjs="'+
a+'"] > .progressjs-inner')}function p(a){for(var c=0,d=this._targetElement.length;c<d;c++){var b=this._targetElement[c];if(b.hasAttribute("data-progressjs")){var g=h(b);(g=parseInt(g.style.width.replace("%","")))&&m.call(this,b,g+(a||1))}}}function q(){var a,c=document.createElement("fakeelement"),d={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(a in d)if(void 0!==c.style[a])return d[a]}var n=function(a){if("object"===
typeof a)return new e(a);if("string"===typeof a){if(a=document.querySelectorAll(a))return new e(a);throw Error("There is no element with given selector.");}return new e(document.body)};n.version="0.1.0";n.fn=e.prototype={clone:function(){return new e(this)},setOption:function(a,c){this._options[a]=c;return this},setOptions:function(a){var c=this._options,d={},b;for(b in c)d[b]=c[b];for(b in a)d[b]=a[b];this._options=d;return this},start:function(){"undefined"!=typeof this._onBeforeStartCallback&&
this._onBeforeStartCallback.call(this);if(!document.querySelector(".progressjs-container")){var a=document.createElement("div");a.className="progressjs-container";document.body.appendChild(a)}for(var a=0,c=this._targetElement.length;a<c;a++){var d=this._targetElement[a];if(!d.hasAttribute("data-progressjs")){var b=d,g,e,j;"body"===b.tagName.toLowerCase()?(g=b.clientWidth,e=b.clientHeight):(g=b.offsetWidth,e=b.offsetHeight);for(var f=j=0;b&&!isNaN(b.offsetLeft)&&!isNaN(b.offsetTop);)j+=b.offsetLeft,
f+=b.offsetTop,b=b.offsetParent;b=f;d.setAttribute("data-progressjs",window._progressjsId);f=document.createElement("div");f.className="progressjs-progress progressjs-theme-"+this._options.theme;f.style.position="body"===d.tagName.toLowerCase()?"fixed":"absolute";f.setAttribute("data-progressjs",window._progressjsId);var k=document.createElement("div");k.className="progressjs-inner";var h=document.createElement("div");h.className="progressjs-percent";h.innerHTML="1%";k.appendChild(h);this._options.overlayMode&&
"body"===d.tagName.toLowerCase()?(f.style.left=0,f.style.right=0,f.style.top=0,f.style.bottom=0):(f.style.left=j+"px",f.style.top=b+"px",f.style.width=g+"px",this._options.overlayMode&&(f.style.height=e+"px"));f.appendChild(k);document.querySelector(".progressjs-container").appendChild(f);m(d,1);++window._progressjsId}}return this},set:function(a){for(var c=0,d=this._targetElement.length;c<d;c++)m.call(this,this._targetElement[c],a);return this},increase:function(a){p.call(this,a);return this},autoIncrease:function(a,
c){var d=this,b=parseInt(this._targetElement[0].getAttribute("data-progressjs"));"undefined"!=typeof window._progressjsIntervals[b]&&clearInterval(window._progressjsIntervals[b]);window._progressjsIntervals[b]=setInterval(function(){p.call(d,a)},c);return this},end:function(){a:{"undefined"!=typeof this._onBeforeEndCallback&&(!0===this._options.considerTransition?h(this._targetElement[0]).addEventListener(q(),this._onBeforeEndCallback,!1):this._onBeforeEndCallback.call(this));for(var a=parseInt(this._targetElement[0].getAttribute("data-progressjs")),
c=0,d=this._targetElement.length;c<d;c++){var b=this._targetElement[c],e=h(b);if(!e)break a;var l=1;100>parseInt(e.style.width.replace("%",""))&&(m.call(this,b,100),l=500);(function(a,b){setTimeout(function(){a.parentNode.className+=" progressjs-end";setTimeout(function(){a.parentNode.parentNode.removeChild(a.parentNode);b.removeAttribute("data-progressjs")},1E3)},l)})(e,b)}if(window._progressjsIntervals[a])try{clearInterval(window._progressjsIntervals[a]),window._progressjsIntervals[a]=null,delete window._progressjsIntervals[a]}catch(j){}}return this},
onbeforeend:function(a){if("function"===typeof a)this._onBeforeEndCallback=a;else throw Error("Provided callback for onbeforeend was not a function");return this},onbeforestart:function(a){if("function"===typeof a)this._onBeforeStartCallback=a;else throw Error("Provided callback for onbeforestart was not a function");return this},onprogress:function(a){if("function"===typeof a)this._onProgressCallback=a;else throw Error("Provided callback for onprogress was not a function");return this}};return l.progressJs=
n});

jQuery(document).ready(function ($) {
var filmbin_isMobile={Android:function(){return navigator.userAgent.match(/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return filmbin_isMobile.Android()||filmbin_isMobile.BlackBerry()||filmbin_isMobile.iOS()||filmbin_isMobile.Opera()||filmbin_isMobile.Windows()}};

$('#s-header').keyup(function() {
$('.search_result').show();
if (jQuery.trim(jQuery("#s-header").val()).length > 1)
{
var data = {
	'action': 'ajaxsearch',
	's': $('#s-header').val()
};
$.post(bhittani_plugin_kksr_js.ajaxurl, data, function(result) {
$('.search_result').html(result);
});
}
else
{
jQuery('.search_result').hide();
}
});
$(document).click(function(e) {
$('.search_result').show();
if (!($(e.target).is('.search_result'))&&($(e.target).closest('.search_result').length==0)) {
$('.search_result').hide();
}
});

$('.down-row-serie .season_b').each(function() {
$(this).parent().find('.wppper-line').hide();
$(this).on( "click", function() {
$(this).parent().find('.wppper-line').slideToggle();
});
});
$('.down-row-serie').last().find('.wppper-line').show();
	
if( !filmbin_isMobile.any() && bhittani_plugin_kksr_js.fixmenu == 'on'){
var $fixed_enabled = jQuery(".menutop");
$window = jQuery(window);
	var navScroll_1  = jQuery(document).scrollTop();
	var headerHeight = $fixed_enabled .offset().top;
	$window.scroll(function() {
	var navScroll_2 = jQuery(document).scrollTop();
		if (navScroll_2 > headerHeight){ $fixed_enabled.addClass('fixed-nav'); }
		else { $fixed_enabled.removeClass('fixed-nav');}
		if (navScroll_2 > navScroll_1){ $fixed_enabled.removeClass('fixed-nav-appear');}
		else { $fixed_enabled.addClass('fixed-nav-appear');}
		navScroll_1 = jQuery(document).scrollTop();
		
	});
}
(function( $ ) {
	'use strict';
	$(document).on('click', '.sl-button', function() {
		var button = $(this);
		var post_id = button.attr('data-post-id');
		var security = button.attr('data-nonce');
		var iscomment = button.attr('data-iscomment');
		var allbuttons;
		if ( iscomment === '1' ) { /* Comments can have same id */
			allbuttons = $('.sl-comment-button-'+post_id);
		} else {
			allbuttons = $('.sl-button-'+post_id);
		}
		var loader = allbuttons.next('#sl-loader');
		if (post_id !== '') {
			$.ajax({
				type: 'POST',
				url: bhittani_plugin_kksr_js.ajaxurl,
				data : {
					action : 'process_filmbin_like',
					post_id : post_id,
					nonce : security,
					is_comment : iscomment,
				},
				beforeSend:function(){
					loader.html('<div class="loader">بصبر...</div>');
				},	
				success: function(response){
					var icon = response.icon;
					var count = response.count;
					allbuttons.html(icon+count);
					if(response.status === 'unliked') {
						var like_text = bhittani_plugin_kksr_js.like;
						allbuttons.prop('title', like_text);
						allbuttons.removeClass('liked');
					} else {
						var unlike_text = bhittani_plugin_kksr_js.unlike;
						allbuttons.prop('title', unlike_text);
						allbuttons.addClass('liked');
					}
					loader.empty();					
				}
			});
			
		}
		return false;
	});
})( jQuery );

jQuery("ul.tabss a").click(function(s) {
	s.preventDefault();
	jQuery(this).parent().addClass("current");
	jQuery(this).parent().siblings().removeClass("current");
	var n = jQuery(this).attr("href");
	jQuery(".tab_season").not(n).css("display", "none");
	jQuery(n).fadeIn();
});

$('.lyrics_toggle span').click(function () {
	var myparent = $(this).parent();
	var myparentnext = myparent.next();
	myparentnext.slideToggle();
});
// we need to store all of our variables 
//const musicplayer = document.querySelector(".music-player");
const song = document.querySelector(".player");
const toggleBtn = document.querySelector(".toggle");
const loader = document.querySelector(".progress");
const loaderBar = document.querySelector(".progress-filled");
const skipButtons = document.querySelectorAll("[data-skip]"); 
// we need to write functions 
function toggleSong() {
  if( song.paused ){
     song.play();
   } else {
     song.pause();
   }
}
function updateBtn(){
   if(song.paused){
     toggleBtn.innerHTML = '<i class="icon-play" aria-hidden="true"></i>';
   } else {
      toggleBtn.innerHTML = '<i class="icon-pause" aria-hidden="true"></i>';
   }
}
function handleProgress() {
  console.log(song.currentTime);
  const percent = (song.currentTime / song.duration) * 100;
  loaderBar.style.flexBasis = `${percent}%`;
}

function skip() {
 song.currentTime = song.currentTime + parseFloat(this.dataset.skip);
}

function scrub(e) {
  const scrubTime = (e.offsetX / loader.offsetWidth) * song.duration;
  song.currentTime = scrubTime;
}

// we need to bind these functions to html 
toggleBtn.addEventListener("click", toggleSong);
song.addEventListener("play", updateBtn);
song.addEventListener("pause", updateBtn);
song.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
/*
let mousedown = false;
loader.addEventListener("click", scrub);
loader.addEventListener('mousemove', (e) => mousedown && scrub(e));
loader.addEventListener('mousedown', () => mousedown = true);
loader.addEventListener('mouseup', () => mousedown = false);
*/

});