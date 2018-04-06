jui.define("chart.polygon.face", [], function() {
    var FacePolygon = function(x1, y1, d1, x2, y2, d2, oy) {
        this.vertices = [
            new Float32Array([ x1, y1, d1, 1 ]),
            new Float32Array([ x2, y2, d2, 1 ]),
            new Float32Array([ x2, oy, d2, 1 ]),
            new Float32Array([ x1, oy, d2, 1 ])
        ];

        this.vectors = [];
    }

    return FacePolygon;
}, "chart.polygon.core");

jui.define("chart.brush.canvas.dot3d",
    [ "util.base", "util.math", "chart.polygon.point", "chart.polygon.line", "chart.polygon.face" ],
    function(_, MathUtil, PointPolygon, LinePolygon, FacePolygon) {

    /**
     * @class chart.brush.canvas.dot3d
     * @extends chart.brush.canvas.core
     */
    var CanvasDot3DBrush = function () {
        var firstCacheData = null;

        this.createDot = function(color, r, data) {
            var x = this.axis.x(data[0]),
                y = this.axis.y(data[1]),
                z = this.axis.z(data[2]);

            this.addPolygon(new PointPolygon(x, y, z), function (p) {
                var tx = p.vectors[0].x,
                    ty = p.vectors[0].y,
                    tr = r * MathUtil.scaleValue(z, 0, this.axis.depth, 1, p.perspective);

                this.drawDot(color, tx, ty, tr);
            });
        }

        this.createLine = function(color, r, data, pdata, isLast) {
            var x = this.axis.x(data[0]),
                y = this.axis.y(data[1]),
                z = this.axis.z(data[2]),
                px = this.axis.x(pdata == null ? data[0] : pdata[0]),
                py = this.axis.y(pdata == null ? data[1] : pdata[1]),
                pz = this.axis.z(pdata == null ? data[2] : pdata[2]);

            this.addPolygon(new LinePolygon(px, py, pz, x, y, z), function (p) {
                var x1 = p.vectors[0].x,
                    y1 = p.vectors[0].y,
                    x2 = p.vectors[1].x,
                    y2 = p.vectors[1].y;

                this.drawLine(color, x1, y1, x2, y2, r, isLast);
            });
        }

        this.createArea = function(color, r, data, pdata) {
            var oy = this.axis.y(0),
                x = this.axis.x(data[0]),
                y = this.axis.y(data[1]),
                z = this.axis.z(data[2]),
                px = this.axis.x(pdata == null ? data[0] : pdata[0]),
                py = this.axis.y(pdata == null ? data[1] : pdata[1]),
                pz = this.axis.z(pdata == null ? data[2] : pdata[2]);

            this.addPolygon(new FacePolygon(px, py, pz, x, y, z, oy), function (p) {
                var x1 = p.vectors[0].x,
                    y1 = p.vectors[0].y,
                    x2 = p.vectors[1].x,
                    y2 = p.vectors[1].y,
                    x3 = p.vectors[2].x,
                    y3 = p.vectors[2].y,
                    x4 = p.vectors[3].x,
                    y4 = p.vectors[3].y;

                this.drawArea(color, x1, y1, x2, y2, x3, y3, x4, y4);
            });
        }

        this.drawDot = function(color, tx, ty, tr) {
            this.canvas.beginPath();
            this.canvas.arc(tx, ty, tr, 0, 2 * Math.PI, false);
            this.canvas.fillStyle = color;
            this.canvas.fill();
        }

        this.drawLine = function(color, x1, y1, x2, y2, width, isLast) {
            var isFill = this.brush.symbol == "poly";

            if(isFill && firstCacheData == null) {
                firstCacheData = arguments;
            }

            this.canvas.beginPath();
            this.canvas.moveTo(x1, y1);
            this.canvas.lineTo(x2, y2);
            this.canvas.lineWidth = width;
            this.canvas.strokeStyle = color;
            this.canvas.stroke();

            if(isLast) {
                if(isFill && firstCacheData != null) {
                    this.canvas.lineTo(firstCacheData[1], firstCacheData[2]);
                    this.canvas.fillStyle = firstCacheData[0];
                    this.canvas.fill();
                }

                this.canvas.closePath();
            }
        }

        this.drawArea = function(color, x1, y1, x2, y2, x3, y3, x4, y4) {
            this.canvas.beginPath();
            this.canvas.moveTo(x1, y1);
            this.canvas.lineTo(x2, y2);
            this.canvas.lineTo(x3, y3);
            this.canvas.lineTo(x4, y4);
            this.canvas.lineTo(x1, y1);
            this.canvas.strokeStyle = color;
            this.canvas.stroke();
            this.canvas.fillStyle = color;
            this.canvas.fill();
            this.canvas.closePath();
        }

        this.draw = function() {
            var symbol = this.brush.symbol,
                color = this.color(this.brush.color),
                r = this.brush.size / 2,
                datas = this.listData();

            for(var i = 0; i < datas.length; i++) {
                var data = datas[i];

                // 2d 데이터일 경우, z값을 추가해준다.
                if(data.length == 2) {
                    data.push(0);
                }

                if(symbol == "line" || symbol == "poly") {
                    this.createLine(color, r, data, (i == 0) ? null : datas[i - 1], (i == data.length-1));
                } else if(symbol == "area") {
                    this.createArea(color, r, data, (i == 0) ? null : datas[i - 1]);
                } else {
                    this.createDot(color, r, data);
                }
            }
        }
    }

    CanvasDot3DBrush.setup = function() {
        return {
            size: 4,
            color: 0,
            symbol: "dot" // or line, area, poly
        };
    }

    return CanvasDot3DBrush;
}, "chart.brush.canvas.core");