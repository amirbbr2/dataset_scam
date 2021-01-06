/// <reference path="jquery-1.7.2-vsdoc.js" />
/// <reference path="jquery.autocomplete-min.js" />

$(function () {
    $("#tbACSearch").autocomplete({
        serviceUrl: '/SearchAutoComplete.ashx',
        minChars: 2,
        direction: $("#tbACSearch").data("dir"),
        // callback function:
        onSelect: function (value, data) {
            //window.location = data;
            window.location = encodeURI(data.link);
        },
        onEnterPressed: function (value) {
            $("#bACSearch").click();
        }
    });
})