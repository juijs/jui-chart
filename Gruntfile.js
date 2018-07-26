var css = require("css"),
    fs = require("fs"),
    datauri = require("datauri")

module.exports = function(grunt) {

    var chart_src = [
        // base
        "conf/grunt.js",

        // util
        "js/util/time.js",
        "js/util/transform.js",
        "js/util/svg/element.js",
        "js/util/svg/element.transform.js",
        "js/util/svg/element.path.js",
        "js/util/svg/element.path.rect.js",
        "js/util/svg/element.path.symbol.js",
        "js/util/svg/element.poly.js",
        "js/util/svg/base.js",
        "js/util/svg/base3d.js",
        "js/util/svg.js",
        "js/util/scale/linear.js",
        "js/util/scale/circle.js",
        "js/util/scale/log.js",
        "js/util/scale/ordinal.js",
        "js/util/scale/time.js",
        "js/util/scale.js",

        // chart (core)
        "js/vector.js",
        "js/draw.js",
        "js/axis.js",
        "js/map.js",
        "js/builder.js",
        "js/plane.js",

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

        // map brush
        "js/brush/map/core.js",

        // polygon brush (full 3d)
        "js/brush/polygon/core.js",

        // canvas brush
        "js/brush/canvas/core.js",

        // chart.widget
        "js/widget/core.js",

        // map widget
        "js/widget/map/core.js",

        // polygon widget (full 3d)
        "js/widget/polygon/core.js",

        // canvas widget
        "js/widget/canvas/core.js",
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
            basic: {
                src : [ "node_modules/juijs-core/dist/core.js" ].concat(chart_src),
                dest : "dist/chart.js"
            },
            npm: {
                src : chart_src,
                dest : "dist/chart.npm.js"
            },
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
    grunt.registerTask("js", [ "concat:basic", "uglify" ]);
    grunt.registerTask("test", [ "qunit" ]);
    grunt.registerTask("make", [ "curl-dir", "icon", "pattern" ]);
    grunt.registerTask("default", [ "js", "test" ]);
};
