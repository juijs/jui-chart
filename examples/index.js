import jui from '../src/index.js'
import BarBrush from '../src/brush/bar.js'
import ColumnBrush from '../src/brush/column.js'
import { GradientTheme } from '../src/theme/all-in-one.js'

jui.use([ BarBrush, ColumnBrush, GradientTheme ]);

jui.ready([ "chart.builder" ], function(builder) {
    builder("#chart", {
        width: 600,
        height : 600,
        theme : "gradient",
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
                { quarter : "1Q", sales : 1, profit : 3 },
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
});