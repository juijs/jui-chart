export default {
    name: "util.canvas.base.kinetic",
    extend: null,
    component: function () {
        const KineticObject = function() {
            this.mass = 10;
            this.friction = 0.1;
            this.pos = [0, 0];
            this.veloc = [0, 0];
            this.accel = [0, 0];

            this.force = function(f) {
                this.accel = [
                    this.accel[0] + f[0] / this.mass,
                    this.accel[1] + f[1] / this.mass,
                ];
            }

            this.accelScalar = function() {
                return Math.sqrt(this.accel[0] * this.accel[0] + this.accel[1] * this.accel[1])
            }

            this.velocScalar = function() {
                return Math.sqrt(this.veloc[0] * this.veloc[0] + this.veloc[1] * this.veloc[1])
            }

            this.velocityForce = function() {
                const xDir = this.veloc[0] < 0 ? -1 : 1;
                const yDir = this.veloc[1] < 0 ? -1 : 1;
                return [
                    xDir * 0.5 * this.mass * this.veloc[0] * this.veloc[0],
                    yDir * 0.5 * this.mass * this.veloc[1] * this.veloc[1],
                ];
            }

            this.distancePos = function(pos) {
                return Math.sqrt(
                    Math.pow(this.pos[0] - pos[0], 2) +
                    Math.pow(this.pos[1] - pos[1], 2)
                );
            }

            this.distance = function(other) {
                return this.distancePos(other.pos);
            }

            this.direction = function(pos) {
                const distance = this.distancePos(pos);
                if (distance == 0) return [0, 0];
                return [
                    (this.pos[0] - pos[0]) / distance,
                    (this.pos[1] - pos[1]) / distance,
                ];
            }

            this.speed = function() {
                return Math.sqrt(Math.pow(this.veloc[0], 2) + Math.pow(this.veloc[1], 2))
            }

            this.update = function() {
                this.veloc = [
                    this.veloc[0] + this.accel[0],
                    this.veloc[1] + this.accel[1],
                ];

                let x = this.pos[0];
                let y = this.pos[1];

                if (Math.abs(this.veloc[0]) > 2) {
                    x = this.pos[0] + this.veloc[0];
                }
                if (Math.abs(this.veloc[1]) > 2) {
                    y = this.pos[1] + this.veloc[1];
                }

                this.pos = [x, y];
                this.accel = [0, 0];
            }

            this.draw = function(context, n) {

            }
        }

        return KineticObject;
    }
}