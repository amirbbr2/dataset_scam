jQuery(document).ready(function($){
 
 
 $(".chosen_one").chosen(); 
  
 
 $(".mobile_search_close").click(function(){ 
		 $("body").removeClass("right_drawer_open"); 
 });
 
 
 $(".right_drawer_click").click(function(){ 
		
		$("body").addClass("right_drawer_open");  
		$(".main_overlay").addClass("show");  
		$("body").addClass("menu_openned");
		//$(".main_content").css("height",screen.height);  
 });
 
 $(".menu_click").click(function(){   
		$(this).addClass("toggled");
		$(".main_overlay").addClass("show");
		$(".main_navigation").addClass("menu_open"); 
		$("body").addClass("menu_openned"); 
		//$(".main_content").css("height",screen.height);   
 });
 
 $(".close_menu , .main_overlay").click(function() {
		$(".menu_toggle").removeClass("toggled");
		$(".main_overlay").removeClass("show");
		$(".main_navigation").removeClass("menu_open"); 
		$("body").removeClass("menu_openned right_drawer_open");    
		//$(".main_content").css("height","auto"); 
      });

 	
  
 $( ".slider").slider({ 
    range: "min",
    value: 30,
    min: 1,
    max: 100,
    //this gets a live reading of the value and prints it on the page
    slide: function(event, ui) { 
	  $(this).closest(".font_dv").find(".font_size_pixle").text(ui.value+"px");
	  $(this).closest(".font_dv").find(".font_preview_container").css("font-size",ui.value+"px")
	   
    }, 
});

 
	 	
	 
	
	
});