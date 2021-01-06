acc_menu_visible = false;
email_is_valid = false;
username_is_valid = false;
password_is_valid = false;
password2_is_valid = false;
ava_is_valid = false;
gear_mode = "signup";
signup_clicked = false;
top_mobile_menu_visible = false;
top_mobile_search_visible = false;

	$(document).on('click','.search_button', function(e) {
		search();
	});
	$(document).on('keyup','#search_input', function(e) {
		if (e.keyCode == 13) {
			search();
		}
	});
	$(document).on('click','#account_div', function(e) {
		e.stopPropagation();
		if (acc_menu_visible) {
			$('#chat_account_bar').fadeOut();
			acc_menu_visible = false;
		} else {
			$('#chat_account_bar').fadeIn();
			acc_menu_visible = true;
		}
	});
	$(document).on('click','html', function(e) {
		if (acc_menu_visible) {
			$('#chat_account_bar').fadeOut();
			acc_menu_visible = false;
		}
	});
	$(document).on('click','#lso_in, .add_comment_lin', function(e) {
	$("html").css("overflow", "hidden");
		$('.overlay').fadeIn(400, 
			function(){
				$('#modal_form') 
					.css('display', 'block') 
					.animate({opacity: 1, top: '185px'}, 200); 
		});
	});
	$(document).on('click','#lso_up', function(e) {
	$("html").css("overflow", "hidden");
		gear_mode = "signup";
		$('.overlay').fadeIn(400, 
			function(){
				$('#modal_form_signup') 
					.css('display', 'block') 
					.animate({opacity: 1, top: '185px'}, 200); 
		});
	});
	$("#m_signup_un").keyup(function(){
		var username = $("#m_signup_un").val();
			username = username.replace(/[^a-z0-9]/gi,'');
			$("#m_signup_un").val(username);
		if (username.length >= 3) {
			$.post("/php/uniqcheck.php", {field: "username", value: username}, function(result){
				if (result == "0") {
					$("#m_signup_un").css('background-color','#DBF4DC');
					$("#m_signup_un_label").css({'color':'#0B7505','background-color':'#CFE8D0'}).html('GOOD!');
					username_is_valid = true;
				} else {
					$("#m_signup_un").css('background-color','#FFBABA');
					$("#m_signup_un_label").css({'color':'#FFF','background-color':'#EC7373'}).html('already registered!');
					username_is_valid = false;
				}
			});
		} else {
			$("#m_signup_un").css('background-color','#FFBABA');
			$("#m_signup_un_label").css({'color':'#FFF','background-color':'#EC7373'}).html('too short...');
			username_is_valid = false;
		}
	});
	$("#m_signup_pw").keyup(function(){
		var password = $("#m_signup_pw").val();
		if (password.length >= 6) {
			$("#m_signup_pw").css('background-color','#DBF4DC');
			$("#m_signup_pw_label").css({'color':'#0B7505','background-color':'#CFE8D0'}).html('GOOD!');
			password_is_valid = true;
		} else {
			$("#m_signup_pw").css('background-color','#FFBABA');
			$("#m_signup_pw_label").css({'color':'#FFF','background-color':'#EC7373'}).html('too short...');
			password_is_valid = false;
		}
	});	
	$("#m_signup_pw2").keyup(function(){
		var password = $("#m_signup_pw").val();
		var password2 = $("#m_signup_pw2").val();
		if (password.length >= 6) {
			if (password != password2) {
				$("#m_signup_pw2").css('background-color','#FFBABA');
				$("#m_signup_pw2_label").css({'color':'#FFF','background-color':'#EC7373'}).html('does not match!');
				password2_is_valid = false;
			} else {
				$("#m_signup_pw2").css('background-color','#DBF4DC');
				$("#m_signup_pw2_label").css({'color':'#0B7505','background-color':'#CFE8D0'}).html('GOOD!');
				password2_is_valid = true;
			}
		} else {
			$("#m_signup_pw2").css('background-color','#FFBABA');
			$("#m_signup_pw2_label").css({'color':'#FFF','background-color':'#EC7373'}).html('too short...');
			password2_is_valid = false;
		}
	});
	$("#m_signup_em").keyup(function(){
		var email = $("#m_signup_em").val();
		if (email != "") {
			if(isValidEmailAddress(email)) {
				$.post("/php/uniqcheck.php", {field: "email", value: email}, function(result){
					if (result == "0") {
						$("#m_signup_em").css('background-color','#DBF4DC');
						$("#m_signup_em_label").css({'color':'#0B7505','background-color':'#CFE8D0'}).html('GOOD!');
						email_is_valid = true;
					} else {
						$("#m_signup_em").css('background-color','#FFBABA');
						$("#m_signup_em_label").css({'color':'#FFF','background-color':'#EC7373'}).html('already registered!');
						email_is_valid = false;
					}
				});
			} else {
				$(this).css('background-color','#FFBABA');
				$("#m_signup_em_label").css({'color':'#FFF','background-color':'#EC7373'}).html('not valid...');
				email_is_valid = false;
			}
		} else {
			$(this).css("background-color","#F1F7FF"); 
			$("#m_signup_em_label").css({'color':'#506F8C','background-color':'#E6E6E6'}).html('your e-mail');
			email_is_valid = false;
		}
	});
	$(document).on('click','.gall_author_div', function(e) {
		e.stopPropagation();
		e.preventDefault();	
		var uid = $(this).data('uid');
		window.location.href = "//"+window.location.host+"/channel/"+uid;
	});	
	//EDIT
