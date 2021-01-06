
/* Document Ready */
(function(){
    $('.first,.second,.third').css('height',$(window).height());

}());
/* Document Ready */

/* Window Resize */
$(window).resize(function(){
    $('.first,.second,.third').css('height',$(window).height());
});
/* Window Resize */

/* Document Scroll */
$(document,'body').scroll(function(){

    var _scrollTop = parseInt($(document,'body').scrollTop()) +200 ;

    var _firstTop = $('.first').offset().top;
    var _secondTop = $('.second').offset().top;
    var _thirdTop = $('.third').offset().top;


    // Second
    if(
        _scrollTop > _secondTop && _scrollTop < _thirdTop
        ){
        $('.main-menu .scrollAdvertise').addClass('active');
    }else{
        $('.main-menu .scrollAdvertise').removeClass('active');
    }

    // Third
    if(
        _scrollTop > _thirdTop
        ){
        $('.main-menu .scrollMonetise').addClass('active');
    }else{
        $('.main-menu .scrollMonetise').removeClass('active');
    }

});
/* Document Scroll */


/* Mouse Move Functions */
(function(){
    $.validator.addMethod("full_url", function(val, elem) {

        if (val.length == 0) { return true; }

        if(!/^(https?|ftp):\/\//i.test(val)) {
            val = 'http://'+val; // set both the value
            $(elem).val(val); // also update the form element
        }

        return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);

    });
    $('body',document)
        .on('click', function(e){
            if(!$(e.target).hasClass('ul-drop') && !$(e.target).hasClass('ul-trigger'))
            {
                $('.ul-drop').removeClass('active');
            }
        })
        /*  User Popover */
        .on('click','.ul-trigger',function(){
            $('.ul-drop').toggleClass('active');
        })

        /* Scroll Advertise */
        .on('click','.logo',function(){
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        })
        /* Scroll Advertise */
        .on('click','.scrollAdvertise',function(){
            var _secondTop = $('.second').offset().top;
            $('html, body').animate({
                scrollTop: _secondTop
            }, 600);
        })
        /* Scroll Monetise */
        .on('click','.scrollMonetise',function(){
            var _thirdTop = $('.third').offset().top;
            $('html, body').animate({
                scrollTop: _thirdTop
            }, 600);
        });

    $("#advertiser_signup_form").validate({
        rules: {
            "companysite":{full_url:true}
        },

        messages: {
            "companysite":{full_url: "Please enter a valid URL."}
        },
        submitHandler: function(form) {
            $.ajax({
                url: '/signup_advertiser',
                type: 'post',
                data: $('#advertiser_signup_form').serialize(),
                beforeSend: function(){
                    $("#advertiser_signup_button").attr("disabled", "disabled").find("i").removeClass('fa-check-circle').addClass('fa-circle-o-notch fa-spin');
                    $('#advertiser_signup_form').find(".form_error").hide();
                },
                success: function(data) {
                    if(data == "OK")
                    {
/*                        window.fcWidget.user.setEmail($('#advertiser_email').val());
                        window.fcWidget.user.setFirstName($('#advertiser_firstname').val());
                        window.fcWidget.user.setLastName($('#advertiser_lastname').val());*/
                        $('#advertiser_signup_form').hide();
                        $("#thank_advertiser").show();
                    }
                    else
                    {
                        $('#advertiser_signup_form').find(".form_error").text(data).show();
                    }
                },
                complete: function(){
                    $("#advertiser_signup_button").removeAttr("disabled").find("i").removeClass('fa-circle-o-notch fa-spin').addClass('fa-check-circle');
                }
            });
        }

    });

    $("#publisher_signup_form").validate({
        submitHandler: function(form) {
            $.ajax({
                url: '/signup_publisher',
                type: 'post',
                data: $('#publisher_signup_form').serialize(),
                beforeSend: function(){
                    $("#publisher_signup_button").attr("disabled", "disabled").find("i").removeClass('fa-check-circle').addClass('fa-circle-o-notch fa-spin');
                    $('#publisher_signup_form').find(".form_error").hide();
                },
                success: function(data) {
                    if(data == "OK")
                    {
/*                        window.fcWidget.user.setEmail($('#publisher_email').val());
                        window.fcWidget.user.setFirstName($('#publisher_firstname').val());
                        window.fcWidget.user.setLastName($('#publisher_lastname').val());*/
                        $('#publisher_signup_form').hide();
                        $("#thank_publisher").show();
                    }
                    else
                    {
                        $('#publisher_signup_form').find(".form_error").text(data).show();
                    }
                },
                complete: function(){
                    $("#publisher_signup_button").removeAttr("disabled").find("i").removeClass('fa-circle-o-notch fa-spin').addClass('fa-check-circle');
                }
            });
        },
        rules: {
            "publishersite":{full_url:true}
        },

        messages: {
            "publishersite":{full_url: "Please enter a valid URL."}
        }
    });


})();
/* Mouse Move Functions */

