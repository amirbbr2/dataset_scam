/*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/
//global variables
var responsiveflag = false;

$(document).ready(function(){
	highdpiInit();
	responsiveResize();
	$(window).resize(responsiveResize);
    responsiveMobileHeader();
    $(window).resize(responsiveMobileHeader);
    $('.block .block_content').not('.shopping_cart .block .block_content').prepend('<span class="line_content"></span>');
    crumbProcess();

	if (navigator.userAgent.match(/Android/i))
	{
		var viewport = document.querySelector('meta[name="viewport"]');
		viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
		window.scrollTo(0, 1);
	}
	blockHover();
	if (typeof quickView !== 'undefined' && quickView)
		quick_view();
	dropDown();

	if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'product']))
	{
		bindGrid();

 		$(document).on('change', '.selectProductSort', function(e){
			if (typeof request != 'undefined' && request)
				var requestSortProducts = request;
 			var splitData = $(this).val().split(':');
			if (typeof requestSortProducts != 'undefined' && requestSortProducts)
				document.location.href = requestSortProducts + ((requestSortProducts.indexOf('?') < 0) ? '?' : '&') + 'orderby=' + splitData[0] + '&orderway=' + splitData[1];
    	});

		$(document).on('change', 'select[name="n"]', function(){
			$(this.form).submit();
		});

		$(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function() {
			if (this.value != '')
				location.href = this.value;
		});

		$(document).on('change', 'select[name="currency_payement"]', function(){
			setCurrency($(this).val());
		});
	}

	$(document).on('click', '.back', function(e){
		e.preventDefault();
		history.back();
	});

	jQuery.curCSS = jQuery.css;
	if (!!$.prototype.cluetip)
		$('a.cluetip').cluetip({
			local:true,
			cursor: 'pointer',
			dropShadow: false,
			dropShadowSteps: 0,
			showTitle: false,
			tracking: true,
			sticky: false,
			mouseOutClose: true,
			fx: {
		    	open:       'fadeIn',
		    	openSpeed:  'fast'
			}
		}).css('opacity', 0.8);

	if (!!$.prototype.fancybox)
		$.extend($.fancybox.defaults.tpl, {
			closeBtn : '<a title="' + FancyboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
			next     : '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
		});

    /*************************************/
    /*         my account toggle         */
    /*************************************/
    myAccountClick = $(".header-toggle-call");
    myAccountClick.on('click',function(){
        var myAccountSlide = $(this).next('.header-toggle');
         if (myAccountSlide.is(':visible'))
            myAccountSlide.stop(true, true).slideUp(450);
         else{
            myAccountSlide.stop(true, true).slideDown(450)
         }
         $(myAccountClick).not(this).next('.header-toggle').slideUp();
         return false;
    });
    $(document).on('click',function(e){
        if (e.target.className.split(" ")[0] != 'header-toggle-call' && e.target.className != 'header-toggle'){
            $('.header-toggle').stop(true, true).slideUp(450);
        }
    });

    $('.scroll_top').click(function(){
      $("html, body").animate({ scrollTop: 0 }, 600);
       return false;
     });
     $(window).scroll(function(){
          if ($(this).scrollTop() > 500) {
           $('.scroll_top').fadeIn();
          } else {
           $('.scroll_top').fadeOut();
          }
     });
});


function crumbProcess() {
    if ($('#responsive_slides').length) {
        $('.breadcrumb').prependTo('#responsive_slides');
       // $('#responsive_slides').prependTo($('.breadcrumb'))
    }
}
function highdpiInit()
{
	if($('.replace-2x').css('font-size') == "1px")
	{
		var els = $("img.replace-2x").get();
		for(var i = 0; i < els.length; i++)
		{
			src = els[i].src;
			extension = src.substr( (src.lastIndexOf('.') +1) );
			src = src.replace("." + extension, "2x." + extension);

			var img = new Image();
			img.src = src;
			img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
		}
	}
}


// Used to compensante Chrome/Safari bug (they don't care about scroll bar for width)
function scrollCompensate()
{
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
}

function responsiveResize()
{
	var screen_w = $(window).width()+scrollCompensate();
	compensante = scrollCompensate();
	if (screen_w <= 767 && responsiveflag == false)
	{
		accordion('enable');
	    accordionFooter('enable');
		responsiveflag = true;
        //mobileHeader('enable');
        //$('.shopping_cart_container').insertAfter('#search_block_top');
        $('.option-3 #search_block_top').insertAfter('.option-3 #nav_topmenu .navbar-header .navbar-brand');        
	}
	else if (screen_w >= 768)
	{
		accordion('disable');
		accordionFooter('disable');
       // mobileHeader('disable');
	    responsiveflag = false;
        //search_item_position
        $('.option-3 #nav_topmenu .navbar-header #search_block_top').insertAfter('.option-3 .search_item .search_item_position'); 
	}
	if (screen_w <=480){
		$('#header .cart_block').width($('#enable_mobile_header').width());
	}else{
		var style_str = $('#header .cart_block').attr('style');
		//console.log(style_str.replace(/^width.*\;$/,''));
		if (typeof(style_str) != 'undefined'){
			$('#header .cart_block').attr('style',style_str.replace(/^width.*\;$/,''));
		}
		//$('#header .cart_block').attr('style',style_str.replace('/^width.*\;/',''));
		//$('#header .cart_block').attr('style',RegExp(style_str,'/^width.*\;/'));
	}
	if (typeof page_name != 'undefined' && in_array(page_name, ['category']))
		resizeCatimg();
}

