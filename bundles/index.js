import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import DarkTheme from '../src/theme/dark.js'
import FullStackBarBrush from '../src/brush/fullstackbar.js'
import LegendWidget from '../src/widget/legend.js'

jui.use([ ClassicTheme, DarkTheme, FullStackBarBrush, LegendWidget ]);

const builder = jui.include("chart.builder");

window.chart = builder("#chart", {
    width: 400,
    height : 400,
    theme : "classic",
    axis : {
        data : [
            { name : 2, value : 15, test : 0 },
            { name : 15, value : 6, test : 0 },
            { name : 8, value : 0, test : 0 },
            { name : 0, value : 0, test : 0 }
        ],
        y : {
            domain : [ "week1", "week2", "week3", "week4" ],
            line : true
        },
        x : {
            type : 'range',
            domain : [0, 100],
            format : function(value) { return value + "%" ;},
            line : true
        }
    },
    brush : {
        type : 'fullstackbar',
        target : ['name', 'value', 'test'],
        showText: true,
        activeEvent : "click",
        active : 1,
        size : 20
    },
    widget : {
        type : 'legend'
    },
    event: {
        click: function(obj, e) {
            console.log(obj);
        }
    }
});