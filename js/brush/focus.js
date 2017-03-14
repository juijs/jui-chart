jui.define("chart.brush.focus", [], function() {
	/**
	 * @class chart.brush.focus
	 * @extends chart.brush.core
	 */
	var FocusBrush = function() {
		var self = this;
		var g, grid;

		this.drawFocus = function(start, end) {
			var borderColor = this.chart.theme("focusBorderColor"),
				borderSize = this.chart.theme("focusBorderWidth"),
				bgColor = this.chart.theme("focusBackgroundColor"),
				bgOpacity = this.chart.theme("focusBackgroundOpacity");

			var width = this.axis.area("width"),
				height = this.axis.area("height"),
				x = this.axis.area("x"),
				y = this.axis.area("y");

			g = this.svg.group({}, function() {
				if(self.brush.hide || self.axis.data.length == 0) return;

				var a = self.svg.line({
					stroke: borderColor,
					"stroke-width": borderSize,
					x1: 0,
					y1: 0,
					x2: (grid == "x") ? 0 : width,
					y2: (grid == "x") ? height : 0
				});

				var b = self.svg.rect({
					width: (grid == "x") ? Math.abs(end - start) : width,
					height: (grid == "x") ? height : Math.abs(end - start),
					fill: bgColor,
					opacity: bgOpacity
				});

				var c = self.svg.line({
					stroke: borderColor,
					"stroke-width": borderSize,
					x1: 0,
					y1: 0,
					x2: (grid == "x") ? 0 : width,
					y2: (grid == "x") ? height : 0
				});

				if(grid == "x") {
					a.translate(start, y);
					b.translate(start, y);
					c.translate(end, y);
				} else {
					a.translate(x, start);
					b.translate(x, start);
					c.translate(x, end);
				}
			});

			return g;
		}

		this.drawBefore = function() {
			grid = (this.axis.y.type == "range") ? "x" : "y";
		}

		this.draw = function() {
			var start = 0, end = 0;

			if(this.brush.start == -1 || this.brush.end == -1) {
				return this.svg.g();
			}

			if(this.axis[grid].type == "block") {
				var size = this.axis[grid].rangeBand();

				start = this.axis[grid](this.brush.start) - size / 2;
				end = this.axis[grid](this.brush.end) + size / 2;
			} else  {
				start = this.axis[grid](this.brush.start);
				end = this.axis[grid](this.brush.end);
			}

			return this.drawFocus(start, end);
		}
	}

	FocusBrush.setup = function() {
		return {
			/** @cfg {Integer} [start=-1] Sets a focus start index.*/
			start: -1,

			/** @cfg {Integer} [end=-1] Sets a focus end index. */
			end: -1
		};
	}

	return FocusBrush;
}, "chart.brush.core");