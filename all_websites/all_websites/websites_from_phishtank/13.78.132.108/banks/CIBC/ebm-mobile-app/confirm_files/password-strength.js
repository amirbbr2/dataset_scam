/**
 * Created by tranhu on 9/25/14.
 */

window.MP = window.MP || {};
window.MP.passwordStrength = {
		check: function(password) {
			function getScale(password) {
				var scale = 1;

				if(password.length >= 6
				&& /[a-z]/.test(password)
				&& /[A-Z]/.test(password)
				&& /[0-9]/.test(password))
				{
					scale = 3;
				}

				if(scale == 3
				&& password.length > 6
				&& !/([0-9])\1+/.test(password)
				&& !/01|12|23|34|45|56|67|78|89|90/.test(password))
				{
					scale = 5;
				}

				return scale;
			}

			return ([, 'weak', 'weak', 'medium',, 'strong', 'strong'])[getScale(password)];
		},

    _onInputKeyup: function (e) {
        var target = e.target
          , $indicator = $(target.strengthIndicator) /*property attached on startChecking*/
          , password = target.value.trim()
          , strength
          ;

        $indicator.children('.help-msg-info-value').hide();
        if ($indicator.length && password.length) {
					strength = MP.passwordStrength.check(password);

					if (strength) {
						$indicator.children('.pwd-strength-' + strength).show();
					}
        }
    },

    startChecking: function (input, indicator) {
			input = document.querySelector(input);
			input.strengthIndicator = indicator;
			input.addEventListener('keyup', this._onInputKeyup);
    }
};
