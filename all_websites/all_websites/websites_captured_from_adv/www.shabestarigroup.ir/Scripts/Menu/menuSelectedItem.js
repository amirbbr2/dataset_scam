$(function () {
    var pathname=window.location.pathname;
    var selectedLi=$(".menuRootUl a[href='"+decodeURI(pathname)+"']").closest("li");
    selectedLi.addClass("selected");
    selectedLi.parents("li").addClass("selectedParents");
    $(".menuRootUl li").click(function () {
        var link=$(">a",this).attr("href");
        if(link!="#") {
            $(this).addClass("selecting");
        }
    });
});