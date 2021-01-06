$(function () {
    $('input[type="file"]').each(function () {
        $(this).on('change', function () {
            var label = $(this).parent().find('span');
            if (typeof (this.files) != 'undefined') { // fucking IE      
                if (this.files.length == 0) {
                    label.removeClass('withFile').text(label.data('default'));
                } else {
                    var file = this.files[0];
                    var name = file.name;
                    var size = (file.size / 1048576).toFixed(3); //size in mb 
                    label.addClass('withFile').text(name + ' (' + size + 'mb)');
                }
            } else {
                var name = this.value.split("\\");
                label.addClass('withFile').text(name[name.length - 1]);
            }
            return false;
        });
    });
});

function clearNotifications() {
    $.get(_basehttp + '/includes/ajax.notificationsRead.php');
    var noticeCircle = $('#notice-count');
    var noticeLink = $('#notice-link');
    var noticeAmount = $('.notifications-amount');

    noticeCircle.text('0').hide();
    noticeLink.removeClass('new');
    noticeAmount.removeClass('new');
}

/**
 *
 * @summary     jPaginate
 * @description Paginate an html elements
 * @version     2016.11.04
 * Rrepository  https://github.com/asirokas/jPaginate
 *
 * @author      Athanasios Sirokas (www.asirokas.com)
 * Contact      asirokas@gmail.com
 *
 */
( function( $ ) {
	$.fn.paginate = function( options ) {
		var defaults = {
			pagination_class: "pagination",
			items_per_page: 5,
			prev_next: true,
			prev_text: '&laquo;',
			next_text: '&raquo;'
		};

		// Merge deafults into options
		var options = $.extend( defaults, options );

		obj = $( this );

		// Count entries in block for pagination
		var n = obj.children().size();

		// Calculate number of pages
		var pages = Math.ceil( n / options.items_per_page );

		// Add a div after the #slideshow to put the navigation controls in
		obj.append(
			$( '<div/>' ).addClass( options.pagination_class + "__controls" ).append(
				$( '<ul/>' ).addClass( options.pagination_class ) )
		);

		function createPaginationControls( pages ) {
			// Add Previous button
			if ( options.prev_next == true ) {
				$( "." + options.pagination_class ).append( '<li class="prev"><a href="#">' + options.prev_text + '</a></li>' );
			}
			// For each div (slide) add a link in span for controls
			for ( var i = 0; i < pages; i++ ) {
				$( "." + options.pagination_class ).append( '<li><a href="#' + ( i + 1 ) + '">' + ( i + 1 ) + '</a></li>' );
			};

			// Add Next Button
			if ( options.prev_next == true ) {
				$( "." + options.pagination_class ).append( '<li class="next"><a href="#">' + options.next_text + '</a></li>' );
			}
		}

		function showPage( page_number ) {
			var start_from = ( page_number * options.items_per_page );
			var end_on = ( ( page_number + 1 ) * options.items_per_page );
			obj.children().not( '.pagination__controls' ).css( 'display', 'none' ).slice( start_from, end_on ).css( 'display', 'block' );
		}

		createPaginationControls( pages );
		showPage( 0 );

		$( '.pagination li' ).not( ".prev,.next" ).first().addClass( 'active' );

		// Navigate to the coresponding slide when clicking on a nav-control
		$( '.pagination li' ).not( ".prev,.next" ).click( function() {
			if ( options.prev_next == true ) {
				var pageIndex = $( this ).index() - 1;
			} else {
				var pageIndex = $( this ).index();
			};

			// remove active class from all elements
			$( this ).parent().children().removeClass( 'active' );
			$( this ).addClass( 'active' );
			showPage( pageIndex );
                        $('html, body').animate({scrollTop: $('.left-details').offset().top -100 }, 'slow');
		} );

		// Navigate to the previous slide when clicking on the prev button
		$( '.pagination li.prev' ).click( function() {
			pageIndex = $( this ).parent().find( 'li.active' ).index() - 2;
			if ( pageIndex < 0 ) pageIndex = 0;

			$( this ).parent().find( 'li.active' ).removeClass( 'active' );
			$( this ).parent().find( 'li:nth-child(' + ( pageIndex + 2 ) + ')' ).addClass( 'active' );
			showPage( pageIndex );
                        $('html, body').animate({scrollTop: $('.left-details').offset().top -100 }, 'slow');
		} );

		// Navigate to the next slide when clicking on the next button
		$( '.pagination li.next' ).click( function() {
			pageIndex = $( this ).parent().find( 'li.active' ).index();
			if ( pageIndex > pages - 1 ) pageIndex = pages - 1;

			$( this ).parent().find( 'li.active' ).removeClass( 'active' );
			$( this ).parent().find( 'li:nth-child(' + ( pageIndex + 2 ) + ')' ).addClass( 'active' );
			showPage( pageIndex );
                        $('html, body').animate({scrollTop: $('.left-details').offset().top -100 }, 'slow');
		} );

	};
} )( jQuery );


function rating() {
    if ($('[data-mb="thumbs-rating"]').length) {
        var _attr,
        url = _basehttp + "/includes/rating/jRating.php";
        $('[data-mb="vote"]').click(function (b) {
            _attr = getAttributes($(this));
            var j = _attr["data-opt-vote"] === 'up' ? 100 : 0,
            rating = $(this).parents('[data-mb="thumbs-rating"]'),
            id = rating.attr("data-opt-id"),
            type = rating.attr("data-opt-type") ? rating.attr("data-opt-type") : 0;
            
            b.preventDefault();
            $.post(url, {
                idBox: id,
                type: type,
                rate: j,
                action: "rating"
            }, function (a) {
                var data = {
                    rand: Math.floor(1e3 * Math.random(0, 9999)),
                    closeTitle: _attr["data-opt-close"],
                    id: "voting",
                    title: _attr.title
                };
                if (a.success) {
                    $('.rating-current').text(a.newRating + '%');
                    if (_attr["data-opt-vote"] === 'up') {
                        var likes = $('[data-mb="vote"] .nvup').text();
                        $('[data-mb="vote"] .nvup').text(parseInt(likes) + 1);
                    } else {
						var likes = $('[data-mb="vote"] .nvdown').text();
                        $('[data-mb="vote"] .nvdown').text(parseInt(likes) + 1);
					}
                } else {
                    $('#ratingErrorModal').iziModal('open');
                }
            }, "json");
        });
    }
}

