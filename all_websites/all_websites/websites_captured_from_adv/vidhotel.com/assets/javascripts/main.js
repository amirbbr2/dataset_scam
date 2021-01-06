$(document).ready(function() {

    $('.chat-form textarea').on('keypress', function(e) {
        if (e.which == 13 && !e.shiftKey) {
            e.preventDefault();
            $this = $(this);

            $this.closest('form').submit();
        }
    });

    comment();

    var languageTrigger = $('.language-changer.langs');
    var languageTriggerValue = languageTrigger.data('value');
    var langages = $('.languages-list.langs');

    langages.find("[data-name='" + languageTriggerValue + "']").css('display', 'none');

    var modTrigger = $('.language-changer.mode');
    var modTriggerValue = modTrigger.data('value');
    var mods = $('.languages-list.mode');
    console.log(modTriggerValue);
    console.log(mods);
    mods.find("[data-name='" + modTriggerValue + "']").css('display', 'none');

    $('.language-changer.langs').on('click', function () {
        var $trigger = $(this);
        var $holder = $($trigger.data('holder'));
        var $target = $holder.find($trigger.data('target'));
        var effect = $trigger.data('effect');
        var targetWidth = $target.width();

        if ($holder.hasClass('open') === false) {
            if (effect == 'slide') {
                $target.css('marginRight', -targetWidth).animate({ marginRight: '0' });;
            }
            $holder.addClass('open');
            $trigger.addClass('active');
        } else {
            if (effect == 'slide') {
                $target.animate({ marginRight: '-' + targetWidth });
            }
            $holder.removeClass('open');
            $trigger.removeClass('active');
        }
    });

    $('.language-changer.mode').on('click', function () {
        var $trigger = $(this);
        var $holder = $($trigger.data('holder'));
        var $target = $holder.find($trigger.data('target'));
        var effect = $trigger.data('effect');
        var targetWidth = $target.width();

        if ($holder.hasClass('open') === false) {
            if (effect == 'slide') {
                $target.css('marginRight', -targetWidth).animate({ marginRight: '0' });;
            }
            $holder.addClass('open');
            $trigger.addClass('active');
        } else {
            if (effect == 'slide') {
                $target.animate({ marginRight: '-' + targetWidth });
            }
            $holder.removeClass('open');
            $trigger.removeClass('active');
        }
    });

    $('.sub-menu-trigger').on('click', function () {
        var $trigger = $(this);
        var target = $trigger.data('target');
        var $target = $(target);

        if($target.is(":visible")){
            $target.slideUp();
            $trigger.parent().removeClass('open');
        }else{
            $target.slideDown();
            $trigger.parent().addClass('open');
        }
    });

    $('button.copy').on('click', function(){
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(this).data('route')).select();
        document.execCommand("copy");
        $temp.remove();

        $(this).parent().addClass('copied');
    });

    $(".copy-to-clip").click(function(){
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(this).data('url')).select();
    document.execCommand("copy");
    $temp.remove();

    $(this).text('Link copied!')
  });

    $('.view.owl-carousel').each(function(index, owlItem){
        var btn = $(owlItem).data('btn');
        var $btn = $(btn);
        var $owl = $(this);

        $owl.owlCarousel({
            margin:20,
            smartSpeed:250,
            dots:false,
            nav:false,
            loop:( $('.view.owl-carousel .grid').length > 4 ),
            responsiveRefreshRate:0,
            responsive:{
                0:{items:1},
                768:{items:2},
                1000:{items:3},
                1150:{items:4}
            }
        });

        // Go to next item
        $btn.click(function() {
            $owl.trigger('next.owl.carousel');
        });

    });

    $(window).scroll(function(){
        var headerHeight = $('header.main').height();
        var headerNavHeight = 0;

        var sticky = $('header.main'),
            scroll = $(window).scrollTop(),
            stickySection = $('.wrapper');

        if (scroll >= headerHeight) {
            sticky.addClass('fixed');
            stickySection.addClass('sticky');
        } else if (scroll <= headerNavHeight){
            sticky.removeClass('fixed');
            stickySection.removeClass('sticky');
        }

    });

    if (typeof rows != 'undefined' && parseInt(rows) == 0){
        $('#submission').attr('disabled', 'disabled');
    }

    $('#submission').bind('change keyup', function(event) {

        var value = '';
        var splitval = $(this).val().split("\n");

        for(var a=0;a<rows && typeof splitval[a] != 'undefined';a++) {
            if(a>0) value += "\n";
            value += splitval[a];
        }

        $(this).val(value);
        if (parseInt(rows) > 0) {
            $('.options-btn').text(parseInt(rows) + 1 - parseInt(a));
        }

    });

    $('a.reply').on('click', function () {
        var replyForm = $($(this).data('target'));
        if (replyForm.is(":visible")) {
            replyForm.slideUp();
        }else{
            replyForm.slideDown();
        }
    });

    $('button.vote').click(function(){
        var $trigger = $(this);
        var $parent = $trigger.parent();

        if ($parent.hasClass('voted') !== true) {
            var action = $trigger.data('action');
            var route = $parent.data('route');
            var token = $parent.data('token');
            var counter = $trigger.parent().siblings('.comment-body').find('.likes-count span');
            var currentElementCount = parseInt(counter.text());

            $.post(route, {'action': action, '_token': token}, function (response) {
                if (response.status == "OK") {
                    $parent.addClass('voted');
                    counter.text(currentElementCount + 1);
                } else {
                    console.log(response.message);
                }
            }, 'json')
                .fail(function(xhr, status, error) {
                    if (xhr.responseJSON.message == 'Your email address is not verified.') {
                        location.href = '/email/verify';
                    }
                });
        }
    });

    $('.remove').click( function( event ) {
        event.preventDefault();
        event.stopPropagation();

        var $trigger = $(this);
        var $parent = $trigger.parent();

        var action = $trigger.data('action');
        var route = $parent.data('route');
        var token = $parent.data('token');

        $.post(route, {'action': action, '_token': token}, function (response) {
            if (response.status == "OK") {
                window.location.reload();
            } else {
                console.log(response.message);
            }
        }, 'json')
            .fail(function(xhr, status, error) {
                if (xhr.responseJSON.message == 'Your email address is not verified.') {
                    location.href = '/email/verify';
                }
            });
    } );


    $('#save').click(function(event){
        event.preventDefault();
        var $trigger = $(this);
        var $parent = $trigger.parent();

        var action = $trigger.data('action');
        var route = $parent.data('route');
        var token = $parent.data('token');

        if ($parent.hasClass('watch-later') !== true) {

            $.post(route, {'action': action, '_token': token}, function (response) {
                if (response.status == "OK") {
                    $parent.addClass('watch-later');
                } else {
                    console.log(response.message);
                }
            }, 'json')
                .fail(function(xhr, status, error) {
                    if (xhr.responseJSON.message == 'Your email address is not verified.') {
                        location.href = '/email/verify';
                    }
                });
        }else{
            $.post(route, {'action': action, '_token': token}, function (response) {
                if (response.status == "OK") {
                    $parent.removeClass('watch-later');
                } else {
                    console.log(response.message);
                }
            }, 'json')
                .fail(function(xhr, status, error) {
                    if (xhr.responseJSON.message == 'Your email address is not verified.') {
                        location.href = '/email/verify';
                    }
                });
        }
    });

    $('.options-btn').on('click', function(e){
            $(this).siblings('ul').toggleClass('active');
    });

    $('.comment-order').click( function( event ) {
        event.preventDefault();
        event.stopPropagation();

        var $trigger = $(this);
        var $parent = $trigger.parent();

        var action = $trigger.data('action');
        var route = $parent.data('route');
        var token = $parent.data('token');

        $.post(route, {'action': action, '_token': token}, function (response) {
            $('#main-comments-list').fadeOut(500, function() {
                $(this).html(response.comments).fadeIn(500);

                $('img.lazy').lazy({
                    bind: "event"
                });
            });
        }, 'json')
            .fail(function(xhr, status, error) {
                if (xhr.responseJSON.message == 'Your email address is not verified.') {
                    location.href = '/email/verify';
                }
            });
    } );

});

