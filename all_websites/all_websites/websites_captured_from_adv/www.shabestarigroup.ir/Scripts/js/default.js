/* 
	-----
	Holding Default JavaScript 
	-----
	January 2015, Tehran, www.ParianGroup.com
	Mohammad Khakifirooz (Memet), BanipalArt @ gmail . com
	-----
*/
$(document).ready(function(){
	/* -------------------------------------------------------------------------------------------------------------------- */
	/* Search
	/* -------------------------------------------------------------------------------------------------------------------- */
	SearchPainTextDoor("close", "0")
	$("#skrollr-body").on("click", function() {
		$(".FixNav .SearchPain .SearchBtn").attr("door", "false")
		SearchPainTextDoor("close")
	})
	$(".FixNav .SearchPain .SearchBtn").on("click", function() {
		if ($(".FixNav .SearchPain .SearchBtn").attr("door") == "true") {
			SearchPainTextDoor("close", "0.45")
		} else {
			SearchPainTextDoor("open", "0.45")
		}
	})
	function SearchPainTextDoor (act,t) {
		if (act == "open") {
			$(".FixNav .SearchPain .SearchBtn").attr("door", "true")
			$(".FixNav .SearchPainText .SearchText").css({"transition": "all "+t+"s", "transform": " translateY(0) rotateX(0deg)", "opacity" : "1"})		
			$(".FixNav .SearchPainText").css({"transition": "all "+t+"s", "height": "56px"})
		} else {
			$(".FixNav .SearchPain .SearchBtn").attr("door", "false")
			$(".FixNav .SearchPainText .SearchText").css({"transition": "all "+t+"s", "transform": " translateY(-50%) rotateX(-90deg)", "opacity" : "0.5"})
			$(".FixNav .SearchPainText").css({"transition": "all "+t+"s", "height": "0px"})		
		}
	}
	/* -------------------------------------------------------------------------------------------------------------------- */
	/* Scroll Btn
	/* -------------------------------------------------------------------------------------------------------------------- */	
	$(".ScrollToTop").on("click", function() {
		$(".WelcomeSection").scrlTo("top", "-45", "500")
	})
	
});

$(document).scroll(function() {
  var iS = $(this).scrollTop();
  if (iS > 10) {
	$(".FixNav").addClass("RemoveHeight");
  } else {
    $(".FixNav").removeClass("RemoveHeight");
  }
});