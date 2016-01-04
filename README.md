## Getting Started

#### Loading resources
JUI charts are now available without loading the jQuery.
```html
<script src="lib/core.min.js"></script>
<script src="dist/chart.min.js"></script>
```

#### Installing in command
```
npm install jui-chart
bower install jui-chart
jamjs install jui-chart
```

#### To build the project
Build using a grunt in JUI Library
```
grunt       // Build all processes
grunt js    // Merge and Minifiy JavaScript files
grunt test  // Unit Tests
```
After the build output is shown below.
```
dist/chart.js
dist/chart.min.js
```

## Using in NodeJS
You can use the JUI chart in server as well as client.
Get started right now in NodeJS.

#### Install
```
npm install jui-chart
```

#### Example
```js
require("../../dist/node");

var fs = require("fs");

// create jui chart 
var chart = jui.create("chart.builder", null, {
    width : 800,
    height : 800,
    axis : {
        x : {
            type : "block",
            domain : "quarter",
            line : true
        },
        y : {
            type : "range",
            domain : function(d) {
                return Math.max(d.sales, d.profit);
            },
            step : 20,
            line : true,
            orient : "right"
        },
        data : [
            { quarter : "1Q", sales : 50, profit : 35 },
            { quarter : "2Q", sales : -20, profit : -100 },
            { quarter : "3Q", sales : 10, profit : -5 },
            { quarter : "4Q", sales : 30, profit : 25 }
        ]

    },
    brush : {
        type : "column",
        target : [ "sales", "profit" ]
    }
});

// save file as xml  
fs.writeFileSync("test.svg", chart.svg.toXML());
```

## Documentation

##### http://jui.io
##### http://chartplay.jui.io

## Maintainers

Created by Alvin and Jayden, Yoha

## License

MIT License 

Copyright (C) 2016 (```JenniferSoft Inc.```)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
