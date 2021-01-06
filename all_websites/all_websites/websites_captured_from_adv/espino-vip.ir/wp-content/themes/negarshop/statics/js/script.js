function setCookie(cname, cvalue, exdays, htime) {
    var d = new Date();
	if(!htime){
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	}else{
		d.setTime(d.getTime() + (exdays * 60 * 60 * 1000));
	}
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function get(name) {
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
function insertParam(key, value) {
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--)
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
}
function removeParam(key) {
	var sourceURL = window.location.href;
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
	document.location = rtn;
    return rtn;
}
function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /*set the position of the magnifier glass:*/
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

(function($) {
    "use strict";
    var cookie_array = getCookie('img_banners');
    if (cookie_array == "") {
        cookie_array = [];
    } else {
        cookie_array = JSON.parse(cookie_array);
    }
    $('.image-banner-parent.removeable').each(function() {
        if (cookie_array.indexOf($(this).attr('id')) != "-1") {
            $(this).hide()
        }
        $(this).append('<button class="close-btn"><i class="fal fa-times"></i></button>');
    });
    $('.image-banner-parent.removeable button.close-btn').click(function() {
        var thisParent = $(this).parents('.image-banner-parent.removeable');
        cookie_array[cookie_array.length] = thisParent.attr("id");
        setCookie("img_banners", JSON.stringify(cookie_array), 10, false);
        thisParent.slideUp();
    });
    $('.flip-clock-a').each(function() {
        var endTime = parseInt($(this).attr('data-end'));
        var thisID = $(this).attr('id');
        var clock;
        clock = $('#' + thisID).FlipClock(endTime, {
            clockFace: 'DailyCounter',
            autoStart: false,
            language: 'fa',
            showSeconds: true,
            callbacks: {
                stop: function() {
                    window.location.assign('/');
                }
            }
        });
        clock.setCountdown(true);
        clock.start();
    });
    $.fn.wc_product_def_gallery = jQuery('.product .woocommerce-product-gallery').html();
    function CBinitProductGallery() {
        var bigcar = $('.owl-carousel.wc-product-carousel');
        var thumbcar = $('.single-style-2-gallery .owl-carousel.wc-product-carousel-thumbs');
        $(document).ready(function () {
            bigcar.owlCarousel({
                items: 1,
                nav: true,
                dots: false,
                loop: false,
                navText: ["<i class='fal fa-angle-left'></i>", "<i class='fal fa-angle-right'></i>"]
            });
            var items_thumbs = 4;
            if(thumbcar.length>0){
                items_thumbs = 12
            }else{
                thumbcar = $('.owl-carousel.wc-product-carousel-thumbs');
            }
            thumbcar.owlCarousel({
                items: items_thumbs,
                center: true,
                margin: 10,
                nav: false,
                dots: false,
            });
            bigcar.find('.owl-stage').lightGallery({
                selector: '.car-dtag'
            });
            bigcar.on('changed.owl.carousel', function (event) {
                thumbcar.trigger('to.owl.carousel', event.item.index);
            });
            thumbcar.on('changed.owl.carousel', function (event) {
                bigcar.trigger('to.owl.carousel', event.item.index);
            });
            $('.owl-carousel.wc-product-carousel-thumbs .owl-item').click(function () {
                bigcar.trigger('to.owl.carousel', $(this).index());
            });
        });
        bigcar.on('initialized.owl.carousel', function (event) {
            if($("body").hasClass("rtl")) {
                setTimeout(function () {
                    bigcar.trigger('to.owl.carousel', event.item.count - 1);
                }, 10);
            }
        });
        if ($(window).innerWidth() > 992) {
            $(document).ready(function () {
                $('.owl-carousel.wc-product-carousel img.product-gallery-img').each(function () {
                    $('#' + $(this).attr('id')).one("load", function () {
                        $('#' + $(this).attr('id')).magnify({
                            speed: 200,
                            src: $(this).attr('src')
                        });
                    }).each(function () {
                        if (this.complete) $(this).load();
                    });
                });
            });
        }
    }
    CBinitProductGallery();
	var wcshortdesc = $('.woocommerce-product-details__short-description').height();
	if(wcshortdesc > 194){
		$('.woocommerce-product-details__short-description').append('<button id="product-short-desc-toggle"><span>دیدن ادامه...</span> <i class="fal fa-angle-down"></i></button>');
	}
	$('#product-short-desc-toggle').click(function(){
		$(this).parents('.woocommerce-product-details__short-description').toggleClass('show');
		if($(this).parents('.woocommerce-product-details__short-description').hasClass('show')){
			$(this).children('span').text('کوتاه کردن');
		}else{$(this).children('span').text('دیدن ادامه...');}
	});
    $(document).ready(function () {
        $('.enamad-carousel').owlCarousel({rtl: true, items: 1, loop: true, autoplay: true});
    });

    $( 'img.lazy').one("load", function() {
        $(this).parents('figure.thumb').css({'background-image':'none'});
    }).each(function() {
        if(this.complete) $(this).load();
    });



	$(document).ready(function () {
        $('.offer-moments .owl-carousel').each(function () {
            var carouselSEL = $(this);
            var carinit = carouselSEL.owlCarousel({
                items: 1,
                rtl: true,
                dots: false,
                touchDrag: false,
                mouseDrag: false,
                pullDrag: false,
                loop: true,
                nav: false,
                autoplay:true,
                autoplayTimeout:7000,
                autoplayHoverPause:false,
                onInitialized: function () {
                    carouselSEL.parents('.offer-moments').addClass('animate-bar');
                }
            });
        });
    });



    var afterval = 0;
    wpbtt_start();
    $(window).scroll(function() {
        wpbtt_start();
        if ($(window).scrollTop() > 0) {
			$('.fixed-bottom-bar').fadeIn('fast');
		}else{
			$('.fixed-bottom-bar').fadeOut('fast');
		}
    });
    $("#main-menu-btn").click(function() {
        $("#side-menu").addClass('show');
    });
    $("#res-search-btn").click(function() {
        $(this).addClass('show');
    });
    $("#res-search-close").click(function() {
        $("#res-search-btn").removeClass('show');
        return false;
    });
    $(".ui-mask").click(function() {
        $("#side-menu").removeClass('show');
    });
    $("#side-menu nav li.menu-item-has-children,footer#footer .footer-copyright nav.footer-menu li.menu-item-has-children").each(function() {
        $(this).children('a').after('<span class="toggle"><i class="fal fa-angle-down"></i></span>');
    });
    $("#side-menu nav li.menu-item-has-children span.toggle").click(function() {
        $(this).toggleClass('active');
        $(this).next('ul').slideToggle('fast');
    });
    $("footer#footer .footer-copyright nav.footer-menu li.menu-item-has-children span.toggle").click(function() {
        $(this).toggleClass('active');
        $(this).next('ul').toggleClass('show');
    });
    $("button#footer-menu-toggle").click(function() {
        $(this).next('ul').toggleClass('show');
    });
    $(".content-widget header.section-header button.wg-tabs-toggle").click(function() {
        $(this).next('ul').toggleClass('show');
    });
    $(".content-widget header.section-header button.wg-tabs-close").click(function() {
        $(this).parents('ul').removeClass('show');
    });
    $(".content-widget header.section-header ul.tabs a").click(function() {
        $(this).parents('ul').removeClass('show');
    });
    var qiit = $('.woocommerce .quantity input.input-text');
    qiit.each(function () {
        $(this).before('<span class="m-btn"><i class="far fa-minus"></i></span>');
        $(this).after('<span class="p-btn"><i class="far fa-plus"></i></span>');
        $(this).parents('.quantity').addClass('custom-num');
        $(this).show();
    });
    $(document).on('click','.woocommerce .quantity .m-btn',function() {
        var inputT = $(this).parent().find('input.input-text');
        if (parseInt(inputT.val()) > parseInt(inputT.attr('min'))) {
            inputT.val(parseInt(inputT.val()) - 1);
            inputT.change();
        }
    });
    $(document).on('click','.woocommerce .quantity .p-btn',function() {
        var inputT = $(this).parent().find('input.input-text');
        if (parseInt(inputT.val()) >= parseInt(inputT.attr('min'))) {
            inputT.val(parseInt(inputT.val()) + 1);
            inputT.change();
        }
    });

    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var req_url = settings.url;
        if(req_url.search("wc-ajax=get_refreshed_fragments") > -1){
            $('.woocommerce .quantity input.input-text').parents('.quantity').addClass('custom-num');
            $('.woocommerce .quantity.custom-num input.input-text').before('<span class="m-btn"><i class="far fa-minus"></i></span>');
            $('.woocommerce .quantity.custom-num input.input-text').after('<span class="p-btn"><i class="far fa-plus"></i></span>');
            $('.woocommerce .quantity input.input-text').show();
        }
    });
    if($('.orderby.custom-select').length>0) {
        $('.sort-tabs ul.products-archive-tabs button[data-value="' + $('.orderby.custom-select').val() + '"]').addClass('btn-primary');
        $('.sort-tabs ul.products-archive-tabs button:not(.btn-primary)').click(function () {
            $('.orderby.custom-select').val($(this).attr('data-value'));
            $('.orderby.custom-select').change();
        });
    }else{
        $('.woocommerce-products-header .sort-tabs').remove();
    }
	if(get('stock') == "instock"){
		$('#archive-in-stock-switch').prop('checked', true);
	}
	$('#archive-in-stock-switch').change(function(){
		if($(this).prop("checked")){
			insertParam('stock', 'instock');
		}else{
			removeParam('stock');
		}
	});
	if(getCookie('negarshop_popup') != "hidden"){
		$('#negarshop-popup').modal('show');
	}
	$('#negarshop-popup .negarshop-popup-link').click(function(){
		var cook_time = $('#negarshop-popup').attr('data-time');
		setCookie('negarshop_popup','hidden',cook_time,true);
		$('#negarshop-popup').modal('hide');
	});
	$('#negarshop-popup').on('hidden.bs.modal', function (e) {
		var cook_time = $('#negarshop-popup').attr('data-time');
		setCookie('negarshop_popup','hidden',cook_time,true);
    });
	$('#header-action-menu-btn').click(function(){
		$(this).toggleClass('active');
		$('header#header.style-negarshop-light .bottom').toggleClass('show');
	});


    function wpbtt_btn(i) {
        var prec = i * 3.6;
        if (prec <= 180) {
            jQuery('#negarshop-to-top>span').css('background-image', 'linear-gradient(' + (prec + 90) + 'deg, transparent 50%, #fff 50%),linear-gradient(90deg, #fff 50%, transparent 50%)');
        } else {
            jQuery('#negarshop-to-top>span').css('background-image', 'linear-gradient(' + (prec - 90) + 'deg, transparent 50%, ' + jsVars.borderActiveColor + ' 50%),linear-gradient(90deg, #fff 50%, transparent 50%)');
        }
    }
    function wpbtt_start() {
        var scrollTop = jQuery(window).scrollTop();
        var docHeight = jQuery(document).height();
        var winHeight = jQuery(window).height();
        var scrollPercent = (scrollTop) / (docHeight - winHeight);
        var scrollPercentRounded = Math.round(scrollPercent * 100);
        wpbtt_btn(scrollPercentRounded);
    }

	$('#negarshop-to-top').click(function(){
	    $("html, body").stop().animate({ scrollTop: 0 }, "fast");
	    return false;
	});
    $('.products-grid .grid-products-loader button.btn').click(function() {
		var thisItem = $(this);
		var ti_offset = parseInt($(this).attr('data-offset'));
        thisItem.addClass('disabled');
        jQuery.post(negarshop_obj.ajax_url, {
            'action': 'negarshop_grid_post_ajax',
            'query': thisItem.attr('data-query'),
			'offset': ti_offset,
        }, function(response) {
            if (response.status) {
                ti_offset++;
				thisItem.attr('data-offset', ti_offset);
				thisItem.removeClass('disabled');
				thisItem.parents('.grid-items').children('.row').append(response.data);
				if(!response.next){thisItem.remove();}
            }
        });
        return false;
	});
    var caloadmg = false;
    $('#magical-btn').click(function(){
        var thisItem = $(this);
        $('.magic-items').slideUp('fast');
        thisItem.addClass('loading');
        jQuery.post(negarshop_obj.ajax_url, {
            'action': 'negarshop_magic_post_ajax',
            'query': thisItem.attr('data-query'),
        }, function(response) {
            if (response.status) {
                $('.magic-items').slideDown('fast');
                $("html, body").animate({ scrollTop: $('.magic-items').offset().top }, "slow");
                $('.magic-items .row').html(response.data);
            }
            thisItem.removeClass('loading');
        });
        return false;
    });
    $(document).on("click", ".add-product-favo, .dislike_product", function() {
        var thisItem = $(this);
        if(!thisItem.hasClass('login_req')) {
            thisItem.addClass('disabled');
            jQuery.post(negarshop_obj.ajax_url, {
                'action': 'negarshop_like_ajax',
                'id': thisItem.attr('data-id'),
            }, function (response) {
                if (response.status) {
                    if (response.status_code == 1) {
                        thisItem.addClass("liked");
                    } else if (response.status_code == 2) {
                        thisItem.removeClass("liked");
                    }
                    thisItem.removeClass('disabled');
                    if (thisItem.hasClass('dislike_product')) {
                        location.reload();
                    }
                }
            });
        }else{
            $('#login-popup-modal').modal('show');
        }
        return false;
    });
    $(document).on("click", ".cb-quick-view:not(.disabled)", function() {
        var thisItem = $(this);
        var cbQVModal = $('.cb-quick-view-modal-lg');
        thisItem.addClass('disabled');
        cbQVModal.find('.modal-content').children('.loading').show();
        cbQVModal.find('.modal-content').children('.content').html('');
        cbQVModal.modal('show');
        jQuery.post(negarshop_obj.ajax_url, {
            'action': 'cb_quick_view_ajax',
            'id': thisItem.attr('data-id'),
        }, function(response) {
            if (response.status) {
                cbQVModal.find('.modal-content').children('.loading').hide();
                cbQVModal.find('.modal-content').children('.content').html(response.data);
                thisItem.removeClass('disabled');
            }
        });
        return false;
    });
    $(document).on("click", '.cb-add-to-cart', function() {
        var thisitem = $(this);
        thisitem.addClass('disabled');
        $.ajax({
            url: negarshop_obj.ajax_url,
            method: 'post',
            data:{
                'action':   'cb_add_to_cart_ajax',
                'id':   thisitem.attr('data-id'),
            }
        }).done( function (response) {
            if(response.status !== undefined) {
                $.notify({
                    message: response.message,
                }, {
                    // settings
                    element: 'body',
                    position: null,
                    type: response.style,
                    allow_dismiss: false,
                    newest_on_top: false,
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    z_index: parseInt(thisitem.attr('data-offset')),
                    delay: 2000,
                    timer: 1000,
                });
                $('.widget_shopping_cart_content').html(response.basket);
                $('.cart-basket-box span.count, #responsive-header .rh-item .badge').text(response.count);
                $('.cart-basket-box span.subtitle').html(response.total_amount);
            }
            thisitem.removeClass('disabled');
        });
    });

	$("html").click(function() {
		$(".header-search .search-box.ajax-form .search-result").fadeOut('fast');
	});

    $(".header-search .search-box.ajax-form .search-result").click(function(a) {
        a.stopPropagation();
	});

	$('.header-search .search-box.ajax-form input.search-field').focus(function(a) {
		a.stopPropagation();
        $(this).parents('.search-box').find('.search-result').fadeIn('fast');
    }).click(function(a) {
		a.stopPropagation();
        $(this).parents('.search-box').find('.search-result').fadeIn('fast');
    });
	var pretext = $('.header-search .search-box.ajax-form input.search-field').val();
	var forceSearch = false;

    var current_category,current_instuck;
    $('.header-search .search-box.ajax-form .close-popup, .header-search .search-box.ajax-form .search-submit').click( function() {
        forceSearch = true;
        current_category = $(this).parents('.search-box').find('#header-search-cat').val();
        current_instuck = $(this).parents('.search-box').find('#header-search-stock').val();
        $('.header-search .search-box input.search-field').keyup();
        return false;
    });

	var cansend = true;
    var myTimeVar;
    $('.header-search .search-box.ajax-form input.search-field').keyup( function() {
        clearTimeout(myTimeVar);
        var thisItem = $(this);
        var current_text = $(this).val();
        thisItem.parents('.search-box').addClass('loading');
        myTimeVar = setTimeout(function(){
		var content_selector = thisItem.parents('.search-box').find('.search-result');

		var current_type = thisItem.parents('.search-box').attr('data-type');
		current_category = thisItem.parents('.search-box').find('#header-search-cat').val();
		current_instuck = thisItem.parents('.search-box').find('#header-search-stock') !== undefined?thisItem.parents('.search-box').find('#header-search-stock').val():'';
		if(cansend && (current_text != pretext || forceSearch) && current_text != "" && current_text.length > 1){
			cansend = false;
			forceSearch = false;


			content_selector.html('');
			jQuery.post(negarshop_obj.ajax_url, {
				'action': 'negarshop_ajax_search',
				's': thisItem.val(),
				'cat': current_category,
				'stuck': current_instuck,
				'type': current_type,
			}, function(response) {
				if(response.status){
					var html_output = '';
					var i;
					var res_data = response.data;
					if(res_data.length > 0){
						for(i = 0; i< res_data.length; i++){
							html_output = html_output + '<li><a href="'+res_data[i].url+'"><img src="'+res_data[i].thumb+'" alt="'+res_data[i].title+'"/><h3>'+res_data[i].title+'</h3><h6>'+res_data[i].price+'</h6></a></li>';
						}
                        html_output += '<li class="archive">'+defaultText.searchArchive+'<a href="#" onclick="archive_btn()" class="archive-btn btn btn-primary">'+defaultText.searchAllBtn+'</a> </li>';
					}else{
						html_output = '<li class="nothing"><i class="fal fa-times-circle"></i>'+defaultText.searchNotFound+'</li>';
					}
                    content_selector.fadeIn('fast');
					content_selector.html(html_output);
                    thisItem.parents('.search-box').removeClass('loading');
				}
				cansend = true;
			});

		}else{

            thisItem.parents('.search-box').removeClass('loading');
        }
			pretext = current_text;
        }, 1000);
	});
    $('.negar-select').each(function () {
        $(this).select2();
    });
    $('.header-search .search-box button.search-filters').click(function () {
        $(this).parents('.search-box').addClass('show-filters');
    });
    $('.header-search .search-box button.close-popup').click(function () {
        $(this).parents('.search-box').removeClass('show-filters');
    });
    function initOWLCAR(selector){
        selector.each(function(){
            var owlSelector = $(this);
            var owlOptions = {};
            if(owlSelector.attr('data-owl-options') !== undefined){
                owlOptions = JSON.parse(owlSelector.attr('data-owl-options'));
            }
            owlSelector.owlCarousel(owlOptions);
        });
    }
    $(document).ready(function () {
        initOWLCAR($('.inline-owl-carousel'));
    });

    $(document).on('mouseenter', '.is-mega-menu-con.is-product-mega-menu .tabs a[data-query],.is-mega-menu-con.is-two-level-mega-menu .tabs a[data-query]',function() {
        var thisitem = $(this);
        thisitem.parents('.tabs').find('a').removeClass('item-hover');
        thisitem.addClass('item-hover');
        var menu_tab = thisitem.attr('data-tab');
        var content = thisitem.parents('.is-mega-menu-con').find('.contents');
        content.addClass('loading');
        if (!$(this).hasClass('loaded')) {
            var menu_query = thisitem.attr('data-query');
            if (!thisitem.hasClass('loading')) {
                thisitem.addClass('loading');
                content.find('.owl-carousel').removeClass('show');
                jQuery.post(negarshop_obj.ajax_url, {
                    'action': 'negarshop_ajax_megamenu_producs',
                    'query': menu_query,
                    'tab': menu_tab
                }, function(response) {
                    if (response.status) {
                        content.append(response.data.htmlContent);
                        content.find('.tab-'+menu_tab).addClass('show');
                        initOWLCAR(content.find('.tab-'+response.data.classAttr));
                        thisitem.addClass('loaded');
                    }
                    thisitem.removeClass('loading');
                    content.removeClass('loading');
                    thisitem.trigger('mouseenter');
                });
            }
        }else{
            content.removeClass('loading');
            content.find('.owl-carousel').removeClass('show');
            content.find('.tl-tabs').removeClass('show');
            content.find('.tab-'+menu_tab).removeClass('owl-hidden');
            content.find('.tab-'+menu_tab).addClass('show');
        }
    });
    $('ul.main-menu li[data-id]').hover(function() {
        if (!$(this).hasClass('loaded')) {
            var thisitem = $(this);
            var menu_id = thisitem.attr('data-id');
            if (!thisitem.hasClass('loading')) {
                thisitem.addClass('loading');
                jQuery.post(negarshop_obj.ajax_url, {
                    'action': 'negarshop_ajax_megamenu',
                    'menu_id': menu_id
                }, function(response) {
                    if (response.status) {
                        thisitem.append(response.data);
                        thisitem.addClass('loaded');
                        if(response.type === "product"){
                            thisitem.find('.tabs li:first-of-type>a').trigger('mouseenter');
                        }
                        $('.header-main-nav .header-main-menu:not(.vertical-menu) li[data-id]>ul.is-mega-menu-con').width($('.container').width()-20);
                        $('.header-main-nav .header-main-menu.vertical-menu li[data-id]>ul.is-mega-menu-con').width($('.container').width()-275);
                    }
                    thisitem.removeClass('loading');
                });
            }
        }
    });

    $('.header-main-nav .header-main-menu ul.main-menu>li.loaded>a').each(function () {
        if($(this).prev('ul').length == 1){
            var html_OUT = $(this).context.outerHTML;
            $(this).prev('ul').before(html_OUT);
            $(this).prev('ul').find('.tabs ul>li:first-of-type>a').trigger('mouseenter');
            $(this).remove();
            var contSize = $('.container').width(); 
            $('.header-main-nav .header-main-menu:not(.vertical-menu) li[data-id]>ul.is-mega-menu-con').width($('.container').width()-20);
            
            
        }
    });
	$('.header-main-nav .header-main-menu.vertical-menu  li[data-id]>ul.is-mega-menu-con').each(function(){

		if($(this).offset().left<0){
			$(this).width($(this).width() + $(this).offset().left - 15); 
		} 
	});

    $('video[custom-control]').each(function () {
        $(this).after('<button class="btn-play"><i class="fal fa-play"></i></button>');
    });
    $('video[custom-control]+.btn-play').on("click",function () {
        if($(this).find('i').hasClass('fa-pause')){
            $(this).prev("video").get(0).pause();
        }else{
            $(this).prev("video").get(0).play();
        }
        $(this).find('i').toggleClass("fa-pause");
    });



    $("#res-search-show").click(function() {
        $('.res-searchform').addClass('active');
    });
    $("#res-search-close").click(function() {
        $('.res-searchform').removeClass('active');
    });
    $("#header-menu-toggle").click(function() {
        $(".side-nav").addClass('show');
    });
    $(".ui-mask").click(function() {
        $(".side-nav").removeClass('show');
    });
    $(".side-nav nav li.menu-item-has-children, #footer .footer-menu nav.footer-menu li.menu-item-has-children").each(function() {
        $(this).children('a').after('<span class="toggle"><i class="fal fa-angle-down"></i></span>');
    });
    $(".side-nav nav li.menu-item-has-children span.toggle, #footer .footer-menu nav.footer-menu li.menu-item-has-children span.toggle").click(function() {
        $(this).toggleClass('active');
        $(this).next('ul').slideToggle('fast');
    });
    $(window).scroll(function () {
        if($(this).width() < 1200){
            if($(this).scrollTop() > 15){
                $('#responsive-header').addClass('fixed');
            }else{
                $('#responsive-header').removeClass('fixed');
            }
        }
    });


    $('#send-product-email').on("click", function () {
        var thisitem = $(this);
        var post_id = thisitem.attr('data-id');
        var user_email = $('#share-email-address').val();
        if (!thisitem.hasClass('disabled')) {
            thisitem.addClass('disabled');
            jQuery.post(negarshop_obj.ajax_url, {
                'action': 'negarshop_email_sharing',
                'id': post_id,
                'email': user_email,
            }, function (response) {
                var res = defaultText.errorSend;
                var style = "error";
                if (response.status) {
                    res = response.data;
                    style = "success";
                }
                $.notify({
                    message: res,
                }, {
                    // settings
                    element: 'body',
                    position: null,
                    type: style,
                    allow_dismiss: false,
                    newest_on_top: false,
                    placement: {
                        from: "top",
                        align: "right"
                    },
                    z_index: 9999,
                    delay: 2000,
                    timer: 1000,
                });
                thisitem.removeClass('disabled');
            });
        }
    });
    $(document).ready(function () {
    $('.product-additional-items .owl-carousel').owlCarousel({
        rtl: true,
        nav: true,
        dots:false,
        navText: ["<i class='fal fa-angle-right'></i>","<i class='fal fa-angle-left'></i>"],
        responsive : {
            0 : {
                items : 1,
            },
            480 : {
                items : 1,
            },
            700 : {
                items : 2,
            },
            991 : {
                items : 2,
            },
        },
        margin: 20
    });
    });
    if($('.af-add-to-cart .btn').length > 0) {
        var AF_cansend = true;
        var af_add = $('.af-add-to-cart .btn');
        var af_sel = $(".product-additional-items .additional-factor");
        var af_items_sel = $(".product-additional-items input[name*='quantity[']");
        var af_total_sel = $(".product-additional-items .af-total-price .total-count b");
        var af_items_sel_count = af_items_sel.length;
        af_items_sel.on("change", function () {
            var af_total_price = 0;
                var item_ID = parseInt($(this).attr("data-id"));
                if ($(this)[0].checked) {
                    $(this).attr("value","1");
                    af_items_sel_count++;
                } else {
                    $(this).attr("value","0");
                    af_items_sel_count--;
                }
            if(af_items_sel_count==1) {
                $(".product-additional-items input[name*='quantity[']:checked").addClass('disabled');
            }else{
                $(".product-additional-items input[name*='quantity['].disabled").removeClass('disabled');
            }
            if(AF_cansend) {
                af_items_sel.each(function () {
                    if($(this)[0].checked) {
                        af_total_price += parseInt($(this).attr("data-price"));
                    }
                });
                AF_cansend = false;
                af_sel.addClass('loading');
                jQuery.post(negarshop_obj.ajax_url, {
                    'action': 'negarshop_price_html',
                    'int': af_total_price,
                }, function (response) {
                    if(response){
                        af_total_sel.text(af_items_sel_count);
                        $('.product-section.product-additional-items .additional-factor .af-total-price .price').html(response.data);
                    }
                    af_sel.removeClass('loading');
                    AF_cansend = true;
                });
            }
        });
    }
    function arrayEdit(array,item,add){
        if(add) {
            var exist = false;
            for (var KEY in array) {
                if (array[KEY] === item) {
                    exist = true;
                }
            }
            if(!exist){array[array.length] = item;}
        }else{
            for (var KEY in array) {
                if (array[KEY] === item) {
                    array.splice(KEY, 1);
                }
            }
        }
        return array;
    }


    $('.cb-nouislider').each(function () {
        var bigValueSlider = $(this).get(0);
        var slider = noUiSlider.create(bigValueSlider, {
            start: 3,
            step: 1,
            connect: [true, false],
            direction: 'rtl',
            range: {
                min: 1,
                max: 5
            }
        });
        $(this).append('<input type="hidden" name="'+$(this).attr("data-name")+'" value="3" />');
        $(this).append('<span class="level">'+defaultText.medium+'</span>');
        var input_value = $(this).find('input');
        var level_text = $(this).find('.level');
        bigValueSlider.noUiSlider.on('slide.one', function (a) {
            input_value.val(parseInt(a[0]));
            switch (parseInt(a[0])) {
                case 2:
                    level_text.text(defaultText.bad);
                    break;
                case 3:
                    level_text.text(defaultText.medium);
                    break;
                case 4:
                    level_text.text(defaultText.good);
                    break;
                case 5:
                    level_text.text(defaultText.excelent);
                    break;
                default:
                    level_text.text(defaultText.verybad);
                    break;
            }
        });
    });

    $('.cb-chips').each(function () {
        $(this).append('<div class="cb-chips">');
        $(this).append('<div class="add-box"><input type="text" name="'+$(this).attr('data-name')+'[]" placeholder="'+$(this).attr('data-phold')+'" class="text-field"><button class="btn add-item" type="button"><i class="fas fa-plus"></i></button></div>');
        $(this).append('<ul class="chip-items">');
        $(this).append('</ul>');
        $(this).append('</div>');
    });
    $(document).on("keypress",".cb-chips input.text-field",function (e) {
        if(e.which == 13) {
            $(this).parents('.add-box').find('.add-item').click();
            return false;
        }
    });
    $(document).on("click",".cb-chips .add-box .add-item",function () {
        var parent = $(this).parents('.cb-chips');
        var txt_inp = parent.find('.text-field').val();
        if(txt_inp !== "") {
            var div = document.createElement("div");
            div.innerHTML = txt_inp;
            parent.find('.chip-items').prepend('<li><span>' + div.innerText + '</span><button class="remove-item" type="button"><i class="far fa-times"></i></button><input type="hidden" name="' + parent.attr('data-name') + '[]" value="' + txt_inp + '"></li>');
            parent.find('.text-field').val("");
        }
    });
    $(document).on("click",".cb-chips .chip-items .remove-item",function () {
        $(this).parents('li').remove();
    });
    $('.comment-form-cookies-consent').addClass('ns-checkbox');

    function exLikes() {
        $('.comment-like-btn').each(function () {
            var id = $(this).attr('data-id');
            var cookie_name = "comment_like_btn";
            var cookie = getCookie(cookie_name);
            if(cookie === ""){cookie = [];}else{cookie = JSON.parse(cookie);}
            var rate_exists = jQuery.inArray( id, cookie);
            if(rate_exists >= 0){
                $(this).addClass('disabled');
            }
        });
    }
    $(document).on("click", ".comment-like-btn", function () {
        var thisitem = $(this);
        var cookie_name = "comment_like_btn";
        var cookie = getCookie(cookie_name);
        if(cookie === ""){cookie = [];}else{cookie = JSON.parse(cookie);}
        var rate_exists = jQuery.inArray( thisitem.attr('data-id'), cookie);
        if(rate_exists === -1) {
            if (cookie.length === 0) {
                cookie[0] = thisitem.attr('data-id');
                cookie = JSON.stringify(cookie);
                setCookie(cookie_name, cookie, 30, false);
            } else {
                cookie[cookie.length] = thisitem.attr('data-id');
                cookie = JSON.stringify(cookie);
                setCookie(cookie_name, cookie, 30, false);
            }
            if (!thisitem.hasClass('disabled')) {
                thisitem.addClass('disabled');
                $.post(negarshop_obj.ajax_url, {
                    'action': 'cb_comment_rates',
                    'id': thisitem.attr('data-id'),
                    'act': thisitem.attr('data-action'),
                }, function (response) {
                    if (response.status) {
                        thisitem.find('.count').text(response.data);
                        exLikes();
                    }
                    $('.comment-like-btn[data-id="'+thisitem.attr('data-id')+'"]').addClass('disabled');
                });
            }
        }else{
            thisitem.addClass('disabled');
        }
    });

    $('.cb-comment-tabs .cb-tabs a').click(function () {
        var thisitem = $(this);
        if(!thisitem.hasClass('disabled') && !thisitem.hasClass('active')){
            thisitem.addClass('disabled');
            $('.cb_comment_list').addClass('loading');
            $.post(negarshop_obj.ajax_url, {
                'action': 'cb_comment_tabs',
                'id': thisitem.attr('data-id'),
                'order': thisitem.attr('data-order'),
            }, function (response) {
                if (response.status) {
                    $('.cb_comment_list .commentlist').html(response.data);
                    $('.cb-comment-tabs .cb-tabs a').removeClass('active');
                    thisitem.addClass('active');
                    exLikes();
                }
                $('.cb_comment_list').removeClass('loading');
                thisitem.removeClass('disabled');
            });
        }
        return false;
    });
    $('.cb-comment-tabs .cb-tabs li:first-of-type a').click();
    var rltpro = 4;
    if($('body').hasClass('wide-style')){
        rltpro = 5;
    }

    $(document).ready(function () {
    $('.related.products-carousel .owl-carousel').owlCarousel({
        rtl: true,
        nav: true,
        dots:false,
        loop: true,
        navText: ["<i class='fal fa-angle-right'></i>","<i class='fal fa-angle-left'></i>"],
        responsive : {
            0 : {
                items : 1,
            },
            360 : {
                items : 1.5,
            },
            480 : {
                items : 2,
            },
            700 : {
                items : 3,
            },
            991 : {
                items : rltpro,
            },
        },
        margin: 15
    });
    });
    var checkSending = false;
    $("#login-remember").change(function (event) {
        if ($(this).is(":checked")) {
            $(this).val(1);
        } else {
            $(this).val(0);
        }
    });
    $("#login-submit").click(function () {
        var thisitem = $(this);
        var data = $(this).parents('.header-popup-login').serialize();
        var username = $("#login-username").val();
        var password = $("#login-pass").val();
        var remember = $("#login-remember").val();
        if(username !== "" && password !== "") {
            thisitem.attr("disabled", true);
            $("#login-res").text(defaultText.pleaseWait);
            $("#login-res").addClass("d-block");
            if (!checkSending) {
                checkSending = true;
                jQuery.post(negarshop_obj.ajax_url, {
                    'action': 'negarshop_ajax_login',
                    'username': username,
                    'password': password,
                    'remember': remember,
                    'other': data
                }, function (response) {
                    $("#login-res").text(response.data);
                    $("#login-res").addClass(response.type);
                    if (response.status === true) {
                        location.reload();
                    }
                    thisitem.attr("disabled", false);
                    checkSending = false;
                });
            }
        }
        return false;
    });
    $('form.header-popup-login input').on('keypress',function (e) {
        if(e.which == 13) {
            $("#login-submit").trigger('click');
        }
    });
    $(".variations_form.cart select").each(function () {
        $(this).addClass('form-control');
    });
    $(".dokan-btn, .sms-notif-submit").each(function () {
        $(this).removeClass('dokan-btn');
        $(this).addClass('btn');
    });
    $(".dokan-btn-theme, .sms-notif-submit").each(function () {
        $(this).removeClass('dokan-btn-theme');
        $(this).addClass('btn-primary');
    });
    $('#yith-wcwtl-output .button').addClass('btn');
    $('.summary.entry-summary #yith-wcwtl-output').remove();
    $('ul.product-categories li.cat-parent>a').on("click",function(){
        $(this).next("ul").slideToggle("fast");
        $(this).parents('li').toggleClass('open');
        return false;
    });
    $('[data-toggle="tooltip"]').tooltip();
    $(document).on('click', '.ns-popup-btn', function () {
        var mdl_selector = $(this).attr('data-toggle');
        $(mdl_selector).addClass('active');
    });
    $(document).on('click', '.ns-popup-close', function () {
        $(this).parents('.ns-popup').removeClass('active');
    });
    $(document).on('click', '.ns-closer', function () {
        $(this).prev('.ns-popup').removeClass('active');
    });
    $('.sec-sticky').each(function () {
        var thisIitem = $(this);
        $(this).after('<div class="sticky-space" style="height: '+$(this).height()+'px"></div>');
        if($(window).width()>991){
            var firstOff = thisIitem.offset().top;
            $(window).scroll(function () {
                var item = thisIitem;
                if($(window).scrollTop() >= firstOff){
                    if(!item.hasClass('fixed')) {
                        item.addClass('fixed');
                    }
                }else{
                    if(item.hasClass('fixed')) {
                        item.removeClass('fixed');
                    }
                }
            });
        }
    });

    $(document).ready(function($) {
        if ($.isFunction(window.background)) {
            $('.background-video').background();
        }
    });
    $.fn.wc_variations_current = false;
    $.fn.wc_variations_image_update = function( variation ) {
        var $form             = this;
            if (variation && variation.cb_var_gallery && variation.cb_var_gallery.length > 1) {
                $.fn.wc_gallery_items_count = variation.cb_var_gallery.length;
                var html_output = '<div class="owl-carousel wc-product-carousel images">';
                jQuery.each(variation.cb_var_gallery, function (loopi, imgitem) {
                    imgitem = imgitem['large'];
                    html_output += '<div class="car-dtag" data-src="' + imgitem + '">';
                    html_output += '<a href="' + imgitem + '" class="img-magnifier-container"><img class="product-gallery-img" data-magnify-src="' + imgitem + '" src="' + imgitem + '" alt="' + (loopi+1) + '" id="wc-carousel-image-' + loopi + '" /></a>';
                    html_output += '</div>';
                });
                html_output += '</div>';
                html_output += '<div class="owl-carousel wc-product-carousel-thumbs">';
                jQuery.each(variation.cb_var_gallery, function (loopi, imgitem) {
                    imgitem = imgitem['thumb'];
                    html_output += '<img src="' + imgitem + '" alt="' + loopi + '" />';
                });
                html_output += '</div>';
                if($.fn.wc_variations_current !== html_output) {
                    jQuery('.product .woocommerce-product-gallery').html(html_output);
                    CBinitProductGallery();
                }
                $.fn.wc_variations_current = html_output;
            } else {
                if($.fn.wc_variations_current !== $.fn.wc_product_def_gallery) {
                    $form.wc_variations_image_reset();
                }
            }

            window.setTimeout(function () {
                $(window).trigger('resize');
                $form.wc_maybe_trigger_slide_position_reset(variation);
                $('.owl-carousel.wc-product-carousel').trigger('to.owl.carousel', 100);
            }, 20);

    };
    $.fn.wc_variations_image_reset = function() {
        if($.fn.wc_variations_current !== $.fn.wc_product_def_gallery) {
            jQuery('.product .woocommerce-product-gallery').html($.fn.wc_product_def_gallery);
            CBinitProductGallery();
        }
        $.fn.wc_variations_current = $.fn.wc_product_def_gallery;
    };
    $('.horz-res-scroll').each(function () {
        $(this).wrap('<div class="hrs-outer"></div>');
        var outer = $(this).parent();
        outer.append('<button class="btn hts-btn hrs-next-btn"><i class="far fa-angle-left"></i></button>');
        outer.prepend('<button class="btn hts-btn hrs-prev-btn" style="display: none"><i class="far fa-angle-right"></i></button>');
    });
    $('.hrs-outer .hts-btn').click(function () {
        var tag = $(this).parent().find('.horz-res-scroll');
        var ts = $(this);
        if($(this).hasClass('hrs-next-btn')){
            tag.stop().animate({scrollLeft: tag.scrollLeft()-100}, 400, function () {
                if(tag.scrollLeft()>=0){
                    ts.parent().find('.hrs-prev-btn').fadeOut('fast');
                }else{
                    ts.parent().find('.hrs-prev-btn').fadeIn('fast');
                }
            });
        }else{
            tag.stop().animate({scrollLeft: tag.scrollLeft()+100}, 400, function () {
                if(tag.scrollLeft()>=0){
                    ts.parent().find('.hrs-prev-btn').fadeOut('fast');
                }else{
                    ts.parent().find('.hrs-prev-btn').fadeIn('fast');
                }
            });
        }

    });

    $(document).on('click','.sidebar.shop-archive-sidebar.acc-widgets section.widget:not(.show)',function () {
        $('.sidebar.shop-archive-sidebar.acc-widgets section.widget.show').not(this).children('*:not(.wg-header)').slideUp('fast');
        $('.sidebar.shop-archive-sidebar.acc-widgets section.widget.show').not(this).removeClass('show');
        $(this).children('*').slideDown('fast');
        $(this).addClass('show');
    });

    $(document).ready(function () {
        setTimeout(function () {
            $('.carousel .carousel-item img:not(.loaded)').each(function () {
                $(this).attr("src",$(this).attr("data-src"));
                $(this).addClass('loaded');
            });
        },1000);
        $('#shipping_city, #billing_city').addClass('form-control');
        $('.negarshop-countdown').each(function () {
            var date= '0000/00/00';
            if($(this).attr("data-date") !== undefined){
                date = $(this).attr("data-date");
            }
            $(this).countdown(date, function(event) {
                $(this).html(event.strftime('<div class="inner"><span class="countdown-section"><span class="countdown-amount">%D</span><span class="countdown-period">روز</span></span><span class="countdown-section"><span class="countdown-amount">%H</span><span class="countdown-period">ساعت</span></span><span class="countdown-section"><span class="countdown-amount">%M</span><span class="countdown-period">دقیقه</span></span><span class="countdown-section"><span class="countdown-amount">%S</span><span class="countdown-period">ثانیه</span></span></div>'));
            });
        });
    });
    $('.crunchify-clipboard').click(function () {
        var copyText = document.getElementById("product-url-inpt");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    });

    $(document).on('click','.shop-archive-sidebar .section-close',function () {
        $(this).parents('.shop-archive-sidebar').removeClass('show');
        return false;
    });
    $(document).on('click','.shop-filters-show',function () {
        $('.shop-archive-sidebar').addClass('show');
        return false;
    });

    $(document).on('submit','#product-survey-form',function () {
        if($("body").hasClass('logged-in')) {
            var formData = {};
            formData['action'] = 'negarshop_product_survey_ajax';
            formData['answ'] = 'no';
            $(this).find("input[name]").each(function (index, node) {
                formData[node.name] = node.value;
            });
            if ((formData['desc1'] !== undefined && formData['desc1'] !== "") || (formData['desc2'] !== undefined && formData['desc2'] !== "")) {
                var self = $(this);
                self.addClass('loading');
                jQuery.post(negarshop_obj.ajax_url, formData, function (response) {
                    self.removeClass('loading');
                    if (response.status) {
                        $('#product-survey').modal('hide');
                        self.remove();
                        $('.entry-summary .product-survey').addClass('sent');
                    } else {
                        $.notify({
                            message: response.data,
                        }, {
                            // settings
                            element: 'body',
                            position: null,
                            type: 'error',
                            allow_dismiss: false,
                            newest_on_top: false,
                            placement: {
                                from: "top",
                                align: "right"
                            },
                            z_index: 9999,
                            delay: 2000,
                            timer: 1000,
                        });
                    }
                });
            }
        }else{
            $('#login-popup-modal').modal('show');
        }
        return false;
    });
    $(document).on('click','.product-survey .btn.yes',function () {
        if($("body").hasClass('logged-in')) {
            var formData = {};
            formData['action'] = 'negarshop_product_survey_ajax';
            formData['answ'] = 'yes';
            formData['product'] = $(this).attr('data-product');
            var self = $(this).parents('.product-survey');
            self.addClass('loading');
            jQuery.post(negarshop_obj.ajax_url, formData, function (response) {
                self.removeClass('loading');
                if (response.status) {
                    self.addClass('sent');
                } else {
                    $.notify({
                        message: response.data,
                    }, {
                        // settings
                        element: 'body',
                        position: null,
                        type: 'error',
                        allow_dismiss: false,
                        newest_on_top: false,
                        placement: {
                            from: "top",
                            align: "right"
                        },
                        z_index: 9999,
                        delay: 2000,
                        timer: 1000,
                    });
                }
            });
        }else{
            $('#login-popup-modal').modal('show');
        }
        return false;
    });
    $('.woocommerce nav.woocommerce-MyAccount-navigation ul li.res-toggle-menu').click(function () {
        $(this).toggleClass('show');
        return false;
    });
    $('#login-popup-modal').on('show.bs.modal', function (e) {
        if(!$("body").hasClass('pop-up-login')) {
            window.location.href = negarshop_obj.my_account;
            return false;
        }
    });
})(jQuery);

function archive_btn() {
    jQuery('.header-search form.form-tag').submit();
}
jQuery(document).ready(function(a){"use strict";a(".show-ywsl-box").on("click",function(b){b.preventDefault(),a(".ywsl-box").slideToggle()}),"#_=_"==window.location.hash&&(history.replaceState?history.replaceState(null,null,window.location.href.split("#")[0]):window.location.hash="")});
jQuery(document).ready(function(a){"use strict";var b=function(){var b=a(document).find("#yith-wcwtl-email"),c=b.parents("#yith-wcwtl-output").find("a.button"),d=c.attr("href");b.length&&b.on("input",function(a){var e=b.val(),f=b.attr("name");c.prop("href",d+"&"+f+"="+e)})};b(),a("form.variations_form").on("show_variation",b),a(document).on("qv_loader_stop",b)});