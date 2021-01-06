jQuery.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);

  if (this.length) {
    callback.call(this, args);
  }

  return this;
};

function extract_imgs_src_wt_three(img_tag_array) {
	var i;
	var out_tmp = [];
	var str_tmp;
	
	for (i = 0; i < img_tag_array.length; i++) {
		str_tmp = img_tag_array[i].src;
		//str_tmp = "http://www.pishkhaan.net/" + str_tmp.substring(window.location.href.length ,str_tmp.length);
		out_tmp.push(str_tmp);
	}
	
	return out_tmp;
}