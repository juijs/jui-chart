var css = require("css"),
    fs = require("fs"),
    datauri = require("datauri");

module.exports = function(grunt) {

    var chart_src = [
        // chart (core)
        "js/vector.js",
        "js/draw.js",
        "js/axis.js",
        "js/map.js",
        "js/builder.js",

        // chart.theme
        "js/theme/jennifer.js",
        "js/theme/gradient.js", // jennifer gradient style
        "js/theme/dark.js",
        "js/theme/pastel.js",
        "js/theme/pattern.js",

        // chart.pattern
        "js/pattern/jennifer.js",

        // chart.icon
        "js/icon/jennifer.js",

        // chart.polygon
        "js/polygon/core.js",
        "js/polygon/grid.js",
        "js/polygon/line.js",
        "js/polygon/point.js",
        "js/polygon/cube.js",

        // chart.grid
        "js/grid/draw2d.js",
        "js/grid/draw3d.js",
        "js/grid/core.js",
        "js/grid/block.js",
        "js/grid/date.js",
        "js/grid/dateblock.js",
        "js/grid/fullblock.js",
        "js/grid/radar.js",
        "js/grid/range.js",
        "js/grid/log.js",
        "js/grid/rule.js",
        "js/grid/panel.js",
        "js/grid/table.js",
        "js/grid/overlap.js",
        "js/grid/topologytable.js",
        "js/grid/grid3d.js",

        // chart.brush
        "js/brush/core.js",
        "js/brush/imagebar.js",
        "js/brush/imagecolumn.js",
        "js/brush/patternbar.js",
        "js/brush/patterncolumn.js",
        "js/brush/bar.js",
        "js/brush/column.js", // extends bar
        "js/brush/bar3d.js",
        "js/brush/column3d.js",
        "js/brush/cylinder3d.js",
        "js/brush/clusterbar3d.js",
        "js/brush/clustercolumn3d.js",
        "js/brush/clustercylinder3d.js",
        "js/brush/circle.js",
        "js/brush/stackbar.js", // extends bar
        "js/brush/stackcolumn.js", // extends stackbar
        "js/brush/stackbar3d.js",
        "js/brush/stackcolumn3d.js",
        "js/brush/stackcylinder3d.js",
        "js/brush/fullstackbar.js", // extends stackbar
        "js/brush/fullstackcolumn.js", // extends fullstackbar
        "js/brush/fullstackbar3d.js",
        "js/brush/fullstackcolumn3d.js",
        "js/brush/fullstackcylinder3d.js",
        "js/brush/bubble.js",
        "js/brush/bubble3d.js", // extends bubble
        "js/brush/candlestick.js",
        "js/brush/ohlc.js",
        "js/brush/equalizer.js",
        "js/brush/equalizerbar.js",
        "js/brush/equalizercolumn.js",
        "js/brush/line.js",
        "js/brush/path.js",
        "js/brush/pie.js",
        "js/brush/donut.js", // extends pie
        "js/brush/scatter.js",
        "js/brush/scatterpath.js",
        "js/brush/bargauge.js",
        "js/brush/circlegauge.js",
        "js/brush/fillgauge.js",
        "js/brush/area.js", // extends line
        "js/brush/stackline.js", // extends line
        "js/brush/stackarea.js", // extends area
        "js/brush/stackscatter.js", // extends scatter
        "js/brush/gauge.js", // extends donut
        "js/brush/fullgauge.js", // extends donut
        "js/brush/stackgauge.js", // extends donut
        "js/brush/waterfall.js",
        "js/brush/splitline.js",
        "js/brush/splitarea.js",
        "js/brush/rangecolumn.js",
        "js/brush/rangebar.js",
        "js/brush/topologynode.js",
        "js/brush/focus.js", // brush supporter
        "js/brush/pin.js",  // brush supporter
        "js/brush/timeline.js",  // brush supporter
        "js/brush/hudbar.js",
        "js/brush/hudcolumn.js",
        "js/brush/heatmap.js",
        "js/brush/pyramid.js",

        // map brush
        "js/brush/map/core.js",
        "js/brush/map/selector.js",
        "js/brush/map/note.js",
        "js/brush/map/bubble.js",
        "js/brush/map/comparebubble.js",
        "js/brush/map/flightroute.js",
        "js/brush/map/marker.js",
        "js/brush/map/weather.js",

        // polygon brush (full 3d)
        "js/brush/polygon/core.js",
        "js/brush/polygon/scatter3d.js",
        "js/brush/polygon/column3d.js",
        "js/brush/polygon/line3d.js",

        // canvas brush
        "js/brush/canvas/core.js",
        "js/brush/canvas/scatter.js",
        "js/brush/canvas/line.js",
        "js/brush/canvas/scatter3d.js",
        "js/brush/canvas/model3d.js",

        // chart.widget
        "js/widget/core.js",
        "js/widget/tooltip.js",
        "js/widget/title.js",
        "js/widget/legend.js",
        "js/widget/zoom.js",
        "js/widget/zoomscroll.js",
        "js/widget/scroll.js", // horizontal scroll
        "js/widget/vscroll.js", // vertical scroll
        "js/widget/cross.js",
        "js/widget/topologyctrl.js",
        "js/widget/dragselect.js",

        // map widget
        "js/widget/map/core.js",
        "js/widget/map/control.js",
        "js/widget/map/tooltip.js",
        "js/widget/map/minimap.js",

        // polygon widget (full 3d)
        "js/widget/polygon/core.js",
        "js/widget/polygon/rotate3d.js",

        // canvas widget
        "js/widget/canvas/core.js",
        "js/widget/canvas/dragselect.js"
    ];

    grunt.initConfig({
        watch : {
            scripts : {
                files : [ "js/**" ],
                tasks : [ "js" ],
                options : {
                    spawn : false
                }
            }
        },
        qunit: {
            options: {
                timeout: 10000
            },
            all: [ "test/*.html", "test/*/*.html" ]
        },
        concat : {
            // jui chart
            dist : {
                src : chart_src,
                dest : "dist/chart.js"
            }
        },
        uglify: {
            dist : {
                files : {
                    "dist/chart.min.js" : [ "dist/chart.js" ]
                }
            }
        },
        "curl-dir": {
            "jui.img.icon": {
                src: [
                    "https://raw.githubusercontent.com/juijs/jui/develop/img/icon/icomoon.eot",
                    "https://raw.githubusercontent.com/juijs/jui/develop/img/icon/icomoon.svg",
                    "https://raw.githubusercontent.com/juijs/jui/develop/img/icon/icomoon.ttf",
                    "https://raw.githubusercontent.com/juijs/jui/develop/img/icon/icomoon.woff"
                ],
                dest: "img/icon"
            }
        },
        icon : {
            css : "../jui/dist/ui.css",
            dist : "js/icon/jennifer.js"
        },
        pattern : {
            src : "img/pattern/*.png",
            dist : "js/pattern/jennifer.js"
        },
        pkg: grunt.file.readJSON("package.json")
    });

    require("load-grunt-tasks")(grunt);

    grunt.registerTask("pattern", "Image Patter Build", function() {
        var arr = grunt.file.expand(grunt.config('pattern.src')),
            list = {};

        arr.forEach(function(it) {
            var filename = it.split("/").pop().replace(".png", "").replace("pattern-", "");

            var obj = {
                type : "pattern",
                    attr: { id: "pattern-jennifer-" + filename, width: 12, height: 12, patternUnits: "userSpaceOnUse" },
                children : [
                    { type : "image" , attr : { "xlink:href" : datauri(it), width: 12, height : 12 } }
                ]
            }

            list[filename] = obj;
        })

        var str = 'jui.define("chart.pattern.jennifer", [], function() {\n' + '\treturn ' + JSON.stringify(list, null, 4)+ "\n" + "});";

        fs.writeFileSync(grunt.config("pattern.dist"), new Buffer(str));

        grunt.log.writeln("File " + grunt.config("pattern.dist") + " created.");

    });

    // 커스텀 빌드 모듈
    grunt.registerTask("icon", "SVG Icon Build", function() {
        var content = fs.readFileSync(grunt.config("icon.css"), { encoding : "utf8" }),
            obj = css.parse(content),
            icons = [];

        obj.stylesheet.rules.forEach(function(item) {
            if (item.declarations && item.declarations[0] && item.declarations[0].property == "content"  ) {

                if (item.selectors[0].indexOf(".datepicker") > -1 || item.selectors[0].indexOf(".calendar") > -1) {

                }  else {
                    var obj = {
                        name : item.selectors[0].replace(".jui .icon-", "").replace(":before", ""),
                        content : '\\' + item.declarations[0].value.replace(/\"/g, "").replace(/[\\]+/g, 'u')
                    }

                    icons.push('\t\t"' + obj.name + '" : "' + obj.content + '"');
                }

            }
        })

        var str = 'jui.define("chart.icon.jennifer", [], function() {\n' +
            '\treturn ' +
            "{\n" + icons.join(",\r\n") + "\n\t}\n" +
            "});";

        fs.writeFileSync(grunt.config("icon.dist"), new Buffer(str));

        grunt.log.writeln("File " + grunt.config("icon.dist") + " created.");
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("js", [ "concat", "uglify" ]);
    grunt.registerTask("test", [ "qunit" ]);
    grunt.registerTask("make", [ "curl-dir", "icon", "pattern" ]);
    grunt.registerTask("default", [ "js", "test" ]);
};
