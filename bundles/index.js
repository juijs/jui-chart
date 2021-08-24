import jui from '../src/main.js'
import ClassicTheme from '../src/theme/classic.js'
import DarkTheme from '../src/theme/dark.js'
import FlameBrush from '../src/brush/flame.js'
import TooltipWidget from '../src/widget/tooltip.js'
import { flameData } from '../examples/resources/flamedata.js';

jui.use([ClassicTheme, DarkTheme, FlameBrush, TooltipWidget]);

const color = jui.include('util.color');
const builder = jui.include('chart.builder');

const c = builder("#chart", {
    width: "100%",
    height: flameData.maxDepth * 25,
    padding: {
        right: 200
    },
    axis: [{
        c: {
            type: "panel"
        },
        /*/
        data : [
            { index : "0", value: 3, text: -13375110 },
            { index : "0.0", value: 1, text: -71395896 },
            { index : "0.0.0", value: 1, text: -101176431 },
            { index : "0.1", value: 2, text: -92471297 },
            { index : "0.1.0", value: 1, text: -71395896 },
            { index : "0.1.0.0", value: 1, text: -71395896 }
        ]
        /**/
    }],
    brush: [{
        type: "flame",
        target: ["text"],
        nodeOrient: "bottom",
        nodeAlign: "end",
        nodeColor: function (node) {
            var hash = color.colorHash(node.text);
            return "rgb(" + hash.r + "," + hash.g + "," + hash.b + ")";
        },
        textAlign: "start",
        format: function (node) {
            var charWidth = 6,
                textWidth = node.text.length * charWidth;

            if (node.width < 100) {
                return "";
            } else {
                if (textWidth > node.width) {
                    var len = Math.floor(node.width / charWidth) - 1;
                    return node.text.substr(0, len) + "...";
                }
            }

            return node.text;
        }
    }],
    widget: [{
        type: "tooltip",
        orient: "bottom",
        format: function (data) {
            return data.text + " (" + ((data.value / data.parent.value) * 100).toFixed(2) + "%, " + data.value + " samples)";
        }
    }],
    event: {
        click: function (d, e) {
            this.updateBrush(0, { activeIndex: d.data.index });
            this.render();
        }
    },
    render: false
});

c.axis(0).update(flameData.list);
c.render();