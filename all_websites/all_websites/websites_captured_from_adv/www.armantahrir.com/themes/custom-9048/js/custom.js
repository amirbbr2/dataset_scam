$(document).ready(function() {
    function suggestionRoll() {
        $('.main-row-box-suggestion-header').removeClass('active');
        $('.main-row-box-suggestion .owl-carousel').trigger('next.owl.carousel');
        $('.main-row-box-suggestion-header').addClass('active');
    }
    setInterval(function() {
        suggestionRoll();
    }, 7000);
    suggestionRoll();

    $('.footer-scroll-top').click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 600);
        //return false;
    })

	/* megaMenuTwo */
	$('.navbar-mega-two-container').hover(function(e) {
		$('.mega-menu-two-title').addClass('hovered');
		$('.navbar-mega-two-context').show();
	},
	function() {
		$('.navbar-mega-two-context').hide();
		$('.mega-menu-two-title').removeClass('hovered');
	});
});