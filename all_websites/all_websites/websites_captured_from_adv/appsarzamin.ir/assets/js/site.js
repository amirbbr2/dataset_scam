$(document).ready(function(){var uls=$("ul.cat-child");$.each(uls,function(i,ul){if($(ul).has("li").length){}else
$(ul).remove();});$.each(uls,function(i,ul){if($(ul).has("li").length){var li=$(ul).$("li").first();if(li.html()==" ")
$(ul).remove();}else
$(ul).remove();});});function Search(){var searchText=$("#searchtext").val().trim();searchText=encodeURI(searchText);window.location.href="/search/1/"+searchText+"/";}
$('#searchtext').keypress(function(e){var key=e.which;if(key===13)
{Search();return false;}});