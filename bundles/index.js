import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import PieBrush from '../src/brush/pie.js'
import DonutBrush from '../src/brush/donut.js'
import TitleWidget from '../src/widget/title.js'
import TooltipWidget from '../src/widget/tooltip.js'
import LegendWidget from '../src/widget/legend.js'

jui.use([ ClassicTheme, PieBrush, DonutBrush, TitleWidget, TooltipWidget, LegendWidget ]);

jui.ready([ "chart.builder" ], function(chart) {
    var names = {
        ie: "IE",
        ff: "Fire Fox",
        chrome: "Chrome",
        safari: "Safari",
        other: "Others"
    };

    chart("#chart", {
        width: 600,
        height: 600,
        padding : 100,
        axis : {
            data : [
                { ie : 70, ff : 11, chrome : 9, safari : 6, other : 4 }
            ]
        },
        brush : {
            type : "donut",
            showText : "outside",
            active : "ie",
            activeEvent : "click",
            format : function(k, v) {
                return names[k] + ": " + v;
            }
        },
        widget : [{
            type : "title",
            text : "Pie Sample"
        }, {
            type : "tooltip",
            orient : "left",
            format : function(data, k) {
                return {
                    key: names[k],
                    value: data[k]
                }
            }
        }, {
            type : "legend",
            format : function(k) {
                return names[k];
            }
        }]
    });

});