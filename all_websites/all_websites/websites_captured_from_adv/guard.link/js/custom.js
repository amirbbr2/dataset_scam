// JavaScript Document



jQuery(document).ready(function () {
	    jQuery('.nav nav').meanmenu();
	});


$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".testjoy"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).prepend('<div><textarea name="mytext1[]"></textarea><a href="#" class="remove_field">X</a></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
	
$("#link").click(function(){
    $("#link").toggleClass("grey");
	var atext = $(this).text();	
	if(atext=='Show Link')
	{
		$(this).text('No, hide Links');
		$("#showlink").val("0");
	}
	else{
		$(this).text('Show Link');
		$("#showlink").val("1");
	}
});
$("#dlc").click(function(){
    $("#dlc").toggleClass("grey");
	var atext = $(this).text();	
	if(atext=='Show DLC')
	{
		$(this).text('No, hide DLC');
		$("#showdlc").val("0");
	}
	else{
		$(this).text('Show DLC');
		$("#showdlc").val("1");
	}
});
$("#cnl").click(function(){
    $("#cnl").toggleClass("grey");
	var atext = $(this).text();	
	if(atext=='Show CNL')
	{
		$(this).text('No, hide CNL');
		$("#showcnl").val("0");
		
	}
	else{
		$(this).text('Show CNL');
		$("#showcnl").val("1");
	}
});
	
});


$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top -100
            }, 1000);
            return false;
        }
    }
});

equalheight = function(container){
 var currentTallest = 0,
      currentRowStart = 0,
      rowDivs = new Array(),
      $el,
      topPosition = 0;
  $(container).each(function() {
    $el = $(this);
    $($el).height('auto')
    topPostion = $el.position().top;
    if (currentRowStart != topPostion) {
      for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
     rowDivs.length = 0; // empty the array
      currentRowStart = topPostion;
      currentTallest = $el.height();
      rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
   }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
  });
 }


$(window).load(function(){
 
  equalheight('.news_box');
  equalheight('.ddd');
  equalheight('.form_box');
  equalheight('.blog_box');
  equalheight('.p-top-smae');});

  
$(window).resize(function(){
  equalheight('.news_box');
  equalheight('.ddd');
  equalheight('.form_box');
  equalheight('.blog_box');
  equalheight('.p-top-smae'); 
  
});

