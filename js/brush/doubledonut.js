jui.define("chart.brush.doubledonut", [ "util.base", "util.math", "util.color" ], function(_, math, ColorUtil) {

    /**
     * @class chart.brush.doubledonut 
     * @extends chart.brush.pie
     * 
     */
	var DoubleDonutBrush = function() {
        var self = this,
            cache_active = {};

		this.drawDonut = function(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, attr) {
			attr['stroke-width'] = outerRadius - innerRadius;

            if (endAngle >= 360) { // bugfix : if angle is 360 , donut cang't show
                endAngle = 359.9999;
            }

			var g = this.chart.svg.group(),
				path = this.chart.svg.path(attr),
				dist = Math.abs(outerRadius - innerRadius);

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
				startY = obj.y;

			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));

			// 중심점 이동
			g.translate(centerX, centerY);

			// outer arc 그림
			path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y);

            // 마우스 이벤트 빈공간 제외
            path.css({
                "pointer-events": "stroke"
            });

			g.append(path);
            g.order = 1;

			return g;
		}

        this.drawUnit = function (index, data, g) {

            this.drawShadowUnit(index, data, g);

            var props = this.getProperty(index),
                centerX = props.centerX,
                centerY = props.centerY,
                innerRadius = props.innerRadius,
                outerRadius = props.outerRadius;

            var target = this.brush.target,
                active = this.brush.active,
                all = 360,
                startAngle = 0,
                max = 0,
                totalValue = 0;

            for (var i = 0; i < target.length; i++) {
                max += data[target[i]];
            }

            startAngle = 0;

            for (var i = 0; i < target.length; i++) {
                if(data[target[i]] == 0) continue;


                var value = data[target[i]],
                    endAngle = all * (value / max),
                    centerAngle = startAngle + (endAngle / 2) - 90,
                    radius = (this.brush.showText == "inside") ? this.brush.size + innerRadius + outerRadius : outerRadius,
                    donut = this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                        stroke : this.color(i),
                        fill : 'transparent'
                    }),
                    text = this.drawText(centerX, centerY, centerAngle, radius, this.getFormatText(target[i], value));

                // 설정된 키 활성화
                if (active == target[i] || _.inArray(target[i], active) != -1) {
                    if(this.brush.showText == "inside") {
                        this.setActiveTextEvent(text.get(0), centerX, centerY, centerAngle, radius, true);
                    }

                    this.setActiveEvent(donut, centerX, centerY, centerAngle);
                    cache_active[centerAngle] = true;
                }

                // 활성화 이벤트 설정
                if (this.brush.activeEvent != null) {
                    (function (p, t, cx, cy, ca, r) {
                        p.on(self.brush.activeEvent, function (e) {
                            if (!cache_active[ca]) {
                                if(self.brush.showText == "inside") {
                                    self.setActiveTextEvent(t, cx, cy, ca, r, true);
                                }

                                self.setActiveEvent(p, cx, cy, ca);
                                cache_active[ca] = true;
                            } else {
                                if(self.brush.showText == "inside") {
                                    self.setActiveTextEvent(t, cx, cy, ca, r, false);
                                }

                                p.translate(cx, cy);
                                cache_active[ca] = false;
                            }
                        });

                        p.attr({ cursor: "pointer" });
                    })(donut, text.get(0), centerX, centerY, centerAngle, radius);
                }

                this.addEvent(donut, index, i);
                g.append(donut);
                g.append(text);

                startAngle += endAngle;
                totalValue += value;
            }

            // Show total value
            if(this.brush.showValue) {
                this.drawTotalValue(g, centerX, centerY, totalValue);
            }
        }

        this.drawShadowUnit = function (index, data, g) {
            var props = this.getProperty(index),
                centerX = props.centerX,
                centerY = props.centerY,
                innerRadius = props.innerRadius - this.brush.size,
                outerRadius = props.outerRadius - this.brush.size;

            var target = this.brush.target,
                active = this.brush.active,
                all = 360,
                startAngle = 0,
                max = 0,
                totalValue = 0;

            for (var i = 0; i < target.length; i++) {
                max += data[target[i]];
            }

            startAngle = 0;

            for (var i = 0; i < target.length; i++) {
                if(data[target[i]] == 0) continue;


                var value = data[target[i]],
                    endAngle = all * (value / max),
                    donut = this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                        stroke : ColorUtil.darken(this.color(i), 0.2),
                        fill : 'transparent'
                    });

                g.append(donut);

                startAngle += endAngle;
                totalValue += value;
            }
        }

        this.drawNoData = function(g) {
            var props = this.getProperty(0);

            g.append(this.drawDonut(props.centerX, props.centerY, props.innerRadius, props.outerRadius, 0, 360, {
                stroke : this.chart.theme("pieNoDataBackgroundColor"),
                fill : "transparent"
            }));

            // Show total value
            if(this.brush.showValue) {
                this.drawTotalValue(g, props.centerX, props.centerY, 0);
            }
        }

        this.drawTotalValue = function(g, centerX, centerY, value) {
            var size = this.chart.theme("pieTotalValueFontSize");

            var text = this.chart.text({
                "font-size": size,
                "font-weight": this.chart.theme("pieTotalValueFontWeight"),
                fill: this.chart.theme("pieTotalValueFontColor"),
                "text-anchor": "middle",
                dy: size / 3
            }, this.format(value));

            text.translate(centerX, centerY);
            g.append(text)
        }

        this.getProperty = function(index) {
            var obj = this.axis.c(index);

            var width = obj.width,
                height = obj.height,
                x = obj.x,
                y = obj.y,
                min = width;

            if (height < min) {
                min = height;
            }

            if (this.brush.size >= min/2) {
                this.brush.size = min/4;
            }

            var outerRadius = min / 2 - this.brush.size / 2;

            return {
                centerX : width / 2 + x,
                centerY : height / 2 + y,
                outerRadius : outerRadius,
                innerRadius : outerRadius - this.brush.size
            }
        }
	}

	DoubleDonutBrush.setup = function() {
		return {
            /** @cfg {Number} [size=50] donut stroke width  */
			size: 50,
            /** @cfg {Boolean} [showValue=false] donut stroke width  */
            showValue: false
		};
	}

	return DoubleDonutBrush;
}, "chart.brush.pie");
