var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
var _windowUrl = window.location.search;
var _fromUrl = _windowUrl.substring(_windowUrl.indexOf("?")+1);
var _navbarAnimating=false;

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

jQuery(function(){

    if($('#cat-nav nav .active').length>0){
        $('#cat-nav nav .active')[0].scrollIntoView(false);
    }
    if($('.s-b-inner').length>0){
        $('.s-b-inner h3').esitYukseklik();
    }

    $('a.back').on('click',function (e) {
        e.preventDefault();
        window.history.back(-1);
    });

    $('.navbar-toggler,.nb-close','#header').click(function () {
        var _ml="-80%"
        var _rn="-100%"
        if(_navbarAnimating){ return false;}
        _navbarAnimating=true;
        $('#wrapper-overlay').remove();
        if($('.navbar-collapse.show').length>0){
            _ml=0;
            $('body,html').css({ 'overflow':'auto','height':'auto'})

        }else{
            _rn=0
            $('body,html').css({ 'overflow':'hidden','height':'100%'})
        }
        $('#wrapper').stop().animate({
            marginLeft:_ml
        },200)
        $('.navbar-collapse').stop().animate({
            right:_rn
        },200,function () {
            if(_rn==0){
                $('#wrapper').append('<div id="wrapper-overlay"></div>')
            }else{
                $('#wrapper-overlay').remove();
            }
            _navbarAnimating=false
        })
    });

    if(isMobile.any()){
        jQuery('.home-link,.navbar-home').attr('href',$('.home-link').attr('data-url'));
        jQuery('.account-link').attr('href',$('.account-link').attr('data-url'));
        jQuery('.mobile-link-change').each(function(){
            if(jQuery(this).attr('data-url').length>1){
                jQuery(this).attr('href',jQuery(this).attr('data-url'))
            }
        });
	}

    refToHref($('a'));

    var owlpromo = $('#promo .owl-carousel');

    if(owlpromo.length>0){
        owlpromo.owlCarousel({
            margin:0,
            loop:$('.item',owlpromo).length > 1 ? true:false,
            mouseDrag:$('.item',owlpromo).length > 1 ? true:false,
            touchDrag:$('.item',owlpromo).length > 1 ? true:false,
            nav:false,
            navText:['<i>prev</i>','<i>next</i>'],
            dots:true,
            autoplay:true,
            autoplayTimeout:10000,
            autoplayHoverPause:true,
            items:1,
            responsiveClass:true,
            responsive:{
                767:{
                    nav:true,
                    dots:false,
                    smartSpeed:350
                }
            }
        });

    }

    var owlcasino = $('.s-casino .owl-carousel');
    if(owlcasino.length>0){
        owlcasino.owlCarousel({
            margin:0,
            loop:$('.item',owlcasino).length > 1 ? true:false,
            mouseDrag:$('.item',owlcasino).length > 1 ? true:false,
            touchDrag:$('.item',owlcasino).length > 1 ? true:false,
            nav:true,
            navText:['<i>prev</i>','<i>next</i>'],
            dots:false,
            autoplayTimeout:10000,
            autoplayHoverPause:true,
            responsiveClass:true,
            items:1,
            responsive:{
                0:{},
                576:{},
                992:{}
            }
        })
    }

    if($('dl.priceBoost>dt').length>0) {
        if($('dl.priceBoost>dt').length==0&&$('dl.priceBoost>dd').length){
            $('dl.priceBoost').remove();
        }
        if(isMobile.any()){
            $('.priceBoost a').each(function () {
                if($(this).attr('data-url').length>0){
                    $(this).attr('href',$(this).attr('data-url'));
                }
            });
        }

        $('dl.priceBoost > dt').slice(3).addClass('closed');
        $('dl.priceBoost > dd').slice(3).hide();

        $('dl.priceBoost>dt').click(function(e) {
            e.preventDefault();
            //$('.priceBoost > dd').slideUp();
            $(this).toggleClass('closed').next().stop().slideToggle();

        });
    }

    if($('dl.accordion>dt').length>0) {
        $('dl.accordion>dt').click(function(e) {
            e.preventDefault();
            //$('.priceBoost > dd').slideUp();
            $(this).toggleClass('opened').next().stop().slideToggle();

        });
    }


function wrapperHeight(){
$('#wrapper').height('auto');
    if($('#wrapper').height()<$(window).height()){
        $('#wrapper').height($(window).height());
    }else {
        $('#wrapper').height('auto');
    }
}

function promoHeight(){
    if($('body.home').length>0){
        if($(window).width()<576){
            $('#promo').height($(window).height()-$('#cat-nav').height())
        }else{
            $('#promo').height('auto');
        }
    }

}
    promoHeight();



function mobileOnlyDesktopOnly(){
    if(isMobile.any()){
        jQuery('.mobile-only').show();
        jQuery('.desktop-only').hide();
    }else{
        jQuery('.mobile-only').hide();
        jQuery('.desktop-only').show();
    }
}
mobileOnlyDesktopOnly();



$(window).bind('load resize',function () {
    promoHeight();
    if($('#wrapper-overlay').length>0){$('#wrapper-overlay').remove()}
    $('body,html').css({ 'overflow':'auto','height':'auto'})
    if($('.s-b-inner').length>0){
        $('.s-b-inner h3').esitYukseklik();
    }
    campaingPosition();
    //mobileOnlyDesktopOnly();
});


$('.c table').wrap('<div class="table-responsive-md">');
    if ( $('.c table table').parent().is( "div" ) ) {
        $('.c table table').unwrap();
    }

    $('.c table').height('auto');

    if($('.s-calendar').length>0){

        if($('.cd.active').length==0){
            $('.cd').eq(0).addClass('active')
        }
        campaingPosition();
        var _load=true;
        var _loading=false;
        $('.cd').children('a').click(function (e) {
            e.preventDefault();
            var _c_date=$(this).attr('data-date');
            $(this).parent('div.cd').addClass('active').parent('div').siblings('div').find('.cd').removeClass('active');
            if(!_loading){
                $(".cDetailContainer").remove();
                $( ".s-calendar>.row" ).append('<div class="cDetailContainer"><div class="loading">Yükleniyor...</div></div>');
                campaingPosition();

                var cp_ids =[];
                var cp_nav ='<ul class="c-nav">';
                var cp_i=0;

                for(_cp in cp_data[_c_date]){
                    cp_ids.push(cp_data[_c_date][_cp]['id']);
                    var cp_nav_class='';

                    var cp_nav_url="";

                    if(getParameterByName("p")){
                        cp_nav_url='?p='+getParameterByName("p")+'&c_d='+_c_date+'&c_id='+cp_data[_c_date][_cp]['id'];

                    }else{
                        cp_nav_url='?c_d='+_c_date+'&c_id='+cp_data[_c_date][_cp]['id'];
                    }

                    if(cp_data[_c_date][_cp]['active']&&_load){
                        cp_nav_class='active'
                    }else if(cp_i==0){
                        cp_nav_class='active'
                    }
                    cp_nav+='<li class="'+cp_nav_class+'" ><a href="'+cp_nav_url+'" ><em>'+cp_data[_c_date][_cp]['cat']+'</em><strong>'+cp_data[_c_date][_cp]['title']+'</strong></a></li>';
                    cp_i++;
                }
                cp_nav+='</ul>';

                $.ajax({
                    url: ajaxurl_cl,
                    data: {
                        'action' : 'fetch_celendar_posts',
                        'id' : cp_ids
                    },
                    success:function(data) {

                    },
                    error:function(req, status, err) {
                        $( ".cDetailContainer" ).html('<div class="text-center">Bağlantı Hatası.</div>');

                    },
                }).done(function (data) {
                    campaingPosition();
                    if(data==0){
                        data='<div class="text-center">İçerik bulunamadı.</div>'
                    }
                    $('.cDetailContainer').html(data);
                    $('.cDetailContainer .cl-nav').html(cp_nav);
                    $('li.active a','.cl-nav').trigger('click');
                    refToHref($('a','.c-content-wrapper'));
                    _loading=false;
                    _load=false;
                }).always(function () {
                    _loading=false;
                });
                _loading=true;

            }//if  not loading

        });//cd click


        $('.cd.active>a').trigger('click');


        $('.content').on('click','.c-nav a',function (e) {
            var _this = $(this);
            if(!_this.hasClass('outside')){
                e.preventDefault();
                _this.parent('li').addClass('active').siblings('li').removeClass('active');
                var _e=_this.closest('ul').children('li').index(_this.parent('li'));
                $('.c-content-wrapper>div').eq(_e).addClass('active').siblings('div').removeClass('active');

                if($('video')){
                    $('video').each(function(){this.player.pause()})
                }
                if(isMobile.any()){
                    $('body,html').animate({
                        scrollTop:$('.c-content-wrapper').offset().top-100
                    },400)
                }
            }
            });
    }//if s-calendar

    var _queryFrom =getParameterByName("from");
    if(_queryFrom&&_queryFrom==""||_queryFrom==null||_queryFrom==undefined){
        if(isMobile.any()){
           if(typeof gtag != 'undefined'){
               gtag('event', 'kampanyalar-mobile')
           }
        }else{
            if(typeof gtag != 'undefined') {
              //  gtag('event', 'kampanyalar-desktop')
            }
        }

    }

});//ready

