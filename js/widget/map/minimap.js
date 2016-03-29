jui.define("chart.widget.map.minimap", [ "util.base", "chart.builder" ], function(_, builder) {

    /**
     * @class chart.widget.map.minimap
     * @extends chart.widget.map.core
     */
    var MapMinimapWidget = function() {
        var self = this;

        var viewX = 0,
            viewY = 0,
            scale = 0;

        this.getScaleXY = function(axis) { // 차후에 공통 함수로 변경해야 함
            var s = axis.map.scale(),
                w = axis.get("map").width,
                h = axis.get("map").height,
                px = ((w * s) - w) / 2,
                py = ((h * s) - h) / 2;

            return {
                x: px,
                y: py
            }
        }

        this.createMapImage = function() {
            var map = this.axis.get("map"),
                scale = this.widget.scale;

            var image = builder(null, {
                width : map.width * scale,
                height : map.height * scale,
                padding : 0,
                axis : [{
                    map : {
                        path : map.path,
                        width : map.width,
                        height : map.height,
                        scale : scale
                    }
                }],
                style : {
                    backgroundColor : "transparent",
                    mapPathBackgroundColor : this.chart.theme("mapMinimapPathBackgroundColor"),
                    mapPathBackgroundOpacity : this.chart.theme("mapMinimapPathBackgroundOpacity"),
                    mapPathBorderColor : this.chart.theme("mapMinimapPathBorderColor"),
                    mapPathBorderWidth : this.chart.theme("mapMinimapPathBorderWidth"),
                    mapPathBorderOpacity : this.chart.theme("mapMinimapPathBorderOpacity")
                }
            });

            var dxy = this.getScaleXY(image.axis(0));
            image.axis(0).map.view(-dxy.x, -dxy.y);

            return this.svg.image({
                width: map.width * scale,
                height: map.height * scale,
                "xlink:href": image.svg.toDataURI()
            });
        }

        this.createCtrlButton = function(attr) {
            var area = this.axis.get("area"),
                map = this.axis.get("map"),
                startX, startY, moveX = 0, moveY = 0;

            var xy = this.getScaleXY(this.axis),
                w = attr.width / scale,
                h = attr.height / scale,
                x = (xy.x / scale) * this.widget.scale,
                y = (xy.y / scale) * this.widget.scale,
                dx = (viewX / scale) * this.widget.scale,
                dy = (viewY / scale) * this.widget.scale;

            // 차트 크기에 대한 스케일
            w = w * (area.width / map.width);
            h = h * (area.height / map.width);

            var rect = this.svg.rect({
                stroke: this.chart.theme("mapMinimapDragBorderColor"),
                "stroke-width": this.chart.theme("mapMinimapDragBorderWidth"),
                fill: this.chart.theme("mapMinimapDragBackgroundColor"),
                "fill-opacity": this.chart.theme("mapMinimapDragBackgroundOpacity"),
                cursor: "move",
                width: w,
                height: h,
                x: x + dx,
                y: y + dy
            });

            // 드래그 이벤트 정의
            rect.on("mousedown", function(e) {
                if(startX || startY) return;

                startX = e.x - moveX;
                startY = e.y - moveY;
            });

            rect.on("mousemove", moveButton);
            rect.on("mouseup", endMoveButton);
            rect.on("mouseout", endMoveButton);

            function moveButton(e) {
                if(!startX || !startY) return;

                var sx = e.x - startX,
                    sy = e.y - startY,
                    tx = sx + x + dx,
                    ty = sy + y + dy;

                if(tx >= 0 && ty >= 0 && tx + w < attr.width && ty + h < attr.height) {
                    moveX = sx;
                    moveY = sy;

                    rect.translate(moveX, moveY);
                }
            }

            function endMoveButton(e) {
                if(!startX || !startY) return;

                startX = null;
                startY = null;

                var newViewX = (moveX * scale) / self.widget.scale + viewX,
                    newViewY = (moveY * scale) / self.widget.scale + viewY;

                self.axis.updateGrid("map", {
                    viewX: newViewX,
                    viewY: newViewY
                });

                self.axis.map.view(newViewX, newViewY);

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!self.chart.isRender()) {
                    self.chart.render();
                }
            }

            return rect;
        }

        this.drawBefore = function() {
            viewX = this.axis.map.view().x;
            viewY = this.axis.map.view().y;
            scale = this.axis.map.scale();
        }

        this.draw = function() {
            var g = this.svg.group(),
                map = this.createMapImage(),
                btn = this.createCtrlButton(map.attributes),
                dx = (this.widget.align == "start") ? 0 : this.chart.area("width") - map.attributes.width,
                dy = (this.widget.orient == "bottom") ? this.chart.area("height") - map.attributes.height : 0;

            g.append(this.svg.rect({
                x: 0,
                y: 0,
                width: map.attributes.width,
                height: map.attributes.height,
                fill: this.chart.theme("mapMinimapBackgroundColor"),
                stroke: this.chart.theme("mapMinimapBorderColor"),
                "stroke-width": this.chart.theme("mapMinimapBorderWidth")
            }));

            g.append(map);
            g.append(btn);
            g.translate(dx + this.widget.dx, dy + this.widget.dy);

            return g;
        }
    }

    MapMinimapWidget.setup = function() {
        return {
            align : "end",
            orient : "top",
            scale : 0.2,
            dx : -1,
            dy : 1
        }
    }

    return MapMinimapWidget;
}, "chart.widget.map.core");