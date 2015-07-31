define(['raphael', 'settings', 'jquery', 'common'], function(Raphael, Settings, $, common) {
    var containerID = Settings.container.containerID,
        containerWidth = Settings.container.containerWidth,
        containerHeight = Settings.container.containerHeight;

    $('#'+containerID).append($('<div>').attr('id',containerID+'SVG'));

    var paper = Raphael(containerID+'SVG', containerWidth, containerHeight);

    function drawBases() {
        // background 1st - base level
        paper.rect(0, 0, containerWidth, 60).attr({
            fill: '#acadac',
            stroke: 'none'
        });

        paper.rect(0, containerHeight - 60, containerWidth, 60).attr({
            fill: '#acadac',
            stroke: 'none'
        });
    }

    // draw chart outside the office
    function drawOutsideOfficeChart(x, y) {
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

    function drawRoomWalls(x, y) {
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

    function drawCabinet(x, y) {
        var st = paper.set(),
            drawerSet = paper.set(),
            shelf;

        st.push(paper.rect(14, 174, 12, 130).attr({
            fill: '#9d9d9e',
            stroke: 'none'
        }));

        drawerSet.push(
            paper.rect(26, 174, 35, 40).attr({
                fill: '#dcdbdd',
                stroke: 'none'
            }),
            paper.rect(34, 180, 17, 8).attr({
                stroke: '#fff',
                "stroke-width": 2
            }),
            paper.rect(34, 204, 17, 4).attr({
                fill: '#abacac',
                stroke: 'none'
            })
        );

        st.push(drawerSet,
            shelf = paper.rect(26, 214, 35, 5).attr({
                fill: '#9f9d9d',
                stroke: 'none'
            }),
            drawerSet.clone().transform('t0,45'),
            shelf.clone().transform('t0,45'),
            drawerSet.clone().transform('t0,90')
        );

        //DRAW FLOWER
        st.push(
            paper.path('M29,160 L48,160').attr({
                stroke: '#a19f9f',
                "stroke-width": 2
            }),
            paper.path('M30,161 34,174 42,174 47,161 z').attr({
                fill: '#9c9e9c',
                stroke: 'none'
            }),
            paper.path('M37,159 37,149 39,147 39,144 40,144 41,140, 42,140').attr({
                stroke: '#707576',
                "stroke-width": 2
            }),
            paper.path('M40,146 45,147 48,150 51,152').attr({
                stroke: '#878b8d',
                "stroke-width": 3
            })
        );

        common.applyTransform(x, y, st);
    }

    function drawWorkTable(x, y) {
        var st = paper.set(),
            feetSet = paper.set(),
            leftChairXShift = 136,
            leftChairYShift = 256;

        // table carpet
        st.push(
            paper.path('M0,48 46,33 429,33 473,48 z').attr({
                fill: '#938e8c',
                stroke: 'none'
            })
        );

        feetSet.push(
            paper.path('M29,27 L29,45'),
            paper.path('M449,27 L449,45'),
            paper.path('M67,27 L67,36'),
            paper.path('M404,27 L404,36')
        ).attr({
            stroke: '#5f6060',
            "stroke-width": 4
        });
        st.push(feetSet);

        st.push(
            paper.rect(27, 11, 424, 16).attr({
                fill: '#7a7c7c',
                stroke: 'none'
            })
        );

        st.push(
            paper.path('M27,11 L451,11 L408,0 L67,0 z').attr({
                fill: '#fcfdfc',
                stroke: 'none'
            })
        );


        st.transform('t' + (x + leftChairXShift) + ',' + (y + leftChairYShift));
    }

    function drawChairs(x, y) {

        drawLeftChair(x,y);

        drawRightChair(x,y);

        drawMiddlechairs(x, y);
    }

    function drawRightChair(x,y){
        // TODO...
    }

    function drawMiddlechairs(x, y){
        // TODO...
    }

    function drawLeftChair(x, y) {
        var chairFeetColor = '#696666';
        var foot,
            st = paper.set(),
            leftChairXShift = 85,
            leftChairYShift = 235;

        // Left chair shift from room: x:85, y: 235
        st.push(

            paper.path('M0,0 0,51 5,51 5,0 z').attr({
                fill: '#393c3c',
                stroke: 'none'
            }),
            paper.path('M5,44 5,51 52,51 52,44 z').attr({
                fill: '#353332',
                stroke: 'none'
            }),
            paper.set(
                foot = paper.rect(2, 51, 3, 13),
                //foot.clone().transform('t45,0'),
                paper.rect(47, 51, 3, 13),
                paper.rect(24, 51, 3, 5),
                paper.rect(63, 42, 3, 14)
            ).attr({
                fill: chairFeetColor,
                stroke: 'none'
            }),
            paper.path('M5,44 52,44 52,51 76,39 76,34 28,34 z').attr({
                fill: '#bab8b3',
                stroke: 'none'
            }),
            paper.path('M5,0 5,44 28,34 28,0 z').attr({
                fill: '#5c5e60',
                stroke: 'none'
            })
        );

        st.transform('t' + (x + leftChairXShift) + ',' + (y + leftChairYShift));
    }

    

    return {
        drawBases: drawBases,
        drawOutsideOfficeChart: drawOutsideOfficeChart,
        drawRoomWalls: drawRoomWalls,
        drawCabinet: drawCabinet,
        drawWorkTable: drawWorkTable,
        drawChairs: drawChairs, 
        paper: paper
    };
});