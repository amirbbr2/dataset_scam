$.noConflict();
jQuery(document).ready(function($) {
	$(function(){
	if ($.cookie('sl_style') == "night")
		$('head').append('<link rel="stylesheet" href="/wp-content/themes/scnlog/style2.css" type="text/css" />');

		$("#switch").click(function(){
			$('head link').each(function(){
				if($(this).attr('rel') == "stylesheet"){

					switch($(this).attr('href')){
						case "/wp-content/themes/scnlog/style.css":
							$(this).attr('href',"/wp-content/themes/scnlog/style2.css");
							$.cookie('sl_style', 'night', { path: '/' }, {expires: 30});
							break;
						case "/wp-content/themes/scnlog/style2.css":
							$(this).attr('href',"/wp-content/themes/scnlog/style.css");
							$.cookie('sl_style', 'day', { path: '/' }, {expires: 30});
							break;
					}
				}
			});
		});
	});
});
/* show/hide images */
function toggle_visibility(id){
	var e = document.getElementById(id);
	if (e.style.display == 'block')
		e.style.display = 'none';
	else
		e.style.display = 'block';
	};
