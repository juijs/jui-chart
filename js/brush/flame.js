jui.define("chart.brush.flame", [ "util.base", "chart.brush.treemap.nodemanager" ],
    function(_, NodeManager) {

    var TEXT_MARGIN = 3;

    /**
     * @class chart.brush.flame
     *
     * @extends chart.brush.core
     */
    var FlameBrush = function() {
        var self = this,
            g = null,
            height = 0,
            maxHeight = 0,
            nodes = new NodeManager();

        function createNodeElement(node, color) {
            var r = self.svg.rect({
                fill: self.color(color),
                stroke: self.chart.theme("flameNodeBorderColor"),
                "stroke-width": self.chart.theme("flameNodeBorderWidth"),
                width: node.width,
                height: node.height,
                x: node.x,
                y: node.y
            });

            // 마우스 오버 효과
            r.hover(function() {
                r.attr({ stroke: self.color(color) });
            }, function() {
                r.attr({ stroke: self.chart.theme("flameNodeBorderColor") });
            });

            // 노드 컬러 설정
            if(_.typeCheck("function", self.brush.nodeColor)) {
                var color = self.brush.nodeColor.call(self.chart, node);
                r.attr({ fill: self.color(color) });
            }

            // 노드 공통 이벤트 설정
            self.addEvent(r, node);

            return r;
        }

        function createTextElement(node) {
            if(!_.typeCheck("function", self.brush.format)) {
                return null;
            }

            var fontSize = self.chart.theme("flameTextFontSize"),
                startX = node.x;

            if(self.brush.textAlign == "middle") {
                startX += node.width / 2;
            } else if(self.brush.textAlign == "end") {
                startX += node.width - TEXT_MARGIN;
            } else {
                startX += TEXT_MARGIN;
            }

            var t = self.chart.text({
                "font-size": fontSize,
                "font-weight": "bold",
                fill: self.chart.theme("flameTextFontColor"),
                x: startX,
                y: node.y + fontSize,
                "text-anchor": self.brush.textAlign
            }, self.format(node));

            return t;
        }

        function drawNodeAll(g, node, width, sx) {
            var color = self.color(0);

            node.width = width;
            node.height = height;
            node.x = sx;

            // 노드 그리는 위치 설정
            if(self.brush.nodeOrient == "bottom") {
                node.y = maxHeight - (height * node.depth);
            } else {
                node.y = height * node.depth;
            }

            // 노드 컬러 설정
            if(_.typeCheck("function", self.brush.nodeColor)) {
                color = self.brush.nodeColor.call(self.chart, node);
            }

            var r = createNodeElement(node, color),
                t = createTextElement(node);

            for(var i = node.children.length - 1; i >= 0; i--) {
                var cNode = node.children[i],
                    rate = cNode.value / node.value,
                    cWidth = node.width * rate,
                    cStartX = node.x;

                if(self.brush.nodeAlign == "start") {
                    if(i < node.children.length - 1) {
                        cStartX += node.children[i + 1].width;
                    }
                } else {
                    cStartX += node.width - cWidth;

                    if(i < node.children.length - 1) {
                        cStartX -= node.children[i + 1].width;
                    }
                }

                drawNodeAll(g, cNode, cWidth, cStartX);
            }

            g.append(r);

            if(t != null) {
                g.append(t);
            }
        }

        function getMaxDepth(nodes) {
            var maxDepth = 0;

            for(var i = 0; i < nodes.length; i++) {
                maxDepth = Math.max(maxDepth, nodes[i].depth);
            }

            return maxDepth;
        }

        this.drawBefore = function() {
            g = this.svg.group();

            for(var i = 0; i < this.axis.data.length; i++) {
                var d = this.axis.data[i],
                    k = this.getValue(d, "index");

                nodes.insertNode(k, {
                    text: this.getValue(d, "text", ""),
                    value: this.getValue(d, "value", 0),
                    x: this.getValue(d, "x", 0),
                    y: this.getValue(d, "y", 0),
                    width: this.getValue(d, "width", 0),
                    height: this.getValue(d, "height", 0)
                });
            }

            var maxDepth = (this.brush.depth == null) ? getMaxDepth(nodes.getNodeAll()) : this.brush.depth;
            height = this.axis.area("height") / maxDepth;
            maxHeight = this.axis.area("height");
        }

        this.draw = function() {
            var area = this.axis.area();
            drawNodeAll(g, nodes.getNode()[0], area.width, area.x);

            return g;
        }
    }

    FlameBrush.setup = function() {
        return {
            depth: null,
            nodeOrient: "bottom",
            nodeAlign: "end",
            textAlign: "start",
            nodeColor: null,
            clip: false,
            format: null
        };
    }

    return FlameBrush;
}, "chart.brush.core");
