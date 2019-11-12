import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import DarkTheme from '../src/theme/dark.js'
import RateBarBrush from '../src/brush/ratebar.js'

jui.use([ ClassicTheme, DarkTheme, RateBarBrush ]);

const builder = jui.include('chart.builder');

builder('#chart', {
    theme : 'classic',
    padding : 0,
    axis : [{
        y : {
            type : 'block',
            domain : [ '1' ],
            line: false
        },
        x : {
            type : 'range',
            domain : [0, 100],
            line: false
        },
        data : [{
            server: 120,
            client: 50,
            test: 123
        }]
    }],
    brush : [{
        type : 'ratebar',
        target : [ 'server', 'client', 'test' ],
        // activeIndex : 1,
        // activeTarget : "server",
        activeEvent: "click",
        showText: function(value, percent, key) {
            console.log(arguments)
            return key;
        },
        showTooltip: function(value, percent, key) {
            return `${value}ms`;
        }
    }],
    style: {
        gridXAxisBorderWidth: 1,
        gridYAxisBorderWidth: 1,
        gridTickBorderSize: 0,
        barFontSize: 13,
        barBorderRadius: 5
    }
});