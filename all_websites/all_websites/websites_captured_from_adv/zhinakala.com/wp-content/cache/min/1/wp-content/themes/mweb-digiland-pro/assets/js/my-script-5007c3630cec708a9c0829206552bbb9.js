var mweb_instagram_popup;var mweb_sidebar_sticky_enable;var mweb_zoomtype;var mweb_popup_pic;var mweb_popup_day;var mweb_popup_link;var mweb_ajax_account;var mweb_acc_digits;var mweb_header_sticky;var lazyLoadInstance;(function($){"use strict";var mwebSinglePrdIHG={init:function($wrap){var self=this,flag_switch=!1,var_zoom=!0,var_zoomtype=mweb_zoomtype,var_popup=!0,var_lenssize=200,var_lensshape='round';if(var_zoom=='1'&&(!('ontouchstart' in document)||(('ontouchstart' in document)))){var zoomcfg={responsive:!1,zoomType:var_zoomtype,cursor:'grab'}
if(var_zoomtype=='inner'){zoomcfg.borderSize=0}else if(var_zoomtype=='lens'){zoomcfg.lensSize=var_lenssize;zoomcfg.lensShape=var_lensshape}}
if(typeof $wrap=='undefined')var $wrap='';if($wrap!=''){$wrap=$wrap+' .product-images'}else{$wrap='.product-images'}
$($wrap).each(function(){var $this=$(this),$product=$this.closest('.product'),$product_thumbs=$product.find('.product-thumbs'),$thumbnum=5,image_active=0;$this.find('img:first-child').waitForImages(!0).done(function(){$product_thumbs.owlCarousel({loop:!1,autoplay:!1,rewind:!0,dots:!1,nav:!0,rtl:!0,items:$thumbnum,responsive:{0:{items:$thumbnum-1},480:{items:$thumbnum},768:{items:$thumbnum-1},992:{items:$thumbnum-1},1200:{items:$thumbnum}},onInitialized:function(){self.switchImageThumb(null,$product_thumbs,0);if($product_thumbs.find('.owl-item').length<$thumbnum){$product_thumbs.find('.owl-nav').hide()}}}).on('click','.owl-item',function(){self.switchImageThumb($this,$product_thumbs,$(this).index())});$product_thumbs.on('click','.owl-prev',function(e){self.switchImageThumb($this,$product_thumbs,$product_thumbs.data('thumbselected')-1)});$product_thumbs.on('click','.owl-next',function(e){self.switchImageThumb($this,$product_thumbs,$product_thumbs.data('thumbselected')+1)});if(var_popup=='1'){var imgsrc=[],imgtitle=[],i=0;var $popup_btn=$product.find('#btn_popup_images');var $embed_video_btn=$product.find('.embed_video');var $direct_video_btn=$product.find('.direct_video');$this.find('img').each(function(i){imgsrc.push({src:this.src})});$this.data('imgsrc',imgsrc);$this.data('imgtitle',imgtitle);if(typeof $.magnificPopup!=='undefined'){$($popup_btn).off('click').on('click',function(e){e.preventDefault();$.magnificPopup.open({items:imgsrc,gallery:{enabled:!0},type:'image'})});$embed_video_btn.magnificPopup({type:'iframe',mainClass:'mfp-fade',removalDelay:160,preloader:!1,fixedContentPos:!1});$direct_video_btn.magnificPopup({type:'inline',mainClass:'popup_inline',removalDelay:160,preloader:!1,fixedContentPos:!1});$('.woocommerce-product-gallery__image ').magnificPopup({type:'image',gallery:{enabled:!0},removalDelay:500,delegate:'a',zoom:{enabled:!0,duration:500,easing:'ease',opener:function(element){return element.find('img')}}})}}
$this.owlCarousel({autoplay:!1,items:1,autoHeight:!0,rewind:!0,nav:!1,dots:!1,loop:!1,rtl:!0,onInitialized:function(){if(var_zoom=='1'&&(!('ontouchstart' in document)||(('ontouchstart' in document)))&&$(window).width()>768){$this.find('img').each(function(){var $this=$(this);zoomcfg.zoomContainer=$this.parent();$this.elevateZoom(zoomcfg)})}},onTranslate:function(e){image_active=this._current-$this.find('.cloned').length/2;self.switchImageThumb(null,$product_thumbs,image_active)},onRefreshed:function(){if(var_zoom=='1'&&(!('ontouchstart' in document)||(('ontouchstart' in document)))){$this.find('img').each(function(){var elevateZoom=$(this).data('elevateZoom');if(typeof elevateZoom!='undefined'){elevateZoom.startZoom();elevateZoom.swaptheimage($(this).attr('src'),$(this).attr('data-src'))}})}}})})})},switchImageThumb:function($product_images,$product_thumbs,index){if(self.flag_switch)return;self.flag_switch=!0;var thumb_leng=$product_thumbs.find('.owl-item').length,thumbs_active=[],i=0;index=(index+thumb_leng)%thumb_leng;$product_thumbs.find('.owl-item').removeClass('selected');$product_thumbs.find('.owl-item:eq('+index+')').addClass('selected');$product_thumbs.data('thumbselected',index);$product_thumbs.find('.owl-item.active').each(function(){thumbs_active[i++]=$(this).index()});if($.inArray(index,thumbs_active)==-1){if(Math.abs(index-thumbs_active[0])>Math.abs(index-thumbs_active[thumbs_active.length-1])){$product_thumbs.trigger('to.owl.carousel',[(index-thumbs_active.length+1)%thumb_leng,300,!0])}else{$product_thumbs.trigger('to.owl.carousel',[index%thumb_leng,300,!0])}}
if($product_images){$product_images.trigger('to.owl.carousel',[index,300,!0])}
self.flag_switch=!1}}
var mweb_price_chart={init:function(){if(typeof Highcharts=='undefined')
return!1;var self=this;self.initPriceChart()},convertToFaDigit:function(a){var b=''+a;for(var c=48;c<=57;c++){var d=String.fromCharCode(c);var e=String.fromCharCode(c+1728);b=b.replace(new RegExp(d.toString(),"g"),e.toString())}
return b},formatCurrency:function(num,isRial,symbol){num=num.toString().replace(/\$|\,/g,"");if(isNaN(num))num="0";var sign=(num==(num=Math.abs(num)));num=Math.round(num*100+0.50000000001);num=Math.round(num/(isRial?1000:100)).toString();for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)
num=num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));return(((sign)?"":"-")+num+" "+symbol)},initPriceChart:function(){if(!price_chart_data||price_chart_data.Series.length<1){return}
createProductPriceChart(price_chart_data);function convertToPersianDate(date){var months={1:'فروردین',2:'اردیبهشت',3:'خرداد',4:'تیر',5:'مرداد',6:'شهریور',7:'مهر',8:'آبان',9:'آذر',10:'دی',11:'بهمن',12:'اسفند'}
var units=(date||'1397/1/1').split('/');var year=units[0].substr(-2),month=parseInt(units[1]),day=parseInt(units[2]);return mweb_price_chart.convertToFaDigit(day+' '+months[month]+' '+year)}
function createProductPriceChart(data){Highcharts.setOptions({lang:{numericSymbols:null,thousandsSep:",",decimalPoint:""}});var maxCount=(data.Series||[]).reduce(function(acc,item){return Math.max(acc,(item||{data:[]}).data.length)},0)||1;var priceChart=$(".price_chart_content").highcharts({chart:{type:'line',height:575,marginTop:20,marginRight:20,marginLight:10},credits:{enabled:!1},title:{text:"",x:-10,y:10},xAxis:{categories:data.Categories,title:{text:null},tickInterval:Math.ceil(maxCount/6.),labels:{staggerLines:1,enabled:!0,y:25,x:0,align:'center',style:{color:'#979797',fontSize:'12px',fontFamily:"IRANSans",whiteSpace:'nowrap'},formatter:function(){return convertToPersianDate(''+this.value)}}},yAxis:{title:{text:"قیمت بدون تخفیف",x:-5,style:{fontWeight:"normal",fontFamily:"IRANSans",fontSize:"13px",direction:"rtl",color:"#777777"}},gridLineDashStyle:"Dot",labels:{x:-70,style:{color:'#555555',fontSize:'14px',fontWeight:"normal",fontFamily:"IRANSans"},formatter:function(){return mweb_price_chart.convertToFaDigit(mweb_price_chart.formatCurrency(this.value,!1,''))}},plotLines:[{value:0,width:1,color:"#808080"}]},tooltip:{valueSuffix:' تومان',rtl:!0,crosshairs:{width:1,color:'gray',dashStyle:'Dot'},style:{fontFamily:"IRANSansnum",fontWeight:"normal",padding:'20px'},backgroundColor:"#f9f9f9",borderColor:"#ccc",borderRadius:5,borderWidth:1,shadow:!1,followPointer:!1,shared:!1,useHTML:!0,},legend:{backgroundColor:"#F5F6F8",align:"right",verticalAlign:"bottom",borderWidth:0,rtl:!0,useHTML:!0,margin:30,padding:10,width:760,itemDistance:50,itemMarginBottom:10,itemStyle:{fontWeight:"normal",fontFamily:"IRANSans",fontSize:"12px",color:"#777"},labelFormatter:function(a,b){return mweb_price_chart.convertToFaDigit(this.name)}},plotOptions:{line:{marker:{enabled:!0,fillColor:'#FFFFFF',lineWidth:2,lineColor:null,radius:4,symbol:"circle",states:{hover:{enabled:!1}}}}},series:data.Series.map(function(item,index){item.data=item.data.map(function(it,ind){if(it&&it.length===2)
return[it[0],it[1]];return[it[1]]});return item})})}}}
var mwebThemePopup={init:function($photo,$link){var self=this;if(!self.readCookie('run_popup')){$.magnificPopup.open({mainClass:'mweb-popup',tLoading:'',tClose:'دیگر نمایش نده',items:{src:$('<div class="white-popup"><a href="'+$link+'"><img src="'+$photo+'" /></a></div>')},type:'inline'},0)}},createCookie:function($name,$value,$days){if($days){var date=new Date();date.setTime(date.getTime()+($days*24*60*60*1000));var expires="; expires="+date.toGMTString()}else var expires="";document.cookie=$name+"="+$value+expires+"; path=/"},readCookie:function($name){var nameEQ=$name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length)}
return null}}
function init_carousel(){$('.mw-owl-carousel').each(function(){var owl=$(this);var config=owl.data();config.navText=['<i class="fal fa-angle-left"></i>','<i class="fal fa-angle-right"></i>'];var animateOut=owl.data('animateout');var animateIn=owl.data('animatein');if(typeof animateOut!='undefined'){config.animateOut=animateOut}
if(typeof animateIn!='undefined'){config.animateIn=animateIn}
if($(this).hasClass('owl_autowidth')){config.responsive[0].autoWidth=!0;config.responsive[0].touchDrag=!0}
owl.owlCarousel(config);if(config.nav==!0){var ts=owl.parents('.mweb-block-wrap').find('.block-title');if(ts.length){ts.append('<div class="owl-nav"><div class="owl-prev"><i class="fal fa-angle-left"></i></div><div class="owl-next"><i class="fal fa-angle-right"></i></div></div>');var owlurun=$(this);ts.find('.owl-prev').click(function(){owlurun.trigger('next.owl.carousel')});ts.find('.owl-next').click(function(){owlurun.trigger('prev.owl.carousel')})}}})}
function init_block11_slider(){$('.block11_slider').each(function(){var owlbox=$(this);var config=owlbox.data();if(owlbox.hasClass('owl_autowidth')){config.responsive[0].autoWidth=!0;config.responsive[0].touchDrag=!0}
var inner=owlbox.parents('.mweb-block-wrap').find('.nav_tabs_content');if(inner.length){inner.append('<div class="owl-nav"><div class="owl-prev"><i class="fal fa-angle-left"></i></div><div class="owl-next"><i class="fal fa-angle-right"></i></div></div>');owlbox.owlCarousel(config);inner.find('.owl-prev').click(function(){owlbox.trigger('next.owl.carousel')});inner.find('.owl-next').click(function(){owlbox.trigger('prev.owl.carousel')})}})}
function init_slickslider(){$('.slick_slider_wrap').each(function(){$(this).slick({autoplay:!0,dots:!0,infinite:!0,rtl:!0,slidesToShow:1,slidesToScroll:1,customPaging:function(slider,i){var title=$(slider.$slides[i]).data('title');return'<a class="product_banner_title">'+title+'</a>'}})})}
function initslider_realtime(){$(".owl-realtime").owlCarousel({items:1,loop:!0,rtl:!0,autoplay:!0,dots:!1,onInitialized:startProgressBar,onTranslate:resetProgressBar,onTranslated:startProgressBar})}
function startProgressBar(){$(".slide-progress").css({width:"100%",transition:"width 5000ms"})}
function resetProgressBar(){$(".slide-progress").css({width:0,transition:"width 0s"})}
function instagram_popup_widget(){if(1==mweb_instagram_popup){$('.instagram-el').find('a').magnificPopup({type:'image',closeOnContentClick:!0,closeBtnInside:!0,removalDelay:500,mainClass:'mfp-fade',zoom:{enabled:!0,duration:500,easing:'ease',opener:function(element){return element.find('img')}},gallery:{enabled:!0,navigateByImgClick:!0,preload:[0,1]}})}}
function countDownInit(){if($('.product-date').length>0){$('.product-date').each(function(i,item){var $this=$(this);var date=$(this).attr('data-date');$(item).countdown(date).on('update.countdown',function(event){var $this=$(this).html(event.strftime(''+'<div class="day"><span class="no">%D</span><span class="text">روز</span></div>'+'<div class="hours"><span class="no">%H</span><span class="text">ساعت</span></div>'+'<div class="min"><span class="no">%M</span><span class="text">دقیقه</span></div>'+'<div class="second"><span class="no">%S</span><span class="text">ثانیه</span></div>'))}).on('finish.countdown',function(event){$(this).html('تمام شد').parent().addClass('disabled')})})}}
function qtyInit(){$(document).on('click','.increase',function(e){e.preventDefault();var currentVal=parseInt($(this).parents('.quantity').find('input.qty').val());var maxVal=parseInt($(this).parents('.quantity').find('input.qty').attr("max"));if(isNaN(maxVal)){maxVal=100}
if(isNaN(currentVal)){currentVal=0}
if(!isNaN(currentVal)&&currentVal<maxVal){$(this).parents('.quantity').find('input.qty').val(currentVal+1).change()}});$(document).on('click','.reduced',function(e){e.preventDefault();var currentVal=parseInt($(this).parents('.quantity').find('input.qty').val());if(!isNaN(currentVal)&&currentVal>1){$(this).parents('.quantity').find('input.qty').val(currentVal-1).change()}})}
function shop_carousel_filter(){$('.wd_title').click(function(e){var wd_parent=$(this).closest('.wd_filter');if(wd_parent.hasClass('active')){wd_parent.removeClass('active');$('.wd_filter_wrap').removeClass('active')}else{$('.wd_filter').removeClass('active');wd_parent.addClass('active');$('.wd_filter_wrap').addClass('active')}})}
function init_sticky_adcart(){var el_adcart=$('.add_to_cart_sticky');if(!$('.single_add_to_cart_button').length||!el_adcart.length){return}
var el_offset=$('.single_add_to_cart_button').offset();var el_footer=$('.footer_wrap');if(!el_footer.length){el_footer=$('.elementor-location-footer')}
if($(window).width()>=768){$(window).scroll(function(e){var currentScroll=$(this).scrollTop();if(currentScroll>el_offset.top&&el_adcart.offset().top<(el_footer.offset().top-el_adcart.height())){el_adcart.addClass('active')}else{el_adcart.removeClass('active')}})}else{$(window).scroll(function(e){var currentScroll=$(this).scrollTop();if(currentScroll>el_offset.top){el_adcart.addClass('active')}else{el_adcart.removeClass('active')}})}
el_adcart.on('click',function(e){$('html,body').animate({scrollTop:el_offset.top-150},'slow')})}
var el_offset=$('.single_add_to_cart_button');if(el_offset.length>0){$('.el_addtocart').on('click',function(e){$('html,body').animate({scrollTop:el_offset.offset().top-150},'slow')})}else{if($('.el_addtocart').length>0){$('.el_addtocart').addClass('disable')}}
var mwebvariationForm={init:function(){if(!$('form.variations_form').length){return}else{var $product=$('.variations_form').closest('.product'),$product_img=$product.find('div.product-images .woocommerce-main-image');$product.data('img-src',$product_img.attr('src'));$product.data('img-datasrc',$product_img.attr('data-src'));$product.data('img-title',$product_img.attr('title'));$(document).on('reset_image','.variations_form',function(event){event.preventDefault();var $product_images=$product.find('.product-images'),$product_thumbs=$product.find('.product-thumbs');if($product_images.length){if($product.find('.gallery_type_h').length){$product_images.trigger('to.owl.carousel',[0,300,!0])}else if($product.find('.gallery_type_v').length){}
$product_img.each(function(){$(this).attr('src',$product.data('img-src')).attr('data-src',$product.data('img-datasrc')).attr('alt',$product.data('img-title')).attr('srcset','');var elevateZoom=$(this).data('elevateZoom');if(typeof elevateZoom!='undefined'){elevateZoom.swaptheimage($(this).attr('src'),$(this).attr('data-src'))}});var imgsrc=$product_images.data('imgsrc'),imgtitle=$product_images.data('imgtitle');if(typeof imgsrc!='undefined'&&typeof imgtitle!='undefined'){imgsrc.unshift({src:$product.data('img-src')});imgtitle[0]=$product.data('img-title')}
$product_images.data('imgsrc',imgsrc);$product_images.data('imgtitle',imgtitle)}
if($product_thumbs.length){if($product.find('.gallery_type_h').length){$product_thumbs.trigger('to.owl.carousel',[0,300,!0])}else if($product.find('.gallery_type_v').length){}
$product_thumbs.find('.owl-item:eq(0)').click();var $thumb_img=$product.find('.woocommerce-main-thumb');if($thumb_img.parents('.img').attr('data-thumb')){$thumb_img.attr('src',$thumb_img.parents('.img').attr('data-thumb')).attr('srcset','')}}});$(document).on('found_variation','.variations_form',function(event,variation){if(typeof variation=='undefined'){return}
var $product_images=$product.find('.product-images'),$product_thumbs=$product.find('.product-thumbs');if($product_images.length){if($product.find('.gallery_type_h').length){$product_images.trigger('to.owl.carousel',[0,300,!0])}else if($product.find('.gallery_type_v').length){try{$product_images.slick("slickGoTo",0)}catch(error){}}}
var imgsrc=$product_images.data('imgsrc'),imgtitle=$product_images.data('imgtitle');if($product_thumbs.length){if($product.find('.gallery_type_h').length){$product_thumbs.trigger('to.owl.carousel',[0,300,!0])}else if($product.find('.gallery_type_v').length){try{$product_thumbs.slick("slickGoTo",0)}catch(error){}}
$product_thumbs.find('.owl-item:eq(0)').click()}
var $thumb_img=$product.find('.woocommerce-main-thumb'),variation_fullsrc=variation.image.full_src,variation_src=variation.image.src,variation_title=variation.image.caption,variation_thumb=(typeof variation.image.thumb_src!='undefined')?variation.image.thumb_src:variation.image.src;if(variation_src){$product_img.attr('src',variation_src).attr('data-src',variation_fullsrc).attr('alt',variation_title).attr('srcset','').attr('data-zoom-image',variation_fullsrc);$thumb_img.attr('src',variation_thumb).attr('srcset','');if(typeof imgsrc!='undefined'&&typeof imgtitle!='undefined'){imgsrc.unshift({src:variation_fullsrc});imgtitle[0]=variation_title}}else{$product_img.attr('src',$product.data('img-src')).attr('data-src',$product.data('img-datasrc')).attr('alt',$product.data('img-title')).attr('srcset','').attr('data-zoom-image',$product.data('img-datasrc'));$thumb_img.attr('src',$thumb_img.parents('.img').attr('data-thumb')).attr('srcset','');if(typeof imgsrc!='undefined'&&typeof imgtitle!='undefined'){imgsrc.unshift({src:src});imgtitle[0]=o_title}}
$product_images.data('imgsrc',imgsrc);$product_images.data('imgtitle',imgtitle);$product_img.each(function(){var elevateZoom=$(this).data('elevateZoom');if(typeof elevateZoom!='undefined'){elevateZoom.swaptheimage($(this).attr('src'),$(this).attr('data-src'))}})})}},reDesignVariationForm:function($wrap){if(typeof $wrap=='undefined')var $wrap='';if($wrap!=''){$wrap=$wrap+' .type-product.product-type-variable'}else{$wrap='.type-product.product-type-variable'}
if($($wrap).length&&typeof mw_arr_attr!=='undefined'){$($wrap).find('.variations select').each(function(){var select=$(this),select_div,var_attr=mw_arr_attr[select.attr('name')];if(typeof var_attr=='undefined'){return!1}
if(var_attr.type=='select'||var_attr.type==''){select.niceSelect();select.on('change',function(){select.niceSelect('update')})}else{select_div=$('<div />',{'class':'sellect-wrap','data-atrrname':select.attr('name'),}).insertAfter(select);select.hide();select.find('option').each(function(){var option_old=$(this),option;if(option_old.attr('value')!=''){var inner_opt,class_sellect,val_opt=var_attr.key_val[option_old.attr('value')];if(var_attr.type=='color'){inner_opt=$('<span/>',{'html':option_old.text()});var outer_opt=$('<i/>',{'style':'background:'+val_opt,}).appendTo(inner_opt);class_sellect=' color'}else if(var_attr.type=='image'){inner_opt=$('<span/>',{'style':'background-image:url("'+val_opt+'")'});class_sellect=' image'}else if(var_attr.type=='text'){inner_opt=$('<span/>',{'html':val_opt});class_sellect=' text'}
if(var_attr.type!='select'){option=$('<div/>',{'class':'option'+class_sellect,'data-toggle':'tooltip','data-original-title':option_old.text(),'data-value':option_old.attr('value')}).appendTo(select_div);inner_opt.appendTo(option);if(option_old.val()==select.val()){option.addClass('selected')}
var data_variations=$('.variations_form').data('product_variations');option.on('click',function(){if($(this).hasClass('disable')){return!1}
if($(this).hasClass('selected')){select.val('').change()}else{select.val(option_old.val()).change()}
var e_this=$(this);var e_key=e_this.parents('.sellect-wrap').data('atrrname');$.each(data_variations,function(i,value){if(value.attributes[e_key]==e_this.data('value')&&(value.is_in_stock==!1)){var e_count=Object.keys(value.attributes).length;$.each(value.attributes,function(i,value){if(value!=''){if($("div.option[data-value='"+value+"']").hasClass('disable')){$("div.option[data-value='"+value+"']").removeClass('disable')}else{$("div.option[data-value='"+value+"']").addClass('disable')}
if(e_count>1)
e_this.removeClass('disable')}})}else{if(value.attributes[e_key]==e_this.data('value')&&(value.is_in_stock==!0)){$.each(value.attributes,function(i,value){if(value!=''){$("div.option[data-value='"+value+"']").removeClass('disable')}else{$(".sellect-wrap[data-atrrname='"+i+"'] .option").removeClass('disable')}})}}});mwebvariationForm.setSelectedOpt($(this))})}}})}});$(document).on('click','.variations_form .reset_variations',function(event){$('.variations_form .sellect-wrap .option').removeClass('selected').removeClass('disable');$('select').niceSelect('update')})}},setSelectedOpt:function(option){option.toggleClass('selected');option.siblings().removeClass('selected').removeClass('disable')}}
jQuery(window).load(function(){if(mweb_popup_pic){mwebThemePopup.init(mweb_popup_pic,mweb_popup_link);mwebThemePopup.createCookie('run_popup',!0,mweb_popup_day)}});jQuery(document).ready(function($){'use strict';if($('li.questions_tab').length>0){var hash=window.location.hash;var url=window.location.href;if(hash.toLowerCase().indexOf('question-')>=0||hash==='#tab-questions'){$('li.questions_tab a').click();console.log('ssssss')}}
$.extend(!0,$.magnificPopup.defaults,{tClose:'بستن',tLoading:'بارگذاری ...',gallery:{tPrev:'قبل',tNext:'بعد',tCounter:'%curr% از %total%'},image:{tError:'<a href="%url%">عکس</a> نمی تواند بارگذاری شود.'},ajax:{tError:'<a href="%url%">محتوا</a> نمی تواند بارگذاری شود.'}});$('.btn_price_chart , .btn_360').magnificPopup({type:'inline',midClick:!0,mainClass:'mfp-fade',removalDelay:160,disableOn:!1,preloader:!1,fixedContentPos:!1,callbacks:{open:function(){$(window).resize()},},});if($('.btn_price_chart').length>0&&typeof price_chart_data!='undefined'){mweb_price_chart.init()}
init_carousel();init_block11_slider();init_slickslider();instagram_popup_widget();initslider_realtime();init_sticky_adcart();if(mweb_header_sticky){var offset_top=$('header').height();$(window).scroll(function(event){var currentScroll=$(this).scrollTop();if(currentScroll>offset_top){$('.custom_sticky').addClass('my_sticky')}else{$('.custom_sticky').removeClass('my_sticky')}})}
if(mweb_header_sticky){var header=$('.head_mobile');$('body.body_ismobile').addClass('is_head_sticky');var previousScroll=0;$(window).scroll(function(event){var currentScroll=$(this).scrollTop();if(currentScroll>previousScroll){if(currentScroll>115){header.removeClass('visible');header.removeClass('position_top')}}else{if(currentScroll<155){header.addClass('position_top')}
header.addClass('visible')}
previousScroll=currentScroll})}
if(1==mweb_sidebar_sticky_enable){$('.sidebar-wrap').each(function(){var mweb_sidebar_el=$(this);mweb_sidebar_el.theiaStickySidebar({additionalMarginTop:0})})}
if($('.compare_list_table').length>0){var tb_sticky=$('.compare_list_table').offset().top;if(mweb_header_sticky){$('.table-compare').addClass('tb_sticky_over')}
$(window).scroll(function(event){var tb_current=$(this).scrollTop();if(tb_current>tb_sticky){$('.table-compare').addClass('tb_sticky')}else{$('.table-compare').removeClass('tb_sticky')}})}
$(document).on("change",".cart_item .qty",function(e){e.preventDefault();setTimeout(function(){$("td.actions button").trigger("click")},2000)});$('#advantage-input , #disadvantages-input').on('change keyup',function(){var input_point=$(this);var input_param=input_point.val();if(input_param){input_point.next().fadeIn()}else{input_point.next().hide()}});$(".advantages").delegate(".add_point_advantage",'click',function(e){if($('.advantages_list').find(".advantage_item").length>=5){return}
var advantage_input=$(this).prev();if(advantage_input.val().trim().length>0){$('.advantages_list').append('<div class="advantage_item">\n'+advantage_input.val()+'<button type="button" class="remove_point"></button>\n'+'<input type="hidden" name="advantages[]" value="'+advantage_input.val()+'">\n'+'</div>');advantage_input.val('').change();advantage_input.focus()}}).delegate(".remove_point",'click',function(e){$(this).parent('.advantage_item').remove()});$(".disadvantages").delegate(".add_point_disadvantage",'click',function(e){if($('.disadvantages_list').find(".disadvantage_item").length>=5){return}
var disadvantage_input=$(this).prev();if(disadvantage_input.val().trim().length>0){$('.disadvantages_list').append('<div class="disadvantage_item">\n'+disadvantage_input.val()+'<button type="button" class="remove_point"></button>\n'+'<input type="hidden" name="disadvantages[]" value="'+disadvantage_input.val()+'">\n'+'</div>');disadvantage_input.val('').change();disadvantage_input.focus()}}).delegate(".remove_point",'click',function(e){$(this).parent('.disadvantage_item').remove()});if($('.rating_wrap').length>0){var fa_label=["خیلی بد","بد","معمولی","خوب","عالی"].reverse();var rev_number=[1,2,3,4,5].reverse();$(".rate_slider").slider({max:5,min:1,value:3,step:1,change:function(e,ui){$(e.currentTarget).next('input').val(rev_number[ui.value-1])}}).slider("pips",{first:"pip",last:"pip",}).slider("float",{labels:fa_label})}
$('.recommended_warp select').niceSelect();var mweb_body=$('body');var mweb_off_canvas_button=$('#mweb-trigger');var mweb_off_canvas_button_close=$('#mweb-close-off-canvas');var mweb_mask=$('.mweb-site-mask');mweb_off_canvas_button.click(function(){mweb_body.toggleClass('mobile-js-menu');return!1});mweb_off_canvas_button_close.click(function(){mweb_body.removeClass('mobile-js-menu');return!1});mweb_mask.click(function(){mweb_body.removeClass('mobile-js-menu');return!1});var mobile_menu=$('.mobile-menu-wrap');var sub_mobile_menu=mobile_menu.find('li.menu-item-has-children');var sub_mobile_a=mobile_menu.find('li.menu-item-has-children > a');sub_mobile_a.append('<i class="explain-menu fal fa-angle-left"></i>');$('.explain-menu').unbind('click').bind('touchend click',function(e){e.preventDefault();$(this).parent('a').toggleClass('active').siblings('ul').slideToggle(500)});sub_mobile_menu.find('a').click(function(event){event.stopPropagation()});mobile_menu.click(function(event){event.stopPropagation()});$('.gototop, .go_up').click(function(){$('html,body').animate({scrollTop:0},'slow');return!1});if($('#nav_select').length>0){$('#nav_select').tinyNav({active:'selected',header:'فهرست',indent:'-'})}
if($('#accordionfaq').length>0){$("#accordionfaq").smoothAccordion()}
if($('.accordion-shortcode').length>0){$(".accordion-shortcode").smoothAccordion()}
$('.more_btn').click(function(e){e.preventDefault();$(this).closest("div").find('.entry_readmore').toggleClass('fullheight');$(this).toggleClass('active')});$('.or_view').click(function(e){e.preventDefault();$(this).parents('.morder_item').next().slideToggle()});$('.notify_item .el_more').click(function(e){e.preventDefault();$(this).parents('.meta_notify').next().slideToggle()});$('.my_account_menu').click(function(e){e.preventDefault();$('body').addClass('my_account_s')});$('.my_account_close').click(function(e){e.preventDefault();$('.woocommerce-MyAccount-navigation').removeClass('is_active');$('body').removeClass('my_account_s')});$('.get_sidebar').click(function(e){var target='.'+$(this).data('class').substring(5);if($(target).length){e.preventDefault();$('body').addClass($(this).data('class')+' sidebar_open')}});$('.close_sidebar').click(function(e){e.preventDefault();$('body').removeClass($(this).data('class')+' sidebar_open')});$('body').on('wc_fragments_loaded',function(){if($('.cart_sidebar').length){$('.get_sidebar.shop_cart').trigger('click')}});$('body').on('wc_cart_button_updated',function(event,button){});var box_mail_wrap=$('.popup-share');function mweb_is_email(value){return/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value.val())}
box_mail_wrap.find('a.first_el').click(function(){var share_post_id=$(this).attr('data_post_id');var box_popup=$(this).next('.share-to-email-popup');if(box_popup.is(':visible')){box_popup.fadeOut("slow");box_popup.find('.errors').hide().removeClass('error');box_popup.find('.share-errors').removeClass('show-error')}else{box_popup.fadeIn("slow");var h_el=box_popup.height();box_popup.animate({top:'-'+h_el+'px'},'slow');box_popup.find('input[type=submit]').removeAttr('disabled')}
box_popup.find('.share-mail-cancel').unbind('click').click(function(){box_popup.fadeOut("slow");box_popup.find('.errors').hide().removeClass('error');box_popup.find('.share-errors').removeClass('show-error');return!1});box_popup.find('input[type=submit]').unbind('click').click(function(){box_popup.find('.error').removeClass('error');box_popup.find('.share-errors').removeClass('show-error');var source_email=box_popup.find('input[name=source-email]');var target_email=box_popup.find('input[name=target-email]');var name=box_popup.find('input[name=source-name]');if(mweb_is_email(source_email)==!1){source_email.addClass('error');box_popup.find('.share-errors').addClass('show-error')}
if(mweb_is_email(target_email)==!1){target_email.addClass('error');box_popup.find('.share-errors').addClass('show-error')}
if(box_popup.find('.error').length==0){box_popup.find('.share-loading').css('display','block');$.ajax({url:mweb_ajax_url,type:'POST',data:{action:'mweb_ajax_email',share_post_id:share_post_id,source_email:source_email.val(),target_email:target_email.val(),name:name.val()},success:function(data){data=jQuery.parseJSON(data);if(data){box_popup.html(data)}
$('.share-mail-close').click(function(){box_popup.fadeOut("slow");return!1})}})}
return!1});return!1});countDownInit();qtyInit();$('.progress .progress-bar').progressbar();mwebvariationForm.reDesignVariationForm();mwebvariationForm.init();mwebSinglePrdIHG.init('.gallery_type_h');$('.product-categories').mwAccordion({btn_open:'<span class="ac-tongle open"></span>',btn_close:'<span class="ac-tongle close"></span>',});$('.nav-tabs_trigger').click(function(e){e.preventDefault();$(this).next('.nav-tabs').slideToggle(300)});$('.menu_title').click(function(e){e.preventDefault();$(this).parent().toggleClass("active");$('.head_3_menu').slideToggle(300)});if(mweb_acc_digits){$('.login_btn, .comment_login').addClass('digits-login-modal')}
$('.login_btn, .comment_login, .user_cant_ps, .showlogin').click(function(){if(mweb_ajax_account){$('html,body').animate({scrollTop:0},'slow');$('body').toggleClass('account_area');return!1}});$('.mweb-site-mask').click(function(){$('body').removeClass('account_area my_account_s sidebar_open open_cart_sidebar open_filter_sidebar open_categories_sidebar')});$('.create_account').click(function(){$('.login_wrap').hide('fast');$('.register_wrap').fadeIn();return!1});$('.close_modal').click(function(){$('.register_wrap').hide('fast');$('.login_wrap').fadeIn();return!1});$('.hs_search_btn').click(function(){$('.search_overlay').addClass('active')});$('.search_toggle').click(function(){$('.search_overlay').removeClass('active')});shop_carousel_filter();$('.loadmore').click(function(e){e.preventDefault();$('.term-description').toggleClass('desc_show',function(){if($(this).is(".desc_show")){$('.loadmore').text('کمینه کردن اطلاعات ...')}else{$('.loadmore').text('اطلاعات بیشتر ...')}})});jQuery(window).scroll(function(){jQuery(this).scrollTop()>250?jQuery(".sticky_toolbox").addClass("active"):jQuery(".sticky_toolbox").removeClass("active")});$('.compare-button .compare , .type-product .summary .compare, .yith-wcwl-add-button .add_to_wishlist, .yith-wcwl-wishlistaddedbrowse a, .yith-wcwl-wishlistexistsbrowse a').each(function(){$(this).attr('data-toggle','tooltip').attr('data-original-title',$(this).text().trim())});$("body *[data-toggle='tooltip']").each(function(){$(this).tooltip()});$(".remindme_icon").click(function(e){if($(this).prev().hasClass('fadeout')){$("#remindme_form").removeClass("fadeout").addClass("fadein")}else{$("#remindme_form").removeClass("fadein").addClass("fadeout")}});$(".close_remindme").click(function(e){$("#remindme_form").removeClass("fadein").addClass("fadeout")});$("#remindme_button").click(function(e){if($("#remindme_email").val()==''){var incorrect_entry=$("#incorrect_entry").html();$("#remindme_email").focus();$("#remindme_email").attr('placeholder',incorrect_entry);$("#remindme_email").css('border','1px solid #f20')}else{var email=$("#remindme_email").val();var target=$(".remindme_icon").attr('id');var product_id=$("#product_id").html();var product_price=$("#product_price").html();if(!ValidateEmailAddress(email)){$("#remindme_email").focus();$("#remindme_email").css('border','1px solid #f20')}else{$.ajax({type:"POST",url:mweb_ajax_url,datatype:"html",data:{'action':'remindme_addemail','email':email,'target':target,'product_id':product_id,'product_price':product_price},success:function(response){$("#description").hide();$("#remindme_form").html(response);$("#remindme").addClass("remindme_on")},error:function(response){$("#description").hide();$("#remindme_form").html(response)}})}}});function ValidateEmailAddress(email){var pattern=/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;return pattern.test(email)}
lazyLoadInstance=new LazyLoad({threshold:0,})});jQuery(document).ajaxComplete(function(){$('.compare-button a ,.type-product .summary .compare, .yith-wcwl-add-to-wishlist .add_to_wishlist, .yith-wcwl-wishlistaddedbrowse a, .yith-wcwl-wishlistexistsbrowse a').each(function(){$(this).attr('data-toggle','tooltip').attr('data-original-title',$(this).text().trim())});$('.woocommerce .compare.button').each(function(){if($(this).text().trim()!='')$(this).attr('data-original-title',$(this).text().trim())});$("body *[data-toggle='tooltip']").each(function(){$(this).tooltip()});shop_carousel_filter();lazyLoadInstance.update()})})(jQuery)