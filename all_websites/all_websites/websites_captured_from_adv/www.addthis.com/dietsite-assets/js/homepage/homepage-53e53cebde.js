$(document).ready(function () {
    // video pop up
    $('.video-graphic a, .video a').magnificPopup({
        type: 'iframe',

        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
                }
            }
        }
    })

    $('.tool-tabs li').on('click', function (e) {
        e.preventDefault()

        $('.tool-tabs li').removeClass('active')
        $(this).addClass('active')

        var target = $(this).attr('href')
        $(target).addClass('show').siblings('.module').removeClass('show')
    });
})