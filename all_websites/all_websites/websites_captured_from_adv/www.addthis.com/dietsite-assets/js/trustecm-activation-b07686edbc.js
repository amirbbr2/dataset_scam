// Handling of ConsentManager implied or explicit approvals for the use of cookies
(function () {
	/**
	 * Activates (runs, loads, or displays) an element based upon element node name.
	 * @param {Array.<HTMLElement>} list
	 */
	function trustecmActivateElement(list) {
		if(!(list instanceof Array || list instanceof NodeList)) { throw 'Illegal argument - must be an array' };

		var index = 0;
		function next() {
			if (index >= list.length) {
				return;
			}

			var blocking = false,
				item = list[index];

			// Increment immediately to avoid asynchronous inconsistencies
			index++;

			item.classList.remove('trustecm');
			item.classList.add('trustecm_done');

			switch(item.nodeName.toLowerCase()) {
				case 'script':
					var src = item.getAttribute('active-src'),
						async = item.getAttribute('async');

					if (src) {
						var script = document.createElement('script');

						script.src = src;

						// If the script is async, proceed as normal; if it is not async
						// block loading anything further until it is finished.
						if (async !== null) {
							script.async = true;
						} else {
							blocking = true;

							script.onload = next;
							script.onerror = function (e) {
								console.error(e);
								next();
							};
						}

						item.parentNode.insertBefore(script, item);
					} else {
						try {
							window.eval(item.text || item.textContent || item.innerText);
						} catch (e) {
							console.error(e);
						}
					}

					break;
				default:
					var src = item.getAttribute('active-src');
					if (src) {
						item.removeAttribute('active-src');
						item.setAttribute('src', src);
					}

					break;
			}

			// Move to the next item unless there is a blocking script. Use setTimeout since recusion
			// is not necessary and could exceed the maximum call stack.
			if (!blocking) {
				setTimeout(next, 0);
			}
		}

		next();
	}

	// Catch approved consent events
	window.addEventListener('ConsentManager_approved', function (e) {
		//console.log('APPROVED ' + e.detail.type + ' (' + e.detail.source + ')');

		// Execute "functional cookie" code
		if (e.detail.type == 'functional') {
			/*!
			 * Minified inclusion of lr.js cookie script
			 */
			$(function(){var c={},a=false,f;$.each(document.cookie.split(";"),function(h,g){var e=$.trim(g.substr(0,g.indexOf("=")));var j=$.trim(g.substr(g.indexOf("=")+1));c[e]=j});if(typeof(c.at_le)!="undefined"){a=c.at_le;f="login"}else{if(typeof(c.at_re)!="undefined"){a=c.at_re;f="reg"}}if(a!=false){a=unescape(a);var d=$.trim(a.substr(0,a.indexOf("?")));var b=$.trim(a.substr(a.indexOf("?")+1));if(b!="password"&&b!="facebook"&&b!="google"&&b!="twitter"){return}if(d!="page"&&d!="get-full"&&d!="get-simple"){return}if(typeof _gaq!="undefined"){_gaq.push(["_trackEvent",f,d,b]);if(document.cookie){document.cookie="at_le=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;"}if(document.cookie){document.cookie="at_re=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;"}}}});

			// Activate inline scripts of type "functional"
			trustecmActivateElement(document.querySelectorAll(".trustecm[trackertype=functional]"));
		} else if (e.detail.type == 'advertising') {
			// Activate inline scripts of type "advertising"
			trustecmActivateElement(document.querySelectorAll(".trustecm[trackertype=advertising]"));
		}
	});

	// Catch denied consent events
	//window.addEventListener('ConsentManager_denied', function (e) {
	//	console.log('DENIED ' + e.detail.type + ' (' + e.detail.source + ')');
	//});

	var cm = new ConsentManager('.addthis.com', window.location.host);
	cm.initialize();

	// Activate inline scripts of type "required"
	trustecmActivateElement(document.querySelectorAll(".trustecm[trackertype=required]"));
})();