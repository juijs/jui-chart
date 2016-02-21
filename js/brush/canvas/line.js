jui.define("chart.brush.canvas.line", ["util.base"], function(_) {

    /**
     * @class chart.brush.canvas.line
     * @extends chart.brush.canvas.core
     */
	var LineBrush = function() {
        this.drawLine = function(data, previousData, target, dataIndex, targetIndex) {
            var symbol = this.brush.symbol,
                // type = (_.typeCheck("function", symbol)) ? symbol.apply(this.chart, [ target, data[target] ]) : symbol,
                color = this.color(dataIndex, targetIndex),
                previousX = this.axis.x(dataIndex - 1),
                previousY = this.axis.y(previousData[target]),
                x = this.axis.x(dataIndex),
                y = this.axis.y(data[target]);

            this.canvas.beginPath();
            this.canvas.moveTo(previousX, previousY);
            this.canvas.lineTo(x, y);
            this.canvas.closePath();
            this.canvas.lineWidth = 2;
            this.canvas.strokeStyle = color;
            this.canvas.stroke();

            console.log(dataIndex, targetIndex)
        }

        this.draw = function() {
            var datas = this.listData(),
                targets = this.brush.target;

            for(var i = 1; i < datas.length; i++) {
                for(var j = 0; j < targets.length; j++) {
                    // this.createScatter(datas[i], targets[j], i, j);
                    this.drawLine(datas[i], datas[i-1], targets[j], i, j);
                }
            }
        }
	}

    LineBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step). */
            symbol: "normal", // normal, curve, step
            /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
            active: null,
            /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null,
            /** @cfg {"max"/"min"/"all"} [display=null]  Shows a tool tip on the bar for the minimum/maximum value.  */
            display: null,
            /** @cfg {"circle"/"triangle"/"rectangle"/"cross"/"callback"} [symbol="circle"] Determines the shape of a (circle, rectangle, cross, triangle).  */
            symbol: "circle",
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7,
        };
    }

	return LineBrush;
}, "chart.brush.canvas.core");