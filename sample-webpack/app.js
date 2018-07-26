import jui from 'juijs'
import Theme from '../js/theme/jennifer.js'
import ColumnBrush from '../js/brush/column.js'

jui.register(Theme, ColumnBrush);

jui.ready([ "chart.builder" ], function(builder) {
    builder("#chart", {
        width: 600,
        height : 600,
        theme : "jennifer",
        axis : {
            x : {
                type : "block",
                domain : "quarter",
                line : true
            },
            y : {
                type : "range",
                domain : function(d) { return [d.sales, d.profit ]; },
                step : 3,
                line : true,
                orient : "right"
            },
            data : [
                { quarter : "1Q", sales : 3, profit : 3 },
                { quarter : "2Q", sales : 3, profit : 2 },
                { quarter : "3Q", sales : 10, profit : 1 },
                { quarter : "4Q", sales : 0.49, profit : 4}
            ]
        },
        brush : [{
            type : "column",
            target : [ "sales", "profit" ]
        }]
    });
})