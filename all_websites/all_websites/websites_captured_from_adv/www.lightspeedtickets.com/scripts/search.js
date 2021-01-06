document.addEventListener("DOMContentLoaded", function () {
	var searchInput = document.querySelector("#searchInput");
	var searchResultItems = document.getElementsByClassName("search-result-item");
	suggestions.suggesterUrl = document.getElementById("ticketSuggestUrl").value;
	suggestions.suggesterUrlToken = document.getElementById("ticketSuggestUrlToken").value;
	suggestions.searchResults = document.getElementById("searchResults");
	if (document.getElementById("searchPath")) {
		suggestions.baseUrl = "/" + document.getElementById("searchPath").value + "?q=";
	}
	if (searchInput) {
		var container = document.getElementById("top-nav-wrap");
		if (container) {
			searchInput.addEventListener("focus", function () {
				if (window.innerWidth < 740) {
					container.scrollIntoView();
				}
			});
		}
		searchInput.addEventListener("keyup", function (e) {
			if (e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40) {
				if (this.value.trim() !== "") {
					suggestions.query = this.value;
					suggestions.send();
				} else {
					suggestions.searchResults.style.display = "";
				}
			}
		});
		searchInput.addEventListener("keydown", function (e) {
			var selectedItem = getSelectedItem();
			if (e.keyCode === 38) {
				removeSelection();
				if (selectedItem !== 0) {
					selectItem(--selectedItem);
				}
				e.preventDefault();
			} else if (e.keyCode === 40) {
				if (selectedItem !== searchResultItems.length - 1) {
					removeSelection();
					selectItem(++selectedItem);
				}
				e.preventDefault();
			} else if (e.keyCode === 13) {
				if (selectedItem !== -1) {
					window.location = searchResultItems[selectedItem].getAttribute("href");
					suggestions.searchResults.style.display = "none";
					e.preventDefault();
				}
			} else if (e.keyCode === 27) {
				suggestions.searchResults.style.display = "none";
				searchInput.blur();
			}
		});
		window.addEventListener("click", function (e) {
			if (!suggestions.searchResults.contains(e.target)) {
				suggestions.searchResults.style.display = "none";
			}
		});
	}

	function getSelectedItem() {
		for (var i = 0; i < searchResultItems.length; i++) {
			if (searchResultItems[i].className === "search-result-item selected-search-result-item") {
				return i;
			}
		}
		return -1;
	}

	function removeSelection() {
		for (var i = 0; i < searchResultItems.length; i++) {
			searchResultItems[i].className = "search-result-item";
		}
	}

	function selectItem(i) {
		searchResultItems[i].className = "search-result-item selected-search-result-item";
	}
});