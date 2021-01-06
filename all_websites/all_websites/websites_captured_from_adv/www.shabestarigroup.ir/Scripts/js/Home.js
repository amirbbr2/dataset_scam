/* 
	-----
	Holding Home JavaScript 
	-----
	January 2015, Tehran, www.ParianGroup.com
	Mohammad Khakifirooz (Memet), BanipalArt @ gmail . com
	-----
*/

$(document).ready(function(){
	var NavHeight = 113;
	snapValue = $("#skrollr-body");
	onSectionPos = $("#skrollr-body");
	var spp = 600;
    if ((navigator.userAgent.indexOf("Firefox") != -1)) {
        spp = 100
    }
    function onAnime() {
        if (navigator.userAgent.indexOf("Mobile") == -1) {
            //$(window).snap(String(NavHeight), spp);
            var force = true;
        } else {
            $("*").css({ "transition": "none", "-webkit-transition": "none" });
            var force = false;
        }
		
		$(window).scrl({
			smoothScrolling : false, forceHeight : force,
			constants: {
				s1s1:  function() { return $(".WelcomeSection").offset().top},
				s1s2:  function() { return $(".WelcomeSection").offset().top +  $(".WelcomeSection").outerHeight() - NavHeight },
				s1s3:  function() { return $(".ServiceSection").offset().top +  $(".WelcomeSection").outerHeight() - NavHeight },
				
				s2s1:  function() { return $(".AboutSection").offset().top - NavHeight},
				s2s2:  function() { return $(".AboutSection").offset().top +  $(".AboutSection").outerHeight() - NavHeight },
				
				s3s1:  function() { return $(".ServiceSection").offset().top - NavHeight},
				s3s2:  function() { return $(".ServiceSection").offset().top +  $(".ServiceSection").outerHeight() - NavHeight },
				s3s3:  function() { return $(".ArticleSection").offset().top - $(window).height() },
				
				s4s1:  function() { return $(".ProjectsSection").offset().top - $(window).height() },
				s4s2:  function() { return $(".ArticleSection").offset().top +  $(".ArticleSection").outerHeight() - NavHeight },
				
				s5s1:  function() { return $(".ProjectsSection .ProjectsContent ").offset().top  - $(window).height() +  300},
				s5s2:  function() { return $(".ProjectsSection").offset().top  - NavHeight},
			}
		});
		
		
	}
	function makeScroll() { skrollr.init().destroy(); onAnime(); }
	/* -------------------------------------------------------------------------------------------------------------------- */
	/* Welcome Section
	/* -------------------------------------------------------------------------------------------------------------------- */
	$(".WelcomeSection").resizeEvent (function(e) {
		
	    if (navigator.userAgent.indexOf("Mobile") == -1) {
	        makeScroll();
	    }
	   
		$(".WelcomeSection .responsivelist img").fix("widthHeight", "0", function() { $(this).pos("center", "top")});
		$(".AboutSection .BackPain img.back").fix("widthHeight", "0", function() { $(this).pos("center", "top")});
		
		var NavActive = true;
		$(".ToggleBt").click(function() {
			if (NavActive == true) {
				$(".iSeFect").addClass( "Active" );
				$(".Logo").addClass( "Hide" );
				NavActive = false;
			} else {
				$(".iSeFect").removeClass( "Active" );
				$(".Logo").removeClass( "Hide" );
				NavActive = true;
			}
		});
	});
	$(".WelcomeSection .responsivelist").slideFix("item-to-slide", "100%", 600, 'normal').slideAuto(5000);
	$(".SliderArticleBox .responsivelist").slideFix("slide-to-item", "270", 200);


    //hover ArticleItem
	$(".SliderArticleBox .item").hover(function () {

	    var title = $(this).find(".holderTitle").html();
	    var summery = $(this).find(".holderSummery").html();
	    var image = $(this).find(".holderImage").attr("src");
	    console.log(image)
	    
	    $(".DetailArticleBox h3").html(title);
	    $(".DetailArticleBox p").html(summery);
	    $(".Box.Right img").attr("src", image);

	},function() {
	    
	})
	
	
});









