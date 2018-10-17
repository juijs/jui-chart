import jui from '../src/main.js'
import CanvasDot3DBrush from '../src/brush/canvas/dot3d.js'

function f1(x) {
    const a = 10;
    return (a * Math.pow((x - 4), 2)) + 7;
}

jui.use([ CanvasDot3DBrush ]);

jui.ready([ "chart.plane" ], function(plane) {
    var c = plane("#chart", {
        dimension: "2d",
        width: 600,
        height: 600,
        x: [ -100, 100 ],
        y: [ -100, 10000 ],
        padding: 50,
        step: 10,
        symbol: "dot",
        r: 2
    });

    for(let i = -20; i < 20; i++) {
        c.push([ i, f1(i) ]);
    }
    c.commit();

    c.push([ 4, 7 ]);
    c.commit();

    c.render();

    console.log(Math.sin((190*Math.PI)/180))
});
