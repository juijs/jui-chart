## Installation

### NPM
```bash
npm install juijs-chart
```

### Browser

```html
<script src="../dist/vendors.js"></script>
<script src="../dist/jui-chart.js"></script>
```

### ES Modules

The difference with the existing method is that you need to add the module directly using the 'use' function.

```js
import graph from 'juijs-chart'
import BarBrush from 'juijs-chart/src/brush/bar.js'
import ColumnBrush from 'juijs-chart/src/brush/column.js'
import TitleWidget from 'juijs-chart/src/widget/title.js'

graph.use(BarBrush, ColumnBrush, TitleWidget);
```

## Usage

```html
<div id="chart"></div>
```

The UI component creation code is the same as the existing one.

```js
graph.ready([ "chart.builder" ], function(builder) {
    var obj = builder("#chart", {
        width: 600,
        height : 600,
        theme : "classic",
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
        }],
        widget : [{
            type: "title",
            text: "hihi"
        }]
    });
});
```