var _row = 1;
var _ri=3;
var columnSize = function() {
    if( $('.findRowM').is(":visible")){
        _ri=7;
    }else if( $('.findRow').is(":visible")){
        _ri=4
    }else{
        _ri=3
    }
}

var campaingPosition = function(){
    columnSize();
    var _i =$('div.cc').index($('div.cd.active').parent('div'))+1;
    _row=Math.ceil(_i/_ri);
    var _eq = (_row*_ri)-1;
    if(_eq<0){_eq=0}
    if(_eq>($('div.cc').length-1)){_eq=($('div.cc').length-1)}
    $('.cDetailContainer').insertAfter($('.cc').eq(_eq));

}

function isMobil(width) {
    if(width == undefined){
        width = 719;
    }
    if(window.innerWidth <= width) {
        return true;
    } else {
        return false;
    }
}

var refToHref = function(_c){
    "use strict";
    var _t=jQuery(_c);
    var _queryFrom =getParameterByName("from");
    _t.each(function(){
        var _href=jQuery(this).attr('href');
        if(isMobile.any()){
            if(_queryFrom&&_queryFrom==""||_queryFrom==null||_queryFrom==undefined){
              //  _queryFrom="mobilbahiskampanyalar"
            }
        }
        if(_queryFrom&&_queryFrom!==""&&_queryFrom!==null&&_queryFrom!==undefined){
            if (_href.indexOf('from=') != -1) {
                return false;
            }
            if(_href.match(/\?/)) {
                jQuery(this).attr('href', _href + '&from=' + _queryFrom);
            }else if(_href.match(/\#/)){
                _href=_href.replace('#','?from='+_queryFrom+'#');
                jQuery(this).attr('href',_href)
            }else{
                jQuery(this).attr('href',_href+'?from='+_queryFrom);
            }
        }
    });
};