/*
* iziModal | v1.6.0
* http://izimodal.marcelodolce.com
* by Marcelo Dolce.
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        factory(jQuery);
    }
}(function ($) {

	var $window = $(window),
    	$document = $(document),
		PLUGIN_NAME = 'iziModal',
		STATES = {
		CLOSING: 'closing',
		CLOSED: 'closed',
		OPENING: 'opening',
		OPENED: 'opened',
		DESTROYED: 'destroyed'
	};

	function whichAnimationEvent(){
		var t,
			el = document.createElement('fakeelement'),
			animations = {
			'animation'      : 'animationend',
			'OAnimation'     : 'oAnimationEnd',
			'MozAnimation'   : 'animationend',
			'WebkitAnimation': 'webkitAnimationEnd'
		};
		for (t in animations){
			if (el.style[t] !== undefined){
				return animations[t];
			}
		}
	}

	function isIE(version) {
		if(version === 9){
			return navigator.appVersion.indexOf('MSIE 9.') !== -1;
		} else {
			userAgent = navigator.userAgent;
			return userAgent.indexOf('MSIE ') > -1 || userAgent.indexOf('Trident/') > -1;
		}
	}

	function clearValue(value){
		var separators = /%|px|em|cm|vh|vw/;
		return parseInt(String(value).split(separators)[0]);
	}

	function changeHashWithoutScrolling(hash) {
		var id = hash.replace(/^.*#/, ''),
			$elem = $(hash);
		$elem.attr('id', id+'-tmp');
		window.location.hash = hash;
		$elem.attr('id', id);
	}

	var animationEvent = whichAnimationEvent(),
		isMobile = (/Mobi/.test(navigator.userAgent)) ? true : false;

	window.$iziModal = {};
	window.$iziModal.autoOpen = 0;
	window.$iziModal.history = false;

	var iziModal = function (element, options) {
		this.init(element, options);
	};

	iziModal.prototype = {

		constructor: iziModal,

		init: function (element, options) {

			var that = this;
			this.$element = $(element);

			if(this.$element[0].id !== undefined && this.$element[0].id !== ''){
				this.id = this.$element[0].id;
			} else {
				this.id = PLUGIN_NAME+Math.floor((Math.random() * 10000000) + 1);
				this.$element.attr('id', this.id);
			}
			this.classes = ( this.$element.attr('class') !== undefined ) ? this.$element.attr('class') : '';
			this.content = this.$element.html();
			this.state = STATES.CLOSED;
			this.options = options;
			this.width = 0;
			this.timer = null;
			this.timerTimeout = null;
			this.progressBar = null;
            this.isPaused = false;
			this.isFullscreen = false;
            this.headerHeight = 0;
            this.modalHeight = 0;
            this.$overlay = $('<div class="'+PLUGIN_NAME+'-overlay" style="background-color:'+options.overlayColor+'"></div>');
			this.$navigate = $('<div class="'+PLUGIN_NAME+'-navigate"><div class="'+PLUGIN_NAME+'-navigate-caption">Use</div><button class="'+PLUGIN_NAME+'-navigate-prev"></button><button class="'+PLUGIN_NAME+'-navigate-next"></button></div>');
            this.group = {
            	name: this.$element.attr('data-'+PLUGIN_NAME+'-group'),
            	index: null,
            	ids: []
            };
			this.$element.attr('aria-hidden', 'true');
			this.$element.attr('aria-labelledby', this.id);
			this.$element.attr('role', 'dialog');

			if( !this.$element.hasClass('iziModal') ){
				this.$element.addClass('iziModal');
			}

            if(this.group.name === undefined && options.group !== ''){
            	this.group.name = options.group;
            	this.$element.attr('data-'+PLUGIN_NAME+'-group', options.group);
            }
            if(this.options.loop === true){
            	this.$element.attr('data-'+PLUGIN_NAME+'-loop', true);
            }

            $.each( this.options , function(index, val) {
				var attr = that.$element.attr('data-'+PLUGIN_NAME+'-'+index);
            	try {
		            if(typeof attr !== typeof undefined){

						if(attr === ''|| attr == 'true'){
							options[index] = true;
						} else if (attr == 'false') {
							options[index] = false;
						} else if (typeof val == 'function') {
							options[index] = new Function(attr);
						} else {
							options[index] = attr;
						}
		            }
            	} catch(exc){}
            });

            if(options.appendTo !== false){
				this.$element.appendTo(options.appendTo);
            }

            if (options.iframe === true) {
                this.$element.html('<div class="'+PLUGIN_NAME+'-wrap"><div class="'+PLUGIN_NAME+'-content"><iframe class="'+PLUGIN_NAME+'-iframe"></iframe>' + this.content + "</div></div>");

	            if (options.iframeHeight !== null) {
	                this.$element.find('.'+PLUGIN_NAME+'-iframe').css('height', options.iframeHeight);
	            }
            } else {
            	this.$element.html('<div class="'+PLUGIN_NAME+'-wrap"><div class="'+PLUGIN_NAME+'-content">' + this.content + '</div></div>');
            }

			if (this.options.background !== null) {
				this.$element.css('background', this.options.background);
			}

            this.$wrap = this.$element.find('.'+PLUGIN_NAME+'-wrap');

			if(options.zindex !== null && !isNaN(parseInt(options.zindex)) ){
			 	this.$element.css('z-index', options.zindex);
			 	this.$navigate.css('z-index', options.zindex-1);
			 	this.$overlay.css('z-index', options.zindex-2);
			}

			if(options.radius !== ''){
                this.$element.css('border-radius', options.radius);
            }

            if(options.padding !== ''){
                this.$element.find('.'+PLUGIN_NAME+'-content').css('padding', options.padding);
            }

            if(options.theme !== ''){
				if(options.theme === 'light'){
					this.$element.addClass(PLUGIN_NAME+'-light');
				} else {
					this.$element.addClass(options.theme);
				}
            }

			if(options.rtl === true) {
				this.$element.addClass(PLUGIN_NAME+'-rtl');
			}

			if(options.openFullscreen === true){
			    this.isFullscreen = true;
			    this.$element.addClass('isFullscreen');
			}

			this.createHeader();
			this.recalcWidth();
			this.recalcVerticalPos();

			if (that.options.afterRender && ( typeof(that.options.afterRender) === 'function' || typeof(that.options.afterRender) === 'object' ) ) {
		        that.options.afterRender(that);
		    }

		},

		createHeader: function(){

			this.$header = $('<div class="'+PLUGIN_NAME+'-header"><h2 class="'+PLUGIN_NAME+'-header-title">' + this.options.title + '</h2><p class="'+PLUGIN_NAME+'-header-subtitle">' + this.options.subtitle + '</p><div class="'+PLUGIN_NAME+'-header-buttons"></div></div>');

			if (this.options.closeButton === true) {
				this.$header.find('.'+PLUGIN_NAME+'-header-buttons').append('<a href="javascript:void(0)" class="'+PLUGIN_NAME+'-button '+PLUGIN_NAME+'-button-close" data-'+PLUGIN_NAME+'-close></a>');
			}

            if (this.options.fullscreen === true) {
            	this.$header.find('.'+PLUGIN_NAME+'-header-buttons').append('<a href="javascript:void(0)" class="'+PLUGIN_NAME+'-button '+PLUGIN_NAME+'-button-fullscreen" data-'+PLUGIN_NAME+'-fullscreen></a>');
            }

            //if (this.options.timeoutProgressbar === true && !isNaN(parseInt(this.options.timeout)) && this.options.timeout !== false && this.options.timeout !== 0) {
			if (this.options.timeoutProgressbar === true) {
				this.$header.prepend('<div class="'+PLUGIN_NAME+'-progressbar"><div style="background-color:'+this.options.timeoutProgressbarColor+'"></div></div>');
            }

            if (this.options.subtitle === '') {
        		this.$header.addClass(PLUGIN_NAME+'-noSubtitle');
            }

            if (this.options.title !== '') {

                if (this.options.headerColor !== null) {
                	if(this.options.borderBottom === true){
                    	this.$element.css('border-bottom', '3px solid ' + this.options.headerColor + '');
                	}
                    this.$header.css('background', this.options.headerColor);
                }
				if (this.options.icon !== null || this.options.iconText !== null){

                    this.$header.prepend('<i class="'+PLUGIN_NAME+'-header-icon"></i>');

	                if (this.options.icon !== null) {
	                    this.$header.find('.'+PLUGIN_NAME+'-header-icon').addClass(this.options.icon).css('color', this.options.iconColor);
					}
	                if (this.options.iconText !== null){
	                	this.$header.find('.'+PLUGIN_NAME+'-header-icon').html(this.options.iconText);
	                }
				}
                this.$element.css('overflow', 'hidden').prepend(this.$header);
            }
		},

		setGroup: function(groupName){

			var that = this,
				group = this.group.name || groupName;
				this.group.ids = [];

			if( groupName !== undefined && groupName !== this.group.name){
				group = groupName;
				this.group.name = group;
				this.$element.attr('data-'+PLUGIN_NAME+'-group', group);
			}
			if(group !== undefined && group !== ''){

            	var count = 0;
            	$.each( $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group='+group+']') , function(index, val) {

					that.group.ids.push($(this)[0].id);

					if(that.id == $(this)[0].id){
						that.group.index = count;
					}
        			count++;
            	});
            }
		},

		toggle: function () {

			if(this.state == STATES.OPENED){
				this.close();
			}
			if(this.state == STATES.CLOSED){
				this.open();
			}
		},

		startProgress: function(param) {

			var that = this;

			this.isPaused = false;

			clearTimeout(this.timerTimeout);

			if (this.options.timeoutProgressbar === true) {

				this.progressBar = {
                    hideEta: null,
                    maxHideTime: null,
                    currentTime: new Date().getTime(),
                    el: this.$element.find('.'+PLUGIN_NAME+'-progressbar > div'),
                    updateProgress: function()
                    {
						if(!that.isPaused){

							that.progressBar.currentTime = that.progressBar.currentTime+10;

		                    var percentage = ((that.progressBar.hideEta - (that.progressBar.currentTime)) / that.progressBar.maxHideTime) * 100;
		                    that.progressBar.el.width(percentage + '%');
		                    if(percentage < 0){
		                    	that.close();
		                    }
						}
                    }
                };
				if (param > 0) {
                    this.progressBar.maxHideTime = parseFloat(param);
                    this.progressBar.hideEta = new Date().getTime() + this.progressBar.maxHideTime;
                    this.timerTimeout = setInterval(this.progressBar.updateProgress, 10);
                }

			} else {
				this.timerTimeout = setTimeout(function(){
					that.close();
				}, that.options.timeout);
			}
	
		}, 

		pauseProgress: function(){

			this.isPaused = true;
		},

		resumeProgress: function(){

			this.isPaused = false;
		},

		resetProgress: function(param){

        	clearTimeout(this.timerTimeout);
        	this.progressBar = {};
            this.$element.find('.'+PLUGIN_NAME+'-progressbar > div').width('100%');
		},

		open: function (param) {

			var that = this;

			try {
				if(param !== undefined && param.preventClose === false){
					$.each( $('.'+PLUGIN_NAME) , function(index, modal) {
						if( $(modal).data().iziModal !== undefined ){
							var state = $(modal).iziModal('getState');

							if(state == 'opened' || state == 'opening'){
								$(modal).iziModal('close');
							}
						}
					});				
				}
			} catch(e) {  /*console.warn(exc);*/  }

            (function urlHash(){
				if(that.options.history){

	            	var oldTitle = document.title;
		            document.title = oldTitle + " - " + that.options.title;
					changeHashWithoutScrolling('#'+that.id);
					document.title = oldTitle;
					//history.pushState({}, that.options.title, "#"+that.id);

					window.$iziModal.history = true;
				} else {
					window.$iziModal.history = false;
				}
            })();

			function opened(){

			    // console.info('[ '+PLUGIN_NAME+' | '+that.id+' ] Opened.');

				that.state = STATES.OPENED;
		    	that.$element.trigger(STATES.OPENED);

				if (that.options.onOpened && ( typeof(that.options.onOpened) === "function" || typeof(that.options.onOpened) === "object" ) ) {
			        that.options.onOpened(that);
			    }
			}

			function bindEvents(){

	            // Close when button pressed
	            that.$element.off('click', '[data-'+PLUGIN_NAME+'-close]').on('click', '[data-'+PLUGIN_NAME+'-close]', function (e) {
	                e.preventDefault();

	                var transition = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-transitionOut');

	                if(transition !== undefined){
	                	that.close({transition:transition});
	                } else {
	                	that.close();
	                }
	            });

	            // Expand when button pressed
	            that.$element.off('click', '[data-'+PLUGIN_NAME+'-fullscreen]').on('click', '[data-'+PLUGIN_NAME+'-fullscreen]', function (e) {
	                e.preventDefault();
	                if(that.isFullscreen === true){
						that.isFullscreen = false;
		                that.$element.removeClass('isFullscreen');
	                } else {
		                that.isFullscreen = true;
		                that.$element.addClass('isFullscreen');
	                }
					if (that.options.onFullscreen && typeof(that.options.onFullscreen) === "function") {
				        that.options.onFullscreen(that);
				    }
				    that.$element.trigger('fullscreen', that);
	            });

	            // Next modal
	            that.$navigate.off('click', '.'+PLUGIN_NAME+'-navigate-next').on('click', '.'+PLUGIN_NAME+'-navigate-next', function (e) {
	            	that.next(e);
	            });
	            that.$element.off('click', '[data-'+PLUGIN_NAME+'-next]').on('click', '[data-'+PLUGIN_NAME+'-next]', function (e) {
	            	that.next(e);
	            });

	            // Previous modal
	            that.$navigate.off('click', '.'+PLUGIN_NAME+'-navigate-prev').on('click', '.'+PLUGIN_NAME+'-navigate-prev', function (e) {
	            	that.prev(e);
	            });
				that.$element.off('click', '[data-'+PLUGIN_NAME+'-prev]').on('click', '[data-'+PLUGIN_NAME+'-prev]', function (e) {
	            	that.prev(e);
	            });
			}

		    if(this.state == STATES.CLOSED){

		    	bindEvents();

				this.setGroup();
				this.state = STATES.OPENING;
	            this.$element.trigger(STATES.OPENING);
				this.$element.attr('aria-hidden', 'false');

				// console.info('[ '+PLUGIN_NAME+' | '+this.id+' ] Opening...');

				if (this.options.timeoutProgressbar === true) {
					this.$element.find('.'+PLUGIN_NAME+'-progressbar > div').width('100%');
				}

				if(this.options.iframe === true){

					this.$element.find('.'+PLUGIN_NAME+'-content').addClass(PLUGIN_NAME+'-content-loader');

					this.$element.find('.'+PLUGIN_NAME+'-iframe').on('load', function(){
						$(this).parent().removeClass(PLUGIN_NAME+'-content-loader');
					});

					var href = null;
					try {
						href = $(param.currentTarget).attr('href') !== '' ? $(param.currentTarget).attr('href') : null;
					} catch(e) { /* console.warn(exc); */ }

					if( (this.options.iframeURL !== null) && (href === null || href === undefined)){
						href = this.options.iframeURL;
					}
					if(href === null || href === undefined){
						throw new Error('Failed to find iframe URL');
					}
				    this.$element.find('.'+PLUGIN_NAME+'-iframe').attr('src', href);
				}


				if (this.options.bodyOverflow || isMobile){
					$('html').addClass(PLUGIN_NAME+'-isOverflow');
					if(isMobile){
						$('body').css('overflow', 'hidden');
					}
				}

				if (this.options.onOpening && typeof(this.options.onOpening) === 'function') {
			        this.options.onOpening(this);
			    }
				(function open(){

			    	if(that.group.ids.length > 1 ){

			    		that.$navigate.appendTo('body');
			    		that.$navigate.addClass('fadeIn');

			    		if(that.options.navigateCaption === true){
			    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-caption').show();
			    		}

			    		var modalWidth = that.$element.outerWidth();
			    		if(that.options.navigateArrows !== false){
					    	if (that.options.navigateArrows === 'closeScreenEdge'){
				    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').css('left', 0).show();
				    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').css('right', 0).show();
					    	} else {
						    	that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').css('margin-left', -((modalWidth/2)+84)).show();
						    	that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').css('margin-right', -((modalWidth/2)+84)).show();
					    	}
			    		} else {
			    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').hide();
			    			that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').hide();
			    		}

			    		var loop;
						if(that.group.index === 0){

							loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;

							if(loop === 0 && that.options.loop === false)
								that.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').hide();
				    	}
				    	if(that.group.index+1 === that.group.ids.length){

				    		loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;

							if(loop === 0 && that.options.loop === false)
								that.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').hide();
				    	}
			    	}

					if(that.options.overlay === true) {

						if(that.options.appendToOverlay === false){
							that.$overlay.appendTo('body');
						} else {
							that.$overlay.appendTo( that.options.appendToOverlay );
						}
					}

					if (that.options.transitionInOverlay) {
						that.$overlay.addClass(that.options.transitionInOverlay);
					}

					var transitionIn = that.options.transitionIn;

					if( typeof param == 'object' ){
						
						if(param.transition !== undefined || param.transitionIn !== undefined){
							transitionIn = param.transition || param.transitionIn;
						}
						if(param.zindex !== undefined){
							that.setZindex(param.zindex);
						}
					}

					if (transitionIn !== '' && animationEvent !== undefined) {

						that.$element.addClass('transitionIn '+transitionIn).show();
						that.$wrap.one(animationEvent, function () {

						    that.$element.removeClass(transitionIn + ' transitionIn');
						    that.$overlay.removeClass(that.options.transitionInOverlay);
						    that.$navigate.removeClass('fadeIn');

							opened();
						});

					} else {

						that.$element.show();
						opened();
					}

					if(that.options.pauseOnHover === true && that.options.pauseOnHover === true && that.options.timeout !== false && !isNaN(parseInt(that.options.timeout)) && that.options.timeout !== false && that.options.timeout !== 0){

						that.$element.off('mouseenter').on('mouseenter', function(event) {
							event.preventDefault();
							that.isPaused = true;
						});
						that.$element.off('mouseleave').on('mouseleave', function(event) {
							event.preventDefault();
							that.isPaused = false;
						});
					}

				})();

				if (this.options.timeout !== false && !isNaN(parseInt(this.options.timeout)) && this.options.timeout !== false && this.options.timeout !== 0) {

					that.startProgress(this.options.timeout);
				}

	            // Close on overlay click
	            if (this.options.overlayClose && !this.$element.hasClass(this.options.transitionOut)) {
	            	this.$overlay.click(function () {
	                    that.close();
	            	});
	            }

				if (this.options.focusInput){
			    	this.$element.find(':input:not(button):enabled:visible:first').focus(); // Focus on the first field
				}

				(function updateTimer(){
			    	that.recalcLayout();
				    that.timer = setTimeout(updateTimer, 300);
				})();

	            // Close when the Escape key is pressed
	            $document.on('keydown.'+PLUGIN_NAME, function (e) {
	                if (that.options.closeOnEscape && e.keyCode === 27) {
	                    that.close();
	                }
	            });

		    }

		},

		close: function (param) {

			var that = this;

			function closed(){

                // console.info('[ '+PLUGIN_NAME+' | '+that.id+' ] Closed.');

                that.state = STATES.CLOSED;
                that.$element.trigger(STATES.CLOSED);

                if (that.options.iframe === true) {
                    that.$element.find('.'+PLUGIN_NAME+'-iframe').attr('src', '');
                }

				if (that.options.bodyOverflow || isMobile){
					$('html').removeClass(PLUGIN_NAME+'-isOverflow');
					if(isMobile){
						$('body').css('overflow','auto');
					}
				}

				if (that.options.onClosed && typeof(that.options.onClosed) === 'function') {
					that.options.onClosed(that);
				}

				if(that.options.restoreDefaultContent === true){
				    that.$element.find('.'+PLUGIN_NAME+'-content').html( that.content );
				}

				if( $('.'+PLUGIN_NAME+':visible').length === 0 ){
					$('html').removeClass(PLUGIN_NAME+'-isAttached');
				}
			}

            if(this.state == STATES.OPENED || this.state == STATES.OPENING){

            	$document.off('keydown.'+PLUGIN_NAME);

				this.state = STATES.CLOSING;
				this.$element.trigger(STATES.CLOSING);
				this.$element.attr('aria-hidden', 'true');

				// console.info('[ '+PLUGIN_NAME+' | '+this.id+' ] Closing...');

	            clearTimeout(this.timer);
	            clearTimeout(this.timerTimeout);

				if (that.options.onClosing && typeof(that.options.onClosing) === "function") {
			        that.options.onClosing(this);
			    }

				var transitionOut = this.options.transitionOut;

				if( typeof param == 'object' ){
					if(param.transition !== undefined || param.transitionOut !== undefined){
						transitionOut = param.transition || param.transitionOut;
					}
				}

				if( (transitionOut === false || transitionOut === '' ) || animationEvent === undefined){

	                this.$element.hide();
	                this.$overlay.remove();
                	this.$navigate.remove();
	                closed();

				} else {

	                this.$element.attr('class', [
						this.classes,
						PLUGIN_NAME,
						transitionOut,
						this.options.theme == 'light' ? PLUGIN_NAME+'-light' : this.options.theme,
						this.isFullscreen === true ? 'isFullscreen' : '',
						this.options.rtl ? PLUGIN_NAME+'-rtl' : ''
					].join(' '));

					this.$overlay.attr('class', PLUGIN_NAME + '-overlay ' + this.options.transitionOutOverlay);

					if(that.options.navigateArrows !== false && !isMobile){
						this.$navigate.attr('class', PLUGIN_NAME + '-navigate fadeOut');
					}

	                this.$element.one(animationEvent, function () {

	                    if( that.$element.hasClass(transitionOut) ){
	                        that.$element.removeClass(transitionOut + ' transitionOut').hide();
	                    }
                        that.$overlay.removeClass(that.options.transitionOutOverlay).remove();
						that.$navigate.removeClass('fadeOut').remove();
						closed();
	                });

				}

            }
		},

		next: function(e){

            var that = this;
            var transitionIn = 'fadeInRight';
            var transitionOut = 'fadeOutLeft';
			var modal = $('.'+PLUGIN_NAME+':visible');
            var modals = {};
				modals.out = this;

			if(e !== undefined && typeof e !== 'object'){
            	e.preventDefault();
            	modal = $(e.currentTarget);
            	transitionIn = modal.attr('data-'+PLUGIN_NAME+'-transitionIn');
            	transitionOut = modal.attr('data-'+PLUGIN_NAME+'-transitionOut');
			} else if(e !== undefined){
				if(e.transitionIn !== undefined){
					transitionIn = e.transitionIn;
				}
				if(e.transitionOut !== undefined){
					transitionOut = e.transitionOut;
				}
			}

        	this.close({transition:transitionOut});

			setTimeout(function(){

				var loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;
				for (var i = that.group.index+1; i <= that.group.ids.length; i++) {

					try {
						modals.in = $("#"+that.group.ids[i]).data().iziModal;
					} catch(log) {
						// console.info('[ '+PLUGIN_NAME+' ] No next modal.');
					}
					if(typeof modals.in !== 'undefined'){

						$('#'+that.group.ids[i]).iziModal('open', { transition: transitionIn });
						break;

					} else {

						if(i == that.group.ids.length && loop > 0 || that.options.loop === true){

							for (var index = 0; index <= that.group.ids.length; index++) {

								modals.in = $('#'+that.group.ids[index]).data().iziModal;
								if(typeof modals.in !== 'undefined'){

                					$('#'+that.group.ids[index]).iziModal('open', { transition: transitionIn });
               
									break;
								}
							}
						}
					}
				}

			}, 200);

			$(document).trigger( PLUGIN_NAME + '-group-change', modals );
		},

		prev: function(e){
            var that = this;
            var transitionIn = 'fadeInLeft';
            var transitionOut = 'fadeOutRight';
			var modal = $('.'+PLUGIN_NAME+':visible');
            var modals = {};
				modals.out = this;

			if(e !== undefined && typeof e !== 'object'){
            	e.preventDefault();
            	modal = $(e.currentTarget);
            	transitionIn = modal.attr('data-'+PLUGIN_NAME+'-transitionIn');
            	transitionOut = modal.attr('data-'+PLUGIN_NAME+'-transitionOut');

			} else if(e !== undefined){

				if(e.transitionIn !== undefined){
					transitionIn = e.transitionIn;
				}
				if(e.transitionOut !== undefined){
					transitionOut = e.transitionOut;
				}
			}

			this.close({transition:transitionOut});

			setTimeout(function(){

				var loop = $('.'+PLUGIN_NAME+'[data-'+PLUGIN_NAME+'-group="'+that.group.name+'"][data-'+PLUGIN_NAME+'-loop]').length;

				for (var i = that.group.index; i >= 0; i--) {

					try {
						modals.in = $('#'+that.group.ids[i-1]).data().iziModal;
					} catch(log) {
						// console.info('[ '+PLUGIN_NAME+' ] No previous modal.');
					}
					if(typeof modals.in !== 'undefined'){

						$('#'+that.group.ids[i-1]).iziModal('open', { transition: transitionIn });
						break;

					} else {

						if(i === 0 && loop > 0 || that.options.loop === true){

							for (var index = that.group.ids.length-1; index >= 0; index--) {

								modals.in = $('#'+that.group.ids[index]).data().iziModal;
								if(typeof modals.in !== 'undefined'){

									$('#'+that.group.ids[index]).iziModal('open', { transition: transitionIn });

									break;
								}
							}
						}
					}
				}

			}, 200);

			$(document).trigger( PLUGIN_NAME + '-group-change', modals );
		},

		destroy: function() {
			var e = $.Event('destroy');

			this.$element.trigger(e);

            $document.off('keydown.'+PLUGIN_NAME);

			clearTimeout(this.timer);
			clearTimeout(this.timerTimeout);

			if (this.options.iframe === true) {
				this.$element.find('.'+PLUGIN_NAME+'-iframe').remove();
			}
			this.$element.html(this.$element.find('.'+PLUGIN_NAME+'-content').html());

			this.$element.off('click', '[data-'+PLUGIN_NAME+'-close]');
			this.$element.off('click', '[data-'+PLUGIN_NAME+'-fullscreen]');

			this.$element
				.off('.'+PLUGIN_NAME)
				.removeData(PLUGIN_NAME)
				.attr('style', '');

			this.$overlay.remove();
			this.$navigate.remove();
			this.$element.trigger(STATES.DESTROYED);
			this.$element = null;
		},

		getState: function(){

			return this.state;
		},

		getGroup: function(){

			return this.group;
		},

		setWidth: function(width){

			this.options.width = width;

			this.recalcWidth();

			var modalWidth = this.$element.outerWidth();
    		if(this.options.navigateArrows === true || this.options.navigateArrows == 'closeToModal'){
		    	this.$navigate.find('.'+PLUGIN_NAME+'-navigate-prev').css('margin-left', -((modalWidth/2)+84)).show();
		    	this.$navigate.find('.'+PLUGIN_NAME+'-navigate-next').css('margin-right', -((modalWidth/2)+84)).show();
    		}

		},

		setTop: function(top){

			this.options.top = top;

			this.recalcVerticalPos(false);
		},

		setBottom: function(bottom){

			this.options.bottom = bottom;

			this.recalcVerticalPos(false);

		},

		setHeader: function(status){

			if(status){
				this.$element.find('.'+PLUGIN_NAME+'-header').show();
			} else {
				this.headerHeight = 0;
				this.$element.find('.'+PLUGIN_NAME+'-header').hide();
			}
		},

		setTitle: function(title){

			this.options.title = title;

			if(this.headerHeight === 0){
				this.createHeader();
			}

			if( this.$header.find('.'+PLUGIN_NAME+'-header-title').length === 0 ){
				this.$header.append('<h2 class="'+PLUGIN_NAME+'-header-title"></h2>');
			}

			this.$header.find('.'+PLUGIN_NAME+'-header-title').html(title);
		},

		setSubtitle: function(subtitle){

			if(subtitle === ''){

				this.$header.find('.'+PLUGIN_NAME+'-header-subtitle').remove();
				this.$header.addClass(PLUGIN_NAME+'-noSubtitle');

			} else {

				if( this.$header.find('.'+PLUGIN_NAME+'-header-subtitle').length === 0 ){
					this.$header.append('<p class="'+PLUGIN_NAME+'-header-subtitle"></p>');
				}
				this.$header.removeClass(PLUGIN_NAME+'-noSubtitle');

			}

			this.$header.find('.'+PLUGIN_NAME+'-header-subtitle').html(subtitle);
			this.options.subtitle = subtitle;
		},

		setIcon: function(icon){

			if( this.$header.find('.'+PLUGIN_NAME+'-header-icon').length === 0 ){
				this.$header.prepend('<i class="'+PLUGIN_NAME+'-header-icon"></i>');
			}
			this.$header.find('.'+PLUGIN_NAME+'-header-icon').attr('class', PLUGIN_NAME+'-header-icon ' + icon);
			this.options.icon = icon;
		},

		setIconText: function(iconText){

			this.$header.find('.'+PLUGIN_NAME+'-header-icon').html(iconText);
			this.options.iconText = iconText;
		},

		setHeaderColor: function(headerColor){
			if(this.options.borderBottom === true){
            	this.$element.css('border-bottom', '3px solid ' + headerColor + '');
        	}
            this.$header.css('background', headerColor);
            this.options.headerColor = headerColor;
		},

		setBackground: function(background){
			if(background === false){
				this.options.background = null;
				this.$element.css('background', '');
			} else{
            	this.$element.css('background', background);
            	this.options.background = background;
			}
		},

		setZindex: function(zindex){

	        if (!isNaN(parseInt(this.options.zindex))) {
	        	this.options.zindex = zindex;
			 	this.$element.css('z-index', zindex);
			 	this.$navigate.css('z-index', zindex-1);
			 	this.$overlay.css('z-index', zindex-2);
	        }
		},

		setFullscreen: function(value){

			if(value){
			    this.isFullscreen = true;
			    this.$element.addClass('isFullscreen');
			} else {
				this.isFullscreen = false;
			    this.$element.removeClass('isFullscreen');
			}

		},

		setContent: function(content){

			if( typeof content == 'object' ){
				var replace = content.default || false;
				if(replace === true){
					this.content = content.content;
				}
				content = content.content;
			}
            if (this.options.iframe === false) {
        		this.$element.find('.'+PLUGIN_NAME+'-content').html(content);
            }

		},

		setTransitionIn: function(transition){

			this.options.transitionIn = transition;
		},

		setTransitionOut: function(transition){

			this.options.transitionOut = transition;
		},

		setTimeout: function(timeout){

			this.options.timeout = timeout;
		},

		resetContent: function(){

			this.$element.find('.'+PLUGIN_NAME+'-content').html(this.content);
		},

		startLoading: function(){

			if( !this.$element.find('.'+PLUGIN_NAME+'-loader').length ){
				this.$element.append('<div class="'+PLUGIN_NAME+'-loader fadeIn"></div>');
			}
			this.$element.find('.'+PLUGIN_NAME+'-loader').css({
				top: this.headerHeight,
    			borderRadius: this.options.radius
			});
		},

		stopLoading: function(){

			var $loader = this.$element.find('.'+PLUGIN_NAME+'-loader');

			if( !$loader.length ){
				this.$element.prepend('<div class="'+PLUGIN_NAME+'-loader fadeIn"></div>');
				$loader = this.$element.find('.'+PLUGIN_NAME+'-loader').css('border-radius', this.options.radius);
			}
			$loader.removeClass('fadeIn').addClass('fadeOut');
			setTimeout(function(){
				$loader.remove();
			},600);
		},

		recalcWidth: function(){

			var that = this;

            this.$element.css('max-width', this.options.width);

            if(isIE()){
            	var modalWidth = that.options.width;

            	if(modalWidth.toString().split('%').length > 1){
					modalWidth = that.$element.outerWidth();
            	}
            	that.$element.css({
            		left: '50%',
            		marginLeft: -(modalWidth/2)
            	});
            }
		},

		recalcVerticalPos: function(first){

			if(this.options.top !== null && this.options.top !== false){
            	this.$element.css('margin-top', this.options.top);
            	if(this.options.top === 0){
            		this.$element.css({
            			borderTopRightRadius: 0,
            			borderTopLeftRadius: 0
            		});
            	}
			} else {
				if(first === false){
					this.$element.css({
						marginTop: '',
            			borderRadius: this.options.radius
            		});
				}
			}
			if (this.options.bottom !== null && this.options.bottom !== false){
            	this.$element.css('margin-bottom', this.options.bottom);
            	if(this.options.bottom === 0){
            		this.$element.css({
            			borderBottomRightRadius: 0,
            			borderBottomLeftRadius: 0
            		});
            	}
			} else {
				if(first === false){
					this.$element.css({
						marginBottom: '',
            			borderRadius: this.options.radius
            		});
				}
			}

		},

		recalcLayout: function(){

			var that = this,
        		windowHeight = $window.height(),
                modalHeight = this.$element.outerHeight(),
                modalWidth = this.$element.outerWidth(),
                contentHeight = this.$element.find('.'+PLUGIN_NAME+'-content')[0].scrollHeight,
            	outerHeight = contentHeight + this.headerHeight,
            	wrapperHeight = this.$element.innerHeight() - this.headerHeight,
                modalMargin = parseInt(-((this.$element.innerHeight() + 1) / 2)) + 'px',
            	scrollTop = this.$wrap.scrollTop(),
            	borderSize = 0;

			if(isIE()){
				if( modalWidth >= $window.width() || this.isFullscreen === true ){
					this.$element.css({
						left: '0',
						marginLeft: ''
					});
				} else {
	            	this.$element.css({
	            		left: '50%',
	            		marginLeft: -(modalWidth/2)
	            	});
				}
			}

			if(this.options.borderBottom === true && this.options.title !== ''){
				borderSize = 3;
			}

            if(this.$element.find('.'+PLUGIN_NAME+'-header').length && this.$element.find('.'+PLUGIN_NAME+'-header').is(':visible') ){
            	this.headerHeight = parseInt(this.$element.find('.'+PLUGIN_NAME+'-header').innerHeight());
            	this.$element.css('overflow', 'hidden');
            } else {
            	this.headerHeight = 0;
            	this.$element.css('overflow', '');
            }

			if(this.$element.find('.'+PLUGIN_NAME+'-loader').length){
				this.$element.find('.'+PLUGIN_NAME+'-loader').css('top', this.headerHeight);
			}

			if(modalHeight !== this.modalHeight){
				this.modalHeight = modalHeight;

				if (this.options.onResize && typeof(this.options.onResize) === "function") {
			        this.options.onResize(this);
			    }
			}

            if(this.state == STATES.OPENED || this.state == STATES.OPENING){

				if (this.options.iframe === true) {

					// If the height of the window is smaller than the modal with iframe
					if(windowHeight < (this.options.iframeHeight + this.headerHeight+borderSize) || this.isFullscreen === true){
						this.$element.find('.'+PLUGIN_NAME+'-iframe').css( 'height', windowHeight - (this.headerHeight+borderSize));
					} else {
						this.$element.find('.'+PLUGIN_NAME+'-iframe').css( 'height', this.options.iframeHeight);
					}
				}

				if(modalHeight == windowHeight){
					this.$element.addClass('isAttached');
				} else {
					this.$element.removeClass('isAttached');
				}

        		if(this.isFullscreen === false && this.$element.width() >= $window.width() ){
        			this.$element.find('.'+PLUGIN_NAME+'-button-fullscreen').hide();
        		} else {
        			this.$element.find('.'+PLUGIN_NAME+'-button-fullscreen').show();
        		}
				this.recalcButtons();

				if(this.isFullscreen === false){
	                	windowHeight = windowHeight - (clearValue(this.options.top) || 0) - (clearValue(this.options.bottom) || 0);
				}
                // If the modal is larger than the height of the window..
                if (outerHeight > windowHeight) {
					if(this.options.top > 0 && this.options.bottom === null && contentHeight < $window.height()){
				    	this.$element.addClass('isAttachedBottom');
					}
					if(this.options.bottom > 0 && this.options.top === null && contentHeight < $window.height()){
				    	this.$element.addClass('isAttachedTop');
					}
					if( $('.'+PLUGIN_NAME+':visible').length === 1 ){
						$('html').addClass(PLUGIN_NAME+'-isAttached');
					}
					this.$element.css( 'height', windowHeight );

                } else {
                	this.$element.css('height', contentHeight + (this.headerHeight+borderSize));
		    		this.$element.removeClass('isAttachedTop isAttachedBottom');
		    		if( $('.'+PLUGIN_NAME+':visible').length === 1 ){
		    			$('html').removeClass(PLUGIN_NAME+'-isAttached');
		    		}
                }

                (function applyScroll(){
                	if(contentHeight > wrapperHeight && outerHeight > windowHeight){
                		that.$element.addClass('hasScroll');
                		that.$wrap.css('height', modalHeight - (that.headerHeight+borderSize));
                	} else {
                		that.$element.removeClass('hasScroll');
                		that.$wrap.css('height', 'auto');
                	}
            	})();

	            (function applyShadow(){
	                if (wrapperHeight + scrollTop < (contentHeight - 30)) {
	                    that.$element.addClass('hasShadow');
	                } else {
	                    that.$element.removeClass('hasShadow');
	                }
				})();

        	}
		},

		recalcButtons: function(){
			var widthButtons = this.$header.find('.'+PLUGIN_NAME+'-header-buttons').innerWidth()+10;
			if(this.options.rtl === true){
				this.$header.css('padding-left', widthButtons);
			} else {
				this.$header.css('padding-right', widthButtons);
			}
		}

	};


	$window.off('load.'+PLUGIN_NAME).on('load.'+PLUGIN_NAME, function(e) {

		var modalHash = document.location.hash;

		if(window.$iziModal.autoOpen === 0 && !$('.'+PLUGIN_NAME).is(':visible')){

			try {
				var data = $(modalHash).data();
				if(typeof data !== 'undefined'){
					if(data.iziModal.options.autoOpen !== false){
						$(modalHash).iziModal('open');
					}
				}
			} catch(exc) { /* console.warn(exc); */ }
		}

	});

	$window.off('hashchange.'+PLUGIN_NAME).on('hashchange.'+PLUGIN_NAME, function(e) {

		var modalHash = document.location.hash;

		if(modalHash !== ''){
			try {
      			var data = $(modalHash).data();

				if(typeof data !== 'undefined' && $(modalHash).iziModal('getState') !== 'opening'){
					setTimeout(function(){
						$(modalHash).iziModal('open', { preventClose: false });
					},200);
				}
			} catch(exc) { /* console.warn(exc); */ }

		} else {

			if(window.$iziModal.history){
				$.each( $('.'+PLUGIN_NAME) , function(index, modal) {
					if( $(modal).data().iziModal !== undefined ){
						var state = $(modal).iziModal('getState');
						if(state == 'opened' || state == 'opening'){
							$(modal).iziModal('close');
						}
					}
				});
			}
		}

	});

	$document.off('click', '[data-'+PLUGIN_NAME+'-open]').on('click', '[data-'+PLUGIN_NAME+'-open]', function(e) {
		e.preventDefault();

		var modal = $('.'+PLUGIN_NAME+':visible');
		var openModal = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-open');
		var preventClose = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-preventClose');
		var transitionIn = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-transitionIn');
		var transitionOut = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-transitionOut');
		var zindex = $(e.currentTarget).attr('data-'+PLUGIN_NAME+'-zindex');

		if(zindex !== undefined)
			$(openModal).iziModal('setZindex', zindex);

		if(preventClose === undefined){
			if(transitionOut !== undefined){
				modal.iziModal('close', {
					transition: transitionOut
				});
			} else {
				modal.iziModal('close');
			}
		}
		
		setTimeout(function(){
			if(transitionIn !== undefined){
				$(openModal).iziModal('open', {
					transition: transitionIn
				});
			} else {
				$(openModal).iziModal('open');
			}
		}, 200);
	});

	$document.off('keyup.'+PLUGIN_NAME).on('keyup.'+PLUGIN_NAME, function(event) {

		if( $('.'+PLUGIN_NAME+':visible').length ){
			var modal = $('.'+PLUGIN_NAME+':visible')[0].id,
				arrowKeys = $('#'+modal).data().iziModal.options.arrowKeys,
				group = $('#'+modal).iziModal('getGroup'),
				e = event || window.event,
				target = e.target || e.srcElement,
				modals = {};

			if(modal !== undefined && arrowKeys && group.name !== undefined && !e.ctrlKey && !e.metaKey && !e.altKey && target.tagName.toUpperCase() !== 'INPUT' && target.tagName.toUpperCase() != 'TEXTAREA'){ //&& $(e.target).is('body')

				if(e.keyCode === 37) { // left
					$('#'+modal).iziModal('prev', e);
				}
				else if(e.keyCode === 39 ) { // right
					$('#'+modal).iziModal('next', e);
				}
			}
		}
	});

	$.fn[PLUGIN_NAME] = function(option, args) {


		if( !$(this).length && typeof option == 'object'){

			var newEL = {
				$el: document.createElement('div'),
				id: this.selector.split('#'),
				class: this.selector.split('.')
			};

			if(newEL.id.length > 1){
				try{
					newEL.$el = document.createElement(id[0]);
				} catch(exc){ }

				newEL.$el.id = this.selector.split('#')[1].trim();

			} else if(newEL.class.length > 1){
				try{
					newEL.$el = document.createElement(newEL.class[0]);
				} catch(exc){ }

				for (var x=1; x<newEL.class.length; x++) {
					newEL.$el.classList.add(newEL.class[x].trim());
				}
			}
			document.body.appendChild(newEL.$el);

			this.push($(this.selector));
		}
		var objs = this;

		for (var i=0; i<objs.length; i++) {

			var $this = $(objs[i]);
			var data = $this.data(PLUGIN_NAME);
			var options = $.extend({}, $.fn[PLUGIN_NAME].defaults, $this.data(), typeof option == 'object' && option);

			if (!data && (!option || typeof option == 'object')){

				$this.data(PLUGIN_NAME, (data = new iziModal($this, options)));
			}
			else if (typeof option == 'string' && typeof data != 'undefined'){

				return data[option].apply(data, [].concat(args));
			}
			if (options.autoOpen){ // Automatically open the modal if autoOpen setted true or ms

				if( !isNaN(parseInt(options.autoOpen)) ){

					setTimeout(function(){
						data.open();
					}, options.autoOpen);

				} else if(options.autoOpen === true ) {

					data.open();
				}
				window.$iziModal.autoOpen++;
			}
		}

        return this;
    };

	$.fn[PLUGIN_NAME].defaults = {
	    title: '',
	    subtitle: '',
	    headerColor: '#88A0B9',
	    background: null,
	    theme: '',  // light
	    icon: null,
	    iconText: null,
	    iconColor: '',
	    rtl: false,
	    width: 600,
	    top: null,
	    bottom: null,
	    borderBottom: true,
	    padding: 0,
	    radius: 3,
	    zindex: 999,
	    iframe: false,
	    iframeHeight: 400,
	    iframeURL: null,
	    focusInput: true,
	    group: '',
	    loop: false,
	    arrowKeys: true,
	    navigateCaption: true,
	    navigateArrows: true, // Boolean, 'closeToModal', 'closeScreenEdge'
	    history: false,
	    restoreDefaultContent: false,
	    autoOpen: 0, // Boolean, Number
	    bodyOverflow: false,
	    fullscreen: false,
	    openFullscreen: false,
	    closeOnEscape: true,
	    closeButton: true,
	    appendTo: 'body', // or false
	    appendToOverlay: 'body', // or false
	    overlay: true,
	    overlayClose: true,
	    overlayColor: 'rgba(0, 0, 0, 0.4)',
	    timeout: false,
	    timeoutProgressbar: false,
	    pauseOnHover: false,
	    timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
	    transitionIn: 'comingIn',   // comingIn, bounceInDown, bounceInUp, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, flipInX
	    transitionOut: 'comingOut', // comingOut, bounceOutDown, bounceOutUp, fadeOutDown, fadeOutUp, , fadeOutLeft, fadeOutRight, flipOutX
	    transitionInOverlay: 'fadeIn',
	    transitionOutOverlay: 'fadeOut',
	    onFullscreen: function(){},
	    onResize: function(){},
        onOpening: function(){},
        onOpened: function(){},
        onClosing: function(){},
        onClosed: function(){},
        afterRender: function(){}
	};

	$.fn[PLUGIN_NAME].Constructor = iziModal;

    return $.fn.iziModal;

}));


