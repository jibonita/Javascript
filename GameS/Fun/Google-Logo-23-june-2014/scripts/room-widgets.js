define(['jquery', 'kinetic', 'settings'], function($, Kinetic, Settings) {
    var containerID = Settings.container.containerID,
        containerWidth = Settings.container.containerWidth,
        containerHeight = Settings.container.containerHeight;

    $('#' + containerID).append($('<div>').attr('id', containerID + 'Canvas'));

    var stage = new Kinetic.Stage({
        container: containerID + 'Canvas',
        width: containerWidth,
        height: containerHeight
    });
    var layer = new Kinetic.Layer();
    $('#' + Settings.container.containerID).find('.kineticjs-content').css('position', 'absolute');
    $('#' + Settings.container.containerID).find('.kineticjs-content').addClass('the-canvas');

    function drawRoomChart(x, y) {

    }

    function drawTVScreen(x, y) {
        var player, player2, player3, ball,
            group = new Kinetic.Group(),
            xShiftInRoom = 180,
            yShiftInRoom = 46;

        x += xShiftInRoom;
        y += yShiftInRoom;

        group.add(
            //frame
            new Kinetic.Rect({
                x: 0,
                y: 0,
                width: 228,
                height: 112,
                strokeWidth: 6,
                stroke: '#3b3735',
                fill: '#8FCA4F'
            }),
            //field middle line
            new Kinetic.Shape({
                sceneFunc: function(context) {
                    context.beginPath();
                    context.moveTo(76, 3);
                    context.lineTo(80, 3);
                    context.lineTo(148, 109);
                    context.lineTo(144, 109);
                    context.closePath();
                    // KineticJS specific context method
                    context.fillStrokeShape(this);
                },
                fill: '#ffffff'
            }),
            // field arc line
            new Kinetic.Ellipse({
                x: 114,
                y: 56,
                radius: {
                    x: 35,
                    y: 20
                },
                stroke: '#ffffff',
                strokeWidth: 3
            }),
            ball = new Kinetic.Circle({
                x: 85,
                y: 37,
                radius: 6,
                fill: '#E7EB34'
            }),
            //players
            player = new Kinetic.Rect({
                x: 46,
                y: 23,
                width: 8,
                height: 25,
                fill: '#7753a7'
            }),
            player2 = player.clone({
                x: 124,
                y: 10
            }),
            player3 = player.clone({
                x: 96,
                y: 63
            }),
            player.clone({
                x: 73,
                y: 45,
                fill: '#C84B3D'
            })
        );



        group.move({
            x: x,
            y: y
        });

        layer.add(group);
        stage.add(layer);

        //animation should run here
        //*** THIS is not finished



        var ballX, ballY;
        var tgA2, tgA3;
        var period = 1000; // in ms
        var amplitude, centerX;
        var isStop = false;

        var anim = new Kinetic.Animation(function(frame) {
            //$('#info html(frame.time);
            // 156 = 78+28+50 //dx
            var frameStep = (frame.time) % (3 * period);
            if (frameStep >= 0 && frameStep <= period) {

                if (isStop) {
                  //  anim.stop();
                }


                // 1-2
                //console.log('p 1111');

                //** movement: player1-player2
                centerX = 46 + 6 + 8; // ballRadius - 6, PlayerWidth-8
                amplitude = 124 - centerX; //- 46 - 8 - 6; // ballRadius - 6, PlayerWidth-8

                ballX = amplitude * (frameStep % period) / period + centerX;
                ballY = 23 + 25 + (10 - 23) * (ballX - centerX) / (124 - centerX); //ballYPos-23, playerHeight-25
                ball.setX(ballX);
                ball.setY(ballY);

            } else if (frameStep <= 2 * period) {
                // 2-3
                // console.log('p 2222');

                //** initialize only once
                if (tgA2 == undefined) {
                    tgA2 = (63 + 25 / 12 - (10 + 25)) / (124 - 6 - (96 + 6));
                }

                //** movement: player2-player3
                centerX = 124 - 6;
                amplitude = 96 - centerX; //- 124 + 6;

                ballX = amplitude * (frameStep % period) / period + centerX;
                //ballX = amplitude * frameStep / period + centerX + 27; //?? what is 27??
                //ballY = 63 - (63 - 10) * (ballX - centerX) / (96 + 6 - centerX); //ballYPos-10, playerHeight-25
                //ballY = -(63 - 35) * (ballX - 96) / amplitude;
                ballY = (63 + 25 / 12) - (tgA2 * (ballX - (96 + 6)));

                //console.log(ballX + ',' + ballY);

                ball.setX(ballX);
                ball.setY(ballY);




            } else {
                //3-1


                //console.log('p 3333');
                //** initialize only once
                if (tgA3 == undefined) {
                    tgA3 = ((63 + (25 / 2)) - (23 + 25)) / ((96 + 6) - (46 + 6 + 8));
                }

                //** movement: player3-player1
                centerX = 96 + 6; // ballRadius - 6, PlayerWidth-8
                amplitude = 46 + 6 + 8 - centerX; // - 96 - 6;

                // ballX = amplitude * frameStep / period + centerX + 85; //?? what is 85?
                ballX = amplitude * (frameStep % period) / period + centerX;
                ballY = (23 + 25) + tgA3 * (ballX - (48 + 6 + 8));
                console.log(ballX + ',' + ballY);

                ball.setX(ballX);
                ball.setY(ballY);

                isStop = true;
                //anim.stop();
            }



            //tgA3 = ((63 + 25 / 12) - (23 + 25)) / ((96 + 6) - (46 + 6 + 8));

            $('#container').click(function() {
                anim.stop();
            });

        }, layer);

        var animOLD = new Kinetic.Animation(function(frame) {
            //$('#info html(frame.time);



            //** movement: player1-player2
            amplitude = 124 - 46;
            centerX = 46 + 6 + 8; // ballRadius - 6, PlayerWidth-8

            ballX = amplitude * frame.time / period + centerX;
            ballY = 23 + 25 + (10 - 23) * (ballX - centerX) / (124 - centerX); //ballYPos-23, playerHeight-25
            ball.setX(ballX);
            ball.setY(ballY);


            if (ballX >= 124 - 6) {

                //** movement: player2-player3
                amplitude = 96 - 124;
                centerX = 124 - 6;

                ballX = amplitude * frame.time / period + centerX + 21; //?? what is 21
                ballY = 10 + 25 + (63 - 10) * (ballX - centerX) / (96 - centerX); //ballYPos-10, playerHeight-25

                ball.setX(ballX);
                ball.setY(ballY);
                //$('#info').html('p 22222');


                if (ballX <= 96 + 6) {
                    //                    anim.stop();
                    //var prevX = ballX;
                    //$('#info').html(prevX+'/'+ballX + ',' + ballY);

                    amplitude = 46 - 96;
                    centerX = 96 + 6;

                    ballX = amplitude * frame.time / period + centerX + 46 + 6 + 8;
                    ballY = 63 + 25 + (23 - 63) * (ballX - centerX) / (46 - centerX); //ballYPos-63, playerHeight-25

                    ball.setX(ballX);
                    ball.setY(ballY);
                    //$('#info').html('p 33333');

                    //** movement: player3-player1
                    // TODO .....

                    if (ballX <= 46 + 6) {
                        /// NOW WHAT????
                        amplitude = 124 - 46;
                        centerX = 46 + 6 + 8; // ballRadius - 6, PlayerWidth-8

                        //** movement: player1-player2
                        ballX = amplitude * frame.time / period + centerX;
                        ballY = 23 + 25 + (10 - 23) * (ballX - centerX) / (124 - centerX); //ballYPos-23, playerHeight-25
                        ball.setX(ballX);
                        ball.setY(ballY);
                        //$('#info').html('p 1111');
                        $('#container').click(function() {
                            anim.stop();
                        });
                    }
                }

            }

        }, layer);

        anim.start();




    }

    function drawClock(x, y) {
        // var clockColor = '#87888c',
        //     clockInnerColor = '#cccdce',
        //     radius = 29,
        //     outlineWidth = 4,
        //     centerX = radius,
        //     centerY = radius,
        //     hourLineShift = 6,
        //     hourLineLength = 6,
        //     hourLineWidth = 2;
        var settings = Settings.roomClock;
        var clockColor = settings.clockColor,
            clockInnerColor = settings.clockInnerColor,
            radius = settings.radius,
            outlineWidth = settings.outlineWidth,
            centerX = settings.centerX,
            centerY = settings.centerY,
            hourLineShift = settings.hourLineShift,
            hourLineLength = settings.hourLineLength,
            hourLineWidth = settings.hourLineWidth;
        var line,
            group = new Kinetic.Group();

        group.add(
            // clock outline
            new Kinetic.Circle({
                x: centerX,
                y: centerY,
                radius: radius,
                stroke: clockColor,
                strokeWidth: outlineWidth,
                fill: clockInnerColor
            }),
            //quarters hour lines
            line = new Kinetic.Line({
                points: [hourLineShift, centerY, hourLineShift + hourLineLength, centerY],
                stroke: clockColor,
                tension: hourLineWidth
            }),
            line.clone({
                x: 2 * radius - (hourLineShift + hourLineLength) - hourLineLength,
                y: 0
            }),
            line = new Kinetic.Line({
                points: [centerX, hourLineLength, centerX, hourLineShift + hourLineLength],
                stroke: clockColor,
                tension: hourLineWidth
            }),
            line.clone({
                x: 0,
                y: 2 * radius - (hourLineShift + hourLineLength) - hourLineLength
            }),
            // hands
            line = new Kinetic.Path({
                data: 'M34,15 38,14 39,17 M38,14 29,29 40,31 M37,29 40,31 37,33',
                stroke: clockColor,
                strokeWidth: hourLineWidth
            })
        );

        group.move({
            x: x,
            y: y
        });

        layer.add(group);
        stage.add(layer);
    }



    function drawWaterMachine(x, y) {

        drawWaterBottle(x, y);
        drawWaterBody(x + 2, y + 77);
    }

    function drawWaterBottle(x, y) {
        var outlineColor = '#787a7c',
            waterColor = '#a8bed7',
            leftVerticalX = 5,
            topHorizontalY = 3,
            cornersRadius = 7,
            centralWidth = 36,
            verticalLinesLength = [10, 24, 10],
            verticalRoundsRadius = 4,
            waterPadding = 2;
        var verticalLinesStartY = [],
            rightVerticalX = leftVerticalX + 2 * cornersRadius + centralWidth;

        verticalLinesStartY.push(topHorizontalY + cornersRadius);
        verticalLinesStartY.push(verticalLinesStartY[0] + 2 * verticalRoundsRadius + verticalLinesLength[0]);
        verticalLinesStartY.push(verticalLinesStartY[1] + 2 * verticalRoundsRadius + verticalLinesLength[1]);

        var arc, line, vertRound,
            line1, line2, line3,
            group = new Kinetic.Group();

        group.add(
            // top horizontal line
            line = new Kinetic.Line({
                points: [leftVerticalX + cornersRadius, topHorizontalY, rightVerticalX - cornersRadius, topHorizontalY],
                stroke: outlineColor,
                tension: 1
            }),
            // top left round corner
            arc = new Kinetic.Arc({
                x: leftVerticalX + cornersRadius,
                y: topHorizontalY + cornersRadius,
                outerRadius: cornersRadius,
                innerRadius: cornersRadius,
                stroke: outlineColor,
                strokeWidth: 1,
                angle: 90,
                rotationDeg: -180
            }),
            line1 = new Kinetic.Line({
                points: [leftVerticalX, verticalLinesStartY[0], leftVerticalX, verticalLinesStartY[0] + verticalLinesLength[0]],
                stroke: outlineColor,
                tension: 1
            }),
            //1st vertical round at the left,
            vertRound = new Kinetic.Arc({
                x: leftVerticalX,
                y: verticalLinesStartY[0] + verticalLinesLength[0] + verticalRoundsRadius,
                outerRadius: verticalRoundsRadius,
                innerRadius: verticalRoundsRadius,
                stroke: outlineColor,
                strokeWidth: 1,
                angle: 180,
                rotationDeg: 90
            }),
            line2 = new Kinetic.Line({
                points: [leftVerticalX, verticalLinesStartY[1], leftVerticalX, verticalLinesStartY[1] + verticalLinesLength[1]],
                stroke: outlineColor,
                tension: 1
            }),
            //2nd vertical round at the left,
            vertRound.clone({
                x: vertRound.attrs.x,
                y: verticalLinesStartY[1] + verticalLinesLength[1] + verticalRoundsRadius
            }),
            line3 = new Kinetic.Line({
                points: [leftVerticalX, verticalLinesStartY[2], leftVerticalX, verticalLinesStartY[2] + verticalLinesLength[2]],
                stroke: outlineColor,
                tension: 1
            }),
            // bottom left round corner
            new Kinetic.Arc({
                x: leftVerticalX + cornersRadius,
                y: verticalLinesStartY[2] + verticalLinesLength[2],
                outerRadius: 7,
                innerRadius: 7,
                stroke: outlineColor,
                strokeWidth: 1,
                angle: 90,
                rotationDeg: 90
            }),
            // top right round corner
            new Kinetic.Arc({
                x: rightVerticalX - cornersRadius,
                y: topHorizontalY + cornersRadius,
                outerRadius: cornersRadius,
                innerRadius: cornersRadius,
                stroke: outlineColor,
                strokeWidth: 1,
                angle: 90,
                rotationDeg: -90
            }),
            line1.clone({
                x: rightVerticalX - leftVerticalX,
                y: line1.attrs.y
            }),
            //1st vertical round at the right,
            vertRound.clone({
                x: rightVerticalX,
                y: vertRound.attrs.y,
                rotationDeg: -90
            }),
            line2.clone({
                x: rightVerticalX - leftVerticalX,
                y: line1.attrs.y
            }),
            //2nd vertical round at the right,
            vertRound.clone({
                x: rightVerticalX,
                y: 52 + verticalRoundsRadius,
                rotationDeg: -90
            }),
            line3.clone({
                x: rightVerticalX - leftVerticalX,
                y: line1.attrs.y
            }),
            // bottom left round corner
            new Kinetic.Arc({
                x: rightVerticalX - cornersRadius,
                y: 70,
                outerRadius: 7,
                innerRadius: 7,
                stroke: outlineColor,
                strokeWidth: 1,
                angle: 90,
                rotationDeg: 0
            }),
            // bottom horizontal line
            line.clone({
                x: line.attrs.x,
                y: 70 - topHorizontalY + cornersRadius
            }),
            // add water
            new Kinetic.Rect({
                x: leftVerticalX + waterPadding,
                y: verticalLinesStartY[1] + verticalLinesLength[1] / 2,
                width: centralWidth + 2 * cornersRadius - 2 * waterPadding,
                height: 70 - topHorizontalY + cornersRadius - (verticalLinesStartY[1] + verticalLinesLength[1] / 2),
                fill: waterColor
            })
        );

        group.move({
            x: x,
            y: y
        });

        layer.add(group);
        stage.add(layer);
    }

    function drawWaterBody(x, y) {
        var cup,
            cupHorizShift = 40,
            cupVertShift = 7,
            group = new Kinetic.Group();

        group.add(
            //vertical panels
            new Kinetic.Rect({
                x: 0,
                y: 0,
                width: 40,
                height: 80,
                fill: '#dcdedc'
            }),
            new Kinetic.Rect({
                x: 40,
                y: 0,
                width: 16,
                height: 80,
                fill: '#9c9da0'
            }),
            // stuff in the light pane;
            new Kinetic.Rect({
                x: (40 - 6) / 2,
                y: 6,
                width: 6,
                height: 12,
                fill: '#9c9da0'
            }),
            new Kinetic.Rect({
                x: (40 - 30) / 2,
                y: 22,
                width: 30,
                height: 25,
                strokeWidth: 2,
                stroke: '#9c9da0'
            }),
            //cups. Create bottem cup and clone it for the middle and top one
            cup = new Kinetic.Shape({
                sceneFunc: function(context) {
                    context.beginPath();
                    context.moveTo(1 + cupHorizShift, 29);
                    context.lineTo(15 + cupHorizShift, 29);
                    context.lineTo(12 + cupHorizShift, 44);
                    context.lineTo(4 + cupHorizShift, 44);
                    context.closePath();
                    // KineticJS specific context method
                    context.fillStrokeShape(this);
                },
                fill: '#ffffff'
            }),
            // middle cup - positioned on cupVertShift from the original 'cup'
            cup2 = cup.clone({
                x: cup.attrs.x,
                y: -cupVertShift
            }),
            // top cup
            cup.clone({
                x: cup.attrs.x,
                y: -2 * cupVertShift
            })
        );

        group.move({
            x: x,
            y: y
        });

        layer.add(group);
        stage.add(layer);
    }

    function drawChairs(x, y) {
        var chairFeetColor = '#696666'

        var foot,
            leftChairXShift = 85,
            leftChairYShift = 235;

        var group = new Kinetic.Group(),
            feet = new Kinetic.Group();

        feet.add(
            foot = new Kinetic.Rect({
                x: 2,
                y: 51,
                width: 3,
                height: 13,
                fill: chairFeetColor
            }),
            foot.clone({
                x: foot.attrs.x + 45,
                y: foot.attrs.y
            }),
            new Kinetic.Rect({
                x: 24,
                y: 51,
                width: 3,
                height: 5,
                fill: chairFeetColor
            }),
            new Kinetic.Rect({
                x: 63,
                y: 42,
                width: 3,
                height: 14,
                fill: chairFeetColor
            })
        );

        // Left chair shift from room: x:85, y: 235
        group.add(

            new Kinetic.Path({
                data: 'M0,0 0,51 5,51 5,0 z',
                fill: '#393c3c'
            }),
            new Kinetic.Path({
                data: 'M5,44 5,51 52,51 52,44 z',
                fill: '#353332'
            }),
            feet,
            new Kinetic.Path({
                data: 'M5,44 52,44 52,51 76,39 76,34 28,34 z',
                fill: '#bab8b3'
            }),
            new Kinetic.Path({
                data: 'M5,0 5,44 28,34 28,0 z',
                fill: '#5c5e60',
            })
        );

        group.move({
            x: x + leftChairXShift,
            y: y + leftChairYShift
        });

        layer.add(group);
        stage.add(layer);
    }


    return {
        drawRoomChart: drawRoomChart,
        drawClock: drawClock,
        drawTVScreen: drawTVScreen,
        drawWaterMachine: drawWaterMachine,
        drawChairs: drawChairs
    };

});