jui.define("chart.brush.stackcolumn", [], function() {

	/**
	 * @class chart.brush.stackcolumn
	 * @extends chart.brush.stackbar
	 */
	var ColumnStackBrush = function(chart, axis, brush) {
		var g, zeroY, bar_width;

		this.getTargetSize = function() {
			var width = this.axis.x.rangeBand();

			if(this.brush.size > 0) {
				return this.brush.size;
			} else {
				var size = width - this.brush.outerPadding * 2;
				return (size < this.brush.minSize) ? this.brush.minSize : size;
			}
		}

        // TODO: 차후에는 스택바도 지원해야 함.
        this.drawStackEdge = function(g) {
			var borderWidth = this.chart.theme("barStackEdgeBorderWidth");

            for(var i = 1; i < this.edgeData.length; i++) {
                var pre = this.edgeData[i - 1],
                    now = this.edgeData[i];

            	for(var j = 0; j < this.brush.target.length; j++) {
                    g.append(this.svg.line({
                        x1: pre[j].x + pre[j].width,
                        x2: now[j].x,
                        y1: pre[j].y,
                        y2: now[j].y,
                        stroke: now[j].color,
                        "stroke-width": borderWidth
                    }));
                }
            }
        }

		this.drawBefore = function() {
			g = chart.svg.group();
			zeroY = axis.y(0);
			bar_width = this.getTargetSize();

			this.stackTooltips = [];
            this.tooltipIndexes = [];
            this.edgeData = [];
		}

		this.draw = function() {
			var maxIndex = null,
				maxValue = 0,
				minIndex = null,
				minValue = this.axis.y.max();

			this.eachData(function(data, i) {
				var group = chart.svg.group();
				
				var offsetX = this.offset("x", i),
					startX = offsetX - bar_width / 2,
                    startY = axis.y(0),
                    value = 0,
					sumValue = 0;

				for(var j = 0; j < brush.target.length; j++) {
					var yValue = data[brush.target[j]] + value,
                        endY = axis.y(yValue),
						tmpY = (startY > endY) ? endY : startY,
						r = this.getBarElement(i, j);

					// TODO: 차후에는 스택바도 지원해야 함.
					if(!this.edgeData[i]) {
                        this.edgeData[i] = {};
					}

					this.edgeData[i][j] = {
						x: startX,
						y: tmpY,
						width: bar_width,
						height: Math.abs(startY - endY),
						color: this.color(j)
					};

					r.attr({
						x : startX,
						y : tmpY,
						width : bar_width,
						height : Math.abs(startY - endY)
					});
					
					startY = endY;
					value = yValue;
					sumValue += data[brush.target[j]];

                    group.append(r);
				}

				// min & max 인덱스 가져오기
				if(sumValue > maxValue) {
					maxValue = sumValue;
					maxIndex = i;
				}
                if(sumValue < minValue) {
                    minValue = sumValue;
                    minIndex = i;
                }

				this.drawStackTooltip(group, i, sumValue, offsetX, startY, (this.axis.get("y").reverse) ? "bottom" : "top");
				this.setActiveEventOption(group); // 액티브 엘리먼트 이벤트 설정
				this.addBarElement(group);

                g.append(group);
			});

            if(this.brush.edge) {
                this.drawStackEdge(g);
            }

			// 최소/최대/전체 값 표시하기
			if(this.brush.display != null) {
				this.setActiveTooltips(minIndex, maxIndex);
			}

			// 액티브 엘리먼트 설정
			this.setActiveEffectOption();

            return g;
		}
	}

    ColumnStackBrush.setup = function() {
        return {
            edge: false
        };
    }

	return ColumnStackBrush;
}, "chart.brush.stackbar");
