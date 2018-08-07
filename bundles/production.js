import jui from '../src/main.js'
import BarBrush from '../src/brush/bar.js'
import StackBarBrush from '../src/brush/stackbar.js'
import FullStackBarBrush from '../src/brush/fullstackbar.js'
import RangeBarBrush from '../src/brush/rangebar.js'
import ColumnBrush from '../src/brush/column.js'
import StackColumnBrush from '../src/brush/stackcolumn.js'
import FullStackColumnBrush from '../src/brush/fullstackcolumn.js'
import RangeColumnBrush from '../src/brush/rangecolumn.js'
import LineBrush from '../src/brush/line.js'
import AreaBrush from '../src/brush/area.js'
import StackAreaBrush from '../src/brush/stackarea.js'
import RangeAreaBrush from '../src/brush/rangearea.js'
import ScatterBrush from '../src/brush/scatter.js'
import BubbleBrush from '../src/brush/bubble.js'
import PieBrush from '../src/brush/pie.js'
import DonutBrush from '../src/brush/donut.js'
import TreeMapBrush from '../src/brush/treemap.js'
import HeatMapBrush from '../src/brush/heatmap.js'
import TimeLineBrush from '../src/brush/timeline.js'
import Column3dBrush from '../src/brush/polygon/column3d.js'
import Line3dBrush from '../src/brush/polygon/line3d.js'
import CrossWidget from '../src/widget/cross.js'
import LegendWidget from '../src/widget/legend.js'
import TitleWidget from '../src/widget/title.js'
import TooltipWidget from '../src/widget/tooltip.js'
import Rotate3dWidget from '../src/widget/polygon/rotate3d.js'

// TODO: 다른 테마도 추가해야 함.

jui.use([
    BarBrush,
    StackBarBrush,
    FullStackBarBrush,
    RangeBarBrush,
    ColumnBrush,
    StackColumnBrush,
    FullStackColumnBrush,
    RangeColumnBrush,
    LineBrush,
    AreaBrush,
    StackAreaBrush,
    RangeAreaBrush,
    ScatterBrush,
    BubbleBrush,
    PieBrush,
    DonutBrush,
    TreeMapBrush,
    HeatMapBrush,
    TimeLineBrush,
    Column3dBrush,
    Line3dBrush,
    CrossWidget,
    LegendWidget,
    TitleWidget,
    TooltipWidget,
    Rotate3dWidget
]);

window.jui = window.JUI = jui;