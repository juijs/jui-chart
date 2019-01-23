import jui from '../main.js';
import PieBrush from './pie.js';

jui.use(PieBrush);

export default {
    name: "chart.brush.donut",
    extend: "chart.brush.pie",
    component: function() {
        var _ = jui.include("util.base");
        var math = jui.include("util.math");
        var ColorUtil = jui.include("util.color");

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

                // 마우스 이벤트 빈공간 제외
                path.css({
                    "pointer-events": "stroke"
                });

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
                    if(data[target[i]] == 0) continue;

                    var value = data[target[i]],
                        endAngle = all * (value / max),
                        centerAngle = startAngle + (endAngle / 2) - 90,
                        isOnlyOne = Math.abs(startAngle - endAngle) == 360,
                        radius = (this.brush.showText == "inside") ? this.brush.size + innerRadius + outerRadius : outerRadius,
                        donut = this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle, endAngle, {
                            stroke : this.color(i),
                            fill : 'transparent'
                        }),
                        text = this.drawText(centerX, centerY, centerAngle, radius, this.getFormatText(target[i], value));

                    // 파이 액티브상태 캐싱하는 객체
                    cache_active[centerAngle] = {
                        active: false,
                        pie: donut,
                        text: text,
                        centerX: centerX,
                        centerY: centerY,
                        centerAngle: centerAngle,
                        outerRadius: radius
                    };

                    // TODO: 파이가 한개일 경우, 액티브 처리를 할 필요가 없다.
                    if(!isOnlyOne) {
                        // 설정된 키 활성화
                        if (active == target[i] || _.inArray(target[i], active) != -1) {
                            cache_active[centerAngle].active = true;
                        } else {
                            cache_active[centerAngle].active = false;
                        }

                        // 파이 및 텍스트 액티브 상태 처리
                        if(this.brush.showText == "inside") {
                            this.setActiveTextEvent(cache_active);
                        }

                        // 파이 및 텍스트 액티브 상태 처리
                        this.setActiveEvent(cache_active, false);

                        // 활성화 이벤트 설정
                        if (this.brush.activeEvent != null) {
                            (function (p, t, cx, cy, ca, r) {
                                p.on(self.brush.activeEvent, function (e) {
                                    if (!cache_active[ca].active) {
                                        cache_active[ca].active = true;
                                    } else {
                                        cache_active[ca].active = false;
                                    }

                                    if(self.brush.showText == "inside") {
                                        self.setActiveTextEvent(cache_active);
                                    }

                                    self.setActiveEvent(cache_active, false);
                                });

                                p.attr({ cursor: "pointer" });
                            })(donut, text.get(0), centerX, centerY, centerAngle, radius);
                        }
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

        DonutBrush.setup = function() {
            return {
                /** @cfg {Number} [size=50] donut stroke width  */
                size: 50,
                /** @cfg {Boolean} [showValue=false] donut stroke width  */
                showValue: false
            };
        }

        return DonutBrush;
    }
}