jui.define("chart.brush.hudcolumn", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.hudcolumn
     * @extends chart.brush.core
     */
	var HUDColumnBrush = function() {
		var g;
		var domains, zeroY, width, col_width, half_width;
		var x1, x2, y1, y2;

		this.drawBefore = function() {
			var op = this.brush.outerPadding,
				ip = this.brush.innerPadding,
				len = 2;

			g = this.chart.svg.group();
			zeroY = this.axis.y(0);
			width = this.axis.x.rangeBand();
			domains = _.clone(this.axis.x.domain());

			half_width = (width - op * 2);
			col_width = (width - op * 2 - (len - 1) * ip) / len;
			col_width = (col_width < 0) ? 0 : col_width;

			x1 = this.axis.area("x");
			x2 = this.axis.area("x2");
			y1 = this.axis.area("y");
			y2 = this.axis.area("y2");
		}

		this.draw = function() {
			var data = this.axis.data;

			for(var i = 0; i < data.length; i++) {
				var left = this.getValue(data[i], "left", 0),
					right = this.getValue(data[i], "right", 0),
					moveX = this.axis.x(i) - (half_width / 2);

				for(var j = 0; j < 2; j++) {
					var moveY = this.axis.y((j == 0) ? left : right);

					var rect = this.createColumn(j, {
						fill: (j == 0) ? "#3C3C3C" : "#838383",
						stroke: (j == 0) ? "#3C3C3C" : "#838383",
						"stroke-width": 2
					}, moveX, moveY);

					g.append(rect);
					moveX += col_width + this.brush.innerPadding;
				}
			}

			this.drawGrid();

            return g;
		}

		this.drawGrid = function() {
			var r = 7;

			g.append(this.svg.line({
				stroke: "#868686",
				"stroke-width": 2,
				x1: x1,
				x2: x2,
				y1: y2,
				y2: y2
			}));

			for(var i = 0; i < domains.length; i++) {
				var domain = domains[i],
					move = this.axis.x(i),
					moveX = move - (half_width / 2);

				var circle = this.svg.circle({
					r: r,
					fill: "#222",
					stroke: "#868686",
					"stroke-width": 2,
					cx: move,
					cy: y2
				});

				var text = this.chart.text({
					x: move,
					y: y2,
					dy: this.chart.theme("gridXFontSize") * 2,
					fill: this.chart.theme("gridXFontColor"),
					"text-anchor": "middle",
					"font-size": this.chart.theme("gridXFontSize"),
					"font-weight": this.chart.theme("gridXFontWeight")
				}, domain);

				for(var j = 0; j < 2; j++) {
					var rect = this.createColumn(j, {
						fill: "transparent",
						stroke: "#868686",
						"stroke-width": 2
					}, moveX, y1);

					g.append(rect);
					moveX += col_width + this.brush.innerPadding;
				}

				g.append(circle);
				g.append(text);
			}
		}

		this.createColumn = function(type, attr, moveX, moveY) {
			var tick = 15, padding = 20;
			var rect = this.svg.polygon(attr);

			rect.point(moveX, moveY);
			rect.point(moveX + col_width, moveY);

			if(type == 0) {
				rect.point(moveX + col_width, y2 - padding);
				rect.point(moveX, y2 - tick - padding);
			} else {
				rect.point(moveX + col_width, y2 - tick - padding);
				rect.point(moveX, y2 - padding);
			}

			return rect;
		}
	}

	HUDColumnBrush.setup = function() {
		return {
			/** @cfg {Number} [outerPadding=2] Determines the outer margin of a hud column.  */
			outerPadding: 5,
			/** @cfg {Number} [innerPadding=1] Determines the inner margin of a hud column. */
			innerPadding: 5,

			clip: false
		};
	}

	return HUDColumnBrush;
}, "chart.brush.core");
