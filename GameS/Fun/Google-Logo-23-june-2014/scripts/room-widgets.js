(function() {
    var stage = new Kinetic.Stage({
        container: containerID,
        width: containerWidth,
        height: containerHeight
    });
    var layer = new Kinetic.Layer();
    $('#' + containerID).find('.kineticjs-content').css('position', 'absolute');
    $('#' + containerID).find('.kineticjs-content').addClass('the-canvas');

    function drawRoomChart(x, y) {}

    function drawClock(x, y) {
        var clockColor = '#87888c',
            clockInnerColor = '#cccdce',
            radius = 29,
            outlineWidth = 4,
            centerX = radius,
            centerY = radius,
            hourLineShift = 6,
            hourLineLength = 6,
            hourLineWidth = 2;
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

    drawRoomChart(135, 27);

    drawClock(618, 72);

    drawTVScreen(135, 27);

    drawWaterMachine(810, 170);


})();