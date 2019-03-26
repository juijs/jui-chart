import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import FullStackColumn from '../src/brush/fullstackcolumn.js'

jui.use([ ClassicTheme, FullStackColumn ]);

var builder = jui.include("chart.builder");

var data = [
    { quarter : "1Q", samsung : 0, lg : 35, sony: 10 },
    { quarter : "2Q", samsung : 20, lg : 30, sony: 5 },
    { quarter : "3Q", samsung : 20, lg : 0, sony: 10 },
    { quarter : "4Q", samsung : 0, lg : 0, sony: 0 }
];

builder("#chart", {
    width : 500,
    height : 500,
    axis : {
        x : {
            type : "block",
            domain : "quarter",
            line : true
        },
        y : {
            type : "range",
            domain : [ 0, 100 ],
            format : function(value) {
                return value + "%";
            },
            line : true,
            orient : "right"
        },
        data : data
    },
    brush : {
        type : "fullstackcolumn",
        target : [ "samsung", "lg", "sony" ],
        showText : function(percent) {
            return percent + "%%";
        }
    }
});
