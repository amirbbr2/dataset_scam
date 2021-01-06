$(function () {
    $("link[href*='key=noscript-menu-style']").remove();
    $(".menuRootUl li").hoverIntent(
        {
            over: function () {
                var childUl=$(">ul",this);
                if(childUl.css("display")=="none") {
                    childUl.stop(true,true).animate({
                        height: ['toggle','easeInOutQuint'],
                        opacity: '0.98'
                    });
                }
            },
            out: function () {
                var childUl=$(">ul",this);
                if(childUl.css("display")!="none") {
                    childUl.stop(true,true).animate({
                        height: ['toggle','easeInOutQuint'],
                        opacity: '0'
                    });
                }
            }
            ,timeout: 500
        }).each(function () {
            $(">ul",this).css("opacity","0").hide();
        });
});

