(function() {
    function logoBubbles(options) {
        var lb = this

        for (option in options) {
            lb[option] = options[option]
        }

        (function(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var rand = Math.floor(Math.random() * (i + 1))
                    var temp = array[i]
                    array[i] = array[rand]
                    array[rand] = temp
                }
        })(lb.logos)

        lb.noiseT = 0
        lb.scrollX = 0
        lb.vertShrink = 0
        lb.playing = false
        lb.logosLoaded = false

        // add vert and horizontal limit

        rectInViewport()

        window.addEventListener("scroll", rectInViewport)

        function preloadLogos(url) {
            var img = new Image()

            img.onload = function() {
                lb.logosLoaded = true
            }

            img.src = url
        }

        preloadLogos("/wordpress/wp-content/themes/surveylegendtemplate-child/images/customers/logos.png")

        for (var i = 0; i < lb.bubbles.length; i++) {
            var bubble = lb.bubbles[i]
            var logo = i % lb.logos.length

            bubble.scale = bubble.scale || 1
            bubble.seedX = 1e4 * Math.random()
            bubble.seedY = 1e4 * Math.random()
            bubble.noiseX = bubble.noiseY = 0
            bubble.introDelay = Math.random() * lb.introDelay
            bubble.introProgress = 0
            bubble.el = document.createElement("div")
            bubble.el.className = lb.classPrefix + lb.logos[logo].className
            bubble.tagEl = document.createElement("span")
            bubble.tagEl.innerHTML = lb.logos[logo].name
            bubble.el.appendChild(bubble.tagEl)

            bubbleIntro(bubble)

            lb.container.appendChild(bubble.el)
        }

        function rectInViewport() {
            var rect = lb.container.getBoundingClientRect()

            if ((rect.bottom < 0 || rect.top > window.innerHeight) && 1 == lb.playing) {
                lb.playing = false
            } else if (rect.bottom > 0 && rect.top < window.innerHeight && 0 == lb.playing) {
                lb.playing = true

                window.requestAnimationFrame(function(step) {
                    lb.tick(step)
                })
            }
        }

        function bubbleIntro(bubble) {
            var x = bubble.x + bubble.noiseX + lb.scrollX
            var y = bubble.y + bubble.noiseY

            if (x < -200) {
                bubble.x += lb.containerWidth
            }

            var progress = bc(bubble.introProgress)
            var scale = progress / 20 + 0.95
            scale *= bubble.scale

            bubble.el.style.opacity = progress
            bubble.el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
        }

        function bc(progress) {
            return progress < .5 ? 2 * progress * progress : (4 - 2 * progress) * progress - 1
        }

        lb.firstTick = null
        lb.lastTick = 0

        lb.tick = function(step) {
            lb.firstTick || (lb.firstTick = step)

            var tickProgress = (step -= lb.firstTick) - lb.lastTick

            lb.lastTick = step
            lb.noiseT += tickProgress * lb.noiseSpeed
            lb.scrollX -= tickProgress * lb.scrollSpeed

            for (var i = 0; i < lb.bubbles.length; i++) {
                var bubble = lb.bubbles[i]

                bubble.noiseX = noise(bubble.seedX + lb.noiseT) * lb.noiseScale - lb.noiseScale / 2
                bubble.noiseY = noise(bubble.seedY + lb.noiseT) * lb.noiseScale - lb.noiseScale / 2

                if (lb.logosLoaded && bubble.introProgress < 1 && step > bubble.introDelay) {
                    bubble.introProgress = Math.min(1, bubble.introProgress + tickProgress / lb.introDuration)
                }

                bubbleIntro(bubble)
            }

            if (lb.playing) {
                window.requestAnimationFrame(lb.tick)
            }
        }
    }

    docReady(function() {
        var options = {
            bubbles: getBubbles(),
            logos: getLogos(),
            classPrefix: "icon icon--",
            containerSelector: ".icons-container",
            containerWidth: 3e3,
            containerHeight: 460,
            maxShrink: 0.2,
            noiseSpeed: 55e-6,
            noiseScale: 80,
            scrollSpeed: 0.025,
            introDelay: 1500,
            introDuration: 1500
        }

        options.container = document.querySelector(options.containerSelector)
        if (!options.container) {
            return // Couldn't find container on page, exit early
        }

        window.logoBubbles = new logoBubbles(options)
    })

    // General helpers
    function docReady(fn) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            setTimeout(fn, 1)
        } else {
            document.addEventListener("DOMContentLoaded", fn)
        }
    }

    // Logo bubble helpers
    function getBubbles() {
        return [
            {
                scale: 0.6,
                x: 1134,
                y: 45
            },
            {
                scale: 0.6,
                x: 1620,
                y: 271
            },
            {
                scale: 0.6,
                x: 1761,
                y: 372
            },
            {
                scale: 0.6,
                x: 2499,
                y: 79
            },
            {
                scale: 0.8,
                x: 2704,
                y: 334
            },
            {
                scale: 0.6,
                x: 2271,
                y: 356
            },
            {
                scale: 0.6,
                x: 795,
                y: 226
            },
            {
                scale: 0.6,
                x: 276,
                y: 256
            },
            {
                scale: 0.6,
                x: 1210,
                y: 365
            },
            {
                scale: 0.6,
                x: 444,
                y: 193
            },
            {
                scale: 0.6,
                x: 2545,
                y: 387
            },
            {
                scale: 0.8,
                x: 1303,
                y: 193
            },
            {
                scale: 0.8,
                x: 907,
                y: 88
            },
            {
                scale: 0.8,
                x: 633,
                y: 320
            },
            {
                scale: 0.8,
                x: 323,
                y: 60
            },
            {
                scale: 0.8,
                x: 129,
                y: 357
            },
            {
                scale: 0.8,
                x: 1440,
                y: 342
            },
            {
                scale: 0.8,
                x: 1929,
                y: 293
            },
            {
                scale: 0.8,
                x: 2135,
                y: 198
            },
            {
                scale: 0.8,
                x: 2276,
                y: 82
            },
            {
                scale: 0.8,
                x: 2654,
                y: 182
            },
            {
                scale: 0.8,
                x: 2783,
                y: 60
            },
            {
                x: 1519,
                y: 118
            },
            {
                x: 1071,
                y: 233
            },
            {
                x: 1773,
                y: 148
            },
            {
                x: 2098,
                y: 385
            },
            {
                x: 2423,
                y: 244
            },
            {
                x: 901,
                y: 385
            },
            {
                x: 624,
                y: 111
            },
            {
                x: 75,
                y: 103
            },
            {
                x: 413,
                y: 367
            },
            {
                x: 2895,
                y: 271
            },
            {
                x: 1990,
                y: 75
            }
        ]
    }
    function getLogos() {
        return [
            {
                name: "adidas",
                className: "adidas"
            },
            {
                name: "Adobe",
                className: "adobe"
            },
            {
                name: "airbnb",
                className: "airbnb"
            },
            {
                name: "Bosch",
                className: "bosch"
            },
            {
                name: "Chipotle",
                className: "chipotle"
            },
            {
                name: "Cleveland Clinic",
                className: "cleveland-clinic"
            },
            {
                name: "Coca-Cola",
                className: "coca-cola"
            },
            {
                name: "Disney",
                className: "disney"
            },
            {
                name: "Dribbble",
                className: "dribbble"
            },
            {
                name: "Gameloft",
                className: "gameloft"
            },
            {
                name: "Greenpeace",
                className: "greenpeace"
            },
            {
                name: "Harding University",
                className: "harding-university"
            },
            {
                name: "Harvard University",
                className: "harvard-university"
            },
            {
                name: "Instacart",
                className: "instacart"
            },
            {
                name: "Kellogg's",
                className: "kelloggs"
            },
            {
                name: "LEGO",
                className: "lego"
            },
            {
                name: "L'Oréal",
                className: "loreal"
            },
            {
                name: "Lufthansa",
                className: "lufthansa"
            },
            {
                name: "Mango",
                className: "mango"
            },
            {
                name: "Netflix",
                className: "netflix"
            },
            {
                name: "Nike",
                className: "nike"
            },
            {
                name: "OpenTable",
                className: "opentable"
            },
            {
                name: "PayPal",
                className: "paypal"
            },
            {
                name: "pepsi",
                className: "pepsi"
            },
            {
                name: "Qatar Airlines",
                className: "qatar-airlines"
            },
            {
                name: "Red Bull",
                className: "red-bull"
            },
            {
                name: "Region Skåne",
                className: "region-skane"
            },
            {
                name: "Roche",
                className: "roche"
            },
            {
                name: "Rolls-Royce",
                className: "rolls-royce"
            },
            {
                name: "Royal Mail",
                className: "royal-mail"
            },
            {
                name: "Samsung",
                className: "samsung"
            },
            {
                name: "Shopify",
                className: "shopify"
            },
            {
                name: "Sony",
                className: "sony"
            },
            {
                name: "Sony Global Education",
                className: "sony-global-education"
            },
            {
                name: "Tommy Hilfiger",
                className: "tommy-hilfiger"
            },
            {
                name: "Uber",
                className: "uber"
            },
            {
                name: "Unilever",
                className: "unilever"
            },
            {
                name: "Virgin Airlines",
                className: "virgin-airlines"
            },
            {
                name: "Visma",
                className: "visma"
            }
        ]
    }

    // Noise generation helpers
    var perlin

    var perlin_zwrapb = 8
    var perlin_zwrap = 1 << perlin_zwrapb
    var perlin_size = 4095
    var perlin_octaves = 4
    var perlin_amp_falloff = 0.5

    function scaled_cosine(i) {
        return 0.5 * (1 - Math.cos(i * Math.PI))
    }
    function noise(x) {
        if (perlin == null) {
            perlin = new Array(perlin_size + 1)

            for (var i = 0; i < perlin_size + 1; i++) {
                perlin[i] = Math.random()
            }
        }

        if (x < 0) {
            x = -x
        }

        var xi = Math.floor(x)
        var xf = x - xi
        var rxf

        var r = 0
        var ampl = 0.5

        var n

        for (var o = 0; o < perlin_octaves; o++) {
            rxf = scaled_cosine(xf)
            n = perlin[xi & perlin_size]
            n += rxf*(perlin[xi + 1 & perlin_size] - n);
            r += n * ampl
            ampl *= perlin_amp_falloff
            xi <<= 1

            if ((xf *= 2) >= 1) {
                xi++
                xf--
            }
        }

        return r
    }
})()
