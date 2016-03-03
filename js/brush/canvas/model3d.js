jui.define("chart.brush.canvas.model3d", [ "util.base", "util.math" ], function(_, MathUtil) {

    /**
     * @class chart.brush.canvas.model3d
     * @extends chart.brush.canvas.core
     */
    var CanvasModel3DBrush = function () {
        var data = null;

        this.drawBefore = function() {
            var Model3D = jui.include("chart.polygon." + this.brush.model);

            if(Model3D != null) {
                data = new Model3D();

                for (var i = 0, len = data.sources.length; i < len; i++) {
                    var x = this.axis.x(data.sources[i][0]),
                        y = this.axis.y(data.sources[i][1]),
                        z = this.axis.z(data.sources[i][2]);

                    data.vertices[i] = new Float32Array([x, y, z, 1])
                }
            }
        }

        this.draw = function() {
            if(data == null) return;

            this.canvas.lineWidth = 0.5;
            this.canvas.strokeStyle = this.color(0);
            this.canvas.beginPath();

            this.addPolygon(data, function(p) {
                var cache = [],
                    vertices = p.vertices,
                    faces = p.faces;

                for (var i = 0, len = vertices.length; i < len; i++) {
                    var v = vertices[i];
                    cache.push(new Float32Array([ v[0], v[1] ]));
                }

                for (var i = 0, len = faces.length; i < len; i++) {
                    var f = faces[i]

                    for (var j = 0, len2 = f.length; j < len2; j++) {
                        var targetPoint = cache[f[j]];

                        if (targetPoint) {
                            var x = targetPoint[0],
                                y = targetPoint[1];

                            if (j == 0) {
                                this.canvas.moveTo(x, y);
                            } else {
                                if (j == f.length - 1) {
                                    var firstPoint = cache[f[0]],
                                        x = firstPoint[0],
                                        y = firstPoint[1];

                                    this.canvas.lineTo(x, y);
                                } else {
                                    this.canvas.lineTo(x, y);
                                }
                            }
                        }
                    }
                }

                this.canvas.stroke();
                this.canvas.closePath();
            });
        }
    }

    CanvasModel3DBrush.setup = function() {
        return {
            model: null
        }
    }

    return CanvasModel3DBrush;
}, "chart.brush.canvas.core");