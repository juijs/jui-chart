import jui from '../src/main.js'
import ClassicIcon from '../src/icon/classic.js'
import ClassicPattern from '../src/pattern/classic.js'
import ClassicTheme from '../src/theme/classic.js'
import DarkTheme from '../src/theme/dark.js'
import GradientTheme from '../src/theme/gradient.js'
import PatternTheme from '../src/theme/pattern.js'
import TopologyTableWidget from '../src/grid/topologytable.js'
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
import HeatMapScatterBrush from '../src/brush/heatmapscatter.js'
import TimeLineBrush from '../src/brush/timeline.js'
import TopologyNodeBrush from '../src/brush/topologynode.js'
import FocusBrush from '../src/brush/focus.js'
import PinBrush from '../src/brush/pin.js'
import SelectBoxBrush from '../src/brush/selectbox.js'
import EqualizerBrush from '../src/brush/equalizer.js'
import EqualizerBarBrush from '../src/brush/equalizerbar.js'
import EqualizerColumnBrush from '../src/brush/equalizercolumn.js'
import CandleStickBrush from '../src/brush/candlestick.js'
import Column3dBrush from '../src/brush/polygon/column3d.js'
import Line3dBrush from '../src/brush/polygon/line3d.js'
import CanvasDot3dBrush from '../src/brush/canvas/dot3d.js'
import CanvasEqualizerColumnBrush from '../src/brush/canvas/equalizercolumn.js'
import CanvasActiveBubbleBrush from '../src/brush/canvas/activebubble.js'
import CanvasBubbleCloudBrush from '../src/brush/canvas/bubblecloud.js'
import CanvasActiveCircleBrush from '../src/brush/canvas/activecircle.js'
import FullGaugeBrush from '../src/brush/fullgauge.js'
import BarGaugeBrush from '../src/brush/bargauge.js'
import StackLineBrush from '../src/brush/stackline.js'
import StackScatterBrush from '../src/brush/stackscatter.js'
import ArcEqualizerBrush from '../src/brush/arcequalizer.js'
import PyramidBrush from '../src/brush/pyramid.js'
import RateBar from '../src/brush/ratebar.js'
import CrossWidget from '../src/widget/cross.js'
import LegendWidget from '../src/widget/legend.js'
import TitleWidget from '../src/widget/title.js'
import TooltipWidget from '../src/widget/tooltip.js'
import TopologyCtrlWidget from '../src/widget/topologyctrl.js'
import DragSelectWidget from '../src/widget/dragselect.js'
import ScrollWidget from '../src/widget/scroll.js'
import VScrollWidget from '../src/widget/vscroll.js'
import ZoomWidget from '../src/widget/zoom.js'
import ZoomSelectWidget from '../src/widget/zoomselect.js'
import ZoomScrollWidget from '../src/widget/zoomscroll.js'
import RayCastWidget from '../src/widget/raycast.js'
import GuideLineWidget from '../src/widget/guideline.js'
import PickerWidget from '../src/widget/canvas/picker.js'
import Rotate3dWidget from '../src/widget/polygon/rotate3d.js'

jui.use([
    ClassicIcon,
    ClassicPattern,
    ClassicTheme,
    DarkTheme,
    GradientTheme,
    PatternTheme,
    TopologyTableWidget,
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
    HeatMapScatterBrush,
    TimeLineBrush,
    TopologyNodeBrush,
    FocusBrush,
    PinBrush,
    SelectBoxBrush,
    EqualizerBrush,
    EqualizerBarBrush,
    EqualizerColumnBrush,
    CandleStickBrush,
    Column3dBrush,
    Line3dBrush,
    CanvasDot3dBrush,
    CanvasEqualizerColumnBrush,
    CanvasActiveBubbleBrush,
    CanvasBubbleCloudBrush,
    CanvasActiveCircleBrush,
    FullGaugeBrush,
    BarGaugeBrush,
    StackLineBrush,
    StackScatterBrush,
    ArcEqualizerBrush,
    PyramidBrush,
    RateBar,
    CrossWidget,
    LegendWidget,
    TitleWidget,
    TooltipWidget,
    TopologyCtrlWidget,
    DragSelectWidget,
    ScrollWidget,
    VScrollWidget,
    ZoomWidget,
    ZoomSelectWidget,
    ZoomScrollWidget,
    RayCastWidget,
    GuideLineWidget,
    PickerWidget,
    Rotate3dWidget
]);

if(typeof(window) == "object") {
    window.graph = jui;
}