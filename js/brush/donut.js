jui.define("chart.brush.donut", [ "util.base", "util.math", "util.color" ], function(_, math, ColorUtil) {

    /**
     * @class chart.brush.donut 
     * @extends chart.brush.pie
     * 
     */
	var DonutBrush = function() {
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

			g.append(path);
            g.order = 1;

			return g;
		}

		this.drawDonut3d = function(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, attr) {
			var g = this.chart.svg.group(),
				path = this.chart.svg.path(attr),
                dist = Math.abs(outerRadius - innerRadius);

            outerRadius += dist/2;
            innerRadius = outerRadius - dist;

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
				startY = obj.y;

			var innerObj = math.rotate(0, -innerRadius, math.radian(startAngle)),
				innerStartX = innerObj.x,
				innerStartY = innerObj.y;


			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));
			innerObj = math.rotate(innerStartX, innerStartY, math.radian(endAngle));

			// 중심점 이동
			g.translate(centerX, centerY);

			// outer arc 그림
			path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y);


            var y = obj.y + 10,
                x = obj.x + 5,
                innerY = innerObj.y + 10,
                innerX = innerObj.x + 5,
                targetX = startX + 5,
                targetY = startY + 10,
                innerTargetX = innerStartX + 5,
                innerTargetY = innerStartY + 10;

            path.LineTo(x, y);
            path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 0, targetX, targetY)
            path.ClosePath();
            g.append(path);

            // 안쪽 면 그리기
            var innerPath = this.chart.svg.path(attr);

            // 시작 하는 위치로 옮김
            innerPath.MoveTo(innerStartX, innerStartY);
            innerPath.Arc(innerRadius, innerRadius, 0, (endAngle > 180) ? 1 : 0, 1, innerObj.x, innerObj.y);
            innerPath.LineTo(innerX, innerY);
            innerPath.Arc(innerRadius, innerRadius, 0, (endAngle > 180) ? 1 : 0, 0, innerTargetX, innerTargetY);
            innerPath.ClosePath();

            g.append(innerPath);
            g.order = 1;

			return g;
		}

		this.drawDonut3dBlock = function(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, attr) {
			var g = this.chart.svg.group(),
				path = this.chart.svg.path(attr),
                dist = Math.abs(outerRadius - innerRadius);

            outerRadius += dist/2;
            innerRadius = outerRadius - dist;

			// 바깥 지름 부터 그림
			var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
				startX = obj.x,
				startY = obj.y;

			var innerObj = math.rotate(0, -innerRadius, math.radian(startAngle)),
				innerStartX = innerObj.x,
				innerStartY = innerObj.y;


			// 시작 하는 위치로 옮김
			path.MoveTo(startX, startY);

			// outer arc 에 대한 지점 설정
			obj = math.rotate(startX, startY, math.radian(endAngle));
			innerObj = math.rotate(innerStartX, innerStartY, math.radian(endAngle));

			// 중심점 이동
			g.translate(centerX, centerY);

            var y = obj.y + 10,
                x = obj.x + 5,
                innerY = innerObj.y + 10,
                innerX = innerObj.x + 5;

            // 왼쪽면 그리기
            var rect = this.chart.svg.path(attr);
            rect.MoveTo(obj.x, obj.y).LineTo(x, y).LineTo(innerX, innerY).LineTo(innerObj.x, innerObj.y).ClosePath();

            g.append(rect);
            g.order = 1;

			return g;
		}

        this.drawUnit = function (index, data, g) {
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

            // center
            var centerX = width / 2 + x,
                centerY = height / 2 + y,
                outerRadius = min / 2 - this.brush.size / 2,
                innerRadius = outerRadius - this.brush.size;

            var target = this.brush.target,
                active = this.brush.active,
                all = 360,
                startAngle = 0,
                max = 0;

            for (var i = 0; i < target.length; i++) {
                max += data[target[i]];
            }

            if (this.brush['3d']) {
                // 화면 블럭 그리기
                for (var i = 0; i < target.length; i++) {
                    var value = data[target[i]],
                        endAngle = all * (value / max),
                        donut3d = this.drawDonut3dBlock(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                            fill : ColorUtil.darken(this.color(i), 0.5)
                        }, i == target.length - 1);
                    g.append(donut3d);

                    startAngle += endAngle;
                }

                startAngle = 0;
                for (var i = 0; i < target.length; i++) {
                    var value = data[target[i]],
                        endAngle = all * (value / max),
                        donut3d = this.drawDonut3d(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                            fill : ColorUtil.darken(this.color(i), 0.5)
                        }, i == target.length - 1);
                    g.append(donut3d);

                    startAngle += endAngle;
                }
            }

            startAngle = 0;

            for (var i = 0; i < target.length; i++) {
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
            }
        }
	}

	DonutBrush.setup = function() {
		return {
            /** @cfg {Number} [size=50] donut stroke width  */
			size: 50
		};
	}

	return DonutBrush;
}, "chart.brush.pie");
