import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import CanvasActiveBubbleBrush from '../src/brush/canvas/activebubble.js'
import TitleWidget from '../src/widget/title.js'

jui.use([ ClassicTheme, CanvasActiveBubbleBrush, TitleWidget ]);

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

jui.ready([ "chart.animation" ], function(animation) {
    window.c = animation("#chart", {
        width: 500,
        height: 70,
        padding: {
            top: 5,
            bottom: 0,
            left: 0,
            right: 0
        },
        interval: 0,
        axis: {
            data: [
                { startTime: Date.now(), duration: 5000 },
                { startTime: Date.now() + 1000, duration: 3000 },
                { startTime: Date.now(), duration: 4000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 10000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 }
            ]
        },
        brush: {
            type: "canvas.activebubble",
            opacity: 0.7,
            colors: function(data) {
                if (data.duration <= 3000) {
                    return '#497eff';
                } else if (data.duration <= 4000) {
                    return '#ffdd26';
                } else {
                    return '#ff4f55';
                }
            }
        },
        widget: {
            type: 'title',
            text: 'Active Bubble',
            align: 'start'
        },
        style: {
            titleFontSize: 20,
            titleFontWeight: 'bold'
        }
    });

    c.run();
});

// setInterval(function() {
//     let activeBubble = c.builder.getCache('active_bubble');
//     let data = [];
//
//     for(let i = 0; i < rnd(0, 10); i++) {
//         data.push({ startTime: Date.now(), duration: rnd(1000, 10000) });
//     }
//
//     c.update(data);
//     activeBubble.isArrange = false;
// }, 1000);