document.addEventListener('DOMContentLoaded', function() {
	window.MP = window.MP || {};

	$('.password-strength-hint-button').click(function togglePwdHint() {
		var $button = $(this)
		  , isExpanded = $button.data('expanded')
		  , newSrc = 'doc/css/ai/account-details/images/' + (isExpanded? 'help-icon-open.png': 'help-icon-close.png')
		  ;

		$button.data('expanded', !isExpanded);
		$button.children('img').attr('src', newSrc);
		$('.password-strength-hint').slideToggle();
	});

	MP.showPwd = function showPwd() {
		var isShowing = $('#show-password').is(':checked')
		  , newType = isShowing? 'text': 'password'
		  ;

		$('#new-password, #confirm-password').attr('type', newType);
	};

	MP.showPwd();

	var isPWDpg = !!document.getElementById("new-password");
	if(isPWDpg) {
		MP.passwordStrength.startChecking('#new-password', '#pwd-strength-indicator');
	}

	$('#new-password, #confirm-password').bind('copy cut', function(e) {
		e.preventDefault();
	});
});
