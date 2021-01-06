/* 
	PARSIAN RESPONSIVE jQuery Plugin
	versio 0.7.4 
	Jan 2014
	Iran, Tehran
	
	Mohammad Khakifirooz
	ParsianMehr & BanipalArt
	banipalart@gmail.com
	
	
*/
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Size Fix
/* ------------------------------------------------------------------------------------------------------------------------------ */

(function($){
	$.fn.fix = function(property, offset, parent, func) {
		pthis = this['selector'];
		return this.each(function() {
			/* ----- set default Array */
			var value = {property: 'widthHeight', parent: window, offset: "0", func: function() {}}
			/* ----- change Default Array */
			if (offset && !$.isFunction(offset)) {value['offset'] = offset} else if ($.isFunction(offset)){value['func'] = offset }
			if (parent && !$.isFunction(parent)) {value['parent'] = parent} else if ($.isFunction(parent)){value['func'] = parent }
			if (property && !$.isFunction(property)) {value['property'] = property} else if ($.isFunction(property)){value['func'] = property }
			if (func && $.isFunction(func)) {value['func'] = func}
			/* ----- set Width & Height */
			var w= 0; var h=0;
			
			var fixSet = {
				function : function(param) {
					if (value['offset'].slice(-1) == "%") {
						w = ($(value['parent']).innerWidth()/100)*Number(value['offset'].slice(0,-1));
						h = ($(value['parent']).innerHeight()/100)*Number(value['offset'].slice(0,-1));
					} else {
						w = $(value['parent']).innerWidth() - Number(value['offset']);
						h = $(value['parent']).innerHeight()- Number(value['offset']);
					}
					if (param) {
						var fw = param['objectW']; 
						var fh = param['objectH']; 
						var mod = param['mod'];
						if (mod == "h") { w = (fw*h)/fh;
						} else if (mod == "w") { h = (fh*w)/fw;
						} else if (mod == "wh") { pw = (fw*h)/fh;
							if (pw < w) { h = (fh*w)/fw;
							} else { h = h; w = pw; }
						}
					}
					return ({w:w, h:h});
				}
			}
			/* -----  Process */
			var fixArray = {
				widthHeight : function(param) {
					if ($(this).attr("data-fix_w") && $(this).attr("data-fix_h")) {
						fixSet['function'].apply(this,[{objectW :$(this).attr("data-fix_w"), objectH :$(this).attr("data-fix_h"), mod: "wh"}]);
						$(this).css({"height":h});
					} else {
						fixSet['function'].apply(this);
					}
					$(this).css({ "width":w, "height":h});
					fixReturn['returned'].apply( this);
				},
				width : function (param) {
					if ($(this).attr("data-fix_w") && $(this).attr("data-fix_h")) {
						fixSet['function'].apply(this,[{objectW :$(this).attr("data-fix_w"), objectH :$(this).attr("data-fix_h"), mod: "w"}]);
						$(this).css({"height":h});
					} else {
						fixSet['function'].apply(this);
					}
					$(this).css({ "width":w});
					fixReturn['returned'].apply( this);
				},
				height : function(param) {
					if ($(this).attr("data-fix_w") && $(this).attr("data-fix_h")) {
						$(this).css({"width": (fixSet['function'].apply(this,[{objectW :$(this).attr("data-fix_w"), objectH :$(this).attr("data-fix_h"), mod: "h"}]))['w']});
					} else {
						fixSet['function'].apply(this);
					}
					$(this).css({"height":h});
					fixReturn['returned'].apply(this);
				}
			}
			var fixReturn = {
				returned: function () {
					value['func'].apply(this, [{width:w, height:h, parentHeight: $(value['parent']).innerHeight(), parentWidth: $(value['parent']).innerWidth()}]);
				}
			}
			if (fixArray[value['property']]) {
				fixArray[value['property']].apply(this);
			} else {
				$.error( ' (Memet Khaki) : "' +  value['property'] + '" does not exist on jQuery.fix' );
			}
		})
	}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Position 
/* ------------------------------------------------------------------------------------------------------------------------------ */
	$.fn.pos = function(px, py, func) {
		return this.each(function() {
			/* ----- set default Array */
			var value = {x: {position: "left", offset: "0"}, y: {position: "top", offset: "0"}, func: function() {}}
			/* ----- change Default Array */
			if (px && !$.isFunction(px)) {
				if ($.type(px) == "object") { 
					if (px['offset'].slice(-1) == "%") {
						value['x']['offset'] = -($(this).parent().innerWidth()/100)*Number(px['offset'].slice(0,-1));
					} else {
						value['x']['offset'] = px['offset'];	
					}
					value['x']['position'] = px['position']; 
				} else { value['x']['position'] = px; }
			} else if ($.isFunction(px)){ value['func'] = px; }
			if (py && !$.isFunction(py)) {
				if ($.type(py) == "object") { 
					if (py['offset'].slice(-1) == "%") {
						value['y']['offset'] = -($(this).parent().innerHeight()/100)*Number(py['offset'].slice(0,-1));
					} else {
						value['y']['offset'] = py['offset'];	
					}
					value['y']['position'] = py['position']; 
				} else { value['y']['position'] = py; }
				if ($.type(py) == "object") { value['y']['position'] = py['position']; value['y']['offset'] = py['offset'];	
				} else {value['y']['position'] = py;}
			} else if ($.isFunction(py)){value['func'] = py;}
			if (func && $.isFunction(func)) {value['func'] = func;}
			/* ----- set X & Y */
			var x= 0; var y=0;
			var posSet = {
				function : function(param) {
					if (value['x']['position'] == 'left') {
						x = 0+ Number(value['x']['offset'])
					} else if (value['x']['position'] == 'right') {
						x = ($(this).parent().width()-$(this).outerWidth())+ Number(value['x']['offset'])
					} else if (value['x']['position'] == 'center') {
						x = (($(this).parent().width()/2)- ($(this).outerWidth()/2))+ Number(value['x']['offset'])
					}
					if (value['y']['position'] == 'top') {
						y = 0 + Number(value['y']['offset'])
					} else if (value['y']['position'] == 'bottom') {
						y = ($(this).parent().height()-$(this).outerHeight())+ Number(value['y']['offset'])
					} else if (value['y']['position'] == 'center') {
						y = (($(this).parent().height()/2)- ($(this).outerHeight()/2))+ Number(value['y']['offset'])
					}
				}
			}
			/* -----  Process */
			$(this).css("position", "absolute")
			var posArray = {
				x : function(param) {
					posSet['function'].apply(this)
					$(this).css({ "left":x});
					posReturn['returned'].apply( this);
				},
				y : function(param) {
					posSet['function'].apply(this)
					$(this).css({ "top":y});
					posReturn['returned'].apply( this);
				},
				xy : function(param) {
					posSet['function'].apply(this)
					$(this).css({ "top":y, "left":x});
					posReturn['returned'].apply( this);
				}
			}
			var posReturn = {
				returned: function () {
					value['func'].apply(this, [{x:x, y:y}]);
				}
			}
			if (px && !py) {
				return posArray['x'].apply( this)
			} else if (py && !px) {
				return posArray['y'].apply( this)
			} else if (px && py) {
				return posArray['xy'].apply( this)
			} else {
				$.error( ' (Memet Khaki) : "' +  px + '" does not exist on jQuery.pos' );
			}
		})
	}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Scroll To 
/* ------------------------------------------------------------------------------------------------------------------------------ */
	$.fn.scrlTo = function(position, offset, duration, delay, func) {
		return this.each(function() {
			/* ----- set default Array */
			snaped = "";
			scroller = skrollr.get();
			var value = {position: "top", offset:"0", duration:300, delay:5, func:function() {}}
			/* ----- change Default Array */
			if (position && !$.isFunction(position)) {value['position'] = position;} else if ($.isFunction(position)) {value['func'] = position;}
			if (offset && !$.isFunction(offset)) {value['offset']=offset;} else if ($.isFunction(offset)) {value['func'] = offset;}
			if (duration && !$.isFunction(duration)) {value['duration']=Number(duration);} else if ($.isFunction(duration)) {value['func'] = duration;}
			if (delay && !$.isFunction(delay)) {value['delay']=Number(delay);} else if ($.isFunction(delay)) {value['func'] = delay;}
			if (func && $.isFunction(func)) {value['func'] = func}
			/* ----- set Scroll */
			
			if (value['position'] == "bottom") {
				if (value['offset'].slice(-1) == "%") {
					pos = $(this).offset().top + (($(window).outerHeight()/100)*Number(value['offset'].slice(0,-1)));
				} else {
					pos = $(this).offset().top + Number(value['offset']);
				}
				pos = pos -($(window).height()-$(this).outerHeight())//- $(this).outerHeight()//- ($(window).height()-$(this).outerHeight());
			} else {
				if (value['offset'].slice(-1) == "%") {
					pos = $(this).offset().top + (($(window).outerHeight()/100)*Number(value['offset'].slice(0,-1)));
				} else {
					pos = $(this).offset().top + Number(value['offset']);
				}
				console.log($(this).offset().top)
			}
			if ((navigator.userAgent.indexOf("Windows") != -1) || (navigator.userAgent.indexOf("Macintosh") != -1) || (navigator.userAgent.indexOf("Linux") != -1)) {
				curent = $(window).scrollTop();
			} else {
				curent = scroller.getScrollTop();
			}
			
			moveCount = Math.round(value['duration']/value['delay']);
			persec = (pos - curent) / moveCount;
			/* -----  Return */
			var scrlToReturn = {
				returned: function () {
					value['func'].apply(this, [{y:y, pos: pos}]);
				}
			}
			/* -----  Process */
			if (persec != 0) {
				count = 1;
				var scrlToArray = {
					set: function () {
						y = curent + (persec * count);
						if (count < moveCount) {
							if (y != 0) {
								scrlToPlay['play'].apply(this, [{y:y, pos:pos}]);
							}
							timer = setTimeout(function() { scrlToArray['set'].apply(this); }, value['delay']);
						} else {
							scrlToPlay['play'].apply(this, [{y:pos, pos:pos}]);
							scrlToReturn['returned'].apply(this);
						}
						count++;	
					}	
				}
				timer = setTimeout(function() { scrlToArray['set'].apply(this); }, value['delay']);
			} else { y = pos; scrlToReturn['returned'].apply(this);}
			/* ----- play Scroll */
			var scrlToPlay = {
				play: function () {
				    if ((navigator.userAgent.indexOf("Mobile") != -1)) {scroller.animateTo(curent + y, { duration: 200 })
				    } else {
				        if ((navigator.userAgent.indexOf("Firefox") != -1) ) { $(window).stop().scrollTop(y)
				        } else if (navigator.userAgent.indexOf("MSIE") != -1) { $(window).stop().scrollTop(y)
				        } else { $("body").stop().animate({ scrollTop: y }, 1);
				        }
					}
				}
			}
			
		});
	}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Event Scroll
/* ------------------------------------------------------------------------------------------------------------------------------ */
	var scrollEnabled = true;
	ScrollEventId = 0;
	var scrollArray = new Array();
	window.onscroll = function (event) {
		//return setTimeout((function() {
			jQuery.each(scrollArray, function(i, value) {
				scrollArray[i]['func'].apply(this,[{scrollPos:$(window).scrollTop(), pos:$(scrollArray[i]['add']).offset().top, this: scrollArray[i]['add']}]);
			})
			scrollEnabled = true;
		//}), 10);
		scrollEnabled = false; 
	}
	$.fn.scrlEvent = function(scrollFunc, func) {
		return this.each(function() {
			/* ----- set default Array */
			var value = {func:function() {}}
			if ($.isFunction(func)) {value['func']=func}
			/* ----- add */
			ScrollEventId += 1;
			scrollArray.push({ id:ScrollEventId, add: $(this), func: scrollFunc });
			$(this).attr("ScrollEventId",ScrollEventId);
			scrollFunc.apply($(this),[{scrollPos:$(window).scrollTop(), pos:$(this).offset().top, this: $(this)}]);
			/* -----  Return */
			value['func'].apply(this,[{id: ScrollEventId, count: scrollArray.length}]);
		});
	}
	$.fn.scrlEventKill = function(func) {
		return this.each(function() {
			/* ----- set default Array */
			var value = {func:function() {}}
			if ($.isFunction(func)) {value['func']=func}
			/* ----- remove */
			jQuery.each(scrollArray, function(i, value) {
				if (scrollArray[i]['id'] == $(this).attr("ScrollEventId")) { scrollArray.splice(i, 1); }
			})
			$(this).removeAttr( "ScrollEventId" );
			/* -----  Return */
			value['func'].apply(this,[{id: $(this).attr("ScrollEventId"), count: scrollArray.length}]);
		});
	}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Event Resize
/* ------------------------------------------------------------------------------------------------------------------------------ */
	window.resizeEnabled = true;
	window.ResizeEventId = 0;
	window.resizeArray = new Array();
	window.resizeLast = 0;
	window.resizeWidth = $(window).width()
	window.resizeHeight = $(window).height()
	$(window).on("resize", function(event) {
		/*if ((window.resizeLast != event.timeStamp)& (event.timeStamp>100)) {
			fn_resize(event.timeStamp);
		} else {	
			fn_resize(event.timeStamp);
		}*/
		fn_resize(event.timeStamp)
		return setTimeout((function() {
			fn_resize(event.timeStamp)
		}), 30);	
	})
	function fn_resize(ev, num) {

		if ($(window).width() > 1200) {
			$(".resizeClass").addClass("size-lg").removeClass("size-md").removeClass("size-sm").removeClass("size-xs")	
		} else if ($(window).width() > 992) {
			$(".resizeClass").addClass("size-md").removeClass("size-lg").removeClass("size-sm").removeClass("size-xs")
		} else if ($(window).width() > 768) {
			$(".resizeClass").addClass("size-sm").removeClass("size-md").removeClass("size-lg").removeClass("size-xs")
		} else if ($(window).width() < 768) {
			$(".resizeClass").addClass("size-xs").removeClass("size-md").removeClass("size-sm").removeClass("size-lg")
		}
		if (!window.resizeEnabled) { return false; }
		return setTimeout((function() {
			jQuery.each(window.resizeArray, function(i, value) {
				window.resizeArray[i]['func'].apply(window.resizeArray[i]['add'],[{windowWidth:$(window).width(), windowHeight:$(window).height(), this: window.resizeArray[i]['add']}]);
			})
			window.resizeEnabled = true;
			window.resizeLast = ev;
			window.resizeWidth = $(window).width()
			window.resizeHeight = $(window).height()
		}), 10);
		window.resizeEnabled = false; 
	}
	//fn_resize(0);
	$.fn.resizeEvent = function(resizeFunc, func) {
		if (!this) {/*console.log(0)*/}
		//return this.each(function() {
			/* ----- set default Array */
			var value = {func:function() {}}
			if (func && $.isFunction(func)) {value['func']=func}
			/* ----- add */
			window.ResizeEventId += 1;
			
			window.resizeArray.push({ object:window.ResizeEventId, add: $(this), func: resizeFunc });
			//console.log(window.resizeArray)
			$(this).attr("ResizeEventId",window.ResizeEventId);
			/* -----  Return */
			fn_resize(Date.now(), window.ResizeEventId);
			return value['func'].apply(this,[{id: window.ResizeEventId, count: window.resizeArray.length}]);
			
		//});
	}
	$.fn.resizeEventKill = function(func) {
		return this.each(function() {
			/* ----- set default Array */
			var value = {func:function() {}}
			if ($.isFunction(func)) {value['func']=func}
			/* ----- remove */
			jQuery.each(window.resizeArray, function(i, value) {
				if (window.resizeArray[i]['id'] == $(this).attr("ResizeEventId")) { window.resizeArray.splice(i, 1); }
			})
			$(this).removeAttr( "ResizeEventId" );
			/* -----  Return */
			value['func'].apply(this,[{id: $(this).attr("ResizeEventId"), count: scrollArray.length}]);
		});
	}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Snap on Scroll
/* ------------------------------------------------------------------------------------------------------------------------------ */
	var snapJob = true;
	var snapValue = $("body");
	var onSectionPos = $("body");
	function getparentSnap(x,y) { 
		var $elements = $("body .snap:visible").map(function() {
			var $this = $(this);
			var offset = $this.offset();
			var l = offset.left; var t = offset.top; var h = $this.height(); var w = $this.width(); var maxx = l + w; var maxy = t + h;
			return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? $this : null;
		});
		//onSectionPos = $("body")
		$elements.each(function() {
			onSectionPos = (this)
		})
	}
	$.fn.removeSnap = function(obj) {
		return this.each(function() {
			//$(this).removeClass("snap")
			if ($.data( snapValue, "value")) {
				$(window).snap($.data( snapValue, "value").offset, $.data( snapValue, "value").speed, $.data( snapValue, "value").funct)
			}
		})
	}
	$.fn.addSnap = function(obj) {
		return this.each(function() {
			$(this).addClass("snap")
			if ($.data( snapValue, "value")) {
				$(window).snap($.data( snapValue, "value").offset, $.data( snapValue, "value").speed, $.data( snapValue, "value").funct)
			}
		})
	}
	
	$.fn.snap = function(offset, speed, height, func) {
		/* ----- set default Array */
		var value = {offset:{top:0, bottom:0}, speed: 500, height :0.16,  func:function() {}}
		/* ----- change Default Array */
		if (offset && !$.isFunction(offset)) {
			if ($.type(offset) == "object") {value['offset']['top'] = offset['top'];value['offset']['bottom'] = offset['bottom'];
			} else {value['offset']['top'] = offset;}
		} else if ($.isFunction(offset)){value['func'] = offset;}
		if (speed && !$.isFunction(speed)) { value['speed'] = speed; } else if ($.isFunction(speed)){ value['func'] = speed; } 
		if (height && !$.isFunction(height)) { value['height'] = height; } else if ($.isFunction(height)){ value['func'] = height; } 
		if (func && $.isFunction(func)) {value['func'] = func}
		$.data( snapValue, "value",value );
		/* Snap By Click On Scroll bar */
		$(window).unbind("mouseup").bind("mouseup", function(e) {
			offT = Number(value['offset']['top'])
			offB = Number(value['offset']['bottom'])
			offH = offT + offB 
			winS = $(window).scrollTop()+ offT; 
			Te = ($(window).height()-offH)*(value['height']); 
			winH = $(window).height() - offH;
			getparentSnap(0,winS);
			SecY = $(onSectionPos).offset().top; 
			SecH = $(onSectionPos).height();
			topS = winS
			if (winS + winH != $("body").outerHeight()) {
				if (($(onSectionPos).hasClass("snap")) & (SecY + Te >= winS)) {
					topS = SecY;
				} else if (($(onSectionPos).nextAll(".snap:visible").hasClass("snap"))&(SecY + SecH <= winS + Te)) {
					topS = $(onSectionPos).nextAll(".snap:visible").offset().top
				}
			}
			if (navigator.userAgent.indexOf("Firefox") != -1) {
				$("body").stop().scrlTo("top", String(topS-offT),speed, function() {snapJob = true;})
			} else if (navigator.userAgent.indexOf("MSIE") != -1) {
				$("body").stop().scrlTo("top", String(topS-offT),speed, function() {snapJob = true;})
			} else {
				$("body").stop().scrlTo("top", String(topS-offT),speed, function() {snapJob = true;})
			} 
		});
		if (navigator.userAgent.indexOf("Firefox") != -1) {evname = "mousewheel, DOMMouseScroll, MozMousePixelScroll";
		} else if (navigator.userAgent.indexOf("MSIE") != -1) {evname = "onmousewheel  wheel";
		} else if (navigator.userAgent.indexOf("Trident") != -1) {evname = "onmousewheel  wheel ";
		} else {evname = "mousewheel";}
		$(this).unbind(evname).bind(evname, function(e) {
			if (snapJob == false) { return false}
			snapJob = false;
			if (navigator.userAgent.indexOf("Firefox") != -1) {whellnum = e.originalEvent.detail * -1
			} else if (navigator.userAgent.indexOf("MSIE") != -1) {
				if (e.originalEvent.deltaY) {whellnum = e.originalEvent.deltaY* -1
				} else {whellnum = e.originalEvent.wheelDelta}
			} else if (navigator.userAgent.indexOf("Trident") != -1) {
			} else {whellnum = e.originalEvent.wheelDelta}
			offT = Number(value['offset']['top']);
			offB = Number(value['offset']['bottom']);
			offH = offT + offB ;
			winS = $(window).scrollTop()+ offT; 
			Te = ($(window).height()-offH)*(value['height']); 
			winH = $(window).height() - offH;
			speed = Number(value['speed']); 
			getparentSnap(0,winS);
			SecY = $(onSectionPos).offset().top; 
			SecH = $(onSectionPos).height();
			topS = winS
			if (whellnum < 0) {
				if ((winS < (SecY+SecH)-winH) & (winS > (SecY+SecH)-(winH*2))) {
					if ($(onSectionPos).hasClass("snap")) {topS = (SecY + SecH ) - winH
					} else {topS = winS + winH}
				} else if ((SecY+SecH)-winH == winS+winH){
					if ($(onSectionPos).nextAll(".snap:visible").hasClass("snap")) {
						NextSecY = $(onSectionPos).nextAll(".snap:visible").offset().top;
						if (NextSecY <= SecY + winH) {topS = NextSecY} else { topS = SecY + winH}
					} else {if ($(onSectionPos).next()) {topS = SecY + winH}}
				}else if ((winS < (SecY+SecH)) & (winS > (SecY+SecH)-(winH))) {
					if ($(onSectionPos).nextAll(".snap:visible").hasClass("snap")) {
						NextSecY = $(onSectionPos).nextAll(".snap:visible").offset().top
						if (NextSecY <= SecY + winH) {
							topS = NextSecY
							console.log(0)
						} else { 
							topS = SecY + winH
							console.log(90)
						}
						
						
					} else {if ($(onSectionPos).next()) {topS = SecY + winH}}
				}else {topS = winS + winH;}
				console.log(winS, winH, SecY)
			} else if (whellnum > 0){
				if ((SecY < winS) & (SecY + winH > winS)) {
					if ($(onSectionPos).hasClass("snap")) {topS = SecY
					} else {
						if ($(onSectionPos).prevAll(".snap:visible").hasClass("snap")) {
							prevSecY = $(onSectionPos).prevAll(".snap:visible").offset().top
							if (prevSecY >= winS - winH) {topS = prevSecY;} else { topS = winS - winH;}
						} else {topS = winS - winH;}
					}
				} else if (SecY == winS){
					if ($(onSectionPos).prevAll(".snap:visible").hasClass("snap")) {
						prevSecY = $(onSectionPos).prevAll(".snap:visible").offset().top
						if (prevSecY >= winS - winH) {topS = prevSecY;} else { topS = SecY - winH;}
					} else {if ($(onSectionPos).prev()) {topS = SecY - winH}}
				} else {topS = winS - winH;}
			}
			snapJobVal = topS-value['offset']['top'];

			speedS = (speed / 270) * Math.abs((winS)-(topS-value['offset']['top']))
			if (navigator.userAgent.indexOf("Firefox") != -1) {
				$("body").stop().scrlTo("top", String(topS-value['offset']['top']),speedS, function() {snapJob = true;})
			} else if (navigator.userAgent.indexOf("MSIE") != -1) {
				$("body").stop().scrlTo("top", String(topS-value['offset']['top']),speedS, function() {snapJob = true;})
			} else {
				$("body").stop().animate({scrollTop: topS-value['offset']['top']}, speedS, function() {snapJob = true;});	
			} 
			snapJob = false; return false;
		});
	}
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Skrollr
/* ------------------------------------------------------------------------------------------------------------------------------ */
	$.fn.scrl = function(option) { return this.each(function() { skrollr.init(option); }); }
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Slide Fix
/* ------------------------------------------------------------------------------------------------------------------------------ */
	function showBtn($this, num) {
		$($this).children(".next, .prev").show()
		if (num > 0) {$($this).children(".next").removeClass("btn").removeClass("next").addClass("NextBtn").hide()} else { $($this).children(".NextBtn").addClass("btn").addClass("next").removeClass("NextBtn").show()}
		if (num <= (-count+(size+1))) { $($this).children(".prev").removeClass("btn").removeClass("prev").addClass("PrevBtn").hide() } else { $($this).children(".PrevBtn").addClass("btn").addClass("prev").removeClass("PrevBtn").show()}
		$($this).children(".responsive").children(".list").children(".nav").children(".btnR").removeClass("btnR")
		$($this).children(".responsive").children(".list").children(".nav").children(".btnL").removeClass("btnL")
		$($this).children(".responsive").children(".list").children(".nav").children(".item:eq("+(-(num-1)+1)+")").addClass("btnR")
		$($this).children(".responsive").children(".list").children(".nav").children(".item:eq("+(-(num-1)-1)+")").addClass("btnL")
		$($this).children(".count_item").html(count)
		$($this).children(".count_curent").html((-(num-1))+1)
		$($this).children(".count_total").html((-(-count+(size+1)))+2)
		$($this).children(".count_item").html(count)
		if ((num <=1) && (num > (-count+(size))) ) {
			$($this).children(".count_btn").children(".btn.active").removeClass("active")
			$($this).children(".count_btn").children(".btn").eq((-(num-1))).addClass("active")
		}
	}
	$.fn.slideFixGo = function(goTo, func) {
		return this.each(function() {
			if (String($(this).attr("slideFix_numsize")).slice(-1) == "%") {numsize = Number(($(this).innerWidth()/100)*Number(minw.slice(0,-1)));} else {numsize = Number($(this).attr("slideFix_numsize"));}
			num = goTo;
			index = (goTo-1)*-1
			duration = Number($(this).attr("slideFix_duration"))
			size = Math.floor(Number($(this).children(".responsive").innerWidth())/ numsize);
			count =  $(this).children(".responsive").children(".list").children(".nav").children(".item").size();
			$this = this
			if ((num <=1) && (num > (-count+(size))) ) {
				$($this).attr("slideFix", num);
				if ($($this).attr("slideFix_anime") == "normal") {
					$($this).children(".responsive").children(".list").children(".nav").animate({"left":(num-1)*numsize},duration);
				} else if ($($this).attr("slideFix_anime") == "fade") {
					$($this).children(".responsive").children(".list").children(".nav").children(".item.indexed").removeClass("indexed").addClass("indexedold").css({"position":"absolute", "left":"0px", "z-index":"2"})
					$($this).children(".responsive").children(".list").children(".nav").children(".item").eq(index).addClass("indexed").fadeTo(0,0).css({"position":"absolute", "left":"0px", "z-index":"3"}).fadeTo(duration, 1, function() {
						$($this).children(".responsive").children(".list").children(".nav").children(".item.indexedold").css({"position":"", "z-index":"1", "left":""}).removeClass("indexedold")
					})
				} else if ($($this).attr("slideFix_anime") == "stepfade") {
					$($this).children(".responsive").children(".list").children(".nav").fadeTo(duration/2,0, function() {
						$(this).animate({"left":(num-1)*numsize},0, function() {
							$(this).fadeTo(duration/2,1)
						})
					})
				}
			}
			showBtn(this, num)
			if ($.isFunction(func)) { return func.apply(this,[{num: num, duration: duration, size:size, count: count, numsize:numsize}]); }
		})
	}
	$.fn.slideFixNext = function(func) {
		return this.each(function() {
			$(this).slideFixGo(Number($(this).attr("slideFix"))+1)
			if ($.isFunction(func)) { return func.apply(this,[{num: num}]); }
		})
	}
	$.fn.slideFixPrev = function(func) {
		return this.each(function() {
			$(this).slideFixGo(Number($(this).attr("slideFix"))-1)
			if ($.isFunction(func)) { return func.apply(this,[{num: num}]); }
		})
	}
	$.fn.slideAuto = function(time, func) {
		return this.each(function() {
			$this = $(this); autoSlidePlay($this, time); if ($.isFunction(func)) { return func.apply(this,[{num: num}]); }
		})
	}
	function autoSlidePlay($this, time) {
		var myVar = setInterval(function () {
			f = Number($this.attr("slideFix"));ff = (f-1)*-1;ff += 1;f = (ff * -1) + 1;
			if (String($this.attr("slideFix_numsize")).slice(-1) == "%") {numsize = Number(($this.innerWidth()/100)*Number(minw.slice(0,-1)));} else {numsize = Number($this.attr("slideFix_numsize"));}
			size = Math.floor(Number($this.children(".responsive").innerWidth())/ numsize);
			count =  $this.children(".responsive").children(".list").children(".nav").children(".item").size();
			total = (-(-count+(size+1)))+2;
			if (f < (total*-1)+2) {f = 1}
			if (!$this.attr("slidePause")) {$($this).slideFixGo(f);}
		},time);
		
	}
	$.fn.slideFix = function(mode, minw, duration, anime, func) {
		return this.each(function() {
			$this = $(this).css({"position":"relative","display":"block"});
			$responsive = $this.children(".responsive").css({"display":"block","overflow":"","position":"relative"})
			$list = $(this).children(".responsive").children(".list").css({"display":"block","overflow":"hidden","position":"relative"})
			$nav =  $(this).children(".responsive").children(".list").children(".nav").css({"display":"block", "overflow":"hidden", "position":"absolute","left":"0px","top":"0px"})
			$item = $(this).children(".responsive").children(".list").children(".nav").children(".item").css({"float":"left", "display":"block", "overflow":"hidden"});
			$(this).children(".btn").css("cursor", "pointer")
			/* ----- set default Array */
			var value = {mode:"slide-to-item", slidew: $responsive.innerWidth(), minw: $item.outerWidth(true), duration: 100, anime :'normal', func:function() {}}
			
			if (mode && !$.isFunction(mode)) {value['mode']=mode} else if ($.isFunction(mode)) {value['func']=mode}
			if (duration && !$.isFunction(duration)) {value['duration']=duration;} else if ($.isFunction(duration)) {value['func']=duration}
			if (minw && !$.isFunction(minw)) {
				value['minw'] = minw;
			} else if ($.isFunction(minw)) {value['func']=minw}
			if (anime && !$.isFunction(anime)) {value['anime']=anime} else if ($.isFunction(anime)) {value['func']=anime}
			if (func && $.isFunction(func)) {value['func']=func}
			if (String(value['minw']).slice(-1) == "%") {
				paresentNum = Number(value['minw'].slice(0,-1))
				minw2 = ($responsive.innerWidth()/100)* paresentNum;
			} else { 
				minw2 = value['minw']; 
			}
			/* ----- Add Event */
			$this.attr("slideFix_mode", value['mode']).attr("slideFix_minw", value['minw']).attr("slideFix_func", value['func']).attr("slideFix_duration", String(value['duration'])).attr("slideFix_anime", String(value['anime']))
			$responsive.height($nav.height())
			$list.height($nav.height())
			if (!$this.attr("slideFix")) {
				$this.attr("slideFix", "1");
				$this.resizeEvent(function(e){
					$(e.this).slideFix($(e.this).attr("slideFix_mode"), $(e.this).attr("slideFix_minw"), $(e.this).attr("slideFix_duration"), $(e.this).attr("slideFix_anime"), $(e.this).attr("slideFix_auto"), $(e.this).attr("slideFix_func")) 
				});
				/*return false;*/
			} 
			
			/* ----- Create Slide */
			count = $this.children(".responsive").children(".list").children(".nav").children(".item").size();
			size = Math.floor(Number(value['slidew']) / Number(minw2));
			if (count < size) {size = count;}
			if (size == 0) {size = 1}
			resize = $responsive.outerWidth() / size
			num = Number($(this).attr("slideFix"));
			if (value['mode'] == "item-to-slide") {
				numsize = resize; 
				$item.css("width", numsize)
			} else if (value['mode'] == "slide-to-item") {
				numsize = minw2;
				$item.css("width", numsize);}
			val = (Number(numsize)+ Number(($item.css("margin-left")).slice(0,-2)) + Number(($item.css("margin-right")).slice(0,-2)))
			/* set attr */
			$nav.innerWidth(val*count);
			$list.innerWidth(size*val);
			$list.css("margin", "0 auto").pos("center")
			$nav.css("left", (num-1)*numsize);
			$this.children(".list").height($this.children(".list").children(".nav").children(".item").height());
			$this.children(".prev").show(0);
			$this.children(".next").show(0);
			$this.attr("slideFix_numsize", numsize)
			$this.children(".count_visible").html(size)
			Btntext = ''; 
			totalBtn = (-(-count+(size+1)))+2;
	// -----------------------------------
	// -----------------------------------			
			for (i = 1; i <= totalBtn; i++) {Btntext += '<span class="btn btn_'+i+'" num="'+i+'"><abr>'+i+'</abr></span>';}
	// -----------------------------------
	// -----------------------------------
			$this.children(".count_btn").html(Btntext)
			
			/* -------  */
			$this.swipe({
				excludedElements: "button, input, select, textarea, .noSwipe",
  				swipeRight:function(event, direction, distance, duration, fingerCount) { $(this).slideFixNext ()}, 
				swipeLeft:function(event, direction, distance, duration, fingerCount) { $(this).slideFixPrev() }
			});
			$this.children(".prev").unbind("dblclick").bind("dblclick", function() {return false});
			$this.children(".next").unbind("dblclick").bind("dblclick", function() {return false});
			$this.children(".count_btn").unbind("dblclick").bind("dblclick", function() {return false});
			//$this.children(".count_btn").children(".btn").unbind("dblclick").bind("dblclick", function() {return false});
			
			$this.children(".next").unbind("click").bind("click", function() {$(this).parent().slideFixNext ()});
			$this.children(".count_btn").children(".btn").unbind("click").bind("click", function() {
				num = 1- (Number($(this).attr("num"))-1)
				$(this).parent().parent().slideFixGo(num);
			});
			$this.children(".prev").unbind("click").bind("click", function() {$(this).parent().slideFixPrev ()});
			value['func'].apply(this,[{count: count, size: size, resize: resize, slidew: value['slidew'], minw: minw2}]);
			
			showBtn($this, num)
		});
	}

})(jQuery);
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- TextBox Auto Change 
/* ----------------------------------------------------------------------------------------------------------------------------- */	
$(document).ready(function(e) {
	$(".autoChange").attr("autoChangeVal", $(this).val())
	$(".autoChange").on("focusin", function() {
		if ($(this).attr("autoChangeVal") == "") {
			$(this).attr("autoChangeVal", $(this).val())	
		}
		if ($(this).val() == $(this).attr("autoChangeVal")) {
			$(this).val("")
		}
	})
	$(".autoChange").on("focusout", function() {
		if ($(this).val() == "") {
			$(this).val($(this).attr("autoChangeVal"))
		}
	}) 
});	

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Size Fix
/* ------------------------------------------------------------------------------------------------------------------------------ */
	
	/*$.fn.stopTouch = function(func) {
		return this.each(function() {
			
			var tr;
			$(document).bind('touchstart', function(e) {
				var style = window.getComputedStyle($('body').get(0));  // Need the DOM object
				var matrix = new WebKitCSSMatrix(style.webkitTransform);
				tr = matrix.m41
				return false;
			});
			$(document).bind('touchmove', function(e) {
				b = "-webkit-transform: translate(0px, "+tr+"px) translateZ(0px) !important; transform: translate(0px, "+tr+"px) translateZ(0px) !important"
				$("#skrollr-body").attr("style", b)
				return false;
			});
		});
	}*/

