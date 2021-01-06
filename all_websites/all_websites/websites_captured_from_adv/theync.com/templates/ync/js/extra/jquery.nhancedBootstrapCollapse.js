/**
 * Plugin for collapsing elements
 * http://nhance.pl
 * 1.8v
 */

function nhancedBootstrapCollapse(options) {
    var defaults = {
        trigger: "#nav-trigger", // trigger element
        target: "#main-nav", // target element
        anywhereClose: true, // if clicked anywhere -true: close, false:nothing
        anywhereCloseBlockingElement: "target", // when clicked this area, target won't be closed
        anywhereCloseBlockingMaxRes: false, // or when to start unblocking click
        area: "body",
        ajaxLinks: false,
        area_class: "main-nav-open", // class added to body when element is active
        trigger_active_class: "active", // class added to trigger when active
        target_hidden_class: "hidden", // class when element is hidden
        collapse_class: "collapse",
        ex_class3: "in",
        maxRes: false, // class when element is hidden
        debug: false, // wlacz debugowanie
        preventD: true,
        defaultOpen: false,
        cookie: false,
        cookieName: "yourCookieName",
        cookieValTrue: "open",
        cookieValFalse: "closed",
        cookieDomain: false,
        onTriggerClick: function () {
        },
        onAreaClick: function () {
        }
    };
    var opt = $.extend(true, {}, defaults, options);


    // CHECK IF ELEMENT IS CLICKED OBJECT
    function objCheck(checkObject, clickedElement) {
        var check = false;
        if (checkObject[0] == "#") {
            if ($(clickedElement.target).parents(checkObject).length != 0 || $(clickedElement.target).attr("id") == checkObject.substring(1)) {
                check = true;
            }
        } else {
            if ($(clickedElement.target).parents(checkObject).length != 0 || $(clickedElement.target).hasClass(checkObject.substring(1)) == true) {
                check = true;
            }
        }
        return check;
    }


    // HIDE ON CLICK ANYWHERE
    function bodyClose() {
        function h() {
            $(opt.trigger).removeClass(opt.trigger_active_class); // remove TRIGGER CLASS
            $(opt.area).removeClass(opt.area_class); // remove BODY CLASS
            $(opt.target).collapse('hide'); // fire BOOTSTRAP EVENT  COLLAPSE HIDE
            // unset cookie if is set
            cookieSetValue();
            opt.onAreaClick.call($(opt.trigger));
        }

        if (opt.anywhereClose) {
            var b = opt.anywhereCloseBlockingElement;
            if (opt.anywhereCloseBlockingElement == "target") {
                b = opt.target
            }
            $("body").on("touchend click", function (e) {
                if (!objCheck(b, e) && !objCheck(opt.trigger, e)) {
                    if (opt.anywhereCloseBlockingMaxRes) {
                        if (ww() <= opt.anywhereCloseBlockingMaxRes) {
                            h();
                        }
                    } else {
                        h();
                    }
                }
            });
        }
    }

    // FUNCTION RANDOM NUMBER 
    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // FUNCTION WINDOW WIDTH
    function ww() {
        return $(window).width();
    }

    // FUNCTION DEBUG FUNCTION
    function debug(init, string) {
        if (init == true) {
            console.log(string);
        }
    }

    // FUNCTION CHANGE COOKIE VALUES
    function cookieSetValue() {
        if (opt.cookie) {
            if ($(opt.area).hasClass(opt.area_class)) {
                $.cookie(opt.cookieName, opt.cookieValFalse, {domain: opt.cookieDomain, path: '/'});
            } else {
                $.cookie(opt.cookieName, opt.cookieValTrue, {domain: opt.cookieDomain, path: '/'});
            }
        }
    }

    // FUNCTION BOOTSTRAP EVENTS
    function addEventsClasses() {
        $(opt.target).on("hidden.bs.collapse", function () {
            //$(this).addClass(opt.target_hidden_class);
            debug(opt.debug, "Target - add class:" + opt.target_hidden_class);
        });
        $(opt.target).on("show.bs.collapse", function () {
            //$(this).removeClass(opt.target_hidden_class);
            debug(opt.debug, "Target - remove class:" + opt.target_hidden_class);
        });
    }

    // FUNCTION BUTTON ACTIONS WHEN IS CLICKED
    function buttonActions() {



        $(opt.trigger).each(function () {
            if ($(this).hasClass(opt.trigger_active_class)) {
                $(this).removeClass(opt.trigger_active_class).addClass("collapsed");
                $(opt.target).collapse('hide').attr("aria-expanded", "false").css("height", "0");
                $(opt.area).removeClass(opt.area_class);
            } else {
                $(opt.target).collapse('show');
                $(this).addClass(opt.trigger_active_class).removeClass("collapsed");
                $(opt.area).addClass(opt.area_class);

            }
            // SET COOKIE VALUE
            cookieSetValue();
        });

    }

    // FUNCTION DEFAULT - OPEN/CLOSE
    function onStartOpen() {
        if (opt.defaultOpen) {
            $(opt.target).collapse('show');
            $(opt.trigger).addClass(opt.trigger_active_class);
            $(opt.area).addClass(opt.area_class);
            // SET COOKIE VALUE
            cookieSetValue();
        }
    }

    // SET BOOTSTRAP MANDATORY CLASSES TO TARGET ELEMENT
    function setInitialClassToTarget() {
        if (opt.maxRes) {
            if (ww() < opt.maxRes) {
                if (!$(opt.target).hasClass(opt.collapse_class)) {
                    //$(opt.trigger).removeClass(opt.target_hidden_class);
                    $(opt.target).addClass(opt.collapse_class).attr("aria-expanded", "false").css("height", "0");//.addClass(opt.target_hidden_class);
                    $(opt.trigger).removeClass("hidden");
                } else {
                    //$(opt.trigger).addClass("hidden");
                }
            } else {
                $(opt.trigger).addClass(opt.target_hidden_class);
            }
        } else {
            if (!$(opt.target).hasClass(opt.collapse_class)) {
                $(opt.target).addClass(opt.collapse_class);//.addClass(opt.target_hidden_class);
            }
        }
    }

    // DESTROY ALL KLASSES
    function reset_nbc() {
        $(opt.target).removeClass(opt.trigger_active_class); // to chyba jest zle...
        $(opt.area).removeClass(opt.area_class);
        $(opt.target).removeClass(opt.collapse_class).removeClass(opt.ex_class3).removeAttr("aria-expanded").css("height", "");//.removeClass(opt.target_hidden_class);
        $(opt.trigger).removeClass(opt.trigger_active_class);
    }

    // CHECK IF COOKIE IS SET AND ADD VALUES
    if (opt.cookie) {
        if ($.cookie(opt.cookieName) == opt.cookieValFalse) {
            $(opt.trigger).removeClass(opt.trigger_active_class);
            $(opt.area).removeClass(opt.area_class);
        }
    }

    // CHECK IF BODY OR BTN HAS ACTIVE CLASS
    if ($(opt.area).hasClass(opt.area_class) || $(opt.trigger).hasClass(opt.trigger_active_class)) {
        $(opt.trigger).addClass(opt.trigger_active_class);
        $(opt.area).addClass(opt.area_class);
    }

    // IF TARGET IS DEFINED AND IF RES IS OK, ADD BOOTSTRAP CLASSES
    if (opt.target) {
        if (opt.maxRes) {
            if (opt.maxRes < ww()) {
                addEventsClasses();
            }
        } else {
            addEventsClasses();
        }
    }


    // BUTTON ACTION

    if (opt.ajaxLinks) {
        $(document).on("touchend click", opt.trigger, function (e) {

            // detect prevent default
            if (opt.preventD) {
                e.preventDefault();
            }

            // check if maxRes is set and check when actions should be triggered
            if (opt.maxRes) {
                if (ww() < opt.maxRes) {
                    buttonActions();
                }
            } else {
                buttonActions();
            }

            opt.onTriggerClick.call($(opt.trigger));

        });
    } else {
        $(opt.trigger).on("touchend click", function (e) {

            // detect prevent default
            if (opt.preventD) {
                e.preventDefault();
            }

            // check if maxRes is set and check when actions should be triggered
            if (opt.maxRes) {
                if (ww() < opt.maxRes) {
                    buttonActions();
                }
            } else {
                buttonActions();
            }

            opt.onTriggerClick.call($(opt.trigger));

        });
    }




    // INITIALIZE FUNCTIONS
    setInitialClassToTarget(); // set mandatory classes to target!
    onStartOpen();
    bodyClose();
    // WHEN RESIZING
    $(window).resize(function () {
        if (opt.maxRes) {
            if ($(window).width() >= opt.maxRes) {
                reset_nbc();
            }
        }
        setInitialClassToTarget();
    });
}