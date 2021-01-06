
function find_height(element, modifier) {
	height = (Math.floor($(element).offset().top) - 110 - modifier) + 'px';
	return height;
}
function unsure() {
	$('#sure').remove();
	$('.left_side').show();
	$('#delpaste-1').click();
	$('#delpasscode-1').click();
	
}
function clearexplain () {
		$('.pnormal').css('display', 'none');
		$('#errorcode').css('display', 'none');
	};
function resize() {
	if ($(window).width() < 650 && size == 'large') {
		size = 'small';
		var $radiovisibility = $('input[type="radio"][name="visibility"]');
		$('.labelvis').bind('click.small', function () {
   		var $checked = $radiovisibility.filter(':checked');
   		var $visibilitynext = $radiovisibility.eq($radiovisibility.index($checked) + 1);
   			if(!$visibilitynext.length){
      			  $visibilitynext = $radiovisibility.first();
   			 }
   		$visibilitynext.click();
   		return false;
});
		var $radiolinkoptions = $('input[type="radio"][name="link-options"]');
		$('.labelopt').bind('click.small', function () {
   		var $checked = $radiolinkoptions.filter(':checked');
   		var $linkoptionsnext = $radiolinkoptions.eq($radiolinkoptions.index($checked) + 1);
   			if(!$linkoptionsnext.length){
      			  $linkoptionsnext = $radiolinkoptions.first();
   			 }
   		$linkoptionsnext.click();
   		return false;
});
		var $radioreferer = $('input[type="radio"][name="refer"]');
		$('.labelref').bind('click.small', function () {
   		var $checked = $radioreferer.filter(':checked');
   		var $referernext = $radioreferer.eq($radioreferer.index($checked) + 1);
   			if(!$referernext.length){
      			  $referernext = $radioreferer.first();
   			 }
   		$referernext.click();
   		return false;
});
		var $radiopasscode = $('input[type="radio"][name="passcode-label"]');
		$('.labelpas').bind('click.small', function () {
   		var $checked = $radiopasscode.filter(':checked');
   		var $passcodenext = $radiopasscode.eq($radiopasscode.index($checked) + 1);
   			if(!$passcodenext.length){
      			  $passcodenext = $radiopasscode.first();
   			 }
   		$passcodenext.click();
   		return false;
});
		var $radiostrip = $('input[type="radio"][name="strip-label"]');
		$('.labelstrip').bind('click.small', function () {
   		var $checked = $radiostrip.filter(':checked');
   		var $radiostripnext = $radiostrip.eq($radiostrip.index($checked) + 1);
   			if(!$radiostripnext.length){
      			  $radiostripnext = $radiostrip.first();
   			 }
   		$radiostripnext.click();
   		return false;
});

		$('#textbody').after('<p id="click_to_cycle">Click the blue options to cycle through.</p>');
		$('.labelreferrerhide').text('Hidden');
	} else if ($(window).width() >= 650 && size == 'small') {
		$('#click_to_cycle').remove();
		size = 'large';		
		$('#submitform label').unbind('click.small');
		clearexplain();
	}
	}
