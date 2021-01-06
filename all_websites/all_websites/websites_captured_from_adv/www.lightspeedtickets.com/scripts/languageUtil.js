var languageUtil = {
	getDayNames: function (language) {
		if (language === "en") {
			return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday"];
		} else if (language === "de") {
			return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag",
				"Freitag", "Samstag"];
		} else if (language === "es") {
			return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves",
				"Viernes", "Sábado"];
		} else if (language === "fr") {
			return ["dimanche", "lundi", "mardi", "mercredi", "jeudi",
				"vendredi", "samedi"];
		} else if (language === "pt") {
			return ["domingo", "segunda", "terça", "quarta", "quinta",
				"sexta", "sábado"];
		}
	},
	getDayAbbreviations: function(language) {
		if (language === "de") {
			return ["M", "D", "M", "D", "F", "S", "S"];
		} else if (language === "es" || language === "fr") {
			return ["L", "M", "M", "J", "V", "S", "D"];
		} else if (language === "pt") {
			return ["S", "T", "Q", "Q", "S", "S", "D"];
		} else {
			return ["M", "T", "W", "T", "F", "S", "S"];
		}
	},
	getMonthNames: function (language) {
		if (language === "es") {
			return ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
		} else if (language === "pt") {
			return ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.",
				"ago.", "set.", "out.", "nov.", "dez."];
		}
	},
	getShortDate: function (date, language) {
		if (language === "en") {
			return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
		} else if (language === "de" || language === "fr") {
			return (date.getDate() + "." + (date.getMonth() + 1)) + "." + date.getFullYear();
		} else if (language === "es" || language === "pt") {
			return (date.getDate() + " " + languageUtil.getMonthNames(language)[date.getMonth()])
				+ " " + date.getFullYear();
		}
	},
	getFormattedTime: function (date, language) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var time;
		if (language === "en" || language === "es") {
			var ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			time = hours + ':' + minutes + ' ' + ampm;
			if (time === "3:30 AM") {
				if (language === "es") {
					return "Hora a Anunciar";
				} else {
					return "TBA";
				}
			}
		} else if (language === "de" || language === "fr" || language === "pt") {
			hours = hours < 10 ? '0' + hours : hours;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			time = hours + ':' + minutes;
			if (time === "03:30") {
				if (language === "de") {
					return "Termin offen";
				} else if (language === "pt") {
					return "Hora a Anunciar";
				} else if (language === "fr") {
					return "heure à fixer";
				}
			}
		}
		if (language === "pt") {
			return time + "hrs";
		} else if (language === "es") {
			return time;
		} else {
			return "@" + time;
		}
	},
	getTicketCount: function (count, language) {
		if (language === "en" || language === "fr") {
			return languageUtil.numberWithSeparators(count, language) + " tickets left";
		} else if (language === "de") {
			return "Nur noch " + languageUtil.numberWithSeparators(count, language) + " Tickets";
		} else if (language === "es") {
			return languageUtil.numberWithSeparators(count, language) + " boletos restantes";
		} else if (language === "fr") {
			return languageUtil.numberWithSeparators(count, language) + " billets restants";
		} else if (language === "pt") {
			if (count === 1) {
				return languageUtil.numberWithSeparators(count, language) + " ingressos restante";
			} else {
				return languageUtil.numberWithSeparators(count, language) + " ingressos restantes";
			}
		}
	},
	numberWithSeparators: function (x, language) {
		// only works well with integers
		if (language === "en" || language === "es" || language === "pt") {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		} else if (language === "de" || language === "fr") {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	},
	getLoadMore: function (language) {
		if (language === "de") {
			return "Mehr anzeigen";
		} else if (language === "es") {
			return "Ver Más";
		} else if (language === "fr") {
			return "Afficher Plus";
		} else if (language === "pt") {
			return "Ver Mais";
		} else {
			return "Load More";
		}
	},
	getNoEvents: function (language) {
		if (language === "de") {
			return "Die von Ihnen ausgewählte Webseite ist nicht vorhanden. Bitte überprüfen Sie die URL und versuchen Sie es erneut.";
		} else if (language === "es") {
			return "Revisa el enlace o intenta una nueva búsqueda de boletos.";
		} else if (language === "fr") {
			return "Malheureusement, il n’y a pas de billets pour cet évènement en ce moment. Veuillez reconsulter notre site à une date ultérieure.";
		} else if (language === "pt") {
			return "Por favor, verifique a URL e tente novamente.";
		} else {
			return "No events available.";
		}
	},
	getLoading: function (language) {
		if (language === "de") {
			return "Laden";
		} else if (language === "es") {
			return "Cargando";
		} else if (language === "fr") {
			return "Chargement en cours";
		} else if (language === "pt") {
			return "Carregando";
		} else {
			return "Loading...";
		}
	},
	getFullMonthNames: function(language) {
		if (language === "de") {
			return ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
				"Jul", "Aug", "Sep", "Okt", "Nov", "Dez"
			];
		} else if (language === "es") {
			return ["Ene", "Feb", "Mar", "Abr", "May", "Jun",
				"Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
			];
		} else if (language === "fr") {
			return ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin",
				"Juil", "Aout", "Sep", "Oct", "Nov", "Dec"
			];
		} else if (language === "pt") {
			return ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
				"Jul", "Ago", "Set", "Out", "Nov", "Dez"
			];
		} else {
			return ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
				"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];
		}
	}
};