var edit_window = false;
	$(document).on('click','.gall_edit_button', function(e) {
		if (!edit_window) {
			$('.gall_edit_div').fadeIn();
			edit_window = true;
		}
	});
	$(document).on('click','.gall_edit_ta_close', function(e) {
		if (edit_window) {
			$('.gall_edit_div').fadeOut();
			edit_window = false;
		}
	});
	$(document).on('click','.gall_edit_ta_ok', function(e) {
		if (edit_window) {
			var new_gall_name = $('.gall_edit_ta').val();
			if (new_gall_name.length >= 10 && new_gall_name.length <= 2048){
			var ghash = $('.gallery_overlay').data('ghash');			
				$.post("/php/gall_rename.php", {uid: usss[0], ghash: ghash, name: new_gall_name}, function(result){
					window.location.reload();
				});	
			}
		}
	});
	$(document).on('click','.new_cover', function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).fadeOut();
		var new_gall_cover = $(this).data('pid');			
		var ghash = $('.gallery_overlay').data('ghash');			
		$.post("/php/gall_newcover.php", {uid: usss[0], ghash: ghash, cover: new_gall_cover}, function(result){
			//window.location.reload();
		});	
	});
	$(document).on('click','.remove_photo', function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).closest('.photo_el').fadeOut();
		var pids = new Array();
		pids.push($(this).data('pid'));
		pids_json = JSON.stringify(pids);
		var ghash = $('.gallery_overlay').data('ghash');
		var aid = $('.gallery_overlay').data('aid');		
		xcdn = $(".gallery_overlay").data("cdn");
		$.post("/php/gall_rmphoto.php", {uid: usss[0], ghash: ghash, pids: pids_json, x: xcdn}, function(result){
			console.log(result);
		});	
	});
	$(document).on('click','.gall_delete', function(e) {
		e.stopPropagation();
		e.preventDefault();
		var ghash = $('.gallery_overlay').data('ghash');
		xcdn = $(".gallery_overlay").data("cdn");
		$.post("/php/gall_remove.php", {uid: usss[0], ghash: ghash, x: xcdn}, function(result){
			console.log(result);
			window.location.href = "/channel/"+usss[0];
		});	
	});
	$(document).on('click','.gall_addPhotos', function(e) {
		var ghash = $('.gallery_overlay').data('ghash');
		window.location.href = "//"+window.location.host+"/upload/?ag="+ghash;
	});
	//******************************LOGIN UP
			$(document).on('click','#login_button', function(e) {
				var email = $('#m_login_un').val();
				var password = $('#m_login_pw').val();		
					$.post("/php/login.php", {password:password,email:email}, function(result){
						console.log(result);
						if (result == "ok") {
							var url = window.location.host+window.location.pathname;
							window.location.href = "http://"+url;
						} else {
							$('#m_login_un').css('background-color','#EC7373');
							$('#m_login_pw').css('background-color','#EC7373');							
						}
					});
			});
	//******************************SIGN UP
	$(document).on('click','#signup_button', function(e) {
		if (signup_clicked) return;
		signup_clicked = true;
		if (gear_mode == 'signup') {				
			user_id = uniqid();
			var ava_url = "/img/default.svg";
			if (ava_is_valid && $("#canv2").length) {
				ava_is_valid = true;
			} else {
				ava_is_valid = false;
			}				
			if (email_is_valid && username_is_valid && password_is_valid && password2_is_valid) {
				var username = $("#m_signup_un").val();
				var password = $("#m_signup_pw").val();
				var password2 = $("#m_signup_pw2").val();
				var email = $("#m_signup_em").val();
				$.post("/php/signup.php", {uid:user_id, username: username, password:password,password2:password2,email:email,photo:ava_url}, function(result){
						if (ava_is_valid) {
							var canvas = document.getElementById("canv2");
							var ava_data = canvas.toDataURL("image/jpeg");
								$.post("http://yps.link/pics_users/avaloader.php", {user_id: user_id, ava:ava_data}, function(result){
									if (result != "error") {						
										$.post("/php/update.php", {uid: user_id, photo:result}, function(result){
											var url = window.location.host+window.location.pathname;
											window.location.href = "http://"+url;
										});	
									}
								});
						} else {
								var url = window.location.host+window.location.pathname;
								window.location.href = "http://"+url;
						}
				});
			}
		} else {
			console.log("starting update");
			user_id = usss[0];
			var ava_url = "/img/default.svg";
			if (ava_is_valid && $("#canv2").length) {
				ava_is_valid = true;
			} else {
				ava_is_valid = false;
			}				
			if ((password_is_valid && password2_is_valid || $("#m_signup_pw").val() == "") && (username_is_valid || $("#m_signup_un").val() == "") && (email_is_valid || $("#m_signup_em").val() == "")) {
				var username = $("#m_signup_un").val();
				var password = $("#m_signup_pw").val();
				var password2 = $("#m_signup_pw2").val();
				var email = $("#m_signup_em").val();
				if (username == "" && password == "" && password2 == "" && email == "") {
					console.log("Empty",user_id,username,password,password2,email);
				} else {
					console.log(user_id,username,password,password2,email);
					$.post("/php/update.php", {uid:user_id, username: username, password:password,password2:password2,email:email}, function(result){
						if (!ava_is_valid) {
							var url = window.location.host+window.location.pathname;
							window.location.href = "http://"+url;	
						}
					});
				}
			}
			if (ava_is_valid) {
				var canvas = document.getElementById("canv2");
				var ava_data = canvas.toDataURL("image/jpeg");
					$.post("http://yps.link/pics_users/avaloader.php", {user_id: user_id, ava:ava_data}, function(result){
						if (result != "error") {						
								var url = window.location.host+window.location.pathname;
								window.location.href = "http://"+url;
						}
					});
			}
		}				
	});
	$(document).on('click','#chat_accout_gear_my', function(e) {
	$("html").css("overflow", "hidden");
		$('.modal_title_signup').html("Edit account");
		$('#m_signup_em').attr("placeholder", usss[6]);
		$('#m_signup_un').attr("placeholder", usss[1]);
		$('#m_signup_pw').attr("placeholder", "************");
		$('#m_signup_pw2').attr("placeholder", "************");
		$('#signup_button').html('update');
		gear_mode = 'update';
		$('.overlay').fadeIn(400, 
			function(){
				$('#modal_form_signup') 
					.css('display', 'block') 
					.animate({opacity: 1, top: '185px'}, 200); 
		});
	});
	$('.modal_close, .overlay').click( function(){
	$("html").css("overflow", "auto");
		$('#modal_form, #modal_form_signup')
			.animate({opacity: 0, top: '50%'}, 200, 
				function(){ 
					$(this).css('display', 'none');
					$('.overlay').fadeOut(400); 
				}
			);
	});
	$(document).on('click','#lso_out', function(e) {
	e.stopPropagation(); 
		$("#chat_account_bar").fadeOut();	
		$.post("/php/logout.php")
		.done(function(data) {
			var url = window.location.host+window.location.pathname;
			window.location.href = "http://"+url;
		});
	});
	$(document).on('click','#toupload', function(e) {
		if (usss[4] == "yes") {
			//
			window.location.href = "/upload";
		} else {
		//	var url = window.location.host+window.location.pathname;
			var addurl = "//"+window.location.host+"/upload"; /*!!!!*/
			$("#a_vk").attr('href',$("#a_vk").attr('data-burl') +addurl);
			$("#a_fb").attr('href',$("#a_fb").attr('data-burl') +addurl);
			$("#a_tw").attr('href',$("#a_tw").attr('data-burl') +addurl);
			$('#lso_in').click();
		}
	});
	$(document).on('click','#tofavorites', function(e) {
		if (usss[4] == "yes") {
			//
			window.location.href = "/favorites";
		} else {
			var addurl = "//"+window.location.host+"/favorites"; /*!!!!*/
			$("#a_vk").attr('href',$("#a_vk").attr('data-burl') +addurl);
			$("#a_fb").attr('href',$("#a_fb").attr('data-burl') +addurl);
			$("#a_tw").attr('href',$("#a_tw").attr('data-burl') +addurl);
			$('#lso_in').click();
		}
	});
	$(document).on('click','#tomenu', function(e) {
		if (top_mobile_menu_visible) {
			top_mobile_menu_visible = false;
			$('#top_panel2').fadeOut();
		} else {
			top_mobile_menu_visible = true;
			$('#top_panel2').fadeIn();
		}
	});
	$(document).on('click','#tosearch', function(e) {
		if (top_mobile_search_visible) {
			top_mobile_search_visible = false;
			$('#search_div').fadeOut();
		} else {
			top_mobile_search_visible = true;
			$('#search_div').fadeIn();
		}
	});	
	$(window).resize(function(){
		var width = $(window).width();
		if (width>640){
			if ($('#top_panel2').css('display') == "none") {
				$('#top_panel2').css('display','block');
			}
			if ($('#search_div').css('display') == "none") {
				$('#search_div').css('display','block');
			}	
		} else {
			if (width<=640 && !top_mobile_menu_visible){
				$('#top_panel2').css('display','none');
			}
			if (width<=640 && !top_mobile_search_visible){
				$('#search_div').css('display','none');
			}
		}	
	});
	$(document).on('click','.hash_link', function(e) {
		e.preventDefault();
		e.stopPropagation();
			window.location.href = $(this).data('href');
	});
	$(document).on('click','#toback', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (typeof localStorage.getItem("window_parent") !== 'undefined') {
			var window_parent = localStorage.getItem("window_parent");
			var parts = window_parent.split("|");
			if (parts[0] == "index") {
				if (parts[1] != 0) {
					window.location.href = "/?off="+parts[1];
				} else {
					window.location.href = "/";
				}
			}
			if (parts[0] == "results") {
				ht = "";
				if (parts[3] == "ht") ht = "&ht";
					window.location.href = "/results?search_query="+parts[1]+"&off="+parts[2]+ht;
			}
			if (parts[0] == "popular") {
					window.location.href = "/popular?mode="+parts[1]+"&off="+parts[2];
			}
			if (parts[0] == "trends") {
					window.location.href = "/trends?off="+parts[1];
			}
			if (parts[0] == "favorites") {
					window.location.href = "/favorites?off="+parts[1];
			}
		}
	});	
