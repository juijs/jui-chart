jui.define("chart.brush.stackcolumn", [ "util.base" ], function(_) {

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
				minValue = this.axis.y.max(),
				isReverse = this.axis.get("y").reverse;

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
						opts = {
                            x : startX,
                            y : (startY > endY) ? endY : startY,
                            width : bar_width,
                            height : Math.abs(startY - endY)
                        },
						r = this.getBarElement(i, j).attr(opts);

					if(!this.edgeData[i]) {
                        this.edgeData[i] = {};
					}

					this.edgeData[i][j] = _.extend({
						color: this.color(j),
						dx: 0,
						dy: (isReverse) ? opts.height : 0,
                        ex: 0,
						ey: (isReverse) ? 0 : opts.height
					}, opts);
					
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

				this.drawStackTooltip(group, i, sumValue, offsetX, startY, (isReverse) ? "bottom" : "top");
				this.setActiveEventOption(group); // 액티브 엘리먼트 이벤트 설정
				this.addBarElement(group);

                g.append(group);
			});

            // 스탭 연결선 그리기
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

	return ColumnStackBrush;
}, "chart.brush.stackbar");
