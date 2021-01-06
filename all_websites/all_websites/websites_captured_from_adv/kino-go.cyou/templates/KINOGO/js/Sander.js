function xsort_empty(){
	$("#dle-content").html('<div class="xsort_empty">Ничего не найдено</div>');
}

$(document)
.on('click','.xsort-selected',function(e){
	var ul = $(this).parents('.xsort-div').find('.xsort-ul');
	var d = ul.css('display');
	$('.xsort-ul').hide();
	if(d=='none') ul.slideDown(200);
//	var litop = ul.find('li.current')[0].offsetTop-31;
//	ul.animate({'scrollTop':litop+'px'},100);
	return false;
})
.on('click','.xsort-ul li',function(){
	$this = $(this);
	var text = $this.text();
	var val = $this.data('val');
	var field = $this.parents('.xsort-ul').data('field');
	var sel = $this.parents('.xsort-div');
	if(val!=='') sel.addClass('xsort-active');
	else sel.removeClass('xsort-active');
	sel = sel.find('.xsort-selected');
	var url = window.location.href;
	if(field=='defaultsort'){
		$this.siblings().removeClass('xasc xdesc');
		sel = sel.find('span');
		if(val!==''){
			if($this.hasClass('xdesc')){
				$this.removeClass('xdesc').addClass('xasc');
				sel.attr("class","xasc");
			}else{
				$this.removeClass('xasc').addClass('xdesc');
				sel.attr("class","xdesc");
			}
		}else{
			sel.removeClass('xasc xdesc');
		}
	}else{
		if($(this).hasClass('current')){
			$this.parents('.xsort-ul').find('li').eq(0).click();
			return false;
		}
	}
	sel.html(text);
	$this.addClass('current').siblings().removeClass('current');

	if(url.indexOf('/page/')>=0){
		url = url.split('/page/');
		url = url[0]+'/';
	}
	ShowLoading();
	$(".berrors").remove();
	
	$.ajax({
		url: url,
		type: "POST",
		method: "POST",
		data: {xsort:1,xs_field:field,xs_value:val}
	}).done(function(d){
		HideLoading();
		var html = $("#dle-content",d).html();
		if(html){
			$("#dle-content").html(html);
			if(url != window.location.href) window.history.pushState(null, null, url);
		}else xsort_empty();
	}).fail(function(d){
		HideLoading();
		xsort_empty();
	})
})
.on('click','body:not(.xsort-ul)',function(){
	$('.xsort-ul').fadeOut(100);
})
.on('click','.xsort-div-filler',function(){
	ShowLoading();
	$('#xsort-admin').remove();
	$('body').append('<div id="xsort-admin" title="Поиск и формирование списка значений доп. полей" style="display:none;"/>');
	$.post(dle_root+"engine/mods/xsort/admin.php",{do:'start'},function(d){
		HideLoading();
		$('#xsort-admin').html(d).dialog({
			width: '600px',
			buttons: {
				'Закрыть':function(){
					$(this).dialog('close');
				}
			}
		});
	})
})
.on('click','.xsort-admin-area ul li',function(){
	var ul = $(this).parents('ul');
	ul.addClass('loading');
	if(!$(this).hasClass('current')) $(this).removeClass('xreverse');
	var reverse = $(this).hasClass('xreverse');
	$(this).toggleClass('xreverse');
	$(this).addClass('current').siblings().removeClass('current');
	$.post(dle_root+"engine/mods/xsort/admin.php",{field:$(this).data('field'),reverse:reverse},function(d){
		ul.removeClass('loading');
		$('.xsort-admin-area pre code').html(d);
	})
})
.on('click','.xsort-div-clearall',function(){
	var url = window.location.href;
	if(url.indexOf('/page/')>=0){
		url = url.split('/page/');
		url = url[0]+'/';
	}
	ShowLoading();
	$(".berrors").remove();
	$.ajax({
		url: url,
		type: "POST",
		method: "POST",
		data: {xsort:1,xs_field:'clearallfields'}
	}).done(function(d){
		HideLoading();
		window.location.href = url;
	}).fail(function(d){
		HideLoading();
		xsort_empty();
	})
})

