jui.define("chart.topology.edge", [], function() {

    /**
     * @class chart.topology.edge
     *
     */
    var TopologyEdge = function(start, end, in_xy, out_xy, scale) {
        var connect = false, element = null;

        this.key = function() {
            return start + ":" + end;
        }

        this.reverseKey = function() {
            return end + ":" + start;
        }

        this.connect = function(is) {
            if(arguments.length == 0) {
                return connect;
            }

            connect = is;
        }

        this.element = function(elem) {
            if(arguments.length == 0) {
                return element;
            }

            element = elem;
        }

        this.set = function(type, value) {
            if(type == "start") start = value;
            else if(type == "end") end = value;
            else if(type == "in_xy") in_xy = value;
            else if(type == "out_xy") out_xy = value;
            else if(type == "scale") scale = value;
        }

        this.get = function(type) {
            if(type == "start") return start;
            else if(type == "end") return end;
            else if(type == "in_xy") return in_xy;
            else if(type == "out_xy") return out_xy;
            else if(type == "scale") return scale;
        }
    }

    return TopologyEdge;
});

jui.define("chart.topology.edgemanager", [ "util.base" ], function(_) {

    /**
     * @class chart.topology.edgemanager
     *
     */
    var TopologyEdgeManager = function() {
        var list = [],
            cache = {};

        this.add = function(edge) {
            cache[edge.key()] = edge;
            list.push(edge);
        }

        this.get = function(key) {
            return cache[key];
        }

        this.is = function(key) {
            return (cache[key]) ? true : false;
        }

        this.list = function() {
            return list;
        }

        this.each = function(callback) {
            if(!_.typeCheck("function", callback)) return;

            for(var i = 0; i < list.length; i++) {
                callback.call(this, list[i]);
            }
        }
    }

    return TopologyEdgeManager;
});

