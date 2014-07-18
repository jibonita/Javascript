define([], function() {

    var container = {
        containerID: "container",
        containerWidth: 1054,
        containerHeight: 357
    };

    var roomClock = {
        clockColor: '#87888c',
        clockInnerColor: '#cccdce',
        radius: 29,
        centerX: 29,
        centerY: 29,
        outlineWidth: 4,
        hourLineShift: 6,
        hourLineLength: 6,
        hourLineWidth: 2
    };

    return {
        container: container,
        roomClock: roomClock
    };
});