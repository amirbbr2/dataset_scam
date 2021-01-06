var appUtil = {
	addQueryParam: function (url, name, value) {
		var urlWithoutQuery = url;
		var indexOfQuestionMark = url.indexOf("?");
		if (indexOfQuestionMark !== -1) {
			urlWithoutQuery = url.substring(0, indexOfQuestionMark);
		}
		var params = appUtil.getQueryParams(url);
		var indexOfAdd = appUtil.getParamIndex(name, params);
		if (indexOfAdd === -1) {
			params[params.length] = [name, value];
		} else {
			params[indexOfAdd][1] = value;
		}
		return appUtil.constructQueryString(urlWithoutQuery, params);
	},

	removeQueryParam: function (url, name) {
		var urlWithoutQuery = url;
		var indexOfQuestionMark = url.indexOf("?");
		if (indexOfQuestionMark !== -1) {
			urlWithoutQuery = url.substring(0, indexOfQuestionMark);
		}
		var params = appUtil.getQueryParams(url);
		var indexOfRemove = appUtil.getParamIndex(name, params);
		if (indexOfRemove !== -1) {
			params.splice(indexOfRemove, 1);
		}
		return appUtil.constructQueryString(urlWithoutQuery, params);
	},

	constructQueryString: function (url, params) {
		if (params.length > 0) {
			var queryString = '?';
			for (var i = 0; i < params.length; i++) {
				queryString += params[i][0] + "=" + params[i][1];
				if (i !== params.length - 1) {
					queryString += "&";
				}
			}
			return url + queryString;
		} else {
			return url;
		}
	},

	getQueryParams: function (url) {
		var index = url.indexOf("?");
		var params = [];
		if (index !== -1) {
			var query = url.substring(url.indexOf("?") + 1);
			var paramGroups = query.split("&");
			for (var i = 0; i < paramGroups.length; i++) {
				var paramKeyAndValue = paramGroups[i].split("=");
				params[i] = [paramKeyAndValue[0], paramKeyAndValue[1]];
			}
		}
		return params;
	},

	getParamIndex: function(name, params) {
		var index = -1;
		for (var i = 0; i < params.length; i++) {
			if (params[i][0] === name) {
				index = i;
			}
		}
		return index;
	},

	getParamValue: function(name) {
		var params = appUtil.getQueryParams(window.location.href);
		var index = appUtil.getParamIndex(name, params);
		if (index > -1) {
			return params[index][1];
		} else {
			return null;
		}
	},

	addClass: function(element, classVal) {
		var currentClass = appUtil.getClass(element);
		if (currentClass.indexOf(classVal) === -1) {
			if (currentClass !== "") {
				classVal = " " + classVal;
			}
			element.setAttribute("class", currentClass + classVal);
		}
	},

	removeClass: function(element, classVal) {
		if (appUtil.hasClass(element, classVal)) {
			var replace = appUtil.getClass(element).replace(classVal, "");
			element.setAttribute("class", replace.trim());
		}
	},

	replaceClass: function(element, classToReplace, classReplacement) {
		element.setAttribute("class", appUtil.getClass(element).replace(classToReplace, classReplacement));
	},

	toggleClass: function(element, classVal) {
		if (appUtil.hasClass(element, classVal)) {
			appUtil.removeClass(element, classVal);
		} else {
			appUtil.addClass(element, classVal);
		}
	},

	hasClass: function(element, classVal) {
		return appUtil.getClass(element).indexOf(classVal) !== -1;
	},

	getClass: function(element) {
		var currentClass = element.getAttribute("class");
		if (!currentClass) {
			currentClass = "";
		}
		return currentClass;
	},

	getText: function (method, url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				callback(this.responseText);
			}
		};
		xhr.open(method, url);
		xhr.send();
	},

};