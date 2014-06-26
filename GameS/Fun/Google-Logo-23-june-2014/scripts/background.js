(function() {

    // background 1st - base level
    paper.rect(0, 0, containerWidth, 60).attr({
        fill: '#acadac',
        stroke: 'none'
    });

    paper.rect(0, containerHeight - 60, containerWidth, 60).attr({
        fill: '#acadac',
        stroke: 'none'
    });

    // draw chart outside the office
    drawOutOfficeChart(paper, 22, 90);

    // draw room walls
    drawRoomWalls(paper, 135, 27);

    drawCabinet(paper, 135, 27);

    drawWorkTable(paper, 135, 27);

    drawRoomChart(paper, 135, 27);

    drawClock(paper, 135, 27);

    drawTVScreen(paper, 135, 27);

    drawGuys(paper, 135, 27);


    function drawOutOfficeChart(paper, x, y) {
        var st = paper.set();
        st.push(
            paper.rect(0, 14, 82, 49).attr({
                fill: '#d0cacd',
                stroke: 'none'
            })
        );
        var st2 = paper.set();
        st2.push(
            paper.rect(8, 42, 14, 14),
            paper.rect(26, 29, 14, 27),
            paper.rect(44, 36, 14, 21),
            paper.rect(62, 41, 14, 15)
        ).attr({
            fill: '#adacad',
            stroke: 'none'
        });

        st.push(st2);

        st.push(
            paper.path('M28,14 L41,0 L54,14').attr({
                stroke: '#888688'
            })
        );

        st.transform('t' + x + ',' + y);
    }

    function drawRoomWalls(paper, x, y) {
        var st = paper.set();
        st.push(

            paper.rect(0, 0, 8, 304).attr({
                fill: '#9f9d9d',
                stroke: 'none'
            }),
            paper.path('M8,0 L143,33 L143,270 L8,304 z').attr({
                fill: '#cccdcc',
                stroke: 'none'
            })
        );

        var oppositeWall = st.clone();
        oppositeWall[0].transform('t' + x + ',0t745,27s-1,1');
        oppositeWall[1].transform("t737,27s-1,1");

        st.push(paper.rect(143, 33, 468, 237).attr({
            fill: '#9f9d9d',
            stroke: 'none'
        }));

        st.transform('t' + x + ',' + y);
    }

    function drawCabinet(paper, x, y) {}

    function drawWorkTable(paper, x, y) {
        var st = paper.set(),
            feetSet = paper.set();

        // table carpet
        st.push(
            paper.path('M136,304 182,289 565,289 609,304 z').attr({
                fill: '#8e9090',
                stroke: 'none'
            })
        );

        feetSet.push(
            paper.path('M165,283 L165,301'),
            paper.path('M585,283 L585,301'),
            paper.path('M203,283 L203,292'),
            paper.path('M540,283 L540,292')
        ).attr({
            stroke: '#5f6060',
            "stroke-width": 4
        });
        st.push(feetSet);

        st.push(
            paper.rect(163, 267, 424, 16).attr({
                fill: '#7a7c7c',
                stroke: 'none'
            })
        );

        st.push(
            paper.path('M163,267 L587,267 L 544,256 L203,256 z').attr({
                fill: '#fcfdfc',
                stroke: 'none'
            })
        );


        st.transform('t' + x + ',' + y);
    }

    function drawRoomChart(paper, x, y) {}

    function drawClock(paper, x, y) {}

    function drawTVScreen(paper, x, y) {}

    function drawGuys(paper, x, y) {}
})();