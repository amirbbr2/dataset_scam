/**
 * We offer the best and most useful modules PrestaShop and modifications for your online store.
 *
 * We are experts and professionals in PrestaShop
 *
 * @category  PrestaShop
 * @category  Module
 * @author    PresTeamShop.com <support@presteamshop.com>
 * @copyright 2011-2014 PresTeamShop
 * @license   see file: LICENSE.txt
 */

jQuery.extend(
    jQuery.expr[ ":" ],
    { reallyvisible : function (a) {
        return !(jQuery(a).css('display')=='none');
    }}
);

var items_to_remove = new Array();
items_to_remove.push(
    '#top_column',
    '#home-page-tabs',
    '#subcategories',
    '#editorial_block_center',
    '.slogan',
    '#slider_row',
    '.breadcrumb',
    '.cat-name'
);

var options_prev = new Array();

$(function(){
    CustomControls.init();

    $('.filterproductspro_seacher :button').click(function(){
        $(this).toggleClass('on off');
    });

    //Verificar si todos lo titulos de las columnas estan en blanco, si lo estan, se eliminan
    $('table.column_list').each(function(i, data) {
        var del = true;
        $(this).contents().find('span.value_column').each(function(j, item) {
            var value = $.trim($(item).html());
            if(value != null && value != undefined && value != '' && value != '&nbsp;')
                del = false;
        });
        if(del)
            $(this).contents().find('span.value_column').remove();
    });

    //Eventos
    FilterProducts.init();

    CustomControls.clear();

    //Desplegar el form
    $('.filterproductspro_seacher').fadeIn();
});

var Compare = {
    compareProduct: function(element) {
		var idProduct = $(element).attr('value').replace('comparator_item_', '');
		var checkbox = $(element);

		if(checkbox.is(':checked'))
		{
			$.ajax({
	  			url: baseDir + 'products-comparison.php?ajax=1&action=add&id_product=' + idProduct,
	 			async: true,
	  			success: function(data){
	  				if (data == '0')
	  				{
	  					checkbox.attr('checked', false);
		    			alert(max_item);
	  				}
	  			},
	    		error: function(){
	    			checkbox.attr('checked', false);
	    		}
			});
		}
		else
		{
			$.ajax({
	  			url: baseDir + 'products-comparison.php?ajax=1&action=remove&id_product=' + idProduct,
	 			async: true,
	  			success: function(data) {
	  				if (data == '0')
	  					checkbox.attr('checked', true);
	    		},
	    		error: function() {
	    			checkbox.attr('checked', true);
	    		}
			});
		}
	}
};