/**
 * simplePagination.js v1.6
 * A simple jQuery pagination plugin.
 * http://flaviusmatis.github.com/simplePagination.js/
 *
 * Copyright 2012, Flavius Matis
 * Released under the MIT license.
 * http://flaviusmatis.github.com/license.html
 */

(function ($) {

    var methods = {
        init: function (options) {
            var o = $.extend({
                items: 1,
                itemsOnPage: 1,
                pages: 0,
                displayedPages: 5,
                edges: 2,
                currentPage: 0,
                useAnchors: true,
                hrefTextPrefix: '#page-',
                hrefTextSuffix: '',
                prevText: 'Prev',
                nextText: 'Next',
                ellipseText: '&hellip;',
                ellipsePageSet: true,
                cssStyle: 'light-theme',
                listStyle: '',
                labelMap: [],
                selectOnClick: true,
                nextAtFront: false,
                invertPageOrder: false,
                useStartEdge: true,
                useEndEdge: true,
                onPageClick: function (pageNumber, event) {
                    // Callback triggered when a page is clicked
                    // Page number is given as an optional parameter
                },
                onInit: function () {
                    // Callback triggered immediately after initialization
                }
            }, options || {});

            var self = this;

            o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
            if (o.currentPage)
                o.currentPage = o.currentPage - 1;
            else
                o.currentPage = !o.invertPageOrder ? 0 : o.pages - 1;
            o.halfDisplayed = o.displayedPages / 2;

            this.each(function () {
                self.addClass(o.cssStyle + ' simple-pagination').data('pagination', o);
                methods._draw.call(self);
            });

            o.onInit();

            return this;
        },

        selectPage: function (page) {
            methods._selectPage.call(this, page - 1);
            return this;
        },

        prevPage: function () {
            var o = this.data('pagination');
            if (!o.invertPageOrder) {
                if (o.currentPage > 0) {
                    methods._selectPage.call(this, o.currentPage - 1);
                }
            } else {
                if (o.currentPage < o.pages - 1) {
                    methods._selectPage.call(this, o.currentPage + 1);
                }
            }
            return this;
        },

        nextPage: function () {
            var o = this.data('pagination');
            if (!o.invertPageOrder) {
                if (o.currentPage < o.pages - 1) {
                    methods._selectPage.call(this, o.currentPage + 1);
                }
            } else {
                if (o.currentPage > 0) {
                    methods._selectPage.call(this, o.currentPage - 1);
                }
            }
            return this;
        },

        getPagesCount: function () {
            return this.data('pagination').pages;
        },

        setPagesCount: function (count) {
            this.data('pagination').pages = count;
        },

        getCurrentPage: function () {
            return this.data('pagination').currentPage + 1;
        },

        destroy: function () {
            this.empty();
            return this;
        },

        drawPage: function (page) {
            var o = this.data('pagination');
            o.currentPage = page - 1;
            this.data('pagination', o);
            methods._draw.call(this);
            return this;
        },

        redraw: function () {
            methods._draw.call(this);
            return this;
        },

        disable: function () {
            var o = this.data('pagination');
            o.disabled = true;
            this.data('pagination', o);
            methods._draw.call(this);
            return this;
        },

        enable: function () {
            var o = this.data('pagination');
            o.disabled = false;
            this.data('pagination', o);
            methods._draw.call(this);
            return this;
        },

        updateItems: function (newItems) {
            var o = this.data('pagination');
            o.items = newItems;
            o.pages = methods._getPages(o);
            this.data('pagination', o);
            methods._draw.call(this);
        },

        updateItemsOnPage: function (itemsOnPage) {
            var o = this.data('pagination');
            o.itemsOnPage = itemsOnPage;
            o.pages = methods._getPages(o);
            this.data('pagination', o);
            methods._selectPage.call(this, 0);
            return this;
        },

        getItemsOnPage: function () {
            return this.data('pagination').itemsOnPage;
        },

        _draw: function () {
            var o = this.data('pagination'),
                    interval = methods._getInterval(o),
                    i,
                    tagName;

            methods.destroy.call(this);

            tagName = (typeof this.prop === 'function') ? this.prop('tagName') : this.attr('tagName');

            var $panel = tagName === 'UL' ? this : $('<ul' + (o.listStyle ? ' class="' + o.listStyle + '"' : '') + '></ul>').appendTo(this);

            // Generate Prev link
            if (o.prevText) {
                methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage - 1 : o.currentPage + 1, {text: o.prevText, classes: 'prev'});
            }

            // Generate Next link (if option set for at front)
            if (o.nextText && o.nextAtFront) {
                methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
            }

            // Generate start edges
            if (!o.invertPageOrder) {
                if (interval.start > 0 && o.edges > 0) {
                    if (o.useStartEdge) {
                        var end = Math.min(o.edges, interval.start);
                        for (i = 0; i < end; i++) {
                            methods._appendItem.call(this, i);
                        }
                    }
                    if (o.edges < interval.start && (interval.start - o.edges != 1)) {
                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                    } else if (interval.start - o.edges == 1) {
                        methods._appendItem.call(this, o.edges);
                    }
                }
            } else {
                if (interval.end < o.pages && o.edges > 0) {
                    if (o.useStartEdge) {
                        var begin = Math.max(o.pages - o.edges, interval.end);
                        for (i = o.pages - 1; i >= begin; i--) {
                            methods._appendItem.call(this, i);
                        }
                    }

                    if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                    } else if (o.pages - o.edges - interval.end == 1) {
                        methods._appendItem.call(this, interval.end);
                    }
                }
            }

            // Generate interval links
            if (!o.invertPageOrder) {
                for (i = interval.start; i < interval.end; i++) {
                    methods._appendItem.call(this, i);
                }
            } else {
                for (i = interval.end - 1; i >= interval.start; i--) {
                    methods._appendItem.call(this, i);
                }
            }

            // Generate end edges
            if (!o.invertPageOrder) {
                if (interval.end < o.pages && o.edges > 0) {
                    if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                    } else if (o.pages - o.edges - interval.end == 1) {
                        methods._appendItem.call(this, interval.end);
                    }
                    if (o.useEndEdge) {
                        var begin = Math.max(o.pages - o.edges, interval.end);
                        for (i = begin; i < o.pages; i++) {
                            methods._appendItem.call(this, i);
                        }
                    }
                }
            } else {
                if (interval.start > 0 && o.edges > 0) {
                    if (o.edges < interval.start && (interval.start - o.edges != 1)) {
                        $panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
                    } else if (interval.start - o.edges == 1) {
                        methods._appendItem.call(this, o.edges);
                    }

                    if (o.useEndEdge) {
                        var end = Math.min(o.edges, interval.start);
                        for (i = end - 1; i >= 0; i--) {
                            methods._appendItem.call(this, i);
                        }
                    }
                }
            }

            // Generate Next link (unless option is set for at front)
            if (o.nextText && !o.nextAtFront) {
                methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
            }

            if (o.ellipsePageSet && !o.disabled) {
                methods._ellipseClick.call(this, $panel);
            }

        },

        _getPages: function (o) {
            var pages = Math.ceil(o.items / o.itemsOnPage);
            return pages || 1;
        },

        _getInterval: function (o) {
            return {
                start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0),
                end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
            };
        },

        _appendItem: function (pageIndex, opts) {
            var self = this, options, $link, o = self.data('pagination'), $linkWrapper = $('<li></li>'), $ul = self.find('ul');

            pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);

            options = {
                text: pageIndex + 1,
                classes: ''
            };

            if (o.labelMap.length && o.labelMap[pageIndex]) {
                options.text = o.labelMap[pageIndex];
            }

            options = $.extend(options, opts || {});

            if (pageIndex == o.currentPage || o.disabled) {
                if (o.disabled || options.classes === 'prev' || options.classes === 'next') {
                    $linkWrapper.addClass('disabled');
                } else {
                    $linkWrapper.addClass('active');
                }
                $link = $('<span class="current">' + (options.text) + '</span>');
            } else {
                if (o.useAnchors) {
                    $link = $('<a href="' + o.hrefTextPrefix + (pageIndex + 1) + o.hrefTextSuffix + '" class="page-link">' + (options.text) + '</a>');
                } else {
                    $link = $('<span >' + (options.text) + '</span>');
                }
                $link.click(function (event) {
                    return methods._selectPage.call(self, pageIndex, event);
                });
            }

            if (options.classes) {
                $link.addClass(options.classes);
            }

            $linkWrapper.append($link);

            if ($ul.length) {
                $ul.append($linkWrapper);
            } else {
                self.append($linkWrapper);
            }
        },

        _selectPage: function (pageIndex, event) {
            var o = this.data('pagination');
            o.currentPage = pageIndex;
            if (o.selectOnClick) {
                methods._draw.call(this);
            }
            return o.onPageClick(pageIndex + 1, event);
        },

        _ellipseClick: function ($panel) {
            var self = this,
                    o = this.data('pagination'),
                    $ellip = $panel.find('.ellipse');
            $ellip.addClass('clickable').parent().removeClass('disabled');
            $ellip.click(function (event) {
                if (!o.disable) {
                    var $this = $(this),
                            val = (parseInt($this.parent().prev().text(), 10) || 0) + 1;
                    $this
                            .html('<input type="number" min="1" max="' + o.pages + '" step="1" value="' + val + '">')
                            .find('input')
                            .focus()
                            .click(function (event) {
                                // prevent input number arrows from bubbling a click event on $ellip
                                event.stopPropagation();
                            })
                            .keyup(function (event) {
                                var val = $(this).val();
                                if (event.which === 13 && val !== '') {
                                    // enter to accept
                                    if ((val > 0) && (val <= o.pages))
                                        methods._selectPage.call(self, val - 1);
                                } else if (event.which === 27) {
                                    // escape to cancel
                                    $ellip.empty().html(o.ellipseText);
                                }
                            })
                            .bind('blur', function (event) {
                                var val = $(this).val();
                                if (val !== '') {
                                    methods._selectPage.call(self, val - 1);
                                }
                                $ellip.empty().html(o.ellipseText);
                                return false;
                            });
                }
                return false;
            });
        }

    };

    $.fn.pagination = function (method) {

        // Method calling logic
        if (methods[method] && method.charAt(0) != '_') {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.pagination');
        }

    };

})(jQuery);


/*!
 Non-Sucking Autogrow 1.1.6
 license: MIT
 author: Roman Pushkin
 https://github.com/ro31337/jquery.ns-autogrow
 */
(function () {
    var getVerticalScrollbarWidth;

    (function ($, window) {
        return $.fn.autogrow = function (options) {
            if (options == null) {
                options = {};
            }
            if (options.horizontal == null) {
                options.horizontal = true;
            }
            if (options.vertical == null) {
                options.vertical = true;
            }
            if (options.debugx == null) {
                options.debugx = -10000;
            }
            if (options.debugy == null) {
                options.debugy = -10000;
            }
            if (options.debugcolor == null) {
                options.debugcolor = 'yellow';
            }
            if (options.flickering == null) {
                options.flickering = true;
            }
            if (options.postGrowCallback == null) {
                options.postGrowCallback = function () {};
            }
            if (options.verticalScrollbarWidth == null) {
                options.verticalScrollbarWidth = getVerticalScrollbarWidth();
            }
            if (options.horizontal === false && options.vertical === false) {
                return;
            }
            return this.filter('textarea').each(function () {
                var $e, $shadow, fontSize, heightPadding, minHeight, minWidth, update;
                $e = $(this);
                if ($e.data('autogrow-enabled')) {
                    return;
                }
                $e.data('autogrow-enabled');
                minHeight = $e.height();
                minWidth = $e.width();
                heightPadding = $e.css('lineHeight') * 1 || 0;
                $e.hasVerticalScrollBar = function () {
                    return $e[0].clientHeight < $e[0].scrollHeight;
                };
                $shadow = $('<div class="autogrow-shadow"></div>').css({
                    position: 'absolute',
                    display: 'inline-block',
                    'background-color': options.debugcolor,
                    top: options.debugy,
                    left: options.debugx,
                    'max-width': $e.css('max-width'),
                    'padding': $e.css('padding'),
                    fontSize: $e.css('fontSize'),
                    fontFamily: $e.css('fontFamily'),
                    fontWeight: $e.css('fontWeight'),
                    lineHeight: $e.css('lineHeight'),
                    resize: 'none',
                    'word-wrap': 'break-word'
                }).appendTo(document.body);
                if (options.horizontal === false) {
                    $shadow.css({
                        'width': $e.width()
                    });
                } else {
                    fontSize = $e.css('font-size');
                    $shadow.css('padding-right', '+=' + fontSize);
                    $shadow.normalPaddingRight = $shadow.css('padding-right');
                }
                update = (function (_this) {
                    return function (event) {
                        var height, val, width;
                        val = _this.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n /g, '<br/>&nbsp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n$/, '<br/>&nbsp;').replace(/\n/g, '<br/>').replace(/ {2,}/g, function (space) {
                            return Array(space.length - 1).join('&nbsp;') + ' ';
                        });
                        if (/(\n|\r)/.test(_this.value)) {
                            val += '<br />';
                            if (options.flickering === false) {
                                val += '<br />';
                            }
                        }
                        $shadow.html(val);
                        if (options.vertical === true) {
                            height = Math.max($shadow.height() + heightPadding, minHeight);
                            $e.height(height);
                        }
                        if (options.horizontal === true) {
                            $shadow.css('padding-right', $shadow.normalPaddingRight);
                            if (options.vertical === false && $e.hasVerticalScrollBar()) {
                                $shadow.css('padding-right', "+=" + options.verticalScrollbarWidth + "px");
                            }
                            width = Math.max($shadow.outerWidth(), minWidth);
                            $e.width(width);
                        }
                        return options.postGrowCallback($e);
                    };
                })(this);
                $e.change(update).keyup(update).keydown(update);
                $(window).resize(update);
                return update();
            });
        };
    })(window.jQuery, window);

    getVerticalScrollbarWidth = function () {
        var inner, outer, w1, w2;
        inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";
        outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);
        document.body.appendChild(outer);
        w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        w2 = inner.offsetWidth;
        if (w1 === w2) {
            w2 = outer.clientWidth;
        }
        document.body.removeChild(outer);
        return w1 - w2;
    };

}).call(this);

/*  jQuery Nice Select - v1.1.0
 https://github.com/hernansartorio/jquery-nice-select
 Made by Hernán Sartorio  */

(function ($) {

    $.fn.niceSelect = function (method) {

        // Methods
        if (typeof method == 'string') {
            if (method == 'update') {
                this.each(function () {
                    var $select = $(this);
                    var $dropdown = $(this).next('.nice-select');
                    var open = $dropdown.hasClass('open');

                    if ($dropdown.length) {
                        $dropdown.remove();
                        create_nice_select($select);

                        if (open) {
                            $select.next().trigger('click');
                        }
                    }
                });
            } else if (method == 'destroy') {
                this.each(function () {
                    var $select = $(this);
                    var $dropdown = $(this).next('.nice-select');

                    if ($dropdown.length) {
                        $dropdown.remove();
                        $select.css('display', '');
                    }
                });
                if ($('.nice-select').length == 0) {
                    $(document).off('.nice_select');
                }
            } else {
                console.log('Method "' + method + '" does not exist.')
            }
            return this;
        }

        // Hide native select
        this.hide();

        // Create custom markup
        this.each(function () {
            var $select = $(this);

            if (!$select.next().hasClass('nice-select')) {
                create_nice_select($select);
            }
        });

        function create_nice_select($select) {
            $select.after($('<div></div>')
                    .addClass('nice-select')
                    .addClass($select.attr('class') || '')
                    .addClass($select.attr('disabled') ? 'disabled' : '')
                    .attr('tabindex', $select.attr('disabled') ? null : '0')
                    .html('<span class="current"></span><ul class="list"></ul>')
                    );

            var $dropdown = $select.next();
            var $options = $select.find('option');
            var $selected = $select.find('option:selected');

            $dropdown.find('.current').html($selected.data('display') || $selected.text());

            $options.each(function (i) {
                var $option = $(this);
                var display = $option.data('display');

                $dropdown.find('ul').append($('<li></li>')
                        .attr('data-value', $option.val())
                        .attr('data-display', (display || null))
                        .addClass('option' +
                                ($option.is(':selected') ? ' selected' : '') +
                                ($option.is(':disabled') ? ' disabled' : ''))
                        .html($option.text())
                        );
            });
        }

        /* Event listeners */

        // Unbind existing events in case that the plugin has been initialized before
        $(document).off('.nice_select');

        // Open/close
        $(document).on('click.nice_select', '.nice-select', function (event) {
            var $dropdown = $(this);

            $('.nice-select').not($dropdown).removeClass('open');
            $dropdown.toggleClass('open');

            if ($dropdown.hasClass('open')) {
                $dropdown.find('.option');
                $dropdown.find('.focus').removeClass('focus');
                $dropdown.find('.selected').addClass('focus');
            } else {
                $dropdown.focus();
            }
        });

        // Close when clicking outside
        $(document).on('click.nice_select', function (event) {
            if ($(event.target).closest('.nice-select').length === 0) {
                $('.nice-select').removeClass('open').find('.option');
            }
        });

        // Option click
        $(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function (event) {
            var $option = $(this);
            var $dropdown = $option.closest('.nice-select');

            $dropdown.find('.selected').removeClass('selected');
            $option.addClass('selected');

            var text = $option.data('display') || $option.text();
            $dropdown.find('.current').text(text);

            $dropdown.prev('select').val($option.data('value')).trigger('change');
        });

        // Keyboard events
        $(document).on('keydown.nice_select', '.nice-select', function (event) {
            var $dropdown = $(this);
            var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

            // Space or Enter
            if (event.keyCode == 32 || event.keyCode == 13) {
                if ($dropdown.hasClass('open')) {
                    $focused_option.trigger('click');
                } else {
                    $dropdown.trigger('click');
                }
                return false;
                // Down
            } else if (event.keyCode == 40) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $next = $focused_option.nextAll('.option:not(.disabled)').first();
                    if ($next.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $next.addClass('focus');
                    }
                }
                return false;
                // Up
            } else if (event.keyCode == 38) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
                    if ($prev.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $prev.addClass('focus');
                    }
                }
                return false;
                // Esc
            } else if (event.keyCode == 27) {
                if ($dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                }
                // Tab
            } else if (event.keyCode == 9) {
                if ($dropdown.hasClass('open')) {
                    return false;
                }
            }
        });

        // Detect CSS pointer-events support, for IE <= 10. From Modernizr.
        var style = document.createElement('a').style;
        style.cssText = 'pointer-events:auto';
        if (style.pointerEvents !== 'auto') {
            $('html').addClass('no-csspointerevents');
        }

        return this;

    };

}(jQuery));

jQuery.base64 = function(a) {
    function b(a, b) {
        var c = g.indexOf(a.charAt(b));
        if (-1 === c) throw "Cannot decode base64";
        return c;
    }
    function c(a) {
        var c, d, e = 0, g = a.length, h = [];
        if (a = String(a), 0 === g) return a;
        if (g % 4 !== 0) throw "Cannot decode base64";
        for (a.charAt(g - 1) === f && (e = 1, a.charAt(g - 2) === f && (e = 2), g -= 4), 
        c = 0; g > c; c += 4) d = b(a, c) << 18 | b(a, c + 1) << 12 | b(a, c + 2) << 6 | b(a, c + 3), 
        h.push(String.fromCharCode(d >> 16, d >> 8 & 255, 255 & d));
        switch (e) {
          case 1:
            d = b(a, c) << 18 | b(a, c + 1) << 12 | b(a, c + 2) << 6, h.push(String.fromCharCode(d >> 16, d >> 8 & 255));
            break;

          case 2:
            d = b(a, c) << 18 | b(a, c + 1) << 12, h.push(String.fromCharCode(d >> 16));
        }
        return h.join("");
    }
    function d(a, b) {
        var c = a.charCodeAt(b);
        if (c > 255) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return c;
    }
    function e(a) {
        if (1 !== arguments.length) throw "SyntaxError: exactly one argument required";
        a = String(a);
        var b, c, e = [], h = a.length - a.length % 3;
        if (0 === a.length) return a;
        for (b = 0; h > b; b += 3) c = d(a, b) << 16 | d(a, b + 1) << 8 | d(a, b + 2), e.push(g.charAt(c >> 18)), 
        e.push(g.charAt(c >> 12 & 63)), e.push(g.charAt(c >> 6 & 63)), e.push(g.charAt(63 & c));
        switch (a.length - h) {
          case 1:
            c = d(a, b) << 16, e.push(g.charAt(c >> 18) + g.charAt(c >> 12 & 63) + f + f);
            break;

          case 2:
            c = d(a, b) << 16 | d(a, b + 1) << 8, e.push(g.charAt(c >> 18) + g.charAt(c >> 12 & 63) + g.charAt(c >> 6 & 63) + f);
        }
        return e.join("");
    }
    var f = "=", g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = "1.0";
    return {
        decode: c,
        encode: e,
        VERSION: h
    };
}(jQuery);

var qq = function(a) {
    "use strict";
    return {
        hide: function() {
            return a.style.display = "none", this;
        },
        attach: function(b, c) {
            return a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c), 
            function() {
                qq(a).detach(b, c);
            };
        },
        detach: function(b, c) {
            return a.removeEventListener ? a.removeEventListener(b, c, !1) : a.attachEvent && a.detachEvent("on" + b, c), 
            this;
        },
        contains: function(b) {
            return a === b ? !0 : a.contains ? a.contains(b) : !!(8 & b.compareDocumentPosition(a));
        },
        insertBefore: function(b) {
            return b.parentNode.insertBefore(a, b), this;
        },
        remove: function() {
            return a.parentNode.removeChild(a), this;
        },
        css: function(b) {
            return null !== b.opacity && "string" != typeof a.style.opacity && "undefined" != typeof a.filters && (b.filter = "alpha(opacity=" + Math.round(100 * b.opacity) + ")"), 
            qq.extend(a.style, b), this;
        },
        hasClass: function(b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return c.test(a.className);
        },
        addClass: function(b) {
            return qq(a).hasClass(b) || (a.className += " " + b), this;
        },
        removeClass: function(b) {
            var c = new RegExp("(^| )" + b + "( |$)");
            return a.className = a.className.replace(c, " ").replace(/^\s+|\s+$/g, ""), this;
        },
        getByClass: function(b) {
            var c, d = [];
            return a.querySelectorAll ? a.querySelectorAll("." + b) : (c = a.getElementsByTagName("*"), 
            qq.each(c, function(a, c) {
                qq(c).hasClass(b) && d.push(c);
            }), d);
        },
        children: function() {
            for (var b = [], c = a.firstChild; c; ) 1 === c.nodeType && b.push(c), c = c.nextSibling;
            return b;
        },
        setText: function(b) {
            return a.innerText = b, a.textContent = b, this;
        },
        clearText: function() {
            return qq(a).setText("");
        }
    };
};

