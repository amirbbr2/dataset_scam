var delay = 3000;
var start_frame = 0;

var frame = 0;
var color_actif = "#C9D787";
var bgcolor_actif = "#FB456D";
var color_norm = "white";
var bgcolor_norm = "#C9D787";

function init() {
  if($("#slide-images")){
      var lis = $('#slide-images li');
      if(lis.length > 1){
          end_frame = lis.length -1;
          aref = $('#number a');
            $(aref[frame]).css("backgroundColor",bgcolor_actif);
            $(aref[frame]).css("color",color_actif);
            frame = start_frame;
            for( i=0; i < lis.length; i++){
                if(i!=start_frame){
                    $(lis[i]).css("display","none");
                }else{
                    $(lis[i]).css("display","block");
                }
            }
            $("#number").css("display","block");
            start_slideshow(start_frame, end_frame, delay, lis);
        }
    }
}

function start_slideshow(start_frame, end_frame, delay, lis) { setInterval(fadeInOut(start_frame,end_frame, lis), delay);}



function fadeInOut(start_frame, end_frame, lis) {
    return (function() {
        lis = $('#slide-images li');
        aref = $('#number a');
        $(aref[frame]).css("backgroundColor",bgcolor_norm);
        $(aref[frame]).css("color",color_norm);
        img_hid = lis[frame];
        if (frame == end_frame) {
            frame = start_frame;
        } else {
            frame++;
        }  
        $(aref[frame]).css("backgroundColor",bgcolor_actif);
        $(aref[frame]).css("color",color_actif);
        img_dis = lis[frame];
        $(img_hid).fadeOut(1500);
        $(img_dis).fadeIn(1500);
    });
}

function changeFrame(newframe){
    aref = document.getElementById('number').getElementsByTagName('a');
    aref[frame].style.backgroundColor=bgcolor_norm;
    aref[frame].style.color=color_norm;
    aref[newframe].style.backgroundColor=bgcolor_actif;
    aref[newframe].style.color=color_actif;
    lis = document.getElementById('slide-images').getElementsByTagName('li');
    for( i=0; i < lis.length; i++){
        if(i!=newframe){
            lis[i].style.display = 'none';
        }else{
            lisAppear = lis[newframe];
            $(lisAppear).fadeIn();
        }
    }
    if(--newframe < 0){
        newframe = end_frame;
    }
    frame = newframe;
}

$(function() {
    init();
});

