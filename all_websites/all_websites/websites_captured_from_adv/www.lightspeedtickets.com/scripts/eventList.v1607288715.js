document.addEventListener("DOMContentLoaded", function () {
	var eventCount = 30;
	var homeCategoryEventCount = 10;
	locationUtil.locationChanged = function (e) {
		window.location.reload();
	};
	var languageInput = document.getElementById("language");
	var language = null;
	if (languageInput) {
		language = languageInput.value;
	}
	var eventsContainer = document.getElementById("eventsContainer");
	if (eventsContainer) {
		var loadMores = eventsContainer.querySelectorAll(".events-more");
		for (var j = 0; j < loadMores.length; j++) {
			loadMores[j].addEventListener("click", function (e) {
				var eventListItems = this.parentElement.querySelector(".event-list-items");
				loadMore(this, eventListItems, language);
				e.preventDefault();
			});
		}
	}

	var categoryEventsContainers = document.getElementsByClassName("category-events-container");
	for (var i = 0; i < categoryEventsContainers.length; i++) {
		var categoryLoadMore = categoryEventsContainers[i].querySelector(".events-more");
		if (categoryLoadMore) {
			categoryLoadMore.addEventListener("click", function(e) {
				var eventListItems = this.parentElement.querySelector(".event-list-items");
				loadMoreHomeCategoryEvents(this, eventListItems, language);
				e.preventDefault();
			});
		}
	}

	function loadMore(loadMore, eventListItems, language) {
		loadMore.querySelector("a").innerText = languageUtil.getLoading(language);
		var performerIds = document.getElementById("performerIds");
		var venueIds = document.getElementById("venueIds");
		var city = document.getElementById("city");
		var states = document.getElementById("states");
		var parentCategoryId = document.getElementById("parentCategoryId");
		var childCategoryId = document.getElementById("childCategoryId");
		var grandchildCategoryId = document.getElementById("grandchildCategoryId");
		var startDate = document.getElementById("startDate");
		var endDate = document.getElementById("endDate");
		var cityIds = document.getElementById("cityIds");
		var query = document.getElementById("q");
		var offset = loadMore.parentElement.querySelectorAll(".geo-event").length;
		var local = loadMore.getAttribute("data-local");
		var hideParking = document.getElementById("hideParking");
		var url = "/partials/events?";
		if (document.getElementsByTagName("base").length > 0) {
			url = location.protocol + '//' + location.hostname + "/partials/events?";
		}
		url += "performerIds=" + (performerIds === null ? "" : performerIds.value);
		url += "&venueIds=" + (venueIds === null ? "" : venueIds.value);
		url += "&city=" + (city === null ? "" : city.value);
		url += "&states=" + (states === null ? "" : states.value);
		url += "&parentCategoryId=" + (parentCategoryId === null ? "" : parentCategoryId.value);
		url += "&childCategoryId=" + (childCategoryId === null ? "" : childCategoryId.value);
		url += "&grandchildCategoryId=" + (grandchildCategoryId === null ? "" : grandchildCategoryId.value);
		url += "&startDate=" + (startDate === null ? "" : startDate.value);
		url += "&endDate=" + (endDate === null ? "" : endDate.value);
		url += "&cityIds=" + (cityIds === null ? "" : cityIds.value);
		url += "&q=" + (query === null ? "" : query.value);
		url += "&offset=" + offset;
		if (local) {
			var latitude = document.getElementById("latitude");
			var longitude = document.getElementById("longitude");
			if (latitude && longitude) {
				url += "&latitude=" + latitude.value;
				url += "&longitude=" + longitude.value;
			}
			url += "&local=true";
		}
		url += "&hideParking=" + (hideParking === null ? "false" : hideParking.value);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				eventListItems.insertAdjacentHTML('beforeend', this.responseText);
				setHistoryUrl(local ? "localLoadMore" : "allLoadMore", offset, eventCount);
				var emptyResponse = this.responseText.trim() === "";
				if (emptyResponse || (eventListItems.querySelectorAll('.last-row').length) > 0) {
					loadMore.style.display = "none";
				} else {
					loadMore.querySelector("a").innerText = languageUtil.getLoadMore(language);
				}
			}
		};
		request.open("GET", url, true);
		request.send();
	}

	function loadMoreHomeCategoryEvents(loadMore, eventListItems, language) {
		loadMore.querySelector("a").innerText = languageUtil.getLoading(language);
		var offset = loadMore.parentElement.querySelectorAll(".geo-event").length;
		var parentCategoryId = eventListItems.getElementsByClassName("parent-category-id")[0].value;
		var performerIds = document.getElementById("performerIds");
		var venueIds = document.getElementById("venueIds");
		var states = document.getElementById("states");
		var startDate = document.getElementById("startDate");
		var endDate = document.getElementById("endDate");
		var cityIds = document.getElementById("cityIds");
		var url = "/partials/home-category-events?";
		if (document.getElementsByTagName("base").length > 0) {
			url = location.protocol + '//' + location.hostname + "/partials/home-category-events?";
		}
		url += "&offset=" + offset;
		url += "&parentCategoryId=" + parentCategoryId;
		url += "&latitude=" + document.getElementById("latitude").value;
		url += "&longitude=" + document.getElementById("longitude").value;
		url += "&performerIds=" + (performerIds === null ? "" : performerIds.value);
		url += "&venueIds=" + (venueIds === null ? "" : venueIds.value);
		url += "&states=" + (states === null ? "" : states.value);
		url += "&startDate=" + (startDate === null ? "" : startDate.value);
		url += "&endDate=" + (endDate === null ? "" : endDate.value);
		url += "&cityIds=" + (cityIds === null ? "" : cityIds.value);
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				eventListItems.insertAdjacentHTML('beforeend', this.responseText);
				var historyUrlParam;
				if (parentCategoryId === "1") {
					historyUrlParam = "sportsLoadMore";
				} else if (parentCategoryId === "2") {
					historyUrlParam = "concertsLoadMore";
				} else {
					historyUrlParam = "theaterLoadMore";
				}
				setHistoryUrl(historyUrlParam, offset, homeCategoryEventCount);
				var emptyResponse = this.responseText.trim() === "";
				if (emptyResponse || (eventListItems.querySelectorAll('.last-row').length) > 0) {
					loadMore.style.display = "none";
				} else {
					loadMore.querySelector("a").innerText = languageUtil.getLoadMore(language);
				}
			}
		};
		request.open("GET", url, true);
		request.send();
	}

	function setHistoryUrl(paramName, offset, eventCount) {
		if (window.history.replaceState) {
			var num = (offset / eventCount) + 1;
			var url = window.location.href;
			var historyUrl = appUtil.addQueryParam(url, paramName, num);
			window.history.replaceState({}, '', historyUrl);
		}
	}
});