qq.log = function(a, b) {
    "use strict";
    window.console && (b && "info" !== b ? window.console[b] ? window.console[b](a) : window.console.log("<" + b + "> " + a) : window.console.log(a));
}, qq.isObject = function(a) {
    "use strict";
    return null !== a && a && "object" == typeof a && a.constructor === Object;
}, qq.isFunction = function(a) {
    "use strict";
    return "function" == typeof a;
}, qq.isFileOrInput = function(a) {
    "use strict";
    if (window.File && a instanceof File) return !0;
    if (window.HTMLInputElement) {
        if (a instanceof HTMLInputElement && a.type && "file" === a.type.toLowerCase()) return !0;
    } else if (a.tagName && "input" === a.tagName.toLowerCase() && a.type && "file" === a.type.toLowerCase()) return !0;
    return !1;
}, qq.isXhrUploadSupported = function() {
    "use strict";
    var a = document.createElement("input");
    return a.type = "file", void 0 !== a.multiple && "undefined" != typeof File && "undefined" != typeof FormData && "undefined" != typeof new XMLHttpRequest().upload;
}, qq.isFolderDropSupported = function(a) {
    "use strict";
    return a.items && a.items[0].webkitGetAsEntry;
}, qq.isFileChunkingSupported = function() {
    "use strict";
    return !qq.android() && qq.isXhrUploadSupported() && (File.prototype.slice || File.prototype.webkitSlice || File.prototype.mozSlice);
}, qq.extend = function(a, b, c) {
    "use strict";
    qq.each(b, function(b, d) {
        c && qq.isObject(d) ? (void 0 === a[b] && (a[b] = {}), qq.extend(a[b], d, !0)) : a[b] = d;
    });
}, qq.indexOf = function(a, b, c) {
    "use strict";
    if (a.indexOf) return a.indexOf(b, c);
    c = c || 0;
    var d = a.length;
    for (0 > c && (c += d); d > c; c += 1) if (a.hasOwnProperty(c) && a[c] === b) return c;
    return -1;
}, qq.getUniqueId = function() {
    "use strict";
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
        var b = 16 * Math.random() | 0, c = "x" == a ? b : 3 & b | 8;
        return c.toString(16);
    });
}, qq.ie = function() {
    "use strict";
    return -1 !== navigator.userAgent.indexOf("MSIE");
}, qq.ie10 = function() {
    "use strict";
    return -1 !== navigator.userAgent.indexOf("MSIE 10");
}, qq.safari = function() {
    "use strict";
    return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Apple");
}, qq.chrome = function() {
    "use strict";
    return void 0 !== navigator.vendor && -1 !== navigator.vendor.indexOf("Google");
}, qq.firefox = function() {
    "use strict";
    return -1 !== navigator.userAgent.indexOf("Mozilla") && void 0 !== navigator.vendor && "" === navigator.vendor;
}, qq.windows = function() {
    "use strict";
    return "Win32" === navigator.platform;
}, qq.android = function() {
    "use strict";
    return -1 !== navigator.userAgent.toLowerCase().indexOf("android");
}, qq.preventDefault = function(a) {
    "use strict";
    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
}, qq.toElement = function() {
    "use strict";
    var a = document.createElement("div");
    return function(b) {
        a.innerHTML = b;
        var c = a.firstChild;
        return a.removeChild(c), c;
    };
}(), qq.each = function(a, b) {
    "use strict";
    var c, d;
    if (a) for (c in a) if (Object.prototype.hasOwnProperty.call(a, c) && (d = b(c, a[c]), 
    d === !1)) break;
}, qq.obj2url = function(a, b, c) {
    "use strict";
    var d, e, f = [], g = "&", h = function(a, c) {
        var d = b ? /\[\]$/.test(b) ? b : b + "[" + c + "]" : c;
        "undefined" !== d && "undefined" !== c && f.push("object" == typeof a ? qq.obj2url(a, d, !0) : "[object Function]" === Object.prototype.toString.call(a) ? encodeURIComponent(d) + "=" + encodeURIComponent(a()) : encodeURIComponent(d) + "=" + encodeURIComponent(a));
    };
    if (!c && b) g = /\?/.test(b) ? /\?$/.test(b) ? "" : "&" : "?", f.push(b), f.push(qq.obj2url(a)); else if ("[object Array]" === Object.prototype.toString.call(a) && "undefined" != typeof a) for (d = -1, 
    e = a.length; e > d; d += 1) h(a[d], d); else if ("undefined" != typeof a && null !== a && "object" == typeof a) for (d in a) a.hasOwnProperty(d) && h(a[d], d); else f.push(encodeURIComponent(b) + "=" + encodeURIComponent(a));
    return b ? f.join(g) : f.join(g).replace(/^&/, "").replace(/%20/g, "+");
}, qq.obj2FormData = function(a, b, c) {
    "use strict";
    return b || (b = new FormData()), qq.each(a, function(a, d) {
        a = c ? c + "[" + a + "]" : a, qq.isObject(d) ? qq.obj2FormData(d, b, a) : qq.isFunction(d) ? b.append(encodeURIComponent(a), encodeURIComponent(d())) : b.append(encodeURIComponent(a), encodeURIComponent(d));
    }), b;
}, qq.obj2Inputs = function(a, b) {
    "use strict";
    var c;
    return b || (b = document.createElement("form")), qq.obj2FormData(a, {
        append: function(a, d) {
            c = document.createElement("input"), c.setAttribute("name", a), c.setAttribute("value", d), 
            b.appendChild(c);
        }
    }), b;
}, qq.setCookie = function(a, b, c) {
    var d = new Date(), e = "";
    c && (d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3), e = "; expires=" + d.toGMTString()), 
    document.cookie = a + "=" + b + e + "; path=/";
}, qq.getCookie = function(a) {
    for (var b, c = a + "=", d = document.cookie.split(";"), e = 0; e < d.length; e++) {
        for (b = d[e]; " " == b.charAt(0); ) b = b.substring(1, b.length);
        if (0 === b.indexOf(c)) return b.substring(c.length, b.length);
    }
}, qq.getCookieNames = function(a) {
    var b = document.cookie.split(";"), c = [];
    return qq.each(b, function(b, d) {
        d = d.trim();
        var e = d.indexOf("=");
        d.match(a) && c.push(d.substr(0, e));
    }), c;
}, qq.deleteCookie = function(a) {
    qq.setCookie(a, "", -1);
}, qq.areCookiesEnabled = function() {
    var a = 1e5 * Math.random(), b = "qqCookieTest:" + a;
    return qq.setCookie(b, 1), qq.getCookie(b) ? (qq.deleteCookie(b), !0) : !1;
}, qq.parseJson = function(json) {
    return "function" == typeof JSON.parse ? JSON.parse(json) : eval("(" + json + ")");
}, qq.DisposeSupport = function() {
    "use strict";
    var a = [];
    return {
        dispose: function() {
            var b;
            do b = a.shift(), b && b(); while (b);
        },
        attach: function() {
            var a = arguments;
            this.addDisposer(qq(a[0]).attach.apply(this, Array.prototype.slice.call(arguments, 1)));
        },
        addDisposer: function(b) {
            a.push(b);
        }
    };
}, qq.UploadButton = function(a) {
    this._options = {
        element: null,
        multiple: !1,
        acceptFiles: null,
        name: "file",
        onChange: function(a) {},
        hoverClass: "qq-upload-button-hover",
        focusClass: "qq-upload-button-focus"
    }, qq.extend(this._options, a), this._disposeSupport = new qq.DisposeSupport(), 
    this._element = this._options.element, qq(this._element).css({
        position: "relative",
        overflow: "hidden",
        direction: "ltr"
    }), this._input = this._createInput();
}, qq.UploadButton.prototype = {
    getInput: function() {
        return this._input;
    },
    reset: function() {
        this._input.parentNode && qq(this._input).remove(), qq(this._element).removeClass(this._options.focusClass), 
        this._input = this._createInput();
    },
    _createInput: function() {
        var a = document.createElement("input");
        this._options.multiple && a.setAttribute("multiple", "multiple"), this._options.acceptFiles && a.setAttribute("accept", this._options.acceptFiles), 
        a.setAttribute("type", "file"), a.setAttribute("id", "fileInput"), a.setAttribute("name", this._options.name), 
        qq(a).css({
            position: "absolute",
            right: 0,
            top: 0,
            fontFamily: "Arial",
            fontSize: "118px",
            margin: 0,
            padding: 0,
            cursor: "pointer",
            opacity: 0
        }), this._element.appendChild(a);
        var b = this;
        return this._disposeSupport.attach(a, "change", function() {
            b._options.onChange(a);
        }), this._disposeSupport.attach(a, "mouseover", function() {
            qq(b._element).addClass(b._options.hoverClass);
        }), this._disposeSupport.attach(a, "mouseout", function() {
            qq(b._element).removeClass(b._options.hoverClass);
        }), this._disposeSupport.attach(a, "focus", function() {
            qq(b._element).addClass(b._options.focusClass);
        }), this._disposeSupport.attach(a, "blur", function() {
            qq(b._element).removeClass(b._options.focusClass);
        }), window.attachEvent && a.setAttribute("tabIndex", "-1"), a;
    }
}, qq.FineUploaderBasic = function(a) {
    this._options = {
        debug: !1,
        button: null,
        multiple: !0,
        maxConnections: 3,
        disableCancelForFormUploads: !1,
        autoUpload: !0,
        request: {
            endpoint: "/server/upload",
            params: {},
            paramsInBody: !1,
            customHeaders: {},
            forceMultipart: !0,
            inputName: "qqfile",
            uuidName: "qquuid",
            totalFileSizeName: "qqtotalfilesize"
        },
        validation: {
            allowedExtensions: [],
            sizeLimit: 0,
            minSizeLimit: 0,
            stopOnFirstInvalidFile: !0
        },
        callbacks: {
            onSubmit: function(a, b) {},
            onComplete: function(a, b, c) {},
            onCancel: function(a, b) {},
            onUpload: function(a, b) {},
            onUploadChunk: function(a, b, c) {},
            onResume: function(a, b, c) {},
            onProgress: function(a, b, c, d) {},
            onError: function(a, b, c) {},
            onAutoRetry: function(a, b, c) {},
            onManualRetry: function(a, b) {},
            onValidateBatch: function(a) {},
            onValidate: function(a) {}
        },
        messages: {
            typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
            sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
            minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
            emptyError: "{file} is empty, please select files again without it.",
            noFilesError: "No files to upload.",
            onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."
        },
        retry: {
            enableAuto: !1,
            maxAutoAttempts: 3,
            autoAttemptDelay: 5,
            preventRetryResponseProperty: "preventRetry"
        },
        classes: {
            buttonHover: "qq-upload-button-hover",
            buttonFocus: "qq-upload-button-focus"
        },
        chunking: {
            enabled: !1,
            partSize: 2e6,
            paramNames: {
                partIndex: "qqpartindex",
                partByteOffset: "qqpartbyteoffset",
                chunkSize: "qqchunksize",
                totalFileSize: "qqtotalfilesize",
                totalParts: "qqtotalparts",
                filename: "qqfilename"
            }
        },
        resume: {
            enabled: !1,
            id: null,
            cookiesExpireIn: 7,
            paramNames: {
                resuming: "qqresume"
            }
        },
        formatFileName: function(a) {
            return a.length > 33 && (a = a.slice(0, 19) + "..." + a.slice(-14)), a;
        },
        text: {
            sizeSymbols: [ "kB", "MB", "GB", "TB", "PB", "EB" ]
        }
    }, qq.extend(this._options, a, !0), this._wrapCallbacks(), this._disposeSupport = new qq.DisposeSupport(), 
    this._filesInProgress = [], this._storedFileIds = [], this._autoRetries = [], this._retryTimeouts = [], 
    this._preventRetries = [], this._paramsStore = this._createParamsStore(), this._endpointStore = this._createEndpointStore(), 
    this._handler = this._createUploadHandler(), this._options.button && (this._button = this._createUploadButton(this._options.button)), 
    this._preventLeaveInProgress();
}, qq.FineUploaderBasic.prototype = {
    log: function(a, b) {
        !this._options.debug || b && "info" !== b ? b && "info" !== b && qq.log("[FineUploader] " + a, b) : qq.log("[FineUploader] " + a);
    },
    setParams: function(a, b) {
        null == b ? this._options.request.params = a : this._paramsStore.setParams(a, b);
    },
    setEndpoint: function(a, b) {
        null == b ? this._options.request.endpoint = a : this._endpointStore.setEndpoint(a, b);
    },
    getInProgress: function() {
        return this._filesInProgress.length;
    },
    uploadStoredFiles: function() {
        "use strict";
        for (var a; this._storedFileIds.length; ) a = this._storedFileIds.shift(), this._filesInProgress.push(a), 
        this._handler.upload(a);
    },
    clearStoredFiles: function() {
        this._storedFileIds = [];
    },
    retry: function(a) {
        return this._onBeforeManualRetry(a) ? (this._handler.retry(a), !0) : !1;
    },
    cancel: function(a) {
        this._handler.cancel(a);
    },
    reset: function() {
        this.log("Resetting uploader..."), this._handler.reset(), this._filesInProgress = [], 
        this._storedFileIds = [], this._autoRetries = [], this._retryTimeouts = [], this._preventRetries = [], 
        this._button.reset(), this._paramsStore.reset(), this._endpointStore.reset();
    },
    addFiles: function(a) {
        var b, c, d = this, e = [];
        if (a) {
            for (window.FileList && a instanceof FileList || (a = [].concat(a)), b = 0; b < a.length; b += 1) c = a[b], 
            qq.isFileOrInput(c) ? e.push(c) : d.log(c + " is not a File or INPUT element!  Ignoring!", "warn");
            this.log("Processing " + e.length + " files or inputs..."), this._uploadFileList(e);
        }
    },
    getUuid: function(a) {
        return this._handler.getUuid(a);
    },
    getResumableFilesData: function() {
        return this._handler.getResumableFilesData();
    },
    getSize: function(a) {
        return this._handler.getSize(a);
    },
    getFile: function(a) {
        return this._handler.getFile(a);
    },
    _createUploadButton: function(a) {
        var b = this, c = new qq.UploadButton({
            element: a,
            multiple: this._options.multiple && qq.isXhrUploadSupported(),
            acceptFiles: this._options.validation.acceptFiles,
            onChange: function(a) {
                b._onInputChange(a);
            },
            hoverClass: this._options.classes.buttonHover,
            focusClass: this._options.classes.buttonFocus
        });
        return this._disposeSupport.addDisposer(function() {
            c.dispose();
        }), c;
    },
    _createUploadHandler: function() {
        var a = this;
        return new qq.UploadHandler({
            debug: this._options.debug,
            forceMultipart: this._options.request.forceMultipart,
            maxConnections: this._options.maxConnections,
            customHeaders: this._options.request.customHeaders,
            inputName: this._options.request.inputName,
            uuidParamName: this._options.request.uuidName,
            totalFileSizeParamName: this._options.request.totalFileSizeName,
            demoMode: this._options.demoMode,
            paramsInBody: this._options.request.paramsInBody,
            paramsStore: this._paramsStore,
            endpointStore: this._endpointStore,
            chunking: this._options.chunking,
            resume: this._options.resume,
            log: function(b, c) {
                a.log(b, c);
            },
            onProgress: function(b, c, d, e) {
                a._onProgress(b, c, d, e), a._options.callbacks.onProgress(b, c, d, e);
            },
            onComplete: function(b, c, d, e) {
                a._onComplete(b, c, d, e), a._options.callbacks.onComplete(b, c, d);
            },
            onCancel: function(b, c) {
                a._onCancel(b, c), a._options.callbacks.onCancel(b, c);
            },
            onUpload: function(b, c) {
                a._onUpload(b, c), a._options.callbacks.onUpload(b, c);
            },
            onUploadChunk: function(b, c, d) {
                a._options.callbacks.onUploadChunk(b, c, d);
            },
            onResume: function(b, c, d) {
                return a._options.callbacks.onResume(b, c, d);
            },
            onAutoRetry: function(b, c, d, e) {
                return a._preventRetries[b] = d[a._options.retry.preventRetryResponseProperty], 
                a._shouldAutoRetry(b, c, d) ? (a._maybeParseAndSendUploadError(b, c, d, e), a._options.callbacks.onAutoRetry(b, c, a._autoRetries[b] + 1), 
                a._onBeforeAutoRetry(b, c), a._retryTimeouts[b] = setTimeout(function() {
                    a._onAutoRetry(b, c, d);
                }, 1e3 * a._options.retry.autoAttemptDelay), !0) : !1;
            }
        });
    },
    _preventLeaveInProgress: function() {
        var a = this;
        this._disposeSupport.attach(window, "beforeunload", function(b) {
            if (a._filesInProgress.length) {
                var b = b || window.event;
                return b.returnValue = a._options.messages.onLeave, a._options.messages.onLeave;
            }
        });
    },
    _onSubmit: function(a, b) {
        this._options.autoUpload && this._filesInProgress.push(a);
    },
    _onProgress: function(a, b, c, d) {},
    _onComplete: function(a, b, c, d) {
        this._removeFromFilesInProgress(a), this._maybeParseAndSendUploadError(a, b, c, d);
    },
    _onCancel: function(a, b) {
        this._removeFromFilesInProgress(a), clearTimeout(this._retryTimeouts[a]);
        var c = qq.indexOf(this._storedFileIds, a);
        !this._options.autoUpload && c >= 0 && this._storedFileIds.splice(c, 1);
    },
    _removeFromFilesInProgress: function(a) {
        var b = qq.indexOf(this._filesInProgress, a);
        b >= 0 && this._filesInProgress.splice(b, 1);
    },
    _onUpload: function(a, b) {},
    _onInputChange: function(a) {
        qq.isXhrUploadSupported() ? this.addFiles(a.files) : this.addFiles(a), this._button.reset();
    },
    _onBeforeAutoRetry: function(a, b) {
        this.log("Waiting " + this._options.retry.autoAttemptDelay + " seconds before retrying " + b + "...");
    },
    _onAutoRetry: function(a, b, c) {
        this.log("Retrying " + b + "..."), this._autoRetries[a]++, this._handler.retry(a);
    },
    _shouldAutoRetry: function(a, b, c) {
        return !this._preventRetries[a] && this._options.retry.enableAuto ? (void 0 === this._autoRetries[a] && (this._autoRetries[a] = 0), 
        this._autoRetries[a] < this._options.retry.maxAutoAttempts) : !1;
    },
    _onBeforeManualRetry: function(a) {
        if (this._preventRetries[a]) return this.log("Retries are forbidden for id " + a, "warn"), 
        !1;
        if (this._handler.isValid(a)) {
            var b = this._handler.getName(a);
            return this._options.callbacks.onManualRetry(a, b) === !1 ? !1 : (this.log("Retrying upload for '" + b + "' (id: " + a + ")..."), 
            this._filesInProgress.push(a), !0);
        }
        return this.log("'" + a + "' is not a valid file ID", "error"), !1;
    },
    _maybeParseAndSendUploadError: function(a, b, c, d) {
        if (!c.success) if (d && 200 !== d.status && !c.error) this._options.callbacks.onError(a, b, "XHR returned response code " + d.status); else {
            var e = c.error ? c.error : "Upload failure reason unknown";
            this._options.callbacks.onError(a, b, e);
        }
    },
    _uploadFileList: function(a) {
        var b, c, d;
        if (b = this._getValidationDescriptors(a), d = this._options.callbacks.onValidateBatch(b) === !1, 
        !d) if (a.length > 0) {
            for (c = 0; c < a.length; c++) if (this._validateFile(a[c])) this._uploadFile(a[c]); else if (this._options.validation.stopOnFirstInvalidFile) return;
        } else this._error("noFilesError", "");
    },
    _uploadFile: function(a) {
        var b = this._handler.add(a), c = this._handler.getName(b);
        this._options.callbacks.onSubmit(b, c) !== !1 && (this._onSubmit(b, c), this._options.autoUpload ? this._handler.upload(b) : this._storeFileForLater(b));
    },
    _storeFileForLater: function(a) {
        this._storedFileIds.push(a);
    },
    _validateFile: function(a) {
        var b, c, d;
        return b = this._getValidationDescriptor(a), c = b.name, d = b.size, this._options.callbacks.onValidate(b) === !1 ? !1 : this._isAllowedExtension(c) ? 0 === d ? (this._error("emptyError", c), 
        !1) : d && this._options.validation.sizeLimit && d > this._options.validation.sizeLimit ? (this._error("sizeError", c), 
        !1) : d && d < this._options.validation.minSizeLimit ? (this._error("minSizeError", c), 
        !1) : !0 : (this._error("typeError", c), !1);
    },
    _error: function(a, b) {
        function c(a, b) {
            d = d.replace(a, b);
        }
        var d = this._options.messages[a], e = this._options.validation.allowedExtensions.join(", ").toLowerCase();
        return c("{file}", this._options.formatFileName(b)), c("{extensions}", e), c("{sizeLimit}", this._formatSize(this._options.validation.sizeLimit)), 
        c("{minSizeLimit}", this._formatSize(this._options.validation.minSizeLimit)), this._options.callbacks.onError(null, b, d), 
        d;
    },
    _isAllowedExtension: function(a) {
        var b = this._options.validation.allowedExtensions, c = !1;
        return b.length ? (qq.each(b, function(b, d) {
            var e = new RegExp("\\." + d + "$", "i");
            return null != a.match(e) ? (c = !0, !1) : void 0;
        }), c) : !0;
    },
    _formatSize: function(a) {
        var b = -1;
        do a /= 1024, b++; while (a > 99);
        return Math.max(a, .1).toFixed(1) + this._options.text.sizeSymbols[b];
    },
    _wrapCallbacks: function() {
        var a, b;
        a = this, b = function(b, c, d) {
            try {
                return c.apply(a, d);
            } catch (e) {
                a.log("Caught exception in '" + b + "' callback - " + e.message, "error");
            }
        };
        for (var c in this._options.callbacks) !function() {
            var d, e;
            d = c, e = a._options.callbacks[d], a._options.callbacks[d] = function() {
                return b(d, e, arguments);
            };
        }();
    },
    _parseFileName: function(a) {
        var b;
        return b = a.value ? a.value.replace(/.*(\/|\\)/, "") : null !== a.fileName && void 0 !== a.fileName ? a.fileName : a.name;
    },
    _parseFileSize: function(a) {
        var b;
        return a.value || (b = null !== a.fileSize && void 0 !== a.fileSize ? a.fileSize : a.size), 
        b;
    },
    _getValidationDescriptor: function(a) {
        var b, c, d;
        return d = {}, b = this._parseFileName(a), c = this._parseFileSize(a), d.name = b, 
        c && (d.size = c), d;
    },
    _getValidationDescriptors: function(a) {
        var b = this, c = [];
        return qq.each(a, function(a, d) {
            c.push(b._getValidationDescriptor(d));
        }), c;
    },
    _createParamsStore: function() {
        var a = {}, b = this;
        return {
            setParams: function(b, c) {
                var d = {};
                qq.extend(d, b), a[c] = d;
            },
            getParams: function(c) {
                var d = {};
                return null != c && a[c] ? qq.extend(d, a[c]) : qq.extend(d, b._options.request.params), 
                d;
            },
            remove: function(b) {
                return delete a[b];
            },
            reset: function() {
                a = {};
            }
        };
    },
    _createEndpointStore: function() {
        var a = {}, b = this;
        return {
            setEndpoint: function(b, c) {
                a[c] = b;
            },
            getEndpoint: function(c) {
                return null != c && a[c] ? a[c] : b._options.request.endpoint;
            },
            remove: function(b) {
                return delete a[b];
            },
            reset: function() {
                a = {};
            }
        };
    }
}, qq.DragAndDrop = function(a) {
    "use strict";
    function b() {
        m !== n || k || (i.callbacks.log("Grabbed " + l.length + " files after tree traversal."), 
        j.dropDisabled(!1), i.callbacks.dropProcessing(!1, l));
    }
    function c(a) {
        l.push(a), n += 1, b();
    }
    function d(a) {
        var e, f;
        m += 1, a.isFile ? a.file(function(a) {
            c(a);
        }) : a.isDirectory && (k = !0, e = a.createReader(), e.readEntries(function(a) {
            for (n += 1, f = 0; f < a.length; f += 1) d(a[f]);
            k = !1, a.length || b();
        }));
    }
    function e(a) {
        var c, e, f;
        if (i.callbacks.dropProcessing(!0), j.dropDisabled(!0), a.files.length > 1 && !i.multiple) i.callbacks.dropProcessing(!1), 
        i.callbacks.error("tooManyFilesError", ""), j.dropDisabled(!1); else if (l = [], 
        m = 0, n = 0, qq.isFolderDropSupported(a)) for (e = a.items, c = 0; c < e.length; c += 1) f = e[c].webkitGetAsEntry(), 
        f && (f.isFile ? (l.push(e[c].getAsFile()), c === e.length - 1 && b()) : d(f)); else i.callbacks.dropProcessing(!1, a.files), 
        j.dropDisabled(!1);
    }
    function f(a) {
        j = new qq.UploadDropZone({
            element: a,
            onEnter: function(b) {
                qq(a).addClass(i.classes.dropActive), b.stopPropagation();
            },
            onLeaveNotDescendants: function(b) {
                qq(a).removeClass(i.classes.dropActive);
            },
            onDrop: function(b) {
                i.hideDropzones && qq(a).hide(), qq(a).removeClass(i.classes.dropActive), e(b.dataTransfer);
            }
        }), o.addDisposer(function() {
            j.dispose();
        }), i.hideDropzones && qq(a).hide();
    }
    function g(a) {
        var b;
        return qq.each(a.dataTransfer.types, function(a, c) {
            return "Files" === c ? (b = !0, !1) : void 0;
        }), b;
    }
    function h() {
        i.dropArea && i.extraDropzones.push(i.dropArea);
        var a, b = i.extraDropzones;
        for (a = 0; a < b.length; a += 1) f(b[a]);
        !i.dropArea || qq.ie() && !qq.ie10() || o.attach(document, "dragenter", function(c) {
            if (!j.dropDisabled() && g(c)) {
                if (qq(i.dropArea).hasClass(i.classes.dropDisabled)) return;
                for (i.dropArea.style.display = "block", a = 0; a < b.length; a += 1) b[a].style.display = "block";
            }
        }), o.attach(document, "dragleave", function(c) {
            if (i.hideDropzones && qq.FineUploader.prototype._leaving_document_out(c)) for (a = 0; a < b.length; a += 1) qq(b[a]).hide();
        }), o.attach(document, "drop", function(c) {
            if (i.hideDropzones) for (a = 0; a < b.length; a += 1) qq(b[a]).hide();
            c.preventDefault();
        });
    }
    var i, j, k, l = [], m = 0, n = 0, o = new qq.DisposeSupport();
    return i = {
        dropArea: null,
        extraDropzones: [],
        hideDropzones: !0,
        multiple: !0,
        classes: {
            dropActive: null
        },
        callbacks: {
            dropProcessing: function(a, b) {},
            error: function(a, b) {},
            log: function(a, b) {}
        }
    }, qq.extend(i, a), {
        setup: function() {
            h();
        },
        setupExtraDropzone: function(a) {
            i.extraDropzones.push(a), f(a);
        },
        removeExtraDropzone: function(a) {
            var b, c = i.extraDropzones;
            for (b in c) if (c[b] === a) return c.splice(b, 1);
        },
        dispose: function() {
            o.dispose(), j.dispose();
        }
    };
}, qq.UploadDropZone = function(a) {
    "use strict";
    function b() {
        return qq.safari() || qq.firefox() && qq.windows();
    }
    function c(a) {
        j || (b ? k.attach(document, "dragover", function(a) {
            a.preventDefault();
        }) : k.attach(document, "dragover", function(a) {
            a.dataTransfer && (a.dataTransfer.dropEffect = "none", a.preventDefault());
        }), j = !0);
    }
    function d(a) {
        if (qq.ie() && !qq.ie10()) return !1;
        var b, c = a.dataTransfer, d = qq.safari();
        return b = qq.ie10() ? !0 : "none" !== c.effectAllowed, c && b && (c.files || !d && c.types.contains && c.types.contains("Files"));
    }
    function e(a) {
        return void 0 !== a && (i = a), i;
    }
    function f() {
        k.attach(h, "dragover", function(a) {
            if (d(a)) {
                var b = qq.ie() ? null : a.dataTransfer.effectAllowed;
                "move" === b || "linkMove" === b ? a.dataTransfer.dropEffect = "move" : a.dataTransfer.dropEffect = "copy", 
                a.stopPropagation(), a.preventDefault();
            }
        }), k.attach(h, "dragenter", function(a) {
            if (!e()) {
                if (!d(a)) return;
                g.onEnter(a);
            }
        }), k.attach(h, "dragleave", function(a) {
            if (d(a)) {
                g.onLeave(a);
                var b = document.elementFromPoint(a.clientX, a.clientY);
                qq(this).contains(b) || g.onLeaveNotDescendants(a);
            }
        }), k.attach(h, "drop", function(a) {
            if (!e()) {
                if (!d(a)) return;
                a.preventDefault(), g.onDrop(a);
            }
        });
    }
    var g, h, i, j, k = new qq.DisposeSupport();
    return g = {
        element: null,
        onEnter: function(a) {},
        onLeave: function(a) {},
        onLeaveNotDescendants: function(a) {},
        onDrop: function(a) {}
    }, qq.extend(g, a), h = g.element, c(), f(), {
        dropDisabled: function(a) {
            return e(a);
        },
        dispose: function() {
            k.dispose();
        }
    };
}, qq.FineUploader = function(a) {
    qq.FineUploaderBasic.apply(this, arguments), qq.extend(this._options, {
        element: null,
        listElement: null,
        dragAndDrop: {
            extraDropzones: [],
            hideDropzones: !0,
            disableDefaultDropzone: !1
        },
        text: {
            uploadButton: "Upload a file",
            cancelButton: "Cancel",
            retryButton: "Retry",
            failUpload: "Upload failed",
            dragZone: "Drop files here to upload",
            dropProcessing: "Processing dropped files...",
            formatProgress: "{percent}% of {total_size}",
            waitingForResponse: "Processing..."
        },
        template: '<div class="qq-uploader">' + (this._options.dragAndDrop && this._options.dragAndDrop.disableDefaultDropzone ? "" : '<div class="qq-upload-drop-area"><span>{dragZoneText}</span></div>') + (this._options.button ? "" : '<div class="qq-upload-button"><div>{uploadButtonText}</div></div>') + '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' + (this._options.listElement ? "" : '<ul class="qq-upload-list"></ul>') + "</div>",
        fileTemplate: '<li><div class="qq-progress-bar"></div><span class="qq-upload-spinner"></span><span class="qq-upload-finished"></span><span class="qq-upload-file"></span><span class="qq-upload-size"></span><a class="qq-upload-cancel" href="#">{cancelButtonText}</a><a class="qq-upload-retry" href="#">{retryButtonText}</a><span class="qq-upload-status-text">{statusText}</span></li>',
        classes: {
            button: "qq-upload-button",
            drop: "qq-upload-drop-area",
            dropActive: "qq-upload-drop-area-active",
            dropDisabled: "qq-upload-drop-area-disabled",
            list: "qq-upload-list",
            progressBar: "qq-progress-bar",
            file: "qq-upload-file",
            spinner: "qq-upload-spinner",
            finished: "qq-upload-finished",
            retrying: "qq-upload-retrying",
            retryable: "qq-upload-retryable",
            size: "qq-upload-size",
            cancel: "qq-upload-cancel",
            retry: "qq-upload-retry",
            statusText: "qq-upload-status-text",
            success: "qq-upload-success",
            fail: "qq-upload-fail",
            successIcon: null,
            failIcon: null,
            dropProcessing: "qq-drop-processing",
            dropProcessingSpinner: "qq-drop-processing-spinner"
        },
        failedUploadTextDisplay: {
            mode: "default",
            maxChars: 50,
            responseProperty: "error",
            enableTooltip: !0
        },
        messages: {
            tooManyFilesError: "You may only drop one file"
        },
        retry: {
            showAutoRetryNote: !0,
            autoRetryNote: "Retrying {retryNum}/{maxAuto}...",
            showButton: !1
        },
        showMessage: function(a) {
            setTimeout(function() {
                alert(a);
            }, 0);
        }
    }, !0), qq.extend(this._options, a, !0), this._wrapCallbacks(), this._options.template = this._options.template.replace(/\{dragZoneText\}/g, this._options.text.dragZone), 
    this._options.template = this._options.template.replace(/\{uploadButtonText\}/g, this._options.text.uploadButton), 
    this._options.template = this._options.template.replace(/\{dropProcessingText\}/g, this._options.text.dropProcessing), 
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{cancelButtonText\}/g, this._options.text.cancelButton), 
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{retryButtonText\}/g, this._options.text.retryButton), 
    this._options.fileTemplate = this._options.fileTemplate.replace(/\{statusText\}/g, ""), 
    this._element = this._options.element, this._element.innerHTML = this._options.template, 
    this._listElement = this._options.listElement || this._find(this._element, "list"), 
    this._classes = this._options.classes, this._button || (this._button = this._createUploadButton(this._find(this._element, "button"))), 
    this._bindCancelAndRetryEvents(), this._dnd = this._setupDragAndDrop();
}, qq.extend(qq.FineUploader.prototype, qq.FineUploaderBasic.prototype), qq.extend(qq.FineUploader.prototype, {
    clearStoredFiles: function() {
        qq.FineUploaderBasic.prototype.clearStoredFiles.apply(this, arguments), this._listElement.innerHTML = "";
    },
    addExtraDropzone: function(a) {
        this._dnd.setupExtraDropzone(a);
    },
    removeExtraDropzone: function(a) {
        return this._dnd.removeExtraDropzone(a);
    },
    getItemByFileId: function(a) {
        for (var b = this._listElement.firstChild; b; ) {
            if (b.qqFileId == a) return b;
            b = b.nextSibling;
        }
    },
    cancel: function(a) {
        qq.FineUploaderBasic.prototype.cancel.apply(this, arguments);
        var b = this.getItemByFileId(a);
        qq(b).remove();
    },
    reset: function() {
        qq.FineUploaderBasic.prototype.reset.apply(this, arguments), this._element.innerHTML = this._options.template, 
        this._listElement = this._options.listElement || this._find(this._element, "list"), 
        this._options.button || (this._button = this._createUploadButton(this._find(this._element, "button"))), 
        this._bindCancelAndRetryEvents(), this._dnd.dispose(), this._dnd = this._setupDragAndDrop();
    },
    _setupDragAndDrop: function() {
        var a, b, c, d = this, e = this._find(this._element, "dropProcessing");
        return b = function(a) {
            a.preventDefault();
        }, this._options.dragAndDrop.disableDefaultDropzone || (c = this._find(this._options.element, "drop")), 
        a = new qq.DragAndDrop({
            dropArea: c,
            extraDropzones: this._options.dragAndDrop.extraDropzones,
            hideDropzones: this._options.dragAndDrop.hideDropzones,
            multiple: this._options.multiple,
            classes: {
                dropActive: this._options.classes.dropActive
            },
            callbacks: {
                dropProcessing: function(a, c) {
                    var f = d._button.getInput();
                    a ? (qq(e).css({
                        display: "block"
                    }), qq(f).attach("click", b)) : (qq(e).hide(), qq(f).detach("click", b)), c && d.addFiles(c);
                },
                error: function(a, b) {
                    d._error(a, b);
                },
                log: function(a, b) {
                    d.log(a, b);
                }
            }
        }), a.setup(), a;
    },
    _leaving_document_out: function(a) {
        return (qq.chrome() || qq.safari() && qq.windows()) && 0 == a.clientX && 0 == a.clientY || qq.firefox() && !a.relatedTarget;
    },
    _storeFileForLater: function(a) {
        qq.FineUploaderBasic.prototype._storeFileForLater.apply(this, arguments);
        var b = this.getItemByFileId(a);
        qq(this._find(b, "spinner")).hide();
    },
    _find: function(a, b) {
        var c = qq(a).getByClass(this._options.classes[b])[0];
        if (!c) throw new Error("element not found " + b);
        return c;
    },
    _onSubmit: function(a, b) {
        qq.FineUploaderBasic.prototype._onSubmit.apply(this, arguments), this._addToList(a, b);
    },
    _onProgress: function(a, b, c, d) {
        qq.FineUploaderBasic.prototype._onProgress.apply(this, arguments);
        var e, f, g, h, i, j;
        e = this.getItemByFileId(a), f = this._find(e, "progressBar"), h = Math.round(c / d * 100), 
        c === d ? (i = this._find(e, "cancel"), qq(i).hide(), qq(f).hide(), qq(this._find(e, "statusText")).setText(this._options.text.waitingForResponse), 
        g = this._formatSize(d)) : (g = this._formatProgress(c, d), qq(f).css({
            display: "block"
        })), qq(f).css({
            width: h + "%"
        }), j = this._find(e, "size"), qq(j).css({
            display: "inline"
        }), qq(j).setText(g);
    },
    _onComplete: function(a, b, c, d) {
        qq.FineUploaderBasic.prototype._onComplete.apply(this, arguments);
        var e = this.getItemByFileId(a);
        qq(this._find(e, "statusText")).clearText(), qq(e).removeClass(this._classes.retrying), 
        qq(this._find(e, "progressBar")).hide(), (!this._options.disableCancelForFormUploads || qq.isXhrUploadSupported()) && qq(this._find(e, "cancel")).hide(), 
        qq(this._find(e, "spinner")).hide(), c.success ? (qq(e).addClass(this._classes.success), 
        this._classes.successIcon && (this._find(e, "finished").style.display = "inline-block", 
        qq(e).addClass(this._classes.successIcon))) : (qq(e).addClass(this._classes.fail), 
        this._classes.failIcon && (this._find(e, "finished").style.display = "inline-block", 
        qq(e).addClass(this._classes.failIcon)), this._options.retry.showButton && !this._preventRetries[a] && qq(e).addClass(this._classes.retryable), 
        this._controlFailureTextDisplay(e, c));
    },
    _onUpload: function(a, b) {
        qq.FineUploaderBasic.prototype._onUpload.apply(this, arguments);
        var c = this.getItemByFileId(a);
        this._showSpinner(c);
    },
    _onBeforeAutoRetry: function(a) {
        var b, c, d, e, f, g;
        qq.FineUploaderBasic.prototype._onBeforeAutoRetry.apply(this, arguments), b = this.getItemByFileId(a), 
        c = this._find(b, "progressBar"), this._showCancelLink(b), c.style.width = 0, qq(c).hide(), 
        this._options.retry.showAutoRetryNote && (d = this._find(b, "statusText"), e = this._autoRetries[a] + 1, 
        f = this._options.retry.maxAutoAttempts, g = this._options.retry.autoRetryNote.replace(/\{retryNum\}/g, e), 
        g = g.replace(/\{maxAuto\}/g, f), qq(d).setText(g), 1 === e && qq(b).addClass(this._classes.retrying));
    },
    _onBeforeManualRetry: function(a) {
        if (qq.FineUploaderBasic.prototype._onBeforeManualRetry.apply(this, arguments)) {
            var b = this.getItemByFileId(a);
            return this._find(b, "progressBar").style.width = 0, qq(b).removeClass(this._classes.fail), 
            qq(this._find(b, "statusText")).clearText(), this._showSpinner(b), this._showCancelLink(b), 
            !0;
        }
        return !1;
    },
    _addToList: function(a, b) {
        var c = qq.toElement(this._options.fileTemplate);
        if (this._options.disableCancelForFormUploads && !qq.isXhrUploadSupported()) {
            var d = this._find(c, "cancel");
            qq(d).remove();
        }
        c.qqFileId = a;
        var e = this._find(c, "file");
        qq(e).setText(this._options.formatFileName(b)), qq(this._find(c, "size")).hide(), 
        this._options.multiple || this._clearList(), this._listElement.appendChild(c);
    },
    _clearList: function() {
        this._listElement.innerHTML = "", this.clearStoredFiles();
    },
    _bindCancelAndRetryEvents: function() {
        var a = this, b = this._listElement;
        this._disposeSupport.attach(b, "click", function(b) {
            b = b || window.event;
            var c = b.target || b.srcElement;
            if (qq(c).hasClass(a._classes.cancel) || qq(c).hasClass(a._classes.retry)) {
                qq.preventDefault(b);
                for (var d = c.parentNode; void 0 == d.qqFileId; ) d = c = c.parentNode;
                qq(c).hasClass(a._classes.cancel) ? a.cancel(d.qqFileId) : (qq(d).removeClass(a._classes.retryable), 
                a.retry(d.qqFileId));
            }
        });
    },
    _formatProgress: function(a, b) {
        function c(a, b) {
            d = d.replace(a, b);
        }
        var d = this._options.text.formatProgress;
        return c("{percent}", Math.round(a / b * 100)), c("{total_size}", this._formatSize(b)), 
        d;
    },
    _controlFailureTextDisplay: function(a, b) {
        var c, d, e, f, g;
        c = this._options.failedUploadTextDisplay.mode, d = this._options.failedUploadTextDisplay.maxChars, 
        e = this._options.failedUploadTextDisplay.responseProperty, "custom" === c ? (f = b[e], 
        f ? f.length > d && (g = f.substring(0, d) + "...") : (f = this._options.text.failUpload, 
        this.log("'" + e + "' is not a valid property on the server response.", "warn")), 
        qq(this._find(a, "statusText")).setText(g || f), this._options.failedUploadTextDisplay.enableTooltip && this._showTooltip(a, f)) : "default" === c ? qq(this._find(a, "statusText")).setText(this._options.text.failUpload) : "none" !== c && this.log("failedUploadTextDisplay.mode value of '" + c + "' is not valid", "warn");
    },
    _showTooltip: function(a, b) {
        a.title = b;
    },
    _showSpinner: function(a) {
        var b = this._find(a, "spinner");
        b.style.display = "inline-block";
    },
    _showCancelLink: function(a) {
        if (!this._options.disableCancelForFormUploads || qq.isXhrUploadSupported()) {
            var b = this._find(a, "cancel");
            b.style.display = "inline";
        }
    },
    _error: function(a, b) {
        var c = qq.FineUploaderBasic.prototype._error.apply(this, arguments);
        this._options.showMessage(c);
    }
}), qq.UploadHandler = function(a) {
    "use strict";
    var b, c, d, e, f = [];
    return b = {
        debug: !1,
        forceMultipart: !0,
        paramsInBody: !1,
        paramsStore: {},
        endpointStore: {},
        maxConnections: 3,
        uuidParamName: "qquuid",
        totalFileSizeParamName: "qqtotalfilesize",
        chunking: {
            enabled: !1,
            partSize: 2e6,
            paramNames: {
                partIndex: "qqpartindex",
                partByteOffset: "qqpartbyteoffset",
                chunkSize: "qqchunksize",
                totalParts: "qqtotalparts",
                filename: "qqfilename"
            }
        },
        resume: {
            enabled: !1,
            id: null,
            cookiesExpireIn: 7,
            paramNames: {
                resuming: "qqresume"
            }
        },
        log: function(a, b) {},
        onProgress: function(a, b, c, d) {},
        onComplete: function(a, b, c, d) {},
        onCancel: function(a, b) {},
        onUpload: function(a, b) {},
        onUploadChunk: function(a, b, c) {},
        onAutoRetry: function(a, b, c, d) {},
        onResume: function(a, b, c) {}
    }, qq.extend(b, a), c = b.log, d = function(a) {
        var c, d = qq.indexOf(f, a), g = b.maxConnections;
        f.splice(d, 1), f.length >= g && g > d && (c = f[g - 1], e.upload(c));
    }, e = qq.isXhrUploadSupported() ? new qq.UploadHandlerXhr(b, d, c) : new qq.UploadHandlerForm(b, d, c), 
    {
        add: function(a) {
            return e.add(a);
        },
        upload: function(a) {
            var c = f.push(a);
            return c <= b.maxConnections ? e.upload(a) : void 0;
        },
        retry: function(a) {
            var b = qq.indexOf(f, a);
            return b >= 0 ? e.upload(a, !0) : this.upload(a);
        },
        cancel: function(a) {
            c("Cancelling " + a), b.paramsStore.remove(a), e.cancel(a), d(a);
        },
        cancelAll: function() {
            qq.each(f, function(a, b) {
                this.cancel(b);
            }), f = [];
        },
        getName: function(a) {
            return e.getName(a);
        },
        getSize: function(a) {
            return e.getSize ? e.getSize(a) : void 0;
        },
        getFile: function(a) {
            return e.getFile ? e.getFile(a) : void 0;
        },
        getQueue: function() {
            return f;
        },
        reset: function() {
            c("Resetting upload handler"), f = [], e.reset();
        },
        getUuid: function(a) {
            return e.getUuid(a);
        },
        isValid: function(a) {
            return e.isValid(a);
        },
        getResumableFilesData: function() {
            return e.getResumableFilesData ? e.getResumableFilesData() : [];
        }
    };
}, qq.UploadHandlerForm = function(o, uploadCompleteCallback, logCallback) {
    "use strict";
    function attachLoadEvent(a, b) {
        detachLoadEvents[a.id] = qq(a).attach("load", function() {
            if (log("Received response for " + a.id), a.parentNode) {
                try {
                    if (a.contentDocument && a.contentDocument.body && "false" == a.contentDocument.body.innerHTML) return;
                } catch (c) {
                    log("Error when attempting to access iframe during handling of upload response (" + c + ")", "error");
                }
                b();
            }
        });
    }
    function getIframeContentJson(iframe) {
        var response;
        try {
            var doc = iframe.contentDocument || iframe.contentWindow.document, innerHTML = doc.body.innerHTML;
            log("converting iframe's innerHTML to JSON"), log("innerHTML = " + innerHTML), innerHTML && innerHTML.match(/^<pre/i) && (innerHTML = doc.body.firstChild.firstChild.nodeValue), 
            response = eval("(" + innerHTML + ")");
        } catch (error) {
            log("Error when attempting to parse form upload response (" + error + ")", "error"), 
            response = {
                success: !1
            };
        }
        return response;
    }
    function createIframe(a) {
        var b = qq.toElement('<iframe src="javascript:false;" name="' + a + '" />');
        return b.setAttribute("id", a), b.style.display = "none", document.body.appendChild(b), 
        b;
    }
    function createForm(a, b) {
        var c = options.paramsStore.getParams(a), d = options.demoMode ? "GET" : "POST", e = qq.toElement('<form method="' + d + '" enctype="multipart/form-data"></form>'), f = options.endpointStore.getEndpoint(a), g = f;
        return c[options.uuidParamName] = uuids[a], options.paramsInBody ? qq.obj2Inputs(c, e) : g = qq.obj2url(c, f), 
        e.setAttribute("action", g), e.setAttribute("target", b.name), e.style.display = "none", 
        document.body.appendChild(e), e;
    }
    var options = o, inputs = [], uuids = [], detachLoadEvents = {}, uploadComplete = uploadCompleteCallback, log = logCallback, api;
    return api = {
        add: function(a) {
            a.setAttribute("name", options.inputName);
            var b = inputs.push(a) - 1;
            return uuids[b] = qq.getUniqueId(), a.parentNode && qq(a).remove(), b;
        },
        getName: function(a) {
            return inputs[a].value.replace(/.*(\/|\\)/, "");
        },
        isValid: function(a) {
            return void 0 !== inputs[a];
        },
        reset: function() {
            qq.UploadHandler.prototype.reset.apply(this, arguments), inputs = [], uuids = [], 
            detachLoadEvents = {};
        },
        getUuid: function(a) {
            return uuids[a];
        },
        cancel: function(a) {
            options.onCancel(a, this.getName(a)), delete inputs[a], delete uuids[a], delete detachLoadEvents[a];
            var b = document.getElementById(a);
            b && (b.setAttribute("src", "java" + String.fromCharCode(115) + "cript:false;"), 
            qq(b).remove());
        },
        upload: function(a) {
            var b = inputs[a], c = api.getName(a), d = createIframe(a), e = createForm(a, d);
            if (!b) throw new Error("file with passed id was not added, or already uploaded or cancelled");
            return options.onUpload(a, this.getName(a)), e.appendChild(b), attachLoadEvent(d, function() {
                log("iframe loaded");
                var b = getIframeContentJson(d);
                setTimeout(function() {
                    detachLoadEvents[a](), delete detachLoadEvents[a], qq(d).remove();
                }, 1), (b.success || !options.onAutoRetry(a, c, b)) && (options.onComplete(a, c, b), 
                uploadComplete(a));
            }), log("Sending upload request for " + a), e.submit(), qq(e).remove(), a;
        }
    };
}, qq.UploadHandlerXhr = function(a, b, c) {
    "use strict";
    function d(a, b, c) {
        var d = D.getSize(a), e = D.getName(a);
        b[E.chunking.paramNames.partIndex] = c.part, b[E.chunking.paramNames.partByteOffset] = c.start, 
        b[E.chunking.paramNames.chunkSize] = c.end - c.start, b[E.chunking.paramNames.totalParts] = c.count, 
        b[E.totalFileSizeParamName] = d, M && (b[E.chunking.paramNames.filename] = e);
    }
    function e(a) {
        a[E.resume.paramNames.resuming] = !0;
    }
    function f(a, b, c) {
        return a.slice ? a.slice(b, c) : a.mozSlice ? a.mozSlice(b, c) : a.webkitSlice ? a.webkitSlice(b, c) : void 0;
    }
    function g(a, b) {
        var c = E.chunking.partSize, d = D.getSize(a), e = H[a].file, g = c * b, i = g + c >= d ? d : g + c, j = h(a);
        return {
            part: b,
            start: g,
            end: i,
            count: j,
            blob: f(e, g, i)
        };
    }
    function h(a) {
        var b = D.getSize(a), c = E.chunking.partSize;
        return Math.ceil(b / c);
    }
    function i(a) {
        return H[a].xhr = new XMLHttpRequest(), H[a].xhr;
    }
    function j(a, b, c, d) {
        var e = new FormData(), f = E.demoMode ? "GET" : "POST", g = E.endpointStore.getEndpoint(d), h = g, i = D.getName(d), j = D.getSize(d);
        return a[E.uuidParamName] = H[d].uuid, M && (a[E.totalFileSizeParamName] = j), E.paramsInBody || (a[E.inputName] = i, 
        h = qq.obj2url(a, g)), b.open(f, h, !0), M ? (E.paramsInBody && qq.obj2FormData(a, e), 
        e.append(E.inputName, c), e) : c;
    }
    function k(a, b) {
        var c = E.customHeaders, d = (D.getName(a), H[a].file);
        b.setRequestHeader("X-Requested-With", "XMLHttpRequest"), b.setRequestHeader("Cache-Control", "no-cache"), 
        M || (b.setRequestHeader("Content-Type", "application/octet-stream"), b.setRequestHeader("X-Mime-Type", d.type)), 
        qq.each(c, function(a, c) {
            b.setRequestHeader(a, c);
        });
    }
    function l(a, b, c) {
        var d = D.getName(a), e = D.getSize(a);
        H[a].attemptingResume = !1, E.onProgress(a, d, e, e), E.onComplete(a, d, b, c), 
        delete H[a].xhr, F(a);
    }
    function m(a) {
        var b, c, f = g(a, H[a].remainingChunkIdxs[0]), h = i(a), l = D.getSize(a), m = D.getName(a);
        void 0 === H[a].loaded && (H[a].loaded = 0), w(a, f), h.onreadystatechange = v(a, h), 
        h.upload.onprogress = function(b) {
            if (b.lengthComputable && H[a].loaded < l) {
                var c = b.loaded + H[a].loaded;
                E.onProgress(a, m, c, l);
            }
        }, E.onUploadChunk(a, m, u(f)), c = E.paramsStore.getParams(a), d(a, c, f), H[a].attemptingResume && e(c), 
        b = j(c, h, f.blob, a), k(a, h), G("Sending chunked upload request for " + a + ": bytes " + (f.start + 1) + "-" + f.end + " of " + l), 
        h.send(b);
    }
    function n(a, b, c) {
        var d = H[a].remainingChunkIdxs.shift(), e = g(a, d);
        H[a].attemptingResume = !1, H[a].loaded += e.end - e.start, H[a].remainingChunkIdxs.length > 0 ? m(a) : (x(a), 
        l(a, b, c));
    }
    function o(a, b) {
        return 200 !== a.status || !b.success || b.reset;
    }
    function p(a) {
        var b;
        try {
            b = qq.parseJson(a.responseText);
        } catch (c) {
            G("Error when attempting to parse xhr response text (" + c + ")", "error"), b = {};
        }
        return b;
    }
    function q(a) {
        G("Server has ordered chunking effort to be restarted on next attempt for file ID " + a, "error"), 
        K && x(a), H[a].remainingChunkIdxs = [], delete H[a].loaded;
    }
    function r(a) {
        H[a].attemptingResume = !1, G("Server has declared that it cannot handle resume for file ID " + a + " - starting from the first chunk", "error"), 
        D.upload(a, !0);
    }
    function s(a, b, c) {
        var d = D.getName(a);
        E.onAutoRetry(a, d, b, c) || l(a, b, c);
    }
    function t(a, b) {
        var c;
        H[a] && (G("xhr - server response received for " + a), G("responseText = " + b.responseText), 
        c = p(b), o(b, c) ? (c.reset && q(a), H[a].attemptingResume && c.reset ? r(a) : s(a, c, b)) : J ? n(a, c, b) : l(a, c, b));
    }
    function u(a) {
        return {
            partIndex: a.part,
            startByte: a.start + 1,
            endByte: a.end,
            totalParts: a.count
        };
    }
    function v(a, b) {
        return function() {
            4 === b.readyState && t(a, b);
        };
    }
    function w(a, b) {
        var c = D.getUuid(a), d = z(a), e = c + I + b.part, f = E.resume.cookiesExpireIn;
        qq.setCookie(d, e, f);
    }
    function x(a) {
        var b = z(a);
        qq.deleteCookie(b);
    }
    function y(a) {
        var b, c, d, e = qq.getCookie(z(a));
        return e ? (b = e.indexOf(I), c = e.substr(0, b), d = parseInt(e.substr(b + 1, e.length - b), 10), 
        {
            uuid: c,
            part: d
        }) : void 0;
    }
    function z(a) {
        var b, c = D.getName(a), d = D.getSize(a), e = E.chunking.partSize;
        return b = "qqfilechunk" + I + encodeURIComponent(c) + I + d + I + e, void 0 !== L && (b += I + L), 
        b;
    }
    function A() {
        return null === E.resume.id || void 0 === E.resume.id || qq.isFunction(E.resume.id) || qq.isObject(E.resume.id) ? void 0 : E.resume.id;
    }
    function B(a, b) {
        var c, d, e, f = D.getName(a), i = 0;
        if (!H[a].remainingChunkIdxs || 0 === H[a].remainingChunkIdxs.length) for (H[a].remainingChunkIdxs = [], 
        K && !b && (c = y(a), c && (d = g(a, c.part), E.onResume(a, f, u(d)) !== !1 && (i = c.part, 
        H[a].uuid = c.uuid, H[a].loaded = d.start, H[a].attemptingResume = !0, G("Resuming " + f + " at partition index " + i)))), 
        e = h(a) - 1; e >= i; e -= 1) H[a].remainingChunkIdxs.unshift(e);
        m(a);
    }
    function C(a) {
        var b, c, d, e = H[a].file, f = D.getName(a);
        H[a].loaded = 0, b = i(a), b.upload.onprogress = function(b) {
            b.lengthComputable && (H[a].loaded = b.loaded, E.onProgress(a, f, b.loaded, b.total));
        }, b.onreadystatechange = v(a, b), c = E.paramsStore.getParams(a), d = j(c, b, e, a), 
        k(a, b), G("Sending upload request for " + a), b.send(d);
    }
    var D, E = a, F = b, G = c, H = [], I = "|", J = E.chunking.enabled && qq.isFileChunkingSupported(), K = E.resume.enabled && J && qq.areCookiesEnabled(), L = A(), M = E.forceMultipart || E.paramsInBody;
    return D = {
        add: function(a) {
            if (!(a instanceof File)) throw new Error("Passed obj in not a File (in qq.UploadHandlerXhr)");
            var b = H.push({
                file: a
            }) - 1;
            return H[b].uuid = qq.getUniqueId(), b;
        },
        getName: function(a) {
            var b = H[a].file;
            return null !== b.fileName && void 0 !== b.fileName ? b.fileName : b.name;
        },
        getSize: function(a) {
            var b = H[a].file;
            return null != b.fileSize ? b.fileSize : b.size;
        },
        getFile: function(a) {
            return H[a] ? H[a].file : void 0;
        },
        getLoaded: function(a) {
            return H[a].loaded || 0;
        },
        isValid: function(a) {
            return void 0 !== H[a];
        },
        reset: function() {
            H = [];
        },
        getUuid: function(a) {
            return H[a].uuid;
        },
        upload: function(a, b) {
            var c = this.getName(a);
            E.onUpload(a, c), J ? B(a, b) : C(a);
        },
        cancel: function(a) {
            E.onCancel(a, this.getName(a)), H[a].xhr && H[a].xhr.abort(), K && x(a), delete H[a];
        },
        getResumableFilesData: function() {
            var a = [], b = [];
            return J && K ? (a = void 0 === L ? qq.getCookieNames(new RegExp("^qqfilechunk\\" + I + ".+\\" + I + "\\d+\\" + I + E.chunking.partSize + "=")) : qq.getCookieNames(new RegExp("^qqfilechunk\\" + I + ".+\\" + I + "\\d+\\" + I + E.chunking.partSize + "\\" + I + L + "=")), 
            qq.each(a, function(a, c) {
                var d = c.split(I), e = qq.getCookie(c).split(I);
                b.push({
                    name: decodeURIComponent(d[1]),
                    size: d[2],
                    uuid: e[0],
                    partIdx: e[1]
                });
            }), b) : [];
        }
    };
}, function(a) {
    "use strict";
    var b, c, d, e, f, g, h, i, j, k;
    g = [ "uploaderType" ], d = function(a) {
        if (a) {
            var d = i(a);
            h(d), b("basic" === f("uploaderType") ? new qq.FineUploaderBasic(d) : new qq.FineUploader(d));
        }
        return c;
    }, e = function(a, b) {
        var d = c.data("fineuploader");
        return b ? (void 0 === d && (d = {}), d[a] = b, c.data("fineuploader", d), void 0) : void 0 === d ? null : d[a];
    }, b = function(a) {
        return e("uploader", a);
    }, f = function(a, b) {
        return e(a, b);
    }, h = function(b) {
        var d = b.callbacks = {};
        a.each(new qq.FineUploaderBasic()._options.callbacks, function(a, b) {
            var e, f;
            e = /^on(\w+)/.exec(a)[1], e = e.substring(0, 1).toLowerCase() + e.substring(1), 
            f = c, d[a] = function() {
                var a = Array.prototype.slice.call(arguments);
                return f.triggerHandler(e, a);
            };
        });
    }, i = function(b, d) {
        var e, h;
        return e = void 0 === d ? "basic" !== b.uploaderType ? {
            element: c[0]
        } : {} : d, a.each(b, function(b, c) {
            a.inArray(b, g) >= 0 ? f(b, c) : c instanceof a ? e[b] = c[0] : a.isPlainObject(c) ? (e[b] = {}, 
            i(c, e[b])) : a.isArray(c) ? (h = [], a.each(c, function(b, c) {
                c instanceof a ? a.merge(h, c) : h.push(c);
            }), e[b] = h) : e[b] = c;
        }), void 0 === d ? e : void 0;
    }, j = function(c) {
        return "string" === a.type(c) && !c.match(/^_/) && void 0 !== b()[c];
    }, k = function(a) {
        var c = [], d = Array.prototype.slice.call(arguments, 1);
        return i(d, c), b()[a].apply(b(), c);
    }, a.fn.fineUploader = function(e) {
        var f = this, g = arguments, h = [];
        return this.each(function(i, l) {
            if (c = a(l), b() && j(e)) {
                if (h.push(k.apply(f, g)), 1 === f.length) return !1;
            } else "object" != typeof e && e ? a.error("Method " + e + " does not exist on jQuery.fineUploader") : d.apply(f, g);
        }), 1 === h.length ? h[0] : h.length > 1 ? h : this;
    };
}(jQuery), function(a) {
    a.fn.validationEngineLanguage = function() {}, a.validationEngineLanguage = {
        newLang: function() {
            a.validationEngineLanguage.allRules = {
                required: {
                    regex: "none",
                    alertText: "* This field is required",
                    alertTextCheckboxMultiple: "* Please select an option",
                    alertTextCheckboxe: "* This checkbox is required",
                    alertTextDateRange: "* Both date range fields are required"
                },
                requiredInFunction: {
                    func: function(a, b, c, d) {
                        return "test" == a.val() ? !0 : !1;
                    },
                    alertText: "* Field must equal test"
                },
                dateRange: {
                    regex: "none",
                    alertText: "* Invalid ",
                    alertText2: "Date Range"
                },
                dateTimeRange: {
                    regex: "none",
                    alertText: "* Invalid ",
                    alertText2: "Date Time Range"
                },
                minSize: {
                    regex: "none",
                    alertText: "* Minimum ",
                    alertText2: " characters allowed"
                },
                maxSize: {
                    regex: "none",
                    alertText: "* Maximum ",
                    alertText2: " characters allowed"
                },
                groupRequired: {
                    regex: "none",
                    alertText: "* You must fill one of the following fields"
                },
                min: {
                    regex: "none",
                    alertText: "* Minimum value is "
                },
                max: {
                    regex: "none",
                    alertText: "* Maximum value is "
                },
                past: {
                    regex: "none",
                    alertText: "* Date prior to "
                },
                future: {
                    regex: "none",
                    alertText: "* Date past "
                },
                maxCheckbox: {
                    regex: "none",
                    alertText: "* Maximum ",
                    alertText2: " options allowed"
                },
                minCheckbox: {
                    regex: "none",
                    alertText: "* Please select ",
                    alertText2: " options"
                },
                equals: {
                    regex: "none",
                    alertText: "* Fields do not match"
                },
                creditCard: {
                    regex: "none",
                    alertText: "* Invalid credit card number"
                },
                phone: {
                    regex: /^([\+][0-9]{1,3}[\ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9\ \.\-\/]{3,20})((x|ext|extension)[\ ]?[0-9]{1,4})?$/,
                    alertText: "* Invalid phone number"
                },
                email: {
                    regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    alertText: "* Invalid email address"
                },
                integer: {
                    regex: /^[\-\+]?\d+$/,
                    alertText: "* Not a valid integer"
                },
                number: {
                    regex: /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    alertText: "* Invalid floating decimal number"
                },
                date: {
                    func: function(a) {
                        var b = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/), c = b.exec(a.val());
                        if (null == c) return !1;
                        var d = c[1], e = 1 * c[2], f = 1 * c[3], g = new Date(d, e - 1, f);
                        return g.getFullYear() == d && g.getMonth() == e - 1 && g.getDate() == f;
                    },
                    alertText: "* Invalid date, must be in YYYY-MM-DD format"
                },
                ipv4: {
                    regex: /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    alertText: "* Invalid IP address"
                },
                url: {
                    regex: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    alertText: "* Invalid URL"
                },
                onlyNumberSp: {
                    regex: /^[0-9\ ]+$/,
                    alertText: "* Numbers only"
                },
                onlyLetterSp: {
                    regex: /^[a-zA-Z\ \']+$/,
                    alertText: "* Letters only"
                },
                onlyLetterNumber: {
                    regex: /^[0-9a-zA-Z]+$/,
                    alertText: "* No special characters allowed"
                },
                ajaxUserCall: {
                    url: "ajaxValidateFieldUser",
                    extraData: "name=eric",
                    alertText: "* This user is already taken",
                    alertTextLoad: "* Validating, please wait"
                },
                ajaxUserCallPhp: {
                    url: "phpajax/ajaxValidateFieldUser.php",
                    extraData: "name=eric",
                    alertTextOk: "* This username is available",
                    alertText: "* This user is already taken",
                    alertTextLoad: "* Validating, please wait"
                },
                ajaxNameCall: {
                    url: "ajaxValidateFieldName",
                    alertText: "* This name is already taken",
                    alertTextOk: "* This name is available",
                    alertTextLoad: "* Validating, please wait"
                },
                ajaxNameCallPhp: {
                    url: "phpajax/ajaxValidateFieldName.php",
                    alertText: "* This name is already taken",
                    alertTextLoad: "* Validating, please wait"
                },
                validate2fields: {
                    alertText: "* Please input HELLO"
                },
                dateFormat: {
                    regex: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    alertText: "* Invalid Date"
                },
                dateTimeFormat: {
                    regex: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    alertText: "* Invalid Date or Date Format",
                    alertText2: "Expected Format: ",
                    alertText3: "mm/dd/yyyy hh:mm:ss AM|PM or ",
                    alertText4: "yyyy-mm-dd hh:mm:ss AM|PM"
                }
            };
        }
    }, a.validationEngineLanguage.newLang();
}(jQuery), function(a) {
    "use strict";
    var b = {
        init: function(c) {
            var d = this;
            return d.data("jqv") && null != d.data("jqv") || (c = b._saveOptions(d, c), a(".formError").on("click", function() {
                a(this).fadeOut(150, function() {
                    a(this).parent(".formErrorOuter").remove(), a(this).remove();
                });
            })), this;
        },
        attach: function(c) {
            var d, e = this;
            return d = c ? b._saveOptions(e, c) : e.data("jqv"), d.validateAttribute = e.find("[data-validation-engine*=validate]").length ? "data-validation-engine" : "class", 
            d.binded && (e.on(d.validationEventTrigger, "[" + d.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", b._onFieldEvent), 
            e.on("click", "[" + d.validateAttribute + "*=validate][type=checkbox],[" + d.validateAttribute + "*=validate][type=radio]", b._onFieldEvent), 
            e.on(d.validationEventTrigger, "[" + d.validateAttribute + "*=validate][class*=datepicker]", {
                delay: 300
            }, b._onFieldEvent)), d.autoPositionUpdate && a(window).bind("resize", {
                noAnimation: !0,
                formElem: e
            }, b.updatePromptsPosition), e.on("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", b._submitButtonClick), 
            e.removeData("jqv_submitButton"), e.on("submit", b._onSubmitEvent), this;
        },
        detach: function() {
            var c = this, d = c.data("jqv");
            return c.find("[" + d.validateAttribute + "*=validate]").not("[type=checkbox]").off(d.validationEventTrigger, b._onFieldEvent), 
            c.find("[" + d.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", b._onFieldEvent), 
            c.off("submit", b.onAjaxFormComplete), c.die("submit", b.onAjaxFormComplete), c.removeData("jqv"), 
            c.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", b._submitButtonClick), 
            c.removeData("jqv_submitButton"), d.autoPositionUpdate && a(window).unbind("resize", b.updatePromptsPosition), 
            this;
        },
        validate: function() {
            var c = a(this), d = null;
            if (!c.is("form") && !c.hasClass("validationEngineContainer") || c.hasClass("validating")) if (c.is("form") || c.hasClass("validationEngineContainer")) c.removeClass("validating"); else {
                var e = c.closest("form, .validationEngineContainer"), f = e.data("jqv") ? e.data("jqv") : a.validationEngine.defaults, d = b._validateField(c, f);
                d && f.onFieldSuccess ? f.onFieldSuccess() : f.onFieldFailure && f.InvalidFields.length > 0 && f.onFieldFailure();
            } else {
                c.addClass("validating");
                var f = c.data("jqv"), d = b._validateFields(this);
                setTimeout(function() {
                    c.removeClass("validating");
                }, 100), d && f.onSuccess ? f.onSuccess() : !d && f.onFailure && f.onFailure();
            }
            return f.onValidationComplete ? !!f.onValidationComplete(e, d) : d;
        },
        updatePromptsPosition: function(c) {
            if (c && this == window) var d = c.data.formElem, e = c.data.noAnimation; else var d = a(this.closest("form, .validationEngineContainer"));
            var f = d.data("jqv");
            return d.find("[" + f.validateAttribute + "*=validate]").not(":disabled").each(function() {
                var c = a(this);
                f.prettySelect && c.is(":hidden") && (c = d.find("#" + f.usePrefix + c.attr("id") + f.useSuffix));
                var g = b._getPrompt(c), h = a(g).find(".formErrorContent").html();
                g && b._updatePrompt(c, a(g), h, void 0, !1, f, e);
            }), this;
        },
        showPrompt: function(a, c, d, e) {
            var f = this.closest("form, .validationEngineContainer"), g = f.data("jqv");
            return g || (g = b._saveOptions(this, g)), d && (g.promptPosition = d), g.showArrow = 1 == e, 
            b._showPrompt(this, a, c, !1, g), this;
        },
        hide: function() {
            var c, d = a(this).closest("form, .validationEngineContainer"), e = d.data("jqv"), f = e && e.fadeDuration ? e.fadeDuration : .3;
            return c = a(this).is("form") || a(this).hasClass("validationEngineContainer") ? "parentForm" + b._getClassName(a(this).attr("id")) : b._getClassName(a(this).attr("id")) + "formError", 
            a("." + c).fadeTo(f, .3, function() {
                a(this).parent(".formErrorOuter").remove(), a(this).remove();
            }), this;
        },
        hideAll: function() {
            var b = this, c = b.data("jqv"), d = c ? c.fadeDuration : .3;
            return a(".formError").fadeTo(d, .3, function() {
                a(this).parent(".formErrorOuter").remove(), a(this).remove();
            }), this;
        },
        _onFieldEvent: function(c) {
            var d = a(this), e = d.closest("form, .validationEngineContainer"), f = e.data("jqv");
            f.eventTrigger = "field", window.setTimeout(function() {
                b._validateField(d, f), 0 == f.InvalidFields.length && f.onFieldSuccess ? f.onFieldSuccess() : f.InvalidFields.length > 0 && f.onFieldFailure && f.onFieldFailure();
            }, c.data ? c.data.delay : 0);
        },
        _onSubmitEvent: function() {
            var c = a(this), d = c.data("jqv");
            if (c.data("jqv_submitButton")) {
                var e = a("#" + c.data("jqv_submitButton"));
                if (e && e.length > 0 && (e.hasClass("validate-skip") || "true" == e.attr("data-validation-engine-skip"))) return !0;
            }
            d.eventTrigger = "submit";
            var f = b._validateFields(c);
            return f && d.ajaxFormValidation ? (b._validateFormWithAjax(c, d), !1) : d.onValidationComplete ? !!d.onValidationComplete(c, f) : f;
        },
        _checkAjaxStatus: function(b) {
            var c = !0;
            return a.each(b.ajaxValidCache, function(a, b) {
                return b ? void 0 : (c = !1, !1);
            }), c;
        },
        _checkAjaxFieldStatus: function(a, b) {
            return 1 == b.ajaxValidCache[a];
        },
        _validateFields: function(c) {
            var d = c.data("jqv"), e = !1;
            c.trigger("jqv.form.validating");
            var f = null;
            if (c.find("[" + d.validateAttribute + "*=validate]").not(":disabled").each(function() {
                var g = a(this), h = [];
                if (a.inArray(g.attr("name"), h) < 0) {
                    if (e |= b._validateField(g, d), e && null == f && (f = g.is(":hidden") && d.prettySelect ? g = c.find("#" + d.usePrefix + b._jqSelector(g.attr("id")) + d.useSuffix) : g), 
                    d.doNotShowAllErrosOnSubmit) return !1;
                    if (h.push(g.attr("name")), 1 == d.showOneMessage && e) return !1;
                }
            }), c.trigger("jqv.form.result", [ e ]), e) {
                if (d.scroll) {
                    var g = f.offset().top, h = f.offset().left, i = d.promptPosition;
                    if ("string" == typeof i && -1 != i.indexOf(":") && (i = i.substring(0, i.indexOf(":"))), 
                    "bottomRight" != i && "bottomLeft" != i) {
                        var j = b._getPrompt(f);
                        j && (g = j.offset().top);
                    }
                    if (d.scrollOffset && (g -= d.scrollOffset), d.isOverflown) {
                        var k = a(d.overflownDIV);
                        if (!k.length) return !1;
                        var l = k.scrollTop(), m = -parseInt(k.offset().top);
                        g += l + m - 5;
                        var n = a(d.overflownDIV + ":not(:animated)");
                        n.animate({
                            scrollTop: g
                        }, 1100, function() {
                            d.focusFirstField && f.focus();
                        });
                    } else a("html, body").animate({
                        scrollTop: g
                    }, 1100, function() {
                        d.focusFirstField && f.focus();
                    }), a("html, body").animate({
                        scrollLeft: h
                    }, 1100);
                } else d.focusFirstField && f.focus();
                return !1;
            }
            return !0;
        },
        _validateFormWithAjax: function(c, d) {
            var e = c.serialize(), f = d.ajaxFormValidationMethod ? d.ajaxFormValidationMethod : "GET", g = d.ajaxFormValidationURL ? d.ajaxFormValidationURL : c.attr("action"), h = d.dataType ? d.dataType : "json";
            a.ajax({
                type: f,
                url: g,
                cache: !1,
                dataType: h,
                data: e,
                form: c,
                methods: b,
                options: d,
                beforeSend: function() {
                    return d.onBeforeAjaxFormValidation(c, d);
                },
                error: function(a, c) {
                    b._ajaxError(a, c);
                },
                success: function(e) {
                    if ("json" == h && e !== !0) {
                        for (var f = !1, g = 0; g < e.length; g++) {
                            var i = e[g], j = i[0], k = a(a("#" + j)[0]);
                            if (1 == k.length) {
                                var l = i[2];
                                if (1 == i[1]) if ("" != l && l) {
                                    if (d.allrules[l]) {
                                        var m = d.allrules[l].alertTextOk;
                                        m && (l = m);
                                    }
                                    d.showPrompts && b._showPrompt(k, l, "pass", !1, d, !0);
                                } else b._closePrompt(k); else {
                                    if (f |= !0, d.allrules[l]) {
                                        var m = d.allrules[l].alertText;
                                        m && (l = m);
                                    }
                                    d.showPrompts && b._showPrompt(k, l, "", !1, d, !0);
                                }
                            }
                        }
                        d.onAjaxFormComplete(!f, c, e, d);
                    } else d.onAjaxFormComplete(!0, c, e, d);
                }
            });
        },
        _validateField: function(c, d, e) {
            if (c.attr("id") || (c.attr("id", "form-validation-field-" + a.validationEngine.fieldIdCounter), 
            ++a.validationEngine.fieldIdCounter), c.is(":hidden") && !d.prettySelect || c.parent().is(":hidden")) return !1;
            var f = c.attr(d.validateAttribute), g = /validate\[(.*)\]/.exec(f);
            if (!g) return !1;
            var h = g[1], i = h.split(/\[|,|\]/), j = !1, k = c.attr("name"), l = "", m = "", n = !1, o = !1;
            d.isError = !1, d.showArrow = !0, d.maxErrorsPerField > 0 && (o = !0);
            for (var p = a(c.closest("form, .validationEngineContainer")), q = 0; q < i.length; q++) i[q] = i[q].replace(" ", ""), 
            "" === i[q] && delete i[q];
            for (var q = 0, r = 0; q < i.length; q++) {
                if (o && r >= d.maxErrorsPerField) {
                    if (!n) {
                        var s = a.inArray("required", i);
                        n = -1 != s && s >= q;
                    }
                    break;
                }
                var t = void 0;
                switch (i[q]) {
                  case "required":
                    n = !0, t = b._getErrorMessage(p, c, i[q], i, q, d, b._required);
                    break;

                  case "custom":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._custom);
                    break;

                  case "groupRequired":
                    var u = "[" + d.validateAttribute + "*=" + i[q + 1] + "]", v = p.find(u).eq(0);
                    v[0] != c[0] && (b._validateField(v, d, e), d.showArrow = !0), t = b._getErrorMessage(p, c, i[q], i, q, d, b._groupRequired), 
                    t && (n = !0), d.showArrow = !1;
                    break;

                  case "ajax":
                    t = b._ajax(c, i, q, d), t && (m = "load");
                    break;

                  case "minSize":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._minSize);
                    break;

                  case "maxSize":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._maxSize);
                    break;

                  case "min":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._min);
                    break;

                  case "max":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._max);
                    break;

                  case "past":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._past);
                    break;

                  case "future":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._future);
                    break;

                  case "dateRange":
                    var u = "[" + d.validateAttribute + "*=" + i[q + 1] + "]";
                    d.firstOfGroup = p.find(u).eq(0), d.secondOfGroup = p.find(u).eq(1), (d.firstOfGroup[0].value || d.secondOfGroup[0].value) && (t = b._getErrorMessage(p, c, i[q], i, q, d, b._dateRange)), 
                    t && (n = !0), d.showArrow = !1;
                    break;

                  case "dateTimeRange":
                    var u = "[" + d.validateAttribute + "*=" + i[q + 1] + "]";
                    d.firstOfGroup = p.find(u).eq(0), d.secondOfGroup = p.find(u).eq(1), (d.firstOfGroup[0].value || d.secondOfGroup[0].value) && (t = b._getErrorMessage(p, c, i[q], i, q, d, b._dateTimeRange)), 
                    t && (n = !0), d.showArrow = !1;
                    break;

                  case "maxCheckbox":
                    c = a(p.find("input[name='" + k + "']")), t = b._getErrorMessage(p, c, i[q], i, q, d, b._maxCheckbox);
                    break;

                  case "minCheckbox":
                    c = a(p.find("input[name='" + k + "']")), t = b._getErrorMessage(p, c, i[q], i, q, d, b._minCheckbox);
                    break;

                  case "equals":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._equals);
                    break;

                  case "funcCall":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._funcCall);
                    break;

                  case "creditCard":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._creditCard);
                    break;

                  case "condRequired":
                    t = b._getErrorMessage(p, c, i[q], i, q, d, b._condRequired), void 0 !== t && (n = !0);
                }
                var w = !1;
                if ("object" == typeof t) switch (t.status) {
                  case "_break":
                    w = !0;
                    break;

                  case "_error":
                    t = t.message;
                    break;

                  case "_error_no_prompt":
                    return !0;
                }
                if (w) break;
                "string" == typeof t && (l += t + "<br/>", d.isError = !0, r++);
            }
            !n && !c.val() && c.val().length < 1 && (d.isError = !1);
            var x = c.prop("type"), y = c.data("promptPosition") || d.promptPosition;
            ("radio" == x || "checkbox" == x) && p.find("input[name='" + k + "']").size() > 1 && (c = a("inline" === y ? p.find("input[name='" + k + "'][type!=hidden]:last") : p.find("input[name='" + k + "'][type!=hidden]:first")), 
            d.showArrow = !1), c.is(":hidden") && d.prettySelect && (c = p.find("#" + d.usePrefix + b._jqSelector(c.attr("id")) + d.useSuffix)), 
            d.isError && d.showPrompts ? b._showPrompt(c, l, m, !1, d) : j || b._closePrompt(c), 
            j || c.trigger("jqv.field.result", [ c, d.isError, l ]);
            var z = a.inArray(c[0], d.InvalidFields);
            return -1 == z ? d.isError && d.InvalidFields.push(c[0]) : d.isError || d.InvalidFields.splice(z, 1), 
            b._handleStatusCssClasses(c, d), d.isError && d.onFieldFailure && d.onFieldFailure(c), 
            !d.isError && d.onFieldSuccess && d.onFieldSuccess(c), d.isError;
        },
        _handleStatusCssClasses: function(a, b) {
            b.addSuccessCssClassToField && a.removeClass(b.addSuccessCssClassToField), b.addFailureCssClassToField && a.removeClass(b.addFailureCssClassToField), 
            b.addSuccessCssClassToField && !b.isError && a.addClass(b.addSuccessCssClassToField), 
            b.addFailureCssClassToField && b.isError && a.addClass(b.addFailureCssClassToField);
        },
        _getErrorMessage: function(c, d, e, f, g, h, i) {
            var j = jQuery.inArray(e, f);
            if ("custom" === e || "funcCall" === e) {
                var k = f[j + 1];
                e = e + "[" + k + "]", delete f[j];
            }
            var l, m = e, n = d.attr("data-validation-engine") ? d.attr("data-validation-engine") : d.attr("class"), o = n.split(" ");
            if (l = "future" == e || "past" == e || "maxCheckbox" == e || "minCheckbox" == e ? i(c, d, f, g, h) : i(d, f, g, h), 
            void 0 != l) {
                var p = b._getCustomErrorMessage(a(d), o, m, h);
                p && (l = p);
            }
            return l;
        },
        _getCustomErrorMessage: function(a, c, d, e) {
            var f = !1, g = b._validityProp[d];
            if (void 0 != g && (f = a.attr("data-errormessage-" + g), void 0 != f)) return f;
            if (f = a.attr("data-errormessage"), void 0 != f) return f;
            var h = "#" + a.attr("id");
            if ("undefined" != typeof e.custom_error_messages[h] && "undefined" != typeof e.custom_error_messages[h][d]) f = e.custom_error_messages[h][d].message; else if (c.length > 0) for (var i = 0; i < c.length && c.length > 0; i++) {
                var j = "." + c[i];
                if ("undefined" != typeof e.custom_error_messages[j] && "undefined" != typeof e.custom_error_messages[j][d]) {
                    f = e.custom_error_messages[j][d].message;
                    break;
                }
            }
            return f || "undefined" == typeof e.custom_error_messages[d] || "undefined" == typeof e.custom_error_messages[d].message || (f = e.custom_error_messages[d].message), 
            f;
        },
        _validityProp: {
            required: "value-missing",
            custom: "custom-error",
            groupRequired: "value-missing",
            ajax: "custom-error",
            minSize: "range-underflow",
            maxSize: "range-overflow",
            min: "range-underflow",
            max: "range-overflow",
            past: "type-mismatch",
            future: "type-mismatch",
            dateRange: "type-mismatch",
            dateTimeRange: "type-mismatch",
            maxCheckbox: "range-overflow",
            minCheckbox: "range-underflow",
            equals: "pattern-mismatch",
            funcCall: "custom-error",
            creditCard: "pattern-mismatch",
            condRequired: "value-missing"
        },
        _required: function(b, c, d, e, f) {
            switch (b.prop("type")) {
              case "text":
              case "password":
              case "textarea":
              case "file":
              case "select-one":
              case "select-multiple":
              default:
                if (!a.trim(b.val()) && (b.val() != b.attr("data-validation-placeholder") || b.val() !== b.attr("placeholder"))) return e.allrules[c[d]].alertText;
                break;

              case "radio":
              case "checkbox":
                if (f) {
                    if (!b.attr("checked")) return e.allrules[c[d]].alertTextCheckboxMultiple;
                    break;
                }
                var g = b.closest("form, .validationEngineContainer"), h = b.attr("name");
                if (0 == g.find("input[name='" + h + "']:checked").size()) return 1 == g.find("input[name='" + h + "']:visible").size() ? e.allrules[c[d]].alertTextCheckboxe : e.allrules[c[d]].alertTextCheckboxMultiple;
            }
        },
        _groupRequired: function(c, d, e, f) {
            var g = "[" + f.validateAttribute + "*=" + d[e + 1] + "]", h = !1;
            return c.closest("form, .validationEngineContainer").find(g).each(function() {
                return b._required(a(this), d, e, f) ? void 0 : (h = !0, !1);
            }), h ? void 0 : f.allrules[d[e]].alertText;
        },
        _custom: function(a, b, c, d) {
            var e, f = b[c + 1], g = d.allrules[f];
            if (!g) return void alert("jqv:custom rule not found - " + f);
            if (g.regex) {
                var h = g.regex;
                if (!h) return void alert("jqv:custom regex not found - " + f);
                var i = new RegExp(h);
                if (!i.test(a.val())) return d.allrules[f].alertText;
            } else {
                if (!g.func) return void alert("jqv:custom type not allowed " + f);
                if (e = g.func, "function" != typeof e) return void alert("jqv:custom parameter 'function' is no function - " + f);
                if (!e(a, b, c, d)) return d.allrules[f].alertText;
            }
        },
        _funcCall: function(a, b, c, d) {
            var e, f = b[c + 1];
            if (f.indexOf(".") > -1) {
                for (var g = f.split("."), h = window; g.length; ) h = h[g.shift()];
                e = h;
            } else e = window[f] || d.customFunctions[f];
            return "function" == typeof e ? e(a, b, c, d) : void 0;
        },
        _equals: function(b, c, d, e) {
            var f = c[d + 1];
            return b.val() != a("#" + f).val() ? e.allrules.equals.alertText : void 0;
        },
        _maxSize: function(a, b, c, d) {
            var e = b[c + 1], f = a.val().length;
            if (f > e) {
                var g = d.allrules.maxSize;
                return g.alertText + e + g.alertText2;
            }
        },
        _minSize: function(a, b, c, d) {
            var e = b[c + 1], f = a.val().length;
            if (e > f) {
                var g = d.allrules.minSize;
                return g.alertText + e + g.alertText2;
            }
        },
        _min: function(a, b, c, d) {
            var e = parseFloat(b[c + 1]), f = parseFloat(a.val());
            if (e > f) {
                var g = d.allrules.min;
                return g.alertText2 ? g.alertText + e + g.alertText2 : g.alertText + e;
            }
        },
        _max: function(a, b, c, d) {
            var e = parseFloat(b[c + 1]), f = parseFloat(a.val());
            if (f > e) {
                var g = d.allrules.max;
                return g.alertText2 ? g.alertText + e + g.alertText2 : g.alertText + e;
            }
        },
        _past: function(c, d, e, f, g) {
            var h, i = e[f + 1], j = a(c.find("input[name='" + i.replace(/^#+/, "") + "']"));
            if ("now" == i.toLowerCase()) h = new Date(); else if (void 0 != j.val()) {
                if (j.is(":disabled")) return;
                h = b._parseDate(j.val());
            } else h = b._parseDate(i);
            var k = b._parseDate(d.val());
            if (k > h) {
                var l = g.allrules.past;
                return l.alertText2 ? l.alertText + b._dateToString(h) + l.alertText2 : l.alertText + b._dateToString(h);
            }
        },
        _future: function(c, d, e, f, g) {
            var h, i = e[f + 1], j = a(c.find("input[name='" + i.replace(/^#+/, "") + "']"));
            if ("now" == i.toLowerCase()) h = new Date(); else if (void 0 != j.val()) {
                if (j.is(":disabled")) return;
                h = b._parseDate(j.val());
            } else h = b._parseDate(i);
            var k = b._parseDate(d.val());
            if (h > k) {
                var l = g.allrules.future;
                return l.alertText2 ? l.alertText + b._dateToString(h) + l.alertText2 : l.alertText + b._dateToString(h);
            }
        },
        _isDate: function(a) {
            var b = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
            return b.test(a);
        },
        _isDateTime: function(a) {
            var b = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
            return b.test(a);
        },
        _dateCompare: function(a, b) {
            return new Date(a.toString()) < new Date(b.toString());
        },
        _dateRange: function(a, c, d, e) {
            return !e.firstOfGroup[0].value && e.secondOfGroup[0].value || e.firstOfGroup[0].value && !e.secondOfGroup[0].value ? e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2 : b._isDate(e.firstOfGroup[0].value) && b._isDate(e.secondOfGroup[0].value) && b._dateCompare(e.firstOfGroup[0].value, e.secondOfGroup[0].value) ? void 0 : e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2;
        },
        _dateTimeRange: function(a, c, d, e) {
            return !e.firstOfGroup[0].value && e.secondOfGroup[0].value || e.firstOfGroup[0].value && !e.secondOfGroup[0].value ? e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2 : b._isDateTime(e.firstOfGroup[0].value) && b._isDateTime(e.secondOfGroup[0].value) && b._dateCompare(e.firstOfGroup[0].value, e.secondOfGroup[0].value) ? void 0 : e.allrules[c[d]].alertText + e.allrules[c[d]].alertText2;
        },
        _maxCheckbox: function(a, b, c, d, e) {
            var f = c[d + 1], g = b.attr("name"), h = a.find("input[name='" + g + "']:checked").size();
            return h > f ? (e.showArrow = !1, e.allrules.maxCheckbox.alertText2 ? e.allrules.maxCheckbox.alertText + " " + f + " " + e.allrules.maxCheckbox.alertText2 : e.allrules.maxCheckbox.alertText) : void 0;
        },
        _minCheckbox: function(a, b, c, d, e) {
            var f = c[d + 1], g = b.attr("name"), h = a.find("input[name='" + g + "']:checked").size();
            return f > h ? (e.showArrow = !1, e.allrules.minCheckbox.alertText + " " + f + " " + e.allrules.minCheckbox.alertText2) : void 0;
        },
        _creditCard: function(a, b, c, d) {
            var e = !1, f = a.val().replace(/ +/g, "").replace(/-+/g, ""), g = f.length;
            if (g >= 14 && 16 >= g && parseInt(f) > 0) {
                var h, i = 0, c = g - 1, j = 1, k = new String();
                do h = parseInt(f.charAt(c)), k += j++ % 2 == 0 ? 2 * h : h; while (--c >= 0);
                for (c = 0; c < k.length; c++) i += parseInt(k.charAt(c));
                e = i % 10 == 0;
            }
            return e ? void 0 : d.allrules.creditCard.alertText;
        },
        _ajax: function(c, d, e, f) {
            var g = d[e + 1], h = f.allrules[g], i = h.extraData, j = h.extraDataDynamic, k = {
                fieldId: c.attr("id"),
                fieldValue: c.val()
            };
            if ("object" == typeof i) a.extend(k, i); else if ("string" == typeof i) for (var l = i.split("&"), e = 0; e < l.length; e++) {
                var m = l[e].split("=");
                m[0] && m[0] && (k[m[0]] = m[1]);
            }
            if (j) for (var n = String(j).split(","), e = 0; e < n.length; e++) {
                var o = n[e];
                if (a(o).length) {
                    var p = c.closest("form, .validationEngineContainer").find(o).val();
                    o.replace("#", "") + "=" + escape(p);
                    k[o.replace("#", "")] = p;
                }
            }
            return "field" == f.eventTrigger && delete f.ajaxValidCache[c.attr("id")], f.isError || b._checkAjaxFieldStatus(c.attr("id"), f) ? void 0 : (a.ajax({
                type: f.ajaxFormValidationMethod,
                url: h.url,
                cache: !1,
                dataType: "json",
                data: k,
                field: c,
                rule: h,
                methods: b,
                options: f,
                beforeSend: function() {},
                error: function(a, c) {
                    b._ajaxError(a, c);
                },
                success: function(d) {
                    var e = d[0], g = a("#" + e).eq(0);
                    if (1 == g.length) {
                        var i = d[1], j = d[2];
                        if (i) {
                            if (f.ajaxValidCache[e] = !0, j) {
                                if (f.allrules[j]) {
                                    var k = f.allrules[j].alertTextOk;
                                    k && (j = k);
                                }
                            } else j = h.alertTextOk;
                            f.showPrompts && (j ? b._showPrompt(g, j, "pass", !0, f) : b._closePrompt(g)), "submit" == f.eventTrigger && c.closest("form").submit();
                        } else {
                            if (f.ajaxValidCache[e] = !1, f.isError = !0, j) {
                                if (f.allrules[j]) {
                                    var k = f.allrules[j].alertText;
                                    k && (j = k);
                                }
                            } else j = h.alertText;
                            f.showPrompts && b._showPrompt(g, j, "", !0, f);
                        }
                    }
                    g.trigger("jqv.field.result", [ g, f.isError, j ]);
                }
            }), h.alertTextLoad);
        },
        _ajaxError: function(a, b) {
            0 == a.status && null == b ? alert("The page is not served from a server! ajax call failed") : "undefined" != typeof console && console.log("Ajax error: " + a.status + " " + b);
        },
        _dateToString: function(a) {
            return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
        },
        _parseDate: function(a) {
            var b = a.split("-");
            return b == a && (b = a.split("/")), new Date(b[0], b[1] - 1, b[2]);
        },
        _showPrompt: function(c, d, e, f, g, h) {
            var i = b._getPrompt(c);
            h && (i = !1), a.trim(d) && (i ? b._updatePrompt(c, i, d, e, f, g) : b._buildPrompt(c, d, e, f, g));
        },
        _buildPrompt: function(c, d, e, f, g) {
            var h = a("<div>");
            switch (h.addClass(b._getClassName(c.attr("id")) + "formError"), h.addClass("parentForm" + b._getClassName(c.closest("form, .validationEngineContainer").attr("id"))), 
            h.addClass("formError"), e) {
              case "pass":
                h.addClass("greenPopup");
                break;

              case "load":
                h.addClass("blackPopup");
            }
            f && h.addClass("ajaxed");
            var i = (a("<div>").addClass("formErrorContent").html(d).appendTo(h), c.data("promptPosition") || g.promptPosition);
            if (g.showArrow) {
                var j = a("<div>").addClass("formErrorArrow");
                if ("string" == typeof i) {
                    var k = i.indexOf(":");
                    -1 != k && (i = i.substring(0, k));
                }
                switch (i) {
                  case "bottomLeft":
                  case "bottomRight":
                    h.find(".formErrorContent").before(j), j.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                    break;

                  case "topLeft":
                  case "topRight":
                    j.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>'), 
                    h.append(j);
                }
            }
            g.addPromptClass && h.addClass(g.addPromptClass), h.css({
                opacity: 0
            }), "inline" === i ? (h.addClass("inline"), "undefined" != typeof c.attr("data-prompt-target") && a("#" + c.attr("data-prompt-target")).length > 0 ? h.appendTo(a("#" + c.attr("data-prompt-target"))) : c.after(h)) : c.before(h);
            var k = b._calculatePosition(c, h, g);
            return h.css({
                position: "inline" === i ? "relative" : "absolute",
                top: k.callerTopPosition,
                left: k.callerleftPosition,
                marginTop: k.marginTopSize,
                opacity: 0
            }).data("callerField", c), g.autoHidePrompt && setTimeout(function() {
                h.animate({
                    opacity: 0
                }, function() {
                    h.closest(".formErrorOuter").remove(), h.remove();
                });
            }, g.autoHideDelay), h.animate({
                opacity: .87
            });
        },
        _updatePrompt: function(a, c, d, e, f, g, h) {
            if (c) {
                "undefined" != typeof e && ("pass" == e ? c.addClass("greenPopup") : c.removeClass("greenPopup"), 
                "load" == e ? c.addClass("blackPopup") : c.removeClass("blackPopup")), f ? c.addClass("ajaxed") : c.removeClass("ajaxed"), 
                c.find(".formErrorContent").html(d);
                var i = b._calculatePosition(a, c, g), j = {
                    top: i.callerTopPosition,
                    left: i.callerleftPosition,
                    marginTop: i.marginTopSize
                };
                h ? c.css(j) : c.animate(j);
            }
        },
        _closePrompt: function(a) {
            var c = b._getPrompt(a);
            c && c.fadeTo("fast", 0, function() {
                c.parent(".formErrorOuter").remove(), c.remove();
            });
        },
        closePrompt: function(a) {
            return b._closePrompt(a);
        },
        _getPrompt: function(c) {
            var d = a(c).closest("form, .validationEngineContainer").attr("id"), e = b._getClassName(c.attr("id")) + "formError", f = a("." + b._escapeExpression(e) + ".parentForm" + d)[0];
            return f ? a(f) : void 0;
        },
        _escapeExpression: function(a) {
            return a.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
        },
        isRTL: function(b) {
            var c = a(document), d = a("body"), e = b && b.hasClass("rtl") || b && "rtl" === (b.attr("dir") || "").toLowerCase() || c.hasClass("rtl") || "rtl" === (c.attr("dir") || "").toLowerCase() || d.hasClass("rtl") || "rtl" === (d.attr("dir") || "").toLowerCase();
            return Boolean(e);
        },
        _calculatePosition: function(a, b, c) {
            var d, e, f, g = a.width(), h = a.position().left, i = a.position().top, j = (a.height(), 
            b.height());
            d = e = 0, f = -j;
            var k = a.data("promptPosition") || c.promptPosition, l = "", m = "", n = 0, o = 0;
            switch ("string" == typeof k && -1 != k.indexOf(":") && (l = k.substring(k.indexOf(":") + 1), 
            k = k.substring(0, k.indexOf(":")), -1 != l.indexOf(",") && (m = l.substring(l.indexOf(",") + 1), 
            l = l.substring(0, l.indexOf(",")), o = parseInt(m), isNaN(o) && (o = 0)), n = parseInt(l), 
            isNaN(l) && (l = 0)), k) {
              default:
              case "topRight":
                e += h + g - 30, d += i;
                break;

              case "topLeft":
                d += i, e += h;
                break;

              case "centerRight":
                d = i + 4, f = 0, e = h + a.outerWidth(!0) + 5;
                break;

              case "centerLeft":
                e = h - (b.width() + 2), d = i + 4, f = 0;
                break;

              case "bottomLeft":
                d = i + a.height() + 5, f = 0, e = h;
                break;

              case "bottomRight":
                e = h + g - 30, d = i + a.height() + 5, f = 0;
                break;

              case "inline":
                e = 0, d = 0, f = 0;
            }
            return e += n, d += o, {
                callerTopPosition: d + "px",
                callerleftPosition: e + "px",
                marginTopSize: f + "px"
            };
        },
        _saveOptions: function(b, c) {
            if (a.validationEngineLanguage) var d = a.validationEngineLanguage.allRules; else a.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
            a.validationEngine.defaults.allrules = d;
            var e = a.extend(!0, {}, a.validationEngine.defaults, c);
            return b.data("jqv", e), e;
        },
        _getClassName: function(a) {
            return a ? a.replace(/:/g, "_").replace(/\./g, "_") : void 0;
        },
        _jqSelector: function(a) {
            return a.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1");
        },
        _condRequired: function(a, c, d, e) {
            var f, g;
            for (f = d + 1; f < c.length; f++) if (g = jQuery("#" + c[f]).first(), g.length && void 0 == b._required(g, [ "required" ], 0, e, !0)) return b._required(a, [ "required" ], 0, e);
        },
        _submitButtonClick: function(b) {
            var c = a(this), d = c.closest("form, .validationEngineContainer");
            d.data("jqv_submitButton", c.attr("id"));
        }
    };
    a.fn.validationEngine = function(c) {
        var d = a(this);
        return d[0] ? "string" == typeof c && "_" != c.charAt(0) && b[c] ? ("showPrompt" != c && "hide" != c && "hideAll" != c && b.init.apply(d), 
        b[c].apply(d, Array.prototype.slice.call(arguments, 1))) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist in jQuery.validationEngine") : (b.init.apply(d, arguments), 
        b.attach.apply(d)) : d;
    }, a.validationEngine = {
        fieldIdCounter: 0,
        defaults: {
            validationEventTrigger: "blur",
            scroll: !0,
            focusFirstField: !0,
            showPrompts: !0,
            promptPosition: "topRight",
            bindMethod: "bind",
            inlineAjax: !1,
            ajaxFormValidation: !1,
            ajaxFormValidationURL: !1,
            ajaxFormValidationMethod: "get",
            onAjaxFormComplete: a.noop,
            onBeforeAjaxFormValidation: a.noop,
            onValidationComplete: !1,
            doNotShowAllErrosOnSubmit: !1,
            custom_error_messages: {},
            binded: !0,
            showArrow: !0,
            isError: !1,
            maxErrorsPerField: !1,
            ajaxValidCache: {},
            autoPositionUpdate: !1,
            InvalidFields: [],
            onFieldSuccess: !1,
            onFieldFailure: !1,
            onSuccess: !1,
            onFailure: !1,
            validateAttribute: "class",
            addSuccessCssClassToField: !1,
            addFailureCssClassToField: !1,
            autoHidePrompt: !1,
            autoHideDelay: 1e4,
            fadeDuration: .3,
            prettySelect: !1,
            addPromptClass: "",
            usePrefix: "",
            useSuffix: "",
            showOneMessage: !1
        }
    }, a(function() {
        a.validationEngine.defaults.promptPosition = b.isRTL() ? "topLeft" : "topRight";
    });
}(jQuery);

function adjustPage() {
    if (window.matchMedia('(max-width: 992px)').matches) {
        if ($('.links-bar').height() > 30) {
            $('.page-links-bar').addClass('expand');
        }
    } else {
        $('.page-links-bar').removeClass('expand');
    }
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function buildContent(results) {
    var images = '';
    $.each(results, function (key, value) {
        images += '<a href="#" data-image="' + value.images.original.url + '" data-width="' + value.images.original.width + '" data-height="' + value.images.original.height + '"><img width="20%" src="' + value.images.preview_gif.url + '"></a>';
    });
    return images;
}

function loadContent(page) {
    var resultsPerPage = 10;
    var offset = (page - 1) * resultsPerPage;

    console.log('page ' + page + ' , offset ' + offset);

    var queue = $('#giphySearch input[type="text"]').val();

    $.get("https://api.giphy.com/v1/gifs/search?api_key=85d94513353042ee82996af564a8b38b&q=" + queue + "&limit=" + resultsPerPage + "&offset=" + offset + "&rating=G&lang=en", function (data) {

        var totalItems = data.pagination.total_count;

        if (totalItems > 4980) {
            totalItems = 4980;
        }

        var images = buildContent(data.data);
        $('#giphyResults').html(images);

        if (totalItems > 0) {
            $('#giphyPagination').pagination({
                items: totalItems,
                itemsOnPage: resultsPerPage,
                cssStyle: 'light-theme',
                currentPage: page
            });
        } else {
            $('#giphyPagination').html('No results found !');
        }
    }, "json");

    return false;
}

function giphySearch() {
    var appSearch = '<form action="" class="giphy-search form" id="giphySearch"><input type="text" value="" placeholder="Search..."><input type="submit" value="Search" class="btn btn-default btn-sm"></form>';
    var appresults = '<div class="giphy-results" id="giphyResults"></div>';
    var appPagination = '<div class="giphy-pagination" id="giphyPagination"></div>';
    var appWindow = '<div class="giphy-overlay"><div class="giphy-box"><h1>Add a GIF</h1><i class="giphy-close fas fa-times-circle" id="giphyClose"></i>' + appSearch + appresults + appPagination + '</div></div>';
    $('body').append(appWindow);

    $(document).on('submit', '#giphySearch', function (e) {
        e.preventDefault();
        loadContent(1);
    }).on('click', 'a.page-link', function (e) {
        e.preventDefault();
        $(this).each(function () {
            var actualPage = parseInt($('#giphyPagination li.active .current').text());
            console.log(actualPage);
            loadContent(actualPage);
        });
    }).on('click', '#openGiphy', function (e) {
        e.preventDefault();
        $('.giphy-overlay').show();
    }).on('click', '#giphyClose', function (e) {
        e.preventDefault();
        $('.giphy-overlay').hide();
    }).on('click', '#giphyResults a', function (e) {
        e.preventDefault();
        var image = $(this).data('image');
        var width = $(this).data('width');
        var height = $(this).data('height');
        var buildImage = '<img src="' + image + '" width="' + width + '" height="' + height + '">';

        var current = $('.trumbowyg-editor').html();
        $('#comment').trumbowyg('html', current + " " + buildImage);
        $('.giphy-overlay').hide();
    });
}
;

function getAttributes(el) {
    var attributes = {};
    if ($(el).length) {
        $.each($(el)[0].attributes, function (index, attr) {
            attributes[attr.name] = attr.value;
        });
    }
    return attributes;
}

$("#reportModal").iziModal({
    title: 'Report',
    iframe: true,
    padding: 15,
    headerColor: '#194C85',
    radius: 0
});

$("#shareModal").iziModal({
    title: 'Share Content',
    iframe: true,
    padding: 15,
    headerColor: '#194C85',
    radius: 0
});

$("#addFriendModal").iziModal({
    title: 'Add to friends',
    iframe: true,
    padding: 15,
    headerColor: '#194C85',
    radius: 0
});

$("#savePostModal").iziModal({
    title: 'Favorite',
    iframe: true,
    padding: 15,
    headerColor: '#194C85',
    radius: 0,
    iframeHeight: 80
});

$("#ratingSuccessModal").iziModal({
    title: "Thanks for voting!",
    icon: 'fa fa-check-circle-o',
    headerColor: '#194C85',
    width: 600,
    timeout: 3000,
    timeoutProgressbar: true,
    transitionIn: 'fadeInUp',
    transitionOut: 'fadeOutDown',
    bottom: 0,
    loop: true,
    overlayColor: 'rgba(0, 0, 0, 0)',
    pauseOnHover: true
});

$("#ratingErrorModal").iziModal({
    title: "Sorry...",
    subtitle: "you've already voted on this content.",
    icon: 'fa fa-exclamation-circle',
    headerColor: '#BD5B5B',
    width: 600,
    timeout: 3000,
    timeoutProgressbar: true,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutDown',
    pauseOnHover: true
});


var cachedWidth = $(window).width();

$(document).ready(function () {
    $('select').niceSelect();
    $('.add-comment textarea').autogrow({vertical: true, horizontal: false});
    rating();
});

function comments(sort) {
    if (sort.length > 0) {
        var andSort = '&comments_sort=' + sort;
    }
    var opt = new Object();
    opt = {
        i: 102,
        btn: 'data-mb',
        btn_expand: $("[" + this.btn + "='expand']"),
        btn_expand_c: $("[" + this.btn + "='expand-comments']"),
    };
    var ff = {
        comments_container: $('[' + opt.btn + '="load-comments"]'),
        form: $('[' + opt.btn + '="add-comment"]'),
        loaded: 0,
        newCommentID: "new-comment",
        bodyNewClass: "comment-added",
        scrollToTimeout: 500,
        scrollToLength: 1000,
        loadComments: function () { /* LOAD COMMENTS FUNC */
            if (this.comments_container.length) {
                var aa = getAttributes(this.comments_container);
                var load_path = aa["data-opt-url"] + "?id=" + aa["data-opt-id"] + "&type=" + aa["data-opt-type"] + "&loaded=" + this.loaded + "&time=" + new Date().getTime() + andSort;
                if (this.loaded == 1) {
                    if ($("ul#ul-comments").length) {
                        $("ul#ul-comments").before("<div id='" + this.newCommentID + "' style='display:none;'></div>");
                    } else {
                        this.comments_container.children("p").remove().append("<div id='" + this.newCommentID + "' style='display:none;'></div>");
                        this.comments_container.append("<div id='" + this.newCommentID + "' style='display:none;'></div>");
                    }
                    $("#new-comment").load(load_path);
                } else {
                    this.comments_container.load(load_path, function() {
                        $('.editor-groups').each(function () {
                            $(this).trumbowyg({
                                btns: [],
                                autogrow: true
                            });
                        });
                    });
//                    this.loaded = 1;
                }
            }
        },
        addComment: function (e) {
            var self = this;
            var btn = this.form.find("input[type='submit']");
            btn.on("click", function (e) {
                e.preventDefault();
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: $(this.form).serialize(),
                    url: _basehttp + '/includes/ajax.' + _commentMode + '.php',
                    cache: false,
                    crossDomain: false,
                    beforeSend: function () {
                        if (Cookies.get('temp_comment') !== '') {
                            Cookies.remove('temp_comment');
                        }
                    },
                    success: function (data) {
                        if (data.error !== 'true') {
                            if(!$(self.form).find("textarea").hasClass('editor-groups')){
                                $(self.form).find("textarea").val('').prop("disabled", true);
                            } else {
                                $('#comment').each(function () {
                                    $(this).trumbowyg('empty');
                                });
                            }
                            $("body").addClass(self.bodyNewClass);
                            $("body").trigger("added.mb.comment");
                        }
                        if (data.error == 'true') {
                        } else {
                            self.reloadComments();
                        }
                        $("[" + opt.btn + "='comment-alert']").html(data.info);
                        setTimeout(function () {
                            $("#" + self.newCommentID).slideDown();
                            if ($("#" + self.newCommentID).length) {
                                $.scrollTo(self.comments_container.offset().top - 160, self.scrollToLength, {
                                    easing: 'easeInOutQuart'
                                });
                            }
                        }, self.scrollToTimeout);
                        self.resetCaptha();
                    }
                });
            });
        },
        resetCaptha: function () {
            var random = Math.floor((Math.random() * 1000) + 1);
            $("img.captcha").attr("src", _basehttp + "/captcha.php?" + random);
        },
        reloadComments: function () {
            this.loadComments();
        }
    };
    ff.loadComments();
    ff.addComment();
}

$(window).load(function () {
//    if($('.jpaginate').length > 0){
        comments('newest');
        
        $(document).on('click', '.vote-up', function (e) {
            $(this).each(function () {
                e.preventDefault();
                var commentBlock = $(this).closest('.rating-comment');
                var commentID = commentBlock.data('id');
                $.post(_basehttp + "/includes/ajax.rate_comment.php?contentType=" + _commentMode + "&type=up&id=" + commentID, function (data) {
                    if ($.isNumeric(data)) {
                        commentBlock.find('.current-rating').text(data);
                    } else {
                        alert(data);
                    }
                });
                commentBlock.addClass('disable');
            });
        }).on('click', '.vote-down', function (e) {
            $(this).each(function () {
                e.preventDefault();
                var commentBlock = $(this).closest('.rating-comment');
                var commentID = commentBlock.data('id');
                $.post(_basehttp + "/includes/ajax.rate_comment.php?contentType=" + _commentMode + "&type=down&id=" + commentID, function (data) {
                    if ($.isNumeric(data)) {
                        commentBlock.find('.current-rating').text(data);
                    } else {
                        alert(data);
                    }
                });
                commentBlock.addClass('disable');
            });
        }).on('click', '.reply', function (e) {
//           $(this).each(function () {
                e.preventDefault();

                $(this).closest('.block').next('#myformReply').css("display", "block");
                var block = $(this).closest('li');
                var commentBlock = block.find('.rating-comment');
                var commentValue = block.find(' > .block').find('p').text();
                var contentID = $('.mainForm input[name=id]').val();
                var commentID = commentBlock.data('id');
                $('.reply-area').text(commentValue);

                $(this).closest('.block').next('#myformReply').find('#reply').val(commentID);
                $(this).closest('.block').next('#myformReply').find('#id').val(contentID);
                $(this).closest('.block').next('#myformReply').find('#type').val('0');

                $(this).closest('.block').next('#myformReply').find('[data-id="replyArea"]').fadeIn(200);
                //$(".comment-form-inner-col").hide();
//            });
        }).on("click", '.btn-reply', function (e) {
            e.preventDefault();
            
            var arrConf = {
                comments_container: $('#commentsBlock'),
                form: $('[data-mb="add-comment"]'),
                loaded: 0,
                newCommentID: "new-comment",
                bodyNewClass: "comment-added",
                scrollToTimeout: 500,
                scrollToLength: 1000,
                resetCaptha: function () {
                    var random = Math.floor((Math.random() * 1000) + 1);
                    $("img.captcha").attr("src", _basehttp + "/captcha.php?" + random);
                },
            }
            
            var opt = new Object();
            opt = {
                i: 102,
                btn: 'data-mb',
                btn_expand: $("[" + this.btn + "='expand']"),
                btn_expand_c: $("[" + this.btn + "='expand-comments']"),
            };

            var formPar = $(this).closest('#myformReply');
            var daneee = formPar.serialize();

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: daneee,
                url: _basehttp + '/includes/ajax.' + _commentMode + '.php',
                cache: false,
                crossDomain: false,
                success: function (data) {
                    if (data.error !== 'true') {
                        if(!formPar.find("textarea").hasClass('editor-groups')){
                            formPar.find("textarea").val('').prop("disabled", true);
                        } else {
                            $('#comment').each(function () {
                                $(this).trumbowyg('empty');
                            });
                        }
                        $("body").addClass(arrConf.bodyNewClass);
                        $("body").trigger("added.mb.comment");
                    }
                    if (data.error == 'true') {
                    } else {
                        comments('newest');
                    }
                    $("[" + opt.btn + "='comment-alert']").html(data.info);
                    setTimeout(function () {
                        $("#" + arrConf.newCommentID).slideDown();
                        $('html, body').animate({
                            scrollTop: $("#commentsBlock").offset().top-100
                        }, 1000);
                    }, arrConf.scrollToTimeout);
                    
                    arrConf.resetCaptha();
                }
            });
        }).on("click", '.btn-reply-2', function (e) {
            e.preventDefault();
            
            var opt = new Object();
            opt = {
                i: 102,
                btn: 'data-mb',
                btn_expand: $("[" + this.btn + "='expand']"),
                btn_expand_c: $("[" + this.btn + "='expand-comments']"),
            };

            var danee = $(this).closest('#myformReply').serialize();

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: danee,
                url: _basehttp + '/includes/ajax.article_post_comment.php',
                cache: false,
                crossDomain: false,
                success: function (data) {
                    if (data.error !== 'true') {
                        if(!$(self.form).find("textarea").hasClass('editor-groups')){
                            $(self.form).find("textarea").val('').prop("disabled", true);
                        } else {
                            $('#comment').each(function () {
                                $(this).trumbowyg('empty');
                            });
                        }
                        $("body").addClass(self.bodyNewClass);
                        $("body").trigger("added.mb.comment");
                    }
                    if (data.error == 'true') {
                    } else {
                        comments('newest');
                    }
                    $("[" + opt.btn + "='comment-alert']").html(data.info);
                    setTimeout(function () {
                        $("#" + self.newCommentID).slideDown();
                        if ($("#" + self.newCommentID).length) {
                            $.scrollTo(self.comments_container.offset().top - 160, self.scrollToLength, {
                                easing: 'easeInOutQuart'
                            });
                        }
                    }, self.scrollToTimeout);
                    self.resetCaptha();
                }
            });
        }).on('click', '.close-reply', function (e) {
            e.preventDefault();
            $('#reply').val('');
            // Hide reply row ~ Dawid
            $('.replyComment').fadeOut(200);
            //$(".comment-form-inner-col").show();
        });
        $('[name="comments_sort"]').on('change', function (e) {
            e.preventDefault();
            comments($(this).val());
            setTimeout(function () {
                $('pagination__controls').remove();
                $('.jpaginate').paginate({
                    pagination_class: "pagination",
                    items_per_page: 25,
                    prev_next: ($('ul.ul-comments li').length > 25) ? true : false,
                });
            }, 3000);
        });
        setTimeout(function () {
            $('.jpaginate').paginate({
                pagination_class: "pagination",
                items_per_page: 25,
                prev_next: ($('ul.ul-comments li').length > 25) ? true : false,
            });
        }, 3000);
