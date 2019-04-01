import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import DarkTheme from '../src/theme/dark.js'
import StackAreaBrush from '../src/brush/stackarea.js'
import LineBrush from '../src/brush/line.js'
import LegendWidget from '../src/widget/legend.js'
import GuideLineWidget from '../src/widget/guideline.js'

jui.use([ ClassicTheme, DarkTheme, StackAreaBrush, LineBrush, LegendWidget, GuideLineWidget ]);

const builder = jui.include('chart.builder');
const time = jui.include('util.time');

const countMap = [ 300, 150, 60 ];
const dataMap = countMap.map(count => createRealtimeData(count));
const names = {
    memory: 'Memory (MB)',
    cpu: 'CPU Usage (%)',
    disk: 'Disk Size (MB)'
}

window.chart = builder('#chart', {
    width: 1000,
    height : 300,
    padding : {
        right : 200
    },
    theme : 'classic',
    axis : [{
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
    }],
    event: {
        'guideline.active': function(time) {
            if(time) {
                window.chart2.emit('guideline.show', time);
                window.chart3.emit('guideline.show', time);
            } else {
                window.chart2.emit('guideline.hide');
                window.chart3.emit('guideline.hide');
            }
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

window.chart2 = builder('#chart2', {
    width: 500,
    height : 200,
    theme : 'classic',
    axis : [{
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
            line : 'solid',
            format : function(d) {
                return d + '%';
            }
        },
        data : dataMap[1]
    }],
    brush : [{
        type : 'stackarea',
        target : [ 'memory', 'cpu', 'disk' ]
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
    }],
    event: {
        'guideline.active': function(time) {
            if(time) {
                window.chart.emit('guideline.show', time);
                window.chart3.emit('guideline.show', time);
            } else {
                window.chart.emit('guideline.hide');
                window.chart3.emit('guideline.hide');
            }
        }
    },
    render: false
});

window.chart3 = builder('#chart3', {
    width: 700,
    height : 250,
    theme : 'dark',
    axis : [{
        x : {
            type : 'dateblock',
            realtime : 'minutes',
            interval : 1, // But number for the real-time basis
            format : 'HH:mm',
            domain : [ new Date() - time.MINUTE * 5, new Date() ]
        },
        y : {
            type : 'range',
            domain : [ 0, 100 ],
            step : 4,
            line : 'solid',
            format : function(d) {
                return d + '%';
            }
        },
        data : dataMap[2]
    }],
    brush : [{
        type : 'line',
        target : [ 'memory', 'cpu', 'disk' ]
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
        }
    }],
    event: {
        'guideline.active': function(time) {
            if(time) {
                window.chart2.emit('guideline.show', time);
                window.chart3.emit('guideline.show', time);
            } else {
                window.chart2.emit('guideline.hide');
                window.chart3.emit('guideline.hide');
            }
        }
    },
    style: {
        guidelinePointRadius: 0
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

function updateRealtimeData() {
    const axisMap = [ chart.axis(0), chart2.axis(0), chart3.axis(0) ];
    const domain = [ new Date() - time.MINUTE * 5, new Date() ];

    axisMap.forEach((axis, index) => {
        if (dataMap[index].length == countMap[index]) {
            dataMap[index].shift();
            dataMap[index].push(createRealtimeData(1)[0]);

            axis.set('x', { domain: domain });
            axis.update(dataMap[index]);
        }
    });
}

setInterval(function() {
    updateRealtimeData();

    chart.render();
    chart2.render();
    chart3.render();
}, 2000);