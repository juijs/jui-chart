import jui from '../main.js';

export default {
    name: "chart.brush.bubble",
    extend: "chart.brush.core",
    component: function() {
        var _ = jui.include("util.base");
        var math = jui.include("util.math");

        var BubbleBrush = function() {
            var self = this,
                min = null,
                max = null;

            this.getFormatText = function(value, dataIndex) {
                if(_.typeCheck("function", this.brush.format)) {
                    return this.format(this.axis.data[dataIndex]);
                }

                return value;
            }

            this.getBubbleRadius = function(value, dataIndex) {
                var scaleKey = this.brush.scaleKey;

                if(scaleKey != null) {
                    var scaleValue = this.axis.data[dataIndex][scaleKey];
                    value = (_.typeCheck("number", scaleValue)) ? scaleValue : value;
                }

                return math.scaleValue(value, min, max, this.brush.min, this.brush.max);
            }

            this.createBubble = function(pos, color, dataIndex) {
                var radius = this.getBubbleRadius(pos.value, dataIndex),
                    circle = this.svg.group().translate(pos.x, pos.y);

                circle.append(
                    this.svg.circle({
                        r: radius,
                        "fill": color,
                        "fill-opacity": this.chart.theme("bubbleBackgroundOpacity"),
                        "stroke": color,
                        "stroke-width": this.chart.theme("bubbleBorderWidth")
                    })
                );

                if(this.brush.showText) {
                    var text = this.getFormatText(pos.value, dataIndex);

                    circle.append(
                        this.chart.text({
                            "font-size": this.chart.theme("bubbleFontSize"),
                            fill: this.chart.theme("bubbleFontColor"),
                            "text-anchor": "middle",
                            dy: 3
                        }).text(text)
                    );
                }

                this.bubbleList.push(circle);

                return circle;
            }

            this.setActiveEffect = function(r) {
                var cols = this.bubbleList;

                for(var i = 0; i < cols.length; i++) {
                    var opacity = (cols[i] == r) ? 1 : this.chart.theme("bubbleBackgroundOpacity");

                    cols[i].get(0).attr({ opacity: opacity });
                    cols[i].get(1).attr({ opacity: opacity });
                }
            }

            this.drawBubble = function(points) {
                var g = this.svg.group();

                for(var i = 0; i < points.length; i++) {
                    for(var j = 0; j < points[i].x.length; j++) {
                        var b = this.createBubble({
                            x: points[i].x[j], y: points[i].y[j], value: points[i].value[j]
                        }, this.color(j, i), j);

                        // 컬럼 및 기본 브러쉬 이벤트 설정
                        if(this.brush.activeEvent != null) {
                            (function(bubble) {
                                bubble.on(self.brush.activeEvent, function(e) {
                                    self.setActiveEffect(bubble);
                                });

                                bubble.attr({ cursor: "pointer" });
                            })(b);
                        }

                        this.addEvent(b, j, i);
                        g.append(b);
                    }
                }

                // 액티브 버블 설정
                var bubble = this.bubbleList[this.brush.active];
                if(bubble != null) {
                    this.setActiveEffect(bubble);
                }

                return g;
            }

            this.drawBefore = function() {
                var scaleKey = this.brush.scaleKey;

                if(scaleKey != null) {
                    var values = [];

                    for (var i = 0; i < this.axis.data.length; i++) {
                        values.push(this.axis.data[i][scaleKey]);
                    }

                    min = Math.min.apply(this, values);
                    max = Math.max.apply(this, values);
                } else {
                    min = this.axis.y.min();
                    max = this.axis.y.max();
                }

                this.bubbleList = [];
            }

            this.draw = function() {
                return this.drawBubble(this.getXY());
            }

            this.drawAnimate = function(root) {
                root.each(function(i, elem) {
                    var c = elem.children[0];

                    c.append(self.svg.animateTransform({
                        attributeType: "xml",
                        attributeName: "transform",
                        type: "scale",
                        from: "0",
                        to: "1",
                        dur: "0.7s",
                        fill: "freeze",
                        repeatCount: "1"
                    }));

                    c.append(self.svg.animate({
                        attributeType: "xml",
                        attributeName: "fill-opacity",
                        from: "0",
                        to: self.chart.theme("bubbleBackgroundOpacity"),
                        dur: "1.4s",
                        repeatCount: "1",
                        fill: "freeze"
                    }));
                });
            }
        }

        BubbleBrush.setup = function() {
            return {
                /** @cfg {Number} [min=5] Determines the minimum size of a bubble. */
                min: 5,
                /** @cfg {Number} [max=30] Determines the maximum size of a bubble.*/
                max: 30,
                /** @cfg {String} [scaleKey=null] The name of the property to determine the bubble size. */
                scaleKey: null,
                /** @cfg {Boolean} [showText=false] Set the text appear. */
                showText: false,
                /** @cfg {Function} [format=null] Returns a value from the format callback function of a defined option. */
                format: null,
                /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
                active: null,
                /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
                activeEvent: null
            };
        }

        return BubbleBrush;
    }
}