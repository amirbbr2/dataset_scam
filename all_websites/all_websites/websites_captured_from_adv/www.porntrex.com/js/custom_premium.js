$(document).ready(function(){
    if ($.cookie("premium_popup") == null) {
        $('.pop-premium').removeClass('hidden');
    }
    $('body').on('click', '.close-premium', function(ev) {
        var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1);
        document.cookie = "premium_popup=hidden; path=/; expires=" + date.toUTCString();
        $('.pop-premium').remove();
    });

    $(".premium-player").appendTo(".fp-ui");


    $('body').on('click', '.fp-settings-list a', function(e){
        e.preventDefault();
        var a = $(this).attr('href');
        if (a != '') {
          console.log(1)
          $(".premium-player").show()
        } else {
          console.log(2)
        }
    });

    if($('#kt_player').hasClass('.kt-player')) {
      player_obj.listen('ktVideoStarted', function() {$(".premium-player").hide()});

    }





    // $('body').on('click', '.premium-form .policy label', function(ev) {

    //     if ($('.premium-form .policy .checkbox').get(0).checked == true)
    //     {
    //         $('.premium-form .submit').attr("disabled", "disabled");
    //     }
    //     else
    //     {
    //         $('.premium-form .submit').removeAttr("disabled");
    //     }
    // });

})

// $('.premium-form .policy .checkbox').get(0).checked