function blockHover(status)
{
	$(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function(e){

		if ($('body').find('.container').width() == 1170)
		{
			//var pcHeight = $(this).parent().outerHeight();
			//var pcPHeight = $(this).parent().find('.button-container').outerHeight() + $(this).parent().find('.comments_note').outerHeight() + $(this).parent().find('.functional-buttons').outerHeight();
			//$(this).parent().addClass('hovered').css({'height':pcHeight + pcPHeight, 'margin-bottom':pcPHeight * (-1)});
            $(this).parent().addClass('hovered');
		}
	});

	$(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function(e){
		if ($('body').find('.container').width() == 1170)
			//$(this).parent().removeClass('hovered').css({'height':'auto', 'margin-bottom':'0'});
            $(this).parent().removeClass('hovered');
	});
}

function quick_view()
{
	$(document).on('click', '.quick-view:visible, .quick-view-mobile:visible', function(e)
	{
		e.preventDefault();
		var url = this.rel;
		if (url.indexOf('?') != -1)
			url += '&';
		else
			url += '?';

		if (!!$.prototype.fancybox)
			$.fancybox({
				'padding':  0,
				'width':    1087,
				'height':   610,
				'type':     'iframe',
				'href':     url + 'content_only=1'
			});
	});
}

function bindGrid()
{
	var view = $.totalStorage('display');

	if (!view && (typeof displayList != 'undefined') && displayList)
		view = 'list';

	if (view && view != 'grid')
		display(view);
	else
		$('.display').find('li.view_as_grid').addClass('selected');

	$(document).on('click', '.view_as_grid', function(e){
		e.preventDefault();
		display('grid');
	});

	$(document).on('click', '.view_as_list', function(e){
		e.preventDefault();
		display('list');
	});
}

function display(view)
{
    // process column
    var case_width = 'normal-width';
    case_width = $('.case-width').val();
	if (view == 'list')
	{
		$('#center_column ul.product_list').removeClass('grid').addClass('list row');
		$('#center_column .product_list > li').removeClass('col-xs-12 col-sm-6 col-md-4').addClass('col-xs-12');
		$('#center_column .product_list > li').each(function(index, element) {
			html = '';
			html = '<div class="product-container"><div class="row">';
				html += '<div class="left-block col-xs-4 col-xs-5 col-md-4">' + $(element).find('.left-block').html() + '</div>';
				html += '<div class="center-block col-xs-4 col-xs-7 col-md-4">';
                    html += '<div class="center-block-wrap">';
					html += '<div class="product-flags">'+ $(element).find('.product-flags').html() + '</div>';
					html += '<h5 itemprop="name">'+ $(element).find('h5').html() + '</h5>';
                    var rating = $(element).find('.comments_note').html(); // check : rating
					if (rating != null) {
						html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">'+ rating + '</div>';
					}
                    var price = $(element).find('.content_price').html();       // check : catalog mode is enabled
					if (price != null) {
						html += '<div class="content_price col-xs-5 col-md-12">'+ price + '</div>';
					}
                    var availability = $(element).find('.availability').html();	// check : catalog mode is enabled
                    if (availability != null) {
						html += '<span class="availability">'+ availability +'</span>';
					}
                    html += '<p class="product-desc">'+ $(element).find('.product-desc').html() + '</p>';
					html += '<p class="product-desc-list">'+ $(element).find('.product-desc-list').html() + '</p>';
                    html += '<div class="functional-buttons clearfix col-sm-12">' + $(element).find('.functional-buttons').html() + '</div>';
					var colorList = $(element).find('.color-list-container').html();
					if (colorList != null) {
						html += '<div class="color-list-container">'+ colorList +'</div>';
					}
                    html += '</div>';
				html += '</div>';
			html += '</div></div>';
		$(element).html(html);
		});
		$('.display').find('li.view_as_list').addClass('selected');
		$('.display').find('li.view_as_grid').removeClass('selected');
		$.totalStorage('display', 'list');
	}
	else
	{
	    // process column
		$('#center_column ul.product_list').removeClass('list').addClass('grid row');
        if (case_width == 'full-width'){
            $('#center_column .product_list > li').removeClass('col-xs-12').addClass('col-xs-12 col-sm-4 col-md-3');
        }else if (case_width == 'both-width'){
            $('#center_column .product_list > li').removeClass('col-xs-12').addClass('col-xs-12 col-sm-12 col-md-6');
        }else {
            $('#center_column .product_list > li').removeClass('col-xs-12').addClass('col-xs-12 col-sm-6 col-md-4');
        }

		$('#center_column .product_list > li').each(function(index, element) {
		html = '';
		html += '<div class="product-container">';
			html += '<div class="left-block">' + $(element).find('.left-block').html() + '</div>';
			html += '<div class="right-block">';
				html += '<div class="product-flags">'+ $(element).find('.product-flags').html() + '</div>';
				html += '<h5 itemprop="name">'+ $(element).find('h5').html() + '</h5>';
				var rating = $(element).find('.comments_note').html(); // check : rating
					if (rating != null) {
						html += '<div itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating" class="comments_note">'+ rating + '</div>';
					}
				html += '<p itemprop="description" class="product-desc">'+ $(element).find('.product-desc').html() + '</p>';
                html += '<p class="product-desc-list">'+ $(element).find('.product-desc-list').html() + '</p>';
				var price = $(element).find('.content_price').html(); // check : catalog mode is enabled
					if (price != null) {
						html += '<div class="content_price">'+ price + '</div>';
					}
				//html += '<div itemprop="offers" itemscope itemtype="http://schema.org/Offer" class="button-container">'+ $(element).find('.button-container').html() +'</div>';
				var colorList = $(element).find('.color-list-container').html();
				if (colorList != null) {
					html += '<div class="color-list-container">'+ colorList +'</div>';
				}
				var availability = $(element).find('.availability').html(); // check : catalog mode is enabled
				if (availability != null) {
					html += '<span class="availability">'+ availability +'</span>';
				}
			html += '</div>';
			html += '<div class="functional-buttons clearfix">' + $(element).find('.functional-buttons').html() + '</div>';
		html += '</div>';
		$(element).html(html);
		});
		$('.display').find('li.view_as_grid').addClass('selected');
		$('.display').find('li.view_as_list').removeClass('selected');
		$.totalStorage('display', 'grid');
	}
}

