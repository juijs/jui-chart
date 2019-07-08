import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import DarkTheme from '../src/theme/dark.js'
import LineBrush from '../src/brush/line.js'
import ZoomSelectWidget from '../src/widget/zoomselect.js'
import CrossWidget from '../src/widget/cross.js'

jui.use([ ClassicTheme, DarkTheme, LineBrush, ZoomSelectWidget, CrossWidget ]);

var data = [
    { date : new Date("2015/01/01 00:00:00"), sales : 50, profit : 35, etc : 10 },
    { date : new Date("2015/01/01 06:00:00"), sales : 20, profit : 30, etc : 10 },
    { date : new Date("2015/01/01 12:00:00"), sales : 10, profit : 5, etc : 10 },
    { date : new Date("2015/01/01 18:00:00"), sales : 30, profit : 25, etc : 10 },
    { date : new Date("2015/01/02 00:00:00"), sales : 25, profit : 20, etc : 10 }
];

var time = jui.include("util.time");
var builder = jui.include("chart.builder");

var c = builder("#chart", {
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
        }
    ],
    brush : [
        {
            type : "line",
            target : [ "sales", "profit", "etc" ],
            active: [ "sales", "etc" ],
            symbol : "curve",
            colors : function(data) {
                var hours = data.date.getHours();

                if(hours === 0)
                    return "red";
                else if(hours === 6)
                    return "blue";
                else if(hours === 12)
                    return "orange"

                return "yellow";
            }
        }
    ],
    widget : [
        { type : "zoomselect" },
        { type : "cross", xFormat: function(d) { return time.format(d, "HH:mm:ss"); }}
    ],
    event : {
        "zoomselect.end": function(stime, etime) {
            console.log(new Date(stime), new Date(etime));
        }
    }
});