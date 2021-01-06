jQuery(document).ready(function () {
    var $ = jQuery
    var fullPageEl = $('#fullpage')
    if (!fullPageEl || fullPageEl.length === 0) {
        return
    }

    var chartAnimationTimer, autoSlideTimer

    function handleSlide(anchorLink, index) {
        if (anchorLink === 'our-customers' && window.logoBubbles) {
            window.logoBubbles.playing = true

            window.requestAnimationFrame(window.logoBubbles.tick)
        } else if (window.logoBubbles) {
            window.logoBubbles.playing = false
        }

        if (anchorLink === 'collect-and-analyze-data') {
            if (!chartAnimationTimer) {
                var config = {
                    growSmall: {
                        start: 20,
                        end: 50
                    },
                    growMedium: {
                        start: 40,
                        end: 80
                    },
                    growLarge: {
                        start: 70,
                        end: 100
                    }
                }
                var animated = $('.survey-data-chart .bar')

                function animate() {
                    animated.each(function (index, el) {
                        var c = $(el)
                        var key = c.attr('class').split(' ').pop()
                        if (key && typeof config[key] === 'object') {
                            var grow = config[key]
                            var range = grow.end - grow.start
                            var variation = Math.floor(Math.random() * range)
                            var percent = grow.start + variation
                            c.animate({
                                height: percent + '%'
                            }, 400)
                        }
                    })
                }

                chartAnimationTimer = setInterval(animate, 2500)
            }
        } else {
            if (chartAnimationTimer) {
                clearInterval(chartAnimationTimer)
                chartAnimationTimer = null
            }
        }
    }

    fullPageEl.fullpage({
        slidesNavigation: true,
        verticalCentered: false,
        css3: true,
        navigation: true,
        loopBottom: true,
        navigationPosition: 'right',
        lazyLoading: false,

        afterRender: function () {
            $('.section').addClass('page-is-ready')
        },

        afterLoad: handleSlide,

        onLeave: function (index, nextIndex, direction) {
            var section = $('.section')
            if (direction === 'down') {
                section.removeClass('moveDown').addClass('moveUp')
            } else if (direction === 'up') {
                section.removeClass('moveUp').addClass('moveDown')
            }

            if (index == 5) {
                if (direction === 'down') {
                    section.eq(index - 1).removeClass('earth-down').addClass('earth-up')
                } else if (direction === 'up') {
                    section.eq(index - 1).removeClass('earth-up').addClass('earth-down')
                }
            }

            // use the following if you want to specify which slide (index) should get a specific class
            // if (index == 5 && direction == 'down'){
            // 	$('.section').eq(index -1).removeClass('moveDown').addClass('moveUp')
            // }
            // else if(index == 5 && direction == 'up'){
            // 	$('.section').eq(index -1).removeClass('moveUp').addClass('moveDown')
            // }
            // =========

            // $('#staticImg').toggleClass('active', (index == 2 && direction == 'down' ) || (index == 4 && direction == 'up'))
            // $('#staticImg').toggleClass('moveDown', nextIndex == 4)
            // $('#staticImg').toggleClass('moveUp', index == 4 && direction == 'up')
        },

        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {

            // Adds classes to trigger tap animations
            if (anchorLink === 'create-design-share-surveys') {
                var delay = 10

                if (slideAnchor === 'first-slide') {
                    $('.tap-nps').addClass('tap-effect')
                    delay = 6
                } else {
                    $('.tap-nps').removeClass('tap-effect')
                }

                if (slideAnchor === 'second-slide') {
                    $('.tap-theme-1, .tap-theme-2, .tap-theme-3').addClass('tap-effect')
                } else {
                    $('.tap-theme-1, .tap-theme-2, .tap-theme-3').removeClass('tap-effect')
                }

                if (slideAnchor === 'second-slide' || slideAnchor === 'first-slide') {
                    if (autoSlideTimer) {
                        clearTimeout(autoSlideTimer)
                        autoSlideTimer = null
                    }
                    autoSlideTimer = setTimeout(function () {
                        $.fn.fullpage.moveSlideRight()
                        autoSlideTimer = null
                    }, delay * 1000)
                } else {
                    clearTimeout(autoSlideTimer)
                    autoSlideTimer = null
                }
            }

            // Auto Slide
            var currentSlide = $(this)

            if (currentSlide.hasClass('auto-slide')) {
                if (slideAnchor === 'first-slide') {
                    $('.fp-prev').hide()
                } else {
                    $('.fp-prev').show()
                }

                if (slideAnchor === 'last-slide') {
                    $('.fp-next').hide()
                } else {
                    $('.fp-next').show()
                }
            }

        }
    })
})
