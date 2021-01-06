var suggestions = {
	suggesterUrl: "",
	suggesterUrlToken: "",
	searchResults: {},
	baseUrl: {},
	query: "",
	send: function () {
		var url = suggestions.suggesterUrl + "?t=" + suggestions.suggesterUrlToken +
			"&query=" + encodeURIComponent(suggestions.query) + "&callback=suggestions.receive";
		var head = document.head;
		var script = document.createElement("script");
		script.setAttribute("src", url);
		head.appendChild(script);
		head.removeChild(script);
	},
	receive: function (data) {
		var resultsHtml = suggestions.createResultsHtml(data);
		if (resultsHtml !== "") {
			suggestions.searchResults.innerHTML = resultsHtml;
			suggestions.searchResults.style.display = "block";
		} else {
			suggestions.searchResults.style.display = "none";
		}
	},

	createResultsHtml: function (data) {
		var html = "";
		var i, url;
		if (data.performers.length > 0) {
			html = '<div class="search-result-title">PERFORMERS</div>';
			for (i = 0; i < data.performers.length; i++) {
				url = suggestions.baseUrl + encodeURIComponent(data.performers[i].text) +
					"&data=p-" + data.performers[i].data;
				html += '<a class="search-result-item" href="' + url + '">' + data.performers[i].text + '</a>';
			}
		}
		if (data.cities.length > 0) {
			html += '<div class="search-result-title">CITIES</div>';
			for (i = 0; i < data.cities.length; i++) {
				url = suggestions.baseUrl + encodeURIComponent(data.cities[i].text.replace(",", "")) +
					"&data=c";
				html += '<a class="search-result-item" href="' + url + '">' + data.cities[i].text + '</a>';
			}
		}
		if (data.events && data.events.length > 0) {
			html += '<div class="search-result-title">EVENTS</div>';
			for (i = 0; i < data.events.length; i++) {
				var info = data.events[i].data;
				var id = info.substr(0, info.indexOf("|"));
				var date = info.substr(info.indexOf("|") + 1);
				url = suggestions.baseUrl + encodeURIComponent(data.events[i].text) +
					"&data=e-" + id;
				html += '<a class="search-result-item" href="' + url + '">'
					+ date + ' - ' + data.events[i].text + '</a>';
			}
		}
		if (data.venues.length > 0) {
			html += '<div class="search-result-title">VENUES</div>';
			for (i = 0; i < data.venues.length; i++) {
				url = suggestions.baseUrl + encodeURIComponent(data.venues[i].text) +
					"&data=v-" + data.venues[i].data;
				html += '<a class="search-result-item" href="' + url + '">' + data.venues[i].text + '</a>';
			}
		}
		return html;
	}
};