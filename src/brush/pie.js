import jui from '../main.js';

export default {
    name: "chart.brush.pie",
    extend: "chart.brush.core",
    component: function() {
        var _ = jui.include("util.base");
        var math = jui.include("util.math");
        var ColorUtil = jui.include("util.color");

        var PieBrush = function() {
            var self = this, textY = 3;
            var preAngle = 0, preRate = 0, preOpacity = 1;
            var g, cache_active = {};

            this.setActiveEvent = function(items, useOpacity) {
                var isDisableAll = true,
                    disabledOpacity = this.chart.theme("pieDisableBackgroundOpacity") || 0.5;

                for(var key in items) {
                    var data = items[key];

                    if(data.active) {
                        isDisableAll = false;
                        break;
                    }
                }

                for(var key in items) {
                    var data = items[key];

                    if(data.active) {
                        let dist = this.chart.theme("pieActiveDistance"),
                            tx = Math.cos(math.radian(data.centerAngle)) * dist,
                            ty = Math.sin(math.radian(data.centerAngle)) * dist;

                        data.pie.translate(data.centerX + tx, data.centerY + ty);
                    } else {
                        data.pie.translate(data.centerX, data.centerY);
                    }

                    if(useOpacity) {
                        if(data.pie.children.length > 0) {
                            data.pie.get(0).attr({ "opacity": isDisableAll || data.active ? 1 : disabledOpacity });
                        }

                        if(data.text.children.length > 0) {
                            data.text.get(0).attr({ "opacity": isDisableAll || data.active ? 1 : disabledOpacity });
                        }
                    }
                }
            }

            this.setActiveTextEvent = function(items) {
                for(var key in items) {
                    var data = items[key],
                        dist = (data.active) ? this.chart.theme("pieActiveDistance") : 0,
                        cx = data.centerX + (Math.cos(math.radian(data.centerAngle)) * ((data.outerRadius + dist) / 2)),
                        cy = data.centerY + (Math.sin(math.radian(data.centerAngle)) * ((data.outerRadius + dist) / 2));

                    if(data.text.children.length > 0) {
                        data.text.get(0).translate(cx, cy);
                    }
                }
            }

            this.getFormatText = function(target, value, max) {
                var key = target;

                if(typeof(this.brush.format) == "function") {
                    return this.format(key, value, max);
                } else {
                    if (!value) {
                        return key;
                    }

                    return key + ": " + this.format(value);
                }
            }

            this.drawPie = function(centerX, centerY, outerRadius, startAngle, endAngle, color) {
                var pie = this.chart.svg.group();

                if (endAngle == 360) { // if pie is full size, draw a circle as pie brush
                    var circle = this.chart.svg.circle({
                        cx : centerX,
                        cy : centerY,
                        r : outerRadius,
                        fill : color,
                        stroke : this.chart.theme("pieBorderColor") || color,
                        "stroke-width" : this.chart.theme("pieBorderWidth")
                    });

                    pie.append(circle);

                    return pie;
                }

                var path = this.chart.svg.path({
                    fill : color,
                    stroke : this.chart.theme("pieBorderColor") || color,
                    "stroke-width" : this.chart.theme("pieBorderWidth")
                });

                // 바깥 지름 부터 그림
                var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
                    startX = obj.x,
                    startY = obj.y;

                // 시작 하는 위치로 옮김
                path.MoveTo(startX, startY);

                // outer arc 에 대한 지점 설정
                obj = math.rotate(startX, startY, math.radian(endAngle));

                pie.translate(centerX, centerY);

                // arc 그림
                path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y)
                    .LineTo(0, 0)
                    .ClosePath();

                pie.append(path);
                pie.order = 1;

                return pie;
            }

            this.drawPie3d = function(centerX, centerY, outerRadius, startAngle, endAngle, color) {
                var pie = this.chart.svg.group(),
                    path = this.chart.svg.path({
                        fill : color,
                        stroke : this.chart.theme("pieBorderColor") || color,
                        "stroke-width" : this.chart.theme("pieBorderWidth")
                    });

                // 바깥 지름 부터 그림
                var obj = math.rotate(0, -outerRadius, math.radian(startAngle)),
                    startX = obj.x,
                    startY = obj.y;

                // 시작 하는 위치로 옮김
                path.MoveTo(startX, startY);

                // outer arc 에 대한 지점 설정
                obj = math.rotate(startX, startY, math.radian(endAngle));

                pie.translate(centerX, centerY);

                // arc 그림
                path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 1, obj.x, obj.y)

                var y = obj.y + 10,
                    x = obj.x + 5,
                    targetX = startX + 5,
                    targetY = startY + 10;

                path.LineTo(x, y);
                path.Arc(outerRadius, outerRadius, 0, (endAngle > 180) ? 1 : 0, 0, targetX, targetY)
                path.ClosePath();

                pie.append(path);
                pie.order = 1;

                return pie;
            }

            this.drawText = function(centerX, centerY, centerAngle, outerRadius, text) {
                var g = this.svg.group({
                        visibility: !this.brush.showText ? "hidden" : "visible"
                    }),
                    isLeft = (centerAngle + 90 > 180) ? true : false;

                if(text === "" || !text) {
                    return g;
                }

                if(this.brush.showText == "inside") {
                    var cx = centerX + (Math.cos(math.radian(centerAngle)) * (outerRadius / 2)),
                        cy = centerY + (Math.sin(math.radian(centerAngle)) * (outerRadius / 2));

                    var text = this.chart.text({
                        "font-size": this.chart.theme("pieInnerFontSize"),
                        fill: this.chart.theme("pieInnerFontColor"),
                        "text-anchor": "middle",
                        y: textY
                    }, text);

                    text.translate(cx, cy);

                    g.append(text);
                    g.order = 2;
                } else {
                    // TODO: 각도가 좁을 때, 텍스트와 라인을 보정하는 코드 개선 필요

                    var rate = this.chart.theme("pieOuterLineRate"),
                        diffAngle = Math.abs(centerAngle - preAngle);

                    if(diffAngle < 2) {
                        if(preRate == 0) {
                            preRate = rate;
                        }

                        var tick = rate * 0.05;
                        preRate -= tick;
                        preOpacity -= 0.25;
                    } else {
                        preRate = rate;
                        preOpacity = 1;
                    }

                    if(preRate > 1.2) {
                        var dist = this.chart.theme("pieOuterLineSize"),
                            r = outerRadius * preRate,
                            cx = centerX + (Math.cos(math.radian(centerAngle)) * outerRadius),
                            cy = centerY + (Math.sin(math.radian(centerAngle)) * outerRadius),
                            tx = centerX + (Math.cos(math.radian(centerAngle)) * r),
                            ty = centerY + (Math.sin(math.radian(centerAngle)) * r),
                            ex = (isLeft) ? tx - dist : tx + dist;

                        var path = this.svg.path({
                            fill: "transparent",
                            stroke: this.chart.theme("pieOuterLineColor"),
                            "stroke-width": this.chart.theme("pieOuterLineWidth"),
                            "stroke-opacity": preOpacity
                        });

                        path.MoveTo(cx, cy)
                            .LineTo(tx, ty)
                            .LineTo(ex, ty);

                        var text = this.chart.text({
                            "font-size": this.chart.theme("pieOuterFontSize"),
                            "fill": this.chart.theme("pieOuterFontColor"),
                            "fill-opacity": preOpacity,
                            "text-anchor": (isLeft) ? "end" : "start",
                            y: textY
                        }, text);

                        text.translate(ex + (isLeft ? -3 : 3), ty);

                        g.append(text);
                        g.append(path);
                        g.order = 0;

                        preAngle = centerAngle;
                    }
                }

                return g;
            }

            this.drawUnit = function (index, data, g) {
                var props = this.getProperty(index),
                    centerX = props.centerX,
                    centerY = props.centerY,
                    outerRadius = props.outerRadius;

                var target = this.brush.target,
                    active = this.brush.active,
                    all = 360,
                    startAngle = 0,
                    max = 0;

                for (var i = 0; i < target.length; i++) {
                    max += data[target[i]];
                }

                for (var i = 0; i < target.length; i++) {
                    if(data[target[i]] == 0) continue;

                    var value = data[target[i]],
                        endAngle = all * (value / max);

                    if (this.brush['3d']) {
                        var pie3d = this.drawPie3d(centerX, centerY, outerRadius, startAngle, endAngle, ColorUtil.darken(this.color(i), 0.5));
                        g.append(pie3d);
                    }

                    startAngle += endAngle;
                }

                startAngle = 0;

                for (var i = 0; i < target.length; i++) {
                    var value = data[target[i]],
                        endAngle = all * (value / max),
                        centerAngle = startAngle + (endAngle / 2) - 90,
                        isOnlyOne = Math.abs(startAngle - endAngle) == 360,
                        pie = this.drawPie(centerX, centerY, outerRadius, startAngle, endAngle, this.color(i)),
                        text = this.drawText(centerX, centerY, centerAngle, outerRadius, this.getFormatText(target[i], value, max));

                    // 파이 액티브상태 캐싱하는 객체
                    cache_active[centerAngle] = {
                        active: false,
                        pie: pie,
                        text: text,
                        centerX: centerX,
                        centerY: centerY,
                        centerAngle: centerAngle,
                        outerRadius: outerRadius
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
                        this.setActiveEvent(cache_active, true);

                        // 활성화 이벤트 설정
                        if (this.brush.activeEvent != null) {
                            (function(p, t, cx, cy, ca, r) {
                                p.on(self.brush.activeEvent, function(e) {
                                    if(!cache_active[ca].active) {
                                        cache_active[ca].active = true;
                                    } else {
                                        cache_active[ca].active = false;
                                    }

                                    if(self.brush.showText == "inside") {
                                        self.setActiveTextEvent(cache_active);
                                    }

                                    self.setActiveEvent(cache_active, true);
                                });

                                p.attr({ cursor: "pointer" });
                            })(pie, text.get(0), centerX, centerY, centerAngle, outerRadius);
                        }
                    }

                    self.addEvent(pie, index, i);
                    g.append(pie);
                    g.append(text);

                    startAngle += endAngle;
                }
            }

            this.drawNoData = function(g) {
                var props = this.getProperty(0);

                g.append(this.drawPie(props.centerX, props.centerY, props.outerRadius, 0, 360, this.chart.theme("pieNoDataBackgroundColor")));
            }

            this.drawBefore = function() {
                g = this.chart.svg.group();
            }

            this.draw = function() {
                if(this.listData().length == 0) {
                    this.drawNoData(g);
                } else {
                    this.eachData(function(data, i) {
                        this.drawUnit(i, data, g);
                    });
                }

                return g;
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

                return {
                    centerX: width / 2 + x,
                    centerY: height / 2 + y,
                    outerRadius: min / 2
                }
            }
        }

        PieBrush.setup = function() {
            return {
                /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
                clip: false,
                /** @cfg {String} [showText=null] Set the text appear. (outside or inside)  */
                showText: null,
                /** @cfg {Function} [format=null] Returns a value from the format callback function of a defined option. */
                format: null,
                /** @cfg {Boolean} [3d=false] check 3d support */
                "3d": false,
                /** @cfg {String|Array} [active=null] Activates the pie of an applicable property's name. */
                active: null,
                /** @cfg {String} [activeEvent=null]  Activates the pie in question when a configured event occurs (click, mouseover, etc). */
                activeEvent: null
            }
        }

        return PieBrush;
    }
}