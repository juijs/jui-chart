import JUI from '../../main.js';
import BubbleMod from './base/bubble.js';

JUI.use(BubbleMod);

class BubbleCloud {
    constructor(renderContext, contextWidth, contextHeight) {
        this.renderContext = renderContext;
        this.contextWidth = contextWidth;
        this.contextHeight = contextHeight;

        this.bubbles = {}; // [url: string]: Bubble<PopularPage>
        this.animationAlpha = 0.1;
        this.hoverBubble = null;
    }

    processData(nextData) {
        if (nextData == null) return;

        const Bubble = JUI.include("util.canvas.base.bubble");

        let count = nextData.reduce((a, b) => a + b.count, 0);
        let isChanged = false;

        for (const key in this.bubbles) this.bubbles[key].mark = false;

        const radiusSize = (c) => {
            let s = this.contextWidth > this.contextHeight ? this.contextHeight : this.contextWidth;
            return c / count * (s / 6) + 50;
        }

        nextData.forEach(e => {
            const bubble = this.bubbles[e.name];
            if (bubble == null) {
                let bubble = new Bubble(radiusSize(e.count), e.name, e.color, e.shadowColor, e.textColor, e.textStyle);
                bubble.data = e;
                bubble.mark = true;
                bubble.pos = [Math.random() * this.contextWidth, Math.random() * this.contextHeight];

                this.bubbles[e.name] = bubble;
                isChanged = true;
            } else {
                bubble.mark = true;
                const newRadius = radiusSize(e.count);

                if (Math.abs(bubble.radius - newRadius) > 20) {
                    bubble.radius = newRadius;
                    isChanged = true;
                }
            }
        });

        for (const key in this.bubbles) {
            const bubble = this.bubbles[key];
            // sweep
            if (!bubble.mark) {
                delete this.bubbles[key];
                isChanged = true;
            }
        }

        if (isChanged)
            this.animationAlpha = 0.1;
    }

    start(data) {
        this.bubbles = {};
        this.processData(data);
    }

    draw() {
        this.animationAlpha *= 0.99;

        const bubbles = Object.values(this.bubbles);
        if (this.animationAlpha < 0)
            this.animationAlpha = 0;

        const center = [this.contextWidth / 2, this.contextHeight / 2];
        for (let i = 0; i < bubbles.length; i++) {
            // force gravity
            const bubble = bubbles[i];
            const g = [center[0] - bubble.pos[0], center[1] - bubble.pos[1]];
            bubble.pos = [
                bubble.pos[0] + g[0] * this.animationAlpha,
                bubble.pos[1] + g[1] * this.animationAlpha,
            ];
        }

        const jitter = 0.5;
        const collisionPadding = 4;

        for (let i = 0; i < bubbles.length; i++) {
            // collapse testing
            for (let j = 0; j < bubbles.length; j++) {
                if (i == j) continue;
                const me = bubbles[i];
                const other = bubbles[j];
                const dist = me.distance(other);
                const minDist = me.radius + other.radius + collisionPadding;
                if (dist < minDist) {
                    const d = (dist - minDist) / dist * jitter;
                    const dx = (me.pos[0] - other.pos[0]) * d;
                    const dy = (me.pos[1] - other.pos[1]) * d;

                    me.pos[0] -= dx;
                    me.pos[1] -= dy;
                    other.pos[0] += dx;
                    other.pos[1] += dy;
                }
            }
        }

        const now = (new Date()).getTime();
        for (let i = 0; i < bubbles.length; i++) {
            const me = bubbles[i];
            me.update();
            if (this.hoverBubble && this.hoverBubble != me) {
                me.dim = true;
            } else
                me.dim = false;

            bubbles[i].draw(this.renderContext, now);
        }
    }

    pick(x, y) {
        let isHover = false;

        const bubbles = Object.values(this.bubbles);
        for (let i = 0; i < bubbles.length; i++) {
            const d = bubbles[i].distancePos([x, y])
            if (d < bubbles[i].radius) {
                this.hoverBubble = bubbles[i];
                isHover = true;
                break;
            }
        }

        if(!isHover)
            this.hoverBubble = null;

        return this.hoverBubble != null ? this.hoverBubble.data.origin : null;
    }
}

export default {
    name: "chart.brush.canvas.bubblecloud",
    extend: "chart.brush.canvas.core",
    component: function () {
        const ColorUtil = JUI.include("util.color");

        const CanvasBubbleCloudBrush = function() {
            function hexToRgba(color, opacity) {
                const rgb = ColorUtil.rgb(color);
                return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
            }

            this.draw = function() {
                let bubbleCloud = this.chart.getCache('bubble_cloud'),
                    bubbleData = this.chart.getCache('bubble_data');

                if(bubbleCloud != null && (bubbleData != null && bubbleData == this.axis.data)) {
                    bubbleCloud.draw();
                } else {
                    bubbleCloud = new BubbleCloud(this.canvas, this.axis.area('width'), this.axis.area('height'));

                    this.eachData(function(data, index) {
                        let color = this.color(index, null),
                            name = this.getValue(data, 'title', 'Unknown'),
                            count = this.getValue(data, 'capacity', 1);

                        let bubbleData = {
                            name: name,
                            count: count,
                            color: color,
                            shadowColor: hexToRgba(color, 0.2),
                            textColor: this.chart.theme('bubbleCloudFontColor'),
                            textStyle: `${this.chart.theme('bubbleCloudFontWeight')} ${this.chart.theme('bubbleCloudFontSize')}px ${this.chart.theme('fontFamily')}`,
                            origin: data
                        };

                        bubbleCloud.bubbles[name] = bubbleData;
                    });

                    bubbleCloud.start(Object.values(bubbleCloud.bubbles));
                    bubbleCloud.draw();

                    this.chart.setCache('picker', { obj: bubbleCloud, func: bubbleCloud.pick });
                    this.chart.setCache('bubble_cloud', bubbleCloud);
                    this.chart.setCache('bubble_data', this.axis.data);
                }
            }
        }

        return CanvasBubbleCloudBrush;
    }
}