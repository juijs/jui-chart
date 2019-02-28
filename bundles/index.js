import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import FullStackBar from '../src/brush/fullstackbar.js'
import TitleWidget from '../src/widget/title.js'
import TooltipWidget from '../src/widget/tooltip.js'

jui.use([ ClassicTheme, FullStackBar, TitleWidget, TooltipWidget ]);

var chart = jui.include("chart.builder");;

chart("#chart", {
    width: 400,
    height : 400,
    theme : "classic",
    axis : {
        data : [
            { name : 100, value : 0, test : 0 },
            { name : 15, value : 6, test : 20 },
            { name : 8, value : 10, test : 20 },
            { name : 18, value : 5, test : 20 }
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
    event: {
        click: function(obj, e) {
            console.log(obj);
        }
    }
});