//    }
});


$(window).load(function () {
    adjustPage();
});

$(window).resize(function () {
    adjustPage();
});

$(window).scroll(function () {
    if ($(window).scrollTop() >= 1) {
        $('.page-header, .page-nav, body, .navigation').addClass('fixed');
    } else {
        $('.page-header, .page-nav, body, .navigation').removeClass('fixed');
    }
});

function generateWitgetCode(data){
    var code = "<div id='" + data.widgetID + "' data-action='widget'></div><script type='application/javascript'>var tWidgetConf_" + data.widgetID.replace("tWidget_","") + " = {rows: " + data.rows + ",cols: " + data.cols + ",backgroundColor: '" + data.backgroundColor + "',textColor: '" + data.textColor + "',displayContent: '" + data.displayContent + "',contentSort: '" + data.contentSort + "',contentType: '" + data.contentType + "',showTitle: '" + data.showTitle + "',showThumb: '" + data.showThumb + "',utmCode: '" + data.utmCode + "',widgetID: '" + data.widgetID + "',channels: '" + data.channels + "'};</script>";
    $('[data-value="widget-code"]').val(code);
}

$(document).on('click', '[data-action="blocks-grid"]', function () {
    $('.items').removeClass('list-grid');
    $(this).addClass('active');
    $('[data-action="list-grid"]').removeClass('active');
    setCookie('list-grid', '0', 1);
}).on('click', '[data-action="list-grid"]', function () {
    $('.items').addClass('list-grid');
    $(this).addClass('active');
    $('[data-action="blocks-grid"]').removeClass('active');
    setCookie('list-grid', '1', 1);
}).on('click', '[data-action="open-trigger"]', function () {
    if ($('.navigation').hasClass('visible')) {
        $('.navigation').removeClass('visible');
        $(this).find('i').removeClass('fa-times');
        $(this).find('i').addClass('fa-bars');
    } else {
        $('.navigation').addClass('visible');
        $(this).find('i').removeClass('fa-bars');
        $(this).find('i').addClass('fa-times');
    }
}).on('click', '[data-action="change-theme"]', function (e) {
    e.preventDefault();
    if ($('body').hasClass('dark-theme')) {
        $('body').removeClass('dark-theme');
        setCookie('dark-theme', '0', 1);
    } else {
        $('body').addClass('dark-theme');
        setCookie('dark-theme', '1', 1);
    }
}).on('click', '[data-action="expand-links"]', function (e) {
    e.preventDefault();
    if ($('.links-bar').hasClass('opened')) {
        $('.links-bar').removeClass('opened');
        $(this).find('b').text('Show more');
        $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    } else {
        $('.links-bar').addClass('opened');
        $(this).find('b').text('Show less');
        $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    }
}).on('change', '.change-location', function (e) {
    window.location = $(this).val();
}).on('click', '[data-mb="tab"]', function (e) {
    e.preventDefault();
    var tabName = $(this).attr('data-opt-tab');
    var tab = $('div[data-opt-tab-content="' + tabName + '"]');
    $('.tab-wrapper').removeClass('visible');
    $('.tabs-list li').removeClass('active');
    tab.addClass('visible');
    $(this).parent('li').addClass('active');
}).on('click', '.reportPost', function (event) {
    event.preventDefault();
    $(this).each(function(){
       $('#reportModal').iziModal('open', event); // Use "event" to get URL href 
    });
}).on('click', '.sharePost', function (event) {
    event.preventDefault();
    $(this).each(function(){
       $('#shareModal').iziModal('open', event); // Use "event" to get URL href 
    });
}).on('click', '.savePost', function (event) {
    event.preventDefault();
    $(this).each(function(){
       $('#savePostModal').iziModal('open', event); // Use "event" to get URL href 
    });
}).on('click', '.addToFirends', function (event) {
    event.preventDefault();
    $(this).each(function(){
       $('#addFriendModal').iziModal('open', event); // Use "event" to get URL href 
    });
}).on('click', '.top-links > li.user-menu > ul li.notifications', function () {
    clearNotifications();
}).on('submit', '[data-action="generate-widget"]', function(e){
    e.preventDefault();
    
    var channels = ['0'];
    
    $('[name="channels[]"]:checked').each(function(){
        channels.push($(this).val())
    });
    
    var widgetID = 'tWidget_' + Math.floor(new Date().valueOf() * Math.random());
    
    $('[data-action="widget"]').replaceWith('<div id="' + widgetID + '" data-action="widget"></div>');
    
    var widgetConfig = {
        rows: $('[name="rows_number"]').val(),
        cols: $('[name="cols_number"]').val(),
        backgroundColor: $('[name="backgrund_color"]').val(),
        textColor: $('[name="text_color"]').val(),
        displayContent: $('[name="display_content"]').val(),
        contentSort: $('[name="content_sort"]').val(),
        contentType: $('[name="content_type"]').val(),
        showTitle: $('[name="display_title"]').val(),
        showThumb: $('[name="display_thumb"]').val(),
        utmCode: $('[name="utm_code"]').val(),
        widgetID: widgetID,
        channels: channels,
    };
    
    generateWidget(widgetConfig);
    generateWitgetCode(widgetConfig);
    
}).on('click', '[data-action="checkbox-change"]', function(){
    var checkbox = $(this).find('input');
    if(checkbox.is(':checked')){
        checkbox.val('1');
    } else {
        checkbox.val('0');
    }
}).on('click', '[data-action="copy-to-clipboard"]', function(e){
    e.preventDefault();
    var copyText = $('[data-value="widget-code"]');
    copyText.select();
    document.execCommand("copy");
}).on('change', '[data-action="display-content"]', function(e){
    e.preventDefault();
    var checkboxes = $('[data-box="channels"]').find('input');
    
    if($(this).val() === '1'){
        $('[data-box="channels"]').show();
        checkboxes.each(function(){
            $(this).prop( "checked", true);
        });
    } else {
        $('[data-box="channels"]').hide();
        checkboxes.each(function(){
            $(this).prop( "checked", false);  
        });
    }
});

