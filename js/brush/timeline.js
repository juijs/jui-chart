jui.define("chart.brush.timeline", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.timeline
     * @extends chart.brush.core
     */
    var TimelineBrush = function() {
        var self = this;
        var g, padding, domains, height, width, ticks, titleX, active, activeType, startX;
        var keyToIndex = {}, cacheRect = [], cacheRectIndex = null;

        this.setActiveRect = function(target) {
            for(var k = 0; k < cacheRect.length; k++) {
                var r1 = cacheRect[k].r1,
                    r2 = cacheRect[k].r2,
                    color = cacheRect[k].color,
                    isTarget = r2.element == target;

                r1.attr({
                    "fill": (isTarget) ?
                        this.chart.theme("timelineActiveBarBackgroundColor") : color
                });

                r2.attr({
                    "fill": (isTarget) ?
                        this.chart.theme("timelineActiveLayerBackgroundColor") : this.chart.theme("timelineHoverLayerBackgroundColor"),
                    "stroke": (isTarget) ?
                        this.chart.theme("timelineActiveLayerBorderColor") : this.chart.theme("timelineHoverLayerBorderColor"),
                    "fill-opacity": (isTarget) ? this.chart.theme("timelineLayerBackgroundOpacity") : 0,
                    "stroke-width": (isTarget) ? 1 : 0
                });

                if (isTarget) {
                    cacheRectIndex = k;
                }
            }
        }

        this.setHoverRect = function(target) {
            for(var k = 0; k < cacheRect.length; k++) {
                var r2 = cacheRect[k].r2,
                    isTarget = r2.element == target;

                r2.attr({
                    "fill": (isTarget && cacheRectIndex == k) ?
                        self.chart.theme("timelineActiveLayerBackgroundColor") : this.chart.theme("timelineHoverLayerBackgroundColor"),
                    "stroke": (isTarget && cacheRectIndex == k) ?
                        self.chart.theme("timelineActiveLayerBorderColor") : this.chart.theme("timelineHoverLayerBorderColor"),
                    "fill-opacity": (isTarget || cacheRectIndex == k) ? this.chart.theme("timelineLayerBackgroundOpacity") : 0,
                    "stroke-width": (isTarget || cacheRectIndex == k) ? 1 : 0
                });
            }
        }

        this.setActiveBar = function(target) {
            for(var k = 0; k < cacheRect.length; k++) {
                var r1 = cacheRect[k].r1,
                    t1 = cacheRect[k].t1,
                    color = cacheRect[k].color,
                    y1 = cacheRect[k].y - height / 2,
                    y2 = cacheRect[k].y - cacheRect[k].height / 2,
                    isTarget = r1.element == target;

                if(isTarget) {
                    r1.attr({
                        "fill": this.chart.theme("timelineActiveBarBackgroundColor") || color,
                        height: height,
                        y: y1
                    });

                    t1.attr({ "visibility": "visible" });
                } else {
                    r1.attr({
                        "fill": color,
                        height: cacheRect[k].height,
                        y: y2
                    });

                    t1.attr({ "visibility": "hidden" });
                }

                if (isTarget) {
                    cacheRectIndex = k;
                }
            }
        }

        this.setHoverBar = function(target) {
            var hoverColor = this.chart.theme("timelineHoverBarBackgroundColor"),
                activeColor = this.chart.theme("timelineActiveBarBackgroundColor");

            for(var k = 0; k < cacheRect.length; k++) {
                var r1 = cacheRect[k].r1,
                    color = cacheRect[k].color,
                    isTarget = r1.element == target;

                r1.attr({
                    "fill": (isTarget && cacheRectIndex != k) ? hoverColor || color :
                        (cacheRectIndex == k) ? activeColor || color : color
                });
            }
        }

        this.drawBefore = function() {
            g = this.svg.group();
            padding = this.axis.get("padding");
            domains = this.axis.y.domain();
            height = this.axis.y.rangeBand();
            width = this.axis.x.rangeBand();
            ticks = this.axis.x.ticks(this.axis.get("x").step);
            active = this.brush.active;
            activeType = this.brush.activeType;
            startX = (this.brush.hideTitle) ? 0 : padding.left;
            titleX = this.axis.area("x") - startX;

            // 도메인 키와 인덱스 맵팽 객체
            for(var i = 0; i < domains.length; i++) {
                keyToIndex[domains[i]] = i;
            }
        }

        this.drawGrid = function() {
            var yFormat = this.axis.get("y").format,
                rowWidth = this.axis.area("width") + startX;

            var columnColor = this.chart.theme("timelineColumnBackgroundColor"),
                hoverColor = this.chart.theme("timelineHoverRowBackgroundColor"),
                evenColor = this.chart.theme("timelineEvenRowBackgroundColor"),
                oddColor = this.chart.theme("timelineOddRowBackgroundColor");

            for(var j = 0; j < domains.length; j++) {
                var domain = domains[j],
                    y = this.axis.y(j),
                    fill = (j == 0) ? columnColor : ((j % 2) ? evenColor : oddColor);

                var r = this.svg.rect({
                    width: rowWidth,
                    height: height,
                    fill: fill,
                    x: titleX,
                    y: y - height / 2
                });

                (function(elem, index) {
                    if(index > 0) {
                        elem.hover(function () {
                            elem.attr({ fill: hoverColor });
                        }, function () {
                            elem.attr({ fill: index % 2 ? evenColor : oddColor });
                        });
                    }
                })(r, j);

                g.append(r);

                if(startX > 0) {
                    var txt = this.chart.text({
                        "text-anchor": "start",
                        dx: 5,
                        dy: this.chart.theme("timelineTitleFontSize") / 3,
                        "font-size": this.chart.theme("timelineTitleFontSize"),
                        fill: this.chart.theme("timelineTitleFontColor"),
                        "font-weight": this.chart.theme("timelineTitleFontWeight")
                    }).translate(titleX, y);

                    var contents = (_.typeCheck("function", yFormat)) ? yFormat.apply(this.chart, [ domain, j ]) : domain;
                    txt.html(contents);

                    // 마우스 오버시 원본 데이터 보내기
                    (function(origin) {
                        txt.on("mouseover", function(e) {
                            self.chart.emit("timeline.title", [ origin, e ]);
                        });
                    })(domain);

                    g.append(txt);
                }
            }
        }

        this.drawLine = function() {
            var y = this.axis.y(0) - height / 2,
                xFormat = this.axis.get("x").format;

            for(var i = 0; i < ticks.length; i++) {
                var x = this.axis.x(ticks[i]);

                if(i < ticks.length - 1) {
                    var vline = this.svg.line({
                        stroke: this.chart.theme((i == 0) ? "timelineHorizontalLineColor" : "timelineVerticalLineColor"),
                        "stroke-width": 1,
                        x1: x,
                        x2: x,
                        y1: y,
                        y2: y + this.axis.area("height"),
                        visibility: (startX == 0 && i == 0) ? "hidden" : "visible"
                    });

                    g.append(vline);
                }

                if(i > 0) {
                    var txt = this.chart.text({
                        "text-anchor": "end",
                        dx: -5,
                        dy: this.chart.theme("timelineColumnFontSize") / 2,
                        "font-size": this.chart.theme("timelineColumnFontSize"),
                        fill: this.chart.theme("timelineColumnFontColor")
                    })
                    .translate(x, this.axis.y(0));

                    var contents = (_.typeCheck("function", xFormat)) ? xFormat.apply(this.chart, [ ticks[i], i ]) : ticks[i];
                    txt.text(contents);

                    g.append(txt);
                }
            }

            var hline = this.svg.line({
                stroke: this.chart.theme("timelineHorizontalLineColor"),
                "stroke-width": 1,
                x1: titleX,
                x2: this.axis.area("width") + padding.left,
                y1: y + height,
                y2: y + height
            });

            g.append(hline);
        }

        this.drawData = function() {
            var bg_height = this.axis.area("height"),
                startY = this.axis.area("y"),
                len = this.axis.data.length,
                size = this.brush.barSize,
                tooltipFormat = this.brush.activeTooltip,
                activeFontSize = this.chart.theme("timelineActiveBarFontSize"),
                activeFontColor = this.chart.theme("timelineActiveBarFontColor");

            for(var i = 0; i < len; i++) {
                var d = this.axis.data[i],
                    x1 = this.axis.x(this.getValue(d, "stime", 0)),
                    x2 = this.axis.x(this.getValue(d, "etime", this.axis.x.max())),
                    y = this.axis.y(keyToIndex[this.getValue(d, "key")]),
                    h = (_.typeCheck("function", size)) ? size.apply(this.chart, [ d, i ]) : size,
                    color = this.color(i, 0);

                if(x2 - x1 < 0 || isNaN(x2)) { // 음수 처리
                    continue;
                }

                var r1 = this.svg.rect({
                    width: x2 - x1,
                    height: h,
                    fill: color,
                    x: x1,
                    y: y - h / 2,
                    cursor: "pointer"
                });

                var t1 = this.svg.text({
                    "text-anchor": "end",
                    "font-size": activeFontSize,
                    fill: activeFontColor,
                    x: x1 + x2 - x1,
                    y: y,
                    dx: -activeFontSize/2,
                    dy: activeFontSize/3,
                    "visibility": "hidden"
                });

                var r2 = this.svg.rect({
                    width: x2 - x1,
                    height: bg_height - 6,
                    "fill-opacity": 0,
                    "stroke-width": 0,
                    x: x1,
                    y: startY + 3,
                    cursor: "pointer"
                });

                if(i < len - 1) {
                    var dd = this.axis.data[i + 1],
                        xx1 = this.axis.x(this.getValue(dd, "stime", 0)),
                        yy = this.axis.y(keyToIndex[this.getValue(dd, "key")]);

                    var l = this.svg.line({
                        x1: x2,
                        y1: y,
                        x2: xx1,
                        y2: yy,
                        stroke: color,
                        "stroke-width": this.brush.lineWidth
                    });

                    g.append(l);
                }

                if(_.typeCheck("function", tooltipFormat)) {
                    t1.text(tooltipFormat.apply(this.chart, [ d, i ]));
                }

                g.append(r1);
                g.append(t1);
                g.append(r2);

                // 브러쉬 공통 이벤트 설정
                this.addEvent(r1, i);

                // 마우스 오버 효과 엘리먼트
                cacheRect[i] = {
                    r1: r1,
                    r2: r2,
                    t1: t1,
                    color: color,
                    y: y,
                    height: h
                };

                // 액티브 이벤트 설정
                if(activeType == "rect") {
                    (function(data) {
                        r2.on(self.brush.activeEvent, function (e) {
                            self.setActiveRect(e.target);
                            self.chart.emit("timeline.active", [ data, e ]);
                        });
                    })(d);

                    r2.on("mouseover", function(e) {
                        self.setHoverRect(e.target);
                    });
                } else {
                    r2.attr({ "visibility": "hidden" });

                    (function(data) {
                        r1.on(self.brush.activeEvent, function (e) {
                            self.setActiveBar(e.target);
                            self.chart.emit("timeline.active", [ data, e ]);
                        });
                    })(d);

                    r1.on("mouseover", function(e) {
                        self.setHoverBar(e.target);
                    });
                }
            }

            // 엑티브 대상 효과 설정
            if(_.typeCheck("integer", active) && cacheRect.length > 0) {
                if(active < 0) return;
                cacheRectIndex = active;

                if(activeType == "rect") {
                    this.setActiveRect(cacheRect[cacheRectIndex].r2.element);
                } else {
                    this.setActiveBar(cacheRect[cacheRectIndex].r1.element);
                }
            }
        }

        this.draw = function() {
            this.drawGrid();
            this.drawLine();
            this.drawData();

            // 마우스가 차트 밖으로 나가면 Hover 효과 제거
            g.on("mouseout", function(e) {
                if(activeType == "rect") {
                    self.setHoverRect(null);
                } else {
                    self.setHoverBar(null);
                }
            });

            return g;
        }
    }

    TimelineBrush.setup = function() {
        return {
            barSize: 7,
            lineWidth: 1,
            active: null,
            activeEvent: "click",
            activeType: "rect",
            activeTooltip: null,
            hideTitle : false,
            clip : false
        };
    }

    return TimelineBrush;
}, "chart.brush.core");