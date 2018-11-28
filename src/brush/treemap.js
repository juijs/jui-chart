import jui from '../main.js';

jui.define("util.keyparser", [], function() {
    return function () {

        /**
         * @method isIndexDepth
         *
         * @param {String} index
         * @return {Boolean}
         */
        this.isIndexDepth = function (index) {
            if (typeof(index) == "string" && index.indexOf(".") != -1) {
                return true;
            }

            return false;
        }

        /**
         * @method getIndexList
         *
         * @param {String} index
         * @return {Array}
         */
        this.getIndexList = function (index) { // 트리 구조의 모든 키를 배열 형태로 반환
            var resIndex = [],
                strIndexes = ("" + index).split(".");

            for(var i = 0; i < strIndexes.length; i++) {
                resIndex[i] = parseInt(strIndexes[i]);
            }

            return resIndex;
        }

        /**
         * @method changeIndex
         *
         *
         * @param {String} index
         * @param {String} targetIndex
         * @param {String} rootIndex
         * @return {String}
         */
        this.changeIndex = function (index, targetIndex, rootIndex) {
            var rootIndexLen = this.getIndexList(rootIndex).length,
                indexList = this.getIndexList(index),
                tIndexList = this.getIndexList(targetIndex);

            for (var i = 0; i < rootIndexLen; i++) {
                indexList.shift();
            }

            return tIndexList.concat(indexList).join(".");
        }

        /**
         * @method getNextIndex
         *
         * @param {String} index
         * @return {String}
         */
        this.getNextIndex = function (index) { // 현재 인덱스에서 +1
            var indexList = this.getIndexList(index),
                no = indexList.pop() + 1;

            indexList.push(no);
            return indexList.join(".");
        }

        /**
         * @method getParentIndex
         *
         *
         * @param {String} index
         * @returns {*}
         */
        this.getParentIndex = function (index) {
            if (!this.isIndexDepth(index)) return null;

            return index.substr(0, index.lastIndexOf("."))
        }
    }
});

jui.define("util.treemap", [], function() {

    return {
        sumArray: function (arr) {
            var sum = 0;

            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
            }

            return sum;
        }
    }
});

jui.define("chart.brush.treemap.node", [], function() {

    /**
     * @class chart.brush.treemap.node
     *
     */
    var Node = function(data) {
        var self = this;

        this.text = data.text;
        this.value = data.value;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;

        /** @property {Integer} [index=null] Index of a specified node */
        this.index = null;

        /** @property {Integer} [nodenum=null] Unique number of a specifiede node at the current depth */
        this.nodenum = null;

        /** @property {ui.tree.node} [parent=null] Variable that refers to the parent of the current node */
        this.parent = null;

        /** @property {Array} [children=null] List of child nodes of a specified node */
        this.children = [];

        /** @property {Integer} [depth=0] Depth of a specified node */
        this.depth = 0;

        function setIndexChild(node) {
            var clist = node.children;

            for(var i = 0; i < clist.length; i++) {
                if(clist[i].children.length > 0) {
                    setIndexChild(clist[i]);
                }
            }
        }

        this.reload = function(nodenum) {
            this.nodenum = (!isNaN(nodenum)) ? nodenum : this.nodenum;

            if(self.parent) {
                if(this.parent.index == null) this.index = "" + this.nodenum;
                else this.index = self.parent.index + "." + this.nodenum;
            }

            // 뎁스 체크
            if(this.parent && typeof(self.index) == "string") {
                this.depth = this.index.split(".").length;
            }

            // 자식 인덱스 체크
            if(this.children.length > 0) {
                setIndexChild(this);
            }
        }

        this.isLeaf = function() {
            return (this.children.length == 0) ? true : false;
        }

        this.appendChild = function(node) {
            this.children.push(node);
        }

        this.insertChild = function(nodenum, node) {
            var preNodes = this.children.splice(0, nodenum);
            preNodes.push(node);

            this.children = preNodes.concat(this.children);
        }

        this.removeChild = function(index) {
            for(var i = 0; i < this.children.length; i++) {
                var node = this.children[i];

                if(node.index == index) {
                    this.children.splice(i, 1); // 배열에서 제거
                }
            }
        }

        this.lastChild = function() {
            if(this.children.length > 0)
                return this.children[this.children.length - 1];

            return null;
        }

        this.lastChildLeaf = function(lastRow) {
            var row = (!lastRow) ? this.lastChild() : lastRow;

            if(row.isLeaf()) return row;
            else {
                return this.lastChildLeaf(row.lastChild());
            }
        }
    }

    return Node;
});

