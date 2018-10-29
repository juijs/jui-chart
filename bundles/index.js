import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import CanvasBubbleCloudBrush from '../src/brush/canvas/bubblecloud.js'
import CanvasPickerWidget from '../src/widget/canvas/picker.js'

jui.use([ ClassicTheme, CanvasBubbleCloudBrush, CanvasPickerWidget ]);

jui.ready([ "chart.animation" ], function(animation) {
    window.c = animation("#chart", {
        width: 500,
        height: 500,
        padding: 0,
        interval: 0,
        axis: {
            data: [
                { title: "/app1.jsp", capacity: 100, duration: 1000 },
                { title: "/app2.jsp", capacity: 50, duration: 1000 },
                { title: "/app3.jsp", capacity: 200, duration: 4000 },
                { title: "/app4.jsp", capacity: 100, duration: 10000 }
            ]
        },
        brush: {
            type: "canvas.bubblecloud",
            colors: function(data) {
                if (data.duration <= 3000) {
                    return '#497eff';
                } else if (data.duration <= 7000) {
                    return '#ffdd26';
                } else {
                    return '#ff4f55';
                }
            }
        },
        widget: {
            type: "canvas.picker"
        },
        event: {
            'picker.dblclick': function(obj, e) {
                console.log(obj.data);
            }
        }
    });

    c.run();
});
