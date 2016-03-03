jui.define("chart.brush.canvas.scatter3d",
    [ "util.base", "util.math", "util.color", "chart.polygon.point" ],
    function(_, MathUtil, ColorUtil, PointPolygon) {

    /**
     * @class chart.brush.canvas.scatter3d
     * @extends chart.brush.canvas.core
     */
    var CanvasScatter3DBrush = function () {
        this.createScatter = function(data, target, dataIndex, targetIndex) {
            var color = this.color(dataIndex, targetIndex),
                r = this.brush.size / 2,
                x = this.axis.x(dataIndex),
                y = this.axis.y(data[target]),
                z = this.axis.z(dataIndex);

            this.addPolygon(new PointPolygon(x, y, z), function(p) {
                var tx = p.vectors[0].x,
                    ty = p.vectors[0].y,
                    tr = r * MathUtil.scaleValue(z, 0, this.axis.depth, 1, p.perspective),
                    tc = ColorUtil.lighten(color, this.chart.theme("polygonScatterRadialOpacity"));

                var grd = this.canvas.createRadialGradient(tx, ty, tr / 2, tx, ty, tr);
                grd.addColorStop(0, color);
                grd.addColorStop(1, tc);

                this.canvas.beginPath();
                this.canvas.arc(tx, ty, tr, 0, 2 * Math.PI, false);
                this.canvas.fillStyle = grd;
                this.canvas.fill();
            });
        }

        this.draw = function() {
            var datas = this.listData(),
                targets = this.brush.target;

            for(var i = 0; i < datas.length; i++) {
                for(var j = 0; j < targets.length; j++) {
                    this.createScatter(datas[i], targets[j], i, j);
                }
            }
        }
    }

    CanvasScatter3DBrush.setup = function() {
        return {
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7
        };
    }

    return CanvasScatter3DBrush;
}, "chart.brush.canvas.core");