// Node.js 및 webpack 환경에서 jui 코어와 연동해서 사용하기 위한 코드
if (typeof module == 'object' && module.exports) {
    try {
        module.exports = require("juijs");

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

        // chart.theme
        require("../js/theme/jennifer.js")
        require("../js/theme/gradient.js") // jennifer gradient style
        require("../js/theme/dark.js")
        require("../js/theme/pastel.js")
        require("../js/theme/pattern.js")

        // chart.pattern
        require("../js/pattern/jennifer.js")

        // chart.icon
        require("../js/icon/jennifer.js")

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
        require("../js/brush/imagebar.js")
        require("../js/brush/imagecolumn.js")
        require("../js/brush/patternbar.js")
        require("../js/brush/patterncolumn.js")
        require("../js/brush/bar.js")
        require("../js/brush/column.js") // extends bar
        require("../js/brush/bar3d.js")
        require("../js/brush/column3d.js")
        require("../js/brush/cylinder3d.js")
        require("../js/brush/clusterbar3d.js")
        require("../js/brush/clustercolumn3d.js")
        require("../js/brush/clustercylinder3d.js")
        require("../js/brush/circle.js")
        require("../js/brush/stackbar.js") // extends bar
        require("../js/brush/stackcolumn.js") // extends stackbar
        require("../js/brush/stackbar3d.js")
        require("../js/brush/stackcolumn3d.js")
        require("../js/brush/stackcylinder3d.js")
        require("../js/brush/fullstackbar.js") // extends stackbar
        require("../js/brush/fullstackcolumn.js") // extends fullstackbar
        require("../js/brush/fullstackbar3d.js")
        require("../js/brush/fullstackcolumn3d.js")
        require("../js/brush/fullstackcylinder3d.js")
        require("../js/brush/bubble.js")
        require("../js/brush/bubble3d.js") // extends bubble
        require("../js/brush/candlestick.js")
        require("../js/brush/ohlc.js")
        require("../js/brush/equalizer.js")
        require("../js/brush/equalizerbar.js")
        require("../js/brush/equalizercolumn.js")
        require("../js/brush/line.js")
        require("../js/brush/path.js")
        require("../js/brush/pie.js")
        require("../js/brush/donut.js") // extends pie"
        require("../js/brush/doubledonut.js")
        require("../js/brush/scatter.js")
        require("../js/brush/scatterpath.js")
        require("../js/brush/bargauge.js")
        require("../js/brush/circlegauge.js")
        require("../js/brush/fillgauge.js")
        require("../js/brush/area.js") // extends line
        require("../js/brush/stackline.js") // extends line
        require("../js/brush/stackarea.js") // extends area
        require("../js/brush/stackscatter.js") // extends scatter
        require("../js/brush/gauge.js") // extends donut
        require("../js/brush/fullgauge.js") // extends donut
        require("../js/brush/stackgauge.js") // extends donut
        require("../js/brush/waterfall.js")
        require("../js/brush/splitline.js")
        require("../js/brush/splitarea.js")
        require("../js/brush/rangecolumn.js")
        require("../js/brush/rangebar.js")
        require("../js/brush/topologynode.js")
        require("../js/brush/focus.js") // brush supporter
        require("../js/brush/pin.js")  // brush supporter
        require("../js/brush/timeline.js")  // brush supporter
        require("../js/brush/hudbar.js")
        require("../js/brush/hudcolumn.js")
        require("../js/brush/heatmap.js")
        require("../js/brush/pyramid.js")
        require("../js/brush/rangearea.js")
        require("../js/brush/heatmapscatter.js")
        require("../js/brush/treemap.js")
        require("../js/brush/arcequalizer.js")
        require("../js/brush/arcgauge.js")
        require("../js/brush/flame.js")
        require("../js/brush/selectbox.js")

        // map brush
        require("../js/brush/map/core.js")
        require("../js/brush/map/selector.js")
        require("../js/brush/map/note.js")
        require("../js/brush/map/bubble.js")
        require("../js/brush/map/comparebubble.js")
        require("../js/brush/map/flightroute.js")
        require("../js/brush/map/marker.js")
        require("../js/brush/map/weather.js")

        // polygon brush (full 3d)
        require("../js/brush/polygon/core.js")
        require("../js/brush/polygon/scatter3d.js")
        require("../js/brush/polygon/column3d.js")
        require("../js/brush/polygon/line3d.js")

        // canvas brush
        require("../js/brush/canvas/core.js")
        require("../js/brush/canvas/scatter.js")
        require("../js/brush/canvas/line.js")
        require("../js/brush/canvas/scatter3d.js")
        require("../js/brush/canvas/model3d.js")
        require("../js/brush/canvas/dot3d.js")
        require("../js/brush/canvas/imagefilter.js")

        // chart.widget
        require("../js/widget/core.js")
        require("../js/widget/tooltip.js")
        require("../js/widget/title.js")
        require("../js/widget/legend.js")
        require("../js/widget/zoom.js")
        require("../js/widget/zoomscroll.js")
        require("../js/widget/scroll.js") // horizontal scroll
        require("../js/widget/vscroll.js") // vertical scroll
        require("../js/widget/cross.js")
        require("../js/widget/topologyctrl.js")
        require("../js/widget/dragselect.js")

        // map widget
        require("../js/widget/map/core.js")
        require("../js/widget/map/control.js")
        require("../js/widget/map/tooltip.js")
        require("../js/widget/map/minimap.js")

        // polygon widget (full 3d)
        require("../js/widget/polygon/core.js")
        require("../js/widget/polygon/rotate3d.js")

        // canvas widget
        require("../js/widget/canvas/core.js")
        require("../js/widget/canvas/dragselect.js")
    } catch(e) {
        console.log("JUI_WARNING_MSG: Base module does not exist");
    }
}