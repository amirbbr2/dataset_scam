
(function (e) {
    "use strict";
    var n = window.TWP_JS || {};
    n.Navigation_Bar = function () {
        e("#search,#search-close").on("click",function(){
          e("#search-field").slideToggle();
          e("#nav-latest-news-field").removeClass("twp-open");
        })
        e("#trending-btn,#latest-news-close").on("click",function(){
            e("#search-field").slideUp();
            e("#nav-latest-news-field").toggleClass("twp-open");
        })

        // offcanvas
        e("#twp-nav-off-canvas").sidr({
          displace: false,
        });
        
        e('.sidr-class-sidr-button-close').click(function () {
            e.sidr('close', 'sidr');
        });

        //added arrow
        var menuId= document.getElementById("primary-nav-menu");
        if( menuId!='' ){
          e("#primary-nav-menu.menu>li").has('ul').addClass("down-arrow");
          e("#primary-nav-menu.menu>li>ul li").has('ul').addClass("right-arrow");
        }
       
    },
  
    n.stickyHeader = function () {
      var header = document.getElementById("site-navigation");
      var sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
       
      }
      
    }
    n.stickyScroll = function () {
      var header = document.getElementById("site-navigation");
      var sticky = header.offsetTop;
      var scrollUp = e("#scroll-top");
      var footerHeight = e("#colophon").outerHeight();
      if (window.pageYOffset > sticky) {
        scrollUp.css({"bottom":footerHeight+50}).addClass("show");
      } else {
        scrollUp.css({"bottom":-100}).removeClass("show");
      }
      e('#scroll-top a').on('click', function(event) {
        var target = e('#page');
        event.preventDefault();
        e('html, body').stop().animate({
            scrollTop: target.offset().top - 30
        }, 500);
    
      });

    }
    n.stickeyTicker = function() {
      var header = document.getElementById("site-navigation");
      var tickerSlider = document.getElementById("twp-ticker-slider");
      var footer = document.getElementById("colophon");
      var sticky = header.offsetTop;
      e(window).on("scroll",function(){
        if (window.pageYOffset > sticky) {
          tickerSlider.classList.add("show");
          footer.classList.add("show");
        } else {
          tickerSlider.classList.remove("show");
          footer.classList.remove("show");
        }
      })
      

      e("#twp-ticker-close").on("click",function(){
        e("#twp-ticker-slider").removeClass("twp-ticker-active").removeClass("show");
        e("#twp-ticker-open-section").addClass("show").removeClass("close");
        e("#colophon").removeClass("footer-active");
      })
      e("#twp-ticker-open").on("click",function(){
        e("#twp-ticker-open-section").removeClass("show").addClass("close");
        e("#twp-ticker-slider").addClass("twp-ticker-active").addClass("show");
        e("#colophon").addClass("footer-active")
      })
    }

    n.DataBackground = function () {
        var pageSection = e(".data-bg");
        pageSection.each(function (indx) {

            if (e(this).attr("data-background")) {
                e(this).css("background-image", "url(" + e(this).data("background") + ")");
            }
        });

        e('.bg-image').each(function () {
            var src = e(this).children('img').attr('src');
            e(this).css('background-image', 'url(' + src + ')').children('img').hide();
        });
    },
    
    n.slider = function () {
    e(".twp-related-articles-slider").slick({
          dots: false,
          infinite: false,
          speed: 300,
          slidesToShow: 6,
          slidesToScroll: 6,
          
          responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                }
              },
              {
                breakpoint: 991,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
             
            ]
      }),
      e(".twp-banner-article-slider,.wp-block-gallery.columns-1,.gallery-columns-1").slick({
          autoplay:true,
          dots: true,
          infinite: false,
          speed: 300,
          arrow: false,
          slidesToShow: 1,
          slidesToScroll: 1,
      })
      e(".twp-ticker-pin-slider").slick({
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        swipeToSlide: true,
        centerMode: true,
        focusOnSelect: true,
        responsive: [
                {
                  breakpoint: 750,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                  }
                }
        ]
      })
      
    },
    n.galleryMagnificPopUp = function () {
        e('.wp-block-gallery,.gallery').each(function () {
          e(this).magnificPopup({
              delegate: 'a',
              type: 'image',
              closeOnContentClick: false,
              closeBtnInside: false,
              mainClass: 'mfp-with-zoom mfp-img-mobile',
              image: {
                  verticalFit: true,
                  titleSrc: function (item) {
                      return item.el.attr('title');
                  }
              },
              gallery: {
                  enabled: true
              },
              zoom: {
                  enabled: true,
                  duration: 300,
                  opener: function (element) {
                      return element.find('img');
                  }
              }
          });
      });
    },

    n.mobileMenu = function () {
      e("#twp-menu-icon").on("click",function(){
        e(".twp-mobile-menu").addClass("show");
        e("#primary-nav-menu").clone().appendTo(".twp-mobile-menu");
        e("#overlay").toggleClass("show");
        e("body").css("overflow","hidden");
      })
      e("#twp-mobile-close,#overlay").on("click",function(){
          e(".twp-mobile-menu").removeClass("show");
          e(".twp-mobile-menu #primary-nav-menu").remove();
          e("#overlay").toggleClass("show");
          e("body").css("overflow","visible");
      })
    },
    n.minHeight = function () {
       var headerHeight = e("#masthead").outerHeight();
       var breadcumHeight = e(".twp-breadcrumbs").outerHeight();
       var footerHeight = e("#colophon").outerHeight();
       var windowHeight = e(window).height();
       var contentMinHeight = ( windowHeight - 30 ) - ( headerHeight + breadcumHeight  + footerHeight);
      e(".twp-min-height").css("minHeight",contentMinHeight);
    }


    n.twp_sticky_banner_slider = function () {
      jQuery('.banner-sticky-sidebar, .widget-area').theiaStickySidebar({
          additionalMarginTop: 30
      });
    },
      e(window).on('load', function () { 
        e('#status').fadeOut(); 
        e('#preloader').delay(350).fadeOut('slow');  
        e('body').delay(350).css({ 'overflow': 'visible' });
     })

    e(document).ready(function () {
        n.Navigation_Bar(), n.DataBackground(),n.slider(),n.mobileMenu(),n.twp_sticky_banner_slider(),n.galleryMagnificPopUp(), n.stickeyTicker(),n.minHeight();
    }), e(window).scroll(function () {
          n.stickyHeader(),n.stickyScroll();
    }),e(window).resize(function(){
      n.minHeight();
    })

})(jQuery);