$(document).ready(function(){	
	//CURURL
	var url = "//"+window.location.host+window.location.pathname+window.location.search;
	$("#a_vk").attr('href',$("#a_vk").attr('data-burl') + encodeURIComponent(url));
	$("#a_fb").attr('href',$("#a_fb").attr('data-burl') + encodeURIComponent(url));
	$("#a_tw").attr('href',$("#a_tw").attr('data-burl') + encodeURIComponent(url));
	$(document).on('click','.gall_download', function(e) {
		if (usss[4] != "yes") {
			$('#lso_in').click();
			return;
		}
		x = $(this).data('x');
		fn = $(this).data('fn');
		ghash = $(this).data('ghash');
    	$.post("/php/download.php", {ghash:ghash,fn:fn,x:x,uid:usss[0]}, function(result){
			result = JSON.parse(result);
			if (result.pids_array.length > 0) {
			$(".gall_download").css({"background":"url('/img/gall_download_hover.svg') no-repeat left","pointer-events":"none"});
				var fakeFormHtmlFragment = "<form style='display: none;' method='POST' action='http://"+result.x+".pics.vc/api/download.php'>";
					fakeFormHtmlFragment += "<input type='hidden' name='fn' value='"+result.fn+"'>";			
					fakeFormHtmlFragment += "<input type='hidden' name='pids' value='"+JSON.stringify(result.pids_array)+"'>";
					fakeFormHtmlFragment += "</form>";
				$fakeFormDom = $(fakeFormHtmlFragment);
				$("body").append($fakeFormDom);
				$fakeFormDom.submit();
			}
		});		
	});
});
//****AVATAR
	$(document).on('click','#ava_load_button', function(e) {
		$('#avafile').click();
	});
	$(document).on('change','#avafile', function(e) {
		handleFileSelect(e);
	});
			//***********DRAG
			var clicking = false;
			var startPosTop = 0;
			var startPosLeft = 0;
				$(document).on('mousedown','.tag_frame', function(e) {
					clicking = true;
					startPosTop = e.pageY - $(this).position().top;
					startPosLeft = e.pageX - $(this).position().left;
				});
				$(document).on('mouseup','.ava_resizer, .tag_frame, html', function(e) {
					clicking = false;
					clickingR = false;
				});
				$(document).on('mousemove','.tag_fade, .ava_resizer, .tag_frame', function(e) {
					if (clicking) {
						var relY = e.pageY - startPosTop;
						var relX = e.pageX - startPosLeft;
						
						if (relY < 0) relY = 0;
						if (relX < 0) relX = 0;
						if ($('.tag_frame').width()+relX > $('.tag_frame').find('img').width()) relX = $('.tag_frame').find('img').width()-$('.tag_frame').width();
						if ($('.tag_frame').height()+relY > $('.tag_frame').find('img').height()) relY = $('.tag_frame').find('img').height()-$('.tag_frame').height();
						
						$('.tag_frame').css({"top":relY+"px","left":relX+"px"});
						$('.tag_frame').find('img').css({"margin-top":-relY + "px","margin-left":-relX + "px"});
						avaPreviewPosUpdate(-relX,-relY);
						avaClipUpdate();
					}
				});
			//***********RESIZE
			var clickingR = false;
			var startPosTopR = 0;
			var startPosLeftR = 0;
				$(document).on('mousedown','.ava_resizer', function(e) {
					e.stopPropagation(); 
					clickingR = true;
					startPosTopR = e.pageY;
					startPosLeftR = e.pageX;
				});
				$(document).on('mousemove','.tag_fade, .ava_resizer, .tag_frame', function(e) {
					e.stopPropagation(); 
					if (clickingR) {
						var relY = e.pageY - startPosTopR;
						var relX = e.pageX - startPosLeftR;
						var offset = 0;
						if (Math.abs(relX)>Math.abs(relY)) offset = relX;
						if (Math.abs(relY)>Math.abs(relX)) offset = relY;
						if ($('.tag_frame').width() + offset < 45 || $('.tag_frame').height() + offset < 45) offset = 0;
						if ($('.tag_frame').width()+$('.tag_frame').position().left+offset > $('.tag_frame').find('img').width()) offset = 0;
						if ($('.tag_frame').height()+$('.tag_frame').position().top+offset > $('.tag_frame').find('img').height()) offset = 0;

						$('.tag_frame').css({'width':($('.tag_frame').width() + offset) +'px','height':($('.tag_frame').height() + offset) + 'px'});
						startPosTopR = e.pageY;
						startPosLeftR = e.pageX;
						avaPreviewScaleUpdate();
						avaClipUpdate();
					}
				});
	var dropZone = $('#drop_zone');
	$('#drop_zone').on("dragenter dragstart dragend dragleave dragover drag drop", function (e) {
        e.preventDefault();
    });
	dropZone[0].ondrop = function(event) {
		event.preventDefault();
		event.target.files = event.dataTransfer.files;
		handleFileSelect(event);
		dropZone.removeClass('hover');
	};
	dropZone[0].ondragover = function() {
		dropZone.addClass('dz_hover');
		return false;
	};
	dropZone[0].ondragleave = function() {
		dropZone.removeClass('dz_hover');
		return false;
	};
	function avaPreviewScaleUpdate() {
		var prewWidth = $('#ava_main_preview > img').width() / ($('.tag_frame').width() / $('#ava_preview_wrap').width());
		var prewHeight = $('#ava_main_preview > img').height() / ($('.tag_frame').height() / $('#ava_preview_wrap').height());
		$('#ava_preview_wrap > img').css({'width':prewWidth,'height':prewHeight});
	}
	function avaPreviewPosUpdate(l,t) {
		var prewMLeft = l / ($('.tag_frame').width() / $('#ava_preview_wrap').width());
		var prewMTop = t / ($('.tag_frame').height() / $('#ava_preview_wrap').height());
		$('#ava_preview_wrap > img').css({"margin-top":prewMTop+"px","margin-left":prewMLeft+"px"});
		var canvMLeft = l / ($('.tag_frame').width() / $('#ava_preview_wrap').width());
		var canvMTop = t / ($('.tag_frame').height() / $('#ava_preview_wrap').height());
	}
	function avaClipUpdate() {
			var baseWidth = $('.tag_frame').width();
			var baseHeight = $('.tag_frame').height();
			var baseTop = parseInt($('.tag_frame').css('top'), 10);
			var baseLeft = parseInt($('.tag_frame').css('left'), 10);
			
			var aW = baseWidth / $('#ava_main_preview > img').width() * $('#canv1').width();
			var aH = baseHeight / $('#ava_main_preview > img').height() * $('#canv1').height();
			var aT = baseTop / $('#ava_main_preview > img').height() * $('#canv1').height();
			var aL = baseLeft / $('#ava_main_preview > img').width() * $('#canv1').width();

		clipImage(aL, aT, aW, aH)
	}
	function clipImage(clipX, clipY, clipWidth, clipHeight) {
		var canvas2 = document.getElementById('canv2');
		canvas2.width = clipWidth;
		canvas2.height = clipHeight;
		var ctx2 = document.getElementById('canv2').getContext("2d");
		var image = document.getElementById('canv1');
		ctx2.drawImage(image, clipX, clipY, clipWidth, clipHeight,
		0, 0, clipWidth, clipHeight);
	}
	function handleFileSelect(evt) {
	var file = evt.target.files[0]; // FileList object
	if (!file.type.match('image.*')) {
		return;
	}
		var reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(e) {
			// Render thumbnail.
			$("#canvas_ava, #ava_main_preview").html('');
			ava_is_valid = false;
			var div = document.getElementById('ava_main_preview')
			div.innerHTML = ['<img src="', e.target.result,
						'" title="', escape(theFile.name), 
						'"/><div class="tag_fade nosel"></div><div class="tag_frame nosel"><img class="nosel" draggable="false" src="', e.target.result,
						'"/><div class="ava_resizer nosel"></div></div>'].join('');
			$('#ava_preview_wrap').html('<img src="'+e.target.result+'" title="Avatar preview"/>');
				//**************
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			var canvas2 = document.createElement("canvas");
			var image = new Image();
			canvas.classList.add('canv');
			canvas.setAttribute("id", "canv1");
			canvas2.setAttribute("id", "canv2");
			image.src = e.target.result;
			image.onload = function(e){
				$('.tag_frame > img, .tag_fade').css('height',$('#ava_main_preview > img').height());
				$('.tag_frame > img, .tag_fade').css('width',$('#ava_main_preview > img').width());
				//*******preview
					avaPreviewScaleUpdate();
					avaPreviewPosUpdate(-10,-10);
				var MAX_WIDTH = 1024;
				var MAX_HEIGHT = 768;
				var width = image.width;
				var height = image.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(image, 0, 0, width, height);
				avaClipUpdate();
				ava_is_valid = true;
			}
			document.getElementById("canvas_ava").appendChild(canvas);
			document.getElementById("canvas_ava").appendChild(canvas2);
			//**********
			};
		})(file);
		reader.readAsDataURL(file);
	}
