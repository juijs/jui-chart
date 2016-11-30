jui.define("chart.brush.flame", [ "util.base", "util.color", "chart.brush.treemap.nodemanager" ],
    function(_, ColorUtil, NodeManager) {

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
            nodes = new NodeManager(),
            disableOpacity = 1,
            newData = [],
            activeDepth = null;

        function getNodeAndTextOpacity(depth) {
            return (activeDepth == null) ? 1 : (depth < activeDepth) ? disableOpacity : 1;
        }

        function createNodeElement(node, color) {
            var newColor = self.chart.color(color);

            var r = self.svg.rect({
                fill: newColor,
                "fill-opacity": getNodeAndTextOpacity(node.depth),
                stroke: self.chart.theme("flameNodeBorderColor"),
                "stroke-width": self.chart.theme("flameNodeBorderWidth"),
                width: node.width,
                height: node.height,
                x: node.x,
                y: node.y,
                cursor: "pointer"
            });

            // 마우스 오버 효과
            r.hover(function() {
                r.attr({ stroke: newColor });
            }, function() {
                r.attr({ stroke: self.chart.theme("flameNodeBorderColor") });
            });

            // 노드 공통 이벤트 설정
            self.addEvent(r, node);

            // 노드 엘리먼트 캐싱
            node.element = {
                rect: r
            };

            return r;
        }

        function createTextElement(node, color) {
            if(!_.typeCheck("function", self.brush.format)) {
                return null;
            }

            var newColor = self.chart.color(color),
                fontSize = self.chart.theme("flameTextFontSize"),
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
                "fill-opacity": getNodeAndTextOpacity(node.depth),
                x: startX,
                y: node.y + (fontSize / 3) + (height / 2),
                "text-anchor": self.brush.textAlign,
                cursor: "pointer"
            }, self.format(node));

            // 마우스 오버 효과
            t.hover(function() {
                node.element.rect.attr({ stroke: newColor });
            }, function() {
                node.element.rect.attr({ stroke: self.chart.theme("flameNodeBorderColor") });
            });

            // 노드 공통 이벤트 설정
            self.addEvent(t, node);

            // 노드 엘리먼트 캐싱
            node.element.text = t;

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
                t = createTextElement(node, color);

            if(self.brush.nodeAlign == "start") {
                var cStartX = node.x;

                for (var i = 0; i < node.children.length; i++) {
                    var cNode = node.children[i],
                        cRate = cNode.value / node.value,
                        cWidth = node.width * cRate;

                    drawNodeAll(g, cNode, cWidth, cStartX);
                    cStartX += cWidth;
                }
            } else {
                var cStartX = node.x + node.width;

                for(var i = node.children.length - 1; i >= 0; i--) {
                    var cNode = node.children[i],
                        cRate = cNode.value / node.value,
                        cWidth = node.width * cRate;

                    cStartX -= cWidth;
                    drawNodeAll(g, cNode, cWidth, cStartX);
                }
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

        function createFilteredNodes(activeNode) {
            setCacheParents(activeNode, activeNode.value);
            setCacheChildren(activeNode);
            sortingCacheNodes();

            var tmpData = createIndexData(activeNode),
                tmpNodes = new NodeManager();

            for(var i = 0; i < tmpData.length; i++) {
                var d = tmpData[i];

                tmpNodes.insertNode(d.index, {
                    text: d.text,
                    value: d.value,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                });
            }

            // 필터링 된 노드 캐싱
            self.axis.cacheNodes = tmpNodes;

            return tmpNodes.getNode()[0];
        }

        function setCacheParents(node, value) {
            if(node.depth > 0) {
                node.value = value;
                newData.push(node);

                if(node.parent) {
                    setCacheParents(node.parent, value);
                }
            }
        }

        function setCacheChildren(node) {
            for(var i = 0; i < node.children.length; i++) {
                var cNode = node.children[i];
                newData.push(cNode);

                if(cNode.children.length > 0) {
                    setCacheChildren(cNode);
                }
            }
        }

        function sortingCacheNodes() {
            var qs = _.sort(newData);

            qs.setCompare(function(a, b) {
                return (a.depth < b.depth) ? true : false;
            });

            qs.run();
        }

        function createIndexData(node) {
            var tmpData = [], index = "";

            for(var i = 0; i < newData.length; i++) {
                if(index == "") {
                    index = "0";
                } else {
                    index += ".0";
                }

                if(newData[i].depth < node.depth) {
                    tmpData.push({
                        index: index,
                        text: newData[i].text,
                        value: newData[i].value
                    });
                } else {
                    createChildIndexData(node, index, tmpData);
                    break;
                }
            }

            return tmpData;
        }

        function createChildIndexData(node, index, result) {
            result.push({
                index: index,
                value: node.value,
                text: node.text
            });

            for(var i = 0; i < node.children.length; i++) {
                var cNode = node.children[i];
                createChildIndexData(cNode, index + "." + i, result);
            }
        }

        this.drawBefore = function() {
            g = this.svg.group();

            for (var i = 0; i < this.axis.data.length; i++) {
                var d = this.axis.data[i],
                    k = this.getValue(d, "index");

                nodes.insertNode(k, {
                    text: "" + this.getValue(d, "text", ""),
                    value: this.getValue(d, "value", 0),
                    x: this.getValue(d, "x", 0),
                    y: this.getValue(d, "y", 0),
                    width: this.getValue(d, "width", 0),
                    height: this.getValue(d, "height", 0)
                });
            }

            var maxDepth = (this.brush.maxDepth == null) ? getMaxDepth(nodes.getNodeAll()) : this.brush.maxDepth;
            height = this.axis.area("height") / maxDepth;
            maxHeight = this.axis.area("height");

            // 비활성화 노드 투명도
            disableOpacity = this.chart.theme("flameDisableBackgroundOpacity");
        }

        this.draw = function() {
            var area = this.axis.area(),
                root = nodes.getNode()[0],
                activeIndex = this.brush.activeIndex;

            if(root) {
                // 액티브 노드가 있을 경우, 노드 재정의
                if(_.typeCheck("string", activeIndex)) {
                    var activeNode = nodes.getNode(activeIndex);

                    if(activeNode == null) {
                        activeNode = this.axis.cacheNodes.getNode(activeIndex);
                    }

                    root = createFilteredNodes(activeNode);
                    activeDepth = activeNode.depth;
                }

                drawNodeAll(g, root, area.width, area.x);
            }

            return g;
        }
    }

    FlameBrush.setup = function() {
        return {
            maxDepth: null,
            nodeOrient: "bottom",
            nodeAlign: "end",
            textAlign: "start",
            nodeColor: null,
            activeIndex: null,
            clip: false,
            format: null
        };
    }

    return FlameBrush;
}, "chart.brush.core");
