document.addEventListener("DOMContentLoaded", function () {
	var hamburgerIcon = document.getElementById("hamburgerIcon");
	var mainNav = document.getElementById("mainNav");
	if (hamburgerIcon && mainNav) {
		hamburgerIcon.addEventListener("click", function (e) {
			if (mainNav.style.display === "block") {
				mainNav.style.display = "";
			} else {
				mainNav.style.display = "block";
			}
			e.preventDefault();
		});
		window.addEventListener("resize", function () {
			mainNav.style.display = "";
		});
	}
	var searchForm = document.getElementById("searchForm");
	if (searchForm) {
		searchForm.addEventListener("submit", function (e) {
			if (searchForm.querySelector("input").value.length < 2) {
				e.preventDefault();
			}
		});
	}
	var locationPanel = document.getElementById("locationPanel");
	if (locationPanel) {
		document.addEventListener("click", function (e) {
			var clickInsideLocationPanel = locationPanel.contains(e.target);
			if (!clickInsideLocationPanel) {
				if (locationPanel.style.display === 'block') {
					$("#locationPanel").slideToggle();
				}
			}
		});
	}
});