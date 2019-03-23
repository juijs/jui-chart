import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import LineBrush from '../src/brush/line.js'
import ScatterBrush from '../src/brush/scatter.js'
import TitleWidget from '../src/widget/title.js'
import GuideLineWidget from '../src/widget/guideline.js'

jui.use([ ClassicTheme, LineBrush, ScatterBrush, TitleWidget, GuideLineWidget ]);

const time = jui.include('util.time');
const builder = jui.include('chart.builder');
const dataCount = 60;
const realtimeData = getMemoryData(dataCount);
const names = {
    memory: '메모리 (MB)',
    cpu: '시스템 사용률 (%)',
    disk: '디스크 용량 (MB)'
}

window.chart = builder('#chart', {
    width: 1000,
    height : 300,
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
            domain : [ 0, 100 ],
            step : 4,
            line : 'solid',
            format : function(d) {
                return d + '%';
            }
        },
        data : []
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
            } else {
                window.chart2.emit('guideline.hide');
            }
        }
    },
    style: {
        tooltipBackgroundColor: "#dcdcdc"
    }
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
            domain : [ 0, 100 ],
            step : 4,
            line : 'solid',
            format : function(d) {
                return d + '%';
            }
        },
        data : realtimeData
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
                window.chart.emit('guideline.show', time);
            } else {
                window.chart.emit('guideline.hide');
            }
        }
    },
    style: {
        tooltipBackgroundColor: "#dcdcdc"
    }
});

function getMemoryData(count) {
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

function updateMemory() {
    var axis = chart.axis(0);
    var axis2 = chart2.axis(0);

    if(realtimeData.length == dataCount) {
        realtimeData.shift();
        realtimeData.push(getMemoryData(1)[0]);
        axis.update(realtimeData);
        axis2.update(realtimeData);
    }

    axis.set('x', {
        domain : [ new Date() - time.MINUTE * 5, new Date() ]
    });
    axis2.set('x', {
        domain : [ new Date() - time.MINUTE * 5, new Date() ]
    });
}

setInterval(function() {
    updateMemory();

    chart.render();
    chart2.render();
}, 5000);