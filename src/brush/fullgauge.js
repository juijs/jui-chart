import jui from '../main.js';
import DonutBrush from './donut.js';

jui.use(DonutBrush);

export default {
    name: 'chart.brush.fullgauge',
    extend: 'chart.brush.donut',
    component: function () {
        const math = jui.include('util.math');

        const FullGaugeBrush = function() {
            var group, w, centerX, centerY, outerRadius, innerRadius, textScale;

            this.createText = function(value, index, centerX, centerY, textScale) {
                var g = this.svg.group().translate(centerX, centerY),
                    size = this.chart.theme('gaugeFontSize');

                g.append(this.chart.text({
                    'text-anchor' : 'middle',
                    'font-size' : size,
                    'font-weight' : this.chart.theme('gaugeFontWeight'),
                    'fill' : this.color(index),
                    y: size / 3
                }, this.format(value, index)).scale(textScale));

                return g;
            }

            this.createTitle = function(title, index, centerX, centerY, dx, dy, textScale) {
                var g = this.svg.group().translate(centerX + dx, centerY + dy),
                    anchor = (dx == 0) ? 'middle' : ((dx < 0) ? 'end' : 'start'),
                    size = this.chart.theme('gaugeTitleFontSize');

                g.append(this.chart.text({
                    'text-anchor' : anchor,
                    'font-size' : size,
                    'font-weight' : this.chart.theme('gaugeTitleFontWeight'),
                    fill : this.chart.theme('gaugeTitleFontColor'),
                    y: size / 3
                }, title).scale(textScale));

                return g;
            }

            this.drawUnit = function(index, data) {
                var obj = this.axis.c(index),
                    value = this.getValue(data, 'value', 0),
                    title = this.getValue(data, 'title'),
                    max = this.getValue(data, 'max', 100),
                    min = this.getValue(data, 'min', 0);

                var startAngle = this.brush.startAngle;
                var endAngle = this.brush.endAngle;

                if (endAngle >= 360) {
                    endAngle = 359.99999;
                }

                var rate = (value - min) / (max - min),
                    currentAngle = endAngle * rate;

                if (currentAngle > endAngle) {
                    currentAngle = endAngle;
                }

                var width = obj.width,
                    height = obj.height,
                    x = obj.x,
                    y = obj.y;

                // center
                w = Math.min(width, height) / 2;
                centerX = width / 2 + x;
                centerY = height / 2 + y;
                outerRadius = w - this.brush.size;
                innerRadius = outerRadius - this.brush.size;
                textScale = math.scaleValue(w, 40, 400, 1, 1.5);

                // 심볼 타입에 따라 여백 각도 설정
                var paddingAngle = (this.brush.symbol == 'butt') ? this.chart.theme('gaugePaddingAngle') : 0;

                group.append(this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle + currentAngle + paddingAngle, endAngle - currentAngle - paddingAngle*2, {
                    stroke: this.chart.theme('gaugeBackgroundColor'),
                    fill: 'transparent'
                }));

                group.append(this.drawDonut(centerX, centerY, innerRadius, outerRadius, startAngle, currentAngle, {
                    stroke: this.color(index),
                    'stroke-linecap': this.brush.symbol,
                    fill: 'transparent'
                }));

                if(this.brush.showText) {
                    group.append(this.createText(value, index, centerX, centerY - (outerRadius * 0.1), textScale));
                }

                if(title != '') {
                    group.append(this.createTitle(title, index, centerX, centerY - (outerRadius * 0.1), this.brush.titleX, this.brush.titleY, textScale));
                }

                return group;
            }

            this.draw = function() {
                group = this.chart.svg.group();

                this.eachData(function(data, i) {
                    this.drawUnit(i, data);
                });

                return group;
            }
        }

        FullGaugeBrush.setup = function() {
            return {
                symbol: 'butt',

                /** @cfg {Number} [size=30] Determines the stroke width of a gauge.  */
                size: 60,
                /** @cfg {Number} [startAngle=0] Determines the start angle(as start point) of a gauge. */
                startAngle: 0,
                /** @cfg {Number} [endAngle=360] Determines the end angle(as draw point) of a gauge. */
                endAngle: 360,
                /** @cfg {Boolean} [showText=true] */
                showText: true,
                /** @cfg {Number} [titleX=0] */
                titleX: 0,
                /** @cfg {Number} [titleY=0]  */
                titleY: 0,
                /** @cfg {Function} [format=null] */
                format: null
            };
        }

        return FullGaugeBrush;
    }
}