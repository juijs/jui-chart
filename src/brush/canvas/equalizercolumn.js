import jui from '../../main.js';

export default {
    name: "chart.brush.canvas.equalizercolumn",
    extend: "chart.brush.canvas.core",
    component: function () {
        const _ = jui.include("util.base");

        const CanvasEqualizerColumnBrush = function() {
            let zeroY, bar_width, is_reverse;

            this.getTargetSize = function() {
                let width = this.axis.x.rangeBand();

                if(this.brush.size > 0) {
                    return this.brush.size;
                } else {
                    let size = width - this.brush.outerPadding * 2;
                    return (size < this.brush.minSize) ? this.brush.minSize : size;
                }
            }

            this.getBarElement = function(dataIndex, targetIndex) {
                let style = this.getBarStyle(),
                    color = this.color(targetIndex),
                    value = this.getData(dataIndex)[this.brush.target[targetIndex]],
                    active = this.brush.active,
                    opacity = 1;

                if ((_.typeCheck("array", active) && !active.includes(dataIndex)) ||
                    (_.typeCheck("integer", active) && active !== dataIndex)) {
                    opacity = style.disableOpacity;
                }

                return {
                    fill : color,
                    "fill-opacity": opacity,
                    stroke : style.borderColor,
                    "stroke-width" : style.borderWidth,
                    "stroke-opacity" : style.borderOpacity,
                    hidden: value == 0
                };
            }

            this.getBarStyle = function() {
                return {
                    borderColor: this.chart.theme("barBorderColor"),
                    borderWidth: this.chart.theme("barBorderWidth"),
                    borderOpacity: this.chart.theme("barBorderOpacity"),
                    borderRadius: this.chart.theme("barBorderRadius"),
                    disableOpacity: this.chart.theme("barDisableBackgroundOpacity"),
                    circleColor: this.chart.theme("barPointBorderColor")
                }
            }

            this.isErrorColumn = function(i) {
                const error = this.brush.error;

                if ((_.typeCheck("array", error) && !error.includes(i)) ||
                    (_.typeCheck("integer", error) && error !== i) || error === null) {
                    return false;
                }

                return true;
            }

            this.drawBefore = function() {
                zeroY = this.axis.y(0);
                bar_width = this.getTargetSize();
                is_reverse = this.axis.get("y").reverse;
            }

            this.draw = function() {
                const targets = this.brush.target,
                    padding = this.brush.innerPadding,
                    band = this.axis.y.rangeBand(),
                    unit = band / (this.brush.unit * padding),
                    height = unit + padding,
                    translateY = (is_reverse) ? 0 : -unit;

                this.eachData(function(data, i) {
                    let offsetX = this.offset("x", i),
                        startX = offsetX - bar_width / 2,
                        startY = this.axis.y(0),
                        y = startY,
                        value = 0,
                        stackList = [];

                    for(let j = 0; j < targets.length; j++) {
                        let yValue = data[targets[j]] + value,
                            endY = this.axis.y(yValue),
                            targetHeight = Math.abs(startY - endY),
                            targetY = targetHeight;

                        if (!this.isErrorColumn(i)) {
                            while(targetY >= height) {
                                let r = _.extend(this.getBarElement(i, j), {
                                    x : startX,
                                    y : y + translateY,
                                    width : bar_width,
                                    height : unit
                                });

                                targetY -= height;
                                y += (is_reverse) ? height : -height;

                                this.canvas.save();
                                this.canvas.globalAlpha = r["fill-opacity"];
                                this.canvas.beginPath();
                                this.canvas.fillStyle = r.fill;
                                this.canvas.strokeStyle = r.stroke;
                                this.canvas.strokeOpacity = r["stroke-opacity"];
                                this.canvas.lineWidth = r["stroke-width"];
                                this.canvas.rect(r.x, r.y, r.width, r.height);
                                this.canvas.fill();
                                this.canvas.restore();

                                stackList.push(r);
                            }
                        } else {
                            let size = Math.min(this.axis.x.rangeBand(), this.axis.area("height")) * 0.4;
                            let height = this.axis.area("height") * 0.5;
                            let tick = size * 0.3;
                            let startX = offsetX - size / 2;
                            let fontSize = height / 5;
                            let yt = y - tick;
                            let yht = y - height - tick;
                            let round = 5;

                            this.canvas.save();
                            this.canvas.beginPath();
                            this.canvas.fillStyle = this.chart.theme("equalizerColumnErrorBackgroundColor");
                            this.canvas.moveTo(offsetX, y);
                            this.canvas.lineTo(startX, yt);
                            this.canvas.lineTo(startX, yht + round);
                            this.canvas.arcTo(startX, yht, startX + round, yht, round);
                            this.canvas.lineTo(startX + size - round, yht);
                            this.canvas.arcTo(startX + size, yht, startX + size, yht + round, round);
                            this.canvas.lineTo(startX + size, yt);
                            this.canvas.fill();

                            this.canvas.save();
                            this.canvas.font = `${fontSize}px ${this.chart.theme("fontFamily")}`;
                            this.canvas.translate(offsetX, y - height - tick);
                            this.canvas.rotate(Math.PI / 2);
                            this.canvas.textAlign = "center";
                            this.canvas.fillStyle = this.chart.theme("equalizerColumnErrorFontColor");
                            this.canvas.fillText(this.brush.errorText, height / 1.75, fontSize / 3, height);

                            this.canvas.restore();
                        }

                        startY = endY;
                        value = yValue;
                    }

                    if(stackList.length > 0) {
                        this.chart.setCache(`equalizer_${i}`, stackList.length == 0 ? null : stackList[stackList.length - 1]);
                        this.chart.setCache(`raycast_area_${i}`, {
                            x1: stackList[0].x,
                            x2: stackList[0].x + stackList[0].width,
                            y2: this.axis.y(this.axis.y.min()),
                            y1: stackList[stackList.length - 1].y
                        });
                    }
                });

                this.drawAnimation();
            }

            this.drawAnimation = function() {
                const MAX_DISTANCE = 8; // 애니메이션 움직인 최대 반경 (0px ~ 10px)
                const UP_SEC_PER_MOVE = 20; // 초당 20픽셀 이동
                const DOWN_SEC_PER_MOVE = 30; // 초당 30픽셀 이동
                const TOP_PADDING = -3;
                const TOTAL_PADDING = -8;

                this.eachData(function (data, i) {
                    if (!this.isErrorColumn(i)) {
                        const r = this.chart.getCache(`equalizer_${i}`);
                        let total = 0;

                        for(let j = 0; j < this.brush.target.length; j++) {
                            total += data[this.brush.target[j]];
                        }

                        if(r != null) {
                            const tpf = this.chart.getCache(`tpf`, 1);
                            const status = this.chart.getCache(`equalizer_move_${i}`, { direction: -1, distance: 0 });
                            const speed = status.direction == -1 ? UP_SEC_PER_MOVE : DOWN_SEC_PER_MOVE;

                            status.distance += status.direction * speed * tpf;

                            // 애니메이션-바 방향 벡터 설정
                            if(Math.abs(status.distance) >= MAX_DISTANCE) {
                                status.direction = 1;
                            } else if(status.distance >= 0) {
                                status.direction = -1;
                            }

                            // 애니메이션-바 최소/최대 위치 설정
                            if(status.distance < -MAX_DISTANCE) {
                                status.distance = -MAX_DISTANCE;
                            } else if(status.distance > 0) {
                                status.distance = 0;
                            }

                            const ry = r.y + status.distance + TOP_PADDING;

                            this.canvas.save();
                            this.canvas.globalAlpha = r["fill-opacity"];
                            this.canvas.strokeStyle = r.fill;
                            this.canvas.lineWidth = r.height * 0.7;
                            this.canvas.beginPath();
                            this.canvas.moveTo(r.x, ry);
                            this.canvas.lineTo(r.x + r.width, ry);
                            this.canvas.closePath();
                            this.canvas.stroke();

                            this.canvas.fillStyle = this.chart.theme("barFontColor");
                            this.canvas.font = this.chart.theme("barFontSize") + "px";
                            this.canvas.textAlign = "center";
                            this.canvas.textBaseline = "middle";
                            this.canvas.fillText(total, r.x + r.width/2, ry + TOTAL_PADDING);
                            this.canvas.fill();
                            this.canvas.restore();

                            this.chart.setCache(`equalizer_move_${i}`, status);
                        }
                    }
                });
            }
        }

        CanvasEqualizerColumnBrush.setup = function() {
            return {
                /** @cfg {Number} [size=0] Set a fixed size of the bar. */
                size: 0,
                /** @cfg {Number} [minSize=0] Sets the minimum size as it is not possible to draw a bar when the value is 0. */
                minSize: 0,
                /** @cfg {Number} [outerPadding=15] Determines the outer margin of a stack bar. */
                outerPadding: 15,
                /** @cfg {Number} [innerPadding=1] Determines the inner margin of a bar. */
                innerPadding: 1,
                /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
                unit: 1,
                /** @cfg {Number | Array} [active=null] Activates the bar of an applicable index. */
                active: null,
                /** @cfg {Number | Array} [active=null] Activates the bar of an applicable index. */
                error: null,
                errorText: "Stopped"
            };
        }

        return CanvasEqualizerColumnBrush;
    }
}