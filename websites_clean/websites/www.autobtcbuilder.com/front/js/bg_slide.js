
$(document).ready(function() {
  
  // Check Backstretch is loaded
  if (!jQuery().backstretch) {
    return;
  }
  
  // Find all data-toggle="backstretch" elements
  var backstretches = $('[data-toggle=backstretch]');// Selector
  backstretches.each(function() {
    var backstretchEl = $(this);
    var backstretchTarget = backstretchEl.data('backstretch-target') || null;
    var backstretchImgs = [];
    var backstretchOpacity = backstretchEl.data('opacity') || null;
    var backstretchSettings = {
      fade: 750,
      duration: 4000
    };
  
    // Get images from element
    $.each(backstretchEl.data('backstretch-imgs').split(','), function(k, img) {
      backstretchImgs[k] = img;
    });
  
    if (backstretchImgs) {
      $('html').addClass('has-backstretch');
      
      // Opacity: add CSS to wrapper
      if (backstretchOpacity !== null) {
        $('html').addClass('backstretch-opacity-'+ backstretchOpacity);
      }
      
      // Merge in any custom settings
      backstretchSettings = $.extend({}, backstretchSettings, backstretchEl.data());
  
      // block level element
      if (backstretchTarget !== null) {
        if (backstretchTarget === 'self') {
          backstretchTarget = backstretchEl;
        }
        else {
          if ($(backstretchTarget).length > 0) {
            backstretchTarget = $(backstretchTarget);
          }
        }
        backstretchTarget.backstretch(backstretchImgs, backstretchSettings);
      }
      else {
        $.backstretch(backstretchImgs, backstretchSettings);
      }                 
    }
  });
  
});