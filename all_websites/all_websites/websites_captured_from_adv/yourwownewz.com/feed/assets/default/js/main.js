jQuery(document).ready(function($){

/**
 * Menu
 */
$(document).on('click', '.menu-button', function(){
  var $this = $(this),
      $par_un = $this.parentsUntil('.menu-button-holder'),
      $par = $par_un.parent('.menu-button-holder'),
      $menu = $par.siblings('.menu');
  $menu.toggleClass('menu-mobile');
  $this.toggleClass('menu-button-active');
});
  
$(document).on('click', '.menu-toggle-sub', function(){
  var $this = $(this),
      $menu_to_togle = $this.closest('li');
  $menu_to_togle.toggleClass('submenu-opened');
  $this.toggleClass('menu-toggle-sub-active');
});
  
/**
 * Tabs
 */
$(document).on('click', '.tabs-switch-button', function(){
  var $this = $(this),
      $data_tab = $this.data('tab'),
      $holder_until = $this.parentsUntil('.tabs'),
      $holder = $holder_until.parent('.tabs');
  
  $holder.find('.tabs-switch-button').removeClass('tabs-switch-button-active');
  $holder.find('.tabs-content-item').removeClass('tabs-content-item-active');
  
  $this.addClass('tabs-switch-button-active');
  $holder.find('.tabs-content-item[data-tab-content="'+$data_tab+'"]').addClass('tabs-content-item-active');
  
});
  
  
});