jui.define("chart.topology.sort.random", [], function() {
    return function(data, area, space) {
        var xy = [];

        for(var i = 0; i < data.length; i++) {
            var x = Math.floor(Math.random() * (area.width - space)),
                y = Math.floor(Math.random() * (area.height - space));

            xy[i] = {
                x: area.x + x,
                y: area.y + y
            };
        }

        return xy;
    }
});

jui.define("chart.topology.sort.linear", [], function() {
    var cache = {};

    function getRandomRowIndex(row_cnt) {
        var row_index = Math.floor(Math.random() * row_cnt);

        if(cache[row_index]) {
            var cnt = 0;
            for(var k in cache) { cnt++; }

            if(cnt < row_cnt) {
                return getRandomRowIndex(row_cnt);
            } else {
                cache = {};
            }
        } else {
            cache[row_index] = true;
        }

        return row_index;
    }

    return function(data, area, space) {
        var xy = [],
            row_cnt = Math.floor(area.height / space),
            col_cnt = Math.floor(area.width / space),
            col_step = Math.floor(col_cnt / data.length),
            col_index = 0;

        var left = -1,
            right = data.length;

        for(var i = 0; i < data.length; i++) {
            var x = 0, y = 0, index = 0;

            if(i % 2 == 0) {
                x = col_index * space;
                y = getRandomRowIndex(row_cnt) * space;
                col_index += col_step;

                left += 1;
                index = left;
            } else {
                x = (col_cnt - col_index) * space + space;
                y = getRandomRowIndex(row_cnt) * space;

                right -=1;
                index = right;
            }

            xy[index] = {
                x: area.x + x + space,
                y: area.y + y + (space / 2)
            };
        }

        return xy;
    }
});

jui.define("chart.grid.topologytable", [ "util.base" ], function(_) {

    /**
     * @class chart.grid.topologytable
     * @extends chart.grid.core
     */
    var TopologyTableGrid = function() {
        var self = this;

        function getDataIndex(key) {
            var index = null,
                data = self.axis.data;

            for(var i = 0, len = data.length; i < len; i++) {
                if(self.axis.getValue(data[i], "key") == key) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        this.drawBefore = function() {
            if(!this.axis.cacheXY) {
                var sortFunc = jui.include("chart.topology.sort." + this.grid.sort),
                    sortArgs = [ this.axis.data, this.axis.area(), this.grid.space ];

                if(_.typeCheck("function", sortFunc)) {
                    this.axis.cacheXY = sortFunc.apply(this, sortArgs);
                } else {
                    sortFunc = jui.include(this.grid.sort);

                    if(_.typeCheck("function", sortFunc)) {
                        this.axis.cacheXY = sortFunc.apply(this, sortArgs);
                    }
                }
            }

            if(!this.axis.cache) {
                this.axis.cache = {
                    scale: 1,
                    viewX: 0,
                    viewY: 0,
                    nodeKey: null // 활성화 상태의 노드 키
                }
            }

            this.scale = (function() {
                return function(index) {
                    var index = (_.typeCheck("string", index)) ? getDataIndex(index) : index;

                    var func = {
                        setX: function(value) {
                            self.axis.cacheXY[index].x = value - self.axis.cache.viewX;
                        },
                        setY: function(value) {
                            self.axis.cacheXY[index].y = value - self.axis.cache.viewY;
                        },
                        setScale: function(s) {
                            self.axis.cache.scale = s;
                        },
                        setView: function(x, y) {
                            self.axis.cache.viewX = x;
                            self.axis.cache.viewY = y;
                        },
                        moveLast: function() {
                            var target1 = self.axis.cacheXY.splice(index, 1);
                            self.axis.cacheXY.push(target1[0]);

                            var target2 = self.axis.data.splice(index, 1);
                            self.axis.data.push(target2[0]);
                        }
                    }

                    if(_.typeCheck("integer", index)) {
                        var x = self.axis.cacheXY[index].x + self.axis.cache.viewX,
                            y = self.axis.cacheXY[index].y + self.axis.cache.viewY,
                            scale = self.axis.cache.scale;

                        return _.extend(func, {
                            x: x * scale,
                            y: y * scale,
                            scale: scale
                        });
                    }

                    return func;
                }
            })(this.axis);
        }
        
        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid();
        }
    }

    TopologyTableGrid.setup = function() {
        return {
            /** @cfg {String} [sort=null]  */
            sort: "linear", // or random
            /** @cfg {Number} [space=50]  */
            space: 50
        }
    }
    
    return TopologyTableGrid;
}, "chart.grid.core");
