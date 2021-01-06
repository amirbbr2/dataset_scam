//$.noConflict();
//jQuery(document).ready(function($) {

(function ($) {

    function ratingThumbs(element) {

        $(document).on('click', element + ' [data-vote]', function (e) {
            e.preventDefault();

            var that = $(this);
            var contentID = that.parents('.rating-thumbs').attr('data-content');
            var contentType = that.parents('.rating-thumbs').attr('data-type');
            var voteType = that.attr('data-vote');
            var totalValue = that.parents('.rating-thumbs').find('.total-value');

            $.ajax({
                type: 'POST',
                url: _basehttp + '/includes/ajax.rating_thumbs.php',
                data: 'content=' + contentID + '&type=' + contentType + '&vote=' + voteType,
                dataType: 'json',
                success: function (data) {
                    if (data.error == 'true') {
                        alert(data.info);
                    } else if (data.error == 'false') {
                        totalValue.html(data.totalRating);
                        that.parents('.rating-thumbs').addClass('voted');
                    }
                    ;
                }
            });
        });

    }
    
    function videoMenu(trigger) {
        
        trigger.on("click", function(e)  {
            
            e.preventDefault();
            
            if ( $(this).attr('data-toggle') === 'hide' ) {
                $(this).attr('data-toggle', 'show');
                $(this).parent().addClass('open');
            } else {
                $(this).attr('data-toggle', 'hide');
                $(this).parent().removeClass('open');
            }
        });
        
    }
    
    $(document).ready(function () {

        $('.header-first-row').noisy({
            'intensity': 1,
            'size': 200,
            'opacity': 0.122,
            'fallback': '',
            'monochrome': false
        });

        $('.owl-carousel').owlCarousel({
            items: 6,
            nav: true,
            navText: false,
            dots: false,
            loop: true,
            responsive: {
                0: {items: 1},
                481: {items: 2},
                768: {items: 3},
                1040: {items: 5},
                1470: {items: 6}
            }
        });
        $('.owl-carousel2').owlCarousel({
            items: 5,
            nav: true,
            navText: false,
            dots: false,
            loop: true,
            responsive: {
                0: {items: 1},
                481: {items: 2},
                768: {items: 3},
                1040: {items: 4},
                1470: {items: 5}
            }
        });

        nhancedBootstrapCollapse({
            trigger: "#search-trigger", // trigger element
            target: "#search-block", // target element
            anywhereClose: true, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "s-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: "#menu-trigger", // trigger element
            target: "#menu-block", // target element
            anywhereClose: true, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "m-open", // class added to body when element is active
            maxRes: 1121 // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: "#embed-trigger", // trigger element
            target: "#embed-dropdown", // target element
            anywhereClose: true, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "e-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: "#ucp-trigger", // trigger element
            target: "#user-logged-list", // target element
            anywhereClose: true, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "ucp-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: "#zone-trigger", // trigger element
            target: "#zone-drop", // target element
            anywhereClose: true, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "zone-open", // class added to body when element is active
            area: ".zone-list",
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: "#most-trigger", // trigger element
            target: "#most-drop", // target element
            anywhereClose: true, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "most-open", // class added to body when element is active
            area: ".most-list",
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: "#video-trigger", // trigger element
            target: "#video-drop", // target element
            anywhereClose: true, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "video-open", // class added to body when element is active
            area: ".video-list",
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: ".respond-trigger", // trigger element
            target: "#respond-drop", // target element
            anywhereClose: false, // if clicked anywhere -true: close, false:nothing
            ajaxLinks: true,
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "respond-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: ".quote-trigger", // trigger element
            target: "#quote-drop", // target element
            anywhereClose: false, // if clicked anywhere -true: close, false:nothing
            ajaxLinks: true,
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "quote-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: "#ug-trigger", // trigger element
            target: "#ug-drop", // target element
            anywhereClose: false, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "ug-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });
        nhancedBootstrapCollapse({
            trigger: ".edit-trigger", // trigger element
            target: ".edit-video-form", // target element
            anywhereClose: false, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "edit-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });        
        nhancedBootstrapCollapse({
            trigger: ".btn-add-thread", // trigger element
            target: "#new-thread-form", // target element
            anywhereClose: false, // if clicked anywhere -true: close, false:nothing
            anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed // USE "target" to select target element ;)
            anywhereCloseBlockingMaxRes: false, // max resolution to click anywhere and close
            area_class: "new-post-open", // class added to body when element is active
            maxRes: false // class when element is hidden
        });

        $.scrollUp({
            scrollText: "",
            easingType: 'easeInOutQuart',
            animation: 'fade',
            animationInSpeed: 200,
            animationOutSpeed: 200
        });

        $('.ms-col').responsiveEqualHeightGrid();
        $('.col-one-third').responsiveEqualHeightGrid();

        ratingThumbs('.rating-thumbs');

        $('.selectpicker').selectpicker();

        $(document).on('touchend click','.respond-trigger', function () {
            
            var replyID = $(this).data('id');
            var replyVal = $(this).closest('.comment').find('.commentText').html();
            var replyUser = $(this).closest('.comment').find('.user').html();
            
            $('#quote').val('');                
            $('#reply').val('');       
            $('#respond-drop .sub-label').html('');
            $('#quote-drop .sub-label').html('');            
            
            if ($('.quote-trigger').hasClass('active')) {
                $('.quote-trigger').removeClass('active').addClass('collapsed');
                $('#quote-drop').collapse('hide').attr("aria-expanded", "false").css("height", "0");
                $('body').removeClass('quote-open');
            }
            
            if ($('.respond-trigger').hasClass('active')) {
                $('#reply').val(replyID);
                $('#respond-drop .sub-label').html('"' + replyVal + '"');
                $('#respond-drop .label').html('Reply to  ' + replyUser);
                $('body').scrollTo('#before-repost', 500); 
            }
        });

        $(document).on('touchend click','.quote-trigger', function () {
            
            var quoteVal = $(this).closest('.comment').find('.commentText').html();
            var replyUser = $(this).closest('.comment').find('.user').html();
            var nameUser = $(this).closest('.comment').find('.user a').html();
            
            $('#quote').val('');
            $('#reply').val(''); 
            $('#respond-drop .sub-label').html('');
            $('#quote-drop .sub-label').html('');
            
            if ($('.respond-trigger').hasClass('active')) {
                $('.respond-trigger').removeClass('active').addClass('collapsed');
                $('#respond-drop').collapse('hide').attr("aria-expanded", "false").css("height", "0");
                $('body').removeClass('respond-open');          
            } 
            
            if ($('.quote-trigger').hasClass('active')) {
                $('#quote').val('@' + nameUser + ': ' + quoteVal);
                $('#quote-drop .sub-label').html('"' + quoteVal + '"'); 
                $('#quote-drop .label').html('Quote ' + replyUser);
                $('body').scrollTo('#before-repost', 500); 
            }
            
        });
        
        $('.option-parm').on('click', function () {
            var newVal = $(this).data('option');
            $('#upgradeOption').val(newVal);
        });        
        
        $(".theme-trigger").click(function(e){
            e.preventDefault();
            $(".theme-switch").toggleClass('active');
        });
        $(".theme-trigger-new").click(function(e){
            e.preventDefault();
            $(".theme-switch-new").toggleClass('active');
        });
        
        
        videoMenu($('.option-trigger'));
        
    });

    $(document).load(function () {

    });

    $(window).resize(function () {

    });

}(jQuery));
