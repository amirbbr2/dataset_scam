document.addEventListener("DOMContentLoaded", function () {
	var showAllEvents = document.getElementById("showAllEvents");
	if (showAllEvents) {
		showAllEvents.querySelector("a").addEventListener("click", function (e) {
			showAllEvents.parentElement.style.maxHeight = "initial";
			showAllEvents.style.display = "none";
			e.preventDefault();
		});
	}
});