import jui from 'juijs'

jui.ready([ "chart.builder" ], function(builder) {
    builder("#chart", {
        width : 800,
        height : 600,
        theme : "dark",
        axis : [
            {
                data : [
                    { quarter : "01", sales : 50 },
                    { quarter : "02", sales : 20 },
                    { quarter : "03", sales : 10 },
                    { quarter : "05", sales : 30 },
                    { quarter : "06", sales : 30 },
                    { quarter : "07", sales : 30 },
                    { quarter : "11", sales : 32 },
                    { quarter : "12", sales : 25 }
                ],
                x : {
                    type : "range",
                    domain : "sales",
                    step : 10,
                    line : true,
                    reverse: true
                },
                y : {
                    type : "block",
                    domain : "quarter",
                    line : true
                }
            }

        ],
        brush : [{
            type : "bar",
            target : "sales",
            display : "max",
            active : 5,
            activeEvent : "click",
            animate : "right"
        }, {
            type : "focus",
            start : 1,
            end : 1
        }],
        widget : {
            type : "title",
            text : "Bar Sample",
            align : "start"
        }
    });
})