/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ----- Scroll Bar Creator .ScrlBar()
/* ------------------------------------------------------------------------------------------------------------------------------ */

(function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)})(function(e){"use strict";var t={wheelSpeed:10,wheelPropagation:!1,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:!1},o=function(){var e=0;return function(){var t=e;return e+=1,".perfect-scrollbar-"+t}}();e.fn.ScrlBar=function(r,n){return this.each(function(){var l=e.extend(!0,{},t),s=e(this);if("object"==typeof r?e.extend(!0,l,r):n=r,"update"===n)return s.data("perfect-scrollbar-update")&&s.data("perfect-scrollbar-update")(),s;if("destroy"===n)return s.data("perfect-scrollbar-destroy")&&s.data("perfect-scrollbar-destroy")(),s;if(s.data("perfect-scrollbar"))return s.data("perfect-scrollbar");s.resizeEvent(function(e){$(e.this).ScrlBar('update');});s.addClass("ps-container");var a,c,i,u,d,p,f,h,v,b,g=e("<div class='ps-scrollbar-x-rail'><em class='left'></em><em class='right'></div>").appendTo(s),m=e("<div class='ps-scrollbar-y-rail'><em class='top'></em><em class='bottom'></em></div>").appendTo(s),w=e("<div class='ps-scrollbar-x'><em class='left'></em><em class='right'></div>").appendTo(g),T=e("<div class='ps-scrollbar-y'><em class='top'></em><em class='bottom'></div>").appendTo(m),L=parseInt(g.css("bottom"),10),y=L===L,I=y?null:parseInt(g.css("top"),10),S=parseInt(m.css("right"),10),x=S===S,C=x?null:parseInt(m.css("left"),10),P="rtl"===s.css("direction"),D=o(),X=parseInt(g.css("borderLeftWidth"),10)+parseInt(g.css("borderRightWidth"),10),Y=parseInt(g.css("borderTopWidth"),10)+parseInt(g.css("borderBottomWidth"),10),k=function(e,t){var o=e+t,r=u-v;b=0>o?0:o>r?r:o;var n=parseInt(b*(p-u)/(u-v),10);s.scrollTop(n),y?g.css({bottom:L-n}):g.css({top:I+n})},M=function(e,t){var o=e+t,r=i-f;h=0>o?0:o>r?r:o;var n=parseInt(h*(d-i)/(i-f),10);s.scrollLeft(n),x?m.css({right:S-n}):m.css({left:C+n})},W=function(e){return l.minScrollbarLength&&(e=Math.max(e,l.minScrollbarLength)),l.maxScrollbarLength&&(e=Math.min(e,l.maxScrollbarLength)),e},j=function(){var e={width:i,display:a?"inherit":"none"};e.left=P?s.scrollLeft()+i-d:s.scrollLeft(),y?e.bottom=L-s.scrollTop():e.top=I+s.scrollTop(),g.css(e);var t={top:s.scrollTop(),height:u,display:c?"inherit":"none"};x?t.right=P?d-s.scrollLeft()-S-T.outerWidth():S-s.scrollLeft():t.left=P?s.scrollLeft()+2*i-d-C-T.outerWidth():C+s.scrollLeft(),m.css(t),w.css({left:h,width:f-X}),T.css({top:b,height:v-Y}),a?s.addClass("ps-active-x"):s.removeClass("ps-active-x"),c?s.addClass("ps-active-y"):s.removeClass("ps-active-y")},E=function(){i=l.includePadding?s.innerWidth():s.width(),u=l.includePadding?s.innerHeight():s.height(),d=s.prop("scrollWidth"),p=s.prop("scrollHeight"),!l.suppressScrollX&&d>i+l.scrollXMarginOffset?(a=!0,f=W(parseInt(i*i/d,10)),h=parseInt(s.scrollLeft()*(i-f)/(d-i),10)):(a=!1,f=0,h=0,s.scrollLeft(0)),!l.suppressScrollY&&p>u+l.scrollYMarginOffset?(c=!0,v=W(parseInt(u*u/p,10)),b=parseInt(s.scrollTop()*(u-v)/(p-u),10)):(c=!1,v=0,b=0,s.scrollTop(0)),b>=u-v&&(b=u-v),h>=i-f&&(h=i-f),j()},O=function(){var t,o;w.bind("mousedown"+D,function(e){o=e.pageX,t=w.position().left,g.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+D,function(e){g.hasClass("in-scrolling")&&(M(t,e.pageX-o),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+D,function(){g.hasClass("in-scrolling")&&g.removeClass("in-scrolling")}),t=o=null},q=function(){var t,o;T.bind("mousedown"+D,function(e){o=e.pageY,t=T.position().top,m.addClass("in-scrolling"),e.stopPropagation(),e.preventDefault()}),e(document).bind("mousemove"+D,function(e){m.hasClass("in-scrolling")&&(k(t,e.pageY-o),e.stopPropagation(),e.preventDefault())}),e(document).bind("mouseup"+D,function(){m.hasClass("in-scrolling")&&m.removeClass("in-scrolling")}),t=o=null},A=function(e,t){var o=s.scrollTop();if(0===e){if(!c)return!1;if(0===o&&t>0||o>=p-u&&0>t)return!l.wheelPropagation}var r=s.scrollLeft();if(0===t){if(!a)return!1;if(0===r&&0>e||r>=d-i&&e>0)return!l.wheelPropagation}return!0},B=function(){l.wheelSpeed/=10;var e=!1;s.bind("mousewheel"+D,function(t,o,r,n){var i=t.deltaX*t.deltaFactor||r,u=t.deltaY*t.deltaFactor||n;e=!1,l.useBothWheelAxes?c&&!a?(u?s.scrollTop(s.scrollTop()-u*l.wheelSpeed):s.scrollTop(s.scrollTop()+i*l.wheelSpeed),e=!0):a&&!c&&(i?s.scrollLeft(s.scrollLeft()+i*l.wheelSpeed):s.scrollLeft(s.scrollLeft()-u*l.wheelSpeed),e=!0):(s.scrollTop(s.scrollTop()-u*l.wheelSpeed),s.scrollLeft(s.scrollLeft()+i*l.wheelSpeed)),E(),e=e||A(i,u),e&&(t.stopPropagation(),t.preventDefault())}),s.bind("MozMousePixelScroll"+D,function(t){e&&t.preventDefault()})},F=function(){var t=!1;s.bind("mouseenter"+D,function(){t=!0}),s.bind("mouseleave"+D,function(){t=!1});var o=!1;e(document).bind("keydown"+D,function(r){if(!(r.isDefaultPrevented&&r.isDefaultPrevented()||!t||e(document.activeElement).is(":input,[contenteditable]"))){var n=0,l=0;switch(r.which){case 37:n=-30;break;case 38:l=30;break;case 39:n=30;break;case 40:l=-30;break;case 33:l=90;break;case 32:case 34:l=-90;break;case 35:l=-u;break;case 36:l=u;break;default:return}s.scrollTop(s.scrollTop()-l),s.scrollLeft(s.scrollLeft()+n),o=A(n,l),o&&r.preventDefault()}})},H=function(){var e=function(e){e.stopPropagation()};T.bind("click"+D,e),m.bind("click"+D,function(e){var t=parseInt(v/2,10),o=e.pageY-m.offset().top-t,r=u-v,n=o/r;0>n?n=0:n>1&&(n=1),s.scrollTop((p-u)*n)}),w.bind("click"+D,e),g.bind("click"+D,function(e){var t=parseInt(f/2,10),o=e.pageX-g.offset().left-t,r=i-f,n=o/r;0>n?n=0:n>1&&(n=1),s.scrollLeft((d-i)*n)})},K=function(){var t=function(e,t){s.scrollTop(s.scrollTop()-t),s.scrollLeft(s.scrollLeft()-e),E()},o={},r=0,n={},l=null,a=!1;e(window).bind("touchstart"+D,function(){a=!0}),e(window).bind("touchend"+D,function(){a=!1}),s.bind("touchstart"+D,function(e){var t=e.originalEvent.targetTouches[0];o.pageX=t.pageX,o.pageY=t.pageY,r=(new Date).getTime(),null!==l&&clearInterval(l),e.stopPropagation()}),s.bind("touchmove"+D,function(e){if(!a&&1===e.originalEvent.targetTouches.length){var l=e.originalEvent.targetTouches[0],s={};s.pageX=l.pageX,s.pageY=l.pageY;var c=s.pageX-o.pageX,i=s.pageY-o.pageY;t(c,i),o=s;var u=(new Date).getTime(),d=u-r;d>0&&(n.x=c/d,n.y=i/d,r=u),e.preventDefault()}}),s.bind("touchend"+D,function(){clearInterval(l),l=setInterval(function(){return.01>Math.abs(n.x)&&.01>Math.abs(n.y)?(clearInterval(l),void 0):(t(30*n.x,30*n.y),n.x*=.8,n.y*=.8,void 0)},10)})},z=function(){s.bind("scroll"+D,function(){E()})},Q=function(){s.unbind(D),e(window).unbind(D),e(document).unbind(D),s.data("perfect-scrollbar",null),s.data("perfect-scrollbar-update",null),s.data("perfect-scrollbar-destroy",null),w.remove(),T.remove(),g.remove(),m.remove(),g=m=w=T=a=c=i=u=d=p=f=h=L=y=I=v=b=S=x=C=P=D=null},R=function(t){s.addClass("ie").addClass("ie"+t);var o=function(){var t=function(){e(this).addClass("hover")},o=function(){e(this).removeClass("hover")};s.bind("mouseenter"+D,t).bind("mouseleave"+D,o),g.bind("mouseenter"+D,t).bind("mouseleave"+D,o),m.bind("mouseenter"+D,t).bind("mouseleave"+D,o),w.bind("mouseenter"+D,t).bind("mouseleave"+D,o),T.bind("mouseenter"+D,t).bind("mouseleave"+D,o)},r=function(){j=function(){var e={left:h+s.scrollLeft(),width:f};y?e.bottom=L:e.top=I,w.css(e);var t={top:b+s.scrollTop(),height:v};x?t.right=S:t.left=C,T.css(t),w.hide().show(),T.hide().show()}};6===t&&(o(),r())},G="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,J=function(){var e=navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);e&&"msie"===e[1]&&R(parseInt(e[2],10)),E(),z(),O(),q(),H(),G&&K(),s.mousewheel&&B(),l.useKeyboard&&F(),s.data("perfect-scrollbar",s),s.data("perfect-scrollbar-update",E),s.data("perfect-scrollbar-destroy",Q)};return J(),s})}});	