(function ($) {
    function ww() {
        return $(window).innerWidth();
    }

    // item => class added to <img> that contains SVG source
    function img2svg(item) {
        if ($('img' + item).length > 0) {
            $('img' + item).each(function () {
                var $img = $(this),
                    imgID = $img.attr('id'),
                    imgClass = $img.attr('class'),
                    imgURL = $img.attr('src');

                $.get(imgURL, function (data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = $(data).find('svg');

                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass + ' replaced-svg');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');

                    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                    if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                    }

                    // Replace image with new SVG
                    $img.replaceWith($svg);

                }, 'xml');

            });
        }
    }
    $.img2svg = img2svg;
    if ($('.img2svg').length > 0) {
        $.img2svg('.img2svg');
    }
    
    function mbTriggers() {
        var trigger = $('[data-mb="trigger"]');

        $(document).on('click', function (e) {
            var target = e.target;
            if ($('body').hasClass('nav-open')) {
                if ((!$(target).is('.main-list') && !$(target).parents('.main-list').length) && (!$(target).is('.btn-trigger-nav') && !$(target).parents('.btn-trigger-nav').length)) {
                    $('body').removeClass('nav-open');
                }
            }
            if ($('body').hasClass('search-open')) {
                if ((!$(target).is('.search-wrap') && !$(target).parents('.search-wrap').length) && (!$(target).is('.btn-trigger-search') && !$(target).parents('.btn-trigger-search').length)) {
                    $('body').removeClass('search-open');
                }
            }
        });

        trigger.each(function () {
            $(this).click(function (e) {
                e.preventDefault();
                if ($('body').hasClass('[class*="-open"]')) {
                    $('body').removeClass('[class*="-open"]')
                }
                if ($('body').hasClass($(this).data('target') + '-open')) {
                    $('body').removeClass($(this).data('target') + '-open');
                } else {
                    $('body').addClass($(this).data('target') + '-open');
                    if ($(this).data('target') === 'search') {
                        $('.search-wrap').find('input[type="text"]').focus();
                    }
                }
            });
        });
    }
    function movePanelsToSide() {
        function setAction() {
            if (ww() < 700 && $(".top-links.-guest").length > 0 && clone_login === 0) {
                var ucp = $(".top-links.-guest > li:not(.upload-menu)").clone(true, true);

                $(".main-nav > .main-list").prepend('<li class="nav-elem -ucp-guest"></li>');
                $(".main-nav > .main-list").find("li.-ucp-guest").append(ucp);
                clone_login = 1;
            }
            if (clone_login === 1 && ww() > 699 && $(".main-nav > .main-list > .-ucp-guest").length > 0) {
                $(".main-nav").find("li.-ucp-guest").remove();
                clone_login = 0;
            }

            if (ww() < 700 && $(".top-links:not(.-guest)").length > 0 && clone === 0) {
                var list = $(".top-links > .user-menu").clone(true, true);

                $(".main-nav > .main-list").prepend('<li class="nav-elem -ucp"></li>');
                $(".main-nav > .main-list").find("li.-ucp").append(list);
                clone = 1;
            }
            if (clone === 1 && ww() > 699 && $(".main-nav > .main-list > .-ucp").length > 0) {
                $(".main-nav").find("li.-ucp").remove();
                clone = 0;
            }
        }

        var clone_login = 0, clone = 0;
        $(window).load(function () {
            setAction();
        }).resize(function () {
            setAction();
        });
    }
    
    mbTriggers();
    movePanelsToSide();
})(jQuery);

