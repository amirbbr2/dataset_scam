// CustomEvent polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {
	if (typeof window.CustomEvent === 'function') return false; //If not IE

	function CustomEvent (event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();

(function () {
	/**
	 * ConsentManager - abstraction wrapper for TRUSTe/TrustArc PrivacyManagerAPI
	 *
	 * domain: domain that is requesting permission ('.domain.com')
	 * siteDomain: current site hostname ('www.domain.com')
	 * eventContext: object/element to which we will dispatch events (defaults to window)
	 */
	function ConsentManager(domain, siteDomain, eventContext) {
		this.domain = domain;
		this.siteDomain = siteDomain;
		this.eventContext = eventContext || window;

		this.apiObjectName = 'PrivacyManagerAPI';
		this.apiObjectParent = window;
	}

	ConsentManager.prototype.initialize = function (consentTypes) {
		var self = this;

		this.consentStates = {};
		this.consentTypes = consentTypes || [
			'required',
			'functional',
			'advertising'
		];

		// Listen for messages from the API
		window.addEventListener('message', function (e) {
			try {
				var data = JSON.parse(e.data);
				if (data.PrivacyManagerAPI) {
					self.handleApiMessage(data.PrivacyManagerAPI);
				}
			} catch(e) {}
		}, false);

		// Required is approved by default, do this as fast as possible
		this.approveConsent('required');

		// Wait for the PrivacyManagerAPI object to initialize
		this.waitForObject(this.apiObjectParent, this.apiObjectName, 10, function (obj) {
			self.privacyApi = obj;

			for (var i = 0; i < self.consentTypes.length; i++) {
				var type = self.consentTypes[i];
				if (!self.haveConsent(type)) {
					self.requestConsentMessaging(type);
					self.handleResponse(type, self.getConsent(type));
				}
			}
		});
	}

	// Approve consent for a type, source can be implied or asserted
	ConsentManager.prototype.approveConsent = function (type, source) {
		if (source === undefined) { source = 'implied'; }

		if (!this.haveConsent(type)) {
			this.consentStates[type] = true;

			var evt = new CustomEvent('ConsentManager_approved', { detail: {
				type: type,
				source: source
			}});
			this.eventContext.dispatchEvent(evt);
		}
	};

	// Call the Privacy Manager API
	ConsentManager.prototype.callApi = function (request, param) {
		return this.privacyApi.callApi(request, this.domain, this.siteDomain, null, param);
	};

	// Deny consent for a type, source can be implied or asserted
	ConsentManager.prototype.denyConsent = function (type, source) {
		if (source === undefined) { source = 'implied' }

		if (this.consentStates[type] !== false) {
			this.consentStates[type] = false;

			var evt = new CustomEvent('ConsentManager_denied', { detail: {
				type: type,
				source: source
			}});
			this.eventContext.dispatchEvent(evt);
		}
	};

	// Get consent for the given type directly from the API
	ConsentManager.prototype.getConsent = function (type) {
		return this.callApi('getConsent', type);
	};

	// Get consent for the given type from TrustArc's local storage object instead of the API
	ConsentManager.prototype.getConsentRaw = function (type) {
		// Get from the API first, this will let us know if we need consent initially based on user's location
		var response = this.getConsent(type);

		// Override response based on what is in the raw localStorage
		if (window.localStorage) {
			var storage = null
			try {
				storage = JSON.parse(window.localStorage.getItem('truste.eu.cookie.notice_preferences'));
			} catch (e) {}

			if (storage !== null && typeof storage.value === 'string') {
				var level = storage.value.split(':');
				if (level.length > 0) {
					level = parseInt(level[0]);

					// Technically it's asserted, but it is useful to know how we got it
					response.source = 'raw_storage';

					switch (type) {
						case 'required':
							response.consent = 'approved';
							break;
						case 'functional':
							response.consent = (level > 0 ? 'approved' : 'denied');
							break;
						default:
							response.consent = (level > 1 ? 'approved' : 'denied');
					}
				}
			}
		}

		return response;
	};

	// Handle the messages returned by the API calls
	ConsentManager.prototype.handleApiMessage = function (message) {
		// CHECK: make sure this response is to YOU. You will actually get the messages to all API callers on this page, not just to you.
		if (!message.source || message.self != this.domain) {
			return;
		}

		// Do not proceed unless this is the direct result of user interraction
		if (message.source != 'asserted') {
			return;
		}

		// If type is provided, handle the response; otherwise re-get consent for everything (except required)
		if (message.type) {
			this.handleResponse(message.type, message);
		} else {
			for (var i = 0; i < this.consentTypes.length; i++) {
				var type = this.consentTypes[i];
				if (type != 'required') {
					this.handleResponse(type, this.getConsent(type));
				}
			}
		}
	};

	// Handle a response to an request for consent
	ConsentManager.prototype.handleResponse = function (type, response) {
		if (response.consent == 'approved') {
			this.approveConsent(type, response.source);
		} else if (response.consent == 'denied') {
			this.denyConsent(type, response.source);
		} else {
			console.error('Unknown API response', response);
		}
	};

	// Do we have consent for the specific type of functionality?
	ConsentManager.prototype.haveConsent = function (type) {
		if (typeof this.consentStates[type] !== 'boolean') {
			return false;
		}

		return this.consentStates[type];
	};

	// Request that the API send messages for consent updates
	ConsentManager.prototype.requestConsentMessaging = function (type) {
		var apiObject = {
			PrivacyManagerAPI: {
				self: this.domain,
				action: 'getConsent',
				timestamp: new Date().getTime(),
				type: type
			}
		};

		window.top.postMessage(JSON.stringify(apiObject), '*');
	};

	// Long-poll for a specific object to instantiate
	ConsentManager.prototype.waitForObject = function (parentObj, objName, interval, callback) {
		var poll = setInterval(function () {
			if (parentObj[objName] !== undefined) {
				var evt = new CustomEvent('ConsentManager_objectReady', { detail: {
					parentObj: parentObj,
					objName: objName,
					obj: parentObj[objName]
				}});

				clearInterval(poll);

				if (typeof callback === 'function') {
					callback(parentObj[objName]);
				}

				parentObj.dispatchEvent(evt);
			}
		}, interval);
	};

	if (window && window.ConsentManager === undefined) {
		window.ConsentManager = ConsentManager;
	}
})();