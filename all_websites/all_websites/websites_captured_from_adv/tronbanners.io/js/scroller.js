jQuery.fn.extend({
	pic_scroll:function (){
		$(this).each(function(){
			var _this=$(this);
			var ul=_this.find(".inner");
			var li=ul.find(".single");
			var w=li.size()*li.outerHeight();
			li.clone().prependTo(ul);
			ul.width(2*w);
			var i=1,l;
			_this.hover(function(){i=0},function(){i=1});
			function autoScroll(){
				l = _this.scrollTop();
				if(l>=w)	_this.scrollTop(0);
				else		_this.scrollTop(l + i);
			}
			var scrolling = setInterval(autoScroll,20);
		})
	}
});
$(function(){
	$(".marquee").pic_scroll();
})