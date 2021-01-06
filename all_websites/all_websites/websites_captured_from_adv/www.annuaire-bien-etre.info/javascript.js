
function FocusText(BoxName)
	{
	if (BoxName.value == BoxName.defaultValue)
		{
		BoxName.value = '';
		}
	}

function BlurText(BoxName)
	{
	if (BoxName.value == '')
		{
		BoxName.value = BoxName.defaultValue;
		}
	}
        
        
 function initialiserGmap(lat,lng,user)
 {
     
     
         geocoder = new google.maps.Geocoder();
         var latlng = new google.maps.LatLng(lat,lng);            
         infowindow = new google.maps.InfoWindow();

              
                //objet contenant des propriétés avec des identificateurs prédéfinis dans Google Maps permettant
                //de définir des options d'affichage de notre carte
                var options = {
                    center: latlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                 
                //constructeur de la carte qui prend en paramêtre le conteneur HTML
                //dans lequel la carte doit s'afficher et les options
                var carte = new google.maps.Map(document.getElementById("carteGoogle"), options);
                
                //création du marqueur
                
                var marqueur = new google.maps.Marker({
                    position: latlng,
                    map: carte,
                    draggable :true
                });   
                
                
              google.maps.event.addListener(marqueur, 'dragend', function(event) {
                  
                  
        /*
        
        	AdresseHTML = document.getElementById('lieu_rue');
                CpHTML = document.getElementById('lieu_cp');
                VilleHTML = document.getElementById('lieu_ville');
                DepHTML = document.getElementById('id_departement');
                compHTML = document.getElementById('lieu_complement');
                 var latlng = event.latLng;      
             */    
             // Recupere l'adresse correspondante au changement de place du marqueur
             
           geocoder.geocode({'latLng': event.latLng}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                    
                     
                                    
                      // parse les informations reçu par Google pour mettre à jour les champs
                     
                     var chaine = results[0].formatted_address.split(',');
                     var adresse = chaine[0];
                     var cpVille =  chaine[1].split(' ');                     
                            var cp = cpVille[1];
                            var ville = cpVille[2];
                     var pays=  chaine[2];
                     
                     document.getElementById('adresse').firstChild.nodeValue=adresse;
                     document.getElementById('cp_adress').firstChild.nodeValue=cp; 
                    document.getElementById('ville_adress').firstChild.nodeValue=ville;
                   
                  
                  // changement dadresse dans la base de donnée sans recharger la page
                  
                     var xhr = new XMLHttpRequest();
                     xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                alert(xhr.responseText); // Données textuelles récupérées
             }
                };  
                    xhr.open("GET", "UpdateLoc.php?loc="+event.latLng+"&user="+user+"&adresse="+adresse+"&cp="+cp+"&ville="+ville, true);
                    xhr.send(null);
                       
                       /*  
                     AdresseHTML.value =  adresse;
                     CpHTML.value=cp;
                     VilleHTML.value=ville;
                     compHTML.value = "";
                     
                     var cp2= cp.substring(0,2);
                     
                     // change le departement
                     var i;                   
                     for ( i = 1 ; i < DepHTML.length ; i++)
                         {                           
                             if(DepHTML.options[i].text.indexOf(cp2) !== -1){                                                      
                             DepHTML.selectedIndex = i ;                              
                             }
                         }
                     */ 
                     
                    } else {
                      alert('Aucun résultat trouvé');
                    }
                  } else {
                    alert('Impossible de trouver l\'adresse pour la cause suivante : ' + status);
                  }
                });   
        
    });
    
    
    
                
     
     
 }

