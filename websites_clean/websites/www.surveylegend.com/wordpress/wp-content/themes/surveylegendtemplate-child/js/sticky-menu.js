jQuery(document).ready(function () {
    var $ = jQuery

    function throttle(callback, limit) {
        var wait = false
        return function () {
            if (!wait) {
                callback.apply(null, arguments)
                wait = true
                setTimeout(function () {
                    wait = false
                }, limit)
            }
        }
    }

    var $window = $(window)

    $window.bind('scroll', throttle(function () {
        var navHeight = 1
        var hmenuBg = $('#SL-hmenu-bg')
        var hmenu = $('ul.SL-hmenu')
        var secondaryNav = $('.SL-secondary-navigation')
        var topBtn = $('.top-action-button')

        if ($window.scrollTop() > navHeight) {
            hmenuBg.addClass('menuFixedBg')
            hmenu.addClass('menuFixed')
            secondaryNav.addClass('after-scroll')
            topBtn.removeClass('top-action-button-before-scroll')
        } else {
            hmenuBg.removeClass('menuFixedBg')
            hmenu.removeClass('menuFixed')
            secondaryNav.removeClass('after-scroll')
            topBtn.addClass('top-action-button-before-scroll')
        }

        $('a.SL-menu-btn').attr('title', 'Navigate')
    }, 200))


    $(document).on('click', 'a.SL-secondary-navigation-item[href^="#"]', function (event) {
        event.preventDefault()

        if (history.replaceState) {
            history.replaceState(null, null, $.attr(this, 'href'))
        } else {
            document.location.hash = $.attr(this, 'href')
        }

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500)
    })

    $('.lightbox').click(function () {
        $(this).toggleClass('lightbox-is-opened')
    })

    $('.lightbox-close').click(function () {
        $('.lightbox').removeClass("lightbox-is-opened")
    })

})