function comment(){
    $('.comments-form textarea').on('keypress', function(e) {
        if (e.which == 13 && ! e.shiftKey) {
            e.preventDefault();
            $this = $(this);

            var $form = $this.parent().closest('form');
            var formURL = $form.attr('action');
            var formData = $form.serialize();

            var $replyForm = $this.parent().parent();

            var ajax = $.ajax({
                method: 'POST',
                cache: false,
                url: formURL,
                data: formData,
                success: function (response) {
                    var $response = $(response).hide();

                    if ($this.parent().siblings('button').attr('name') == 'reply') {
                        $replyForm.slideUp();
                        $form.siblings('.comments-list').prepend($response);

                        if (!$form.parent().hasClass('has-replies')) {
                            $form.parent().addClass('has-replies');
                        }
                    }else{
                        $('#main-comments-list').prepend($response);
                    }

                    $('img.lazy').lazy({
                        bind: "event"
                    });

                    $response.slideDown('slow');
                    $form.find('textarea').val('');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.responseJSON.message == 'Your email address is not verified.') {
                        location.href = '/email/verify';
                    }
                }
            });

            ajax.fail(function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('An error occured while posting your comment, please try again.');

                if (XMLHttpRequest.responseJSON.message == 'Your email address is not verified.' || XMLHttpRequest.responseJSON.message == 'Unauthenticated.') {
                    location.href = '/email/verify';
                }

                if (XMLHttpRequest.responseJSON.message == 'Unauthenticated.') {
                    location.href = '/login';
                }
            });

            return false;
        }
    });

    $('button.send-comment').click(function (event) {
        event.preventDefault();
        $this = $(this);

        var $form = $this.closest('form');
        var formURL = $form.attr('action');
        var formData = $form.serialize();
        var $replyForm = $this.parent();

        var ajax = $.ajax({
            method: 'POST',
            cache: false,
            url: formURL,
            data: formData,
            success: function (response) {
                var $response = $(response).hide();

                if ($this.attr('name') == 'reply') {
                    $replyForm.slideUp();
                    $form.siblings('.comments-list').prepend($response);

                    if (!$form.parent().hasClass('has-replies')) {
                        $form.parent().addClass('has-replies')
                    }
                }else{
                    $('#main-comments-list').prepend($response);
                }

                $('img.lazy').lazy({
                    bind: "event"
                });

                $response.slideDown('slow');
                $form.find('textarea').val('');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.responseJSON.message == 'Your email address is not verified.') {
                    location.href = '/email/verify';
                }
            }
        });

        ajax.fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('An error occured while posting your comment, please try again.');

            if (XMLHttpRequest.responseJSON.message == 'Your email address is not verified.' || XMLHttpRequest.responseJSON.message == 'Unauthenticated.') {
                location.href = '/email/verify';
            }

            if (XMLHttpRequest.responseJSON.message == 'Unauthenticated.') {
                location.href = '/login';
            }
        });

    });
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(element).select();
  document.execCommand("copy");
  $temp.remove();
}
