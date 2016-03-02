jui.define("chart.brush.hudcolumn", [], function() {

    /**
     * @class chart.brush.hudcolumn
     * @extends chart.brush.core
     */
	var HUDColumnBrush = function() {
		var g;
		var zeroY, width, col_width, half_width;

		this.drawBefore = function() {
			var op = this.brush.outerPadding,
				ip = this.brush.innerPadding,
				len = 2;

			g = this.chart.svg.group();
			zeroY = this.axis.y(0);
			width = this.axis.x.rangeBand();

			half_width = (width - op * 2);
			col_width = (width - op * 2 - (len - 1) * ip) / len;
			col_width = (col_width < 0) ? 0 : col_width;
		}

		this.draw = function() {
			var data = this.axis.data;

			for(var i = 0; i < data.length; i++) {
				var left = this.getValue(data[i], "left", 0),
					right = this.getValue(data[i], "right", 0);
			}

            return g;
		}
	}

	HUDColumnBrush.setup = function() {
		return {
			/** @cfg {Number} [outerPadding=2] Determines the outer margin of a hud column.  */
			outerPadding: 2,
			/** @cfg {Number} [innerPadding=1] Determines the inner margin of a hud column. */
			innerPadding: 1
		};
	}

	return HUDColumnBrush;
}, "chart.brush.core");