//-------------favorite
	$(document).on('click','.gall_add_fav', function(e) {
		e.preventDefault();
		e.stopPropagation();	
		if (usss[4] != "yes") {
			$('#lso_in').click();
			return;
		}
		if (gall_fav) return;
		gall_fav = true;
		var ghash = $('.gallery_overlay').data('ghash');
		$('.gall_add_fav').css({'background-color':'#D2691E','cursor':'default','background-position':'center','width':'28px'});
		$('.gall_add_fav > span').fadeOut();
		$.post("php/favorite.php", { uid: usss[0], ghash: ghash, action:"add"})
			.done(function(result) {
				if (result=="error") {
					return;
				}
			});
	});
	$(document).on('click','.gall_totop', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (usss[4] != "yes") {
			$('#lso_in').click();
			return;
		}
		var ghash = $(this).parent().data('ghash');
		$.post("php/favorite.php", { uid: usss[0], ghash: ghash, action:"add"})
			.done(function(result) {
				if (result=="error") {
					return;
				}
			});
		var igall = $(this).closest("div.gall_el").parent().clone();
		$(this).closest("div.gall_el").parent().remove();
		$grid.isotope().prepend( igall ).isotope( 'prepended', igall ).isotope();//'layout'
		
	});	
	$(document).on('click','.gall_remove', function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (usss[4] != "yes") {
			$('#lso_in').click();
			return;
		}
		var ghash = $(this).parent().data('ghash');
		$.post("php/favorite.php", { uid: usss[0], ghash: ghash, action:"remove"})
			.done(function(result) {
				if (result=="error") {
					return;
				}
			});
		$(this).closest("div.gall_el").parent().remove();
		$grid.isotope();//'layout'
	});		
