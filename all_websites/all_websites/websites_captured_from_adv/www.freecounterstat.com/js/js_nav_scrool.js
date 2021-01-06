var navfix = document.getElementById("navfix");

window.onscroll = function () {
mustIShowSticky()
};

function mustIShowSticky() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
navfix.classList.add("menu-navfix-show");
} else {
navfix.classList.remove("menu-navfix-show");
}
}