var FilterProducts = {
    _id_searcher : null,
    _options : new Array(),
    _dependencies: {},
    hasChange: false,
    hideOptions: true,
    init: function() {
        var cookieName = 'searchers';

        $.blockUI.defaults.message = '<img src="' + filterproductspro_img + 'block_loader.gif" />';
        $.blockUI.defaults.overlayCSS.backgroundColor = '#FFF';
        $.blockUI.defaults.css.border = 'none';
        $.blockUI.defaults.css.backgroundColor = 'transparent';
        $('.filterproductspro_seacher').find('select.filter_parent').attr('disabled', true);
        $('.search_query').keypress(function(event) {
            if ( event.which == 13 ) {
                $(event.target).parent().parent().find('.go_search').trigger('click');
            }
        });

        FilterProducts.assingDefaults();
        FilterProducts.loadFromCookie(function() {
            FilterProducts.registerEvents();
        });

        $( window ).resize(function() {
            if (typeof $.uniform !== 'undefined') {
                $.uniform.update();
            }
        });
        if (typeof $.uniform !== 'undefined') {
            $.uniform.update();
        }
    },
    loadFromCookie: function(callback) {
        if (enabledCookie) {
            var cookieName = 'searchers';
//            $.dough(cookieName, "remove");
            if ($.dough(cookieName) !== undefined) {
                var cookieValue = $.dough(cookieName);
//                console.log(cookieValue, 'cookieValue');
                //each searchers
                $.each(cookieValue, function(id_searcher, searcher) {
                    var $search = $('#searcher_' + id_searcher);

                    //if search query
                    if (searcher.search_query !== undefined) {
                        if ($search.find('.search_query').length)
                            $search.find('.search_query').val(searcher.search_query);
                    }

                    //reset options

                    FilterProducts._options[id_searcher] = {};
                    FilterProducts._options[id_searcher].select = new Array();
                    FilterProducts._options[id_searcher].checkbox = new Array();
                    FilterProducts._options[id_searcher].radio = new Array();
                    FilterProducts._options[id_searcher].button = new Array();

                    //each filters
                    $.each(searcher, function(id_filter, filter) {
                        var $filter = $search.find('#filter_' + id_filter);
                        //types
                        //select
                        if (filter.type === GLOBALS.Types.Select) {
                            //dependency
                            //available
                            if (filter.available !== undefined && filter.available.id_filter_child !== undefined) {
                                var select_child = $('#searcher_' + id_searcher + ' select#filter_select_' + filter.available.id_filter_child + '_' + id_filter);

                                $.each(filter.available.options, function(i, option) {
                                    var $_option = $('<option/>').attr('id', 'option_' + option.id_option)
                                            .val('option_' + option.id_option).html(option.value);

                                    if (searcher[filter.available.id_filter_child] !== typeof undefined && 
                                        searcher[filter.available.id_filter_child].option !== typeof undefined && 
                                        searcher[filter.available.id_filter_child].option.id_option !== typeof undefined &&
                                        searcher[filter.available.id_filter_child].option.id_option == option.id_option)
                                            $_option.attr('selected', true);

                                    $_option.appendTo(select_child);
                                });

//                                if (filter.available.options.length > 0 || $('#searcher_' + id_searcher + ' select[id*="filter_select_' + filter.available.id_filter_child + '"]').val() != '') {
//                                    if($(select_child).is(':disabled')) {
//                                        $(select_child).removeAttr('disabled');
//                                    }
//                                } else {
//                                    if(!$(select_child).is(':disabled')) {
//                                        $(select_child).attr('disabled', true);
//                                    }
//                                }
                            }

                            if (filter.unavailable !== undefined && filter.unavailable.selectors !== undefined
                                    && filter.unavailable.selectors.select !== undefined && filter.unavailable.selectors.select.length !== 0) {
                                var $select = $('#searcher_' + id_searcher + ' select#filter_select_' + id_filter + '_0');
                                var $_frist = $select.children(':first');
                                $select.html('');
                                $select.append($_frist);

                                $.each(filter.unavailable.selectors.select, function(i, option) {
                                    var $_option = $('<option/>').attr('id', 'option_' + option.id_option)
                                            .val('option_' + option.id_option).html(option.value);

                                    $_option.appendTo($select);
                                });

                                if($($select).is(':disabled')) {
                                    $($select).removeAttr('disabled');
                                }
                            }

                            if (typeof filter.option !== 'undefined') {

                                var $element = $filter.find('#filter_' + filter.type + '_' + id_filter + '_' + filter.dependency);
                                $element.val('option_' + filter.option.id_option);

                                if (filter.option !== undefined) {
                                    FilterProducts._options[id_searcher].select.push(filter.option.id_option);
                                }

                                //available by parent
                                if (typeof select_child !== 'undefined') {
                                    if (filter.available.options.length > 0 || $element.val() != '') {
                                        if($(select_child).is(':disabled')) {
                                            $(select_child).removeAttr('disabled');
                                        }
                                    } else {
                                        if(!$(select_child).is(':disabled')) {
                                            $(select_child).attr('disabled', true);
                                        }
                                    }
                                }

                            }
                        }
                        else if (filter.type === GLOBALS.Types.Button) {
                            //available
                            $.each(filter.options, function(_id, _id_option) {
                                var $element = $filter.find('input.fpp_button#option_' + _id_option);
                                $element.removeClass('off');
                                $element.addClass('on');
                                FilterProducts._options[id_searcher].button.push(_id_option);
                            });
                            //unavailable
                            if (FilterProducts.hideOptions) {
                                if (filter.unavailable !== undefined && filter.unavailable.selectors !== undefined) {
                                    $.each(filter.unavailable.selectors, function(_id, selector) {
                                        $.each(selector, function(_id, _id_option) {
                                            var $element = $filter.find('input.fpp_button#option_' + _id_option);
                                            $element.removeClass('on');
                                            $element.addClass('off');
                                            $element.hide();
                                        });
                                    });
                                }
                            }
                        }
                        else if (filter.type === GLOBALS.Types.Radio) {
                            //available
                            $.each(filter.options, function(_id, _id_option) {
                                var $element = $filter.find('input.radio#option_' + _id_option);
                                $element.attr('checked', 'checked');
                                var $span = $filter.find('span.radio[name=option_' + _id_option + ']');
                                $span.css({backgroundPosition: '0 -50px'});
                                FilterProducts._options[id_searcher].radio.push(_id_option);
                            });
                            //unavailable
                            if (FilterProducts.hideOptions) {
                                if (filter.unavailable !== undefined && filter.unavailable.selectors !== undefined) {
                                    $.each(filter.unavailable.selectors, function(_id, selector) {
                                        $.each(selector, function(_id, _id_option) {
                                            var $element = $filter.find('input.radio#option_' + _id_option);
                                            var $span = $filter.find('span.radio[name=option_' + _id_option + ']');
                                            var $label = $filter.find('label[for=option_' + _id_option + ']');
                                            $element.removeAttr('checked');
                                            $span.hide();
                                            $label.hide();
                                        });
                                    });
                                }
                            }
                        }
                        else if (filter.type === GLOBALS.Types.Checkbox) {
                            //available
                            $.each(filter.options, function(_id, _id_option) {
                                var $element = $filter.find('input.checkbox#option_' + _id_option);
                                $element.attr('checked', 'checked');
                                var $span = $filter.find('span.checkbox[name=option_' + _id_option + ']');
                                $span.css({backgroundPosition: '0 -50px'});
                                FilterProducts._options[id_searcher].checkbox.push(_id_option);
                            });
                            //unavailable
                            if (FilterProducts.hideOptions) {
                                if (filter.unavailable !== undefined && filter.unavailable.selectors !== undefined) {
                                    $.each(filter.unavailable.selectors, function(_id, selector) {
                                        $.each(selector, function(_id, _id_option) {
                                            var $element = $filter.find('input.checkbox#option_' + _id_option);
                                            var $span = $filter.find('span.checkbox[name=option_' + _id_option + ']');
                                            var $label = $filter.find('label[for=option_' + _id_option + ']');
                                            $element.removeAttr('checked');
                                            $span.hide();
                                            $label.hide();
                                        });
                                    });
                                }
                            }
                        }

                    });
                });
                callback();
            } else {
                callback();
            }
        } else {
            callback();
        }
    },
    _getFilterType: function($element) {
        if ($element.hasClass('filter_type_' + GLOBALS.Types.Button))
            return GLOBALS.Types.Button;
        else if ($element.hasClass('filter_type_' + GLOBALS.Types.Radio))
            return GLOBALS.Types.Radio;
        else if ($element.hasClass('filter_type_' + GLOBALS.Types.Select))
            return GLOBALS.Types.Select;
        else if ($element.hasClass('filter_type_' + GLOBALS.Types.Checkbox))
            return GLOBALS.Types.Checkbox;
        else
            return null;
    },
    _getFilterElementsCookie: function(id_searcher) {
        if (enabledCookie && $('#go_search_' + id_searcher).length) {

            var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string')
                $.dough(cookieName, cookieValue);
            else
                cookieValue = $.dough(cookieName);

            if (cookieValue[id_searcher] === undefined)
                cookieValue[id_searcher] = {};

            var $elements = $('div.filterproductspro_seacher' + (id_searcher ? '#searcher_' + id_searcher : '') +  ' div.block_content div.filter_content');

            $.each($elements, function(i, element) {
                var id_filter = $(element).attr('id').split('_')[1];
                if (cookieValue[id_searcher][id_filter] === undefined) {
                    cookieValue[id_searcher][id_filter] = {
                        options: new Array(),
                        type: FilterProducts._getFilterType($(element))
                    };
                }
            });

            var json_cookieValue = JSON.stringify(cookieValue);
            $.dough(cookieName, json_cookieValue);

            return $elements;

        }

        return null;
    },
    _removeOptionCookie: function(id_searcher, type) {
        if (enabledCookie && $('#go_search_' + id_searcher).length) {

            var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string') {
                $.dough(cookieName, cookieValue);
            } else {
                cookieValue = $.dough(cookieName);
            }

            if (cookieValue[id_searcher] === undefined) {
                cookieValue[id_searcher] = {};
            }

            //Borrar todas las opciones de los filtros de la cookie para luego ser llenadas de nuevo.
            $.each(cookieValue[id_searcher], function(id_filter, filter) {
//                if (filter.type === type) {
                    if (filter.type === type) {
                        cookieValue[id_searcher][id_filter].options = new Array();
                        if (filter.type === GLOBALS.Types.Select) {
//                            cookieValue[id_searcher][id_filter].option = {};
                        }
                    }
                    if (typeof cookieValue[id_searcher][id_filter].unavailable !== 'undefined' && typeof cookieValue[id_searcher][id_filter].unavailable.selectors !== 'undefined') {
                        cookieValue[id_searcher][id_filter].unavailable.selectors.fadeout = new Array();
                        cookieValue[id_searcher][id_filter].unavailable.selectors.hide = new Array();
                        cookieValue[id_searcher][id_filter].unavailable.selectors.select = new Array();
                    }
//                }
            });

            var json_cookieValue = JSON.stringify(cookieValue);
            $.dough(cookieName, json_cookieValue);
        }
    },
    _loadOptionsInCookie: function(id_searcher, $elements, id_option) {
        if (enabledCookie && $('#go_search_' + id_searcher).length && $elements !== null) {

            var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string')
                $.dough(cookieName, cookieValue);
            else
                cookieValue = $.dough(cookieName);

            if (cookieValue[id_searcher] === undefined)
                cookieValue[id_searcher] = {};

            $.each($elements, function(i, element) {
                if ($(element).find('#option_' + id_option).length > 0) {
                    var id_filter = $(element).attr('id').split('_')[1];

                    if (cookieValue[id_searcher][id_filter] !== undefined)
                        cookieValue[id_searcher][id_filter].options.push(id_option);
                }
            });

            var json_cookieValue = JSON.stringify(cookieValue);
            $.dough(cookieName, json_cookieValue);
        }
    },
    assingDefaults: function(){
        $('div.filterproductspro_seacher div.block_content select[name="' + GLOBALS.Types.Select + '"]').val('');
        $('div.filterproductspro_seacher div.block_content input[type="' + GLOBALS.Types.Checkbox + '"]').attr('checked', false);
        $('div.filterproductspro_seacher div.block_content input[type="' + GLOBALS.Types.Radio + '"]').attr('checked', false);
    },
    resetFiltersDependency: function(select, callback, free, force_fill_options) {
        if(select && $(select).is('select')) {

            var id_filter = $(select).attr('id').split('_')[2];
            var _select = $('select[id^="filter_select_"][id$="_' + id_filter + '"]');

            if($(_select).length) {
                $(_select).attr('disabled', true).find('option:first').attr('selected', true);
                //REESTABLESE EL (SELECT) A SUS VALORES INICIALES.
                //debe clonarse porque al hacer html('') se borra el html del elemento tambien en IE...
                var $_first = $(_select).children('option:first').clone();
                $(_select).html('');
                $_first.appendTo($(_select));

                FilterProducts.resetFiltersDependency(_select, callback);
                callback = undefined;
            } else {
                //limpia el ultimo filtro de la dependencia, siempre y cuando no tenga un valor seleccionado direferente de null
                if ($(select).val() == '') {
                    //REESTABLESE EL (SELECT) A SUS VALORES INICIALES.

                    var $_first = $(select).children('option:first').clone();
                    $(select).html('');
                    $_first.appendTo($(select));

                }
            }
        }

        //si queda vacio entonces llamamos a la funcion de llenarlo con sus valores originales
        if ((typeof free !== 'undefined' && free && $(select).find('option').length == 1 && !$(select).is(':disabled')) || (typeof force_fill_options !== 'undefined' && force_fill_options)) {
            FilterProducts.getFreeOptions(select, id_filter);
        } else {
            if (typeof $.uniform !== 'undefined') {
                $.uniform.update();
            }
        }

        if (callback !== undefined && typeof callback === 'function') {
            callback();
        }
    },
    getFreeOptions: function(select, id_filter, callback) {
        //get parent
        if (typeof $(select)[0] === typeof undefined) {
            if (typeof callback === 'function') {
                callback();
            }
            return;
        }

        var id_filter_parent = $(select).attr('id').split('_').pop();

        var id_option_parent = 0;
        if (id_filter_parent != '0') {
            var $parent_select = $('select[id^="filter_select_' + id_filter_parent + '_"]');
            id_option_parent = $parent_select.val().replace('option_', '');
        }

        //codigo para traer las opciones de un select cuando queda vacio
        FilterProducts._blockUI({}, function() {
            $.ajax({
                url: filterproductspro_dir + 'actions.php',
                type: 'POST',
                dataType: 'json',
                async: false,
                cache: false,
                data:{
                    action: 'getFreeOptions',
                    id_filter: id_filter,
                    id_option_parent: id_option_parent,
                    token: fpp_static_token
                },
                beforeSend: function() {

                },
                success: function(json) {
                    try {
                        if(json.message_code == 0) {
                            var $_first = $(select).children('option:first').clone();
                            $(select).html('');
                            $_first.appendTo($(select));
                            $.each(json.options, function(i, option) {
                                $('<option/>')
                                        .attr('id', 'option_' + option.id_option)
                                        .val('option_' + option.id_option)
                                        .html(option.value)
                                        .appendTo($(select));
                            });
                            if (typeof $.uniform !== 'undefined') {
                                $.uniform.update();
                            }

                            if (id_option_parent != '0') {
                                var id_searcher = $(select).parents('.filterproductspro_seacher:last').attr('id').split('_')[1];//{1}
                                var options = FilterProducts.getOptions(id_searcher);
                                FilterProducts._unavailableOptions({options: options, id_searcher: id_searcher, id_filter: id_filter, avoid_loading: true});
                            }
                        }
                    }
                    catch($Exc) {
                        console.log('ERROR: ' + $Exc);
                    }
                },
                complete: function() {
                    if (typeof callback === 'function') {
                        callback();
                    } else {
                        FilterProducts._unblockUI();
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    alert(XMLHttpRequest.responseText);
                }
            });
        });
    },
    _changeSelects: function(select, id_searcher, search, callback, noRemoveOptions) {
        if (enabledCookie && $('#go_search_' + id_searcher).length) {
            var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string')
                $.dough(cookieName, cookieValue);
            else
                cookieValue = $.dough(cookieName);
        }

        //auto search - necesario para hacer una busqueda si se selecciona la ultima dependencia de un buscador
        //FilterProducts.hasChange = true;

        FilterProducts._options[id_searcher].select = new Array();

        if (FilterProducts._id_searcher != id_searcher){
            if (!(enabledCookie && $('#go_search_' + id_searcher).length) || ((enabledCookie && $('#go_search_' + id_searcher).length) && cookieValue[id_searcher] === undefined)) {
                FilterProducts._options[id_searcher].checkbox = new Array();
                FilterProducts._options[id_searcher].radio = new Array();
                FilterProducts._options[id_searcher].button = new Array();

                FilterProducts._id_searcher = id_searcher;
            }
        }

//        FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Select);

        var val_opt_selected = select != null ? (select.val() != '' ? select.val() : $(select).val()) : null;
        var value_option = '';

        if (typeof noRemoveOptions === 'undefined') {
            FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Select);
        }

        if ($.isEmpty(val_opt_selected)) {
            value_option = $(select).children(':first').html();
        } else {
            value_option = $(select).children('#' + val_opt_selected).html();
        }

        var option = (select) ? FilterProducts._getIdOptionFromControl(val_opt_selected) : null;
        var id_filter = (select) ? $(select).attr('id').split('_')[2] : null;

        if (enabledCookie && $('#go_search_' + id_searcher).length) {
            if (cookieValue[id_searcher] === undefined)
                cookieValue[id_searcher] = {};

            if (cookieValue[id_searcher][id_filter] === undefined) {
                cookieValue[id_searcher][id_filter] = {
                    option: {id_option: option, value: value_option},
                    type: GLOBALS.Types.Select,
                    dependency: (select) ? $(select).attr('id').split('_')[3] : 0
                };
            } else {
                cookieValue[id_searcher][id_filter].option = {id_option: option, value: value_option};
                if (cookieValue[id_searcher][id_filter].dependency === undefined) {
                    cookieValue[id_searcher][id_filter].dependency = (select) ? $(select).attr('id').split('_')[3] : 0;
                }
            }

            //save cookie.
//            var json_cookieValue = JSON.stringify(cookieValue);
//            $.dough(cookieName, json_cookieValue);

        }

        var exec_callback = function() {
            $('div.filterproductspro_seacher' + (id_searcher ? '#searcher_' + id_searcher : '') +  ' div.block_content select[name="' + GLOBALS.Types.Select + '"]').find('option:selected').each(function(i, item){
                var id_control = $(item).val();
                if (id_control != null && id_control != undefined && FilterProducts._getIdOptionFromControl(id_control) != null) {
                    FilterProducts._options[id_searcher].select.push(FilterProducts._getIdOptionFromControl(id_control));
                }
            });

            if ( option && !isNaN(option) && id_filter && !isNaN(id_filter) ) {
                FilterProducts._blockUI({}, function() {
                    $.ajax({
                        url: filterproductspro_dir + 'actions.php',
                        type: 'POST',
                        dataType: 'json',
                        async: false,
                        cache: false,
                        data: {
                            action: 'getAvailableOptionsDependency',
                            id_filter: id_filter,
                            'options[]': FilterProducts.getOptions(id_searcher),
                            token: fpp_static_token
                        },
                        beforeSend: function() {

                        },
                        success: function(json) {
                            try {
                                if ( json.message_code == 0 ) {
                                    var id_filter_child = (json.data.id_filter_child) ? json.data.id_filter_child : null;
                                    if ( id_filter_child ) {
                                        var select_child = $('#searcher_' + id_searcher + ' select#filter_select_' + id_filter_child + '_' + id_filter);
//                                        var opts_child = $(select_child).find('option');

                                        //SE BORRAN LAS OPCIONES DEL FILTRO HIJO Y SOLO SE AGREGAN CUYAS OPCIONES ESTEN DISPONIBLES.
                                        var $_first = select_child.children('option:first').clone();
                                        select_child.html('');
                                        $_first.appendTo(select_child);

                                        $('#searcher_' + id_searcher + ' select#filter_select_' + id_filter_child + '_' + id_filter + ' option:not(:first)').remove();

                                        //borrar opciones de los selects con esa dependencia

                                        cookieValue = FilterProducts._removeOptionsDependency(cookieValue, id_searcher, id_filter_child);

                                        if ( enabledCookie && $('#go_search_' + id_searcher).length ) {
                                            cookieValue[id_searcher][id_filter].available = {};
                                            cookieValue[id_searcher][id_filter].available.options = new Array();//json.data.options;
                                            cookieValue[id_searcher][id_filter].available.id_filter_child = id_filter_child;
                                        }

                                        $.each(json.data.options, function(i, option) {
                                            if ( enabledCookie && $('#go_search_' + id_searcher).length ) {
                                                cookieValue[id_searcher][id_filter].available.options.push({id_option: option['id_option'], value: option['value']});
                                            }

                                            $('<option/>').html(option['value']).attr('id', 'option_' + option['id_option']).val('option_' + option['id_option']).appendTo(select_child);
                                        });

                                        if ($(select_child).is(':disabled')) {
                                            $(select_child).removeAttr('disabled');
                                        }

                                    } else {
                                        if (enabledCookie && $('#go_search_' + id_searcher).length) {
                                            cookieValue[id_searcher][id_filter].available = new Array();
                                        }

                                        $('select[id^="filter_select_' + id_filter + '"] > option:gt(0)').addClass('unremovable');
                                    }
                                } else {
                                    if (enabledCookie && $('#go_search_' + id_searcher).length) {
                                        cookieValue[id_searcher][id_filter].available = new Array();
                                    }

                                    alert(json.message);
                                }

                                if (enabledCookie && $('#go_search_' + id_searcher).length) {
                                    var json_cookieValue = JSON.stringify(cookieValue);
                                    $.dough(cookieName, json_cookieValue);
                                }

                            } catch ( $Exc ) {
                                console.log('ERROR: ' + $Exc);
                            }
                        },
                        complete: function() {
                            if ( search ) {
                                FilterProducts.search({id_searcher: id_searcher, id_filter: id_filter, avoid_loading: true});
                            }
                            else {
                                if (callback !== undefined && typeof callback === 'function') {
                                    callback();
                                } else {
                                    FilterProducts._unblockUI();
                                }
                            }

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.responseText);
                        }
                    });
                });

            }
            else {
                if ( search ) {
                    FilterProducts.search({id_searcher: id_searcher, id_filter: id_filter, avoid_loading: true});
                } else {
                    if (callback !== undefined && typeof callback === 'function') {
                        callback();
                    } else {
                        FilterProducts._unblockUI();
                    }
                }
            }
        };

        var reset_callback = function() {
            var force_fill_options = undefined;
            if ($.isEmpty(val_opt_selected)) {
                force_fill_options = true;
            }

            if (typeof select !== typeof undefined && select !== null)
            {
                var ids = select.attr('id').split('_');
                var id_parent = ids.pop();
            }

            if (typeof id_parent !== typeof undefined && id_parent !== '0' && $.isEmpty(val_opt_selected))
                $('select[id|=filter_select_' + id_parent+']').trigger('change');
            else if (select !== null)
                FilterProducts.resetFiltersDependency(select, exec_callback, undefined, force_fill_options);
            else if (callback !== undefined && typeof callback === 'function')
                callback();
        };

        //se llama siempre para que no muestra doble blockui
        reset_callback();

    },
    _removeOptionsDependency: function(cookieValue, id_searcher, id_filter_child) {
        var $_dependence_select = $('#searcher_' + id_searcher + ' select[id^="filter_select_"][id$="_' + id_filter_child + '"]');

        if (typeof $_dependence_select[0] !== 'undefined') {
            $_dependence_select.attr('disabled', true);
            $_dependence_select.children('option:not(:first)').remove();

            var _id = $_dependence_select.attr('id').split('_');
            _id.pop();
            var _id_filter_child = _id.pop();

            var cookieName = 'searchers';
            if (enabledCookie && $('#go_search_' + id_searcher).length) {

//                var cookieValue = {};
//
//                if (typeof $.dough(cookieName) === 'undefined' || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string') {
//                    $.dough(cookieName, cookieValue);
//                } else {
//                    cookieValue = $.dough(cookieName);
//                }

                if (typeof cookieValue[id_searcher] === 'undefined') {
                    cookieValue[id_searcher] = {};
                }

                if (typeof cookieValue[id_searcher][id_filter_child] !== 'undefined' && typeof cookieValue[id_searcher][id_filter_child].available !== 'undefined') {
                    cookieValue[id_searcher][id_filter_child].available.options = new Array();
                }

                if (typeof cookieValue[id_searcher][_id_filter_child] === 'undefined') {
                    cookieValue[id_searcher][_id_filter_child] = {
                        option: {},
                        type: GLOBALS.Types.Select,
                        dependency: id_filter_child
                    };
                } else {
                    cookieValue[id_searcher][_id_filter_child].option = {};
                    if (typeof cookieValue[id_searcher][_id_filter_child].dependency === 'undefined') {
                        cookieValue[id_searcher][_id_filter_child].dependency = id_filter_child;
                    }
                }

            }

            if ( enabledCookie && $('#go_search_' + id_searcher).length ) {
                cookieValue[id_searcher][_id_filter_child].option = new Array();//json.data.options;
                cookieValue.sad = 'sad';

                //save cookie.
                var json_cookieValue = JSON.stringify(cookieValue);
                $.dough(cookieName, json_cookieValue);

                if (typeof $.dough(cookieName) !== 'undefined') {
                    var cookieValue2 = $.dough(cookieName);
                }

            }

            return FilterProducts._removeOptionsDependency(cookieValue, id_searcher, _id_filter_child);
        } else {
            return cookieValue;
        }
    },
    _changeRadios: function(id_searcher, search, callback, noRemoveOptions) {

        FilterProducts._options[id_searcher].radio = new Array();

        if (FilterProducts._id_searcher != id_searcher){
             var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string')
                $.dough(cookieName, cookieValue);
            else
                cookieValue = $.dough(cookieName);

            if (!(enabledCookie && $('#go_search_' + id_searcher).length) || ((enabledCookie && $('#go_search_' + id_searcher).length) && cookieValue[id_searcher] === undefined)) {
                FilterProducts._options[id_searcher].checkbox = new Array();
                FilterProducts._options[id_searcher].select = new Array();
                FilterProducts._options[id_searcher].button = new Array();

                FilterProducts._id_searcher = id_searcher;
            }
        }

        var $elements = FilterProducts._getFilterElementsCookie(id_searcher);
//        FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Radio);
        if (typeof noRemoveOptions === 'undefined') {
            FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Radio);
        }

        $('div.filterproductspro_seacher' + (id_searcher ? '#searcher_' + id_searcher : '') +  ' div.block_content div.filter_content input[type="' + GLOBALS.Types.Radio + '"]:checked').each(function(i, control) {
            var id_control = $(control).attr('id');
            if(id_control != null && id_control != undefined) {
                var id_option = FilterProducts._getIdOptionFromControl(id_control);
                FilterProducts._options[id_searcher].radio.push(id_option);

                FilterProducts._loadOptionsInCookie(id_searcher, $elements, id_option);
            }

        });

        if (search) {
            FilterProducts.search({id_searcher: id_searcher});
        }

        if (callback !== undefined && typeof callback === 'function') {
            callback();
        }
    },
    _changeCheckboxs: function(id_searcher, search, callback, noRemoveOptions) {
        FilterProducts._options[id_searcher].checkbox = new Array();

        if (FilterProducts._id_searcher != id_searcher){
            var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string')
                $.dough(cookieName, cookieValue);
            else
                cookieValue = $.dough(cookieName);

            if (!(enabledCookie && $('#go_search_' + id_searcher).length) || ((enabledCookie && $('#go_search_' + id_searcher).length) && cookieValue[id_searcher] === undefined)) {
                FilterProducts._options[id_searcher].select = new Array();
                FilterProducts._options[id_searcher].radio = new Array();
                FilterProducts._options[id_searcher].button = new Array();

                FilterProducts._id_searcher = id_searcher;
            }
        }

        var $elements = FilterProducts._getFilterElementsCookie(id_searcher);
//        FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Checkbox);
        if (typeof noRemoveOptions === 'undefined') {
            FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Checkbox);
        }

        $('div.filterproductspro_seacher' + (id_searcher ? '#searcher_' + id_searcher : '') +  ' div.block_content div.filter_content input[type="' + GLOBALS.Types.Checkbox + '"]:checked').each(function(i, item) {
            var id_control = $(item).attr('id');

            if(id_control != null && id_control != undefined) {
                var id_option = FilterProducts._getIdOptionFromControl(id_control);
                FilterProducts._options[id_searcher].checkbox.push(id_option);

                FilterProducts._loadOptionsInCookie(id_searcher, $elements, id_option);
            }
        });

        if(search) {
            FilterProducts.search({id_searcher: id_searcher});
        }

        if (callback !== undefined && typeof callback === 'function') {
            callback();
        }

    },
    _clickButtons: function(button, id_searcher, search, callback, noRemoveOptions){

        FilterProducts._options[id_searcher].button = new Array();

        if (FilterProducts._id_searcher != id_searcher) {
            var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string') {
                $.dough(cookieName, cookieValue);
            } else {
                cookieValue = $.dough(cookieName);
            }

            if (!(enabledCookie && $('#go_search_' + id_searcher).length) || ((enabledCookie && $('#go_search_' + id_searcher).length) && cookieValue[id_searcher] === undefined)) {
                FilterProducts._options[id_searcher].checkbox = new Array();
                FilterProducts._options[id_searcher].radio = new Array();
                FilterProducts._options[id_searcher].select = new Array();

                FilterProducts._id_searcher = id_searcher;
            }
        }

        var $elements = FilterProducts._getFilterElementsCookie(id_searcher);
