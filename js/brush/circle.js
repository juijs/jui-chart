jui.define("chart.brush.circle", ["util.base"], function(_) {

    /**
     * @class chart.brush.circle
     * @extends chart.brush.core
     */
	var CircleBrush = function(chart, axis, brush) {
        var group;
        var w, centerX, centerY, outerRadius;


        this.circle = function (opt, per, angle) {
            var options = _.extend({ r : 10 , cx : 10, cy : 10,  'stroke-width' : 1, fill : 'transparent' }, opt);

            var strokeDashArray = 2 * Math.PI * options.r;
            var line = strokeDashArray * (per || 1);
            angle = angle || 0;


            options['stroke-dasharray'] = [line, strokeDashArray - line].join(" ");
            return this.svg.circle(options).rotate(angle, opt.cx, opt.cy);
        }

        this.drawUnit = function(i, data) {
            var obj = axis.c(i),
                value = this.getValue(data, "value", 0),
                max = this.getValue(data, "max", 100),
                min = this.getValue(data, "min", 0);

            var rate = (value - min) / (max - min),
                width = obj.width,
                height = obj.height,
                x = obj.x,
                y = obj.y;

            // center
            w = Math.min(width, height) / 2;
            centerX = width / 2 + x;
            centerY = height / 2 + y;
            outerRadius = w;

            var r = outerRadius - this.brush.externalSize/2;

            var color = this.color(i);

            // 위에 껍데기
            group.append(this.circle({
                cx : centerX,
                cy : centerY,
                r : r,
                stroke : color,
                "stroke-width" : this.brush.externalSize
            }));


            // gauge
            r -= this.brush.dist*2 + this.brush.size/2;
            group.append(this.circle({
                cx : centerX,
                cy : centerY,
                r : r ,
                stroke : color,
                "stroke-width" : this.brush.size
            }, rate, -90 + this.brush.rotate));

            r += this.brush.size/6;

            // gauge background
            group.append(this.circle({
                cx : centerX,
                cy : centerY,
                r : r,
                stroke : color,
                "stroke-width" : 2
            }));

            var fontSize = r;

            group.append(this.chart.text(_.extend({
                x : centerX,
                y : centerY,
                fill : color,
                'font-size' : fontSize,
                'text-anchor' : 'middle',
                'alignment-baseline' : 'central'
            }), value));

        };
        
		this.draw = function() {
            group = chart.svg.group();

            this.eachData(function(data, i) {
                this.drawUnit(i, data);
            });

            return group;
		}
	}

    CircleBrush.setup = function() {
        return {
            /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip: false,

            /** @cfg {Number} [size=1] set gauge stroke width  */
            size : 20,

            /** @cfg {Number} [dist=2] set dist between circle and gauge  */
            dist : 2,

            /** @cfg {Number} [externalSize=1] set circle stroke width   */
            externalSize : 4,

            /** @cfg {Number} [rotate=0] set rotate to gauge   */
            rotate : 0,
        }
    }

	return CircleBrush;
}, "chart.brush.core");
