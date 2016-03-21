jui.define("chart.brush.pyramid", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.brush.pie
     * @extends chart.brush.core
     */
    var PyramidBrush = function() {
        var self = this;

        function getCalculatedData(obj) {
            var total = 0,
                list = [];

            for(var key in obj) {
                total += obj[key];

                list.push({
                    key: key,
                    value: obj[key],
                    rate: 0
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
                data = getCalculatedData(obj),
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
                    stroke: "white"
                });

                poly.point(startX, dy);
                poly.point(sx, y);
                poly.point(ex, y);
                poly.point(endX, dy);
                poly.translate(area.x, area.y);

                startX = sx;
                endX = ex;
                dy = y;

                g.append(poly);
            }

            return g;
        }
    }

    PyramidBrush.setup = function() {
        return {
        }
    }

    return PyramidBrush;
}, "chart.brush.core");
