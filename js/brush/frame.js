jui.define("chart.brush.frame", [ "util.base", "chart.brush.treemap.nodemanager" ],
    function(_, NodeManager) {

    /**
     * @class chart.brush.frame
     *
     * @extends chart.brush.core
     */
    var FrameBrush = function() {
        var self = this,
            g = null,
            height = 0,
            maxHeight = 0,
            nodes = new NodeManager();

        function createNodeElements(g, node, width, sx) {
            node.width = width;
            node.height = height;
            node.x = sx;
            node.y = maxHeight - (height * node.depth);

            var r = self.svg.rect({
                fill: self.color(0),
                stroke: "white",
                width: node.width,
                height: node.height,
                x: node.x,
                y: node.y
            });

            for(var i = node.children.length - 1; i >= 0; i--) {
                var cNode = node.children[i],
                    rate = cNode.value / node.value,
                    cWidth = node.width * rate,
                    cStartX = node.x + node.width - cWidth;

                if(i < node.children.length - 1) {
                    cStartX -= node.children[i + 1].width;
                }

                createNodeElements(g, cNode, cWidth, cStartX);
            }

            self.addEvent(r, node);
            g.append(r);
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

            createNodeElements(g, nodes.getNode()[0], area.width, area.x);

            return g;
        }
    }

    FrameBrush.setup = function() {
        return {
            depth: null,
            clip: false
        };
    }

    return FrameBrush;
}, "chart.brush.core");
