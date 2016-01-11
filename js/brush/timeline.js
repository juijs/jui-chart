jui.define("chart.brush.timeline", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.timeline
     * @extends chart.brush.core
     */
    var TimelineBrush = function() {
        var g, padding, domains, height, width, ticks;
        var keyToIndex = {};

        this.drawBefore = function() {
            g = this.svg.group();
            padding = this.chart.get("padding");
            domains = this.axis.y.domain();
            height = this.axis.y.rangeBand();
            width = this.axis.x.rangeBand();
            ticks = this.axis.x.ticks(this.axis.get("x").step);

            // µµ∏ﬁ¿Œ ≈∞øÕ ¿Œµ¶Ω∫ ∏ ∆ÿ ∞¥√º
            for(var i = 0; i < domains.length; i++) {
                keyToIndex[domains[i]] = i;
            }
        }

        /*
         xview_popup_timeline_content_bar_color: "#4dbfd9",
         xview_popup_timeline_content_select_bar_color: "#9262cf",
         xview_popup_timeline_content_select_layer_color: "rgba(167, 92, 255, 0.15)",
         xview_popup_timeline_content_select_layer_stroke_color: "#caa4f5",
         xview_popup_timeline_content_hover_layer_color: "rgba(222, 194, 255, 0.15)",
         xview_popup_timeline_content_hover_layer_stroke_color: "#caa4f5",
         xview_popup_timeline_text_color: "#000000",

         ø¨∞·º±¿∫ 1px
         ¥ÎªÛ¿∫ 7px
         */

        this.drawGrid = function() {
            for(var i = -1; i < ticks.length; i++) {
                var x = (i == -1) ? this.axis.x(0) - padding.left : this.axis.x(ticks[i]);

                for (var j = 0; j < domains.length; j++) {
                    var domain = domains[j],
                        y = this.axis.y(j) - height / 2;

                    if(i < ticks.length - 1) {
                        var fill = (j == 0) ? this.chart.color("linear(top) #f9f9f9,1 #e9e9e9") : ((j % 2) ? "#fafafa" : "#f1f0f3");

                        var bg = this.svg.rect({
                            width: (i == -1) ? padding.left : width,
                            height: height,
                            fill: fill,
                            x: x,
                            y: y
                        });

                        g.append(bg);
                    }

                    if(i == -1) {
                        var txt = this.chart.text({
                            "text-anchor": "end",
                            dx: padding.left - 5,
                            dy: 12,
                            "font-size": 11,
                            "font-weight": 700
                        })
                        .text(domain)
                        .translate(x, y);

                        g.append(txt);
                    }
                }
            }
        }

        this.drawLine = function() {
            var y = this.axis.y(0) - height / 2,
                format = this.axis.get("x").format;

            for(var i = 0; i < ticks.length; i++) {
                var x = this.axis.x(ticks[i]);

                if(i < ticks.length - 1) {
                    var vline = this.svg.line({
                        stroke: "#c9c9c9",
                        "stroke-width": 1,
                        x1: x,
                        x2: x,
                        y1: y,
                        y2: y + this.axis.area("height")
                    });

                    g.append(vline);
                }

                if(i > 0) {
                    var txt = this.chart.text({
                        "text-anchor": "end",
                        dx: -5,
                        dy: 12,
                        "font-size": 10
                    })
                    .translate(x, y);

                    if (_.typeCheck("function", format)) {
                        txt.text(format.apply(this.chart, [ticks[i], i]));
                    } else {
                        txt.text(ticks[i]);
                    }

                    g.append(txt);
                }
            }

            var hline = this.svg.line({
                stroke: "#d2d2d2",
                "stroke-width": 1,
                x1: this.axis.x(0) - padding.left,
                x2: this.axis.area("width"),
                y1: y + height,
                y2: y + height
            });

            g.append(hline);
        }

        this.drawData = function() {
            for(var i = 0, len = this.axis.data.length; i < len; i++) {
                var d = this.axis.data[i],
                    x1 = this.axis.x(this.getValue(d, "stime", 0)),
                    x2 = this.axis.x(this.getValue(d, "etime", this.axis.x.max())),
                    y = this.axis.y(keyToIndex[this.getValue(d, "type")]),
                    h = 7;

                var r = this.svg.rect({
                    width: x2 - x1,
                    height: h,
                    fill: "#4dbfd9",
                    x: x1,
                    y: y - h / 2
                });

                if(i < len - 1) {
                    var dd = this.axis.data[i + 1],
                        xx1 = this.axis.x(this.getValue(dd, "stime", 0)),
                        yy = this.axis.y(keyToIndex[this.getValue(dd, "type")]);

                    var l = this.svg.line({
                        x1: x2,
                        y1: y,
                        x2: xx1,
                        y2: yy,
                        stroke: "#4dbfd9",
                        "stroke-width": 1
                    });

                    g.append(l);
                }

                g.append(r);
            }
        }

        this.draw = function() {
            //console.log(this.axis.y.min(), this.axis.y.max(), this.axis.y.ticks(10));
            //console.log(this.axis.x.domain());
            //console.log(this.axis.get("x").domain);

            this.drawGrid();
            this.drawLine();
            this.drawData();

            return g;
        }
    }

    TimelineBrush.setup = function() {
        return {
            clip : false
        };
    }

    return TimelineBrush;
}, "chart.brush.core");