//FUNCTIONS
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}
function uniqid(prefix, more_entropy) {
  if (typeof prefix === 'undefined') {
    prefix = '';
  }
  var retId;
  var formatSeed = function(seed, reqWidth) {
    seed = parseInt(seed, 10)
      .toString(16);
    if (reqWidth < seed.length) {
      return seed.slice(seed.length - reqWidth);
    }
    if (reqWidth > seed.length) {
      return Array(1 + (reqWidth - seed.length))
        .join('0') + seed;
    }
    return seed;
  };
  if (!this.php_js) {
    this.php_js = {};
  }
  if (!this.php_js.uniqidSeed) {
    this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
  }
  this.php_js.uniqidSeed++;

  retId = prefix;
  retId += formatSeed(parseInt(new Date()
    .getTime() / 1000, 10), 8);
  retId += formatSeed(this.php_js.uniqidSeed, 5);
  if (more_entropy) {
    retId += (Math.random() * 10)
      .toFixed(8)
      .toString();
  }
  return retId;
}
function search(){
	var sq = $('#search_input').val();
	sq = sq.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
	sq = sq.replace(/\s\s+/g, ' ');
	sq = sq.trim().toLowerCase();
	sq = sq.split(' ').join('+');
	console.log("|"+sq+"|");
	window.location.href = "//"+window.location.host + "/results?search_query=" + sq;
}
//SCROLL TO TOP
		$(function() {
			$(window).scroll(function() {
				if($(this).scrollTop() != 0) {
					$('#scroll_top_wrap').fadeIn();
				} else {
					$('#scroll_top_wrap').fadeOut();
				}
			});
			$('#scroll_top_wrap').click(function() {
				$('body,html').animate({scrollTop:0},800);
			});
		});
