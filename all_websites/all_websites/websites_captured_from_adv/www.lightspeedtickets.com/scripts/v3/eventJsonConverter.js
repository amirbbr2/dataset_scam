var eventJsonConverter = (function() {
	var converter = {};

	function getJsonFromEventList(eventList) {
		var eventCards = eventList.querySelectorAll(".geo-event");
		var eventsList = [];
		for (var i = 0; i < eventCards.length; i++) {
			var event = {};
			event.eventName = eventCards[i].querySelector(".event-name-text").innerHTML;
			event.venueName = eventCards[i].querySelector(".venue-name").innerHTML;
			event.venueLocation = eventCards[i].querySelector(".event-city").innerHTML + ", " +
				eventCards[i].querySelector(".event-state").innerHTML;
			event.eventDay = eventCards[i].querySelector(".event-day").value;
			event.eventDate = eventCards[i].querySelector(".event-date-json").value;
			event.eventTime = eventCards[i].querySelector(".event-time-json").value;
			event.eventId = eventCards[i].querySelector(".event-id").value;
			event.parentCategory = eventCards[i].querySelector(".event-parent-category").value;
			event.position = i + 1;
			eventsList.push(event);
		}
		return {"events": eventsList};
	}

	converter.getJsonFromLocalEventsList = function() {
		var localEventsList = document.getElementById("localEventsList");
		var json = {};
		if (localEventsList) {
			json = getJsonFromEventList(localEventsList);
		}
		return json;
	};

	converter.getJsonFromAllEventsList = function() {
		var localEventsList = document.getElementById("allEventsList");
		var json = {};
		if (localEventsList) {
			json = getJsonFromEventList(localEventsList);
		}
		return json;
	};

	return converter;
}());