jui.define("chart.brush.treemap.nodemanager",
    [ "util.base", "util.keyparser", "chart.brush.treemap.node" ], function(_, KeyParser, Node) {

    var NodeManager = function() {
        var self = this,
            root = new Node({
                text: null,
                value: -1,
                x: -1,
                y: -1,
                width: -1,
                height: -1
            }),
            iParser = new KeyParser();

        function createNode(data, no, pNode) {
            var node = new Node(data);

            node.parent = (pNode) ? pNode : null;
            node.reload(no);

            return node;
        }

        function setNodeChildAll(dataList, node) {
            var c_nodes = node.children;

            if(c_nodes.length > 0) {
                for(var i = 0; i < c_nodes.length; i++) {
                    dataList.push(c_nodes[i]);

                    if(c_nodes[i].children.length > 0) {
                        setNodeChildAll(dataList, c_nodes[i]);
                    }
                }
            }
        }

        function getNodeChildLeaf(keys, node) {
            if(!node) return null;
            var tmpKey = keys.shift();

            if(tmpKey == undefined) {
                return node;
            } else {
                return getNodeChildLeaf(keys, node.children[tmpKey]);
            }
        }

        function insertNodeDataChild(index, data) {
            var keys = iParser.getIndexList(index);

            var pNode = self.getNodeParent(index),
                nodenum = keys[keys.length - 1],
                node = createNode(data, nodenum, pNode);

            // 데이터 갱신
            pNode.insertChild(nodenum, node);

            return node;
        }

        function appendNodeData(data) {
            var node = createNode(data, root.children.length, root);
            root.appendChild(node);

            return node;
        }

        function appendNodeDataChild(index, data) {
            var pNode = self.getNode(index),
                cNode = createNode(data, pNode.children.length, pNode);

            pNode.appendChild(cNode);

            return cNode;
        }

        this.appendNode = function() {
            var index = arguments[0],
                data = arguments[1];

            if(!data) {
                return appendNodeData(index);
            } else {
                return appendNodeDataChild(index, data);
            }
        }

        this.insertNode = function(index, data) {
            if(root.children.length == 0 && parseInt(index) == 0) {
                return this.appendNode(data);
            } else {
                return insertNodeDataChild(index, data);
            }
        }

        this.updateNode = function(index, data) {
            var node = this.getNode(index);

            for(var key in data) {
                node.data[key] = data[key];
            }

            node.reload(node.nodenum, true);

            return node;
        }

        this.getNode = function(index) {
            if(index == null) return root.children;
            else {
                var nodes = root.children;

                if(iParser.isIndexDepth(index)) {
                    var keys = iParser.getIndexList(index);
                    return getNodeChildLeaf(keys, nodes[keys.shift()]);
                } else {
                    return (nodes[index]) ? nodes[index] : null;
                }
            }
        }

        this.getNodeAll = function(index) {
            var dataList = [],
                tmpNodes = (index == null) ? root.children : [ this.getNode(index) ];

            for(var i = 0; i < tmpNodes.length; i++) {
                if(tmpNodes[i]) {
                    dataList.push(tmpNodes[i]);

                    if(tmpNodes[i].children.length > 0) {
                        setNodeChildAll(dataList, tmpNodes[i]);
                    }
                }
            }

            return dataList;
        }

        this.getNodeParent = function(index) { // 해당 인덱스의 부모 노드를 가져옴 (단, 해당 인덱스의 노드가 없을 경우)
            var keys = iParser.getIndexList(index);

            if(keys.length == 1) {
                return root;
            } else if(keys.length == 2) {
                return this.getNode(keys[0]);
            } else if(keys.length > 2) {
                keys.pop();
                return this.getNode(keys.join("."));
            }
        }

        this.getRoot = function() {
            return root;
        }
    }

    return NodeManager;
});

