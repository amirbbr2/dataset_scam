function updateCart(removeid = null) {
    displayAjaxLoading(true);
    $.ajax({
        cache: false,
        type: "POST",
        url: "/ExtraAbilityShoppingCart/ExtraUpdateCart",
        data: $("#shopping-cart-form").serialize() !== "" ? ($("#shopping-cart-form").serialize() + "&" + removeid) : removeid,
        success: function (data) {
            
            displayAjaxLoading();
            if (data.redirect) {
                location.href = data.redirect;
                return true;
            }
            AjaxCart.updateproductcart_details(removeid);
            updateTotalOrder('#detail-result', data);
            //$('#detail-result').html(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            displayAjaxLoading();
            alert('Failed to update.');
        }
    });
}
function updateTotalOrder(tag, html) {
    $.ajax({
        url: "/ExtraAbilityShoppingCart/OrderTotals",
        type: "POST",
        data: {},
        success: function (data) {
            displayAjaxLoading();
            $('#ordertotals-result').html(data);
            $(tag).html(html);
        },
        error: function () {
            alert("An error has occured!!!");
        }
    });
}
function addCoupon() {
    $.ajax({
        url: "/ExtraAbilityShoppingCart/ApplyCard",
        type: "POST",
        data: {
            couponcode: $('#giftcardcouponcode').val()
        },
        success: function (data) {
            
            displayAjaxLoading();
            updateTotalOrder('#card-result', data.Html);
            //$('#card-result').html(data.Html);
        },
        error: function () {
            alert("An error has occured!!!");
        }
    });
}
function removeCoupon(code, id, type) {
    $.ajax({
        url: "/ExtraAbilityShoppingCart/RemoveCoupon",
        type: "POST",
        data: {
            id: id,
            type: type
        },
        success: function (data) {
            
            displayAjaxLoading();
            updateTotalOrder('#card-result', data.Html);
            //$('#card-result').html(data.Html);
        },
        error: function () {
            alert("An error has occured!!!");
        }
    });
}
function showLi(ul, select) {
    
    $('#' + ul + '>li').attr("style", "display:none");
    $('#' + $('#' + select).val().replace(".", "_")).attr("style", "display:block");
}
function setAddress(billingaddressid) {
     $('#billing-address-select').val(billingaddressid);
}

function continueShopping(isGuest) {
    
    if (isGuest.toLowerCase() === 'true') {
        location.href = '/Register?returnUrl=/cart';
    }
    else {
        $('.tt-shopcart-col').show();
        $('#btnContinueShopping').hide();
    }
}