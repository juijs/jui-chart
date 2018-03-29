jui.define("chart.brush.canvas.dot3d", [ "util.base", "util.math", "chart.polygon.point" ],
    function(_, MathUtil, PointPolygon) {

    /**
     * @class chart.brush.canvas.dot3d
     * @extends chart.brush.canvas.core
     */
    var CanvasDot3DBrush = function () {
        this.createDot = function(data) {
            var color = this.color(this.brush.color),
                r = this.brush.size / 2,
                x = this.axis.x(data[0]),
                y = this.axis.y(data[1]),
                z = this.axis.z(data[2]);

            this.addPolygon(new PointPolygon(x, y, z), function(p) {
                var tx = p.vectors[0].x,
                    ty = p.vectors[0].y,
                    tr = r * MathUtil.scaleValue(z, 0, this.axis.depth, 1, p.perspective);

                this.canvas.beginPath();
                this.canvas.arc(tx, ty, tr, 0, 2 * Math.PI, false);
                this.canvas.fillStyle = color;
                this.canvas.fill();
            });
        }

        this.draw = function() {
            var datas = this.listData();

            for(var i = 0; i < datas.length; i++) {
                var data = datas[i];

                // 2d 데이터일 경우, z값을 추가해준다.
                if(data.length == 2) {
                    data.push(0);
                }

                this.createDot(data);
            }
        }
    }

    CanvasDot3DBrush.setup = function() {
        return {
            size: 5,
            color: 0
        };
    }

    return CanvasDot3DBrush;
}, "chart.brush.canvas.core");