jui.redefine("util.time", [ "util.base" ], function(_) {

	/**
	 * @class util.time
	 *
	 * Time Utility
	 *
	 * @singleton
	 * 
	 */
	var self = {

		//constant
		MILLISECOND : 1000,
		MINUTE : 1000 * 60,
		HOUR : 1000 * 60 * 60,
		DAY : 1000 * 60 * 60 * 24,

		// unit
		years : "years",
		months : "months",
		days : "days",
		hours : "hours",
		minutes : "minutes",
		seconds : "seconds",
		milliseconds : "milliseconds",
		weeks : "weeks",

		/**
		 * @method diff
		 *
		 * caculate time difference from a to b
		 *
		 * @param type
		 * @param a
		 * @param b
		 * @returns {number}
		 */
		diff : function (type, a, b) {
			var milliseconds =  (+a) - (+b);

			if (type == 'seconds') {
				return Math.abs(Math.floor(milliseconds / self.MILLISECOND));
			} else if (type == 'minutes') {
				return Math.abs(Math.floor(milliseconds / self.MINUTE));
			} else if (type == 'hours') {
				return Math.abs(Math.floor(milliseconds / self.HOUR));
			} else if (type == 'days') {
				return Math.abs(Math.floor(milliseconds / self.DAY));
			}

			return milliseconds;
		},

		/**
		 * @method add
		 *
		 * add time
		 *
		 * 		var date = new Date();
		 * 		time.add(date, time.hours, 1); 		// add an hour on now
		 * 		time.add(date, time.hours, 1, time.minutes, 2); 		// add an hour and 2 minutes on now
		 * 
 		 * @param {Object} date
		 */
		add : function(date) {

			if (arguments.length <= 2) {
				return date;
			}

			if (arguments.length > 2) {
				var d = new Date(+date);

				for (var i = 1; i < arguments.length; i += 2) {

					var split = typeof arguments[i] == 'string' ? this[arguments[i]] : arguments[i];
					var time = arguments[i + 1];

					if (this.years == split) {
						d.setFullYear(d.getFullYear() + time);
					} else if (this.months == split) {
						d.setMonth(d.getMonth() + time);
					} else if (this.days == split) {
						d.setDate(d.getDate() + time);
					} else if (this.hours == split) {
						d.setHours(d.getHours() + time);
					} else if (this.minutes == split) {
						d.setMinutes(d.getMinutes() + time);
					} else if (this.seconds == split) {
						d.setSeconds(d.getSeconds() + time);
					} else if (this.milliseconds == split) {
						d.setMilliseconds(d.getMilliseconds() + time);
					} else if (this.weeks == split) {
						d.setDate(d.getDate() + time * 7);
					}
				}

				return d;
			}
		},
		
		/**
		 * @method format
		 *
		 * {util.dateFormat} 's alias
		 * 
		 * @param {Object} date
		 * @param {Object} format
		 * @param {Object} utc
		 */
		format: function(date, format, utc) {
			return _.dateFormat(date, format, utc);
        }		
	}

	return self;
}, null, true);
