define(['background'], function(background) {

    //drawGuys(paper, 135, 27);
    var paper = background.paper;

    // sample
    // paper.path("M0,29 C3,-10 55,-10 58,29 L38,29 C35,17 23,17 20,29");

    function drawGuys(x, y) {

        drawUpG(x, y);
    }

    function drawUpG(x, y) {
        var st = paper.set(),
            leftChairXShift = 85,
            leftChairYShift = 150;

        st.push(
            paper.path("M88,84 A45,63 0 1,1 88,42 L65,42 A23,37 0 1,0 65,84 L50,84 50,65 103,65 103,84 Z88,84")
            .attr({
                stroke: 0,
                fill: "#5968b4"
            })
        );

        st.transform('t' + (x + leftChairXShift) + ',' + (y + leftChairYShift)+'r-10');
    }

    return {
        drawGuys: drawGuys
    };
});