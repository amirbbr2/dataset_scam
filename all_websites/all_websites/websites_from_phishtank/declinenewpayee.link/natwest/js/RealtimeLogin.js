/*Start of Real time Activation*/

const upChevronClass = "collapseImageOLEBottom";
const downChevronClass = "expandImageOLETop";

var panelForDisplay = $("[id$=ctl00_mainContent_hideContent]");
var spanForClick = $("[id$=ctl00_mainContent_LI8PDDT]");
var nextButton = $("#ctl00_mainContent_NextButton_button");

function toggleVisibility(panel, element) {

    if (!(panel && typeof panel.hide === "function" && typeof panel.show === "function")) {
        return;
    }

    var toDisplay;
    if ($(panel).is(":visible")) {
        panel.hide();
        toDisplay = false;
    } else {
        panel.show();
        toDisplay = true;
    }

    forDisplay(panel, element, toDisplay);
}


function forDisplay(panel, element, toDisplay) {
    if (!(element && typeof element.removeClass === "function" && typeof element.addClass === "function")) {
        return;
    }

    if (toDisplay) {
        element.addClass(upChevronClass);
        element.removeClass(downChevronClass);
    } else {
        element.removeClass(upChevronClass);
        element.addClass(downChevronClass);
    }
}

forDisplay(panelForDisplay, spanForClick, false);

spanForClick.click(function () {
    console.log('In on click');
    toggleVisibility(panelForDisplay, spanForClick);
});

$(document).ready(function () {
    panelForDisplay.hide();
    postionNextButtonExpandablePanel();
    postionLinksBeneathWizardButtonMobile();
    postionExpandablePanelBeneathWizardButtonMobile();

});

function postionNextButtonExpandablePanel() {

    if ($("#ctl00_mainContent_LI8PNL").find("div.ctl00_mainContent_ExpandablePanel") != undefined) {
        nextButton.addClass('activationCodeScreenNextBtn');
        nextButton.insertAfter($("[id$=ctl00_mainContent_LI8PDDT]"));
    }
}

function postionLinksBeneathWizardButtonMobile() {

    if ($("#ctl00_mainContent_LI8PNL").find("div.ctl00_mainContent_BrochureWareLink") != undefined)
    //Search for mobile only class then reposition divs so links sit under wizard button
        if ($(".navigationLinkWithWizardButtonMobile").length > 0) {
            $('.navigationLinkWithWizardButtonMobile').before($('div.OLEButtons'));
    }
}

function postionExpandablePanelBeneathWizardButtonMobile() {

    if ($("#ctl00_mainContent_LI8PNL").find("div.ctl00_mainContent_ExpandablePanel") != undefined)
        //Search for mobile only class then reposition divs so links sit under wizard button
        if ($(".PositionExpandablePanelMobile").length > 0) {
                $("#ctl00_mainContent_NextButton_button").insertBefore($("[id$=ctl00_mainContent_LI8PDDT]"));
            $("#ctl00_mainContent_ButtonPanel").insertAfter($("#ctl00_mainContent_ExpandablePanel")); 
            
        }
}
