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
 
$(function(){
    if (typeof promonewsletterpopup_dir !== typeof undefined) {
        AppPNP.init();
    }
});

var AppPNP = {
    init: function(){
        AppPNP.registerEvents();
        
        setTimeout(AppPNP.showPopup, pnp_time_to_show_popup * 1000);            
    },
    registerEvents: function(){
        $(document).keyup(function(e) {
            if ($('.pnp-ui-widget-overlay').length > 0 && $('#promonewsletterpopup').length > 0) {
                if (e.keyCode == 27) { 
                    AppPNP.closePopup(); 
                }
            }
        });
        
        $( window ).resize(AppPNP.resize);
        
        $('#promonewsletterpopup_close').click(AppPNP.closePopup);                      
    },
    showPopup: function() {
        $.ajax({
            type: 'POST',
            url: promonewsletterpopup_dir + 'actions.php',
            async: true,
            cache: false,
            dataType : 'html',
            data: {
                action: 'showPopup',
                token : pnp_static_token
            },
            success: function(html) {
                if (html == '') {
                    return;
                }
                
                $('body').append('<div class="pnp-ui-widget-overlay" style="z-index: 6001;"></div>');
                $('body').append(html);
                
                $('.pnp-ui-widget-overlay').click(AppPNP.closePopup);
                
                var popup = $('#promonewsletterpopup');
                var popup_content = $('#promonewsletterpopup_content');
                
                $('#promonewsletterpopup_close').click(AppPNP.closePopup);
                
                $('#a_show_conditions').click(function(){
                    $('#promonewsletterpopup_controls, #promonewsletterpopup #img_banner').hide();
                    
                    $(popup_content).css({                
                        background : '#fff',                                                
                        overflow: 'scroll'
                    });
                                         
                    $('#promonewsletterpopup_conditions').show().removeClass('hidden');
                    
                    $('#promonewsletterpopup_close').unbind('click').click(function(){
                        $('#promonewsletterpopup_conditions').hide().addClass('hidden');
                        
                        $(popup_content).css({
                            background : 'none',
                            overflow: 'auto'                            
                        });

                        $('#promonewsletterpopup_controls, #promonewsletterpopup #img_banner').show();
                        
                        $('#promonewsletterpopup_close').unbind('click').click(AppPNP.closePopup);                        
                    });
                });   
                
                $('#promonewsletterpopup #btn_sent').click(function(){
                    var email = $('#txt_email_subscriber').val();                    
                    
                    if ($('#promonewsletterpopup_check_conditions').length > 0)
                        if (!$('#chk_conditions').is(':checked')){
                            alert(Msg.check_conditions);
                            
                            return false;
                        }
                                                
                    if (!$.isEmpty(email))
                        if ($.isEmail(email))
                            $.ajax({
                                type: 'POST',
                                url: promonewsletterpopup_dir + 'actions.php',
                                async: true,
                                cache: false,
                                dataType : 'json',
                                data: {
                                    action: 'registerNewsletter',
                                    email: email,
                                    token : pnp_static_token
                                },
                                beforeSend: function(){
                                    $('#promonewsletterpopup_check_conditions').hide();
                                    $('#btn_sent').attr('disabled', 'true').hide();
                                },
                                success: function(json){                
                                    if (json.message_code == 0){                                                                                
                                        if (pnp_image_thanks){
                                            $('#promonewsletterpopup_controls').hide();
                                            
                                            $('#promonewsletterpopup #img_banner').css({
                                                cursor : 'pointer'
                                            })
                                            .attr('src', path_image_thanks_banner)
                                            .click(AppPNP.closePopup);
                                        }else{
                                            AppPNP.closePopup();
                                            
                                            alert(json.message);
                                        }                                            
                                    }else{
                                        alert(json.message);
                                    }
                                },
                                complete: function(){
                                    $('#promonewsletterpopup_check_conditions').show();
                                    $('#promonewsletterpopup #btn_sent').removeAttr('disabled').show();  
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log('ERROR AJAX: ' + textStatus, errorThrown);
                                }
                            });
                        else
                            alert(Msg.format_email_invalid);
                });                                                                                           
                
                if (pnp_only_use_popup_promo && pnp_link_promo != '' && pnp_link_promo != '#'){
                    popup_content.css({
                        cursor : 'pointer'            
                    })
                    .click(function(){
                        window.location = pnp_link_promo;
                    });
                }
                
                $('#promonewsletterpopup_controls').css({
                   top : pnp_top_position + '%',
                   left : pnp_left_position + '%' 
                });
                
                $('#promonewsletterpopup #txt_email_subscriber').focus();
                
                window.scrollTo(0, 0);
                $(window).resize();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('ERROR AJAX: ' + textStatus, errorThrown);
            }
        });                                  
    },
    resize: function(){
        var popup = $('#promonewsletterpopup');
        var popup_content = $('#promonewsletterpopup_content');
                
        var _pnp_image_close_width = 18;
        var _pnp_image_width = pnp_popup_width;
        var _pnp_image_height = pnp_popup_height;
        var porcentage_window = 100;
                        
        var porcentage_image = ( _pnp_image_width * porcentage_window ) / $(window).width();
        var porcentage_image_close = ( _pnp_image_close_width * porcentage_window ) / $(window).width();
        var porcentage_popup = porcentage_image + porcentage_image_close;
        var porcentage_left = 0;
        var porcentage_top = 0;
        
        if (porcentage_popup >= porcentage_window) {
            porcentage_window = 92;
            _pnp_image_width = ($(window).width() * porcentage_window) / 100;
            _pnp_image_height = ($(window).height() * porcentage_window) / 100;
                                            
            porcentage_image = ( _pnp_image_width * porcentage_window ) / $(window).width();
            porcentage_popup = porcentage_image + porcentage_image_close;
            
            porcentage_left = ((96 + porcentage_image_close) - porcentage_popup) / 2;
            porcentage_top = (porcentage_window -(( _pnp_image_height * porcentage_window ) / $(window).height())) / 2;
        } else {
            porcentage_left = (porcentage_window - porcentage_popup) / 2;
            porcentage_top = (porcentage_window -(( _pnp_image_height * porcentage_window ) / $(window).height())) / 2;
        }                        
        
        popup_content.css({
            width : (100 - porcentage_image_close) + '%'
        });
        
        popup.css({
            width : porcentage_popup + '%',
            left: porcentage_left + '%',
            top: porcentage_top + '%'
        });
        
        //window.scrollTo(0, (popup.offset().top - pnp_popup_height));
    },
    closePopup: function(){
        $('#promonewsletterpopup').remove(); 
        $('.pnp-ui-widget-overlay').remove();
    }
};