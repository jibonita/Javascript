define(['jquery', 'kinetic', 'settings'], function($, Kinetic, Settings) {

    var stage = new Kinetic.Stage({
        container: Settings.container.containerID,
        width: Settings.container.containerWidth,
        height: Settings.container.containerHeight
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
        var line,
            group = new Kinetic.Group();

        // TODO




        layer.add(group);
        stage.add(layer);
    }

    function drawChairs(x, y) {
        //paper.clear();

        var foot,
            //st = paper.set(),
            leftChairXShift = 85,
            leftChairYShift = 235;

        var group = new Kinetic.Group(),
            feet = new Kinetic.Group();

        feet.add(
            foot = new Kinetic.Rect({
                x: 2,
                y: 51,
                width: 3,
                height: 13
            }),
            foot.clone({
                x: foot.attrs.x + 45,
                y: foot.attrs.y
            }),
            new Kinetic.Rect({
                x: 24,
                y: 51,
                width: 3,
                height: 5
            }),
            new Kinetic.Rect({
                x: 63,
                y: 42,
                width: 3,
                height: 14
            })
        );
        feet.setAttrs({
            fill: '#696666'
        });

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


        // st.transform('t' + (x + leftChairXShift) + ',' + (y + leftChairYShift));
        group.move({
            x: x,
            y: y
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