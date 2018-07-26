// Node.js 및 webpack 환경에서 jui 코어와 연동해서 사용하기 위한 코드

if (typeof module == 'object' && module.exports) {
    try {
        let jui = require("juijs");
        let _ = jui.include("util.base");

        jui.register = function() {
            let modules = [];

            if(arguments.length == 1 && _.typeCheck("array", arguments[0])) {
                modules = arguments[0];
            } else {
                modules = arguments;
            }

            for(let i = 0; i < modules.length; i++) {
                let module = modules[i];

                if(_.typeCheck("object", module)) {
                    if(typeof(module.name) != "string") return;
                    if(typeof(module.component) != "function") return;

                    // 상속 대상 부모 클래스가 존재할 경우
                    if(module.extend != null && !module.extend.endsWith("core")) {
                        let tokens = module.extend.split(".");
                        let parent = require("../js/" + tokens[1] + "/" + tokens[2]);

                        if(parent.default != null) {
                            jui.register(parent.default);
                        }
                    }

                    jui.redefine(module.name, [], module.component, module.extend);
                }
            }
        }

        module.exports = jui;

        // util
        require("../js/util/time.js")
        require("../js/util/transform.js")
        require("../js/util/svg/element.js")
        require("../js/util/svg/element.transform.js")
        require("../js/util/svg/element.path.js")
        require("../js/util/svg/element.path.rect.js")
        require("../js/util/svg/element.path.symbol.js")
        require("../js/util/svg/element.poly.js")
        require("../js/util/svg/base.js")
        require("../js/util/svg/base3d.js")
        require("../js/util/svg.js")
        require("../js/util/scale/linear.js")
        require("../js/util/scale/circle.js")
        require("../js/util/scale/log.js")
        require("../js/util/scale/ordinal.js")
        require("../js/util/scale/time.js")
        require("../js/util/scale.js")

        // chart (core)
        require("../js/vector.js")
        require("../js/draw.js")
        require("../js/axis.js")
        require("../js/map.js")
        require("../js/builder.js")
        require("../js/plane.js")

        // chart.polygon
        require("../js/polygon/core.js")
        require("../js/polygon/grid.js")
        require("../js/polygon/line.js")
        require("../js/polygon/point.js")
        require("../js/polygon/cube.js")

        // chart.grid
        require("../js/grid/draw2d.js")
        require("../js/grid/draw3d.js")
        require("../js/grid/core.js")
        require("../js/grid/block.js")
        require("../js/grid/date.js")
        require("../js/grid/dateblock.js")
        require("../js/grid/fullblock.js")
        require("../js/grid/radar.js")
        require("../js/grid/range.js")
        require("../js/grid/log.js")
        require("../js/grid/rule.js")
        require("../js/grid/panel.js")
        require("../js/grid/table.js")
        require("../js/grid/overlap.js")
        require("../js/grid/topologytable.js")
        require("../js/grid/grid3d.js")

        // chart.brush
        require("../js/brush/core.js")

        // map brush
        require("../js/brush/map/core.js")

        // polygon brush (full 3d)
        require("../js/brush/polygon/core.js")

        // canvas brush
        require("../js/brush/canvas/core.js")

        // chart.widget
        require("../js/widget/core.js")

        // map widget
        require("../js/widget/map/core.js")

        // polygon widget (full 3d)
        require("../js/widget/polygon/core.js")

        // canvas widget
        require("../js/widget/canvas/core.js")
    } catch(e) {
        console.log("JUI_WARNING_MSG: Base module does not exist");
    }
}