jui.define("chart.brush.treemap.container", [ "util.treemap" ], function(util) {

    var Container = function(xoffset, yoffset, width, height) {
        this.xoffset = xoffset; // offset from the the top left hand corner
        this.yoffset = yoffset; // ditto
        this.height = height;
        this.width = width;

        this.shortestEdge = function () {
            return Math.min(this.height, this.width);
        };

        // getCoordinates - for a row of boxes which we've placed
        //                  return an array of their cartesian coordinates
        this.getCoordinates = function (row) {
            var coordinates = [],
                subxoffset = this.xoffset, subyoffset = this.yoffset, //our offset within the container
                areawidth = util.sumArray(row) / this.height,
                areaheight = util.sumArray(row) / this.width;

            if (this.width >= this.height) {
                for (var i = 0; i < row.length; i++) {
                    coordinates.push([ subxoffset, subyoffset, subxoffset + areawidth, subyoffset + row[i] / areawidth ]);
                    subyoffset = subyoffset + row[i] / areawidth;
                }
            } else {
                for (var i = 0; i < row.length; i++) {
                    coordinates.push([ subxoffset, subyoffset, subxoffset + row[i] / areaheight, subyoffset + areaheight ]);
                    subxoffset = subxoffset + row[i] / areaheight;
                }
            }

            return coordinates;
        }

        // cutArea - once we've placed some boxes into an row we then need to identify the remaining area,
        //           this function takes the area of the boxes we've placed and calculates the location and
        //           dimensions of the remaining space and returns a container box defined by the remaining area
        this.cutArea = function (area) {
            if (this.width >= this.height) {
                var areawidth = area / this.height,
                    newwidth = this.width - areawidth;

                return new Container(this.xoffset + areawidth, this.yoffset, newwidth, this.height);
            } else {
                var areaheight = area / this.width,
                    newheight = this.height - areaheight;

                return new Container(this.xoffset, this.yoffset + areaheight, this.width, newheight);
            }
        }
    }

    return Container;
});

