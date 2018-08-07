import jui from '../../main.js';

export default {
    name: "chart.brush.polygon.column3d",
    extend: "chart.brush.polygon.core",
    component: function() {
        var ColorUtil = jui.include("util.color");
        var CubePolygon = jui.include("chart.polygon.cube");

        var PolygonColumn3DBrush = function() {
            var col_width, col_height;

            this.createColumn = function(data, target, dataIndex, targetIndex) {
                var w = col_width,
                    h = col_height,
                    x = this.axis.x(dataIndex) - w/2,
                    y = this.axis.y(data[target]),
                    yy = this.axis.y(0),
                    z = this.axis.z(targetIndex) - h/2,
                    color = this.color(targetIndex);

                return this.createPolygon(new CubePolygon(x, yy, z, w, y - yy, h), function(p) {
                    var g = this.svg.group();

                    for(var i = 0; i < p.faces.length; i++) {
                        var key = p.faces[i];

                        var face = this.svg.polygon({
                            fill: color,
                            "fill-opacity": this.chart.theme("polygonColumnBackgroundOpacity"),
                            stroke: ColorUtil.darken(color, this.chart.theme("polygonColumnBorderOpacity")),
                            "stroke-opacity": this.chart.theme("polygonColumnBorderOpacity")
                        });

                        for (var j = 0; j < key.length; j++) {
                            var vector = p.vectors[key[j]];
                            face.point(vector.x, vector.y);
                        }

                        g.append(face);
                    }

                    if(data[target] != 0) {
                        this.addEvent(g, dataIndex, targetIndex);
                    }

                    return g;
                });
            }

            this.drawBefore = function() {
                var padding = this.brush.padding,
                    width = this.axis.x.rangeBand(),
                    height = this.axis.z.rangeBand();

                col_width = (this.brush.width > 0) ? this.brush.width : width - padding * 2;
                col_height = (this.brush.height > 0) ? this.brush.height : height - padding * 2;
            }

            this.draw = function() {
                var g = this.chart.svg.group(),
                    datas = this.listData(),
                    targets = this.brush.target;

                for(var i = 0; i < datas.length; i++) {
                    for(var j = 0; j < targets.length; j++) {
                        g.append(this.createColumn(datas[i], targets[j], i, j));
                    }
                }

                return g;
            }
        }

        PolygonColumn3DBrush.setup = function() {
            return {
                /** @cfg {Number} [width=50]  Determines the size of a starter. */
                width: 0,
                /** @cfg {Number} [height=50]  Determines the size of a starter. */
                height: 0,
                /** @cfg {Number} [padding=20] Determines the outer margin of a bar.  */
                padding: 20,
                /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
                clip: false
            };
        }

        return PolygonColumn3DBrush;
    }
}