//-----------------
//-----------------Pics prew
$(".gall_el").mouseover(function(e) {
	var preimg = $(this).attr("data-preimg");
	if (preimg == 3) return;
	$(this).find('.preimg_bars, .gall_preimg_div').css('opacity','1');
	console.log('fin');
	if (preimg == 0) {
		$(this).attr("data-preimg","1");
		$(this).find('.preimg_loader_div > div').addClass("preimg_loader");
		var ghash = $(this).find('.gall_cover_div').data('ghash');
		$.post("/php/get_preimg.php", {ghash: ghash, x:$(this).attr("data-x")}, function(result){
			var res = JSON.parse(result);
			setTimeout(function(){rmPreimgLoader(res['ghash'])}, 1000);
			var preimgbar_width = Math.round(100/res['photos'].length);
			for (i=0;i<res['photos'].length;i++){
				$('div[data-ghash="'+ghash+'"]').parent().find('.preimg_bars').append("<div class='preimgbar' data-pibn='"+i+"' style='width:"+preimgbar_width+"%'></div>")
			}
			preload(res['photos'],res['x']);
			rmPreimgDataLoaded(res['ghash'],res['photos'].length,res['photos']);
		});	
	}	
});
$(".gall_el").mouseout(function(e) {
	$(this).find('.preimg_bars, .gall_preimg_div').css('opacity','0');
	console.log('fout');
});
function rmPreimgLoader(ghash) {
	$('div[data-ghash="'+ghash+'"] > .preimg_loader_div > div').removeClass("preimg_loader");
}
function make_src(x,img_id){
console.log(img_id);
		dir1 = img_id.substr(0,3);
		dir2 = img_id.substr(3,3);
		dir3 = img_id.substr(6,3);
		dir4 = img_id.substr(9,3);
	return "http://"+x+".pics.vc/pics/s/"+dir1+"/"+dir2+"/"+dir3+"/"+dir4+"/"+img_id+".jpg";
}
function rmPreimgDataLoaded(ghash,count,photos) {
	$('div[data-ghash="'+ghash+'"]').parent().attr("data-preimg_count",count);
	$('div[data-ghash="'+ghash+'"]').parent().attr("data-preimg_photos",photos);
	$('div[data-ghash="'+ghash+'"]').parent().attr("data-preimg","2");
}
$(".gall_el").mousemove(function(e) {
	var preimg = $(this).attr("data-preimg");
	if (preimg == 2) {
		var parts = Math.round($(this).width()/parseInt($(this).attr("data-preimg_count")));
		var position = Math.floor(e.offsetX/parts);
		$(this).find('div.preimgbar').removeClass('preimgbar_sel');
		$(this).find('div[data-pibn="'+position+'"]').addClass('preimgbar_sel');
		var src = $(this).find('img.gall_preimg').attr('src');
			var x = $(this).attr("data-x");
			var pre_photos = $(this).attr("data-preimg_photos").split(",");	
/*			
			dir1 = pre_photos[position].substr(0,3);
			dir2 = pre_photos[position].substr(3,3);
			dir3 = pre_photos[position].substr(6,3);
			dir4 = pre_photos[position].substr(9,3);
		new_src = "http://"+x+".pics.vc/pics/s/"+dir1+"/"+dir2+"/"+dir3+"/"+dir4+"/"+pre_photos[position]+".jpg";
*/
		new_src	= make_src(x,pre_photos[position]);
		if (src != new_src) {
			$(this).find('img.gall_preimg').attr('src',new_src);
		}
	}
});
var preload_images = new Array();
function preload(imgs_arr,x) {
	for (i = 0; i < imgs_arr.length; i++) {
			preload_images[i] = new Image()
			preload_images[i].src = make_src(x,imgs_arr[i]);
	}
}