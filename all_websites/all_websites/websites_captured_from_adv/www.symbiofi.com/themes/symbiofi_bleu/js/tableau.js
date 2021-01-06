function getElementsByClass( searchClass, domNode, tagName) {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}
 
function showtab(tabname) 
{
	// hide every element with class 'tab' 
	var tabs = getElementsByClass('tab');
	for(i=0; i<tabs.length; i++)
		tabs[i].style.display = 'none';
	// hide every element with class 'tab'		
 
	document.getElementById(tabname).style.display='block';
	// show element with given tabname
}