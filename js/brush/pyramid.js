jui.define("chart.brush.pyramid", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.pie
     * @extends chart.brush.core
     */
    var PyramidBrush = function() {
        function getCalculatedData(obj, targets) {
            var total = 0,
                list = [];

            for(var key in obj) {
                var index = _.inArray(key, targets);
                if(index == -1) continue;

                total += obj[key];

                list.push({
                    key: key,
                    value: obj[key],
                    rate: 0,
                    index: index
                });
            }

            for(var i = 0; i < list.length; i++) {
                list[i].rate = list[i].value / total;
            }

            list.sort(function(a, b) {
               return b.value - a.value;
            });

            return list;
        }

        this.draw = function() {
            var g = this.svg.group(),
                obj = (this.axis.data.length > 0) ? this.axis.data[0] : {},
                data = getCalculatedData(obj, this.brush.target),
                area = this.axis.area(),
                dx = area.width / 2,
                dy = area.height;

            var startX = 0,
                endX = dx * 2,
                startRad = Math.atan2(dy, dx),
                distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            for(var i = 0; i < data.length; i++) {
                var d = data[i],
                    dist = d.rate * distance,
                    sx = startX + (dist * Math.cos(startRad)),
                    ex = endX - (dist * Math.cos(-startRad)),
                    y = dy - (dist * Math.sin(startRad));

                var poly = this.svg.polygon({
                    fill: this.color(i),
                    "stroke-width": 0
                });

                this.addEvent(poly, 0, d.index);
                g.append(poly);

                if(i > 0) {
                    var width = this.chart.theme("pyramidLineWidth");

                    var line = this.svg.line({
                        stroke: this.chart.theme("pyramidLineColor"),
                        "stroke-width": width,
                        x1: startX - width/2,
                        y1: dy,
                        x2: endX + width/2,
                        y2: dy
                    });

                    line.translate(area.x, area.y);
                    g.append(line);
                }

                poly.point(startX, dy);
                poly.point(sx, y);
                poly.point(ex, y);
                poly.point(endX, dy);
                poly.translate(area.x, area.y);

                startX = sx;
                endX = ex;
                dy = y;
            }

            return g;
        }
    }

    PyramidBrush.setup = function() {
        return {
            /** @cfg {String} [showText=null] Set the text appear. (outer or inner)  */
            showText: null,
            /** @cfg {Function} [format=null] Returns a value from the format callback function of a defined option. */
            format: null
        }
    }

    return PyramidBrush;
}, "chart.brush.core");
