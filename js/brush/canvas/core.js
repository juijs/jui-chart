jui.define("chart.brush.canvas.core", [ "util.base" ], function(_) {
    var CanvasCoreBrush = function() {
        this.addPolygon = function(polygon, callback) {
            if(!_.typeCheck("array", this.polygons)) {
                this.polygons = [];
            }

            // 폴리곤 각도 및 깊이 연산
            this.calculate3d(polygon);

            // 연산된 폴리곤 객체 추가
            this.polygons.push({
                polygon: polygon,
                order: this.axis.depth - polygon.max().z,
                handler: callback
            });
        }

        this.drawAfter = function() {
            // 폴리곤 기반의 브러쉬일 경우
            if(_.typeCheck("array", this.polygons)) {
                var list = this.polygons;

                list.sort(function(a, b) {
                    return a.order - b.order;
                });

                for(var i = 0, len = list.length; i < len; i++) {
                    var p = list.shift();
                    p.handler.call(this, p.polygon);
                }
            }
        }
    }

    return CanvasCoreBrush;
}, "chart.brush.core");