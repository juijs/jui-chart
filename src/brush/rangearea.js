export default {
    name: "chart.brush.rangearea",
    extend: "chart.brush.core",
    component: function() {
        var RangeAreaBrush = function() {

            this.draw = function() {
                var g = this.svg.group(),
                    targets = this.brush.target,
                    datas = this.axis.data,
                    isRangeY = (this.axis.y.type == "range");

                for(var i = 0; i < targets.length; i++) {
                    var p = this.svg.polygon({
                        fill: this.color(i),
                        "fill-opacity": this.chart.theme("areaBackgroundOpacity"),
                        "stroke-width": 0
                    });

                    for(var j = 0; j < datas.length; j++) {
                        var value = datas[j][targets[i]];

                        if(isRangeY) {
                            p.point(this.axis.x(j), this.axis.y(value[0]));
                        } else {
                            p.point(this.axis.x(value[0]), this.axis.y(j));
                        }
                    }

                    for(var j = datas.length - 1; j >= 0; j--) {
                        var value = datas[j][targets[i]];

                        if(isRangeY) {
                            p.point(this.axis.x(j), this.axis.y(value[1]));
                        } else {
                            p.point(this.axis.x(value[1]), this.axis.y(j));
                        }
                    }

                    g.append(p);
                }

                return g;
            }
        }

        return RangeAreaBrush;
    }
}