import jui from "../../main";

export default {
    name: "chart.brush.canvas.activecircle",
    extend: "chart.brush.canvas.core",
    component: function() {
        const CanvasUtil = jui.include("util.canvas.base");
        const ColorUtil = jui.include("util.color");

        const Circle = function(data, color) {
            this.radius = 1;                // 반지름
            this.position = [ 0, 0 ];       // 위치
            this.velocity = [ 0, 0 ];       // 속도
            this.acceleration = [ 0, 0 ];   // 가속도
            this.mass = 10;                 // 질량
            this.friction = 0.1;            // 마찰
            this.runtime = 0;               // 운동시간

            function hexToRgba(color, opacity) {
                const rgb = ColorUtil.rgb(color);
                return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
            }

            this.calcAcceleration = function(scale, fps, tpf) {
                if(this.acceleration[0] != 0) {
                    this.position[0] = scale.x(data.x + this.acceleration[0] * Math.pow(this.runtime, 2));
                }
                if(this.acceleration[1] != 0) {
                    this.position[1] = scale.y(data.y + this.acceleration[1] * Math.pow(this.runtime, 2));
                }
            }

            this.calcVelocity = function(scale, fps, tpf) {
                const distX = this.velocity[0] * tpf;
                const distY = this.velocity[1] * tpf;

                if(distY > 0) { // 아래서 위로
                    this.position[0] += (distX == 0) ? 0 : scale.x(distX);
                    this.position[1] -= (distY == 0) ? 0 : scale.y(scale.y.max() - distY);
                } else { // 위에서 아래로
                    this.position[0] -= (distX == 0) ? 0 : scale.x(-distX);
                    this.position[1] += (distY == 0) ? 0 : scale.y(scale.y.max() + distY);
                }
            }

            this.move = function(scale, fps, tpf) {
                if(tpf == 1) return;

                const pre_position = [ this.position[0], this.position[1] ];

                // 운동시간 누적
                this.runtime += 1 * tpf;

                // 1. 가속도 적용
                this.calcAcceleration(scale, fps, tpf);

                // 2. 평균속도 적용
                this.calcVelocity(scale, fps, tpf);

                console.log(`런타임: ${this.runtime}, 프레임 사이의 평균 속도: ${(this.position[0]-pre_position[0]) / tpf}M/s`);
            }

            this.stop = function() {
                this.velocity = [ 0, 0 ];
                this.acceleration = [ 0, 0 ];
            }

            this.draw = function(context) {
                const util = new CanvasUtil(context);

                context.shadowColor = hexToRgba(color, 0.3);
                context.shadowBlur = 10;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 10;
                context.globalAlpha = 1.0;

                util.drawCircle(this.position[0], this.position[1], this.radius, color);
            }
        }

        const CanvasActiveCircleBrush = function() {
            this.draw = function() {
                const fps = this.chart.getCache("fps", 1);
                const tpf = this.chart.getCache("tpf", 1);
                const circles = this.chart.getCache("active_circle", []);
                const maxX = this.axis.x(this.axis.x.max());

                if(circles.length == 0) {
                    this.eachData(function (data, i) {
                        const circle = new Circle(data, this.color(i));
                        circle.radius = data.radius || this.brush.radius;
                        circle.position = [ this.axis.x(data.x), this.axis.y(data.y) ];
                        circle.velocity = [ data.vx || 0, data.vy || 0 ];
                        circle.acceleration = [ data.ax || 0, data.ay || 0 ];
                        circles.push(circle);
                    });
                }

                for(let i = 0; i < circles.length; i++) {
                    const circle = circles[i];

                    // 차트 범위를 벗어났을 때에 대한 처리
                    if(circle.position[0] > maxX) {
                        circle.stop();
                    } else {
                        circle.move(this.axis, fps, tpf);
                    }

                    circle.draw(this.canvas);
                }

                this.chart.setCache("active_circle", circles);
            }
        }

        CanvasActiveCircleBrush.setup = function() {
            return {
                radius: 20
            }
        }

        return CanvasActiveCircleBrush;
    }
}