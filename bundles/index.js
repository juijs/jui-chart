import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import DarkTheme from '../src/theme/dark.js'
import StackAreaBrush from '../src/brush/stackarea.js'
import GuidelineWidget from '../src/widget/guideline'
import LegendWidget from '../src/widget/legend'
import ZoomWidget from '../src/widget/zoom'

jui.use([ ClassicTheme, DarkTheme, StackAreaBrush, GuidelineWidget, LegendWidget, ZoomWidget ]);

const time = jui.include('util.time');
const builder = jui.include('chart.builder');

const countMap = [ 300, 150, 60 ];
const dataMap = countMap.map(count => createRealtimeData(count));
const domainMap = {};
const names = {
    memory: 'Memory (MB)',
    cpu: 'CPU Usage (%)',
    disk: 'Disk Size (MB)'
}

builder('#chart', {
    width: 1000,
    height : 300,
    padding : {
        right : 200
    },
    theme : 'classic',
    axis : [{
        // area: {
        //     x: "50%",
        //     width: "50%"
        // },
        x : {
            type : 'dateblock',
            realtime : 'minutes',
            interval : 1, // But number for the real-time basis
            format : 'HH:mm',
            domain : [ new Date() - time.MINUTE * 5, new Date() ]
        },
        y : {
            type : 'range',
            domain : [ 0, 200 ],
            step : 4,
            line : 'solid'
        },
        data : dataMap[0]
    }],
    brush : [{
        type : 'stackarea',
        target : [ 'memory', 'cpu', 'disk' ],
        line : false
    }],
    widget : [{
        type : 'guideline',
        xFormat : function(d) {
            return time.format(d, 'HH:mm');
        },
        tooltipFormat : function(data, key) {
            return {
                key: names[key],
                value: data[key]
            }
        },
        stackPoint : true
    }, {
        type : 'legend',
        orient : 'right',
        filter : true,
        format : function(target) {
            return names[target];
        },
        dx : -20
    }, {
        type : 'zoom'
    }],
    event: {
        'guideline.active': function(time) {
            if(time) {
            } else {
            }
        },
        'zoom.end': function(stime, etime, sindex, eindex) {
            domainMap[0] = [ stime, etime, sindex, eindex ];
        },
        'zoom.close': function() {
            domainMap[0] = null;
        }
    },
    style: {
        guidelineBorderColor: "#333",
        guidelineTooltipFontColor : "#dcdcdc",
        guidelineTooltipFontSize : 14,
        guidelineTooltipBackgroundColor : "#000",
        guidelineTooltipBackgroundOpacity : 0.3
    },
    render: false
});

function createRealtimeData(count) {
    const data = [];

    for(let i = 0; i < count; i++) {
        data.push({
            memory: (Math.floor(Math.random() * 30) == 1) ? 85 : 35,
            cpu: (Math.floor(Math.random() * 30) == 1) ? 55 : 25,
            disk: (Math.floor(Math.random() * 30) == 1) ? 30 : 10,
        });
    }

    return data;
}