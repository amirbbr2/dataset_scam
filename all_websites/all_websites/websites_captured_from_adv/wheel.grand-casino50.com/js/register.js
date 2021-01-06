$(document).ready(function () {
    //убираем outline для ie
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') != -1) {
        $('a').focus(function () {
            this.blur();
        });
    }

    //навигация по форме регистрации
    regNaviSlider();

    //обработчики событий
    setHandlers();
});

//байнд событий
function setHandlers() {
    //сабмит формы регистрации
    $('#email').keypress(function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
            submitRegForm();
        }
    });

    //сабмит формы авторизации
    $('#auth_password').keypress(function (e) {
        if (e.keyCode == 13) {
            $(this).blur();
            authUsers();
        }
    });

    //сабмит формы регистрации
    $('#btnSubmit').click(function () {
        submitRegForm();
    });

    //проверка логина на совпадение
    $("input[name='login']").blur(function () {
        var login = $(this).val();
        if (login.length > 2) {
            checkLogin(login);
        }
    });

    //авторизация
    $('#auth_button').on('click', function () {
        authUsers();
    });

    //восстановление пароля
    $('#send_password').on('click', function () {
        remindPassword();
    });

    $('#modal_window_button').on('click', function () {
        $('#modalWin').fadeOut(function () {
            $('#mask').fadeOut();
        });
    });

    //закрытие модального окна
    $(".close").on("click", function () {
        $("#mask").remove()
    });

    //всплывающие подсказки
    $('.jsValid').on("focus blur", function (e) {
        inputTips(e, $(this));
    });

    //проверка полей
    $('.jsValid').on('keypress blur keyup', function (event) {
        validate(event, $(this));
    });

    //скрываенм сообщение
    $('#pass, #rpass').on("focus keyup change", function () {
        $('[error="pass"]').fadeOut();
        $('[error="rpass"]').fadeOut();
    });
}

function regNaviSlider() {
    $('.button-jump').on('click', function () {
        var $this = $(this),
            fromIdGoTo = $this.data('go-to'),
            fromIdCurrent = $this.parents('.from-unit').attr('id');

        $('#' + fromIdCurrent).fadeOut(function () {
            $('#' + fromIdGoTo).fadeIn();
        });
    });
}

function appendStatistics(params) {
    var frag = document.createDocumentFragment(),
        random = Math.ceil(Math.random() * 9999),
        images_src = [
            "http://post.rmbn.net/image_new.php?cid=90&" + random,
            "http://post.rmbn.net/image_new.php?cid=1&" + random,
            "http://post.rmbn.net/image_new.php?cid=121&" + random,
            "https://stats.ssl-services.com/operationCounter.php?referrer=" + params.referrer + "&rand=" + random,
            "http://retarget.ssl-services.com/p/wv.php?shop_id=17&action=enter_category&url=" + params.siteHost
        ];

    for (var i = 0; i < images_src.length; i++) {
        var image = document.createElement("img");
        image.src = images_src[i];
        image.width = 1;
        image.height = 1;
        image.style.position = 'absolute';
        image.style.left = '-9999px';
        frag.appendChild(image);
    }
    document.body.appendChild(frag);
}

//ajax-регистрация юзера
function submitRegForm() {
    var body = $('body'),
        login = $("#login").val(),
        text = 'Подождите, идет проверка введенных данных';

    $("#errorWin, .validError").remove();//удаляем ошибки валидации

    if (!validFormFields()) {
        openModalWin(text, 'ajax');
        $('#modal_window_button, .close').hide();

        $.ajax({
            type: "POST",
            url: "system/ajax/ajaxRegister.php",
            data: $("#regForm").serialize(),
            dataType: "json",
            async: true,
            success: function (data) {
                if (data) {
                    var error = data['error'],
                        safecode = data['safecode'],
                        msg = data['msg'];

                    if (!safecode) {
                        validFormFields(true);
                        openModalWin(msg, 'show');
                    } else if (error) {
                        openModalWin(msg, 'show');
                    } else {
                        $("#regForm input").val('');
                        openModalWin(msg, 'ajax hide');

                        //ставим куку с логином
                        login = encodeURI(login);
                        $.getJSON('//www.azartzona.com/system/login.php?set_cookie&broker=azartzona&login=' + login + '&callback=?');

                        appendStatistics({
                            partner: partner,
                            siteHost: siteHost,
                            httpHost: httpHost,
                            referrer: document.referrer
                        });

                        //редирект на казино
                        setTimeout("window.location = newHost", 2000);
                    }
                } else {
                    openModalWin('Ошибка соединения, попробуйте еще раз.', 'show');
                }
            }
        });
    } else {
        openModalWin('Ошибка заполнения формы регистрации!', 'show');
    }
}

