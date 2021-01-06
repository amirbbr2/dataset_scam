var flag = ( navigator.userAgent.indexOf("MSIE") >=0 && parseInt( navigator.appVersion ) >= 4);
var eOpenMenu = null;

if ( flag )	{
	document.onmouseover=mouseover;
	document.onmouseout=mouseout;
}

function OpenMenu(eSrc,eMenu)
{
	// need this for mac
	eMenu.style.top = divMenuBar.offsetHeight + divMenuBar.offsetTop ;
	//
	eMenu.style.visibility = "visible";
	eOpenMenu = eMenu;
}

function CloseMenu(eMenu)
{
	eMenu.style.visibility = "hidden";
	eOpenMenu = null;
}

function setmsg(msg) 
{
	window.status = msg;
	return true;
}

function mouseover()
{
	if ( flag )	{
		var eSrc = window.event.srcElement;

		if ( eSrc.className == "clsMenuBarItem" )
		{
			var eMenu = document.all[eSrc.id.replace("tdMenuBarItem", "divMenu")];
			if (eOpenMenu && eOpenMenu != eMenu) 
				CloseMenu(eOpenMenu);

			if (eMenu) 
				OpenMenu(eSrc,eMenu);

			eSrc.style.color="black";
		}
		else if (eOpenMenu && !eOpenMenu.contains(eSrc) && !divMenuBar.contains(eSrc)) 
			CloseMenu(eOpenMenu);
              
	}
}

function mouseout()
{
	if ( flag )	{
		var eSrc = window.event.srcElement;
		eSrc.style.color="";
	}
}	

