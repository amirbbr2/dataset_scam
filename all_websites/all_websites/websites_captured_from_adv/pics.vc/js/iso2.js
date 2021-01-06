var $grid = $('.grid'),
$body = $('#center_panel'),
colWn = 320,
colWm = 154,
columns = null,
isomob = false;
var wwwidth = $(window).width();
if (wwwidth > 640){
	colW = colWn;
	isomob = false;
} else {
	colW = colWm;
	isomob = true;
}
$grid.isotope({
	masonry: {
		columnWidth: colW
	}
});
$(window).resize(function(){
	smartresize();
});	
$(window).load(function() {
	smartresize();
});
$( document ).ready(function() {
    smartresize();
});
function smartresize(){
var mChaged = false;
	var width = window.innerWidth;
	if (width > 640){
		colW = colWn;
		if (isomob) {
			isomob = false;
			mChaged = true;
		}
	} else {
		colW = colWm;
		if (!isomob) {
			isomob = true;
			mChaged = true;
		}
	}
//	console.log('mChaged',mChaged,width,window.innerWidth);
	if (mChaged) {
		console.log('each mChaged',mChaged);
		$('.gall_cover').each(function() {
			$(this).parent().height($(this).height());
		});
		$('.photo_el_img').each(function() {
			$(this).parent().height($(this).height());
		});		
	}
    var currentColumns = Math.floor( ( $body.width() ) / colW );
	if (currentColumns == 0) currentColumns = 1;
    if (currentColumns !== columns || mChaged) {
		mChaged = false;
   		columns = currentColumns;
		$grid.width( columns * colW ).isotope({
			masonry: {
				columnWidth: colW
			}
		});
		console.log('grid',columns,currentColumns,colW,width);		
    }
}