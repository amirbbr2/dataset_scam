$(document).ready(function () {
	var baseUrl = '';
	if ($("base").length) {
		baseUrl = location.protocol + '//' + location.hostname;
	}
	$("#locationLink").click(function () {
		$("#locationPanel").slideToggle();
		return false;
	});
	$("#currentLocation a").click(function () {
		$("#locationSpinner").show();
		locationUtil.setCurrentLocation();
		return false;
	});
	$('#locationInput').devbridgeAutocomplete({
		serviceUrl: baseUrl + "/data/places?type=predictions",
		dataType: "json",
		transformResult: function (response) {
			return {
				suggestions: $.map(response.predictions, function (dataItem) {
					return {value: dataItem.description, data: dataItem.place_id};
				})
			};
		},
		onSelect: function (suggestion) {
			$.getJSON(baseUrl + "/data/places?type=detail&placeid=" + suggestion.data, function (data) {
				locationUtil.setSelectedLocation(suggestion.value, data);
			});
		}
	});
});

var locationUtil = {
	latitude: 0,
	longitude: 0,
	locationChanged: {},
	setCurrentLocation: function () {
		setTimeout(function () {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					locationUtil.latitude = position.coords.latitude;
					locationUtil.longitude = position.coords.longitude;
					locationUtil.setLocation("Current Location");
				}, function (error) {
				});
			}
		}, 100);
	},

	setSelectedLocation: function (currentLocation, data) {
		result = data.result;
		locationUtil.latitude = data.result.geometry.location.lat;
		locationUtil.longitude = data.result.geometry.location.lng;
		locationUtil.setLocation(currentLocation);
	},

	setLocation: function (currentLocation) {
		locationUtil.setLocationCookie(currentLocation);
		$("#locationName").text(currentLocation);
		$("#locationPanel").hide();
		$("#locationSpinner").hide();
		$('#locationInput').val("Enter a location");
		locationUtil.locationChanged();
	},

	setLocationCookie: function (name) {
		document.cookie = "ticket_portal_location=" +
			locationUtil.latitude + "|" +
			locationUtil.longitude + "|" + encodeURIComponent(name) + "; path=/";
	}
};