//авторизация
function authUsers() {
    $("#errorWin, .validError").remove();

    var $login = $('#auth_login'),
        $password = $('#auth_password'),
        $login_length = $login.val().length,
        $password_length = $password.val().length,
        err = 0;

    if ($login_length < 3 || $login_length > 10) {
        openErrorTips($login, "Неверный формат");
        err++;
    }
    if ($password_length < 3 || $password_length > 15) {
        openErrorTips($password, "Неверный формат");
        err++;
    }

    if (err == 0) {
        $(".validError").hide();

        openModalWin('Подождите, идет проверка введенных данных', 'ajax hide');
        $('#modal_window_button, .close').hide();

        $.ajax({
            type: "POST",
            url: "system/ajax/authUser.php",
            data: $("#from-authorization .from").serialize(),
            dataType: "html",
            async: true,
            success: function (data) {
                if (data == 'success') {
                    openModalWin('Авторизация прошла успешно, через мгновение Вы перейдете в казино!', 'ajax hide');
                    //редирект на казино
                    setTimeout("window.location = newHost", 2000);
                } else {
                    setTimeout(function () {
                        openModalWin('Неверная комбинация логин / пароль!', 'show');
                    }, 2000);
                }
            }
        });
    }
}

//восстановление пароля
function remindPassword() {
    var login = $('#rem_pass_login'),
        email = $('#rem_pass_email'),
        rexpEmail = /^([\w-]+(?:\.+[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        err = 0;

    if (login.val() == "") {
        openErrorTips(login, "Введите логин.");
        err++;
    }

    if (email.val() == "") {
        openErrorTips(email, "Введите e-mail.");
        err++;
    } else if (!rexpEmail.test(email.val())) {
        openErrorTips(email, "Неверный формат e-mail.");
        err++;
    }

    if (err == 0) {
        $(".validError").hide();

        openModalWin('Подождите, идет проверка введенных данных', 'ajax hide');
        $('#modal_window_button, .close').hide();

        $.ajax({
            type: "POST",
            url: "system/ajax/remPass.php",
            data: $("#from-remember .from").serialize(),
            dataType: "html",
            async: true,
            success: function (data) {
                if (data == 'success') {
                    setTimeout(function () {
                        openModalWin('На указанный e-mail отправлено письмо с инструкцией по восстановлению пароля. <br> Перейти в казино?', 'show');
                    }, 2000);
                    $("#from-remember :text").val('');

                    //редирект на казино
                    $('#modal_window_button').click(function () {
                        window.location = newHost;
                    });
                } else {
                    setTimeout(function () {
                        openModalWin(data, 'show');
                    }, 1000);
                }
            }
        });
    }
}

//ф-ия проверки уникальности логина
function checkLogin(val, fork) {
    var returnValue = false;

    if (fork === undefined) {
        fork = true;
    } else {
        fork = false;
    }

    $.ajax({
        type: "POST",
        url: "system/ajax/checkLogin.php",
        data: "login=" + val,
        async: fork,
        success: function (res) {
            if (res) {
                var el = $("input[name='login']");
                openErrorTips(el, res);
            } else {
                returnValue = true;
            }
        }
    });
    return returnValue;
}

//ф-ия проверки валидности полей формы
function validFormFields(invalidVal) {
    var errors = 0,
        rexpEmail = /^([\w-]+(?:\.+[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    //проверяем валидность полей
    $("#from-registration input").each(function () {
        var msg = '',
            err = false,
            $this = $(this),
            field = $this.attr('name'),
            fieldVal = $this.val();

        if (fieldVal == '') {
            msg = 'Обязательно для заполнения';
            err = true;
            errors++;
        } else if (field == 'login') {
            if (fieldVal.length < 3 || fieldVal.length > 10) {
                msg = 'Неверный формат';
                err = true;
                errors++;
            } else if (fieldVal == $("input[name='pass']").val()) {
                msg = 'Логин и пароль не должны совпадать';
                err = true;
                errors++;
            } else if (!checkLogin(fieldVal, false))
                errors++;
        } else if (field == 'pass') {
            if (fieldVal.length < 3 || fieldVal.length > 15) {
                msg = 'Неверный формат';
                err = true;
                errors++;
            }
        } else if (field == 'rpass') {
            if (fieldVal.length < 3 || fieldVal.length > 15) {
                msg = 'Неверный формат';
                err = true;
                errors++;
            } else if (fieldVal !== $("input[name='pass']").val()) {
                msg = 'Пароли не совпадают';
                err = true;
                errors++;
            }
        } else if (field == 'email' && !rexpEmail.test(fieldVal)) {
            msg = 'Неверный формат';
            err = true;
            errors++;
        } else {
            err = false;
        }

        if (err) {
            openErrorTips($this, msg);
        }
    });

    if (errors > 0) {
        return true;
    } else {
        return false;
    }
}

function validate(e, $this) {
    var keynum,
        keychar,
        rexp,
        regexp = {},
        _this = $this.context;

    //создаем обьект с регулярными выражениями для каждого поля
    regexp.login = new RegExp("[^A-Za-zА-я0-9\\_\\-]", "gim");
    regexp.login2 = new RegExp("[^A-Za-zА-я0-9\\_\\-]", "gim");
    regexp.pass = new RegExp("[^A-Za-zА-я0-9\\_\\-]", "gim");
    regexp.pass2 = new RegExp("[^A-Za-zА-я0-9\\_\\-]", "gim");
    regexp.rpass = new RegExp("[^A-Za-zА-я0-9\\_\\-]", "gim");
    regexp.email = new RegExp("[^A-Za-z0-9@\\_\\-\\.]|@@|@.+\\.\\.|\\.@|@\\.|@.*@|^@$|^\\.$", "gim");
    regexp.email2 = new RegExp("[^A-Za-z0-9@\\_\\-\\.]|@@|@.+\\.\\.|\\.@|@\\.|@.*@|^@$|^\\.$", "gim");

    if (window.event) {
        keynum = e.keyCode;
    } else if (e.which) {
        keynum = e.which;
    }

    //заглушка на клавиши Left, Right, Up, Down, Tab, Del, Backspace
    if (((e.keyCode >= 35 && e.keyCode <= 40 || e.keyCode == 46) && e.which == 0) || e.keyCode == 9 || e.keyCode == 8) {
        return true;
    }

    keychar = String.fromCharCode(keynum);
    rexp = regexp[_this.name];

    //обработчик для события keyup, blur
    if (e.type == 'keyup' || e.type == 'blur') {
        if (rexp.test(_this.value)) {
            _this.value = _this.value.replace(rexp, '');
            return true;
        } else {
            return false;
        }
    }

    return !rexp.test(_this.value + keychar);
}

function inputTips(e, $this) {
    $('.validError').fadeOut();
    var tips = {},
        strTips = '',
        objTips = $('.fieldTip'),
        elTop = $this.position().top - 2,
        elName = $this.attr('name');

    tips.login = 'Введите от 3 до 10 символов,<br />формат: A-z, А-я, 0-9, _, -';
    tips.pass = 'Введите от 3 до 15 символов,<br />формат: A-z, А-я, 0-9, _, -';
    tips.rpass = 'Введите те же символы, что </br> и в поле "пароль".';
    tips.email = '<div class="center">' +
                 'Бонус в подарок!</br>По завершению регистрации, на указанную Вами почту будет отправлено ' +
                 'приветственное письмо. Перейдите по ссылке подтверждения в письме, и Вы получите ' +
                 'БЕСПЛАТНЫЙ БОНУС в подарок.' +
                 '</div>' +
                 ' Электронная почта должна иметь формат test@test.com';
    tips.login2 = 'Введите логин, указанный Вами при регистрации';
    tips.pass2 = 'Введите пароль, указанный Вами при регистрации';
    tips.email2 = 'Введите E-mail, указанный Вами при регистрации';
    tips.safecode = 'Необходимо ввести цифры,</br> изображенные на картинке.';

    strTips = tips[elName];

    if ((strTips != undefined) && (strTips != '')) {
        if (e.type == 'focus') {
            //удаляем сообщ. об ошибке валидации
            $("[error='" + $this.attr('name') + "']").remove();

            objTips
                .html(strTips)
                .css({
                    top: elTop + 'px',
                    left: 366.5 + 'px'
                })
                .fadeIn(500);

        } else if (e.type == 'blur') {
            objTips.hide().text('');
        }

    }
}

function openErrorTips($this, msg) {
    var position = $this.position(),
        width = $this.outerWidth(),
        top = position.top - 2,
        left = position.left;

    $('<div class="validError" error="login">' +
        '<span class="log">' + msg + '</span>' +
        '</div>')
        .appendTo($($this).parents('.from-unit'))
        .css({
            left: left + width + 22 + 'px',
            top: top + 'px'
        })
        .fadeIn();
    closeErrorTips();
}

function closeErrorTips() {
    $('.validError').click(function () {
        $(this).fadeOut();
    })
}

/**
 * универсальное окно для вывода информации
 * @param text - текст, выводимый в окне
 * @param option - hide - прячет кнопку / show -показывает кнопку / ajax - показать ajax загрузчик
 */
function openModalWin(text, option) {
    option = option || '';

    $('#modal_window_text').css('height', '');

    $('#mask').fadeIn(function () {

        if (option == 'ajax' || option == 'ajax hide' || option == 'ajax show')
            text += '<div id="ajax_loader"></div>';

        $('#modal_window_text').html(text);
        $('#modalWin').fadeIn();
    });

    if (option == 'hide' || option == 'ajax hide') {
        var height = $('#modal_window_text').height();
        $('#modal_window_button').hide();
        $('#modal_window_text').height(height * 1.4)
    }

    if (option == 'show' || option == 'ajax show') {
        $('#modal_window_button').show();
    }
}

/* ======================================
 coockie and animate
 ======================================= */
function openPlugin() {
    $("#closePlug").click(function () {
        $('.validError span').trigger('click');
        $(".off-canvas-noty").removeClass("show");
        coockie("hide_popup", true, 1);
    });

    if (!coockie("hide_popup")) {
        $(".off-canvas-noty").addClass("show");
        if (resultCheckUser.showtoolbar1 === '0') {
            coockie('hide_popup');
            $(".off-canvas-noty").removeClass("show");
        }
    }

    //Close Plugin panel
    $('#closeBonus').click(function () {
        $('#bonusDL').fadeToggle();
        coockie("hide_popup_bonus", true, 1);
    });
    if (!coockie("hide_popup_bonus")) {
        $('#bonusDL').show();
    }

};

function coockie(key, value, days, path, domain) {
    var expires = new Date(),
        pattern = "(?:; )?" + arguments[0] + "=([^;]*);?",
        regexp = new RegExp(pattern);

    if (key && value !== undefined) {
        var str = key + '=' + encodeURIComponent(value);
        if (days) {
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            str += '; expires=' + expires.toGMTString();
        }
        if (path) {
            str += '; path=' + path;
        }
        if (domain) {
            str += '; domain=' + domain;
        }
        return document.cookie = str;
    } else if (regexp.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
    }
    return false;
}
