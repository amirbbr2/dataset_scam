$(function () {
    $(".menuRootUl ul").each(function () {
        var maxWidth = 0;
        var statusiconWidth = 0;
        $(">li>a .menuTitle", this).each(function () {
            maxWidth = Math.max(maxWidth, $(this).actual('width', { display: 'inline' }));
        });
        $(">li .statusicon", this).each(function () {
            statusiconWidth = Math.max(statusiconWidth, $(this).actual('width'));
        });
        var liFloat = $(">li:eq(0)", this).css("float");
        var padding = $(">li .menuTitleContainer:eq(0)", this).css("padding-" + liFloat);
        var extraWidth = 2 * parseInt(padding);
        var newWidth = maxWidth + extraWidth + statusiconWidth;
        var diffWidth = $(this).actual('width') - newWidth;
        $(">li", this).width(newWidth);
        $(">li>ul", this).css("margin-" + liFloat, function (index, value) {
            return parseInt(value) - diffWidth;
        });
        $(this).width(newWidth);
    });
    $(".menuRootUl>li").each(function () {
        var liFloat = $(this).css("float");
        if (liFloat != 'none') {
            var liWidth = $(".menuTitle", this).width();
            var statusiconWidth=$(".statusicon",this).width();
            var padding = $(".menuTitleContainer", this).css("padding-" + liFloat);
            var extraWidth = 2 * parseInt(padding);
            var newWidth = liWidth + extraWidth + statusiconWidth;
            $(this).width(newWidth);
        }
    });
});