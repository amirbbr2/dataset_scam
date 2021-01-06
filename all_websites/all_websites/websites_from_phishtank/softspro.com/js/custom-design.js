$(document).ready(function(){   
		$("#loader_img").hide();	setTimeout(function(){  
			$(".site_content_holder").css("opacity","1");
		 }, 1000);
		 $('.radio-change').click(function(){
            var inputValue = $(this).attr("value");
            var targetBox = $("." + inputValue);
            $(".box").not(targetBox).hide();
            $(targetBox).show();
        });
 
    function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".more-less")
            .toggleClass('fa-plus fa-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
    
		$('.mob_nav').click(function(){ 
			$(this).toggleClass("toggled");  
			$("body").toggleClass("menu_open"); 
					
		});
	  
		$(".get_in_touch_form_group  .form-control").focus(function(){ 
			$(this).closest(".get_in_touch_form_group ").addClass("focused");
		});
		
		$(".get_in_touch_form_group  .form-control").blur(function(){ 
		
			if($(this).val() == "")
			{
			$(this).closest(".get_in_touch_form_group ").removeClass("focused");
			}
		
		
		}); 
		$('.up_arrows').click(function(){  
			$('html, body').animate({scrollTop:($('body').offset().top)},500);
			$('html, body').animate({scrollBottom:($('body').offset().top)},500); 	
		});
		
		  
		 
		  var owlTwo = $(".testimonial_slider"); 
		  owlTwo.owlCarousel({

			itemsCustom: [
				[0, 1],
				[600, 1],
				[767, 1],
				[900, 1],
				[992, 1],
				[1200, 1]
			],
			navigation: false

		});
	 

		  
  
	 
	});
	  