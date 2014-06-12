//** useful links that helped me:
// 1. http://blogs.sitepointstatic.com/examples/tech/svg-curves/cubic-curve.html
// 2. http://raphaeljs.com/reference.html

var paper = Raphael("youtube-svg", 600, 256);

paper.rect(247, 17, 334, 226, 60).attr({
    fill: '#f00',
    stroke: 'none'
});

// Y
paper.path('M 20 52 L 48 141 L 48 200 L 70 200 L 70 141 L 98 52 L 76 52 L59 111 L42 52 Z').attr({
    fill: '#4b4b4b',
    stroke: 'none'
});

//o
drawO('#4b4b4b', {
    x: 96,
    y: 88
});

// u 
drawU('#4b4b4b', {
    x: 171,
    y: 92
});

// T
paper.path('M 0 0 L 0 23 L 23 23 L 23 147 L 46 147 L 46 23 L 69 23 L69 0 Z').attr({
    fill: '#fff',
    stroke: 'none'
}).transform("t272,52");

drawU('#fff', {
    x: 342,
    y: 92
});

// b 
drawB('#fff', {
    x: 420,
    y: 52
});

// e 
drawE('#fff', {
    x: 492,
    y: 92
});

function drawO(color, position) {
    var oLine = paper.rect(0, 23, 20, 67).attr({
        fill: color,
        stroke: 'none'
    })

    var st = paper.set();
    st.push(
        oLine,
        paper.circle(28, 23, 18).attr({
            stroke: color,
            'stroke-width': '20'
        }),
        paper.circle(28, 87, 18).attr({
            stroke: color,
            'stroke-width': '20'
        })
    );
    st.transform("t" + position.x + "," + position.y);
    oLine.clone().transform("t" + (position.x + 36) + ",88");

    // we need to draw this rectanle filled with the color of the SVG background so that the circles half are hidden
    paper.rect(20, 23, 16, 65).attr({
        fill: '#fff',
        stroke: 'none'
    }).transform("t" + position.x + "," + position.y);
}

function drawU(color, position) {
    var st = paper.set();
    st.push(
        paper.rect(0, 0, 20, 94),
        paper.rect(38, 0, 20, 109),
        paper.path("M0,94 C1,121 26,108 42,96 L42,82 C38,89 15,102 20,87 z")
    );
    st.attr({
        fill: color,
        stroke: 'none'
    })
        .transform("t" + position.x + "," + position.y);
}

function drawB(color, position) {
    var bTop = paper.path("M19,46 C36,27 57,26 58,60 L38,60 C35,51 23,51 19,60")
    var st = paper.set();
    st.push(
        paper.rect(0, 0, 20, 149),
        bTop,
        paper.rect(38, 59, 20, 67)
    );
    st.attr({
        fill: color,
        stroke: 'none'
    })
        .transform("t" + position.x + "," + position.y)

    bTop.clone().transform("t" + position.x + "," + position.y + "t0,90s1-1");
}

function drawE(color, position) {
    // e-top
    var eTop = paper.path("M0,29 C3,-10 55,-10 58,29 L38,29 C35,17 23,17 20,29");

    var st = paper.set();
    st.push(
        eTop,
        paper.rect(0, 27, 20, 54),
        paper.path("M18,43 18,63 58,63 58,28 38,28 38,43")
    );
    st.attr({
        fill: color,
        stroke: 'none'
    })
        .transform("t" + position.x + "," + position.y);

    // e-bottom. use e-top and rotate it
    eTop.clone().transform("t" + position.x + "," + position.y + "t0,80r180");
}


// TESTS - how to draw half circle
//paper.clear();
// 	paper.circle(75, 140, 2).attr({fill: 'red'});
// 	paper.path("M30,95 C33,155 117,155 120,95").attr({fill: 'red', stroke:"none"});
// paper.circle(75, 95, 45).attr({fill: 'green', stroke:"none"});