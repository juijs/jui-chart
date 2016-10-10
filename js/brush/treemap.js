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
                    coordinates.push([subxoffset, subyoffset, subxoffset + areawidth, subyoffset + row[i] / areawidth]);
                    subyoffset = subyoffset + row[i] / areawidth;
                }
            } else {
                for (var i = 0; i < row.length; i++) {
                    coordinates.push([subxoffset, subyoffset, subxoffset + row[i] / areaheight, subyoffset + areaheight]);
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

        for (var i = 0; i < rawtreemap.length; i++) {
            for (var j = 0; j < rawtreemap[i].length; j++) {
                flattreemap.push(rawtreemap[i][j]);
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

jui.define("chart.brush.treemap", [ "chart.brush.treemap.calculator" ], function(Calculator) {

    /**
     * @class chart.brush.treemap
     *
     * @extends chart.brush.core
     */
    var TreemapBrush = function() {

        this.draw = function() {
            var g = this.svg.group();

            var data = [[6, 6, 4], [3, 2, 1]];
            console.log(Calculator(data, 600, 200));

            return g;
        }
    }

    TreemapBrush.setup = function() {
        return {
            showText : true
        };
    }

    return TreemapBrush;
}, "chart.brush.core");
