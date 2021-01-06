jQuery(document).ready(function(){

  // Tabs Changer
  // ===============================
    //Default Action    
   

    //On Click Event
  

});

// Checkboxes Toggle
// ===============================

function toggleCheckboxes(classname) {
    jQuery("."+classname).attr('checked',!jQuery("."+classname+":first").is(':checked'));
}

// Disable Field Class
// ===============================

function disableFields(classname,disable) {
    if (disable) jQuery("."+classname).attr("disabled","disabled");
    else jQuery("."+classname).removeAttr("disabled");
}

// Open Centered Popup
// ===============================

function popupWindow(addr,popname,w,h,features) {
  var winl = (screen.width-w)/2;
  var wint = (screen.height-h)/2;
  if (winl < 0) winl = 0;
  if (wint < 0) wint = 0;
  var settings = 'height=' + h + ',';
  settings += 'width=' + w + ',';
  settings += 'top=' + wint + ',';
  settings += 'left=' + winl + ',';
  settings += features;
  win = window.open(addr,popname,settings);
  win.window.focus();
}

// Support Tickets
// ===============================

function extraTicketAttachment() {
    jQuery("#fileuploads").append('<div class="col-md-3"><div class="form-group margt_12"><label for="exampleInputPassword1">اجازه ارسال فایل .jpg, .gif, .jpeg, .png</label></div><a href="#" onclick="extraTicketAttachment();return false">&nbsp;</a><div class="col-md-12 g2 fileinput fileinput-new" data-provides="fileinput"> <div ><span class="btn btn-primary btn-file" style="margin-top:0px;"><span class="fileinput-new">ارسال فایل پیوست<i class="fa fa-plus" style="margin-top: -19px"></i></span><span class="fileinput-exists">تغییر</span><input type="file" name="attachments[]"></span><a style="margin-bottom:20px;" href="#" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">پاک کردن</a></div><div class="fileinput-preview fileinput-exists thumbnail" style="width: 100%; height: 250px;"></div></div></div>');
}

function extraTicketAttachment2() {
    jQuery("#fileuploads").append('<div class="col-md-4"><div class="form-group margt_12"><label for="exampleInputPassword1">اجازه ارسال فایل .jpg, .gif, .jpeg, .png</label></div><a href="#" onclick="extraTicketAttachment();return false">&nbsp;</a><div class="col-md-12 g2 fileinput fileinput-new" data-provides="fileinput"> <div ><span class="btn btn-primary btn-file" style="margin-top:0px;"><span class="fileinput-new">ارسال فایل پیوست<i class="fa fa-plus" style="margin-top: -18px;margin-right: 2px"></i></span><span class="fileinput-exists">تغییر</span><input type="file" name="attachments[]"></span><a style="margin-bottom:20px;" href="#" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">پاک کردن</a></div><div class="fileinput-preview fileinput-exists thumbnail" style="width: 100%; height: 250px;"></div></div></div>');
}

function rating_hover(id) {
    var selrating=id.split('_');
    for(var i=1; i<=5; i++){
        if(i<=selrating[1]) document.getElementById(selrating[0]+'_'+i).style.background="url(images/rating_pos.png)";
        if(i>selrating[1]) document.getElementById(selrating[0]+'_'+i).style.background="url(images/rating_neg.png)";
    }
}
function rating_leave(id){
    for(var i=1; i<=5; i++){
        document.getElementById(id+'_'+i).style.background="url(images/rating_neg.png)";
    }
}
function rating_select(tid,c,id){
    window.location='viewticket.php?tid='+tid+'&c='+c+'&rating='+id;
}

/* ============================================================
 * bootstrap-dropdown.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , selector
        , isActive

      if ($this.is('.disabled, :disabled')) return

      selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}(window.jQuery);