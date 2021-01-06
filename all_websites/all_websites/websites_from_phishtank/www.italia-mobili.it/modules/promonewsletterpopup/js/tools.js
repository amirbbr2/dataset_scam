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

$(function() {
    if (typeof $.initPtsCarousel !== typeof undefined) {
        $.initPtsCarousel();
    }
    if (typeof $('#display_form_register')[0] !== typeof undefined &&
            typeof $('#pts_register_product')[0] !== typeof undefined) {
        $('#display_form_register').click(function(e) {
            $('#pts_register_product').toggle(500);
            $(e.currentTarget).blur();
        });
    }

    //remove focus for elements
    $('.pts a, .pts .btn, .pts input:checkbox').click(function(e) {
         $(e.currentTarget).blur();
    });

    //change language of helper languages templates
    $('.pts .change-language').click($.changeLanguage);
});

jQuery.extend({
    isEmpty: function() {
        var count = 0;
        $.each(arguments, function(i, data) {
            if (data !== null && data !== undefined && data !== '' && typeof(data) !== 'undefined') {
                count++;
            }
            else
                return false
        });
        return (arguments).length == count ? false : true;
    },
    isEmail: function(val) {
        var regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
        return regExp.exec(val);
    },
    tinyMCEInit: function(element) {
        $().ready(function() {
            $(element).tinymce({
                // General options
                theme: "advanced",
                plugins: "safari,pagebreak,style,layer,table,advimage,advlink,inlinepopups,media,searchreplace,contextmenu,paste,directionality,fullscreen",
                // Theme options
                theme_advanced_buttons1: "newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect",
                theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,,|,forecolor,backcolor",
                theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,media,|,ltr,rtl,|,fullscreen",
                theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,pagebreak",
                theme_advanced_toolbar_location: "top",
                theme_advanced_toolbar_align: "left",
                theme_advanced_statusbar_location: "bottom",
                theme_advanced_resizing: true,
                content_css: tiny_content_css,
                document_base_url: tiny_doc_base_url,
                template_external_list_url: "lists/template_list.js",
                external_link_list_url: "lists/link_list.js",
                external_image_list_url: "lists/image_list.js",
                media_external_list_url: "lists/media_list.js",
                elements: "nourlconvert",
                convert_urls: false,
                language: tiny_lang,
                width: "600"
            });
        });
    },
    getList: function(table, action) {
        var div_loading = '#' + table + ' tbody';
        var _json = {
            data: {
                action: action
            },
            success: function(json) {
                $('#' + table + ' thead').empty();
                $('#' + table + ' tbody').empty();

                var $tr_head = $('<tr/>');
                $.each(json.headers, function(field, name_field) {
                    var $th_head = $('<th/>');
                    if (field === 'actions' || (typeof json.status !== typeof undefined && json.status instanceof Array
                            && (json.status.indexOf(field) !== -1) || field in json.status)) {
                        $th_head.addClass('text-center');
                    }
                    $th_head.html(name_field).appendTo($tr_head);
                });
                $tr_head.appendTo($('#' + table + ' thead'));

                $.each(json.content, function(i, data) {
                    var $tr = $('<tr/>');
                    if (typeof json.prefix_row !== typeof undefined && !$.isEmpty(json.prefix_row) &&
                            typeof data.id !== typeof undefined && !$.isEmpty(data.id)) {
                        $tr.attr('id', json.prefix_row + '_' + data.id);
                    }

                    if (typeof json.color !== typeof undefined && typeof data[json.color.by] !== typeof undefined) {
                        $tr.addClass(json.color.colors[data[json.color.by]]);
                    }

                    $.each(json.headers, function(field, name_field) {
                        var $td =  $('<td/>');
                        if (field == 'actions') {
                            $td.addClass('actions text-center');
                            $.each(json.actions, function(action, attributes) {
                                var action_class = class_name;
                                if (typeof attributes.action_class !== typeof undefined) {
                                    action_class = attributes.action_class;
                                }
                                if (typeof attributes.class !== typeof undefined) {
                                    var $span = $('<span/>').addClass(attributes.class);
                                    $span.html('&nbsp;' + attributes.title);
                                    if (typeof attributes.icon !== typeof undefined) {
                                        var $icon = $('<i/>').addClass(attributes.icon);
                                        $icon.prependTo($span);
                                    }
                                    $span.click(function(event) {
                                        window[action_class][action](event, data);
                                    });
                                    $span.appendTo($td);
                                } else if (typeof attributes.img !== typeof undefined) {
                                    var _img = $('<img/>').attr({
                                        src: module_img + 'icon/' + attributes.img,
                                        title: attributes.title,
                                        alt: attributes.title
                                    });
                                    _img.click(function(event) {
                                        window[action_class][action](event, data);
                                    });
                                    _img.appendTo($td);
                                } else {
                                    $td.html(data[field]);
                                }
                            });
                        } else if (typeof json.status !== typeof undefined && json.status instanceof Array
                                && (json.status.indexOf(field) !== -1) || field in json.status) {
                            var $span_status = $('<span/>');
                            var $icon_status = $('<i/>');
                            var label_class;
                            var icon_class;
                            var status = parseInt(data[field]);
                            if (status) {
                                label_class = 'success';
                                icon_class = 'check';
                            } else {
                                label_class = 'danger';
                                icon_class = 'times';
                            }
                            $icon_status.addClass('nohover fa fa-' + icon_class);
                            $span_status.addClass('label-status label label-' + label_class);

                            $icon_status.appendTo($span_status);
                            $span_status.appendTo($td);
                            if (field in json.status && json.status[field] instanceof Object
                                    && typeof json.status[field].action !== typeof undefined) {
                                $span_status.addClass('cursor-pointer');
                                if (typeof json.status[field].class !== typeof undefined)
                                    $span_status.addClass(json.status[field].class);

                                $span_status.click(function(event) {
                                    var action_class = class_name;
                                    if (typeof json.status[field].action_class !== typeof undefined) {
                                        action_class = json.status[field].action_class;
                                    }
                                    window[action_class][json.status[field].action](event, data);
                                });
                            }

                            $td.addClass('text-center');
                        } else {
                            var text = data[field];

                            if (text instanceof Object && typeof text[id_language_default] !== typeof undefined) {
                                text = text[id_language_default];
                            }

                            if (typeof json.truncate !== typeof undefined) {
                                if (typeof json.truncate[field] !== typeof undefined) {
                                    if (!$.isEmpty(text) && text.length > json.truncate[field]) {
                                        var $_span = $('<span/>');
                                        var _text_truncate = text.substring(0, json.truncate[field]) + '...';
                                        $_span.html(_text_truncate);
                                        //tooltip
                                            $_span.attr({
                                                'data-toggle': 'tooltip',
                                                'data-placement': 'top',
                                                'data-original-title': text
                                            });
                                            $_span.tooltip();
                                        $_span.appendTo($td);
                                    } else {
                                        $td.html(text);
                                    }
                                } else {
                                    $td.html(text);
                                }
                            } else {
                                $td.html(text);
                            }

                            if (typeof json.link !== typeof undefined) {
                                if ($.inArray(field, json.link.fields) !== -1) {

                                    var url = json.link.url;

                                    if (typeof json.link.params !== typeof undefined) {
                                        var _params = new Array();
                                        $.each(json.link.params, function(p, param) {
                                            if (p === 'token') {
                                                var _param_token = p + '=' + param;
                                                _params.push(_param_token);
                                            } else {
                                                var _param = p + '=' + data[param];
                                                _params.push(_param);
                                            }
                                        });
                                        url += '?' + _params.join('&');
                                    }

                                    var $link = $('<a/>');
                                    $link.attr({
                                        href: url,
                                        target: '_blank'
                                    });

                                    if (typeof json.link.icon !== typeof undefined) {
                                        var $icon_link = $('<i/>');
                                        $icon_link.addClass(json.link.icon);
                                        $icon_link.appendTo($link);
                                    }

                                    $link.appendTo($td);
                                }
                            }
                        }
                        $td.appendTo($tr);
                    });
                    $tr.appendTo($('#' + table + ' tbody'));
                });

            },
            div_loading: div_loading
        };

        $.makeRequest(_json);
    },
    radioHandler: function() {
        $('div.radio-group button').click(function(e) {
            var $parent = $(e.target).parent();
            $parent.find('button').removeClass('active blue');
            $(e.target).addClass('active blue');
            var _name = $parent.attr('data-toggle-name');
            var _val = $(e.target).val();
            $('input[name=' + _name + ']').val(_val);
        });
    },
    showMessage: function(message_code, message) {
        if (typeof $.growl !== 'undefined') {
            var data = {
                title: "",
                message: message,
                close: '&times;',
                duration: 10000
            };
            if (message_code === SUCCESS_CODE) {
                data.icon= 'fa fa-check fa-2x pull-left';
                $.growl.notice(data);
            } else {
                data.icon= 'fa fa-times fa-2x pull-left';
                $.growl.error(data);
            }
        }
    },
    validateLicense: function(e) {
        if ( !$.isEmpty($('#txt_license_number').val()) ) {
            $('#frm_register_product').submit();
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    },
    sendRegister: function(e) {
        if ( !$.isEmpty($('#txt_email').val()) && !$.isEmpty($('#lst_seller').val()) && !$.isEmpty($('#txt_number_order').val()) ) {
            $('#frm_register_product').submit();
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    },
    makeRequest: function(_data) {
        if (typeof _data.data.dataType === typeof undefined)
            _data.data.dataType = 'json';

        if (typeof _data.data.async === typeof undefined)
            _data.data.async = true;

        if (typeof _data.data.token === typeof undefined)
            _data.data.token = pts_static_token;

        if (typeof _data.data.url_call === typeof undefined)
            _data.data.url_call = module_dir + 'actions.php';

        $.each(_data.data, function(i, d) {
            if (typeof d === 'boolean') {
                _data.data[i] = d ? 1 : 0;
            }
        });

        $.ajax({
            type: 'POST',
            url: _data.data.url_call,
            async: _data.data.async,
            cache: false,
            dataType: _data.data.dataType,
            data: _data.data,
            beforeSend: function(request) {
                $('.has-action').addClass('disabled');

                if (typeof _data.beforeSend === 'function')
                    _data.beforeSend();

                if (typeof _data.e !== typeof undefined && typeof _data.e.target !== typeof undefined) {
                    if ( $(_data.e.target).hasClass('spinnable') ) {
                        var $span = $('<span/>');
                        $span.addClass('spinner');
                        var $i = $('<i/>');
                        $i.addClass('icon-spin icon-refresh');
                        $i.appendTo($span);
                        $span.appendTo($(_data.e.target));
                    }

                    $(_data.e.target).blur();
                }
            },
            success: function(data) {
                if (typeof _data.success === 'function')
                    _data.success(data);

                if (typeof data !== typeof undefined)
                    if (typeof data.message !== typeof undefined)
                        $.showMessage(data.message_code, data.message);
            },
            complete: function() {
                $('.has-action').removeClass('disabled');
                if ( typeof _data.complete === 'function' )
                    _data.complete();

                //remove spinner
                if (typeof _data.e !== 'undefined' && typeof _data.e.target !== 'undefined') {
                    if ($(_data.e.target).hasClass('spinnable'))
                        $(_data.e.target).find('.spinner').remove();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (typeof _data.error === 'function')
                    _data.error();

                //$.showMessage(ERROR_CODE, XMLHttpRequest.responseText);
                window.console.log('Error: ' + XMLHttpRequest.responseText);
            }
        });
    },
    utf8_decode: function(str_data) {
        var tmp_arr = [],
                i = 0,
                ac = 0,
                c1 = 0,
                c2 = 0,
                c3 = 0,
                c4 = 0;

        str_data += '';

        while (i < str_data.length) {
            c1 = str_data.charCodeAt(i);
            if (c1 <= 191) {
                tmp_arr[ac++] = String.fromCharCode(c1);
                i++;
            } else if (c1 <= 223) {
                c2 = str_data.charCodeAt(i + 1);
                tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
                i += 2;
            } else if (c1 <= 239) {
                // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
                c2 = str_data.charCodeAt(i + 1);
                c3 = str_data.charCodeAt(i + 2);
                tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            } else {
                c2 = str_data.charCodeAt(i + 1);
                c3 = str_data.charCodeAt(i + 2);
                c4 = str_data.charCodeAt(i + 3);
                c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
                c1 -= 0x10000;
                tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
                tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
                i += 4;
            }
        }

        return tmp_arr.join('');
    },
    utf8_encode: function(argString) {
      if (argString === null || typeof argString === 'undefined') {
        return '';
      }

      var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      var utftext = '',
        start, end, stringl = 0;

      start = end = 0;
      stringl = string.length;
      for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
          end++;
        } else if (c1 > 127 && c1 < 2048) {
          enc = String.fromCharCode(
            (c1 >> 6) | 192, (c1 & 63) | 128
          );
        } else if ((c1 & 0xF800) != 0xD800) {
          enc = String.fromCharCode(
            (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
          );
        } else { // surrogate pairs
          if ((c1 & 0xFC00) != 0xD800) {
            throw new RangeError('Unmatched trail surrogate at ' + n);
          }
          var c2 = string.charCodeAt(++n);
          if ((c2 & 0xFC00) != 0xDC00) {
            throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
          }
          c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
          enc = String.fromCharCode(
            (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
          );
        }
        if (enc !== null) {
          if (end > start) {
            utftext += string.slice(start, end);
          }
          utftext += enc;
          start = end = n + 1;
        }
      }

      if (end > start) {
        utftext += string.slice(start, stringl);
      }

      return utftext;
    },
    initPtsCarousel: function() {
        if (typeof $("#pts-carousel")[0] !== typeof undefined ) {
            $("#pts-carousel").owlCarousel({
                 autoPlay: 5000,
                items : 5,
                itemsDesktop : [1199,4],
                itemsDesktopSmall : [979,3],
                itemsTablet: [768,3],
                itemsTabletSmall: [768,2],
                itemsMobile: [479,1]
            });
        }
    },
	isUrl: function(val){
        var regExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regExp.exec(val);
    },
    strpos: function(haystack, needle, offset){
        // Finds position of first occurrence of a string within another
        //
        // version: 1109.2015
        // discuss at: http://phpjs.org/functions/strpos    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Onno Marsman
        // +   bugfixed by: Daniel Esteban
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);    // *     returns 1: 14

        var i = (haystack + '').indexOf(needle, (offset || 0));
        return i === -1 ? false : i;
    },
    changeLanguage: function(e) {
        var for_element = $(e.target).attr('for');
        $('.pts .translatable-field').addClass('hide');
        $('.pts .translatable-field.' + for_element).removeClass('hide');
    }
});

jQuery.fn.extend({
    truncate: function (options) {
        var defaults = {
               more: '...'
        };
        var options = $.extend(defaults, options);
        return this.each(function (num) {
            var height = parseInt($(this).css("height"));
            var width = parseInt($(this).css("width"));
            var content = $(this).html();
            while (this.scrollHeight > height) {
                content = content.replace(/\s+\S*$/, "");
                $(this).html(content + " " + options.more);
            }
        });
    },
    displayErrors: function(errors) {
        if (!$.isEmpty(errors)) {
            var html = '';

            errors = jQuery.parseJSON(errors);

            html = '<ol>';
            $.each(errors, function(i, message) {
                html += '<li>' + message + '</li>';
            });
            html += '</ol>';

            jQuery(this).append('<br/><br/>' + html);
        }
    },
    onlyCharacter: function() {
        jQuery(this).keypress(function(e) {
            var key = (document.all) ? e.keyCode : e.which;
            if (key == 8 || key == 0)
                return true;
            var regExp = /[A-Za-z\s]/;
            return regExp.test(String.fromCharCode(key));
        });

        return jQuery(this);
    },
    onlyNumber: function() {
        jQuery(this).keypress(function(e) {
            var key = (document.all) ? e.keyCode : e.which;
            if (key == 8 || key == 0)
                return true;
            var regExp = /^[0-9.]+$/;
            return regExp.test(String.fromCharCode(key));
        });

        return jQuery(this);
    },
    validName: function(){
        jQuery(this).keypress(function(e){
            var key = (document.all) ? e.keyCode : e.which;
            if(key == 8 || key == 0) return true;

            var character = String.fromCharCode(key).toString();
            var regExp = /^[a-zA-Zá-úÁ-ÚÄ-Üà-ù.'\s]*$/;

            return regExp.test(character);
        });

        return jQuery(this);
    },
    validAddress: function(){
        jQuery(this).keypress(function(e){
            var key = (document.all) ? e.keyCode : e.which;
            if(key == 8 || key == 0) return true;

            var character = String.fromCharCode(key).toString();
            var regExp = /^[a-zA-Zá-úÁ-ÚÄ-Üà-ù0-9#/.ºª\-\s,]*$/;

            return regExp.test(character);
        });

        return jQuery(this);
    },
    addOverlay: function() {
        return jQuery(this).addClass('overlay').fadeTo(0, .4);
    },
    delOverlay: function() {
        return jQuery(this).fadeTo(100, 1).removeClass('overlay');
    },
    //Deshabilitar boton con la opcion de enviar un texto para setearlo, dado el caso que dentro del arreglo de {Msg}
    //Existe la llave como ID, se toma la propiedad {off} y se omite el texto enviado por parametro
    disableButton: function(val) {
        if (Msg[jQuery(this).attr('id')]) {
            return jQuery(this).attr('disabled', true).find('span.ui-button-text').html(Msg[jQuery(this).attr('id')].off);
        }
        else
            return jQuery(this).attr('disabled', true).find('span.ui-button-text').html(val);
    },
    //Habilitar boton con la opcion de enviar un texto para setearlo, dado el caso que dentro del arreglo de {Msg}
    //Existe la llave como ID, se toma la propiedad {on} y se omite el texto enviado por parametro
    enableButton: function(val) {
        if (Msg[jQuery(this).attr('id')]) {
            return jQuery(this).attr('disabled', false).find('span.ui-button-text').html(Msg[jQuery(this).attr('id')].on).parent();
        }
        else
            return jQuery(this).attr('disabled', false).find('span.ui-button-text').html(val).parent();
    },
    //change label status (colors and icons)
    toggleLabelStatus: function() {
        if ($(this).hasClass('label-danger')) {
            $(this).removeClass('label-danger').addClass('label-success');
            $(this).children('i').removeClass('fa-times').addClass('fa-check');
        } else {
            $(this).addClass('label-danger').removeClass('label-success');
            $(this).children('i').removeClass('fa-check').addClass('fa-times');
        }
    }
});