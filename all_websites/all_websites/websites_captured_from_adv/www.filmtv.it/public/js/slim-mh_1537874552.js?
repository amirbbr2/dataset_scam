// to fix adv masthead on mobile
(function(w,d) {
    // the class that take care of listeners and fixing the header
    var advHandler = function() {
        this.is720 = false;
        // check first if mm_stript1 event size is 720
        googletag.pubads().addEventListener('slotRenderEnded', function (e) {
            if (mm_stript1 && e.slot === mm_stript1) { // only for mm_stript1
                if (Array.isArray(e.size) && e.size[0] === 720 && e.size[1] === 240) {
                    this.is720 = true;
                }
            }
        }.bind(this));
        // eventually after the resize by header.js I can maybe fix the header
        googletag.pubads().addEventListener('slotOnload', function (e) {
            if (mm_stript1 && e.slot === mm_stript1 && this.is720) {
                this.maybeFixHeader();
            }
        }.bind(this));
        // check if we have to fix the header
        this.maybeFixHeader = function() {
            var adv = d.getElementById('adv-gpt-masthead-leaderboard-container1'),
                wrap = d.getElementById('strip_adv');
            if (adv && wrap) {
                this.fixHeader(adv, wrap);
            }
        };
        // fix adv
        this.fixHeader = function(adv, wrap) {
            var rect = adv.getBoundingClientRect(),
                advOffset = adv.offsetTop;
            // styles for adv and wrapper
            var advFixedStyle = 'position: fixed;' +
                'top: ' + advOffset + ';' +
                'left: ' + rect.left + ';' +
                'width: ' + rect.width + ';' +
                'z-index: 99;';
            var wrapFixedStyle = 'position: initial;' +
                'width: ' + rect.width + 'px;' +
                'height: ' + rect.height + 'px;';
            // fix adv and set placeholder
            setTimeout(function() {
                adv.style.cssText = advFixedStyle;
                wrap.style.cssText = wrapFixedStyle;
            }, 500);
            setTimeout(function() {
                adv.removeAttribute('style');
                wrap.style.cssText = 'position: initial;';
            }, 3500);
        };
    };
    // activate feature only on mobile
    if (w.matchMedia("(max-width: 480px)").matches) {
        // Make sure that googletag.cmd exists.
        w.googletag = w.googletag || {};
        googletag.cmd = googletag.cmd || [];
        // queue our listener
        googletag.cmd.push(advHandler);
    }
})(window, document);