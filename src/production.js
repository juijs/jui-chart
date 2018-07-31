import jui from './index.js'
import BarBrush from './brush/bar.js'
import StackBarBrush from './brush/stackbar.js'
import FullStackBarBrush from './brush/fullstackbar.js'
import RangeBarBrush from './brush/rangebar.js'
import ColumnBrush from './brush/column.js'
import StackColumnBrush from './brush/stackcolumn.js'
import FullStackColumnBrush from './brush/fullstackcolumn.js'
import RangeColumnBrush from './brush/rangecolumn.js'
import LineBrush from './brush/line.js'
import AreaBrush from './brush/area.js'
import StackAreaBrush from './brush/stackarea.js'
import RangeAreaBrush from './brush/rangearea.js'
import ScatterBrush from './brush/scatter.js'
import BubbleBrush from './brush/bubble.js'
import PieBrush from './brush/pie.js'
import DonutBrush from './brush/donut.js'
import TreeMapBrush from './brush/treemap.js'
import HeatMapBrush from './brush/heatmap.js'
import TimeLineBrush from './brush/timeline.js'
import Column3dBrush from './brush/polygon/column3d.js'
import Line3dBrush from './brush/polygon/line3d.js'
import CrossWidget from './widget/cross.js'
import LegendWidget from './widget/legend.js'
import TitleWidget from './widget/title.js'
import TooltipWidget from './widget/tooltip.js'
import Rotate3dWidget from './widget/polygon/rotate3d.js'

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