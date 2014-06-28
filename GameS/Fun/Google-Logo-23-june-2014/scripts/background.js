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

    drawOutOfficeChart(paper, 22, 90);

    drawRoomWalls(paper, 135, 27);

    drawCabinet(paper, 135, 27);

    drawWorkTable(paper, 135, 27);

    drawChairs(paper, 135, 27);

    drawRoomChart(paper, 135, 27);

    drawClock(paper, 135, 27);

    drawTVScreen(paper, 135, 27);

    drawWaterMachine(paper, 135, 27);

    drawGuys(paper, 135, 27);

    drawBoss(paper);


    // draw chart outside the office
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

    function drawCabinet(paper, x, y) {
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

        applyTransform(x, y, st);
    }

    function drawWorkTable(paper, x, y) {
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

    function drawChairs(paper, x, y) {
        //paper.clear();

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
                fill: '#696666',
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

    function drawWorkTable_ROOM_RELATIVE(paper, x, y) {
        paper.clear();
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

    function drawChairs_ROOM_RELATIVE(paper, x, y) {
        paper.clear();

        var foot,
            st = paper.set(),
            a, b;

        st.push(

            paper.path('M85,235 85,286 90,286 90,235 z').attr({
                fill: '#393c3c',
                stroke: 'none'
            }),
            paper.path('M90,279 90,286 137,286 137,279 z').attr({
                fill: '#353332',
                stroke: 'none'
            }),
            paper.set(
                foot = paper.rect(87, 286, 3, 13),
                //foot.clone().transform('t45,0'),
                paper.rect(132, 286, 3, 13),
                paper.rect(109, 286, 3, 5),
                paper.rect(148, 277, 3, 14)
            ).attr({
                fill: '#696666',
                stroke: 'none'
            }),
            paper.path('M90,279 137,279 137,286 161,274 161,269 113,269 z').attr({
                fill: '#bab8b3',
                stroke: 'none'
            }),
            paper.path('M90,235 90,279 113,269 113,235 z').attr({
                fill: '#5c5e60',
                stroke: 'none'
            })
        );

        //st.clone().transform('t100,0s-1,1');
        //st.clone().transform('t100,0 s-1,1');

        //st.transform('t' + x + ',' + y);

        // paper.path('M185,0 185,304');
        // a = paper.rect(85, 235, 5, 51).attr({
        //     fill: '#393c3c',
        //     stroke: 'none'
        // }),
        // b = paper.rect(90, 279, 47, 7).attr({
        //     fill: '#353332',
        //     stroke: 'none'
        // })
        // console.log(b.matrix);
        // console.log(b.matrix.clone().scale(2));
    }

    function drawRoomChart(paper, x, y) {}

    function drawClock(paper, x, y) {}

    function drawTVScreen(paper, x, y) {}

    function drawGuys(paper, x, y) {}

    function drawWaterMachine(paper, x, y) {}

    function drawBoss() {}

    //** apply transform. Some of the elements will have 'double' transform and we don't want the second transorm to overrite the first
    //** this functions works ONLY FOR ONE level of subordination
    function applyTransform(x, y, st) {
        var emx;
        st.forEach(
            function(element, index) {
                if (element.length) {
                    element.forEach(function(e, i) {
                        emx = e.matrix.split();
                        e.transform('t' + (x + emx.dx) + ',' + (y + emx.dy));
                    });
                } else {
                    emx = element.matrix.split();
                    element.transform('t' + (x + emx.dx) + ',' + (y + emx.dy));
                }
            }
        );
    }
})();