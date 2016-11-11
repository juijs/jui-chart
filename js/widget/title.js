jui.define("chart.widget.title", [], function() {
    var TOP_PADDING = 25, PADDING = 20;

    /**
     * @class chart.widget.title
     * @extends chart.widget.core
     * @alias TitleWidget
     *
     */
    var TitleWidget = function(chart, axis, widget) {
        var x = 0, y = 0, anchor = "middle";

        this.drawBefore = function() {
            var axis = chart.axis(widget.axis);

            if(axis) {
                if (widget.orient == "bottom") {
                    y = axis.area("y2") + axis.padding("bottom") - PADDING;
                } else if (widget.orient == "top") {
                    y = axis.area("y") - axis.padding("top") + TOP_PADDING;
                } else {
                    y = axis.area("y") + axis.area("height") / 2;
                }

                if (widget.align == "middle") {
                    x = axis.area("x") + axis.area("width") / 2;
                    anchor = "middle";
                } else if (widget.align == "start") {
                    x = axis.area("x") - axis.padding("left") + PADDING;
                    anchor = "start";
                } else {
                    x = axis.area("x2") + axis.padding("right") - PADDING;
                    anchor = "end";
                }

                x += chart.area("x");
                y += chart.area("y");
            } else {
                // @Deprecated 나중에 제거하기 (모든 샘플 axis 기반으로 변경할 것)
                if (widget.orient == "bottom") {
                    y = chart.area("y2") + chart.padding("bottom") - PADDING;
                } else if (widget.orient == "top") {
                    y = PADDING;
                } else {
                    y = chart.area("y") + chart.area("height") / 2
                }

                if (widget.align == "middle") {
                    x = chart.area("x") + chart.area("width") / 2;
                    anchor = "middle";
                } else if (widget.align == "start") {
                    x = chart.area("x");
                    anchor = "start";
                } else {
                    x = chart.area("x2");
                    anchor = "end";
                }
            }
        }

        this.draw = function() {
            var obj = chart.svg.getTextSize(widget.text);

            var half_text_width = obj.width / 2,
                half_text_height = obj.height / 2;

            var text =  chart.text({
                x : x + widget.dx,
                y : y + widget.dy,
                "text-anchor" : anchor,
                "fill" : widget.color || chart.theme("titleFontColor"),
                "font-size" : widget.size || chart.theme("titleFontSize"),
                "font-weight" : chart.theme("titleFontWeight")
            }, widget.text);

            if (widget.orient == "center") {
                if (widget.align == "start") {
                    text.rotate(-90, x + widget.dx + half_text_width, y + widget.dy + half_text_height)
                } else if (widget.align == "end") {
                    text.rotate(90, x + widget.dx - half_text_width, y + widget.dy + half_text_height)
                }
            }

            return text;
        }
    }

    TitleWidget.setup = function() {
        return {
            axis: null,
            /** @cfg {"top"/"center"/"bottom" } [orient="top"]  Determines the side on which the tool tip is displayed (top, center, bottom). */
            orient: "top", // or bottom
            /** @cfg {"start"/"middle"/"end" } [align="center"] Aligns the title message (start, middle, end).*/
            align: "middle",
            /** @cfg {String} [text=""] Sets the title message. */
            text: "",
            /** @cfg {Number} [dx=0] Moves the x coordinate by a set value from the location where the chart is drawn.  */
            dx: 0,
            /** @cfg {Number} [dy=0] Moves the y coordinate by a set value from the location where the chart is drawn. */
            dy: 0,
            /** @cfg {Number} [size=null] Sets the title message size. */
            size: null,
            /** @cfg {String} [string=null] Sets the title message color. */
            color: null
        }
    }

    return TitleWidget;
}, "chart.widget.core");