function dropDown()
{
	elementClick = '#header .current';
	elementSlide =  'ul.toogle_content';
	activeClass = 'active';

	$(elementClick).on('click', function(e){
		e.stopPropagation();
		var subUl = $(this).next(elementSlide);
		if(subUl.is(':hidden'))
		{
			subUl.slideDown();
			$(this).addClass(activeClass);
		}
		else
		{
			subUl.slideUp();
			$(this).removeClass(activeClass);
		}
		$(elementClick).not(this).next(elementSlide).slideUp();
		$(elementClick).not(this).removeClass(activeClass);
		e.preventDefault();
	});

	$(elementSlide).on('click', function(e){
		e.stopPropagation();
	});

	$(document).on('click', function(e){
		e.stopPropagation();
		var elementHide = $(elementClick).next(elementSlide);
		$(elementHide).slideUp();
		$(elementClick).removeClass('active');
	});
}

function accordionFooter(status)
{
	if(status == 'enable')
	{
		$('#footer .footer-block h4').on('click', function(){
			$(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
		})
		$('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
	}
	else
	{
		$('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
		$('#footer').removeClass('accordion');
	}
}

function accordion(status)
{
	leftColumnBlocks = $('#left_column');
	if(status == 'enable')
	{
		$('#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4').on('click', function(){
			$(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
		})
		$('#right_column, #left_column').addClass('accordion').find('.block .block_content').slideUp('fast');
	}
	else
	{
		$('#right_column .block .title_block, #left_column .block .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
		$('#left_column, #right_column').removeClass('accordion');
	}
}

function resizeCatimg()
{
	var div = $('.cat_desc').parent('div');
	var image = new Image;
	$(image).load(function(){
	    var width  = image.width;
	    var height = image.height;
		var ratio = parseFloat(height / width);
		var calc = Math.round(ratio * parseInt(div.outerWidth(false)));
		div.css('min-height', calc);
	});
	if (div.length)
		image.src = div.css('background-image').replace(/url\("?|"?\)$/ig, '');
}


/**********************************
* Nella - Process mobile header *
***********************************/

function mobileHeader(flag_mobile) {
    if (flag_mobile == 'enable') {
        // Enable mobile header
        $('#currencies-block-top, #languages-block-top, .shopping_cart_container').appendTo('#enable_mobile_header');
        $('#enable_mobile_header').show();
    }else if (flag_mobile == 'disable') {
        // Disable mobile header
        $('#currencies-block-top, #languages-block-top').insertAfter('header .nav .header_user_info');
        if (!$('body').hasClass('option-3')){
            $('.shopping_cart_container').insertAfter('#search_block_top');
        }else{
            $('.shopping_cart_container').insertAfter('#enable_mobile_header');
        }
        $('#enable_mobile_header').hide();
    }
}

function responsiveMobileHeader()
{
	compensante = scrollCompensate();
	if (($(window).width()+scrollCompensate()) <= 480)
	{
        mobileHeader('enable');
	}
	else if (($(window).width()+scrollCompensate()) > 480)
	{
        mobileHeader('disable');
	}
}

/* detect touch */
if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $(".brand_paralax").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
$(window).bind('load',backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".brand_paralax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}

