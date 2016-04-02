jui.define("chart.brush.path", [], function() {

    /**
     * @class chart.brush.path 
     * @extends chart.brush.core
     */
	var PathBrush = function() {

		this.draw = function() {
			var g = this.svg.group();
			
			for(var ti = 0, len = this.brush.target.length; ti < len; ti++) {
				var color = this.color(ti);

				var path = this.svg.path({
					fill : color,
					"fill-opacity" : this.chart.theme("pathBackgroundOpacity"),
					stroke : color,
					"stroke-width" : this.chart.theme("pathBorderWidth")
				});
	
				g.append(path);
	
				this.eachData(function(data, i) {
					var obj = this.axis.c(i, data[this.brush.target[ti]]),
						x = obj.x - this.chart.area("x") + this.axis.padding("left"),
						y = obj.y - this.chart.area("y") + this.axis.padding("top");

					if (i == 0) {
						path.MoveTo(x, y);
					} else {
						path.LineTo(x, y);
					}
				});
	
				path.ClosePath();
			}

			return g;
		}
	}

	return PathBrush;
}, "chart.brush.core");
