define(['jquery', 'kinetic', 'settings'], function($, Kinetic, Settings) {
    var containerID = Settings.container.containerID,
        containerWidth = Settings.container.containerWidth,
        containerHeight = Settings.container.containerHeight;

    $('#'+containerID).append($('<div>').attr('id', containerID + 'Canvas'));

    var stage = new Kinetic.Stage({
        container: containerID + 'Canvas',
        width: containerWidth,
        height: containerHeight
    });
    var layer = new Kinetic.Layer();
    $('#' + Settings.container.containerID).find('.kineticjs-content').css('position', 'absolute');
    $('#' + Settings.container.containerID).find('.kineticjs-content').addClass('the-canvas');

    function drawRoomChart(x, y) {}

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

    function drawTVScreen(x, y) {}

    function drawWaterMachine(x, y) {

        drawWaterBottle(x, y);
        drawWaterBody(x+2, y+77);
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

    function drawWaterBody(x, y){
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
                x: (40-6)/2,
                y: 6,
                width: 6,
                height: 12,
                fill: '#9c9da0'
              }),            
            new Kinetic.Rect({
                x: (40-30)/2,
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
                  context.moveTo(1+cupHorizShift,29);
                  context.lineTo(15+cupHorizShift,29);
                  context.lineTo(12+cupHorizShift,44);
                  context.lineTo(4+cupHorizShift,44);
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
                y: -2*cupVertShift
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