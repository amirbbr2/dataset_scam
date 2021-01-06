$(document).ready(function () {
	if ($('#notificationModal').data('timer') !== undefined) {

		setTimeout(function () {
			$('#notificationModal button[data-dismiss].close').trigger('click');
		}, $('#notificationModal').data('timer'));
	}

	/*$(document).on('click', 'button.close', function(e) {
		e.preventDefault();

		if ($(this).data('dismiss') === 'modal') {
			let parent = $(this).parents('div[role="toast"]')[0];

			$(parent).removeClass('show').addClass('hide');
		}
	});*/
});