jui.define("chart.brush.treemap.calculator", [ "util.base", "util.treemap", "chart.brush.treemap.container" ], function(_, util, Container) {

    // normalize - the Bruls algorithm assumes we're passing in areas that nicely fit into our
    //             container box, this method takes our raw data and normalizes the data values into
    //             area values so that this assumption is valid.
    function normalize(data, area) {
        var normalizeddata = [],
            sum = util.sumArray(data),
            multiplier = area / sum;

        for (var i = 0; i < data.length; i++) {
            normalizeddata[i] = data[i] * multiplier;
        }

        return normalizeddata;
    }

    // treemapMultidimensional - takes multidimensional data (aka [[23,11],[11,32]] - nested array)
    //                           and recursively calls itself using treemapSingledimensional
    //                           to create a patchwork of treemaps and merge them
    function treemapMultidimensional(data, width, height, xoffset, yoffset) {
        xoffset = (typeof xoffset === "undefined") ? 0 : xoffset;
        yoffset = (typeof yoffset === "undefined") ? 0 : yoffset;

        var mergeddata = [],
            mergedtreemap,
            results = [];

        if(_.typeCheck("array", data[0])) { // if we've got more dimensions of depth
            for(var i = 0; i < data.length; i++) {
                mergeddata[i] = sumMultidimensionalArray(data[i]);
            }

            mergedtreemap = treemapSingledimensional(mergeddata, width, height, xoffset, yoffset);

            for(var i = 0; i < data.length; i++) {
                results.push(treemapMultidimensional(data[i], mergedtreemap[i][2] - mergedtreemap[i][0], mergedtreemap[i][3] - mergedtreemap[i][1], mergedtreemap[i][0], mergedtreemap[i][1]));
            }
        } else {
            results = treemapSingledimensional(data,width,height, xoffset, yoffset);
        }
        return results;
    }

    // treemapSingledimensional - simple wrapper around squarify
    function treemapSingledimensional(data, width, height, xoffset, yoffset) {
        xoffset = (typeof xoffset === "undefined") ? 0 : xoffset;
        yoffset = (typeof yoffset === "undefined") ? 0 : yoffset;

        //console.log(normalize(data, width * height))
        var rawtreemap = squarify(normalize(data, width * height), [], new Container(xoffset, yoffset, width, height), []);
        return flattenTreemap(rawtreemap);
    }

    // flattenTreemap - squarify implementation returns an array of arrays of coordinates
    //                  because we have a new array everytime we switch to building a new row
    //                  this converts it into an array of coordinates.
    function flattenTreemap(rawtreemap) {
        var flattreemap = [];

        if(rawtreemap) {
            for (var i = 0; i < rawtreemap.length; i++) {
                for (var j = 0; j < rawtreemap[i].length; j++) {
                    flattreemap.push(rawtreemap[i][j]);
                }

            }
        }

        return flattreemap;
    }

    // squarify  - as per the Bruls paper
    //             plus coordinates stack and containers so we get
    //             usable data out of it
    function squarify(data, currentrow, container, stack) {
        var length;
        var nextdatapoint;
        var newcontainer;

        if (data.length === 0) {
            stack.push(container.getCoordinates(currentrow));
            return;
        }

        length = container.shortestEdge();
        nextdatapoint = data[0];

        if (improvesRatio(currentrow, nextdatapoint, length)) {
            currentrow.push(nextdatapoint);
            squarify(data.slice(1), currentrow, container, stack);
        } else {
            newcontainer = container.cutArea(util.sumArray(currentrow), stack);
            stack.push(container.getCoordinates(currentrow));
            squarify(data, [], newcontainer, stack);
        }
        return stack;
    }

    // improveRatio - implements the worse calculation and comparision as given in Bruls
    //                (note the error in the original paper; fixed here)
    function improvesRatio(currentrow, nextnode, length) {
        var newrow;

        if (currentrow.length === 0) {
            return true;
        }

        newrow = currentrow.slice();
        newrow.push(nextnode);

        var currentratio = calculateRatio(currentrow, length),
            newratio = calculateRatio(newrow, length);

        // the pseudocode in the Bruls paper has the direction of the comparison
        // wrong, this is the correct one.
        return currentratio >= newratio;
    }

    // calculateRatio - calculates the maximum width to height ratio of the
    //                  boxes in this row
    function calculateRatio(row, length) {
        var min = Math.min.apply(Math, row),
            max = Math.max.apply(Math, row),
            sum = util.sumArray(row);

        return Math.max(Math.pow(length, 2) * max / Math.pow(sum, 2), Math.pow(sum, 2) / (Math.pow(length, 2) * min));
    }

    // sumMultidimensionalArray - sums the values in a nested array (aka [[0,1],[[2,3]]])
    function sumMultidimensionalArray(arr) {
        var total = 0;

        if(_.typeCheck("array", arr[0])) {
            for(var i = 0; i < arr.length; i++) {
                total += sumMultidimensionalArray(arr[i]);
            }
        } else {
            total = util.sumArray(arr);
        }

        return total;
    }

    return treemapMultidimensional;
});