function drawmenus()
{
	var str='';

	if ( flag )	{	
		str += '<div id="divMenuArt" class="clsMenu" style="width:105;position:absolute;z-index:1;left:222; visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/art/litterature/" onMouseOver="return setmsg(this.innerText);">Littérature</a><br>';
		str += '<a href="http://mondetop.com/art/peinture/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Peinture</a><br>';
		str += '<a href="http://mondetop.com/art/architecture/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Architecture</a><br>';
		str += '<a href="http://mondetop.com/art/artisanat/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Artisanat</a><br>';
		str += '<hr color="blue" size=1 width="100%">';
		str += '<b> Arts appliqués:</b><br>';
		str += '<a href="http://mondetop.com/art/photo/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Photo</a><br>';
		str += '<a href="http://mondetop.com/art/mode/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Mode et Design</a><br>';
		str += '</div>';
		
		str += '<div id="divMenuSciences" class="clsMenu" style="width:140;position:absolute;z-index:1;left:252; visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/sciences/medecine_sante/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Médecine et santé</a><br>';
		str += '<a href="http://mondetop.com/sciences/medecines_paralleles/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Médecines Parallèles, forme</a><br>';
		str += '<a href="http://mondetop.com/sciences/nature/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Nature</a><br>';
		str += '<hr color="blue" size=1 width="100%">';
		str += '<b> Sciences occultes:</b><br>';		
		str += '<a href="http://mondetop.com/sciences/paranormal/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Paranormal</a><br>';
		str += '<hr color="blue" size=1 width="100%">';
		str += '<b> Sciences sociales:</b><br>';
		str += '<a href="http://mondetop.com/sciences/histoire/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Histoire</a><br>';
		str += '</div>';

		str += '<div id="divMenuSports" class="clsMenu" style="width:125;position:absolute;z-index:1;left:312;visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/sports/auto/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Auto</a><br>';
		str += '<a href="http://mondetop.com/sports/football/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Football</a><br>';
		str += '<a href="http://mondetop.com/sports/moto/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Moto</a><br>';
		str += '<a href="http://mondetop.com/sports/basket/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Basket</a><br>';
		str += '<a href="http://mondetop.com/sports/athletisme/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Athlétisme</a><br>';
		str += '<a href="http://mondetop.com/sports/tennis/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Tennis</a><br>';
		str += '<a href="http://mondetop.com/sports/golf/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Golf</a><br>';
		str += '<a href="http://mondetop.com/sports/extremes/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Extrêmes et glisse</a><br>';
		str += '</div>';

		str += '<div id="divMenuMusique" class="clsMenu" style="width:150;position:absolute;z-index:1;left:360;visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/musique/francophone/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Francophone</a><br>';
		str += '<a href="http://mondetop.com/musique/internationale/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Internationale</a><br>';
		str += '<a href="http://mondetop.com/musique/classique/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Classique</a><br>';	
		str += '<a href="http://mondetop.com/musique/midi_karaoke/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Midi et Karaoké</a><br>';
		str += '<a href="http://mondetop.com/musique/mp3/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Mp3</a><br>';
		str += '<a href="http://mondetop.com/musique/tablatures/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Tablatures et Partitions</a><br>';
		str += '</div>';
				
		str += '<div id="divMenuSpectacles" class="clsMenu" style="width:95;position:absolute;z-index:1;left:417;visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/spectacles/cinema/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Cinéma</a><br>';								
		str += '<a href="http://mondetop.com/spectacles/television/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Télévision</a><br>';
		str += '<a href="http://mondetop.com/spectacles/theatre/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Théâtre</a><br>';
		str += '</div>';
						
		str += '<div id="divMenuInformatique" class="clsMenu" style="width:160;position:absolute;z-index:1;left:489;visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/informatique/cours/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Cours, tutoriels et documents</a><br>';
		str += '<a href="http://mondetop.com/informatique/emulateurs/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Emulateurs</a><br>';
		str += '<a href="http://mondetop.com/informatique/gratuit/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Gratuit</a><br>';
		str += '<hr color="blue" size=1 width="100%">';
		str += '<b> Internet:</b><br>';
		str += '<a href="http://mondetop.com/informatique/webmasters/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Ressources pour Webmasters</a><br>';
		str += '<a href="http://mondetop.com/informatique/weblogs/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Weblogs</a><br>';
		str += '<a href="http://mondetop.com/informatique/pages_personnelles/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Pages personnelles</a><br>';
		str += '<a href="http://mondetop.com/informatique/portails/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Moteurs de recherche et portails</a><br>';
		str += '</div>';
		
		str += '<div id="divMenuDivertissements" class="clsMenu" style="width:110;position:absolute;z-index:1;left:577;visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/divertissements/gsm/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">GSM</a><br>';
		str += '<a href="http://mondetop.com/divertissements/bd/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">BD</a><br>';
		str += '<a href="http://mondetop.com/divertissements/humour/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Humour</a><br>';
		str += '<a href="http://mondetop.com/divertissements/jeux/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Jeux</a><br>';
		str += '<a href="http://mondetop.com/divertissements/tourisme/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Tourisme</a><br>';
		str += '<a href="http://mondetop.com/divertissements/gens_societe/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Gens et Société</a><br>';
		str += '<a href="http://mondetop.com/divertissements/collections/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Collections</a><br>';
		str += '<a href="http://mondetop.com/divertissements/animaux/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Animaux de compagnie</a><br>';
		str += '</div>';

		str += '<div id="divMenuServices" class="clsMenu" style="width:140;position:absolute;z-index:1;left:641;visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/gagnants.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Gagnants</a><br>';
		str += '<a href="http://mondetop.com/recherche/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Moteur de recherche</a><br>';
		str += '<a href="http://mondetop.com/email.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Email gratuit</a><br>';
		str += '<a href="http://mondetop.com/chat/" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Chat</a><br>';
		str += '</div>';

		str += '<div id="divMenuAide" class="clsMenu" style="width:137;position:absolute;z-index:1;left:641;visibility:hidden;">';
		str += '<div class="clsMenuSpacer"></div>';
		str += '<a href="http://mondetop.com/aide.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Aide</a><br>';
		str += '<a href="http://mondetop.com/inscription.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Inscription d\'un site</a><br>';
		str += '<a href="http://mondetop.com/logos.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Logos</a><br>';
		str += '<a href="http://mondetop.com/publicite.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Publicité</a><br>';
		str += '<a href="http://mondetop.com/termes.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Termes et conditions</a><br>';
		str += '<a href="http://mondetop.com/confidentialite.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Confidentialité</a><br>';
		str += '<a href="http://mondetop.com/contact.htm" onMouseOver="return setmsg(this.innerText);" onMouseOut="return setmsg(\'\');">Nous contacter</a><br>';
		str += '</div>';

		
		document.write( str )
	}
}


function openRate(url, name) { 
   window.open(url, name, 'scrollbars=0,resizable=no,width=600,height=400,status=0,menubar=0,left=50,top=100');
}
function openComments(url, name) { 
   window.open(url, name, 'scrollbars=1,resizable=no,width=600,height=400,status=0,menubar=0,left=50,top=100');
}