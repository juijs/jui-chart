import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import LineBrush from '../src/brush/line.js'
import TitleWidget from '../src/widget/title.js'
import LegendWidget from '../src/widget/legend.js'
import ZoomWidget from '../src/widget/zoom.js'

jui.use([ ClassicTheme, LineBrush, TitleWidget, LegendWidget, ZoomWidget ]);

var chart = jui.include("chart.builder");

var data = [
    { date : new Date("2015/01/01 00:00:00"), sales : 50, profit : 35 },
    { date : new Date("2015/01/01 06:00:00"), sales : 20, profit : 30 },
    { date : new Date("2015/01/01 12:00:00"), sales : 10, profit : 5 },
    { date : new Date("2015/01/01 18:00:00"), sales : 30, profit : 25 },
    { date : new Date("2015/01/02 00:00:00"), sales : 25, profit : 20 }
];

chart("#chart", {
    height : 300,
    padding : {
        right : 120
    },
    axis : [
        {
            x : {
                type : "date",
                domain : [ new Date("2015/01/01"), new Date("2015/01/02") ],
                interval : 1000 * 60 * 60 * 6, // // 6hours
                format : "MM/dd HH:mm",
                key : "date",
                line : true
            },
            y : {
                type : "range",
                domain : [ 0, 100 ],
                step : 5,
                line : true,
                orient : "right"
            },
            data: data
        },
        {
            y : {
                type : "range",
                domain: [ 5, 50 ],
                color: "#90ed7d",
                orient: "left",
                format: function (value) {
                    return value + " ℃";
                }
            },
            extend : 0
        }
    ],
    brush : [
        { type : "line", target : "sales", axis : 0, colors : [ "#434348" ] , symbol : "curve" },
        { type : "line", target : "profit", axis : 1, colors: [ "#90ed7d" ], symbol : "curve" }
    ],
    widget : [
        { type : "title", text : "Combination Sample" },
        { type : "legend", brush : [ 0, 1 ], align : "end" },
        { type : "zoom", axis : [ 0, 1 ], integrate : true }
    ]
});
