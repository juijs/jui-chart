jui.define("chart.brush.area", [], function() {

    /**
     * @class chart.brush.area
     *
     * @extends chart.brush.line
     */
    var AreaBrush = function() {

        this.drawArea = function(path) {
            var g = this.chart.svg.group(),
                y = this.axis.y(this.brush.startZero ? 0 : this.axis.y.min());

            for(var k = 0; k < path.length; k++) {
                var children = this.createLine(path[k], k).children;

                for(var i = 0; i < children.length; i++) {
                    var p = children[i];

                    if (path[k].length > 0) {
                        p.LineTo(p.attr("x2"), y);
                        p.LineTo(p.attr("x1"), y);
                        p.ClosePath();
                    }

                    p.attr({
                        fill: p.attr("stroke"),
                        "fill-opacity": this.chart.theme("areaBackgroundOpacity"),
                        "stroke-width": 0
                    });

                    g.prepend(p);
                }

                if(this.brush.line) {
                    g.prepend(this.createLine(path[k], k));
                }

                this.addEvent(g, null, k);
            }

            return g;
        }

        this.draw = function() {
            return this.drawArea(this.getXY());
        }

        this.drawAnimate = function(root) {
            root.append(
                this.chart.svg.animate({
                     attributeName: "opacity",
                     from: "0",
                     to: "1",
                     begin: "0s" ,
                     dur: "1.5s",
                     repeatCount: "1",
                     fill: "freeze"
                 })
            );
        }
    }

    AreaBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step). */
            symbol: "normal", // normal, curve, step
            /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
            active: null,
            /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null,
            /** @cfg {"max"/"min"} [display=null]  Shows a tool tip on the bar for the minimum/maximum value.  */
            display: null,
            /** @cfg {Boolean} [startZero=true]  The end of the area is zero point. */
            startZero: true,
            /** @cfg {Boolean} [line=true]  Visible line */
            line: true
        };
    }

    return AreaBrush;
}, "chart.brush.line");
