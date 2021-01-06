function pic_loader(p){
	$(p).parent().find(".photo_el_loader").remove();
	$(p).parent().height($(p).height());
	if (typeof $grid != 'undefined') {
		$grid.isotope();
	}
}