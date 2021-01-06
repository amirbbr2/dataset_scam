$( document ).ready(function() {

    var inputClass    = 'input-item';
    var fileClass     = 'file-item';

    var file_Upload_1 = 'my_upload_1';
    var file_Upload_2 = 'my_upload_2';

    validType = ['zip', 'rar', 'cdr', 'jpeg', 'jpg', 'pdf', 'tiff', 'tif', 'png'];


    $('#add-orders').click(function () {

        var checkValidate_all = checkValidate(inputClass);
        var checkValidateFile_1 = checkValidateFile(file_Upload_1);
        var checkValidateFile_2 = checkValidateFile(file_Upload_2);

        if( checkValidate_all && checkValidateFile_1 && checkValidateFile_2 ){
            file_Upload (file_Upload_1, file_Upload_2, inputClass);
        }
    });

    $('.'+inputClass).change(function () {
        if ($(this).hasClass("required") && $(this).val() == "") {
            $(this).addClass("error");
        } else {
            $(this).removeClass("error");
            $(this).addClass("valid");
        }
    });

    $('.'+fileClass).change(function () {

        var get_ID = $(this).attr('id');
        var get_FileInput = $(this);

        $(".file-message").removeClass('error-color');
        $("label[for='"+get_ID+"']").removeClass("broken");
        $("label[for='"+get_ID+"']").removeClass("uploaded");

        if( get_FileInput.length != 0){

            if( get_FileInput.get(0).files.length != 0 ){

                var fileName = get_FileInput.get(0).files[0].name;
                var fileExt  = fileName.substr(fileName.lastIndexOf('.') + 1);

                if ($.inArray(fileExt, validType) == -1){
                    $("label[for='"+get_ID+"']").addClass("broken");
                    $("label[for='"+get_ID+"']").removeClass("uploaded");

                    //message alert
                    fileAlertMsg(false);

                }else{
                    $("label[for='"+get_ID+"']").addClass("uploaded");
                    $("label[for='"+get_ID+"']").removeClass("broken");

                    //message alert
                    fileAlertMsg(true);
                }

                console.log("files selected");

                $("small[data-id='"+get_ID+"']").show();

            }else{
                console.log("no files selected");

                $("small[data-id='"+get_ID+"']").hide();
            }
        }
    });

    $('.clear-file').click(function () {
        var fileID = $(this).attr('data-id');
        $("#"+fileID).val('');

        $("label[for='"+fileID+"']").removeClass("uploaded");
        $("label[for='"+fileID+"']").removeClass("broken");
        $("label[for='"+fileID+"']").removeClass("error");

        //message alert
        fileAlertMsg(true);

        $("small[data-id='"+fileID+"']").hide();
    });

});

function fileAlertMsg(status) {

    if(status){

        var temp_price = $('#temp-price').val();

        $(".file-message").removeClass('error-color');
        //message alert
        $('.form-message').empty();
        $('.form-message').removeClass('alert-danger');
        $('.form-message').addClass('alert-success');

        if(temp_price == ""){
            $('.form-message').html("<strong>سفارش خود را از طریق فرم زیر برای ما ارسال نمایید.</strong>");
        }else{
            $('.form-message').html(temp_price);
        }

    }else{
        $(".file-message").addClass('error-color');
        //message alert
        $('.form-message').empty();
        $('.form-message').removeClass('alert-success');
        $('.form-message').addClass('alert-danger');
        $('.form-message').html("<strong>تنها قادر به بارگذاری پسوند های مجاز هستید.</strong>");
    }
}

function checkValidate(className) {
    var isValid  = true;
    var getClass = $("."+className);

    if(getClass.length) {
        getClass.each(function () {
            if ($(this).hasClass("required") && $(this).val() == "") {
                $(this).addClass("error");
                isValid = false;
            } else {
                $(this).removeClass("error");
                $(this).addClass("valid");
            }
        });
    }

    return isValid;
}

function checkValidateFile(idName) {

    var get_FileInput = $("#"+idName);

    var isValid = ( get_FileInput.hasClass("required") )? false : true;

    if( get_FileInput.length != 0){
        if( get_FileInput.get(0).files.length != 0 ){
            var fileName = get_FileInput.get(0).files[0].name;
            var fileExt  = fileName.substr(fileName.lastIndexOf('.') + 1);

            if ($.inArray(fileExt, validType) == -1){
                isValid = false;

                //message alert
                fileAlertMsg(false);
            }else{
                isValid = true;

                //message alert
                fileAlertMsg(true);
            }

        }else{
            if (get_FileInput.hasClass("required")){
                isValid = false;

                //message alert
                fileAlertMsg(true);

                set_RedBorder(idName);
            }
        }

    }

    return isValid;
}

