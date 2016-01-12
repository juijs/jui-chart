jui.define("chart.brush.stackcolumn", [], function() {

	/**
	 * @class chart.brush.stackcolumn
	 * @extends chart.brush.stackbar
	 */
	var ColumnStackBrush = function(chart, axis, brush) {
		var g, zeroY, bar_width;

		this.getTargetSize = function() {
			var width = this.axis.x.rangeBand(),
				r_width = 0;

			if(this.brush.size > 0) {
				r_width = this.brush.size;
			} else {
				r_width = width - this.brush.outerPadding * 2;
			}

			return (r_width < 0) ? 0 : r_width;
		}

		this.drawBefore = function() {
			g = chart.svg.group();
			zeroY = axis.y(0);
			bar_width = this.getTargetSize();
		}

		this.draw = function() {
			this.eachData(function(i, data) {
				var group = chart.svg.group();
				
				var startX = this.offset("x", i) - bar_width / 2,
                    startY = axis.y(0),
                    value = 0;

				for(var j = 0; j < brush.target.length; j++) {
					var yValue = data[brush.target[j]] + value,
                        endY = axis.y(yValue),
						r = this.getBarElement(i, j);

					r.attr({
						x : startX,
						y : (startY > endY) ? endY : startY,
						width : bar_width,
						height : Math.abs(startY - endY)
					});

					group.append(r);
					
					startY = endY;
					value = yValue;
				}

				this.setActiveEventOption(group); // 액티브 엘리먼트 이벤트 설정
				this.addBarElement(group);
				g.append(group);
			});

			// 액티브 엘리먼트 설정
			this.setActiveEffectOption();

            return g;
		}
	}

	return ColumnStackBrush;
}, "chart.brush.stackbar");
