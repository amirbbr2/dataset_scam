(function(factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], factory);
    } else if (typeof exports === "object" && typeof require === "function") {
        factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(function($) {
    "use strict";
    var utils = function() {
        return {
            escapeRegExChars: function(value) {
                return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            createNode: function(containerClass) {
                var div = document.createElement("div");
                div.className = containerClass;
                div.style.position = "absolute";
                div.style.display = "none";
                return div;
            }
        };
    }(), keys = {
        ESC: 27,
        TAB: 9,
        RETURN: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };
    function Autocomplete(el, options) {
        var noop = function() {}, that = this, defaults = {
            ajaxSettings: {},
            autoSelectFirst: false,
            appendTo: document.body,
            serviceUrl: null,
            lookup: null,
            onSelect: null,
            width: "auto",
            minChars: 1,
            maxHeight: 300,
            deferRequestBy: 0,
            params: {},
            formatResult: Autocomplete.formatResult,
            delimiter: null,
            zIndex: 9999,
            type: "GET",
            noCache: false,
            onSearchStart: noop,
            onSearchComplete: noop,
            onSearchError: noop,
            preserveInput: false,
            containerClass: "autocomplete-suggestions",
            tabDisabled: false,
            dataType: "text",
            currentRequest: null,
            triggerSelectOnValidInput: true,
            preventBadQueries: true,
            lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
                return suggestion.value.toLowerCase().indexOf(queryLowerCase) !== -1;
            },
            paramName: "query",
            transformResult: function(response) {
                return typeof response === "string" ? $.parseJSON(response) : response;
            },
            showNoSuggestionNotice: false,
            noSuggestionNotice: "No results",
            orientation: "bottom",
            forceFixPosition: false
        };
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {
            selected: "autocomplete-selected",
            suggestion: "autocomplete-suggestion"
        };
        that.hint = null;
        that.hintValue = "";
        that.selection = null;
        that.initialize();
        that.setOptions(options);
    }
    Autocomplete.utils = utils;
    $.Autocomplete = Autocomplete;
    Autocomplete.formatResult = function(suggestion, currentValue) {
        var pattern = "(" + utils.escapeRegExChars(currentValue) + ")";
        return suggestion.value.replace(new RegExp(pattern, "gi"), "<strong>$1</strong>").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;(\/?strong)&gt;/g, "<$1>");
    };
    Autocomplete.prototype = {
        killerFn: null,
        initialize: function() {
            var that = this, suggestionSelector = "." + that.classes.suggestion, selected = that.classes.selected, options = that.options, container;
            that.element.setAttribute("autocomplete", "off");
            that.killerFn = function(e) {
                if ($(e.target).closest("." + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0);
            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);
            container = $(that.suggestionsContainer);
            container.appendTo(options.appendTo);
            if (options.width !== "auto") {
                container.width(options.width);
            }
            container.on("mouseover.autocomplete", suggestionSelector, function() {
                that.activate($(this).data("index"));
            });
            container.on("mouseout.autocomplete", function() {
                that.selectedIndex = -1;
                container.children("." + selected).removeClass(selected);
            });
            container.on("click.autocomplete", suggestionSelector, function() {
                that.select($(this).data("index"));
            });
            that.fixPositionCapture = function() {
                if (that.visible) {
                    that.fixPosition();
                }
            };
            $(window).on("resize.autocomplete", that.fixPositionCapture);
            that.el.on("keydown.autocomplete", function(e) {
                that.onKeyPress(e);
            });
            that.el.on("keyup.autocomplete", function(e) {
                that.onKeyUp(e);
            });
            that.el.on("blur.autocomplete", function() {
                that.onBlur();
            });
            that.el.on("focus.autocomplete", function() {
                that.onFocus();
            });
            that.el.on("change.autocomplete", function(e) {
                that.onKeyUp(e);
            });
            that.el.on("input.autocomplete", function(e) {
                that.onKeyUp(e);
            });
        },
        onFocus: function() {
            var that = this;
            that.fixPosition();
            if (that.options.minChars === 0 && that.el.val().length === 0) {
                that.onValueChange();
            }
        },
        onBlur: function() {
            this.enableKillerFn();
        },
        abortAjax: function() {
            var that = this;
            if (that.currentRequest) {
                that.currentRequest.abort();
                that.currentRequest = null;
            }
        },
        setOptions: function(suppliedOptions) {
            var that = this, options = that.options;
            $.extend(options, suppliedOptions);
            that.isLocal = $.isArray(options.lookup);
            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }
            options.orientation = that.validateOrientation(options.orientation, "bottom");
            $(that.suggestionsContainer).css({
                "max-height": options.maxHeight + "px",
                width: options.width + "px",
                "z-index": options.zIndex
            });
        },
        clearCache: function() {
            this.cachedResponse = {};
            this.badQueries = [];
        },
        clear: function() {
            this.clearCache();
            this.currentValue = "";
            this.suggestions = [];
        },
        disable: function() {
            var that = this;
            that.disabled = true;
            clearInterval(that.onChangeInterval);
            that.abortAjax();
        },
        enable: function() {
            this.disabled = false;
        },
        fixPosition: function() {
            var that = this, $container = $(that.suggestionsContainer), containerParent = $container.parent().get(0);
            if (containerParent !== document.body && !that.options.forceFixPosition) {
                return;
            }
            var orientation = that.options.orientation, containerHeight = $container.outerHeight(), height = that.el.outerHeight(), offset = that.el.offset(), styles = {
                top: offset.top,
                left: offset.left
            };
            if (orientation === "auto") {
                var viewPortHeight = $(window).height(), scrollTop = $(window).scrollTop(), topOverflow = -scrollTop + offset.top - containerHeight, bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);
                orientation = Math.max(topOverflow, bottomOverflow) === topOverflow ? "top" : "bottom";
            }
            if (orientation === "top") {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }
            if (containerParent !== document.body) {
                var opacity = $container.css("opacity"), parentOffsetDiff;
                if (!that.visible) {
                    $container.css("opacity", 0).show();
                }
                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.left -= parentOffsetDiff.left;
                if (!that.visible) {
                    $container.css("opacity", opacity).hide();
                }
            }
            if (that.options.width === "auto") {
                styles.width = that.el.outerWidth() - 2 + "px";
            }
            $container.css(styles);
        },
        enableKillerFn: function() {
            var that = this;
            $(document).on("click.autocomplete", that.killerFn);
        },
        disableKillerFn: function() {
            var that = this;
            $(document).off("click.autocomplete", that.killerFn);
        },
        killSuggestions: function() {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function() {
                if (that.visible) {
                    that.el.val(that.currentValue);
                    that.hide();
                }
                that.stopKillSuggestions();
            }, 50);
        },
        stopKillSuggestions: function() {
            window.clearInterval(this.intervalId);
        },
        isCursorAtEnd: function() {
            var that = this, valLength = that.el.val().length, selectionStart = that.element.selectionStart, range;
            if (typeof selectionStart === "number") {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart("character", -valLength);
                return valLength === range.text.length;
            }
            return true;
        },
        onKeyPress: function(e) {
            var that = this;
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }
            if (that.disabled || !that.visible) {
                return;
            }
            switch (e.which) {
              case keys.ESC:
                that.el.val(that.currentValue);
                that.hide();
                break;

              case keys.RIGHT:
                if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                    that.selectHint();
                    break;
                }
                return;

              case keys.TAB:
                if (that.hint && that.options.onHint) {
                    that.selectHint();
                    return;
                }
                if (that.selectedIndex === -1) {
                    that.hide();
                    return;
                }
                that.select(that.selectedIndex);
                if (that.options.tabDisabled === false) {
                    return;
                }
                break;

              case keys.RETURN:
                if (that.selectedIndex === -1) {
                    that.hide();
                    return;
                }
                that.select(that.selectedIndex);
                break;

              case keys.UP:
                that.moveUp();
                break;

              case keys.DOWN:
                that.moveDown();
                break;

              default:
                return;
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        },
        onKeyUp: function(e) {
            var that = this;
            if (that.disabled) {
                return;
            }
            switch (e.which) {
              case keys.UP:
              case keys.DOWN:
                return;
            }
            clearInterval(that.onChangeInterval);
            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    that.onChangeInterval = setInterval(function() {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        },
        onValueChange: function() {
            var that = this, options = that.options, value = that.el.val(), query = that.getQuery(value);
            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }
            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;
            if (options.triggerSelectOnValidInput && that.isExactMatch(query)) {
                that.select(0);
                return;
            }
            if (query.length < options.minChars) {
                that.hide();
            } else {
                that.getSuggestions(query);
            }
        },
        isExactMatch: function(query) {
            var suggestions = this.suggestions;
            return suggestions.length === 1 && suggestions[0].value.toLowerCase() === query.toLowerCase();
        },
        getQuery: function(value) {
            var delimiter = this.options.delimiter, parts;
            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        },
        getSuggestionsLocal: function(query) {
            var that = this, options = that.options, queryLowerCase = query.toLowerCase(), filter = options.lookupFilter, limit = parseInt(options.lookupLimit, 10), data;
            data = {
                suggestions: $.grep(options.lookup, function(suggestion) {
                    return filter(suggestion, query, queryLowerCase);
                })
            };
            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }
            return data;
        },
        getSuggestions: function(q) {
            var response, that = this, options = that.options, serviceUrl = options.serviceUrl, params, cacheKey, ajaxSettings;
            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;
            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }
            if ($.isFunction(options.lookup)) {
                options.lookup(q, function(data) {
                    that.suggestions = data.suggestions;
                    that.suggest();
                    options.onSearchComplete.call(that.element, q, data.suggestions);
                });
                return;
            }
            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + "?" + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }
            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                that.abortAjax();
                ajaxSettings = {
                    url: serviceUrl,
                    data: params,
                    type: options.type,
                    dataType: options.dataType
                };
                $.extend(ajaxSettings, options.ajaxSettings);
                that.currentRequest = $.ajax(ajaxSettings).done(function(data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data, q);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        },
        isBadQuery: function(q) {
            if (!this.options.preventBadQueries) {
                return false;
            }
            var badQueries = this.badQueries, i = badQueries.length;
            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }
            return false;
        },
        hide: function() {
            var that = this, container = $(that.suggestionsContainer);
            if ($.isFunction(that.options.onHide) && that.visible) {
                that.options.onHide.call(that.element, container);
            }
            that.visible = false;
            that.selectedIndex = -1;
            clearInterval(that.onChangeInterval);
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        },
        suggest: function() {
            if (this.suggestions.length === 0) {
                if (this.options.showNoSuggestionNotice) {
                    this.noSuggestions();
                } else {
                    this.hide();
                }
                return;
            }
            var that = this, options = that.options, groupBy = options.groupBy, formatResult = options.formatResult, value = that.getQuery(that.currentValue), className = that.classes.suggestion, classSelected = that.classes.selected, container = $(that.suggestionsContainer), noSuggestionsContainer = $(that.noSuggestionsContainer), beforeRender = options.beforeRender, html = "", category, formatGroup = function(suggestion, index) {
                var currentCategory = suggestion.data[groupBy];
                if (category === currentCategory) {
                    return "";
                }
                category = currentCategory;
                return '<div class="autocomplete-group"><strong>' + category + "</strong></div>";
            };
            if (options.triggerSelectOnValidInput && that.isExactMatch(value)) {
                that.select(0);
                return;
            }
            $.each(that.suggestions, function(i, suggestion) {
                if (groupBy) {
                    html += formatGroup(suggestion, value, i);
                }
                html += '<div class="' + (PAKB.category ? "autocomplete-with-category " : "") + className + '" data-index="' + i + '"><span class="' + suggestion.icon + '"></span> ' + formatResult(suggestion, value) + "</div>";
            });
            this.adjustContainerWidth();
            noSuggestionsContainer.detach();
            container.html(html);
            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }
            that.fixPosition();
            container.show();
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.scrollTop(0);
                container.children("." + className).first().addClass(classSelected);
            }
            that.visible = true;
            that.findBestHint();
        },
        noSuggestions: function() {
            var that = this, container = $(that.suggestionsContainer), noSuggestionsContainer = $(that.noSuggestionsContainer);
            this.adjustContainerWidth();
            noSuggestionsContainer.detach();
            container.empty();
            container.append(noSuggestionsContainer);
            that.fixPosition();
            container.show();
            that.visible = true;
        },
        adjustContainerWidth: function() {
            var that = this, options = that.options, width, container = $(that.suggestionsContainer);
            if (options.width === "auto") {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
        },
        findBestHint: function() {
            var that = this, value = that.el.val().toLowerCase(), bestMatch = null;
            if (!value) {
                return;
            }
            $.each(that.suggestions, function(i, suggestion) {
                var foundMatch = suggestion.value.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });
            that.signalHint(bestMatch);
        },
        signalHint: function(suggestion) {
            var hintValue = "", that = this;
            if (suggestion) {
                hintValue = that.currentValue + suggestion.value.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        },
        verifySuggestionsFormat: function(suggestions) {
            if (suggestions.length && typeof suggestions[0] === "string") {
                return $.map(suggestions, function(value) {
                    return {
                        value: value,
                        data: null
                    };
                });
            }
            return suggestions;
        },
        validateOrientation: function(orientation, fallback) {
            orientation = $.trim(orientation || "").toLowerCase();
            if ($.inArray(orientation, [ "auto", "bottom", "top" ]) === -1) {
                orientation = fallback;
            }
            return orientation;
        },
        processResponse: function(result, originalQuery, cacheKey) {
            var that = this, options = that.options;
            result.suggestions = that.verifySuggestionsFormat(result.suggestions);
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }
            that.suggestions = result.suggestions;
            that.suggest();
        },
        activate: function(index) {
            var that = this, activeItem, selected = that.classes.selected, container = $(that.suggestionsContainer), children = container.find("." + that.classes.suggestion);
            container.find("." + selected).removeClass(selected);
            that.selectedIndex = index;
            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }
            return null;
        },
        selectHint: function() {
            var that = this, i = $.inArray(that.hint, that.suggestions);
            that.select(i);
        },
        select: function(i) {
            var that = this;
            that.hide();
            that.onSelect(i);
        },
        moveUp: function() {
            var that = this;
            if (that.selectedIndex === -1) {
                return;
            }
            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }
            that.adjustScroll(that.selectedIndex - 1);
        },
        moveDown: function() {
            var that = this;
            if (that.selectedIndex === that.suggestions.length - 1) {
                return;
            }
            that.adjustScroll(that.selectedIndex + 1);
        },
        adjustScroll: function(index) {
            var that = this, activeItem = that.activate(index);
            if (!activeItem) {
                return;
            }
            var offsetTop, upperBound, lowerBound, heightDelta = $(activeItem).outerHeight();
            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;
            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }
            if (!that.options.preserveInput) {
                that.el.val(that.getValue(that.suggestions[index].value));
            }
            that.signalHint(null);
        },
        onSelect: function(index) {
            var that = this, onSelectCallback = that.options.onSelect, suggestion = that.suggestions[index];
            that.currentValue = that.getValue(suggestion.value);
            if (that.currentValue !== that.el.val() && !that.options.preserveInput) {
                that.el.val(that.currentValue);
            }
            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;
            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        },
        getValue: function(value) {
            var that = this, delimiter = that.options.delimiter, currentValue, parts;
            if (!delimiter) {
                return value;
            }
            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);
            if (parts.length === 1) {
                return value;
            }
            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        },
        dispose: function() {
            var that = this;
            that.el.off(".autocomplete").removeData("autocomplete");
            that.disableKillerFn();
            $(window).off("resize.autocomplete", that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };
    $.fn.autocomplete = $.fn.devbridgeAutocomplete = function(options, args) {
        var dataKey = "autocomplete";
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }
        return this.each(function() {
            var inputElement = $(this), instance = inputElement.data(dataKey);
            if (typeof options === "string") {
                if (instance && typeof instance[options] === "function") {
                    instance[options](args);
                }
            } else {
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
});

(function($, window, document) {
    var pluginName = "tooltipster", defaults = {
        animation: "fade",
        arrow: true,
        arrowColor: "",
        autoClose: true,
        content: null,
        contentAsHTML: false,
        contentCloning: true,
        debug: true,
        delay: 200,
        minWidth: 0,
        maxWidth: null,
        functionInit: function(origin, content) {},
        functionBefore: function(origin, continueTooltip) {
            continueTooltip();
        },
        functionReady: function(origin, tooltip) {},
        functionAfter: function(origin) {},
        hideOnClick: false,
        icon: "(?)",
        iconCloning: true,
        iconDesktop: false,
        iconTouch: false,
        iconTheme: "tooltipster-icon",
        interactive: false,
        interactiveTolerance: 350,
        multiple: false,
        offsetX: 0,
        offsetY: 0,
        onlyOne: false,
        position: "top",
        positionTracker: false,
        positionTrackerCallback: function(origin) {
            if (this.option("trigger") == "hover" && this.option("autoClose")) {
                this.hide();
            }
        },
        restoration: "current",
        speed: 350,
        timer: 0,
        theme: "tooltipster-default",
        touchDevices: true,
        trigger: "hover",
        updateAnimation: true
    };
    function Plugin(element, options) {
        this.bodyOverflowX;
        this.callbacks = {
            hide: [],
            show: []
        };
        this.checkInterval = null;
        this.Content;
        this.$el = $(element);
        this.$elProxy;
        this.elProxyPosition;
        this.enabled = true;
        this.options = $.extend({}, defaults, options);
        this.mouseIsOverProxy = false;
        this.namespace = "tooltipster-" + Math.round(Math.random() * 1e5);
        this.Status = "hidden";
        this.timerHide = null;
        this.timerShow = null;
        this.$tooltip;
        this.options.iconTheme = this.options.iconTheme.replace(".", "");
        this.options.theme = this.options.theme.replace(".", "");
        this._init();
    }
    Plugin.prototype = {
        _init: function() {
            var self = this;
            if (document.querySelector) {
                var initialTitle = null;
                if (self.$el.data("tooltipster-initialTitle") === undefined) {
                    initialTitle = self.$el.attr("title");
                    if (initialTitle === undefined) initialTitle = null;
                    self.$el.data("tooltipster-initialTitle", initialTitle);
                }
                if (self.options.content !== null) {
                    self._content_set(self.options.content);
                } else {
                    self._content_set(initialTitle);
                }
                var c = self.options.functionInit.call(self.$el, self.$el, self.Content);
                if (typeof c !== "undefined") self._content_set(c);
                self.$el.removeAttr("title").addClass("tooltipstered");
                if (!deviceHasTouchCapability && self.options.iconDesktop || deviceHasTouchCapability && self.options.iconTouch) {
                    if (typeof self.options.icon === "string") {
                        self.$elProxy = $('<span class="' + self.options.iconTheme + '"></span>');
                        self.$elProxy.text(self.options.icon);
                    } else {
                        if (self.options.iconCloning) self.$elProxy = self.options.icon.clone(true); else self.$elProxy = self.options.icon;
                    }
                    self.$elProxy.insertAfter(self.$el);
                } else {
                    self.$elProxy = self.$el;
                }
                if (self.options.trigger == "hover") {
                    self.$elProxy.on("mouseenter." + self.namespace, function() {
                        if (!deviceIsPureTouch() || self.options.touchDevices) {
                            self.mouseIsOverProxy = true;
                            self._show();
                        }
                    }).on("mouseleave." + self.namespace, function() {
                        if (!deviceIsPureTouch() || self.options.touchDevices) {
                            self.mouseIsOverProxy = false;
                        }
                    });
                    if (deviceHasTouchCapability && self.options.touchDevices) {
                        self.$elProxy.on("touchstart." + self.namespace, function() {
                            self._showNow();
                        });
                    }
                } else if (self.options.trigger == "click") {
                    self.$elProxy.on("click." + self.namespace, function() {
                        if (!deviceIsPureTouch() || self.options.touchDevices) {
                            self._show();
                        }
                    });
                }
            }
        },
        _show: function() {
            var self = this;
            if (self.Status != "shown" && self.Status != "appearing") {
                if (self.options.delay) {
                    self.timerShow = setTimeout(function() {
                        if (self.options.trigger == "click" || self.options.trigger == "hover" && self.mouseIsOverProxy) {
                            self._showNow();
                        }
                    }, self.options.delay);
                } else self._showNow();
            }
        },
        _showNow: function(callback) {
            var self = this;
            self.options.functionBefore.call(self.$el, self.$el, function() {
                if (self.enabled && self.Content !== null) {
                    if (callback) self.callbacks.show.push(callback);
                    self.callbacks.hide = [];
                    clearTimeout(self.timerShow);
                    self.timerShow = null;
                    clearTimeout(self.timerHide);
                    self.timerHide = null;
                    if (self.options.onlyOne) {
                        $(".tooltipstered").not(self.$el).each(function(i, el) {
                            var $el = $(el), nss = $el.data("tooltipster-ns");
                            $.each(nss, function(i, ns) {
                                var instance = $el.data(ns), s = instance.status(), ac = instance.option("autoClose");
                                if (s !== "hidden" && s !== "disappearing" && ac) {
                                    instance.hide();
                                }
                            });
                        });
                    }
                    var finish = function() {
                        self.Status = "shown";
                        $.each(self.callbacks.show, function(i, c) {
                            c.call(self.$el);
                        });
                        self.callbacks.show = [];
                    };
                    if (self.Status !== "hidden") {
                        var extraTime = 0;
                        if (self.Status === "disappearing") {
                            self.Status = "appearing";
                            if (supportsTransitions()) {
                                self.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-" + self.options.animation + "-show");
                                if (self.options.speed > 0) self.$tooltip.delay(self.options.speed);
                                self.$tooltip.queue(finish);
                            } else {
                                self.$tooltip.stop().fadeIn(finish);
                            }
                        } else if (self.Status === "shown") {
                            finish();
                        }
                    } else {
                        self.Status = "appearing";
                        var extraTime = self.options.speed;
                        self.bodyOverflowX = $("body").css("overflow-x");
                        $("body").css("overflow-x", "hidden");
                        var animation = "tooltipster-" + self.options.animation, animationSpeed = "-webkit-transition-duration: " + self.options.speed + "ms; -webkit-animation-duration: " + self.options.speed + "ms; -moz-transition-duration: " + self.options.speed + "ms; -moz-animation-duration: " + self.options.speed + "ms; -o-transition-duration: " + self.options.speed + "ms; -o-animation-duration: " + self.options.speed + "ms; -ms-transition-duration: " + self.options.speed + "ms; -ms-animation-duration: " + self.options.speed + "ms; transition-duration: " + self.options.speed + "ms; animation-duration: " + self.options.speed + "ms;", minWidth = self.options.minWidth ? "min-width:" + Math.round(self.options.minWidth) + "px;" : "", maxWidth = self.options.maxWidth ? "max-width:" + Math.round(self.options.maxWidth) + "px;" : "", pointerEvents = self.options.interactive ? "pointer-events: auto;" : "";
                        self.$tooltip = $('<div class="tooltipster-base ' + self.options.theme + '" style="' + minWidth + " " + maxWidth + " " + pointerEvents + " " + animationSpeed + '"><div class="tooltipster-content"></div></div>');
                        if (supportsTransitions()) self.$tooltip.addClass(animation);
                        self._content_insert();
                        self.$tooltip.appendTo("body");
                        self.reposition();
                        self.options.functionReady.call(self.$el, self.$el, self.$tooltip);
                        if (supportsTransitions()) {
                            self.$tooltip.addClass(animation + "-show");
                            if (self.options.speed > 0) self.$tooltip.delay(self.options.speed);
                            self.$tooltip.queue(finish);
                        } else {
                            self.$tooltip.css("display", "none").fadeIn(self.options.speed, finish);
                        }
                        self._interval_set();
                        $(window).on("scroll." + self.namespace + " resize." + self.namespace, function() {
                            self.reposition();
                        });
                        if (self.options.autoClose) {
                            $("body").off("." + self.namespace);
                            if (self.options.trigger == "hover") {
                                if (deviceHasTouchCapability) {
                                    setTimeout(function() {
                                        $("body").on("touchstart." + self.namespace, function() {
                                            self.hide();
                                        });
                                    }, 0);
                                }
                                if (self.options.interactive) {
                                    if (deviceHasTouchCapability) {
                                        self.$tooltip.on("touchstart." + self.namespace, function(event) {
                                            event.stopPropagation();
                                        });
                                    }
                                    var tolerance = null;
                                    self.$elProxy.add(self.$tooltip).on("mouseleave." + self.namespace + "-autoClose", function() {
                                        clearTimeout(tolerance);
                                        tolerance = setTimeout(function() {
                                            self.hide();
                                        }, self.options.interactiveTolerance);
                                    }).on("mouseenter." + self.namespace + "-autoClose", function() {
                                        clearTimeout(tolerance);
                                    });
                                } else {
                                    self.$elProxy.on("mouseleave." + self.namespace + "-autoClose", function() {
                                        self.hide();
                                    });
                                }
                                if (self.options.hideOnClick) {
                                    self.$elProxy.on("click." + self.namespace + "-autoClose", function() {
                                        self.hide();
                                    });
                                }
                            } else if (self.options.trigger == "click") {
                                setTimeout(function() {
                                    $("body").on("click." + self.namespace + " touchstart." + self.namespace, function() {
                                        self.hide();
                                    });
                                }, 0);
                                if (self.options.interactive) {
                                    self.$tooltip.on("click." + self.namespace + " touchstart." + self.namespace, function(event) {
                                        event.stopPropagation();
                                    });
                                }
                            }
                        }
                    }
                    if (self.options.timer > 0) {
                        self.timerHide = setTimeout(function() {
                            self.timerHide = null;
                            self.hide();
                        }, self.options.timer + extraTime);
                    }
                }
            });
        },
        _interval_set: function() {
            var self = this;
            self.checkInterval = setInterval(function() {
                if ($("body").find(self.$el).length === 0 || $("body").find(self.$elProxy).length === 0 || self.Status == "hidden" || $("body").find(self.$tooltip).length === 0) {
                    if (self.Status == "shown" || self.Status == "appearing") self.hide();
                    self._interval_cancel();
                } else {
                    if (self.options.positionTracker) {
                        var p = self._repositionInfo(self.$elProxy), identical = false;
                        if (areEqual(p.dimension, self.elProxyPosition.dimension)) {
                            if (self.$elProxy.css("position") === "fixed") {
                                if (areEqual(p.position, self.elProxyPosition.position)) identical = true;
                            } else {
                                if (areEqual(p.offset, self.elProxyPosition.offset)) identical = true;
                            }
                        }
                        if (!identical) {
                            self.reposition();
                            self.options.positionTrackerCallback.call(self, self.$el);
                        }
                    }
                }
            }, 200);
        },
        _interval_cancel: function() {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        },
        _content_set: function(content) {
            if (typeof content === "object" && content !== null && this.options.contentCloning) {
                content = content.clone(true);
            }
            this.Content = content;
        },
        _content_insert: function() {
            var self = this, $d = this.$tooltip.find(".tooltipster-content");
            if (typeof self.Content === "string" && !self.options.contentAsHTML) {
                $d.text(self.Content);
            } else {
                $d.empty().append(self.Content);
            }
        },
        _update: function(content) {
            var self = this;
            self._content_set(content);
            if (self.Content !== null) {
                if (self.Status !== "hidden") {
                    self._content_insert();
                    self.reposition();
                    if (self.options.updateAnimation) {
                        if (supportsTransitions()) {
                            self.$tooltip.css({
                                width: "",
                                "-webkit-transition": "all " + self.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-moz-transition": "all " + self.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-o-transition": "all " + self.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-ms-transition": "all " + self.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                transition: "all " + self.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                            }).addClass("tooltipster-content-changing");
                            setTimeout(function() {
                                if (self.Status != "hidden") {
                                    self.$tooltip.removeClass("tooltipster-content-changing");
                                    setTimeout(function() {
                                        if (self.Status !== "hidden") {
                                            self.$tooltip.css({
                                                "-webkit-transition": self.options.speed + "ms",
                                                "-moz-transition": self.options.speed + "ms",
                                                "-o-transition": self.options.speed + "ms",
                                                "-ms-transition": self.options.speed + "ms",
                                                transition: self.options.speed + "ms"
                                            });
                                        }
                                    }, self.options.speed);
                                }
                            }, self.options.speed);
                        } else {
                            self.$tooltip.fadeTo(self.options.speed, .5, function() {
                                if (self.Status != "hidden") {
                                    self.$tooltip.fadeTo(self.options.speed, 1);
                                }
                            });
                        }
                    }
                }
            } else {
                self.hide();
            }
        },
        _repositionInfo: function($el) {
            return {
                dimension: {
                    height: $el.outerHeight(false),
                    width: $el.outerWidth(false)
                },
                offset: $el.offset(),
                position: {
                    left: parseInt($el.css("left")),
                    top: parseInt($el.css("top"))
                }
            };
        },
        hide: function(callback) {
            var self = this;
            if (callback) self.callbacks.hide.push(callback);
            self.callbacks.show = [];
            clearTimeout(self.timerShow);
            self.timerShow = null;
            clearTimeout(self.timerHide);
            self.timerHide = null;
            var finishCallbacks = function() {
                $.each(self.callbacks.hide, function(i, c) {
                    c.call(self.$el);
                });
                self.callbacks.hide = [];
            };
            if (self.Status == "shown" || self.Status == "appearing") {
                self.Status = "disappearing";
                var finish = function() {
                    self.Status = "hidden";
                    if (typeof self.Content == "object" && self.Content !== null) {
                        self.Content.detach();
                    }
                    self.$tooltip.remove();
                    self.$tooltip = null;
                    $(window).off("." + self.namespace);
                    $("body").off("." + self.namespace).css("overflow-x", self.bodyOverflowX);
                    $("body").off("." + self.namespace);
                    self.$elProxy.off("." + self.namespace + "-autoClose");
                    self.options.functionAfter.call(self.$el, self.$el);
                    finishCallbacks();
                };
                if (supportsTransitions()) {
                    self.$tooltip.clearQueue().removeClass("tooltipster-" + self.options.animation + "-show").addClass("tooltipster-dying");
                    if (self.options.speed > 0) self.$tooltip.delay(self.options.speed);
                    self.$tooltip.queue(finish);
                } else {
                    self.$tooltip.stop().fadeOut(self.options.speed, finish);
                }
            } else if (self.Status == "hidden") {
                finishCallbacks();
            }
            return self;
        },
        show: function(callback) {
            this._showNow(callback);
            return this;
        },
        update: function(c) {
            return this.content(c);
        },
        content: function(c) {
            if (typeof c === "undefined") {
                return this.Content;
            } else {
                this._update(c);
                return this;
            }
        },
        reposition: function() {
            var self = this;
            if ($("body").find(self.$tooltip).length !== 0) {
                self.$tooltip.css("width", "");
                self.elProxyPosition = self._repositionInfo(self.$elProxy);
                var arrowReposition = null, windowWidth = $(window).width(), proxy = self.elProxyPosition, tooltipWidth = self.$tooltip.outerWidth(false), tooltipInnerWidth = self.$tooltip.innerWidth() + 1, tooltipHeight = self.$tooltip.outerHeight(false);
                if (self.$elProxy.is("area")) {
                    var areaShape = self.$elProxy.attr("shape"), mapName = self.$elProxy.parent().attr("name"), map = $('img[usemap="#' + mapName + '"]'), mapOffsetLeft = map.offset().left, mapOffsetTop = map.offset().top, areaMeasurements = self.$elProxy.attr("coords") !== undefined ? self.$elProxy.attr("coords").split(",") : undefined;
                    if (areaShape == "circle") {
                        var areaLeft = parseInt(areaMeasurements[0]), areaTop = parseInt(areaMeasurements[1]), areaWidth = parseInt(areaMeasurements[2]);
                        proxy.dimension.height = areaWidth * 2;
                        proxy.dimension.width = areaWidth * 2;
                        proxy.offset.top = mapOffsetTop + areaTop - areaWidth;
                        proxy.offset.left = mapOffsetLeft + areaLeft - areaWidth;
                    } else if (areaShape == "rect") {
                        var areaLeft = parseInt(areaMeasurements[0]), areaTop = parseInt(areaMeasurements[1]), areaRight = parseInt(areaMeasurements[2]), areaBottom = parseInt(areaMeasurements[3]);
                        proxy.dimension.height = areaBottom - areaTop;
                        proxy.dimension.width = areaRight - areaLeft;
                        proxy.offset.top = mapOffsetTop + areaTop;
                        proxy.offset.left = mapOffsetLeft + areaLeft;
                    } else if (areaShape == "poly") {
                        var areaXs = [], areaYs = [], areaSmallestX = 0, areaSmallestY = 0, areaGreatestX = 0, areaGreatestY = 0, arrayAlternate = "even";
                        for (var i = 0; i < areaMeasurements.length; i++) {
                            var areaNumber = parseInt(areaMeasurements[i]);
                            if (arrayAlternate == "even") {
                                if (areaNumber > areaGreatestX) {
                                    areaGreatestX = areaNumber;
                                    if (i === 0) {
                                        areaSmallestX = areaGreatestX;
                                    }
                                }
                                if (areaNumber < areaSmallestX) {
                                    areaSmallestX = areaNumber;
                                }
                                arrayAlternate = "odd";
                            } else {
                                if (areaNumber > areaGreatestY) {
                                    areaGreatestY = areaNumber;
                                    if (i == 1) {
                                        areaSmallestY = areaGreatestY;
                                    }
                                }
                                if (areaNumber < areaSmallestY) {
                                    areaSmallestY = areaNumber;
                                }
                                arrayAlternate = "even";
                            }
                        }
                        proxy.dimension.height = areaGreatestY - areaSmallestY;
                        proxy.dimension.width = areaGreatestX - areaSmallestX;
                        proxy.offset.top = mapOffsetTop + areaSmallestY;
                        proxy.offset.left = mapOffsetLeft + areaSmallestX;
                    } else {
                        proxy.dimension.height = map.outerHeight(false);
                        proxy.dimension.width = map.outerWidth(false);
                        proxy.offset.top = mapOffsetTop;
                        proxy.offset.left = mapOffsetLeft;
                    }
                }
                var myLeft = 0, myLeftMirror = 0, myTop = 0, offsetY = parseInt(self.options.offsetY), offsetX = parseInt(self.options.offsetX), practicalPosition = self.options.position;
                function dontGoOffScreenX() {
                    var windowLeft = $(window).scrollLeft();
                    if (myLeft - windowLeft < 0) {
                        arrowReposition = myLeft - windowLeft;
                        myLeft = windowLeft;
                    }
                    if (myLeft + tooltipWidth - windowLeft > windowWidth) {
                        arrowReposition = myLeft - (windowWidth + windowLeft - tooltipWidth);
                        myLeft = windowWidth + windowLeft - tooltipWidth;
                    }
                }
                function dontGoOffScreenY(switchTo, switchFrom) {
                    if (proxy.offset.top - $(window).scrollTop() - tooltipHeight - offsetY - 12 < 0 && switchFrom.indexOf("top") > -1) {
                        practicalPosition = switchTo;
                    }
                    if (proxy.offset.top + proxy.dimension.height + tooltipHeight + 12 + offsetY > $(window).scrollTop() + $(window).height() && switchFrom.indexOf("bottom") > -1) {
                        practicalPosition = switchTo;
                        myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
                    }
                }
                if (practicalPosition == "top") {
                    var leftDifference = proxy.offset.left + tooltipWidth - (proxy.offset.left + proxy.dimension.width);
                    myLeft = proxy.offset.left + offsetX - leftDifference / 2;
                    myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
                    dontGoOffScreenX();
                    dontGoOffScreenY("bottom", "top");
                }
                if (practicalPosition == "top-left") {
                    myLeft = proxy.offset.left + offsetX;
                    myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
                    dontGoOffScreenX();
                    dontGoOffScreenY("bottom-left", "top-left");
                }
                if (practicalPosition == "top-right") {
                    myLeft = proxy.offset.left + proxy.dimension.width + offsetX - tooltipWidth;
                    myTop = proxy.offset.top - tooltipHeight - offsetY - 12;
                    dontGoOffScreenX();
                    dontGoOffScreenY("bottom-right", "top-right");
                }
                if (practicalPosition == "bottom") {
                    var leftDifference = proxy.offset.left + tooltipWidth - (proxy.offset.left + proxy.dimension.width);
                    myLeft = proxy.offset.left - leftDifference / 2 + offsetX;
                    myTop = proxy.offset.top + proxy.dimension.height + offsetY + 12;
                    dontGoOffScreenX();
                    dontGoOffScreenY("top", "bottom");
                }
                if (practicalPosition == "bottom-left") {
                    myLeft = proxy.offset.left + offsetX;
                    myTop = proxy.offset.top + proxy.dimension.height + offsetY + 12;
                    dontGoOffScreenX();
                    dontGoOffScreenY("top-left", "bottom-left");
                }
                if (practicalPosition == "bottom-right") {
                    myLeft = proxy.offset.left + proxy.dimension.width + offsetX - tooltipWidth;
                    myTop = proxy.offset.top + proxy.dimension.height + offsetY + 12;
                    dontGoOffScreenX();
                    dontGoOffScreenY("top-right", "bottom-right");
                }
                if (practicalPosition == "left") {
                    myLeft = proxy.offset.left - offsetX - tooltipWidth - 12;
                    myLeftMirror = proxy.offset.left + offsetX + proxy.dimension.width + 12;
                    var topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
                    myTop = proxy.offset.top - topDifference / 2 - offsetY;
                    if (myLeft < 0 && myLeftMirror + tooltipWidth > windowWidth) {
                        var borderWidth = parseFloat(self.$tooltip.css("border-width")) * 2, newWidth = tooltipWidth + myLeft - borderWidth;
                        self.$tooltip.css("width", newWidth + "px");
                        tooltipHeight = self.$tooltip.outerHeight(false);
                        myLeft = proxy.offset.left - offsetX - newWidth - 12 - borderWidth;
                        topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
                        myTop = proxy.offset.top - topDifference / 2 - offsetY;
                    } else if (myLeft < 0) {
                        myLeft = proxy.offset.left + offsetX + proxy.dimension.width + 12;
                        arrowReposition = "left";
                    }
                }
                if (practicalPosition == "right") {
                    myLeft = proxy.offset.left + offsetX + proxy.dimension.width + 12;
                    myLeftMirror = proxy.offset.left - offsetX - tooltipWidth - 12;
                    var topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
                    myTop = proxy.offset.top - topDifference / 2 - offsetY;
                    if (myLeft + tooltipWidth > windowWidth && myLeftMirror < 0) {
                        var borderWidth = parseFloat(self.$tooltip.css("border-width")) * 2, newWidth = windowWidth - myLeft - borderWidth;
                        self.$tooltip.css("width", newWidth + "px");
                        tooltipHeight = self.$tooltip.outerHeight(false);
                        topDifference = proxy.offset.top + tooltipHeight - (proxy.offset.top + proxy.dimension.height);
                        myTop = proxy.offset.top - topDifference / 2 - offsetY;
                    } else if (myLeft + tooltipWidth > windowWidth) {
                        myLeft = proxy.offset.left - offsetX - tooltipWidth - 12;
                        arrowReposition = "right";
                    }
                }
                if (self.options.arrow) {
                    var arrowClass = "tooltipster-arrow-" + practicalPosition;
                    if (self.options.arrowColor.length < 1) {
                        var arrowColor = self.$tooltip.css("background-color");
                    } else {
                        var arrowColor = self.options.arrowColor;
                    }
                    if (!arrowReposition) {
                        arrowReposition = "";
                    } else if (arrowReposition == "left") {
                        arrowClass = "tooltipster-arrow-right";
                        arrowReposition = "";
                    } else if (arrowReposition == "right") {
                        arrowClass = "tooltipster-arrow-left";
                        arrowReposition = "";
                    } else {
                        arrowReposition = "left:" + Math.round(arrowReposition) + "px;";
                    }
                    if (practicalPosition == "top" || practicalPosition == "top-left" || practicalPosition == "top-right") {
                        var tooltipBorderWidth = parseFloat(self.$tooltip.css("border-bottom-width")), tooltipBorderColor = self.$tooltip.css("border-bottom-color");
                    } else if (practicalPosition == "bottom" || practicalPosition == "bottom-left" || practicalPosition == "bottom-right") {
                        var tooltipBorderWidth = parseFloat(self.$tooltip.css("border-top-width")), tooltipBorderColor = self.$tooltip.css("border-top-color");
                    } else if (practicalPosition == "left") {
                        var tooltipBorderWidth = parseFloat(self.$tooltip.css("border-right-width")), tooltipBorderColor = self.$tooltip.css("border-right-color");
                    } else if (practicalPosition == "right") {
                        var tooltipBorderWidth = parseFloat(self.$tooltip.css("border-left-width")), tooltipBorderColor = self.$tooltip.css("border-left-color");
                    } else {
                        var tooltipBorderWidth = parseFloat(self.$tooltip.css("border-bottom-width")), tooltipBorderColor = self.$tooltip.css("border-bottom-color");
                    }
                    if (tooltipBorderWidth > 1) {
                        tooltipBorderWidth++;
                    }
                    var arrowBorder = "";
                    if (tooltipBorderWidth !== 0) {
                        var arrowBorderSize = "", arrowBorderColor = "border-color: " + tooltipBorderColor + ";";
                        if (arrowClass.indexOf("bottom") !== -1) {
                            arrowBorderSize = "margin-top: -" + Math.round(tooltipBorderWidth) + "px;";
                        } else if (arrowClass.indexOf("top") !== -1) {
                            arrowBorderSize = "margin-bottom: -" + Math.round(tooltipBorderWidth) + "px;";
                        } else if (arrowClass.indexOf("left") !== -1) {
                            arrowBorderSize = "margin-right: -" + Math.round(tooltipBorderWidth) + "px;";
                        } else if (arrowClass.indexOf("right") !== -1) {
                            arrowBorderSize = "margin-left: -" + Math.round(tooltipBorderWidth) + "px;";
                        }
                        arrowBorder = '<span class="tooltipster-arrow-border" style="' + arrowBorderSize + " " + arrowBorderColor + ';"></span>';
                    }
                    self.$tooltip.find(".tooltipster-arrow").remove();
                    var arrowConstruct = '<div class="' + arrowClass + ' tooltipster-arrow" style="' + arrowReposition + '">' + arrowBorder + '<span style="border-color:' + arrowColor + ';"></span></div>';
                    self.$tooltip.append(arrowConstruct);
                }
                self.$tooltip.css({
                    top: Math.round(myTop) + "px",
                    left: Math.round(myLeft) + "px"
                });
            }
            return self;
        },
        enable: function() {
            this.enabled = true;
            return this;
        },
        disable: function() {
            this.hide();
            this.enabled = false;
            return this;
        },
        destroy: function() {
            var self = this;
            self.hide();
            if (self.$el[0] !== self.$elProxy[0]) {
                self.$elProxy.remove();
            }
            self.$el.removeData(self.namespace).off("." + self.namespace);
            var ns = self.$el.data("tooltipster-ns");
            if (ns.length === 1) {
                var title = null;
                if (self.options.restoration === "previous") {
                    title = self.$el.data("tooltipster-initialTitle");
                } else if (self.options.restoration === "current") {
                    title = typeof self.Content === "string" ? self.Content : $("<div></div>").append(self.Content).html();
                }
                if (title) {
                    self.$el.attr("title", title);
                }
                self.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle");
            } else {
                ns = $.grep(ns, function(el, i) {
                    return el !== self.namespace;
                });
                self.$el.data("tooltipster-ns", ns);
            }
            return self;
        },
        elementIcon: function() {
            return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : undefined;
        },
        elementTooltip: function() {
            return this.$tooltip ? this.$tooltip[0] : undefined;
        },
        option: function(o, val) {
            if (typeof val == "undefined") return this.options[o]; else {
                this.options[o] = val;
                return this;
            }
        },
        status: function() {
            return this.Status;
        }
    };
    $.fn[pluginName] = function() {
        var args = arguments;
        if (this.length === 0) {
            if (typeof args[0] === "string") {
                var methodIsStatic = true;
                switch (args[0]) {
                  case "setDefaults":
                    $.extend(defaults, args[1]);
                    break;

                  default:
                    methodIsStatic = false;
                    break;
                }
                if (methodIsStatic) return true; else return this;
            } else {
                return this;
            }
        } else {
            if (typeof args[0] === "string") {
                var v = "#*$~&";
                this.each(function() {
                    var ns = $(this).data("tooltipster-ns"), self = ns ? $(this).data(ns[0]) : null;
                    if (self) {
                        if (typeof self[args[0]] === "function") {
                            var resp = self[args[0]](args[1], args[2]);
                        } else {
                            throw new Error('Unknown method .tooltipster("' + args[0] + '")');
                        }
                        if (resp !== self) {
                            v = resp;
                            return false;
                        }
                    } else {
                        throw new Error("You called Tooltipster's \"" + args[0] + '" method on an uninitialized element');
                    }
                });
                return v !== "#*$~&" ? v : this;
            } else {
                var instances = [], multipleIsSet = args[0] && typeof args[0].multiple !== "undefined", multiple = multipleIsSet && args[0].multiple || !multipleIsSet && defaults.multiple, debugIsSet = args[0] && typeof args[0].debug !== "undefined", debug = debugIsSet && args[0].debug || !debugIsSet && defaults.debug;
                this.each(function() {
                    var go = false, ns = $(this).data("tooltipster-ns"), instance = null;
                    if (!ns) {
                        go = true;
                    } else if (multiple) {
                        go = true;
                    } else if (debug) {
                        console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.');
                    }
                    if (go) {
                        instance = new Plugin(this, args[0]);
                        if (!ns) ns = [];
                        ns.push(instance.namespace);
                        $(this).data("tooltipster-ns", ns);
                        $(this).data(instance.namespace, instance);
                    }
                    instances.push(instance);
                });
                if (multiple) return instances; else return this;
            }
        }
    };
    function areEqual(a, b) {
        var same = true;
        $.each(a, function(i, el) {
            if (typeof b[i] === "undefined" || a[i] !== b[i]) {
                same = false;
                return false;
            }
        });
        return same;
    }
    var deviceHasTouchCapability = !!("ontouchstart" in window);
    var deviceHasMouse = false;
    $("body").one("mousemove", function() {
        deviceHasMouse = true;
    });
    function deviceIsPureTouch() {
        return !deviceHasMouse && deviceHasTouchCapability;
    }
    function supportsTransitions() {
        var b = document.body || document.documentElement, s = b.style, p = "transition";
        if (typeof s[p] == "string") {
            return true;
        }
        v = [ "Moz", "Webkit", "Khtml", "O", "ms" ], p = p.charAt(0).toUpperCase() + p.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof s[v[i] + p] == "string") {
                return true;
            }
        }
        return false;
    }
})(jQuery, window, document);

(function($) {
    "use strict";
    var Obj = {
        common: {
            init: function() {
                $(function() {
                    Obj.common.voting();
                });
            },
            finalize: function() {},
            voting: function() {
                $("a.pakb-like-btn").click(function() {
                    var response_div = $(this).parent();
                    $.ajax({
                        url: PAKB.base_url,
                        data: {
                            pakb_vote_like: $(this).attr("post_id")
                        },
                        beforeSend: function() {},
                        success: function(data) {
                            response_div.html(data).fadeIn(900);
                        },
                        complete: function() {}
                    });
                });
                $("a.pakb-dislike-btn").click(function() {
                    var response_div = $(this).parent();
                    $.ajax({
                        url: PAKB.base_url,
                        data: {
                            pakb_vote_dislike: $(this).attr("post_id")
                        },
                        beforeSend: function() {},
                        success: function(data) {
                            response_div.html(data).fadeIn(900);
                        },
                        complete: function() {}
                    });
                });
                if (PAKB.category) {
                    $("#kb-s.autosuggest").autocomplete({
                        serviceUrl: PAKB.ajaxurl,
                        params: {
                            action: "search_title"
                        },
                        minChars: 1,
                        maxHeight: 450,
                        groupBy: "category",
                        preventBadQueries: false,
                        onSelect: function(suggestion) {
                            window.location = suggestion.url;
                        }
                    });
                } else {
                    $("#kb-s.autosuggest").autocomplete({
                        serviceUrl: PAKB.ajaxurl,
                        params: {
                            action: "search_title"
                        },
                        minChars: 1,
                        maxHeight: 450,
                        preventBadQueries: false,
                        onSelect: function(suggestion) {
                            window.location = suggestion.url;
                        }
                    });
                }
                $(".pakb-tooltip").tooltipster();
            }
        }
    };
    var UTIL = {
        fire: function(func, funcname, args) {
            var fire;
            var namespace = Obj;
            funcname = funcname === undefined ? "init" : funcname;
            fire = func !== "";
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === "function";
            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function() {
            UTIL.fire("common");
            $.each(document.body.className.replace(/-/g, "_").split(/\s+/), function(i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, "finalize");
            });
            UTIL.fire("common", "finalize");
        }
    };
    $(document).ready(UTIL.loadEvents);
})(jQuery);