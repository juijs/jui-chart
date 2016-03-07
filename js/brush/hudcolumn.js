jui.define("chart.brush.hudcolumn", [], function() {

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
			domains = this.axis.x.domain();

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
						fill: (j == 0) ? this.chart.theme("hudColumnLeftBackgroundColor") :
							this.chart.theme("hudColumnRightBackgroundColor")
					}, moveX, moveY);

					g.append(rect);
					moveX += col_width + this.brush.innerPadding;
				}
			}

			this.drawGrid();

            return g;
		}

		this.drawGrid = function() {
			var r = this.chart.theme("hudColumnGridPointRadius"),
				stroke = this.chart.theme("hudColumnGridPointBorderColor"),
				width = this.chart.theme("hudColumnGridPointBorderWidth");

			g.append(this.svg.line({
				stroke: stroke,
				"stroke-width": width,
				x1: x1,
				x2: x2,
				y1: y2,
				y2: y2
			}));

			for(var i = 0; i < domains.length; i++) {
				var domain = domains[i],
					move = this.axis.x(i),
					moveX = move - (half_width / 2);

				var point1 = this.svg.circle({
					r: r,
					fill: this.chart.theme("axisBackgroundColor"),
					stroke: stroke,
					"stroke-width": width,
					cx: move,
					cy: y2
				});

				var point2 = this.svg.circle({
					r: r * 0.65,
					fill: stroke,
					"stroke-width": 0,
					cx: move,
					cy: y2,
					"fill-opacity": 0
				});

				var text = this.chart.text({
					x: move,
					y: y2,
					dy: this.chart.theme("hudColumnGridFontSize") * 2,
					fill: this.chart.theme("hudColumnGridFontColor"),
					"text-anchor": "middle",
					"font-size": this.chart.theme("hudColumnGridFontSize"),
					"font-weight": this.chart.theme("hudColumnGridFontWeight")
				}, domain);

				var group = this.svg.group();

				for(var j = 0; j < 2; j++) {
					var rect = this.createColumn(j, {
						fill: "transparent",
						stroke: stroke,
						"stroke-width": 2
					}, moveX, y1);

					this.addEvent(rect, i, null);
					group.append(rect);

					moveX += col_width + this.brush.innerPadding;
				}

				(function(g, p) {
					g.hover(function() {
						p.attr({ "fill-opacity": 1 });

					}, function() {
						p.attr({ "fill-opacity": 0 });
					});
				})(group, point2);

				g.append(group);
				g.append(point1);
				g.append(point2);
				g.append(text);
			}
		}

		this.createColumn = function(type, attr, moveX, moveY) {
			var padding = 20, dist = 15 + padding;
			var rect = this.svg.polygon(attr);

			rect.point(moveX, moveY);
			rect.point(moveX + col_width, moveY);

			if(type == 0) {
				rect.point(moveX + col_width, y2 - padding);
				rect.point(moveX, y2 - dist);
			} else {
				rect.point(moveX + col_width, y2 - dist);
				rect.point(moveX, y2 - padding);
			}

			if(moveY >= zeroY - dist) {
				rect.attr({ visibility: "hidden" });
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
