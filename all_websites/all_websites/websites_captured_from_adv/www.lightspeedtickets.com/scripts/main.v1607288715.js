$(document).ready(function () {
	$("#navToggle").click(function () {
		$("#responsiveNav").slideToggle("fast");
		return false;
	});
	$("html").click(function () {
		$("#responsiveNav").hide();
	});
	$("#customSearchButton").click(function () {
		var params = $("#customSearchForm").serialize();
		var $sel = $("#customSearchCity");
		var city = ($sel.find(":selected").text());
		if (city != "All") {
			city = city.substring(0, city.indexOf(","));
			params += "&city=" + city;
		}
		if ($("#kwds").val() != "") {
			location.href = "/results-general?" + params;
		} else {
			location.href = "/results-date?" + params;
		}
		return false;
	});
	$("#sdate").datepicker({
		minDate: 0,
		onSelect: function (selected) {
			$("#edate").datepicker("option", "minDate", selected)
		}
	});
	$("#edate").datepicker({
		minDate: 0,
		onSelect: function (selected) {
			$("#sdate").datepicker("option", "maxDate", selected)
		}
	});
	var myDate = new Date();
	$("#sdate").datepicker('setDate', myDate);
	myDate.setDate(myDate.getDate() + 7);
	$("#edate").datepicker('setDate', myDate);
	$("#customSearchLink").click(function () {
		$("#customSearchPanel").slideToggle();
		$(this).find("i").toggleClass("fa fa-search-plus").toggleClass("fa fa-search-minus");
		return false;
	});


	$("#searchForm").submit(function (e) {
		if ($(this).find("input").val().trim().length < 2) {
			e.preventDefault()
		}
	});
});
