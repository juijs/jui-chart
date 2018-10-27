import jui from '../src/main.js'
import CanvasActiveBubbleBrush from '../src/brush/canvas/activebubble.js'
import TitleWidget from '../src/widget/title.js'

jui.use([ CanvasActiveBubbleBrush, TitleWidget ]);

jui.ready([ "chart.animation" ], function(animation) {
    var c = animation("#chart", {
        width: 1000,
        height: 70,
        padding: 0,
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
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 },
                { startTime: Date.now() + 2000, duration: 2000 }
            ]
        },
        brush: {
            type: "canvas.activebubble",
            colors: function(data) {
                if (data.duration <= 3000) {
                    return '#497eff';
                } else if (data.duration <= 7000) {
                    return '#ffdd26';
                } else {
                    return '#ff4f55';
                }
            }
        }
    });

    c.run();
});
