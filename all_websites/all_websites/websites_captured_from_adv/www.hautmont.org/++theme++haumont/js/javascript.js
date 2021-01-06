// JavaScript Document

jQuery("document").ready(function($){

	div_actus();
	
	function div_actus(){
		if ($('.slider-image ').length) {
			var diapo_actu = $(".slider-image  li");
		
			diapo_actu.each(function(index) {
				var newdiv = document.createElement('div');
				$(newdiv).appendTo($(this));
				$("h2", this).appendTo($(newdiv));
				$("p", this).appendTo($(newdiv));
			});
		}
	}

	
});

