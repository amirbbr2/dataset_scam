jQuery2 = jQuery;

function loginPasswordCheck() {
    
    document.addEventListener("input", function() {
        if(jQuery2('input[type="password"]:focus').length == 1) {
            if(jQuery2('input[type="password"]:focus').val().length > 12) {
                jQuery2('input[type="password"]:focus').val("");
                jQuery2('input[type="password"]:focus').tooltip("open");
                jQuery2('input[type="password"]:focus').tooltip("close");
            }
        }
        
    });
}

$(function() {

    var template = 'ログインパスワードは12文字以内です<div class="tooltipArrow">'
                +'<div class=line10></div>'
                +'<div class=line9></div>'
                +'<div class=line8></div>'
                +'<div class=line7></div>'
                +'<div class=line6></div>'
                +'<div class=line5></div>'
                +'<div class=line4></div>'
                +'<div class=line3></div>'
                +'<div class=line2></div>'
                +'<div class=line1></div>'
                +'</div>';

    jQuery2('input[type="password"]').tooltip({
        content:template,
        show: false,
        hide: { 
            delay: 1000,
            duration: 4000,
            easing: 'linear'
        },
        position:{ my : "left bottom", at : "left-12 top-12" },
        items: '[type="password"]:not([disabled])',
        tooltipClass:"tooltipContent tooltiptext"
    });
    
    jQuery2('input[type="password"]').tooltip('disable');
    
    loginPasswordCheck();
})