jui.define("chart.brush.topologynode",
    [ "util.base", "util.math", "chart.topology.edge", "chart.topology.edgemanager" ],
    function(_, math, Edge, EdgeManager) {

    /**
     * @class chart.brush.topologynode
     * @extends chart.brush.core
     */
    var TopologyNode = function() {
        var self = this,
            edges = new EdgeManager(),
            g, tooltip, point,
            textY = 14, padding = 7, anchor = 7,
            activeEdges = [];  // 선택된 엣지 객체

        function getDistanceXY(x1, y1, x2, y2, dist) {
            var a = x1 - x2,
                b = y1 - y2,
                c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
                dist = (!dist) ? 0 : dist,
                angle = math.angle(x1, y1, x2, y2);

            return {
                x: x1 + Math.cos(angle) * (c + dist),
                y: y1 + Math.sin(angle) * (c + dist),
                angle: angle,
                distance: c
            }
        }

        function getNodeData(key) {
            for(var i = 0; i < self.axis.data.length; i++) {
                var d = self.axis.data[i],
                    k = self.getValue(d, "key");

                if(k == key) {
                    return self.axis.data[i];
                }
            }

            return null;
        }

        function getEdgeData(key) {
            for(var i = 0; i < self.brush.edgeData.length; i++) {
                if(self.brush.edgeData[i].key == key) {
                    return self.brush.edgeData[i];
                }
            }

            return null;
        }

        function getTooltipData(edge) {
            for(var j = 0; j < self.brush.edgeData.length; j++) {
                if(edge.key() == self.brush.edgeData[j].key) {
                    return self.brush.edgeData[j];
                }
            }

            return null;
        }

        function getTooltipTitle(key) {
            var names = [],
                keys = key.split(":");

            self.eachData(function(data, i) {
                var title = _.typeCheck("function", self.brush.nodeTitle) ? self.brush.nodeTitle.call(self.chart, data) : "";

                if(data.key == keys[0]) {
                    names[0] = title || data.key;
                }

                if(data.key == keys[1]) {
                    names[1] = title || data.key;
                }
            });

            if(names.length > 0) return names;
            return key;
        }

        function getNodeRadius(data) {
            var r = self.chart.theme("topologyNodeRadius"),
                scale = 1;

            if(_.typeCheck("function", self.brush.nodeScale) && data) {
                scale = self.brush.nodeScale.call(self.chart, data);
                r = r * scale;
            }

            return {
                r: r,
                scale: scale
            }
        }

        function getEdgeOpacity(data) {
            var opacity = self.chart.theme("topologyEdgeOpacity");

            if(_.typeCheck("function", self.brush.edgeOpacity) && data) {
                opacity = self.brush.edgeOpacity.call(self.chart, data);
            }

            return opacity;
        }

        function createNodes(index, data) {
            var key = self.getValue(data, "key"),
                xy = self.axis.c(index),
                color = self.color(index, 0),
                title = _.typeCheck("function", self.brush.nodeTitle) ? self.brush.nodeTitle.call(self.chart, data) : "",
                text =_.typeCheck("function", self.brush.nodeText) ? self.brush.nodeText.call(self.chart, data) : "",
                size = getNodeRadius(data);

            var node = self.svg.group({
                index: index
            }, function() {
                if(_.typeCheck("function", self.brush.nodeImage)) {
                    self.svg.image({
                        "xlink:href": self.brush.nodeImage.call(self.chart, data),
                        width: (size.r * 2) * xy.scale,
                        height: (size.r * 2) * xy.scale,
                        x: -size.r,
                        y: -size.r,
                        cursor: "pointer"
                    });
                } else {
                    self.svg.circle({
                        "class": "circle",
                        r: size.r * xy.scale,
                        fill: color,
                        cursor: "pointer"
                    });
                }

                if(text && text != "") {
                    var fontSize = self.chart.theme("topologyNodeFontSize");

                    self.chart.text({
                        "class": "text",
                        x: 0.1 * xy.scale,
                        y: (size.r / 2) * xy.scale,
                        fill: self.chart.theme("topologyNodeFontColor"),
                        "font-size": fontSize * size.scale * xy.scale,
                        "text-anchor": "middle",
                        cursor: "pointer"
                    }, text);
                }

                if(title && title != "") {
                    self.chart.text({
                        "class": "title",
                        x: 0.1 * xy.scale,
                        y: (size.r + 13) * xy.scale,
                        fill: self.chart.theme("topologyNodeTitleFontColor"),
                        "font-size": self.chart.theme("topologyNodeTitleFontSize") * xy.scale,
                        "font-weight": "bold",
                        "text-anchor": "middle",
                        cursor: "pointer"
                    }, title);
                }
            }).translate(xy.x, xy.y);

            node.on(self.brush.activeEvent, function(e) {
                onNodeActiveHandler(data);
                self.chart.emit("topology.nodeclick", [ data, e ]);
            });

            // 맨 앞에 배치할 노드 체크
            if(self.axis.cache.nodeKey == key) {
                node.order = 1;
            }

            // 노드에 공통 이벤트 설정
            self.addEvent(node, index, null);

            return node;
        }

        function createEdges() {
            edges.each(function(edge) {
                var in_xy = edge.get("in_xy"),
                    out_xy = edge.get("out_xy");

                var node = self.svg.group();
                node.append(createEdgeLine(edge, in_xy, out_xy));
                node.append(createEdgeText(edge, in_xy, out_xy));

                g.append(node);
            });
        }

        function createEdgeLine(edge, in_xy, out_xy) {
            var g = self.svg.group(),
                size = self.chart.theme("topologyEdgeWidth"),
                opacity = getEdgeOpacity(getEdgeData(edge.key()));

            if(!edge.connect()) {
                g.append(self.svg.line({
                    cursor: "pointer",
                    x1: in_xy.x,
                    y1: in_xy.y,
                    x2: out_xy.x,
                    y2: out_xy.y,
                    stroke: self.chart.theme("topologyEdgeColor"),
                    "stroke-width": size * edge.get("scale"),
                    "stroke-opacity": opacity,
                    "shape-rendering": "geometricPrecision"
                }));
            } else {
                var reverseElem = edges.get(edge.reverseKey()).element();

                reverseElem.get(0).attr({ "stroke-opacity": opacity });
                reverseElem.get(1).attr({ "fill-opacity": opacity });
            }

            g.append(self.svg.circle({
                fill: self.chart.theme("topologyEdgeColor"),
                "fill-opacity": opacity,
                stroke: self.chart.theme("backgroundColor"),
                "stroke-width": (size * 2) * edge.get("scale"),
                r: point * edge.get("scale"),
                cx: out_xy.x,
                cy: out_xy.y
            }));

            g.on(self.brush.activeEvent, function(e) {
                onEdgeActiveHandler(edge);
            });

            g.on("mouseover", function(e) {
                onEdgeMouseOverHandler(edge);
            });

            g.on("mouseout", function(e) {
                onEdgeMouseOutHandler(edge);
            });

            edge.element(g);

            return g;
        }

        function createEdgeText(edge, in_xy, out_xy) {
            var text = null;
            var edgeAlign = (out_xy.x > in_xy.x) ? "end" : "start",
                edgeData = getEdgeData(edge.key());

            if(edgeData != null) {
                var edgeText = _.typeCheck("function", self.brush.edgeText) ? self.brush.edgeText.call(self.chart, edgeData, edgeAlign) : null;

                if (edgeText != null) {
                    if (edgeAlign == "end") {
                        text = self.svg.text({
                            x: out_xy.x - 9,
                            y: out_xy.y + 13,
                            cursor: "pointer",
                            fill: self.chart.theme("topologyEdgeFontColor"),
                            "font-size": self.chart.theme("topologyEdgeFontSize") * edge.get("scale"),
                            "text-anchor": edgeAlign
                        }, edgeText)
                            .rotate(math.degree(out_xy.angle), out_xy.x, out_xy.y);
                    } else {
                        text = self.svg.text({
                            x: out_xy.x + 8,
                            y: out_xy.y - 7,
                            cursor: "pointer",
                            fill: self.chart.theme("topologyEdgeFontColor"),
                            "font-size": self.chart.theme("topologyEdgeFontSize") * edge.get("scale"),
                            "text-anchor": edgeAlign
                        }, edgeText)
                            .rotate(math.degree(in_xy.angle), out_xy.x, out_xy.y);
                    }

                    text.on(self.brush.activeEvent, function (e) {
                        onEdgeActiveHandler(edge);
                    });

                    text.on("mouseover", function (e) {
                        onEdgeMouseOverHandler(edge);
                    });

                    text.on("mouseout", function (e) {
                        onEdgeMouseOutHandler(edge);
                    });
                }
            }

            return text;
        }

        function setDataEdges(index, targetIndex) {
            var data = self.getData(index),
                key = self.getValue(data, "key"),
                targetKey = self.getValue(data, "outgoing", [])[targetIndex];

            // 자신의 키와 동일한지 체크
            if(key == targetKey) return;

            var targetData = getNodeData(targetKey),
                target = self.axis.c(targetKey),
                xy = self.axis.c(index),
                in_dist = (getNodeRadius(data).r + point + 1) * xy.scale,
                out_dist = (getNodeRadius(targetData).r + point + 1) * xy.scale,
                in_xy = getDistanceXY(target.x, target.y, xy.x, xy.y, -in_dist),
                out_xy = getDistanceXY(xy.x, xy.y, target.x, target.y, -out_dist),
                edge = new Edge(key, targetKey, in_xy, out_xy, xy.scale);

            if(edges.is(edge.reverseKey())) {
                edge.connect(true);
            }

            edges.add(edge);
        }

        function showTooltip(edge, e) {
            if(!_.typeCheck("function", self.brush.tooltipTitle) ||
                !_.typeCheck("function", self.brush.tooltipText)) return;

            var rect = tooltip.get(0),
                text = tooltip.get(1);

            // 텍스트 초기화
            rect.attr({ points: "" });
            text.element.textContent = "";

            var edge_data = getTooltipData(edge),
                in_xy = edge.get("in_xy"),
                out_xy = edge.get("out_xy"),
                align = (out_xy.x > in_xy.x) ? "end" : "start";

            // 커스텀 이벤트 발생
            self.chart.emit("topology.edgeclick", [ edge_data, e ]);

            if(edge_data != null) {
                // 엘리먼트 생성 및 추가
                var title = document.createElementNS("http://www.w3.org/2000/svg", "tspan"),
                    contents = document.createElementNS("http://www.w3.org/2000/svg", "tspan"),
                    y = (padding * 2) + ((align == "end") ? anchor : 0);

                text.element.appendChild(title);
                text.element.appendChild(contents);

                title.setAttribute("x", padding);
                title.setAttribute("y", y);
                title.setAttribute("font-weight", "bold");
                title.textContent = self.brush.tooltipTitle.call(self.chart, getTooltipTitle(edge_data.key), align);

                contents.setAttribute("x", padding);
                contents.setAttribute("y", y + textY + (padding / 2));
                contents.textContent = self.brush.tooltipText.call(self.chart, edge_data, align);

                // 엘리먼트 위치 설정
                var size = text.size(),
                    w = size.width + padding * 2,
                    h = size.height + padding * 2,
                    x = out_xy.x - (w / 2) + (anchor / 2) + (point / 2);

                text.attr({ x: w / 2 });
                rect.attr({ points: self.balloonPoints((align == "end") ? "bottom" : "top", w, h, anchor) });
                tooltip.attr({ visibility: "visible" });

                if(align == "end") {
                    tooltip.translate(x, out_xy.y + (anchor / 2) + point);
                } else {
                    tooltip.translate(x, out_xy.y - anchor - h + point);
                }
            }
        }

        function onNodeActiveHandler(data) {
            var color = self.chart.theme("topologyEdgeColor"),
                activeColor = self.chart.theme("topologyActiveEdgeColor"),
                size = self.chart.theme("topologyEdgeWidth"),
                activeSize = self.chart.theme("topologyActiveEdgeWidth");

            activeEdges = [];
            for(var i = 0; i < data.outgoing.length; i++) {
                var key = data.key + ":" + data.outgoing[i],
                    edge = edges.get(key);

                if(edge != null) {
                    activeEdges.push(edge);
                    if (edge.connect()) { // 같이 연결된 노드도 추가
                        activeEdges.push(edges.get(edge.reverseKey()));
                    }
                }
            }

            edges.each(function(edge) {
                var elem = edge.element(),
                    circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                    line = (elem.children.length == 2) ? elem.get(0) : null;

                if(_.inArray(edge, activeEdges) != -1) { // 연결된 엣지
                    var lineAttr = { stroke: activeColor, "stroke-width": activeSize * edge.get("scale") },
                        circleAttr = { fill: activeColor };

                    if(line != null) {
                        line.attr(lineAttr);
                    }
                    circle.attr(circleAttr);

                    tooltip.attr({ visibility: "hidden" });
                } else { // 연결되지 않은 엣지
                    if(line != null) {
                        line.attr({ stroke: color, "stroke-width": size * edge.get("scale") });
                    }
                    circle.attr({ fill: color });
                }
            });
        }

        function onEdgeActiveHandler(edge) {
            edges.each(function(newEdge) {
                var elem = newEdge.element(),
                    circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                    line = (elem.children.length == 2) ? elem.get(0) : null,
                    color = self.chart.theme("topologyEdgeColor"),
                    activeColor = self.chart.theme("topologyActiveEdgeColor"),
                    size = self.chart.theme("topologyEdgeWidth"),
                    activeSize = self.chart.theme("topologyActiveEdgeWidth");

                if(edge != null && (edge.key() == newEdge.key() || edge.reverseKey() == newEdge.key())) {
                    if(line != null) {
                        line.attr({ stroke: activeColor, "stroke-width": activeSize * newEdge.get("scale") });
                    }
                    circle.attr({ fill: activeColor });

                    // 툴팁에 보여지는 데이터 설정
                    if(edge.key() == newEdge.key()) {
                        // 엣지 툴팁 보이기
                        showTooltip(edge);
                    }

                    activeEdges = [ edge ];
                    if(edge.connect()) { // 같이 연결된 노드도 추가
                        activeEdges.push(edges.get(edge.reverseKey()));
                    }
                } else {
                    if(line != null) {
                        line.attr({ stroke: color, "stroke-width": size * newEdge.get("scale") });
                    }
                    circle.attr({ fill: color });
                }
            });
        }

        function onEdgeMouseOverHandler(edge) {
            if(_.inArray(edge, activeEdges) != -1) return;

            var elem = edge.element(),
                circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                line = (elem.children.length == 2) ? elem.get(0) : null,
                color = self.chart.theme("topologyHoverEdgeColor"),
                size = self.chart.theme("topologyHoverEdgeWidth");

            if(line != null) {
                line.attr({
                    stroke: color,
                    "stroke-width": size * edge.get("scale")
                });
            }

            circle.attr({
                fill: color
            });
        }

        function onEdgeMouseOutHandler(edge) {
            if(_.inArray(edge, activeEdges) != -1) return;

            var elem = edge.element(),
                circle = (elem.children.length == 2) ? elem.get(1) : elem.get(0),
                line = (elem.children.length == 2) ? elem.get(0) : null,
                color = self.chart.theme("topologyEdgeColor"),
                size = self.chart.theme("topologyEdgeWidth");

            if(line != null) {
                line.attr({
                    stroke: color,
                    "stroke-width": size * edge.get("scale")
                });
            }

            circle.attr({
                fill: color
            });
        }

        this.drawBefore = function() {
            g = self.svg.group();
            point = self.chart.theme("topologyEdgePointRadius");

            tooltip = self.svg.group({
                visibility: "hidden"
            }, function() {
                self.svg.polygon({
                    fill: self.chart.theme("topologyTooltipBackgroundColor"),
                    stroke: self.chart.theme("topologyTooltipBorderColor"),
                    "stroke-width": 1
                });

                self.chart.text({
                    "font-size": self.chart.theme("topologyTooltipFontSize"),
                    "fill": self.chart.theme("topologyTooltipFontColor"),
                    y: textY
                });
            });
        }

        this.draw = function() {
            var nodes = [];

            this.eachData(function(data, i) {
                for(var j = 0; j < data.outgoing.length; j++) {
                    setDataEdges(i, j);
                }
            });

            // 엣지 그리기
            createEdges();

            // 노드 그리기
            this.eachData(function(data, i) {
                var node = createNodes(i, data);
                g.append(node);

                nodes[i] = { node: node, data: data };
            });

            // 툴팁 숨기기 이벤트 (차트 배경 클릭시)
            this.on("axis.mousedown", function(e) {
                if(self.axis.root.element == e.target) {
                    onEdgeActiveHandler(null);
                    tooltip.attr({ visibility: "hidden" });
                }
            });

            // 액티브 엣지 선택 (렌더링 이후에 설정)
            if(_.typeCheck("string", self.brush.activeEdge)) {
                this.on("render", function(init) {
                    if(!init) {
                        var edge = edges.get(self.brush.activeEdge);
                        onEdgeActiveHandler(edge);
                    }
                });
            }

            // 액티브 노드 선택 (렌더링 이후에 설정)
            if(_.typeCheck("string", self.brush.activeNode)) {
                this.on("render", function(init) {
                    if(!init) {
                        onNodeActiveHandler(getNodeData(self.brush.activeNode));
                    }
                });
            }

            return g;
        }
    }

    TopologyNode.setup = function() {
        return {
            /** @cfg {Boolean} [clip=true] If the brush is drawn outside of the chart, cut the area. */
            clip: true,

            // topology options
            /** @cfg {Function} [nodeTitle=null] */
            nodeTitle: null,
            /** @cfg {Function} [nodeText=null] */
            nodeText: null,
            /** @cfg {Function} [nodeImage=null] */
            nodeImage: null,
            /** @cfg {Function} [nodeScale=null] */
            nodeScale: null,

            /** @cfg {Array} [edgeData=[]] */
            edgeData: [],
            /** @cfg {String} [edgeText=null] */
            edgeText: null,
            /** @cfg {Function} [edgeText=null] */
            edgeOpacity: null,

            /** @cfg {Function} [tooltipTitle=null] */
            tooltipTitle: null,
            /** @cfg {Function} [tooltipText=null] */
            tooltipText: null,

            /** @cfg {String} [activeNode=null] */
            activeNode: null,
            /** @cfg {String} [activeEdge=null] */
            activeEdge: null,
            /** @cfg {String} [activeEvent="click"] */
            activeEvent: "click"
        }
    }

    /**
     * @event topoloygy_nodeclick
     * Event that occurs when click on the topology node. (real name ``` topoloygy.nodeclick ```)
     * @param {Object} data The node data.
     * @param {jQueryEvent} e The event object.
     */

    /**
     * @event topoloygy_edgeclick
     * Event that occurs when click on the topology edge. (real name ``` topoloygy.edgeclick ```)
     * @param {Object} data The edge data.
     * @param {jQueryEvent} e The event object.
     */

    return TopologyNode;
}, "chart.brush.core");