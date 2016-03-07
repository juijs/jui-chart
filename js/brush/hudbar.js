jui.define("chart.brush.hudbar", [], function() {

    /**
     * @class chart.brush.hudbar
     * @extends chart.brush.core
     */
	var HUDBarBrush = function() {
		var g;
		var domains, zeroX, height, col_height, half_height;
		var x1, x2, y1, y2;

		this.drawBefore = function() {
			var op = this.brush.outerPadding,
				ip = this.brush.innerPadding,
				len = 2;

			g = this.chart.svg.group();
			zeroX = this.axis.x(0) + ip;
			height = this.axis.y.rangeBand();
			domains = this.axis.y.domain();

			half_height = (height - op * 2);
			col_height = (height - op * 2 - (len - 1) * ip) / len;
			col_height = (col_height < 0) ? 0 : col_height;

			x1 = this.axis.area("x");
			x2 = this.axis.area("x2");
			y1 = this.axis.area("y");
			y2 = this.axis.area("y2");
		}

		this.draw = function() {
			var data = this.axis.data,
				padding = this.brush.innerPadding,
				linePadding = this.chart.theme("hudBarTextLinePadding");

			for(var i = 0; i < data.length; i++) {
				var top = this.getValue(data[i], "top", 0),
					bottom = this.getValue(data[i], "bottom", 0),
					moveY = this.axis.y(i) - (half_height / 2) + padding/2;

				for(var j = 0; j < 2; j++) {
					var moveX = this.axis.x((j == 0) ? top : bottom),
						width = moveX - zeroX;

					var rect = this.svg.rect({
						fill: this.chart.theme((j == 0) ? "hudBarTopBackgroundColor" : "hudBarBottomBackgroundColor"),
						"fill-opacity": this.chart.theme("hudBarBackgroundOpacity"),
						width: width,
						height: col_height - padding/2,
						x: zeroX,
						y: moveY
					});

					var path = this.svg.path({
						stroke: this.chart.theme("hudBarTextLineColor"),
						"stroke-width": this.chart.theme("hudBarTextLineWidth"),
						fill: "transparent"
					});

					var text = this.chart.text({
						x: padding + width + linePadding,
						y: moveY,
						dx: 3,
						dy: col_height,
						fill: this.chart.theme("hudBarTextLineFontColor"),
						"font-size": this.chart.theme("hudBarTextLineFontSize")
					}, (j == 0) ? this.format(top, "top") : this.format(bottom, "bottom"));

					path.MoveTo(padding + width, moveY + 1);
					path.LineTo(padding + width + linePadding, moveY + 1);
					path.LineTo(padding + width + linePadding, moveY + col_height + 1);

					g.append(rect);
					g.append(path);
					g.append(text);

					this.addEvent(rect, i, null);
					moveY += col_height + padding/2;
				}
			}

			this.drawGrid();

            return g;
		}

		this.drawGrid = function() {
			var barWidth = height / 3.5;

			for(var i = 0; i < domains.length; i++) {
				var domain = domains[i],
					move = this.axis.y(i),
					moveStart = move - (half_height / 2),
					moveEnd = move + (half_height / 2);

				var p = this.svg.polygon({
					"stroke-width": 0,
					fill: this.chart.theme("hudBarGridBackgroundColor"),
					"fill-opacity": this.chart.theme("hudBarGridBackgroundOpacity")
				});

				var l = this.svg.line({
					stroke: this.chart.theme("hudBarGridLineColor"),
					"stroke-width": this.chart.theme("hudBarGridLineWidth"),
					"stroke-opacity": this.chart.theme("hudBarGridLineOpacity"),
					x1: x1 - barWidth * 2,
					y1: move,
					x2: x1 - barWidth * 3,
					y2: move
				});

				var t = this.chart.text({
					x: x1 - barWidth * 3,
					y: move,
					dx: -7,
					dy: this.chart.theme("hudBarGridFontSize") / 3,
					fill: this.chart.theme("hudBarGridFontColor"),
					"text-anchor": "end",
					"font-size": this.chart.theme("hudBarGridFontSize"),
					"font-weight": "bold"
				}, domain);

				p.point(x1, moveStart);
				p.point(x1, moveEnd);
				p.point(x1 - barWidth, moveEnd);
				p.point(x1 - barWidth * 2, move);
				p.point(x1 - barWidth, moveStart);
				p.point(x1, moveStart);

				g.append(p);
				g.append(l);
				g.append(t);
			}
		}
	}

	HUDBarBrush.setup = function() {
		return {
			/** @cfg {Number} [outerPadding=2] Determines the outer margin of a hud column.  */
			outerPadding: 7,
			/** @cfg {Number} [innerPadding=1] Determines the inner margin of a hud column. */
			innerPadding: 7,

			clip: false,
			format: null
		};
	}

	return HUDBarBrush;
}, "chart.brush.core");
