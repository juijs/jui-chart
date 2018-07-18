## Getting Started

#### Loading resources
JUI charts are now available without loading the jQuery.
```html
<script src="dist/chart.js"></script>
```

#### Installing in command
```
npm install juijs-chart
```

#### To build the project
Build using a webpack
```
npm start       // Running the Development Environment
npm run dist    // Merge and Minifiy JavaScript files
```
After the build output is shown below.
```
dist/chart.js
```


### Usage
```html
<div id="app"></div>
```
```js
import jui from 'juijs';

var chart = jui.create("chart.builder", "#app", {
    width : 800,
    height : 600,
    axis : {
        x : {
            type : "block",
            domain : "quarter"
        },
        y : {
            type : "range",
            domain : function(d) {
                return Math.max(d.sales, d.profit);
            },
            step : 20
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
```

## Documentation

##### http://jui.io
##### http://chartplay.jui.io

## Maintainers

Created by Alvin and Jayden, Yoha

## License

MIT License 

Copyright (C) 2018 (```JenniferSoft Inc.```)

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