if ($(window).width() < 650) {
	size = 'large';
} else {
	size = 'small';
}
$(window).bind('resize', function(e)
{
    window.resizeEvt;
    $(window).resize(function()
    {
        clearTimeout(window.resizeEvt);
        window.resizeEvt = setTimeout(function()
        {
            resize();
        }, 275);
    });
});
$(document).ready(function(){
	resize();
	
	$('#nojs').css('display', 'none');
	$('.left_side').removeClass('none');
	$('.real_edit').hide();
	var visprivate;

	
	$('.submitexplain').css('display', 'inherit');

	$('.disable-ads').click(function(e) {

		e.preventDefault();

		$.ajax({
		    type: "POST",
		    url: "cookies.php",
		    data: {data: 'disable'},
		    cache: false,
		    ContentType: false,
		    success:  function(data){		
		    	var responseData = $.parseJSON(data);
		    	$('.ad').empty();
	           switch(responseData.status){
				    case 'set':
		    			
    					$('.ad').append('<p class="ads-removed">Third Party Ads Disabled</p> ');			

				    break;
				    case 'unset': 

				    	$('.ad').append('<p class="ads-removed">Ads Enabled, Thank You!</p> ');
				  	 	
				    break;
		    	}
		    	
		    	}
		  });


	});


$('.more').click(function() { 
    $('html, body').animate({
          scrollTop: $(window).height()
    }, "slow");
	});

	$('#passcode').click(function() {
		$('#passcode-radio').prop('checked', false);
	});
	$('#passcode-label').click(function() {
		$('#passcode-radio').prop('checked', true);
		$('#passcode').val('');
	});
	$('#passcode').blur(function(){
		if (!$.trim($("#passcode").val())) {
		$(this).css('border', '1px solid grey');
		} 
	});
	

	if (!$('#visibility-3').prop('checked')) {
	$('.private-password').css('display', 'none');	
	}
	$('#visibility-3').click(function() {
		$('.private-password').css('display', 'show');
	});
	$('#visibility-1, #visibility-2').click(function() {
		$('.private-password').css('display', 'none');
	});
	
	$('.submit .explain p').css('display', 'none');
	
	
	
	$('form .title').focus(function(){
		clearexplain();
		$('#explaintitle').css('display', 'block');
	});
	$('form .title').on('input', function(){
		$(this).css('border', '1px solid green');
	});
	$('form .title').blur(function(){
		if (!$.trim($("form .title").val())) {
		$(this).css('border', '1px solid grey');
		} 
	});
	$('form .textbody').focus(function(){
		clearexplain();
		$('#explaintext .pnormal').css('display', 'block');
		$(this).css('border', '1px solid grey');
	});
	$('form .textbody').on('input', function(){
		$('#errortext').css('display', 'none');
		$(this).css('border', '1px solid green');
	});
	$('form .textbody').blur(function(){
		if (!$.trim($("#textbody").val())) {
		$(this).css('border', '1px solid red');
		} 
	});
	
	$('form #custom_url').focus(function(){
		clearexplain();
		$(this).css('border', '1px solid grey');
	});
	$('form #custom_url').on('input', function(){
		$('#errortext').css('display', 'none');
		$(this).css('border', '1px solid green');
	});
	$('form #custom_url').blur(function(){
		if ($("#custom_url").val().length < 7 && $("#custom_url").val().length != 0) {
		$(this).css('border', '1px solid red');
		} 
	});
	
	$('.submit form .labelvispublic').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labelvisprivate'), 0);
		$('#explainvisibility').css('top', element_top_offset);
		$('#explainvispublic').css('display', 'block');
		$('#errorvis').css('display', 'none');
		$('#password').css('border', '1px solid grey');
		
			
	});
	$('form .labelvishidden').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labelvisprivate'), 0);
		$('#explainvisibility').css('top', element_top_offset);
		$('#explainvishidden').css('display', 'block');
		$('#errorvis').css('display', 'none');
		$('#password').css('border', '1px solid grey');
	});
	
	if ($('#visibility-3').is(':checked')) {
		$('form .labelvisprivate').click();
	}
	$('.submit form .labelvisprivate').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labelvisprivate'), 0);
		$('#explainvisibility').css('top', element_top_offset);
		$('#explainvisprivate').css('display', 'block');
	});
	$('form #password').on('input', function(){
		$('#errorvis').css('display', 'none');
		$(this).css('border', '1px solid green');
	});
	$('#submit #password').blur(function(){
		if (!$.trim($("#password").val())) {
		$(this).css('border', '1px solid red');
		}
	});	
	$('form .labellinkshow').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labellinkicons'), 0);
		$('#explainlink').css('top', element_top_offset);
		$('#explainlinkshow').css('display', 'block');
	});
	$('form .labellinkreferences').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labellinkicons'), 0);
		$('#explainlink').css('top', element_top_offset);
		$('#explainlinkreferences').css('display', 'block');
	});
	$('form .labellinknumbers').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labellinkicons'), 0);
		$('#explainlink').css('top', element_top_offset);
		$('#explainlinknumbers').css('display', 'block');
	});
	$('form .labellinkicons').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labellinkicons'), 0);
		$('#explainlink').css('top', element_top_offset);
		$('#explainlinkicons').css('display', 'block');
	});
	$('form .labelreferrerpublic').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labelreferrerpublic'), 0);
		$('#explainreferrer').css('top', element_top_offset);
		$('#explainreferrerpublic').css('display', 'block');
	});
	$('form .labelreferrerhide').click(function(){
		clearexplain();
		element_top_offset = find_height($('.labelreferrerpublic'), 0);
		$('#explainreferrer').css('top', element_top_offset);
		$('#explainreferrerhide').css('display', 'block');
	});
	$('form #passcode-radio-1').click(function(){
		clearexplain();
		element_top_offset = find_height($('.passcodep'), 0);
		$('#explainpasscodenone').css('display', 'block');
		$('#googleerror').css('display', 'none');	
		$('#passcode').css('border', '1px solid grey');
		$('#errorcode').css('display', 'none');
		$('#passcode').val('');
		$('#explainpasscode').css('top', element_top_offset);
		
	}); 
	$('form #passcode-radio-2').click(function(){
		$('#explainpasscodetrue').css('display', 'block');
		$('#googleerror').css('display', 'none');	
		
		$('form #passcode').focus();
	});
	$('form #passcode').focus(function(){
		clearexplain();
		element_top_offset = find_height($('.passcodep'), 100);
		$('#passcode-radio-2').prop('checked', true);
		$('#errorcode').css('display', 'none');	
		$('#errorvis').css('display', 'none');	
		$('#googleerror').css('display', 'none');	
		$('#explainpasscodetrue p').css('display', 'block');
		$('#explainpasscode').css('top', element_top_offset);
		
	});
	$('form #passcode').on('input', function(){
		$('#errorcode').css('display', 'none');
		$(this).css('border', '1px solid green');
	});
	
	$('form #custom_url').focus(function(){
		clearexplain();
		element_top_offset = find_height($('.customp'), 0);
		$('#explaincustom').css('top', element_top_offset);
		$('#explaincustomtrue').css('display', 'block');
	});	
	
	$('form .labelstrip').click(function(){
		clearexplain();
		element_top_offset = find_height($('.stripp'), 0);
		$('#explainstrip').css('top', element_top_offset);
		$('#explainstriptrue').css('display', 'block');
	});	
		
	$('form #generate').click(function(){
		$('#passcode-radio-2').click();
		$('#passcode').css('border', '1px solid green');
		$('#errorcode').css('display', 'none');
	});
	
	function generatePassword() {
		
    var length = Math.floor(Math.random()*(11)+40);
        charset = "abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ2345679!@#$%^*()~}{[];?,/-=",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
	
	$('#generate').click(function() {
		$('#passcode').val(generatePassword());
	});
	if (typeof $('.phperror').val() != 'undefined') {
		$('.more_options').removeClass('unchecked_more_options');
		$('.further_options').removeClass('none');
		$('.more_options').addClass('checked');
	}
	$('.more_options').click(function(){
		$('.more_options').toggleClass('unchecked_more_options');
		$('.further_options').toggleClass('none');
		$('.more_options').toggleClass('checked');
	});

	
	
	
	
	
	
	
	
	
	
	
	$('#submitbtn').click(function(e){
		clearexplain();
		var valerrors = 0;
		$('.error').remove();
		var passcode = $('#passcode').val();
		var submitattempt = 1;
		
		if (!$.trim($("#textbody").val())) { //if empty
		$('#explaintext').prepend('<p class="error" id="errortext">Please enter the text of your submission. </p>');
	 	$('#textbody').css('border', 'red solid 1px');
	 	valerrors = 1;
	 } 
	 	if ($('#visibility-3').is(':checked') && !$.trim($("#password").val())) {
	 		
	 		element_top_offset = find_height($('.labelvisprivate '), 0);
			$('#explainvisibility').css('top', element_top_offset);
	 		$('#explainvisibility').prepend('<p class="error" id="errorvis">Please enter an access password or select a different visibility option.</p>');
	 		$('#password').css('border', 'red solid 1px');
	 		valerrors = 1;
	 	}
	 	
	 if ($('#passcode-radio-2').is(':checked') && ($('#passcode').val().length < 40) ) {
	 		element_top_offset = find_height($('.passcodep'), 0);
			
	 		$('.explain').append('<p class="error" id="errorcode">Your passcode is too short, it must be at least 40 characters. Click generate to create one automatically.</p>');
	 		$('#errorcode').css('top', element_top_offset);
	 		$('#passcode').css('border', 'red solid 1px');
	 		valerrors = 1;
	 	}
	 
	 if ($('#custom_url').val() != '') {
	 	no_chars = $('#custom_url').val().replace(/[^\w\s]/gi, '');
	 	$('#custom_url').val(no_chars);
	 	if ($('#custom_url').val().length < 7) {
	 		if (valerrors == 0) {
			 	element_top_offset = find_height($('.customp'), 0);
			 	$('.explain').append('<p class="error" id="errorcode">Your custom URL is too short, the minimim size is 7 characters.</p>');
			 	$('#errorcode').css('top', element_top_offset);
			 	$('#custom_url').css('border', 'red solid 1px');
	 		}
	 	valerrors = 1;
	 	}
	 } 
	 	
	 	
	 	
	 
	 
	 	if (valerrors == 1) {
			return false;
		} else {
			$('#submitform').submit();
		}
	});
	$("a").click(function(){
	$('.ref').css('text-decoration', 'none');
  	var selectedLink = $(this).attr("href");
 	$(selectedLink).css('text-decoration', 'underline');
});
	if (!$('.pcerror').text().trim().length){
		$('.togglepc').hide();
	};
	
	$('.pcform label').click(function(){
		$('.togglepc').toggle();
	});

	$('#submitlogin').click(function(e){
		var valerrors = 0;
		$('#pcerror').empty();
		$('#access-error').empty();	
		if (!$.trim($("#passcodein").val())) {
			$('#pcerror').text('Please enter a passcode');
			valerrors = 1;
		} else if ($('#passcodein').val().length < 40) {
			$('#pcerror').text('Passcodes must be at least 40 characters');
			valerrors = 1;
		}
		if (valerrors == 1) {
			return false;
		} else {
		
			$('#login').submit();
		}
	});
		$('#entrysubmit').click(function(e){ 
			$('#access-error').empty();
			$('.pcerror').empty();
		if (!$.trim($("#access-password").val())) { //if empty
			$('#access-error').text('Please enter a password');
			pwerrors = 1;
		} else {
			pwerrors = 0;
		}
		if (pwerrors == 1) {
			return false;
		} else {
			$('#entryform').submit();
		}
	});
	$('#labeldelpaste-2').click(function(){ 
		unsure();
	});
	$('#labeldelpasscode-2').click(function(){ 
		unsure();
	});
	$('#make_changes').click(function(){
		$('#submitedit').click();
	});
	$('#cancel').click(function(){
		$('#canceledit').click();
	});
	
	$('#submitedit').click(function(e){ 
		e.preventDefault();
		editerrors = 0;
		$('.edit_error').html('');
		if ($('#visibility-3').prop('checked') && !$.trim($("#password").val()) && !$("#password").prop('placeholder')) {
			$('#password').css('border', '1px solid red');
			$('.edit_error').html('Please enter a password or choose a different visibility option');
			editerrors = 1;
		}
		
		if ($('.editurl').val().length > 0 && $('.editurl').val().length <= 6) {
			$('.editurl').css('border', '1px solid red');
			$('.edit_error').html('Your custom URL must be at least 7 characters');
			editerrors = 1;
		}
		
		
		
		if (editerrors == 0) {
			if ($('#delpasscode-2').prop('checked') || $('#delpaste-2').prop('checked')){
			$('.left_side').hide();
			$('#edits').append('<div id="sure"></div>');
			$('#sure').html('Are you sure? This cannot be undone!<br /><br /> <label id="sureno">No</label> <label id="sureyes">Yes</label>');
				$('#sureno').click(function(){
		 			unsure();
				}); 
				$('#sureyes').click(function(){
					document.getElementById("newbody").value = document.getElementById("body-display").innerHTML;
		 			$('#edits').submit();
				}); 
		} else {
			document.getElementById("newbody").value = document.getElementById("body-display").innerHTML;
			$('#edits').submit();
		}
		} else {
			return false;
		}
		
	});
	
	$('#contactsubmit').click(function(e){
		var valerrors = 0;		
		if (!$.trim($("#email").val())) { //if empty
		$('.error').text('You have not entered an email address.');
	 	$('#email').css('border', 'red solid 1px');
	 	valerrors = 1;
	 } 
	 	if (!$.trim($("#message").val())) { //if empty
		$('.error').text('You have not entered a message.');
	 	$('#message').css('border', 'red solid 1px');
	 	valerrors = 1;
	 } 
	 
	 	if (valerrors == 1) {
			return false;
		} else {
			$('#submitform').submit();
		}
	});
	
	
	$('#takedownsubmit').click(function(e){
		var valerrors = 0;		
		$('.field').css('border', '1px solid #808080');
		if (!$.trim($("#name").val())) { //if empty
	 	$('#name').css('border', 'red solid 1px');
	 	valerrors = 1;
	 } //email url reasons details
		if (!$.trim($("#email").val())) { 
	 	$('#email').css('border', 'red solid 1px');
	 	valerrors = 1;
	 } 
	 	if (!$.trim($("#url").val())) { 
	 	$('#url').css('border', 'red solid 1px');
		valerrors = 1;
	 } 
	 if (!$.trim($("#reason").val())) { 
		var incomplete = 1;
	 	$('#reason').css('border', 'red solid 1px');
	 	valerrors = 1;
	 } 
	 if (!$.trim($("#details").val())) { 
	 	$('#details').css('border', 'red solid 1px');
	 	valerrors = 1;
	 } 
	 	if (valerrors == 1) {
	 		$('.error').text('You have not filled out all of the required fields.');
			return false;
		} else {
			$('#submitform').submit();
		}
	});


$('.edit_textarea').on('paste', function(e) {
    e.preventDefault();
    var text = '';
    if (e.clipboardData || e.originalEvent.clipboardData) {
      text = (e.originalEvent || e).clipboardData.getData('text/plain');
    } else if (window.clipboardData) {
      text = window.clipboardData.getData('Text');
    }
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      document.execCommand('paste', false, text);
    }
});	
$('.load_more').click(function(){
	var total = $(this).data('total');
	var order = $(this).data('order');
	var left = $('.load_more span').html();
	var passcode = $('.identify').html();
	$.ajax({
		    type: "POST",
		    url: "loadmore.php",
		    data: {total: total, order : order, left : left, passcode : passcode},
		    cache: false,
		    ContentType: false,
		    success:  function(data){		
		    	$('#listing tbody').append(data);
		    	if ((left - 100) <= 0) {
		    		$('.load_more').remove();
		    	} else {
		    		$('.load_more span').html(left - 100);
		    	}
		    	
		    	}
		  });
});
	$('.pcshow input').focus(function() { this.select(); });
	$('.pcshow span').click(function() { $('.pcshow input').select(); });
		
		
	
});

