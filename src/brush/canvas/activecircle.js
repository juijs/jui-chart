import jui from "../../main";

export default {
    name: "chart.brush.canvas.activecircle",
    extend: "chart.brush.canvas.core",
    component: function() {
        const CanvasUtil = jui.include("util.canvas.base");
        const ColorUtil = jui.include("util.color");

        const Circle = function(context, scale, color, xValue, yValue) {
            this.radius = 1;                // 반지름
            this.position = [ 0, 0 ];       // 위치
            this.velocity = [ 0, 0 ];       // 속도
            this.acceleration = [ 0, 0 ];   // 가속도

            this.gravity = -9.8;            // 중력
            this.mass = 1;                  // 질량
            this.weight = 1;                // 무게
            this.friction = 0.1;            // 마찰
            this.runtime = 0;               // 운동시간

            function hexToRgba(color, opacity) {
                const rgb = ColorUtil.rgb(color);
                return `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
            }

            this.checkForMotion = function(angle, fric_coeff) {
                const weight = this.massToWeight(this.mass, this.gravity);

                // 경사면에서 물체에 작용하는 수직항력을 계산
                const normal = weight * Math.cos(angle * Math.PI / 180);

                // 경사면에 평행하게 물체에 작용하는 힘을 계산
                const perpForce = weight * Math.sin(angle * Math.PI / 180);

                // 물체가 정지해 있도록 하는 마찰력을 계산
                const stat_friction = fric_coeff * normal;

                console.log(`무게: ${weight}, 수직항력: ${-normal}, 힘: ${perpForce}, 정지마찰력: ${stat_friction}`);
                return perpForce > stat_friction;
            }

            this.calcAcceleration = function(angle, fric_coeff) {
                const weight = this.massToWeight(this.mass, this.acceleration[1])

                // 경사면에서 물체에 작용하는 수직항력을 계산
                const normal = weight * Math.cos(angle * Math.PI / 180);

                // 경사면에 평행하게 물체에 작용하는 힘을 계산
                const perpForce = weight * Math.sin(angle * Math.PI / 180);

                // 물체가 정지해 있도록 하는 마찰력을 계산
                const kin_friction = fric_coeff * normal;

                // 물체에 작용하는 힘의 합을 계산
                const total_force = perpForce - kin_friction;

                return total_force / this.mass;
            }

            this.poundToWeight = function(pound) {
                return pound * (1 / 0.2248);
            }

            this.weightToPound = function(weight) {
                return weight * (0.2248 / 1);
            }

            this.massToWeight = function(mass) {
                return mass * this.gravity;
            }

            this.weightToMass = function(weight) {
                return weight / this.gravity;
            }

            this.updateAcceleration = function() {
                const vx = this.velocity[0] * this.runtime;
                const vy = this.velocity[1] * this.runtime;
                const ax = this.acceleration[0] * Math.pow(this.runtime, 2);
                const ay = this.acceleration[1] * Math.pow(this.runtime, 2);

                this.position[0] = scale.x(xValue + vx + ax);
                this.position[1] = scale.y(yValue + vy + ay);
            }

            this.move = function(fps, tpf) {
                if(tpf == 1) return;

                const pre_position = [ this.position[0], this.position[1] ];

                // 운동시간 누적
                this.runtime += 1 * tpf;

                // 평균속도+가속도 적용
                this.updateAcceleration();

                console.log(`런타임: ${this.runtime}, 프레임 사이의 평균 속도: ${(this.position[1]-pre_position[1]) / tpf}M/s`);
            }

            this.stop = function() {
                this.velocity = [ 0, 0 ];
                this.acceleration = [ 0, 0 ];
            }

            this.draw = function() {
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
            this.checkWallCollision = function(circle) {
                const minX = this.axis.x(this.axis.x.min());
                const maxX = this.axis.x(this.axis.x.max());
                const minY = this.axis.y(this.axis.y.min());
                const maxY = this.axis.y(this.axis.y.max());

                if(circle.position[0] - circle.radius < minX ||
                    circle.position[0] + circle.radius > maxX ||
                    circle.position[1] - circle.radius < maxY ||
                    circle.position[1] + circle.radius > minY) {
                    return true;
                }

                return false;
            }

            this.draw = function() {
                const fps = this.chart.getCache("fps", 1);
                const tpf = this.chart.getCache("tpf", 1);
                const circles = this.chart.getCache("active_circle", []);

                if(circles.length == 0) {
                    this.eachData(function (data, i) {
                        const circle = new Circle(this.canvas, this.axis, this.color(i), data.x, data.y);
                        circle.radius = data.radius || this.brush.radius;
                        circle.position = [ this.axis.x(data.x), this.axis.y(data.y) ];
                        circle.velocity = [ data.vx || 0, data.vy || 0 ];
                        circle.acceleration = [ data.ax || 0, data.ay || 0 ];
                        circles.push(circle);
                    });
                }

                for(let i = 0; i < circles.length; i++) {
                    const circle = circles[i];

                    // if(circle.checkForMotion(30, 1)) {
                    //     circle.acceleration[1] = circle.calcAcceleration(90, 1);
                        circle.move(fps, tpf);
                    // }

                    circle.draw();
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