//            FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Button);
        if (typeof noRemoveOptions === 'undefined') {
            FilterProducts._removeOptionCookie(id_searcher, GLOBALS.Types.Button);
        }

        if(button != null && button != undefined){
            var is_multi_option = Boolean(parseInt($(button).attr('name').split('_').slice(1)[0]));

            if(!is_multi_option){
                $('div.filterproductspro_seacher' + (id_searcher ? '#searcher_' + id_searcher : '') +  ' div.block_content input[name="' + $(button).attr('name') + '"]').not($(button)).removeClass('on').addClass('off');
            }
        }

        $('div.filterproductspro_seacher' + (id_searcher ? '#searcher_' + id_searcher : '') +  ' div.block_content input[type="' + GLOBALS.Types.Button + '"].on').each(function(i, control){
            var id_control = $(control).attr('id');
            if(id_control != null && id_control != undefined) {
                var id_option = FilterProducts._getIdOptionFromControl(id_control);
                FilterProducts._options[id_searcher].button.push(id_option);

                FilterProducts._loadOptionsInCookie(id_searcher, $elements, id_option);
            }
        });

        if(search) {
            FilterProducts.search({id_searcher: id_searcher});
        }

        if (callback !== undefined && typeof callback === 'function') {
            callback();
        }
    },
    registerEvents: function(){
        //{1}
        //$(this).parents('.filterproductspro_seacher:last').attr('id').split('_')[1]
        //Busca en el DOM a partir del {select} donde se origna el evento hasta donde el padre tenga la clase {filterproductspro_seacher}
        //Ubica el puntero en el ultimo objeto que contiene el {div.searher_#}

        $('div.filterproductspro_seacher div.block_content select[name="' + GLOBALS.Types.Select + '"]').change(function(){
            var id_searcher = $(this).parents('.filterproductspro_seacher:last').attr('id').split('_')[1];//{1}
            FilterProducts._changeSelects($(this), id_searcher, true);
        });

        $('div.filterproductspro_seacher div.block_content input[type="' + GLOBALS.Types.Checkbox + '"]').change(function(){
            var id_searcher = $(this).parents('.filterproductspro_seacher:last').attr('id').split('_')[1];//{1}
            FilterProducts._changeCheckboxs(id_searcher, true);
        });

        $('div.filterproductspro_seacher div.block_content input[type="' + GLOBALS.Types.Radio + '"]').change(function(){
            var id_searcher = $(this).parents('.filterproductspro_seacher:last').attr('id').split('_')[1];//{1}
            FilterProducts._changeRadios(id_searcher, true);
        });

        $('div.filterproductspro_seacher div.block_content input[type="' + GLOBALS.Types.Button + '"]').click(function(){
            var id_searcher = $(this).parents('.filterproductspro_seacher:last').attr('id').split('_')[1];//{1}
            FilterProducts._clickButtons($(this), id_searcher, true);
        });

        $('span.one_filter').click(function(e){
            var id_searcher = $(e.target).parents('.filterproductspro_seacher:last').attr('id').split('_')[1];//{1}

            CustomControls.resetByFilter({
                filters: new Array($(e.target).attr('name')),
                id_searcher: id_searcher
            });
        });

        $('span.clear_all_filters').click(function(e) {
            var ids_filter = new Array();
            //Mueve el puntero 2 contenedores hacia atras para obtener el {searcher_{ID}}
            $(e.target).parent().parent().find('.filter_content').each(function(i, filter){
                ids_filter.push($(filter).attr('id'));
            });

            var id_searcher = $(this).parents('.filterproductspro_seacher:last').attr('id').split('_')[1];//{1}

            if (enabledCookie && $('#go_search_' + id_searcher).length) {
                var cookieName = 'searchers';
                var cookieValue = {};

                if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string') {
                    $.dough(cookieName, cookieValue);
                } else  {
                    cookieValue = $.dough(cookieName);
                }

                if (typeof cookieValue[id_searcher] !== 'undefined') {
                    delete cookieValue[id_searcher];
                }

                var json_cookieValue = JSON.stringify(cookieValue);
                $.dough(cookieName, json_cookieValue);

            }

            CustomControls.resetByFilter({
                filters: ids_filter,
                id_searcher: id_searcher
            });
        });

        $('.go_search').click(function(){
            var id_searcher = $(this).attr('id').split('_')[2];
            if(id_searcher)
                FilterProducts.search({
                    id_searcher: id_searcher,
                    id_filter: null,
                    force_search: true,
                    avoid_loading: false
                });
        });

        $('.wrapper_name .expand').toggle(function(e){
            var _self = $(e.target);
            _self.parent().siblings().not('.clear').not(':radio').not(':checkbox').hide();
            if (typeof $.uniform !== 'undefined') {
                $.uniform.update();
            }
        },function(e){
            var _self = $(e.target);
            _self.parent().siblings().not('.clear').not(':radio').not(':checkbox').show();
            if (typeof $.uniform !== 'undefined') {
                $.uniform.update();
            }
        }).click(function(e){
            $(e.target).toggleClass('off on');
        });
        $('.wrapper_name .expand').trigger('click');
    },
    getOptions: function(id_searcher){
        try{
            var options = new Array();

            $.each(FilterProducts._options[id_searcher], function(key, data) {
                $.each(data, function(i, option) {
                    var id_option = 0;
                    if (typeof option === 'object') {
                        id_option = option.id_option;
                    } else {
                        id_option = option;
                    }

                    if ($.inArray(id_option, options) < 0) {
                        options.push(id_option);
                    }
                });
            });

            return options;
        }
        catch($Exc){
            return new Array();
        }
    },
    search: function(params, _callback) {
        var p = $.extend({},{
            id_searcher: null,
            id_filter: null,
            force_search: false,
            avoid_loading: false
        },params);

        if (typeof FilterProducts._id_searcher === typeof null || FilterProducts._id_searcher !== p.id_searcher) {
            FilterProducts._id_searcher = p.id_searcher;
        }

        var options = FilterProducts.getOptions(p.id_searcher);

        var callback = function(show_loading) {
            //Prevenir la busqueda
            if((!p.force_search && $('#go_search_' + p.id_searcher).length)/* || (p.force_search && !options.length)*/) {
                FilterProducts._unblockUI();
                if (_callback !== undefined && typeof _callback === 'function')
                    _callback();

                return;
            } else {
                //detener la b?squeda si es por dependencia y no es el ?ltimo
                if (typeof $('#go_search_' + p.id_searcher)[0] === typeof undefined &&
                    typeof $(':input[id^="filter_"][id$="_'+p.id_filter+'"],select[id^="filter_"][id$="_'+p.id_filter+'"]')[0] !== typeof undefined)
                {
                    FilterProducts._unblockUI();
                    if (_callback !== undefined && typeof _callback === 'function')
                        _callback();

                    return;
                }
            }

            var search_query = '';
            if ($('#searcher_' + p.id_searcher + ' .search_query').length)
                search_query = $('#searcher_' + p.id_searcher + ' .search_query').val();

            //save cookie for search query
            if (enabledCookie && $('#go_search_' + p.id_searcher).length) {

                var cookieName = 'searchers';
                var cookieValue = {};

                if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string') {
                    $.dough(cookieName, cookieValue);
                } else {
                    cookieValue = $.dough(cookieName);
                }

                if (cookieValue[p.id_searcher] === undefined) {
                    cookieValue[p.id_searcher] = {};
                }

                cookieValue[p.id_searcher].search_query = search_query;

                var json_cookieValue = JSON.stringify(cookieValue);
                $.dough(cookieName, json_cookieValue);

            }

            var _data = {
                'options[]': options,
                search_query: search_query,
                p: 1,
                id_category: id_category,
                id_manufacturer: id_manufacturer,
                id_supplier: id_supplier,
                id_searcher: p.id_searcher,
                ajax: true,
                token: fpp_static_token
            };

            if ($('#nb_item').val() != undefined && $('#nb_item').val() != '')
                _data.n = $('#nb_item').val();

            $.ajax({
                url: fpp_is_ps_15 ? baseDir + 'index.php?fc=module&module=filterproductspro&controller=search' : filterproductspro_dir + 'filterproductspro_search.php',
                type: 'POST',
                async: true,
                cache: false,
                data: _data,
                dataType: 'json',
                beforeSend: function(){
                    if (typeof show_loading !== 'undefined' && show_loading)
                        if (_callback === undefined || typeof _callback !== 'function')
                            FilterProducts._blockUI();
                },
                success: function(result){
                    var product_list = '#product_list, .product_list, #product_list_wrapper, .tab-content';

                    $(id_content_results).addClass('filterproductspro');

                    if (result.nb_products <= 0){
                        $(id_content_results + ' >*:not(.filterproductspro_seacher_home)').remove();
                        $(id_content_results).append(result.productList);

                        return true;
                    }

                    //if ($(product_list).length <= 0){
                        $(id_content_results + ' >*:not(.filterproductspro_seacher_home)').remove();
                        $(id_content_results).append(result.categoryHome);
                        $(id_content_results).find('h1').hide();
                        $(id_content_results).find('.content_scene_cat').hide();
                        $(id_content_results).find('.views').hide();
                    //}

                    $('.heading-counter').hide();

                    $('.category-product-count, .product-count').html(result.categoryCount);

                    /*if (result.productList) {
                        $(id_content_results + ' >*:not('+product_list+')').remove();
                        $(product_list).replaceWith($.utf8_decode(result.productList));
                    } else {
                        $(product_list).html('');
                    }*/

                    FilterProducts.removeItems({items : items_to_remove});

                    $(product_list).css('opacity', '1');
                    if ($.browser.msie) {
                        // Fix bug with IE8 and aliasing
                        $(product_list).css('filter', '');
                    }

                    //compatibilidad con plantillas.
                    //------------------------------------------------------------------------
                    if (typeof bindGrid === 'function')
                        bindGrid();

                    if ($('#view_mode').length) {
                        $('#view_mode').addClass('in_grid');
                    }

                    if ($('.mode-view .switch_mode').length > 0) {
                        $('.products_left_grid_button').unbind('click').bind('click', function() {
                            $('.products_right_grid_button').removeClass('active');
                            $(this).addClass('active');
                            setCookie('product_mode', 'grid', 1);
                            FilterProducts.search({id_searcher: p.id_searcher}, _callback);
                        });
                        $('.products_right_grid_button').unbind('click').bind('click', function() {
                            $('.products_left_grid_button').removeClass('active');
                            $(this).addClass('active');
                            setCookie('product_mode', 'list',1);
                            FilterProducts.search({id_searcher: p.id_searcher}, _callback);
                        });
                    }

                    if (typeof $.totalStorage !== 'undefined'){
                        var view = $.totalStorage('display');

                        if (view && view != 'grid'){
                            if (typeof display !== 'undefined')
                                display(view);
                        }else
                            $('.display').find('li#grid').addClass('selected');
                    }

                    if (typeof elementsAnimate !== typeof undefined){
                        elementsAnimate();
                    }

                    if (typeof blockHover === 'function'){
                        blockHover();
                    }
                    //------------------------------------------------------------------------

                    if (result.pagination !== "" && result.pagination !== false && result.pagination.search(/[^\s]/i) >= 0) {
                        if ($(result.pagination).find('ul.pagination').length) {
                            $('div.pagination').show();
                            $('ul.pagination').each(function() {
                                $(this).replaceWith($(result.pagination).find('ul.pagination'));
                            });
                        } else if (!$('ul.pagination').length) {
                            $('div.pagination').show();
                            $('div.pagination').each(function() {
                                $(this).html($(result.pagination));
                            });
                        } else {
                            $('ul.pagination').html('');
                            $('div.pagination').hide();
                        }
                    } else {
                        $('ul.pagination').html('');
                        $('div.pagination').hide();
                    }

                    if (typeof(ajaxCart) != "undefined") {
                        ajaxCart.overrideButtonsInThePage();
                    }

                    if (typeof $.uniform !== 'undefined') {
                        $(id_content_results + ' select').uniform();
                    }

                    FilterProducts._overrideEvents();
                },
                complete: function(){
                    window.scrollTo(0, $(id_content_results).offset().top);

                    FilterProducts._unblockUI();
                    if (_callback !== undefined && typeof _callback === 'function')
                        _callback();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    alert(XMLHttpRequest.responseText);
                }
            });
        };

        if(options.length) {
            if (_callback !== undefined && typeof _callback === 'function') {
                p.avoid_loading = true;
            }
            FilterProducts._unavailableOptions({options: options, id_searcher: p.id_searcher, id_filter: p.id_filter, avoid_loading: p.avoid_loading, callback: callback});
        } else {
            $('#searcher_' + p.id_searcher + ' label[for^="option_"], #searcher_' + p.id_searcher + ' span[name^="option_"], #searcher_' + p.id_searcher + ' :button.fpp_button').fadeIn();
            $('#searcher_' + p.id_searcher + ' *[id^="filter_"]').fadeIn();
            callback(true);
            //si no hay opciones seleccionadas entonces recorre todos los selects y los restaura a sus valores originales
            if (p.id_searcher !== null) {
                $.each($('#searcher_' + p.id_searcher).find('select'), function(i, _select) {
                    FilterProducts.resetFiltersDependency(_select, undefined, true);
                });
            }

        }

        return true;
    },
    _unavailableOptions: function(params){
        var p = $.extend({},{
            id_searcher: null,
            id_filter: null,
            avoid_loading: false,
            callback: undefined
        },params);

        if ($('#searcher_multi_option_' + params.id_searcher).val() === '1') {
            if (typeof p.callback === 'function') {
                p.callback(true);
            } else {
                FilterProducts._unblockUI();
            }

            return;
        }

        if(!p.id_searcher) {
            if (typeof p.callback === 'function') {
                p.callback();
            } else {
                FilterProducts._unblockUI();
            }

            return;
        }

        if ((p.options).length <= 0)
            return;

        var search_query = '';
        if ($('#searcher_' + p.id_searcher + ' .search_query').length) {
            search_query = $('#searcher_' + p.id_searcher + ' .search_query').val();
        }

        var callback = function() {
            $.ajax({
                url: filterproductspro_dir + 'actions.php',
                type: 'POST',
                dataType: 'json',
                async: false,
                cache: false,
                data:{
                    action: 'getUnavailableOptionsByOptions',
                    'options[]': p.options,
                    search_query: search_query,
                    id_searcher: p.id_searcher,
                    id_filter: p.id_filter,
                    id_category: id_category,
                    id_manufacturer: id_manufacturer,
                    id_supplier: id_supplier,
                    token: fpp_static_token
                },
                beforeSend: function() {

                },
                success: function(json) {
                    try {
                        if(json.message_code == 0) {
                            var ids_options = new Array();

                            if (enabledCookie) {
                                var cookieName = 'searchers';
                                var cookieValue = $.dough(cookieName);
                            }

                            var options_unavailable = new Array();

                            $.each(json.data, function(id_filter, data) {
                                if (typeof data.options !== 'undefined') {
                                    $.each(data.options, function(i, id_option) {
                                        options_unavailable.push(id_option);
                                    });
                                }
                                if (typeof data.options_select !== 'undefined')
                                    $.each(data.options_select, function(i, option) {
                                        options_unavailable.push(option.id_option);
                                    });

                                if (enabledCookie) {
                                    if (typeof cookieValue !== 'undefined') {
                                        if (typeof cookieValue[p.id_searcher] !== 'undefined')  {
                                            var _id_filter = id_filter;
                                            if (p.id_filter !== null) {
                                                _id_filter = p.id_filter;
                                            }

                                            if (typeof cookieValue[p.id_searcher][_id_filter] !== 'undefined') {
                                                cookieValue[p.id_searcher][_id_filter].unavailable = {};
                                                cookieValue[p.id_searcher][_id_filter].unavailable.selectors = {
                                                    fadeout: new Array(),
                                                    hide: new Array(),
                                                    select: new Array()
                                                };
                                                cookieValue[p.id_searcher][_id_filter].unavailable.options_prev = new Array();
                                            }
                                        }
                                    }
                                }
                            });
                            //---------------------------------------------------------------------------------
                            //Vuelve a mostrar las opciones anteriores al seleccion la opcion en cuestio.
                            //Al seleccionar una opcion se ocultas otras, cuando se vuelve a clickar en la opcion, debe volver a mostrar las opciones que estaban ocultas, esto lo hace este codigo.
                            var _options_prev = options_prev[p.id_searcher];

                            if (_options_prev != undefined && _options_prev != ''){
                                $.each(_options_prev, function(i, id_option_prev){
                                    var option_to_show = false;

                                    $.each(options_unavailable, function(i, id_option){
                                        if (id_option_prev == id_option) {
                                            option_to_show = true;
                                            return true;
                                        }
                                    });

                                    if(!option_to_show){
                                        if (enabledCookie)
                                            if (cookieValue !== undefined && cookieValue[p.id_searcher] !== undefined && cookieValue[p.id_searcher][p.id_filter] !== undefined
                                                    && cookieValue[p.id_searcher][p.id_filter].unavailable !== undefined) {
                                                cookieValue[p.id_searcher][p.id_filter].unavailable.options_prev.push(id_option_prev);
                                            }

                                        $('#searcher_' + p.id_searcher + ' label[for="option_' + id_option_prev + '"], #searcher_' + p.id_searcher + ' span[name="option_' + id_option_prev + '"], #searcher_' + p.id_searcher + ' #' + id_option_prev).fadeIn();
                                        $('#searcher_' + p.id_searcher + ' *[id^="filter_"]').fadeIn();
                                    }
                                });
                            }
                            //---------------------------------------------------------------------------------

                            $.each(json.data, function(id_filter, data) {

                                //se quita porque ya viene loq ue
                                var _id_filter = id_filter;
//                                if (p.id_filter !== null)
//                                    _id_filter = p.id_filter;

                                if (enabledCookie) {
                                    if (typeof cookieValue !== 'undefined') {

                                        if (typeof cookieValue[p.id_searcher] !== 'undefined') {
                                            if (typeof cookieValue[p.id_searcher][_id_filter] !== 'undefined' && typeof cookieValue[p.id_searcher][_id_filter].unavailable === 'undefined') {
                                                cookieValue[p.id_searcher][_id_filter].unavailable = {};
                                                cookieValue[p.id_searcher][_id_filter].unavailable.selectors = {
                                                    fadeout: new Array(),
                                                    hide: new Array(),
                                                    select: new Array()
                                                };
                                                cookieValue[p.id_searcher][_id_filter].unavailable.options_prev = new Array();
                                            }
                                        }
                                    }
                                }

                                var selector = '#searcher_' + p.id_searcher + ' select[id^="filter_select_' + id_filter + '_"]';

                                if (FilterProducts.hideOptions) {
                                    //BORRA LAS OPCIONES DEL SELECT.
                                    var val_option_selected = $(selector).val();
                                    $(selector + ' option:not(:first)').remove();

                                    //OCULTA LOS OPCIONES NO DISPONIBLES.
                                    if (typeof data.options !== 'undefined') {
                                        $.each(data.options, function(i, option){


                                            if (data.type == GLOBALS.Types.Button) {
                                                if($('#searcher_' + p.id_searcher + ' #option_' + option).is(':button')) {
                                                    $('#option_' + option).fadeOut();
                                                    if (enabledCookie && cookieValue !== undefined && cookieValue[p.id_searcher] !== undefined && cookieValue[p.id_searcher][_id_filter] !== undefined)  {
                                                        cookieValue[p.id_searcher][_id_filter].unavailable.selectors.fadeout.push(option);
                                                    }

                                                }
                                            }

                                            if (data.type == GLOBALS.Types.Checkbox || data.type == GLOBALS.Types.Radio) {
                                                $('#searcher_' + p.id_searcher + ' label[for="option_' + option + '"], #searcher_' + p.id_searcher + ' span[name="option_' + option + '"]').hide();

                                                if (enabledCookie && cookieValue !== undefined && cookieValue[p.id_searcher] !== undefined && cookieValue[p.id_searcher][_id_filter] !== undefined) {
                                                    cookieValue[p.id_searcher][_id_filter].unavailable.selectors.hide.push(option);
                                                }
                                            }

                                            ids_options.push(option);
                                        });

                                        //Si no vienen opciones disponibles se oculta el filtro
                                        if (id_filter != p.id_filter) {
                                            if (data.type == GLOBALS.Types.Button)
                                            {
                                                if ($('#searcher_' + p.id_searcher + ' #filter_'+id_filter + ' :button[id^="option_"]:reallyvisible').length == 0)
                                                    $('#searcher_' + p.id_searcher + ' #filter_'+id_filter).fadeOut();
                                                else
                                                    $('#searcher_' + p.id_searcher + ' #filter_'+id_filter).fadeIn();
                                            }
                                            if (data.type == GLOBALS.Types.Checkbox || data.type == GLOBALS.Types.Radio)
                                            {
                                                var elements = $('#searcher_' + p.id_searcher + ' #filter_'+id_filter + ' label[for^="option_"]:reallyvisible, #searcher_' + p.id_searcher + ' #filter_'+id_filter + ' span[name^="option_"]:reallyvisible').length;
                                                if (elements === 0)
                                                    $('#searcher_' + p.id_searcher + ' #filter_'+id_filter).fadeOut();
                                                else
                                                    $('#searcher_' + p.id_searcher + ' #filter_'+id_filter).fadeIn();
                                            }
                                        }
                                    }

                                    //AGREGA SOLA LAS OPCIONES DISPONIBLES. LOS SELECT FUNCIONAN DIFERENTE A LOS DEMAS, YA QUE SE TRAEN LAS OPCIONES DISPONIBLES.

                                    if (data.options_select !== undefined) {
                                        var available_options_select = false;
                                        $.each(data.options_select, function(i, option) {
                                            if (enabledCookie && cookieValue !== undefined && cookieValue[p.id_searcher] !== undefined && cookieValue[p.id_searcher][_id_filter] !== undefined) {
                                                cookieValue[p.id_searcher][_id_filter].unavailable.selectors.select.push({id_option: option['id_option'], value: option['value']});
                                            }

//                                            var _option = $(selector_backup + '.filter_backup #option_' + id_option).clone();
                                            var _option = $('<option/>').val('option_' + option['id_option']).attr('id','option_' + option['id_option']).html(option['value']);
                                            $(selector).append(_option);
                                            available_options_select = true;

                                            ids_options.push(option['id_option']);
                                        });

                                        if (!available_options_select && id_filter != p.id_filter)
                                            $('#filter_'+id_filter).fadeOut();
                                        else
                                            $('#filter_'+id_filter).fadeIn();
                                    }
                                    else if (id_filter != p.id_filter && data.type == GLOBALS.Types.Select) {
                                        $('#filter_'+id_filter).fadeOut();
                                    }
                                }

                                $(selector + ' option[value=' + val_option_selected + ']').attr('selected', 'true');

                                if (enabledCookie) {
                                    var json_cookieValue = JSON.stringify(cookieValue);
                                    $.dough(cookieName, json_cookieValue);
                                }

                            });

                            options_prev[p.id_searcher] = options_unavailable;

                            //auto search - necesario para hacer una busqueda si se selecciona la ultima dependencia de un buscador
                            if (FilterProducts.hasChange) {
                                FilterProducts.hasChange = false;
                                var $filter = $('#searcher_' + p.id_searcher + ' #filter_' + p.id_filter);
                                if ($filter.is('.filter_content:last')) {
                                    if ($filter.find('.filter_parent').length > 0) {
                                        $('#searcher_' + p.id_searcher + ' #go_search_' + p.id_searcher).trigger('click');
                                    }
                                }
                            }

                            if (typeof $.uniform !== 'undefined') {
                                $.uniform.update();
                            }

                            if (typeof FilterProducts.update_uniform === 'function') {
                                FilterProducts.update_uniform();
                            }
                        } else {
                            alert(json.message);
                        }
                    }
                    catch($Exc) {
                        console.log('ERROR: ' + $Exc);
                    }
                },
                complete: function() {
                    if (typeof p.callback === 'function') {
                        p.callback();
                    } else {
                        FilterProducts._unblockUI();
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    alert(XMLHttpRequest.responseText);
                }
            });
        };

        if (p.avoid_loading === false) {
            FilterProducts._blockUI({}, callback);
        } else {
            callback();
        }
    },
    _getIdOptionFromControl: function(str){
        var val = str.split('_')[1];

        return (val != null && val != undefined && val != '' && typeof(val) != 'undefined') ? val : null;
    },
    _overrideEvents: function(){
        var options = FilterProducts.getOptions(FilterProducts._id_searcher);


        //Override enlaces de paginacion {a}
        $('#pagination a, .pagination a').click(function(event){
            var url = $(this).attr('href');

            if(url == null || url == undefined || url == ''){
                event.stopPropagation();
                event.preventDefault();
            }

            if ($('#selectPrductSort, #selectProductSort').length > 0)
                var splitData = $('#selectPrductSort, #selectProductSort').val().split(':');
            else
                var splitData = new Array('', '');

            var search_query = '';
            if ($('#searcher_' + FilterProducts._id_searcher + ' .search_query').length)
                search_query = $('#searcher_' + FilterProducts._id_searcher + ' .search_query').val();

            data = {
                'options[]': options,
                orderby: splitData[0],
                orderway: splitData[1],
                id_category: id_category,
                id_manufacturer: id_manufacturer,
                id_supplier: id_supplier,
                id_searcher: FilterProducts._id_searcher,
                search_query: search_query,
                ajax: true,
                token: fpp_static_token
            };
            if ($('#nb_item').val() != undefined && $('#nb_item').val() != '')
                data.n = $('#nb_item').val();

            FilterProducts._callAjaxOverrides(event, url, data);
        });

        //{2}
        //A partir el control donde se origna el evento, se desplaza hacia atras hasta donde ubique un {form}

        //Override de los botones {submit}
        $('#pagination :submit, .pagination :submit').click(function(event){
            var form = $(this).parents('form');//{2}
            var url = $(form).attr('action');

            if(url == null || url == undefined || url == ''){
                event.stopPropagation();
                event.preventDefault();
            }

            if ($('#selectPrductSort').length > 0)
                var splitData = $('#selectPrductSort').val().split(':');
            else
                var splitData = new Array('', '');

            data = {
                'options[]': options,
                orderby: splitData[0],
                orderway: splitData[1],
                id_category: id_category,
                id_manufacturer: id_manufacturer,
                id_supplier: id_supplier,
                id_searcher: FilterProducts._id_searcher,
                ajax: true,
                token: fpp_static_token
                //'&' + $(form).serialize()
            };

            if ($('#nb_item').val() != undefined && $('#nb_item').val() != ''){
                data.n = $('#nb_item').val();
            }

            FilterProducts._callAjaxOverrides(event, url, data);
        });

        //Override sort
        $('#selectPrductSort, #selectProductSort, .selectProductSort').removeAttr('onchange').unbind().change(function(event){

            var form = $(this).parents('form');//{2}
            var url = $(form).attr('action');

            if(url == null || url == undefined || url == ''){
                event.stopPropagation();
                event.preventDefault();
            }

            var splitData = new Array('position', 'asc');

            if($(this).val().match(/[a-z]:[a-z0-9]/gi))
                splitData = $(this).val().split(':');
            else{
                url = '';
                var vars = $(this).val().split('?');//Parte la url por {?} para obtener las variables pasadas por GET
                vars = vars[1] = undefined ? vars[1] : vars[1].split('&');//Obtiene la 2da posicion donde se encuentran las variables y parte la cadena por {&}

                var orderby = vars[0] != undefined ? vars[0] : '';//Obtiene la 1da posicion la cual contiene la variable {orderby={valor}}
                var orderway = vars[1] != undefined ? vars[1] : '';//Obtiene la 2ra posicion la cual contiene la varibla {orderway={$valor}}

                if(orderby != '' && orderway != '')
                    splitData = new Array(orderby.split('=')[1], orderway.split('=')[1]);//Parte cada variable por {=} y obtiene la 2da posicion la cual posee el valor
            }

            data = {
                'options[]': options,
                orderby: splitData[0],
                orderway: splitData[1],
                id_category: id_category,
                id_manufacturer: id_manufacturer,
                id_supplier: id_supplier,
                id_searcher: FilterProducts._id_searcher,
                ajax: true,
                token: fpp_static_token
            };

            if ($('#nb_item').val() != undefined && $('#nb_item').val() != ''){
                data.n = $('#nb_item').val();
            }

            FilterProducts._callAjaxOverrides(event, url, data);
        });

        $('.js-nb_item').die('change');
        $('#nb_item').die('change');

        $('.js-nb_item, #nb_item').change(function(event){

            var form = $(this).parents('form');//{2}
            var url = $(form).attr('action');

            if(url == null || url == undefined || url == ''){
                event.stopPropagation();
                event.preventDefault();
            }

            if ($('#selectPrductSort').length > 0)
                var splitData = $('#selectPrductSort').val().split(':');
            else
                var splitData = new Array('', '');

            data = {
                'options[]': options,
                orderby: splitData[0],
                orderway: splitData[1],
                id_category: id_category,
                id_manufacturer: id_manufacturer,
                id_supplier: id_supplier,
                id_searcher: FilterProducts._id_searcher,
                ajax: true,
                token: fpp_static_token
            };

            if ($('#nb_item').val() != undefined && $('#nb_item').val() != ''){
                data.n = $('#nb_item').val();
            }

            FilterProducts._callAjaxOverrides(event, url, data);
        });
    },
    _callAjaxOverrides: function(event, url, data){
        var extra_params = url.split('p=');

        $.ajax({
            url: (fpp_is_ps_15 ? baseDir + 'index.php?fc=module&module=filterproductspro&controller=search' + (extra_params[1] != undefined ? '&p=' + extra_params[1] : '') : filterproductspro_dir + 'filterproductspro_search.php' + (extra_params[1] != undefined ? '?p=' + extra_params[1] : '')),
            type: 'POST',
            async: true,
            cache: false,
            data: data,
            dataType: 'json',
            beforeSend: function(){
                FilterProducts._blockUI();
            },
            success: function(result){
                var product_list = '#product_list, .product_list, #product_list_wrapper, .tab-content';

                $(id_content_results).addClass('filterproductspro');

                if (result.nb_products <= 0){
                    $(id_content_results + ' >*:not(.filterproductspro_seacher_home)').remove();
                    $(id_content_results).append(result.productList);

                    return true;
                }

                //if ($(product_list).length <= 0){
                    $(id_content_results + ' >*:not(.filterproductspro_seacher_home)').remove();
                    $(id_content_results).append(result.categoryHome);
                    $(id_content_results).find('h1').hide();
                    $(id_content_results).find('.content_scene_cat').hide();
                    $(id_content_results).find('.views').hide();
                //}

                $('.heading-counter').hide();

                $('.category-product-count, .product-count').html(result.categoryCount);

                /*if (result.productList){
                    $(product_list).replaceWith($.utf8_decode(result.productList));
                }else
                    $(product_list).html('');*/

                FilterProducts.removeItems({items : items_to_remove});

                $(product_list).css('opacity', '1');
                    if ($.browser.msie) // Fix bug with IE8 and aliasing
                        $(product_list).css('filter', '');

                //compatibilidad con plantillas.
                //------------------------------------------------------------------------
                if (typeof bindGrid === 'function')
                    bindGrid();

                if ($('#view_mode').length)
                    $('#view_mode').addClass('in_grid');

                if ($('.mode-view .switch_mode').length > 0){
                    $('.products_left_grid_button').unbind('click').bind('click', function() {
                        $('.products_right_grid_button').removeClass('active');
                        $(this).addClass('active');
                        setCookie('product_mode', 'grid', 1);
                        FilterProducts.search({id_searcher: p.id_searcher}, _callback);
                    });
                    $('.products_right_grid_button').unbind('click').bind('click', function() {
                        $('.products_left_grid_button').removeClass('active');
                        $(this).addClass('active');
                        setCookie('product_mode', 'list',1);
                        FilterProducts.search({id_searcher: p.id_searcher}, _callback);
                    });
                }

                if (typeof $.totalStorage !== 'undefined'){
                    var view = $.totalStorage('display');

                    if (view && view != 'grid'){
                        if (typeof display !== 'undefined')
                            display(view);
                    }else
                        $('.display').find('li#grid').addClass('selected');
                }

                if (typeof elementsAnimate !== typeof undefined){
                    elementsAnimate();
                }

                if (typeof blockHover === 'function'){
                    blockHover();
                }

                if (typeof $.uniform !== 'undefined') {
                    $(id_content_results + ' select').uniform();
                }
                //------------------------------------------------------------------------

                if (result.pagination !== "" && result.pagination !== false && result.pagination.search(/[^\s]/i) >= 0) {
                    if ($(result.pagination).find('ul.pagination').length)
                    {
                        $('div.pagination').show();
                        $('ul.pagination').each(function() {
                            $(this).replaceWith($(result.pagination).find('ul.pagination'));
                        });
                    }
                    else if (!$('ul.pagination').length)
                    {
                        $('div.pagination').show();
                        $('div.pagination').each(function() {
                            $(this).html($(result.pagination));
                        });
                    }
                    else
                    {
                        $('ul.pagination').html('');
                        $('div.pagination').hide();
                    }
                }
                else
                {
                    $('ul.pagination').html('');
                    $('div.pagination').hide();
                }

                if (typeof(ajaxCart) != "undefined")
                    ajaxCart.overrideButtonsInThePage();

                FilterProducts._overrideEvents();
            },
            complete: function(){
                window.scrollTo(0, $(id_content_results).offset().top);

                FilterProducts._unblockUI();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert(XMLHttpRequest.responseText);
            }
        });

        event.stopPropagation();
        event.preventDefault();
    },
    _blockUI: function(params, callback){
        var p = $.extend({},{
            message: undefined
        },params);
        $('div.filterproductspro_seacher, ' + id_content_results).block(p, callback);

    },
    _unblockUI: function(){
        $('div.filterproductspro_seacher, ' + id_content_results).unblock();
    },
    removeItems: function(params){
        var param = $.extend({},{
            items: ''
        },params);

        if(!$.isEmpty(param.items)){
            $.each(param.items, function(i, item){
               $(id_content_results + ' ' + item).remove();
            });
        }
    }
};