function file_Upload (file_input_1, file_input_2, inputClass) {

    $('.myprogress').css('width', '0');

    $('.form-message').empty();
    $('.form-message').removeClass('alert-danger');
    $('.form-message').addClass('alert-success');
    $('.form-message').html("<strong>صبر نمایید ...</strong>");

    //Start get value form's inputs
    //------------------------------------

    var formData = new FormData();

    //console.log(formData);

    //formData.append('file_Upload', $('#file_Upload')[0].files[0]); //For single file

    if( $('#'+file_input_1).length != 0) {
        var ins = document.getElementById(file_input_1).files.length;
        for (var x = 0; x < ins; x++) {
            formData.append(file_input_1, document.getElementById(file_input_1).files[x]);
            //For array file send
            //formData.append(file_input_1 + "[]", document.getElementById(file_input_1).files[x]);
        }
    }

    if( $('#'+file_input_2).length != 0) {
        var ins = document.getElementById(file_input_2).files.length;
        for (var x = 0; x < ins; x++) {
            formData.append(file_input_2, document.getElementById(file_input_2).files[x]);
            //For array file send
            //formData.append(file_input_2 + "[]", document.getElementById(file_input_2).files[x]);
        }
    }

    //Get all element

    //wp_nonce
    if( $('#form_order_var').length != 0) {
        formData.append( "wp_nonce[name]", 'NoSet' );
        formData.append( "wp_nonce[value]", $('#form_order_var').val() );
    }

    $("."+inputClass).each(function(){
        var inputName  = $(this).attr('id');
        var inputValue = $(this).val();

        if($("label[for='"+inputName+"']").length != 0) {
            var labelName = $("label[for='" + inputName + "']").text();
        }else{
            var labelName = 'NoSet';
        }

        formData.append(inputName+"[name]", labelName);
        formData.append(inputName+"[value]", inputValue);

        //Or single variable (not array)
        // formData.append(inputName, labelName+divider+inputValue);
    });

    //formData.append('orderService', "Reza");

    //End get value form's inputs
    //------------------------------------

    $.ajax({

        url: ajax_url,
        data: formData,
        processData: false,
        contentType: false,
        type: 'post',

        beforeSend : function () {

            $('#add-orders').attr('disabled', 'disabled');

            if( $('#'+file_input_1).length != 0) {
                $('#'+file_input_1).attr('disabled', 'disabled');
            }

            if( $('#'+file_input_2).length != 0) {
                $('#'+file_input_2).attr('disabled', 'disabled');
            }

            $('.form-progress').removeClass('hidden');

        },

        // this part is progress bar
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    $('.myprogress').text(percentComplete + '%');
                    $('.myprogress').css('width', percentComplete + '%');
                }
            }, false);
            return xhr;
        },

        success: function (data) {

            if( $('#'+file_input_1).length != 0) {
                $('#'+file_input_1).removeAttr("disabled");
            }
            if( $('#'+file_input_2).length != 0) {
                $('#'+file_input_2).removeAttr("disabled");
            }

            $('.form-message').empty();

            var json = $.parseJSON(data); // create an object with the key of the array //alert(json.b);

            if(json.status == 'yes'){

                $('.order-form').empty();
                $('.order-form').fadeOut(1000);
                $('.tick-box').fadeIn(1000);
                $(".trigger").addClass("drawn");

                $('.order-number').html('شماره پیگیری: '+ json.order_number);

            }else{

                $('.form-message').empty();
                $('.form-message').removeClass('alert-success');
                $('.form-message').addClass('alert-danger');

                $.each(json.message, function(keyMsg, valueMsg) {
                    set_RedBorder(keyMsg);
                    $('.form-message').append(valueMsg+'<br>');
                });

                $('#add-orders').removeAttr('disabled');

            }

            /*
            //For JSON array
            $.each(json, function(index, element) {

                //alert(element.index);

                if(element.status == 'no'){
                    $('.form-message').removeClass('alert-success');
                    $('.form-message').addClass('alert-danger');
                    $('.form-message').append(element.o_name+'<br>'+element.msg+'<br><br>');
                }

                //$('.form-message').text(element.msg);

            });
            */

        }

    });
}

//Add comma
function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function set_RedBorder(getID){
    if($("#"+getID).length != 0){
        var type = $("#"+getID).attr("type");

        if(type == 'file'){
            $("label[for='"+getID+"']").addClass("broken");
        }else{
            $("#"+getID).addClass("error");
        }
    }
}
