jui.redefine("util.color", [ "util.base", "util.math" ], function(_, math) {

    function generateHash(name) {
        // Return a vector (0.0->1.0) that is a hash of the input string.
        // The hash is computed to favor early characters over later ones, so
        // that strings with similar starts have similar vectors. Only the first
        // 6 characters are considered.
        var hash = 0,
			weight = 1,
			max_hash = 0,
			mod = 10,
			max_char = 6;

        if (name) {
            for (var i = 0; i < name.length; i++) {
                if (i > max_char) { break; }
                hash += weight * (name.charCodeAt(i) % mod);
                max_hash += weight * (mod - 1);
                weight *= 0.70;
            }
            if (max_hash > 0) { hash = hash / max_hash; }
        }
        return hash;
    }

	/**
	 *  @class util.color
	 *
	 * color utility
	 *
	 * @singleton
	 */
	var self = {

		regex  : /(linear|radial)\((.*)\)(.*)/i,

		/**
		 * @method format
		 *
		 * convert color to format string
		 *
		 *     // hex
		 *     color.format({ r : 255, g : 255, b : 255 }, 'hex')  // #FFFFFF
		 *
		 *     // rgb
		 *     color.format({ r : 255, g : 255, b : 255 }, 'rgb') // rgba(255, 255, 255, 0.5);
		 *
		 *     // rgba
		 *     color.format({ r : 255, g : 255, b : 255, a : 0.5 }, 'rgb') // rgba(255, 255, 255, 0.5);
		 *
		 * @param {Object} obj  obj has r, g, b and a attributes
		 * @param {"hex"/"rgb"} type  format string type
		 * @returns {*}
		 */
		format : function(obj, type) {
			if (type == 'hex') {
				var r = obj.r.toString(16);
				if (obj.r < 16) r = "0" + r;

				var g = obj.g.toString(16);
				if (obj.g < 16) g = "0" + g;

				var b = obj.b.toString(16);
				if (obj.b < 16) b = "0" + b;

				return "#" + [r,g,b].join("").toUpperCase();
			} else if (type == 'rgb') {
				if (typeof obj.a == 'undefined') {
					return "rgb(" + [obj.r, obj.g, obj.b].join(",") + ")";
				} else {
					return "rgba(" + [obj.r, obj.g, obj.b, obj.a].join(",") + ")";
				}
			}

			return obj;
		},

		/**
		 * @method scale
		 *
		 * get color scale
		 *
		 * 		var c = color.scale().domain('#FF0000', '#00FF00');
		 *
		 * 		// get middle color
		 * 		c(0.5)   ==  #808000
		 *
		 * 		// get middle color list
		 * 		c.ticks(20);  // return array ,    [startColor, ......, endColor ]
		 *
		 * @returns {func} scale function
		 */
		scale : function() {
			var startColor, endColor;


			function func(t, type) {

				var obj = {
					r : parseInt(startColor.r + (endColor.r - startColor.r) * t, 10) ,
					g : parseInt(startColor.g + (endColor.g - startColor.g) * t, 10),
					b : parseInt(startColor.b + (endColor.b - startColor.b) * t, 10)
				};

				return self.format(obj, type);
			}

			func.domain = function(start, end) {
				startColor = self.rgb(start);
				endColor = self.rgb(end);

				return func;
			}

			func.ticks = function (n) {
				var unit = (1/n);

				var start = 0;
				var colors = [];
				while(start <= 1) {
					var c = func(start, 'hex');
					colors.push(c);
					start = math.plus(start, unit);
				}

				return colors;

			}

			return func;
		},

		/**
		 * @method map
		 *
		 * create color map
		 *
		 * 		var colorList = color.map(['#352a87', '#0f5cdd', '#00b5a6', '#ffc337', '#fdff00'], count)
		 *
		 * @param {Array} color_list
		 * @param {Number} count  a divide number
		 * @returns {Array} converted color list
		 */
		map : function (color_list, count) {

			var colors = [];
			count = count || 5;
			var scale = self.scale();
			for(var i = 0, len = color_list.length-1; i < len; i++) {
				if (i == 0) {
					colors = scale.domain(color_list[i], color_list[i + 1]).ticks(count);
				} else {
					var colors2 = scale.domain(color_list[i], color_list[i + 1]).ticks(count);
					colors2.shift();
					colors = colors.concat(colors2);
				}
			}

			return colors;
		},

		/**
		 * @method rgb
		 *
		 * parse string to rgb color
		 *
		 * 		color.rgb("#FF0000") === { r : 255, g : 0, b : 0 }
		 *
		 * 		color.rgb("rgb(255, 0, 0)") == { r : 255, g : 0, b : }
		 *
		 * @param {String} str color string
		 * @returns {Object}  rgb object
		 */
		rgb : function (str) {

			if (typeof str == 'string') {
				if (str.indexOf("rgb(") > -1) {
					var arr = str.replace("rgb(", "").replace(")","").split(",");

					for(var i = 0, len = arr.length; i < len; i++) {
						arr[i] = parseInt(_.trim(arr[i]), 10);
					}

					return { r : arr[0], g : arr[1], b : arr[2], a : 1	};
				} else if (str.indexOf("rgba(") > -1) {
					var arr = str.replace("rgba(", "").replace(")","").split(",");

					for(var i = 0, len = arr.length; i < len; i++) {

						if (len - 1 == i) {
							arr[i] = parseFloat(_.trim(arr[i]));
						} else {
							arr[i] = parseInt(_.trim(arr[i]), 10);
						}
					}

					return { r : arr[0], g : arr[1], b : arr[2], a : arr[3]};
				} else if (str.indexOf("#") == 0) {

					str = str.replace("#", "");

					var arr = [];
					if (str.length == 3) {
						for(var i = 0, len = str.length; i < len; i++) {
							var char = str.substr(i, 1);
							arr.push(parseInt(char+char, 16));
						}
					} else {
						for(var i = 0, len = str.length; i < len; i+=2) {
							arr.push(parseInt(str.substr(i, 2), 16));
						}
					}

					return { r : arr[0], g : arr[1], b : arr[2], a : 1	};
				}
			}

			return str;

		},

		/**
		 * @method HSVtoRGB
		 *
		 * convert hsv to rgb
		 *
		 * 		color.HSVtoRGB(0,0,1) === #FFFFF === { r : 255, g : 0, b : 0 }
		 *
		 * @param {Number} H  hue color number  (min : 0, max : 360)
		 * @param {Number} S  Saturation number  (min : 0, max : 1)
		 * @param {Number} V  Value number 		(min : 0, max : 1 )
		 * @returns {Object}
		 */
		HSVtoRGB : function (H, S, V) {

			if (H == 360) {
				H = 0;
			}

			var C = S * V;
			var X = C * (1 -  Math.abs((H/60) % 2 -1)  );
			var m = V - C;

			var temp = [];

			if (0 <= H && H < 60) { temp = [C, X, 0]; }
			else if (60 <= H && H < 120) { temp = [X, C, 0]; }
			else if (120 <= H && H < 180) { temp = [0, C, X]; }
			else if (180 <= H && H < 240) { temp = [0, X, C]; }
			else if (240 <= H && H < 300) { temp = [X, 0, C]; }
			else if (300 <= H && H < 360) { temp = [C, 0, X]; }

			return {
				r : Math.ceil((temp[0] + m) * 255),
				g : Math.ceil((temp[1] + m) * 255),
				b : Math.ceil((temp[2] + m) * 255)
			};
		},

		/**
		 * @method RGBtoHSV
		 *
		 * convert rgb to hsv
		 *
		 * 		color.RGBtoHSV(0, 0, 255) === { h : 240, s : 1, v : 1 } === '#FFFF00'
		 *
		 * @param {Number} R  red color value
		 * @param {Number} G  green color value
		 * @param {Number} B  blue color value
		 * @return {Object}  hsv color code
		 */
		RGBtoHSV : function (R, G, B) {

			var R1 = R / 255;
			var G1 = G / 255;
			var B1 = B / 255;

			var MaxC = Math.max(R1, G1, B1);
			var MinC = Math.min(R1, G1, B1);

			var DeltaC = MaxC - MinC;

			var H = 0;

			if (DeltaC == 0) { H = 0; }
			else if (MaxC == R1) {
				H = 60 * (( (G1 - B1) / DeltaC) % 6);
			} else if (MaxC == G1) {
				H  = 60 * (( (B1 - R1) / DeltaC) + 2);
			} else if (MaxC == B1) {
				H  = 60 * (( (R1 - G1) / DeltaC) + 4);
			}

			if (H < 0) {
				H = 360 + H;
			}

			var S = 0;

			if (MaxC == 0) S = 0;
			else S = DeltaC / MaxC;

			var V = MaxC;

			return { h : H, s : S, v :  V };
		},

		trim : function (str) {
			return (str || "").replace(/^\s+|\s+$/g, '');
		},

		/**
		 * @method lighten
		 *
		 * rgb 컬러 밝은 농도로 변환
		 *
		 * @param {String} color   RGB color code
		 * @param {Number} rate 밝은 농도
		 * @return {String}
		 */
		lighten : function(color, rate) {
			color = color.replace(/[^0-9a-f]/gi, '');
			rate = rate || 0;

			var rgb = [], c, i;
			for (i = 0; i < 6; i += 2) {
				c = parseInt(color.substr(i,2), 16);
				c = Math.round(Math.min(Math.max(0, c + (c * rate)), 255)).toString(16);
				rgb.push(("00"+c).substr(c.length));
			}

			return "#" + rgb.join("");
		},

		/**
		 * @method darken
		 *
		 * rgb 컬러 어두운 농도로 변환
		 *
		 * @param {String} color   RGB color code
		 * @param {Number} rate 어두운 농도
		 * @return {String}
		 */
		darken : function(color, rate) {
			return this.lighten(color, -rate)
		},

		/**
		 * @method parse
		 *
		 * gradient color string parsing
		 *
		 * @param {String} color
		 * @returns {*}
		 */
		parse : function(color) {
			return this.parseGradient(color);
		},

		/**
		 * @method parseGrident
		 *
		 * gradient parser
		 *
		 *      linear(left) #fff,#000
		 *      linear(right) #fff,50 yellow,black
		 *      radial(50%,50%,50%,50,50)
		 *
		 * @param {String} color
		 */
		parseGradient : function(color) {
			var matches = color.match(this.regex);

			if (!matches) return color;

			var type = this.trim(matches[1]);
			var attr = this.parseAttr(type, this.trim(matches[2]));
			var stops = this.parseStop(this.trim(matches[3]));

			var obj = { type : type + "Gradient", attr : attr, children : stops };

			return obj;

		},

		parseStop : function(stop) {
			var stop_list = stop.split(",");

			var stops = [];

			for(var i = 0, len = stop_list.length; i < len; i++) {
				var stop = stop_list[i];

				var arr = stop.split(" ");

				if (arr.length == 0) continue;

				if (arr.length == 1) {
					stops.push({ type : "stop", attr : {"stop-color" : arr[0] } })
				} else if (arr.length == 2) {
					stops.push({ type : "stop", attr : {"offset" : arr[0], "stop-color" : arr[1] } })
				} else if (arr.length == 3) {
					stops.push({ type : "stop", attr : {"offset" : arr[0], "stop-color" : arr[1], "stop-opacity" : arr[2] } })
				}
			}

			var start = -1;
			var end = -1;
			for(var i = 0, len = stops.length; i < len; i++) {
				var stop = stops[i];

				if (i == 0) {
					if (!stop.offset) stop.offset = 0;
				} else if (i == len - 1) {
					if (!stop.offset) stop.offset = 1;
				}

				if (start == -1 && typeof stop.offset == 'undefined') {
					start = i;
				} else if (end == -1 && typeof stop.offset == 'undefined') {
					end = i;

					var count = end - start;

					var endOffset = stops[end].offset.indexOf("%") > -1 ? parseFloat(stops[end].offset)/100 : stops[end].offset;
					var startOffset = stops[start].offset.indexOf("%") > -1 ? parseFloat(stops[start].offset)/100 : stops[start].offset;

					var dist = endOffset - startOffset
					var value = dist/ count;

					var offset = startOffset + value;
					for(var index = start + 1; index < end; index++) {
						stops[index].offset = offset;

						offset += value;
					}

					start = end;
					end = -1;
				}
			}

			return stops;
		},

		parseAttr : function(type, str) {


			if (type == 'linear') {
				switch(str) {
					case "":
					case "left": return { x1 : 0, y1 : 0, x2 : 1, y2 : 0, direction : str || "left" };
					case "right": return { x1 : 1, y1 : 0, x2 : 0, y2 : 0, direction : str };
					case "top": return { x1 : 0, y1 : 0, x2 : 0, y2 : 1, direction : str };
					case "bottom": return { x1 : 0, y1 : 1, x2 : 0, y2 : 0, direction : str };
					case "top left": return { x1 : 0, y1 : 0, x2 : 1, y2 : 1, direction : str };
					case "top right": return { x1 : 1, y1 : 0, x2 : 0, y2 : 1, direction : str };
					case "bottom left": return { x1 : 0, y1 : 1, x2 : 1, y2 : 0, direction : str };
					case "bottom right": return { x1 : 1, y1 : 1, x2 : 0, y2 : 0, direction : str };
					default :
						var arr = str.split(",");
						for(var i = 0, len = arr.length; i < len; i++) {
							if (arr[i].indexOf("%") == -1)
								arr[i] = parseFloat(arr[i]);
						}

						return { x1 : arr[0], y1 : arr[1],x2 : arr[2], y2 : arr[3] };
				}
			} else {
				var arr = str.split(",");
				for(var i = 0, len = arr.length; i < len; i++) {

					if (arr[i].indexOf("%") == -1)
						arr[i] = parseFloat(arr[i]);
				}

				return { cx : arr[0], cy : arr[1],r : arr[2], fx : arr[3], fy : arr[4] };
			}

		},

		colorHash : function(name, callback) {
			// Return an rgb() color string that is a hash of the provided name,
            // and with a warm palette.
            var vector = 0;

            if (name) {
                name = name.replace(/.*`/, "");        // drop module name if present
                name = name.replace(/\(.*/, "");    // drop extra info
                vector = generateHash(name);
            }

            if(typeof(callback) == "function") {
            	return callback(vector);
			}

            return {
            	r: 200 + Math.round(55 * vector),
				g: 0 + Math.round(230 * (1 - vector)),
				b: 0 + Math.round(55 * (1 - vector))
			};
		}

	};

	self.map.parula = function (count) {  return self.map(['#352a87', '#0f5cdd', '#00b5a6', '#ffc337', '#fdff00'], count); }
	self.map.jet = function (count) {  return self.map(['#00008f', '#0020ff', '#00ffff', '#51ff77', '#fdff00', '#ff0000', '#800000'], count); }
	self.map.hsv = function (count) {  return self.map(['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'], count); }
	self.map.hot = function (count) {  return self.map(['#0b0000', '#ff0000', '#ffff00', '#ffffff'], count); }
	self.map.pink = function (count) {  return self.map(['#1e0000', '#bd7b7b', '#e7e5b2', '#ffffff'], count); }
	self.map.bone = function (count) {  return self.map(['#000000', '#4a4a68', '#a6c6c6', '#ffffff'], count); }
	self.map.copper = function (count) {  return self.map(['#000000', '#3d2618', '#9d623e', '#ffa167', '#ffc77f'], count); }

	return self;
}, null, true);