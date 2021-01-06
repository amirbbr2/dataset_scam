roundedAddOnloadEvent(function(){ round() });

function roundedAddOnloadEvent(fnc){
	if ( typeof window.addEventListener != "undefined" ) {
		window.addEventListener( "load", fnc, false );
	} else if ( typeof window.attachEvent != "undefined" ) {
		window.attachEvent( "onload", fnc );
	} else {
		if ( window.onload != null ) {
			var oldOnload = window.onload;
			window.onload = function ( e ) {
				oldOnload( e );
				window[fnc]();
			};
		} else {
			window.onload = fnc;
		}
	}
}

function round(){
        
    settings = {
      tl: { radius: 10 },
      tr: { radius: 10 },
      bl: { radius: 10 },
      br: { radius: 10 },
      antiAlias: true,
      autoPad: false
    }
	
    /*
    var videospro = document.getElementById('block-menu-331');
    if(videospro) {
	    var cornersObj = new curvyCorners(settings, videospro);
	    cornersObj.applyCornersToAll();
    }
    
    var videosperso = document.getElementById('block-menu-332');
    if(videosperso) {
	    var cornersObj = new curvyCorners(settings, videosperso);
	    cornersObj.applyCornersToAll();
    }
    */
	var login = document.getElementById('block-user-0');
    if(login) {
	    var cornersObj = new curvyCorners(settings, login);
	    cornersObj.applyCornersToAll();
    }
    
    var myfiles = document.getElementById('myfiles');
    if(myfiles) {
	    var cornersObj = new curvyCorners(settings, myfiles);
	    cornersObj.applyCornersToAll();
    }
    
	/*
    var menu5 = document.getElementById('block-slicedbook_navigation-5');
    if(menu5) {
		var cornersObj = new curvyCorners(settings, menu5);
		cornersObj.applyCornersToAll();
	}
	*/

    var menu6 = document.getElementById('block-slicedbook_navigation-6');
    if(menu6) {
	    var cornersObj = new curvyCorners(settings, menu6);
	    cornersObj.applyCornersToAll();
	}
	
}