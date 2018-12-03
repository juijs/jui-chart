import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import StackColumnBrush from '../src/brush/stackcolumn.js'
import TitleWidget from '../src/widget/title.js'
import TooltipWidget from '../src/widget/tooltip.js'
import LegendWidget from '../src/widget/legend.js'

jui.use([ ClassicTheme, StackColumnBrush, TitleWidget, TooltipWidget, LegendWidget ]);

jui.ready([ "chart.builder" ], function(chart) {
    var data = [
        { quarter : "1Q", samsung : 50, lg : 35, sony: 10 },
        { quarter : "2Q", samsung : 20, lg : 30, sony: 5 },
        { quarter : "3Q", samsung : 20, lg : 5, sony: 10 },
        { quarter : "4Q", samsung : 30, lg : 25, sony: 15 }
    ];

    chart("#chart", {
        width: 500,
        height: 300,
        axis : {
            y : {
                type : "range",
                domain : function(data) {
                    return data.samsung + data.lg + data.sony;
                },
                line : true,
                orient: "top"
            },
            x : {
                type : "block",
                domain : "quarter",
                line : true
            },
            data : data
        },
        brush : {
            type : "stackcolumn",
            activeEvent : "click",
            target : [ "samsung", "lg", "sony" ]
        },
        widget : [{
            type : "title",
            text : "Bar Sample",
            orient : "bottom",
            align : "end"
        }, {
            type : "legend",
            filter : true
        }]
    });
});