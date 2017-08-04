jui.define("chart.brush.heatmap", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.heatmap
     * @extends chart.brush.core
     */
	var HeatmapBrush = function() {
		var self = this;

		this.draw = function() {
			var bw = this.chart.theme("heatmapBorderWidth"),
				fs = this.chart.theme("heatmapFontSize"),
				g = this.svg.group(),
				w = this.axis.x.rangeBand() - bw,
				h = this.axis.y.rangeBand() - bw;

			for(var i = 0; i < this.axis.data.length; i++) {
				var group = this.svg.group(),
					color = this.color(i, null),
					data = this.axis.data[i],
					text = this.getValue(data, "text"),
					cx = this.axis.x(i),
					cy = this.axis.y(i);

				if(color == "none") {
					color = this.chart.theme("heatmapBackgroundColor");
				}

				var r = this.svg.rect({
					x: cx - w/2,
					y: cy - h/2,
					width: w,
					height: h,
					fill: color,
					"fill-opacity": this.chart.theme("heatmapBackgroundOpacity"),
					stroke: this.chart.theme("heatmapBorderColor"),
					"stroke-opacity": this.chart.theme("heatmapBorderOpacity"),
					"stroke-width": bw
				});

				var t = this.chart.text({
					"text-anchor": "middle",
					"fill": this.chart.theme("heatmapFontColor"),
					"font-size": fs,
					width: w,
					height: h,
					x: cx,
					y: cy + fs/2
				}).text(_.typeCheck("function", this.brush.format) ? this.format(data) : text);

				this.addEvent(group, i, null);

				group.append(r);
				group.append(t);
				g.append(group);

				// Hover effects
				(function(rr) {
					group.hover(function() {
						rr.attr({
							"fill-opacity": self.chart.theme("heatmapHoverBackgroundOpacity")
						});
					}, function() {
						rr.attr({
							"fill-opacity": self.chart.theme("heatmapBackgroundOpacity")
						});
					})
				})(r);
			}

            return g;
		}
	}

	HeatmapBrush.setup = function() {
		return {
			format: null
		};
	}

	return HeatmapBrush;
}, "chart.brush.core");
