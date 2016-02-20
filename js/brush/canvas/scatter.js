jui.define("chart.brush.canvas.scatter", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.canvas.scatter
     * @extends chart.brush.canvas.core
     */
    var CanvasScatterBrush = function () {
        this.createScatter = function(data, target, dataIndex, targetIndex) {
            var symbol = this.brush.symbol,
                type = (_.typeCheck("function", symbol)) ? symbol.apply(this.chart, [ target, data[target] ]) : symbol,
                color = this.color(dataIndex, targetIndex),
                r = this.brush.size / 2,
                x = this.axis.x(dataIndex),
                y = this.axis.y(data[target]);

            if(type == "circle") {
                this.canvas.fillStyle = color;
                this.canvas.beginPath();
                this.canvas.arc(x, y, r, 0, 2 * Math.PI, false);
                this.canvas.fill();
                this.canvas.closePath();
            } else if(type == "rect" || type == "rectangle") {
                this.canvas.fillStyle = color;
                this.canvas.fillRect(x - r, y - r, r * 2, r * 2);
            } else if(type == "triangle") {
                this.canvas.fillStyle = color;
                this.canvas.beginPath();
                this.canvas.moveTo(x, y - r);
                this.canvas.lineTo(x - r, y + r);
                this.canvas.lineTo(x + r, y + r);
                this.canvas.lineTo(x, y - r);
                this.canvas.fill();
                this.canvas.closePath();
            } else if(type == "cross") {
                this.canvas.strokeStyle = color;
                this.canvas.beginPath();
                this.canvas.moveTo(x - r, y - r);
                this.canvas.lineTo(x + r, y + r);
                this.canvas.stroke();
                this.canvas.closePath();
                this.canvas.beginPath();
                this.canvas.moveTo(x + r, y - r);
                this.canvas.lineTo(x - r, y + r);
                this.canvas.stroke();
                this.canvas.closePath();
            }
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

        CanvasScatterBrush.setup = function() {
        return {
            /** @cfg {"circle"/"triangle"/"rectangle"/"cross"/"callback"} [symbol="circle"] Determines the shape of a (circle, rectangle, cross, triangle).  */
            symbol: "circle",
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7
        };
    }

    return CanvasScatterBrush;
}, "chart.brush.canvas.core");