import JUI from '../../main.js';
import MortalBubbleMod from './base/mortalbubble.js';

JUI.use(MortalBubbleMod);

class ActiveBubble {
    constructor(renderContext, contextWidth, contextHeight, gravity) {
        this.renderContext = renderContext;
        this.contextWidth = contextWidth;
        this.contextHeight = contextHeight;

        this.gravity = gravity;
        this.data = []; // MortalBubble
        this.isArrange = false;
    }

    preCheck() {
        for (let i = 0; i < this.data.length; i++) {
            const bubble = this.data[i];
            if(!bubble.active) {
                this.data[i] = null;
                this.data.splice(i, 1);
            }
        }

        return this.data.length > 0;
    }

    draw() {
        if(!this.preCheck()) return;

        let collisions = [],
            dups = [];

        for (let i = 0; i < this.data.length; i++) {
            // force gravity
            const bubble = this.data[i];
            const gDirection = [1, 0];
            bubble.force([
                gDirection[0] * bubble.mass * this.gravity,
                gDirection[1] * bubble.mass * this.gravity,
            ]);

            bubble.update();
        }

        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data.length; j++) {
                if (i == j) continue;
                const me = this.data[i];
                const other = this.data[j];
                const dist = me.distance(other);
                const radiusSum = me.radius + other.radius;
                if (radiusSum - dist > 1) {
                    collisions.push([me, other]);
                }
            }
        }

        if(collisions.length == 0) {
            this.isArrange = true;
        }

        for (let i = 0; i < collisions.length - 1; i++) {
            const me = collisions[i];
            for (let j = i + 1; j < collisions.length; j++) {
                const other = collisions[j];
                if (
                    (me[0] == other[0] && me[1] == other[1]) ||
                    (me[1] == other[0] && me[0] == other[1])
                ) {
                    dups.push(j);
                }
            }
        }

        for (let i = 0; i < collisions.length; i++) {
            if (dups.indexOf(i) != -1) continue;

            const collision = collisions[i];
            const me = collision[0];
            const other = collision[1];
            const radiusSum = me.radius + other.radius;
            const dist = me.distance(other);
            let normal = [other.pos[0] - me.pos[0], other.pos[1] - me.pos[1]];
            const len = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
            normal = [normal[0] / len, normal[1] / len];
            const size = radiusSum - dist;
            if (other.pos[0] == me.pos[0] && other.pos[1] == me.pos[1]) {
                normal = [0, -1];
            }

            me.pos = [
                -size / 2 * normal[0] + me.pos[0],
                -size / 2 * normal[1] + me.pos[1],
            ];

            other.pos = [
                size / 2 * normal[0] + other.pos[0],
                size / 2 * normal[1] + other.pos[1],
            ];

            // const c = 0.01;
            const meForce = [
                normal[0] * me.accel[0],
                normal[1] * me.accel[1],
            ];
            const otherForce = [
                normal[0] * other.accel[0],
                normal[1] * other.accel[1],
            ];

            if (me.pos[0] < other.pos[0]) {
                me.veloc = [me.veloc[0] * 0.7, me.veloc[1] * 0.99];
                me.force([-otherForce[0], -otherForce[1]]);
            } else {
                if(this.isArrange) {
                    me.veloc = [
                        other.pos[0] > me.pos[0] ? -1 : 1,
                        other.pos[1] > me.pos[1] ? -1 : 1
                    ];
                    me.force([-meForce[0], -meForce[1]]);
                }

                other.veloc = [other.veloc[0] * 0.7, other.veloc[1] * 0.99];
                other.force([-meForce[0], -meForce[1]]);
            }
        }

        const now = (new Date()).getTime();
        for (let i = 0; i < this.data.length; i++) {
            const me = this.data[i];

            if (me.pos[0] > this.contextWidth) {
                me.pos[0] = this.contextWidth;
            }
            if (me.pos[1] > this.contextHeight) {
                me.pos[1] = this.contextHeight;
            } else if (me.pos[1] < 0) {
                me.pos[1] = 0;
            }

            this.data[i].draw(this.renderContext, now);
        }
    }
}

export default {
    name: "chart.brush.canvas.activebubble",
    extend: "chart.brush.canvas.core",
    component: function () {
        const MortalBubble = JUI.include("util.canvas.base.mortalbubble");
        const ColorUtil = JUI.include("util.color");

        const CanvasActiveBubbleBrush = function() {
            function hexToRgba(color, opacity) {
                const rgb = ColorUtil.rgb(color);
                return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
            }

            this.drawBefore = function() {
                const activeBubbleCount = this.chart.getCache('active_bubble_count', 0);
                const dataCount = this.axis.data.length;

                if(this.chart.getCache('active_bubble') == null) {
                    this.chart.setCache( 'active_bubble', new ActiveBubble(
                        this.canvas, this.axis.area('width'), this.axis.area('height'), this.brush.gravity) )
                }

                if(activeBubbleCount != dataCount) {
                    const activeBubble = this.chart.getCache('active_bubble');
                    activeBubble.isArrange = false;

                    this.chart.setCache('active_bubble_count', dataCount);
                }
            }

            this.draw = function() {
                const activeBubble = this.chart.getCache('active_bubble');

                let index = 0;
                while(this.axis.data.length > 0) {
                    let color = this.color(index),
                        data = this.axis.data.shift(),
                        startTime = this.getValue(data, "startTime", Date.now()),
                        duration = this.getValue(data, "duration", 1000);

                    activeBubble.data.push(new MortalBubble(startTime, duration, this.brush.radius,
                        hexToRgba(color, this.brush.opacity), hexToRgba(color, 0.2)));
                    index++;
                }

                activeBubble.draw();
            }
        }

        CanvasActiveBubbleBrush.setup = function() {
            return {
                gravity: 0.2,
                radius: 20,
                opacity: 1
            }
        }

        return CanvasActiveBubbleBrush;
    }
}