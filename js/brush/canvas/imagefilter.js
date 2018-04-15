jui.define("chart.brush.canvas.imagefilter", [ "util.math" ], function(_) {

    var ImageFilterBrush = function () {
        this.imageDataToRGBA = function(data, width) {
            var rowIndex = 0,
                colIndex = 0,
                r = [],
                g = [],
                b = [],
                a = [];

            for(var i = 0; i < data.length; i += 4) {
                if(colIndex == width) {
                    colIndex = 0;
                    rowIndex++;
                }

                if(!r[rowIndex]) r[rowIndex] = [];
                if(!g[rowIndex]) g[rowIndex] = [];
                if(!b[rowIndex]) b[rowIndex] = [];
                if(!a[rowIndex]) a[rowIndex] = [];

                if(this.brush.grayScale) {
                    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    r[rowIndex].push(avg);
                    g[rowIndex].push(avg);
                    b[rowIndex].push(avg);
                } else {
                    r[rowIndex].push(data[i]);
                    g[rowIndex].push(data[i + 1]);
                    b[rowIndex].push(data[i + 2]);
                }

                a[rowIndex].push(data[i + 3]);

                colIndex++;
            }

            return {
                r: r,
                g: g,
                b: b,
                a: a
            }
        }

        this.updateImage = function(rgba, width, height) {
            var x = this.axis.area("x"),
                y = this.axis.area("y"),
                image = this.canvas.createImageData(width, height),
                index = 0;

            for(var i = 0; i < height; i++) {
                for(var j = 0; j < width; j++) {
                    var r = rgba.r[i][j],
                        g = rgba.g[i][j],
                        b = rgba.b[i][j],
                        a = rgba.a[i][j];

                    image.data[index] = (r < 0) ? 0 : r;
                    index++;
                    image.data[index] = (g < 0) ? 0 : g;
                    index++;
                    image.data[index] = (b < 0) ? 0 : b;
                    index++;
                    image.data[index] = a;
                    index++;
                }
            }

            this.canvas.putImageData(image, x, y);
        }

        this.processImage = function(kernel) {
            var x = this.axis.area("x"),
                y = this.axis.area("y"),
                width = this.axis.area("width"),
                height = this.axis.area("height"),
                image = this.canvas.getImageData(x, y, width, height),
                obj = this.imageDataToRGBA(image.data, width),
                r = _.convMatrix(obj.r, kernel);

            this.updateImage({
                r: r,
                g: this.brush.grayScale ? r : _.convMatrix(obj.g, kernel),
                b: this.brush.grayScale ? r : _.convMatrix(obj.b, kernel),
                a: obj.a
            }, width, height);
        }

        this.draw = function() {
            var x = this.axis.area("x"),
                y = this.axis.area("y");

            this.eachData(function(img) {
                this.canvas.drawImage(img, x, y);
                this.processImage(this.brush.kernel);
            });
        }
    }

    ImageFilterBrush.setup = function() {
        return {
            grayScale: false,
            kernel: [
                [ 0, 0, 0 ],
                [ 0, 1, 0 ],
                [ 0, 0, 0 ]
            ]
        };
    }

    return ImageFilterBrush;
}, "chart.brush.canvas.core");