var CustomControls = {
    params: {},
    init: function(params){
        var p = $.extend({},{
            checkboxHeight: 25,
            radioHeight: 25
        },params);

        this.params = p;

        $('.filterproductspro_seacher input.radio, .filterproductspro_seacher input.checkbox').each(function(i, item){
            var span = $('<span></span>').addClass(item.type).attr({name: $(item).attr('id')});

            if($(item).is(':checked'))
                $(span).css({
                    backgroundPosition: '0 -' + ((item.type == 'checkbox') ? (p.checkboxHeight * 2) : (p.radioHeight * 2)) + 'px'
                });

            $(item)
            .hide()
            .before(span)
            .click(function(){
                CustomControls.clear();
            });

            $('label[for="' + $(item).attr('id') + '"]')
            .css({
                height: p.radioHeight
            })
            .click(function(){
                CustomControls.clear();
            });

            if(!$(item).attr('disabled')){
                $(span)
                    .mousedown(function(){CustomControls.pushed($(this))})
                    .mouseup(function(){CustomControls.check($(this))});
            }
        });

        $('.filterproductspro_seacher, .filterproductspro_seacher label').mouseup(function(){CustomControls.clear()});
    },
    pushed: function(el){
        var name = $(el).attr('name');
        var id_option = name.split('_').pop();
        var input = $(el).parent().find('input#option_' + id_option);
//        var input = $(el).next();
        var type = $(input).attr('type');

        if(type == 'checkbox')
            $(el).css('backgroundPosition', '0 -' + (this.params.checkboxHeight * ($(input).is(':checked') ? 3 : 1)) + 'px');
        else if(type == 'radio')
            $(el).css('backgroundPosition', '0 -' + (this.params.radioHeight * ($(input).is(':checked') ? 3 : 1)) + 'px');
    },
    check: function(el){
        var name = $(el).attr('name');
        var id_option = name.split('_').pop();
        var input = $(el).parent().find('input#option_' + id_option);
//        var input = $(el).next();

        var type = $(input).attr('type');

        if($(input).is(':checked')) {
            $(el).css('backgroundPosition', '0 0');
            $(input).attr('checked', false).trigger('change');
        }
        else{
            if(type == 'checkbox')
                $(el).css('backgroundPosition', '0 -' + (CustomControls.params.checkboxHeight * 2) + 'px');
            else if(type == 'radio'){
                $(el).css('backgroundPosition', '0 -' + (CustomControls.params.radioHeight * 2) + 'px');
                //Des-seleccionar los otros radios
                $('input[name="' + $(input).attr('name') + '"]').not(input).prev().css('backgroundPosition', '0 0');
            }
            $(input).attr('checked', true).trigger('change');
        }
    },
    clear: function() {
        $('.filterproductspro_seacher input.radio, .filterproductspro_seacher input.checkbox').each(function(i, item){
            var type = $(item).attr('type');
            var checked = $(item).is(':checked');

            if(type == 'checkbox' || type == 'radio' ) {
                $(item).next()[checked ? 'addClass' : 'removeClass']('on');
            }

            if(type == 'checkbox' && checked)
                $(item).prev().css('backgroundPosition', '0 -' + (CustomControls.params.checkboxHeight * 2) + 'px');
            else if(type == 'checkbox' && !checked)
                $(item).prev().css('backgroundPosition', '0 0');
            else if(type == 'radio' && checked)
                $(item).prev().css('backgroundPosition', '0 -' + (CustomControls.params.radioHeight * 2) + 'px');
            else if(type == 'radio')
                $(item).prev().css('backgroundPosition', '0 0');
        });

    },
    resetByFilter: function(params) {
        var p = $.extend({},{
            filters: new Array(),
            id_searcher: null
        },params);

        if (enabledCookie && $('#go_search_' + p.id_searcher).length) {
            var cookieName = 'searchers';
            var cookieValue = {};

            if ($.dough(cookieName) === undefined || $.dough(cookieName) === '' || typeof $.dough(cookieName) === 'string') {
                $.dough(cookieName, cookieValue);
            } else {
                cookieValue = $.dough(cookieName);
            }
        }

        $.each(p.filters, function(i, id_filter) {
            if(id_filter != null && id_filter != undefined) {
                var filter = $('#' + id_filter);

                if($(filter).length) {
                    $(filter).find('select:not(.filter_backup)').each(function(i, select) {
                        var _id_filter = $(select).attr('id').split('_')[2];

                        if (enabledCookie && $('#go_search_' + p.id_searcher).length) {
                            if (cookieValue[p.id_searcher] !== undefined && cookieValue[p.id_searcher][_id_filter] !== undefined) {
                                delete cookieValue[p.id_searcher][_id_filter];
                            }
                        }
                    });

                    if (enabledCookie && $('#go_search_' + p.id_searcher).length) {
                        var _id_filter = id_filter.split('_').pop();

                        if (cookieValue[p.id_searcher] !== undefined && cookieValue[p.id_searcher][_id_filter] !== undefined) {
                            delete cookieValue[p.id_searcher][_id_filter];
                        }
                    }

                    var select = $(filter).find('select');
                    if (typeof select[0] !== typeof undefined && select[0] !== null)
                    {
                        var ids = select.attr('id').split('_');
                        var id_parent = ids.pop();
                    }

                    if (typeof id_parent !== typeof undefined && id_parent !== '0')
                        $('select[id|=filter_select_' + id_parent+']').trigger('change');
                    else
                        FilterProducts.resetFiltersDependency(select, undefined, undefined, true);

                    $(filter).find('select').val('');
                    $(filter).find(':checkbox:checked').attr('checked', false);
                    $(filter).find(':radio:checked').attr('checked', false);
                    $(filter).find(':button.on').removeClass('on').addClass('off');
                    if (typeof $.uniform !== 'undefined') {
                        $.uniform.update();
                    }

                    if (typeof FilterProducts.update_uniform === 'function') {
                        FilterProducts.update_uniform();
                    }

                }
            }
        });

        if (enabledCookie && $('#go_search_' + p.id_searcher).length) {
            var json_cookieValue = JSON.stringify(cookieValue);
            $.dough(cookieName, json_cookieValue);
        }

        var callback_clear = function() {
            CustomControls.clear();
        };

        var callback_search = function() {
            FilterProducts.search({id_searcher: p.id_searcher}, callback_clear);
        };

        var callback_button = function() {
            FilterProducts._clickButtons(null, p.id_searcher, false, callback_search, true);
        };

        var callback_checkbox = function() {
            FilterProducts._changeCheckboxs(p.id_searcher, false, callback_button, true);
        };

        var callback_radio = function() {
            FilterProducts._changeRadios(p.id_searcher, false, callback_checkbox, true);
        };

        var callback_select = function() {
            FilterProducts._changeSelects(null, p.id_searcher, false, callback_radio, true);
        };

        FilterProducts._removeOptionCookie(p.id_searcher);

        callback_select();

//        FilterProducts._changeSelects(null, p.id_searcher, false);
//        FilterProducts._changeRadios(p.id_searcher, false);
//        FilterProducts._changeCheckboxs(p.id_searcher, false);
//        FilterProducts._clickButtons(null, p.id_searcher, false);
//        FilterProducts.search({id_searcher: p.id_searcher});
//        CustomControls.clear();

    }
};

//SOLUCION PARA IE 8 AL MOMENTO DE CREAR LAS DEPENDENCIAS DESDE EL FICHERO CSV.
if (!Object.keys) {
  Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}