export default {
    name: "chart.brush.treemap",
    extend: "chart.brush.core",
    component: function() {
        var _ = jui.include("util.base");
        var Calculator = jui.include("chart.brush.treemap.calculator");
        var NodeManager = jui.include("chart.brush.treemap.nodemanager");

        var TEXT_MARGIN_LEFT = 3;

        /**
         * @class chart.brush.treemap
         *
         * @extends chart.brush.core
         */
        var TreemapBrush = function() {
            var nodes = new NodeManager(),
                titleKeys = {};

            function convertNodeToArray(key, nodes, result, now) {
                if(!now) now = [];

                for(var i = 0; i < nodes.length; i++) {
                    if(nodes[i].children.length == 0) {
                        now.push(nodes[i][key]);
                    } else {
                        convertNodeToArray(key, nodes[i].children, result, []);
                    }
                }

                result.push(now);
                return result;
            }

            function mergeArrayToNode(keys, values) {
                for(var i = 0; i < keys.length; i++) {
                    if(_.typeCheck("array", keys[i])) {
                        mergeArrayToNode(keys[i], values[i]);
                    } else {
                        var node = nodes.getNode(keys[i]);
                        node.x = values[i][0];
                        node.y = values[i][1];
                        node.width = values[i][2] - values[i][0];
                        node.height = values[i][3] - values[i][1];
                    }
                }
            }

            function isDrawNode(node) {
                if(node.width == 0 && node.height == 0 && node.x == 0 && node.y == 0) {
                    return false;
                }

                return true;
            }

            function getMinimumXY(node, dx, dy) {
                if(node.children.length == 0) {
                    return {
                        x: Math.min(dx, node.x),
                        y: Math.min(dy, node.y)
                    };
                } else {
                    for(var i = 0; i < node.children.length; i++) {
                        return getMinimumXY(node.children[i], dx, dy);
                    }
                }
            }

            function createTitleDepth(self, g, node, sx, sy) {
                var fontSize = self.chart.theme("treemapTitleFontSize"),
                    w = self.axis.area("width"),
                    h = self.axis.area("height"),
                    xy = getMinimumXY(node, w, h);

                var text = self.chart.text({
                    "font-size": fontSize,
                    "font-weight": "bold",
                    fill: self.chart.theme("treemapTitleFontColor"),
                    x: sx + xy.x + TEXT_MARGIN_LEFT,
                    y: sy + xy.y + fontSize,
                    "text-anchor": "start"
                }, (_.typeCheck("function", self.brush.format) ? self.format(node) : node.text));

                g.append(text);
                titleKeys[node.index] = true;
            }

            function getRootNodeSeq(node) {
                if(node.parent.depth > 0) {
                    return getRootNodeSeq(node.parent);
                }

                return node.nodenum;
            }

            this.drawBefore = function() {
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

                var nodeList = nodes.getNode(),
                    preData = convertNodeToArray("value", nodeList, []),
                    preKeys = convertNodeToArray("index", nodeList, []),
                    afterData = Calculator(preData, this.axis.area("width"), this.axis.area("height"));

                mergeArrayToNode(preKeys, afterData);
            }

            this.draw = function() {
                var g = this.svg.group(),
                    sx = this.axis.area("x"),
                    sy = this.axis.area("y"),
                    nodeList = nodes.getNodeAll();

                for(var i = 0; i < nodeList.length; i++) {
                    if(this.brush.titleDepth == nodeList[i].depth) {
                        createTitleDepth(this, g, nodeList[i], sx, sy);
                    }

                    if(!isDrawNode(nodeList[i])) continue;

                    var x = sx + nodeList[i].x,
                        y = sy + nodeList[i].y,
                        w = nodeList[i].width,
                        h = nodeList[i].height;

                    if(this.brush.showText && !titleKeys[nodeList[i].index]) {
                        var cx = x + (w / 2),
                            cy = y + (h / 2),
                            fontSize = this.chart.theme("treemapTextFontSize");

                        if(this.brush.textOrient == "top") {
                            cy = y + fontSize;
                        } else if(this.brush.textOrient == "bottom") {
                            cy = y + h - fontSize/2;
                        }

                        if(this.brush.textAlign == "start") {
                            cx = x + TEXT_MARGIN_LEFT;
                        } else if(this.brush.textAlign == "end") {
                            cx = x + w - TEXT_MARGIN_LEFT;
                        }

                        var text = this.chart.text({
                            "font-size": fontSize,
                            fill: this.chart.theme("treemapTextFontColor"),
                            x: cx,
                            y: cy,
                            "text-anchor": this.brush.textAlign
                        }, (_.typeCheck("function", this.brush.format) ? this.format(nodeList[i]) : nodeList[i].text));

                        g.append(text);
                    }

                    var elem = this.svg.rect({
                        stroke: this.chart.theme("treemapNodeBorderColor"),
                        "stroke-width": this.chart.theme("treemapNodeBorderWidth"),
                        x: x,
                        y: y,
                        width: w,
                        height: h,
                        fill: this.color(getRootNodeSeq(nodeList[i]))
                    });

                    if(_.typeCheck("function", this.brush.nodeColor)) {
                        var color = this.brush.nodeColor.call(this.chart, nodeList[i]);
                        elem.attr({ fill: this.color(color) });
                    }

                    this.addEvent(elem, nodeList[i]);
                    g.prepend(elem);
                }

                return g;
            }
        }

        TreemapBrush.setup = function() {
            return {
                /** @cfg {"top"/"center"/"bottom" } [orient="top"]  Determines the side on which the tool tip is displayed (top, center, bottom). */
                textOrient: "top", // or bottom
                /** @cfg {"start"/"middle"/"end" } [align="center"] Aligns the title message (start, middle, end).*/
                textAlign: "middle",
                showText: true,
                titleDepth: 1,
                nodeColor: null,
                clip: false,
                format: null
            };
        }

        return TreemapBrush;
    }
}