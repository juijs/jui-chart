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
                zkey = this.brush.zkey,
                r = this.brush.size / 2,
                x = this.axis.x(dataIndex),
                y = this.axis.y(data[target]),
                z = null;

            if(_.typeCheck("function", zkey)) {
                var zk = zkey.call(this.chart, data);
                z = this.axis.z(zk);
            } else {
                z = this.axis.z(data[zkey]);
            }

            this.addPolygon(new PointPolygon(x, y, z), function(p) {
                this.canvas.beginPath();
                this.canvas.arc(p.vectors[0].x, p.vectors[0].y, r * MathUtil.scaleValue(z, 0, this.axis.depth, 1, p.perspective), 0, 2 * Math.PI, false);
                this.canvas.fillStyle = color;
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
            zkey: null,

            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7
        };
    }

    return CanvasScatter3DBrush;
}, "chart.brush.canvas.core");