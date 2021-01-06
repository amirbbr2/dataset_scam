function ajax(page_url,params,send_type,bef,suc,err)
{
	$.ajax({
		url: page_url,
		type: send_type,//'POST',
		data: params,//$('#order_form').serialize(),
		beforeSend: function()
		{
			eval(bef);
			//$('#available_number').html('<img src="template/main/images/loading2.gif" alt="loading" />');
		},
		success: function(data){
			eval(suc);
			//$('#available_number').html(data);
		},
		error: function(jqXHR, textStatus, errorThrown){
			eval(err);
			//$('#available_number').html('خطا در بارگذاری');
		}
	});
}

function ajax_link(a,e,cnt1,cnt2,no_black_screen,after)
{
	if(e)
		e.preventDefault();
	if(!cnt1)
		cnt1 = $('#content-wrapper');
	if(!cnt2)
		cnt2 = cnt1;
	$.ajax({
		url: a.href,
		type: 'GET',
		beforeSend: function()
		{
			if(!no_black_screen)
			{
				cnt1.css({position:'relative'}).append('<div id="ajax_black_screen"></div>');
				$('#ajax_black_screen').css({height:cnt1.height()}).append('<span><img src="template/core/images/loading10.gif" id="ajax_loading" alt="loading" /></span>');
			}
		},
		success: function(data){
			cnt2.html(data);
			if(!no_black_screen)
				$('#ajax_black_screen').remove();
			if(after)
				eval(after);
		},
		error: function(jqXHR, textStatus, errorThrown){
			if(!no_black_screen)
				$('#ajax_black_screen').remove();
			window.location = a.href;
		}
	});
}

function ajax_form(form,e,cnt1,cnt2)
{
	e.preventDefault();
	if(!cnt1)
		cnt1 = $('#content-wrapper');
	if(!cnt2)
		cnt2 = cnt1;
	
	$.ajax({
		url: form.action,
		type: 'POST',
		data: $(form).serialize(),
		beforeSend: function()
		{
			cnt1.css({position:'relative'}).append('<div id="ajax_black_screen"></div>');
			$('#ajax_black_screen').css({height:cnt1.height()}).append('<span><img src="template/core/images/loading10.gif" id="ajax_loading" alt="loading" /></span>');
		},
		success: function(data){
			cnt2.html(data);
			$('#ajax_black_screen').remove();
		},
		error: function(jqXHR, textStatus, errorThrown){
			$('#ajax_black_screen').remove();
			form.submit();
		}
	});
}

function ajax_custom(page_url,cnt1,cnt2,no_black_screen,after)
{
	if(!cnt1)
		cnt1 = $('#content-wrapper');
	if(!cnt2)
		cnt2 = cnt1;
	$.ajax({
		url: page_url,
		type: 'GET',
		beforeSend: function()
		{
			if(!no_black_screen)
			{
				cnt1.css({position:'relative'}).append('<div id="ajax_black_screen"></div>');
				$('#ajax_black_screen').css({height:cnt1.height()}).append('<span><img src="template/core/images/loading10.gif" id="ajax_loading" alt="loading" /></span>');
			}
		},
		success: function(data){
			cnt2.html(data);
			if(!no_black_screen)
				$('#ajax_black_screen').remove();
			if(after)
				eval(after);
		},
		error: function(jqXHR, textStatus, errorThrown){
			if(!no_black_screen)
				$('#ajax_black_screen').remove();
			window.location = page_url;
		}
	});
	
}


// jQuery cookie plugin
jQuery.cookie=function(a,b,c){if(typeof b!="undefined"){c=c||{};if(b===null){b="";c.expires=-1}var d="";if(c.expires&&(typeof c.expires=="number"||c.expires.toUTCString)){var e;if(typeof c.expires=="number"){e=new Date;e.setTime(e.getTime()+c.expires*24*60*60*1e3)}else{e=c.expires}d="; expires="+e.toUTCString()}var f=c.path?"; path="+c.path:"";var g=c.domain?"; domain="+c.domain:"";var h=c.secure?"; secure":"";document.cookie=[a,"=",encodeURIComponent(b),d,f,g,h].join("")}else{var i=null;if(document.cookie&&document.cookie!=""){var j=document.cookie.split(";");for(var k=0;k<j.length;k++){var l=jQuery.trim(j[k]);if(l.substring(0,a.length+1)==a+"="){i=decodeURIComponent(l.substring(a.length+1));break}}}return i}}